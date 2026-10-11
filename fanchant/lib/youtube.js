import { loopBoundary } from './engine.js?v=450db2382d89';
const validId = (value) => /^[A-Za-z0-9_-]{11}$/.test(value);
/** Only documented YouTube URLs; discard tracking/playlist/time parameters. */
export function youtubeId(input) {
    const text = input.trim();
    if (validId(text))
        return text;
    if (text.length > 2048)
        return null;
    try {
        const url = new URL(text);
        if (url.protocol !== 'https:' || url.username || url.password || url.port)
            return null;
        let id = null;
        if (['youtu.be', 'www.youtu.be'].includes(url.hostname)) {
            const parts = url.pathname.split('/').filter(Boolean);
            if (parts.length === 1)
                id = parts[0];
        }
        else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'www.youtube-nocookie.com', 'youtube-nocookie.com'].includes(url.hostname)) {
            if (url.pathname === '/watch')
                id = url.searchParams.get('v');
            else
                id = url.pathname.match(/^\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})\/?$/)?.[1] ?? null;
        }
        return id && validId(id) ? id : null;
    }
    catch {
        return null;
    }
}
let apiPromise = null;
export function loadYouTubeAPI() {
    if (window.YT?.Player)
        return Promise.resolve(window.YT);
    if (apiPromise)
        return apiPromise;
    // Called only after the user's explicit agree-and-load action.
    apiPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        const previous = window.onYouTubeIframeAPIReady;
        const finish = (error) => {
            clearTimeout(timer);
            if (window.onYouTubeIframeAPIReady === callback) {
                if (previous)
                    window.onYouTubeIframeAPIReady = previous;
                else
                    delete window.onYouTubeIframeAPIReady;
            }
            if (error) {
                script.remove();
                reject(error);
            }
            else
                resolve(window.YT);
        };
        const callback = () => {
            try {
                previous?.();
            }
            finally {
                finish(window.YT?.Player ? undefined : new Error('youtubeLoadFailed'));
            }
        };
        const timer = setTimeout(() => finish(new Error('youtubeLoadFailed')), 15000);
        window.onYouTubeIframeAPIReady = callback;
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.referrerPolicy = 'strict-origin-when-cross-origin';
        script.addEventListener('error', () => finish(new Error('youtubeLoadFailed')), { once: true });
        document.body.append(script);
    }).catch(error => { apiPromise = null; throw error; });
    return apiPromise;
}
const finite = (number) => Number.isFinite(number) && number >= 0 ? number : 0;
export class YouTubePlayer {
    host;
    loadAPI;
    handle = null;
    id = '';
    ready = false;
    loading = false;
    error = null;
    loop = null;
    generation = 0;
    frame = 0;
    lastFrame = -Infinity;
    loopSeek = null;
    timer = null;
    listeners = new Set();
    events = new AbortController();
    observer = null;
    inViewport = true;
    constructor(host, loadAPI = loadYouTubeAPI) {
        this.host = host;
        this.loadAPI = loadAPI;
        document.addEventListener?.('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.stopLoop();
                this.pause();
            }
        }, { signal: this.events.signal });
        if (typeof IntersectionObserver !== 'undefined') {
            this.observer = new IntersectionObserver(entries => {
                this.inViewport = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .5);
                if (!this.inViewport && this.snapshot.playing) {
                    this.stopLoop();
                    this.pause();
                }
            }, { threshold: .5 });
            this.observer.observe(host);
        }
    }
    get snapshot() {
        const handle = this.ready ? this.handle : null;
        return { source: 'youtube', videoId: this.id, fileName: this.id, time: finite(handle?.getCurrentTime()),
            duration: finite(handle?.getDuration()), playing: handle?.getPlayerState() === 1, ready: this.ready,
            loading: this.loading, rate: handle?.getPlaybackRate() || 1,
            rates: handle?.getAvailablePlaybackRates() ?? [], loop: this.loop, error: this.error };
    }
    subscribe(listener) {
        this.listeners.add(listener);
        listener(this.snapshot);
        return () => this.listeners.delete(listener);
    }
    emit() { const snapshot = this.snapshot; this.listeners.forEach(listener => listener(snapshot)); }
    stopTimer() { if (this.timer)
        clearTimeout(this.timer); this.timer = null; }
    cancelFrame() { cancelAnimationFrame(this.frame); this.frame = 0; }
    fail(code) {
        this.stopTimer();
        this.loading = false;
        this.ready = false;
        this.loop = null;
        this.error = code;
        this.handle?.pauseVideo?.();
        this.cancelFrame();
        this.emit();
    }
    async selectVideo(input) {
        const id = youtubeId(input);
        if (!id) {
            this.error = 'youtubeURLInvalid';
            this.emit();
            return false;
        }
        this.clear();
        const generation = this.generation;
        this.id = id;
        this.loading = true;
        this.emit();
        try {
            const api = await this.loadAPI();
            if (generation !== this.generation)
                return false;
            const frame = document.createElement('iframe');
            const url = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
            for (const [key, value] of Object.entries({ enablejsapi: '1', origin: window.location.origin, autoplay: '0', playsinline: '1', controls: '1' }))
                url.searchParams.set(key, value);
            frame.src = url.href;
            frame.title = 'YouTube video player';
            frame.width = '100%';
            frame.height = '100%';
            frame.referrerPolicy = 'strict-origin-when-cross-origin';
            frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
            frame.allowFullscreen = true;
            this.host.replaceChildren(frame);
            this.host.scrollIntoView?.({ block: 'center' });
            const current = (action) => { if (generation === this.generation)
                action(); };
            this.timer = setTimeout(() => current(() => this.fail('youtubeLoadFailed')), 15000);
            this.handle = new api.Player(frame, { events: {
                    onReady: event => current(() => { this.handle = event.target; this.stopTimer(); this.loading = false; this.ready = true; this.error = null; this.emit(); }),
                    onStateChange: event => current(() => {
                        if (!this.ready)
                            return;
                        if (event.data === 1) {
                            this.error = null;
                            const time = this.snapshot.time;
                            if (this.loop && this.loopSeek === null && (time < this.loop.start - .05 || time > this.loop.end + .05))
                                this.loop = null;
                            if (document.visibilityState === 'hidden' || !this.inViewport) {
                                this.loop = null;
                                this.pause();
                            }
                            else
                                this.schedule();
                        }
                        else
                            this.cancelFrame();
                        if (event.data === 0 && this.loop) {
                            this.loopSeek = this.loop.start;
                            this.handle.seekTo(this.loop.start, true);
                            void this.play();
                        }
                        this.emit();
                    }),
                    onPlaybackRateChange: () => current(() => this.emit()),
                    onAutoplayBlocked: () => current(() => { this.loop = null; this.error = 'youtubePlayBlocked'; this.emit(); }),
                    onError: event => current(() => this.fail(event.data === 101 || event.data === 150 ? 'youtubeEmbedBlocked' : event.data === 100 ? 'youtubeUnavailable' : event.data === 153 ? 'youtubeReferer' : 'youtubeLoadFailed')),
                } });
            return true;
        }
        catch {
            if (generation === this.generation)
                this.fail('youtubeLoadFailed');
            return false;
        }
    }
    schedule() {
        if (this.frame || !this.snapshot.playing)
            return;
        this.frame = requestAnimationFrame(time => {
            this.frame = 0;
            if (!this.ready || !this.snapshot.playing)
                return;
            const snapshot = this.snapshot;
            // YouTube may seek to an earlier keyframe. Wait until playback reaches
            // the requested start, rather than seeking again while still just before it.
            if (this.loopSeek !== null && snapshot.time >= this.loopSeek && (!this.loop || snapshot.time < this.loop.end))
                this.loopSeek = null;
            const start = this.loop && this.loopSeek === null ? loopBoundary(snapshot.time, this.loop) : null;
            if (start !== null) {
                this.loopSeek = start;
                this.handle.seekTo(start, true);
            }
            if (time - this.lastFrame >= 50) {
                this.lastFrame = time;
                this.emit();
            }
            this.schedule();
        });
    }
    async play() {
        if (!this.ready)
            return;
        if (document.visibilityState === 'hidden') {
            this.error = 'youtubePlayBlocked';
            this.emit();
            return;
        }
        // User-initiated cue jumps bring the real player into view; never use a hidden audio embed.
        this.host.scrollIntoView?.({ block: 'nearest' });
        this.handle.playVideo();
    }
    toggle() { if (this.snapshot.playing)
        this.pause();
    else
        void this.play(); }
    pause() { this.handle?.pauseVideo?.(); this.cancelFrame(); }
    seek(time) {
        if (!this.ready || !Number.isFinite(time))
            return;
        const duration = this.snapshot.duration;
        const target = Math.max(0, duration ? Math.min(duration, time) : time);
        if (this.loop && (target < this.loop.start || target >= this.loop.end))
            this.loop = null;
        this.loopSeek = null;
        this.handle.seekTo(target, true);
        this.emit();
    }
    setRate(rate) {
        if (this.ready && this.snapshot.rates?.includes(rate))
            this.handle.setPlaybackRate(rate);
    }
    startLoop(range) {
        if (!this.ready || !Number.isFinite(range.start) || !Number.isFinite(range.end) || range.start < 0 || range.end <= range.start || range.end > this.snapshot.duration)
            return;
        this.loop = { ...range };
        this.loopSeek = range.start;
        this.handle.seekTo(range.start, true);
        this.emit();
        void this.play();
    }
    stopLoop() { this.loop = null; this.loopSeek = null; this.emit(); }
    clear() {
        this.generation++;
        this.stopTimer();
        this.cancelFrame();
        this.ready = false;
        this.loading = false;
        this.loop = null;
        this.loopSeek = null;
        this.id = '';
        this.error = null;
        this.handle?.destroy();
        this.handle = null;
        this.host.replaceChildren();
        this.emit();
    }
    dispose() { this.clear(); this.events.abort(); this.observer?.disconnect(); this.listeners.clear(); }
}
