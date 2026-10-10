export const ACTIVE_SECONDS = 2;
export const DEFAULT_PRE_ROLL = 3;
export const DEFAULT_POST_ROLL = 2;
export const toSongTime = (audioTime, offset = 0) => audioTime - offset;
export const toAudioTime = (songTime, offset = 0) => songTime + offset;
export const prepareTime = (cue) => cue.prepareAt ?? Math.max(0, cue.time - 2);
/** First cue strictly after song time. Cues must be sorted by parseSong. */
function nextIndex(cues, time) {
    let low = 0, high = cues.length;
    while (low < high) {
        const middle = (low + high) >>> 1;
        if (cues[middle].time <= time)
            low = middle + 1;
        else
            high = middle;
    }
    return low;
}
export function getNextCue(cues, time) {
    return cues[nextIndex(cues, time)];
}
export function cueEnd(cues, index) {
    return Math.min(cues[index].time + ACTIVE_SECONDS, cues[index + 1]?.time ?? Infinity);
}
export function getCurrentCue(cues, time) {
    const index = nextIndex(cues, time) - 1;
    return index >= 0 && time < cueEnd(cues, index) ? cues[index] : undefined;
}
export function getCueState(song, audioTime) {
    const time = toSongTime(audioTime, song.audioOffset);
    const index = nextIndex(song.cues, time);
    const previous = song.cues[index - 1];
    const current = getCurrentCue(song.cues, time);
    const next = song.cues[index];
    const ready = !current && !!next && time >= prepareTime(next);
    return { time, current, next, previous, phase: current ? 'active' : ready ? 'ready' : 'waiting', countdown: next ? next.time - time : null };
}
export function answerVisible(mode, cues, index, time) {
    if (mode === 'learn')
        return true;
    return mode === 'practice' ? time >= cues[index].time : time >= cueEnd(cues, index);
}
export function getLoopRange(cue, offset, duration, preRoll = DEFAULT_PRE_ROLL, postRoll = DEFAULT_POST_ROLL) {
    const at = toAudioTime(cue.time, offset);
    if (!Number.isFinite(duration) || duration <= 0 || at < 0 || at >= duration)
        return null;
    const start = Math.max(0, at - preRoll), end = Math.min(duration, at + postRoll);
    return end > start ? { start, end } : null;
}
export const loopBoundary = (time, range) => time >= range.end ? range.start : null;
export const cueSeekTime = (cue, offset = 0, duration = Infinity) => Math.min(duration, Math.max(0, toAudioTime(cue.time, offset) - DEFAULT_PRE_ROLL));
export function formatTime(time, decimals = false) {
    const raw = Math.max(0, Number.isFinite(time) ? time : 0);
    const safe = decimals ? Math.round(raw * 100) / 100 : raw;
    const minutes = Math.floor(safe / 60);
    const seconds = safe % 60;
    return `${String(minutes).padStart(2, '0')}:${decimals ? seconds.toFixed(2).padStart(5, '0') : String(Math.floor(seconds)).padStart(2, '0')}`;
}
