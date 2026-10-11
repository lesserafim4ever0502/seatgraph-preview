export const CUE_TYPES = ['chant', 'response', 'member_name', 'group_name', 'clap', 'action', 'other'];
export const MAX_JSON_BYTES = 1024 * 1024;
export const STORAGE_KEY = 'seatgraph.fanchant.v1';
export class DataError extends Error {
    code;
    field;
    constructor(code, field = '') {
        super(code);
        this.code = code;
        this.field = field;
    }
}
function record(value, field) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new DataError('invalidObject', field);
    return value;
}
function text(value, field, max = 1000) {
    if (typeof value !== 'string' || !value.trim() || value.length > max)
        throw new DataError('invalidText', field);
    return value.trim();
}
function number(value, field, min = 0, max = 86400) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max)
        throw new DataError('invalidNumber', field);
    return value;
}
/** Validate untrusted storage/imports, keep known fields only, and sort once. */
export function parseSong(value) {
    const input = record(value, 'song');
    const song = { id: text(input.id, 'id', 128), title: text(input.title, 'title', 200), cues: [] };
    for (const key of ['artistId', 'artist'])
        if (input[key] !== undefined)
            song[key] = text(input[key], key, 200);
    if (input.duration !== undefined)
        song.duration = number(input.duration, 'duration', 0.01);
    if (input.audioOffset !== undefined)
        song.audioOffset = number(input.audioOffset, 'audioOffset', -3600, 3600);
    if (input.sample !== undefined) {
        if (typeof input.sample !== 'boolean')
            throw new DataError('invalidObject', 'sample');
        song.sample = input.sample;
    }
    if (input.timingStatus !== undefined) {
        if (!['unverified', 'anchors', 'user'].includes(String(input.timingStatus)))
            throw new DataError('invalidObject', 'timingStatus');
        song.timingStatus = input.timingStatus;
    }
    if (input.versionNote !== undefined)
        song.versionNote = text(input.versionNote, 'versionNote', 1000);
    if (input.sources !== undefined) {
        if (!Array.isArray(input.sources) || input.sources.length > 10)
            throw new DataError('invalidObject', 'sources');
        song.sources = input.sources.map((source) => {
            const item = record(source, 'source');
            const url = text(item.url, 'source.url', 2000);
            try {
                if (new URL(url).protocol !== 'https:')
                    throw Error();
            }
            catch {
                throw new DataError('invalidObject', 'source.url');
            }
            return { label: text(item.label, 'source.label', 200), url };
        });
    }
    if (!Array.isArray(input.cues) || input.cues.length > 1000)
        throw new DataError('invalidCues', 'cues');
    const ids = new Set();
    const times = new Set();
    song.cues = input.cues.map((value, index) => {
        const field = `cues[${index}]`;
        const item = record(value, field);
        const cue = {
            id: text(item.id, `${field}.id`, 128),
            time: number(item.time, `${field}.time`),
            text: text(item.text, `${field}.text`),
            type: text(item.type, `${field}.type`, 32),
        };
        if (!CUE_TYPES.includes(cue.type))
            throw new DataError('invalidType', field);
        if (ids.has(cue.id))
            throw new DataError('duplicateId', field);
        if (times.has(cue.time))
            throw new DataError('duplicateTime', field);
        if (song.duration !== undefined && cue.time > song.duration)
            throw new DataError('pastDuration', field);
        ids.add(cue.id);
        times.add(cue.time);
        if (item.prepareAt !== undefined)
            cue.prepareAt = number(item.prepareAt, `${field}.prepareAt`, 0, cue.time);
        if (item.endTime !== undefined) {
            cue.endTime = number(item.endTime, `${field}.endTime`, cue.time + 0.01, song.duration ?? 86400);
        }
        for (const key of ['romanization', 'translation', 'note']) {
            if (item[key] !== undefined)
                cue[key] = text(item[key], `${field}.${key}`);
        }
        return cue;
    }).sort((a, b) => a.time - b.time);
    // An editor-created song must remain reloadable and importable after export.
    if (new TextEncoder().encode(JSON.stringify(song, null, 2) + '\n').length > MAX_JSON_BYTES)
        throw new DataError('tooLarge');
    return song;
}
export function parseSongJSON(raw) {
    if (new TextEncoder().encode(raw).length > MAX_JSON_BYTES)
        throw new DataError('tooLarge');
    let value;
    try {
        value = JSON.parse(raw);
    }
    catch {
        throw new DataError('invalidJSON');
    }
    return parseSong(value);
}
export function loadSong(storage, fallback) {
    let raw;
    try {
        raw = storage.getItem(STORAGE_KEY);
    }
    catch {
        return { song: structuredClone(fallback), warning: 'storageUnavailable' };
    }
    if (!raw)
        return { song: structuredClone(fallback) };
    try {
        return { song: parseSongJSON(raw) };
    }
    catch {
        return { song: structuredClone(fallback), warning: 'storageCorrupt' };
    }
}
export function saveSong(storage, song) {
    try {
        storage.setItem(STORAGE_KEY, JSON.stringify(song));
        return true;
    }
    catch {
        return false;
    }
}
