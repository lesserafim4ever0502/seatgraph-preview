import { LocalAudioPlayer } from './audio.js?v=450db2382d89';
import { YouTubePlayer } from './youtube.js?v=450db2382d89';
/** One active source and one real playback clock for the trainer. */
export class TrainingMediaPlayer {
    source = 'youtube';
    local;
    youtube;
    listeners = new Set();
    subscriptions;
    constructor(audio, host, loadAPI) {
        this.local = new LocalAudioPlayer(audio);
        this.youtube = new YouTubePlayer(host, loadAPI);
        this.subscriptions = [this.local.subscribe(() => { if (this.source === 'local')
                this.emit(); }),
            this.youtube.subscribe(() => { if (this.source === 'youtube')
                this.emit(); })];
    }
    get active() { return this.source === 'youtube' ? this.youtube : this.local; }
    get snapshot() { return { ...this.active.snapshot, source: this.source }; }
    emit() { const value = this.snapshot; this.listeners.forEach(listener => listener(value)); }
    subscribe(listener) { this.listeners.add(listener); listener(this.snapshot); return () => this.listeners.delete(listener); }
    useSource(source) { if (source === this.source)
        return; this.active.clear(); this.source = source; this.emit(); }
    selectFile(file) { this.useSource('local'); return this.local.selectFile(file); }
    selectVideo(input) { this.useSource('youtube'); return this.youtube.selectVideo(input); }
    play() { return this.active.play(); }
    toggle() { this.active.toggle(); }
    pause() { this.active.pause(); }
    seek(time) { this.active.seek(time); }
    setRate(rate) { this.active.setRate(rate); }
    startLoop(range) { this.active.startLoop(range); }
    stopLoop() { this.active.stopLoop(); }
    clear() { this.active.clear(); }
    dispose() { this.subscriptions.forEach(stop => stop()); this.local.dispose(); this.youtube.dispose(); this.listeners.clear(); }
}
