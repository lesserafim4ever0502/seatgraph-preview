import { DataError, MAX_JSON_BYTES, parseSong, parseSongJSON, STORAGE_KEY } from './model.js?v=853c406c5363';
export const LIBRARY_KEY = 'seatgraph.fanchant.library.v2';
export const MAX_LIBRARY_BYTES = 8 * MAX_JSON_BYTES;
export const PROGRESS = ['new', 'learning', 'mastered'];
const object = (value) => {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        throw new DataError('invalidObject', 'library');
    return value;
};
export function parseCatalog(value) {
    if (!Array.isArray(value) || value.length > 100)
        throw new DataError('invalidObject', 'catalog');
    const entries = value.map(item => {
        const data = object(item);
        if (!Number.isInteger(data.order) || data.order < 1 || ![1, 2, 3].includes(data.priority) || typeof data.official !== 'boolean' || typeof data.tourVariant !== 'boolean')
            throw new DataError('invalidObject', 'catalog');
        return { song: parseSong(data.song), order: data.order, official: data.official, priority: data.priority, tourVariant: data.tourVariant };
    });
    if (new Set(entries.map(item => item.song.id)).size !== entries.length || new Set(entries.map(item => item.order)).size !== entries.length)
        throw new DataError('duplicateId', 'catalog');
    return entries.sort((a, b) => a.order - b.order);
}
export function parseLibrary(value) {
    const input = object(value);
    if (input.version !== 1)
        throw new DataError('unsupportedBackup');
    if (!Array.isArray(input.songs) || !input.songs.length || input.songs.length > 100)
        throw new DataError('invalidObject', 'songs');
    const songs = input.songs.map(parseSong);
    const ids = new Set(songs.map(song => song.id));
    if (ids.size !== songs.length)
        throw new DataError('duplicateId', 'songs');
    if (typeof input.selectedId !== 'string' || !ids.has(input.selectedId))
        throw new DataError('invalidObject', 'selectedId');
    const progress = Object.create(null);
    for (const [id, state] of Object.entries(object(input.progress))) {
        if (!ids.has(id) || !PROGRESS.includes(state))
            throw new DataError('invalidObject', 'progress');
        progress[id] = state;
    }
    const library = { version: 1, selectedId: input.selectedId, songs, progress, updatedAt: typeof input.updatedAt === 'number' && Number.isFinite(input.updatedAt) ? input.updatedAt : 0 };
    if (new TextEncoder().encode(JSON.stringify(library, null, 2) + '\n').length > MAX_LIBRARY_BYTES)
        throw new DataError('libraryTooLarge');
    return library;
}
export function parseBackup(raw) {
    if (new TextEncoder().encode(raw).length > MAX_LIBRARY_BYTES)
        throw new DataError('libraryTooLarge');
    let value;
    try {
        value = JSON.parse(raw);
    }
    catch {
        throw new DataError('invalidJSON');
    }
    return Object.hasOwn(object(value), 'version') ? parseLibrary(value) : parseSongJSON(raw);
}
export function loadLibrary(storage, defaults, selectedId) {
    const fallback = () => ({ version: 1, songs: structuredClone(defaults), selectedId, progress: Object.create(null), updatedAt: 0 });
    try {
        const raw = storage.getItem(LIBRARY_KEY);
        if (raw) {
            const library = parseLibrary(JSON.parse(raw));
            // New built-ins never overwrite a user's edited song.
            for (const song of defaults)
                if (!library.songs.some(item => item.id === song.id))
                    library.songs.push(structuredClone(song));
            return { library: parseLibrary(library) };
        }
        const library = fallback(), legacy = storage.getItem(STORAGE_KEY);
        if (legacy) {
            const song = parseSongJSON(legacy);
            library.songs = library.songs.filter(item => item.id !== song.id);
            library.songs.push(song);
            library.selectedId = song.id;
        }
        return { library };
    }
    catch (error) {
        return { library: fallback(), warning: error instanceof DataError || error instanceof SyntaxError ? 'storageCorrupt' : 'storageUnavailable' };
    }
}
export function saveLibrary(storage, library) {
    try {
        storage.setItem(LIBRARY_KEY, JSON.stringify(library));
        return true;
    }
    catch {
        return false;
    }
}
export function shiftSong(song, delta) {
    if (!Number.isFinite(delta))
        throw new DataError('invalidNumber', 'shift');
    const round = (value) => Math.round(value * 100) / 100;
    return parseSong({ ...song, timingStatus: 'user', cues: song.cues.map(cue => ({ ...cue, time: round(cue.time + delta), ...(cue.prepareAt === undefined ? {} : { prepareAt: round(cue.prepareAt + delta) }), ...(cue.endTime === undefined ? {} : { endTime: round(cue.endTime + delta) }) })) });
}
/** One user-authored cue per line: seconds or mm:ss[.cc] | text. Atomic on errors. */
export function parseCueLines(raw, song) {
    const lines = raw.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if (!lines.length || lines.length + song.cues.length > 1000)
        throw new DataError('invalidCues', 'batch');
    const cues = lines.map((line, index) => {
        const separator = line.indexOf('|');
        const stamp = line.slice(0, separator).trim(), text = line.slice(separator + 1).trim();
        if (separator < 1 || !/^(?:\d+:)?\d+(?:\.\d{1,2})?$/.test(stamp))
            throw new DataError('invalidNumber', `line ${index + 1}`);
        const parts = stamp.split(':').map(Number);
        if (parts.length === 2 && parts[1] >= 60)
            throw new DataError('invalidNumber', `line ${index + 1}`);
        const time = parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0];
        return { id: crypto.randomUUID(), time, type: 'chant', text };
    });
    return parseSong({ ...song, timingStatus: 'user', cues: [...song.cues, ...cues] });
}
