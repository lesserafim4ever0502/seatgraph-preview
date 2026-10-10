// Generated from fanchant/src; run the web Fanchant build.
import { loopBoundary } from './engine.js';
export class LocalAudioPlayer {
    audio;
    url = null;
    fileName = '';
    frame = 0;
    lastFrame = -Infinity;
    generation = 0;
    ready = false;
    loading = false;
    rate = 1;
    loop = null;
    error = null;
    listeners = new Set();
    events = new AbortController();
    constructor(audio){
        this.audio = audio;
        const on = (event, handler)=>audio.addEventListener(event, handler, {
                signal: this.events.signal
            });
        on('loadedmetadata', ()=>{
            this.ready = Number.isFinite(audio.duration) && audio.duration > 0;
            this.loading = false;
            this.error = this.ready ? null : 'audioUnsupported';
            audio.playbackRate = this.rate;
            this.emit();
        });
        on('durationchange', ()=>{
            if (this.ready) this.emit();
        });
        on('play', ()=>{
            this.schedule();
            this.emit();
        });
        on('pause', ()=>{
            this.cancelFrame();
            this.emit();
        });
        on('timeupdate', ()=>this.updateClock());
        on('seeked', ()=>this.updateClock());
        on('seeking', ()=>{
            if (this.loop && (audio.currentTime < this.loop.start - 0.05 || audio.currentTime > this.loop.end + 0.05)) this.loop = null;
            this.emit();
        });
        on('ended', ()=>{
            if (this.loop) {
                audio.currentTime = this.loop.start;
                void this.play();
            } else {
                this.cancelFrame();
                this.emit();
            }
        });
        on('error', ()=>{
            if (!this.url) return;
            this.ready = false;
            this.loading = false;
            this.loop = null;
            this.error = 'audioUnsupported';
            audio.pause();
            this.cancelFrame();
            this.emit();
        });
    }
    get snapshot() {
        return {
            time: this.audio.currentTime || 0,
            duration: this.ready && Number.isFinite(this.audio.duration) ? this.audio.duration : 0,
            playing: !this.audio.paused && !this.audio.ended,
            ready: this.ready,
            loading: this.loading,
            fileName: this.fileName,
            rate: this.rate,
            loop: this.loop,
            error: this.error
        };
    }
    subscribe(listener) {
        this.listeners.add(listener);
        listener(this.snapshot);
        return ()=>this.listeners.delete(listener);
    }
    emit() {
        const value = this.snapshot;
        this.listeners.forEach((listener)=>listener(value));
    }
    cancelFrame() {
        cancelAnimationFrame(this.frame);
        this.frame = 0;
    }
    schedule() {
        if (this.frame || this.audio.paused) return;
        this.frame = requestAnimationFrame((time)=>{
            this.frame = 0;
            const wrapped = this.wrapLoop();
            if (wrapped || time - this.lastFrame >= 50) {
                this.lastFrame = time;
                this.emit();
            }
            this.schedule();
        });
    }
    wrapLoop() {
        if (!this.loop || this.audio.paused) return false;
        const start = loopBoundary(this.audio.currentTime, this.loop);
        if (start === null) return false;
        this.audio.currentTime = start;
        return true;
    }
    updateClock() {
        this.wrapLoop();
        this.emit();
    }
    selectFile(file) {
        if (!/\.(mp3|m4a|wav)$/i.test(file.name) || !file.size) {
            this.error = 'audioFileType';
            this.emit();
            return false;
        }
        this.clear();
        this.fileName = file.name;
        this.loading = true;
        this.url = URL.createObjectURL(file);
        this.audio.src = this.url;
        this.audio.load();
        this.emit();
        return true;
    }
    async play() {
        if (!this.ready) return;
        const generation = this.generation;
        try {
            await this.audio.play();
            if (generation === this.generation) this.error = null;
        } catch  {
            if (generation === this.generation) this.error = 'playBlocked';
        }
        if (generation === this.generation) this.emit();
    }
    toggle() {
        if (this.audio.paused) void this.play();
        else this.audio.pause();
    }
    seek(time) {
        if (!this.ready || !Number.isFinite(time)) return;
        const target = Math.max(0, Math.min(this.audio.duration, time));
        if (this.loop && (target < this.loop.start || target >= this.loop.end)) this.loop = null;
        this.audio.currentTime = target;
        this.emit();
    }
    setRate(rate) {
        if (![
            0.5,
            0.75,
            0.85,
            1,
            1.25
        ].includes(rate)) return;
        this.rate = rate;
        this.audio.playbackRate = rate;
        this.emit();
    }
    startLoop(range) {
        if (!this.ready || range.start < 0 || range.end > this.audio.duration || range.end <= range.start) return;
        this.loop = range;
        this.audio.currentTime = range.start;
        this.emit();
        void this.play();
    }
    stopLoop() {
        this.loop = null;
        this.emit();
    }
    pause() {
        this.audio.pause();
    }
    clear() {
        this.generation++;
        this.loop = null;
        this.ready = false;
        this.loading = false;
        this.fileName = '';
        this.error = null;
        this.audio.pause();
        this.cancelFrame();
        this.audio.removeAttribute('src');
        this.audio.load();
        if (this.url) URL.revokeObjectURL(this.url);
        this.url = null;
        this.emit();
    }
    dispose() {
        this.clear();
        this.events.abort();
        this.listeners.clear();
    }
}
