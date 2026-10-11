import { LocalAudioPlayer } from './audio.js?v=b7c74cf7dc6c';
import { answerVisible, cueEnd, cueSeekTime, formatTime, getCueState, getLoopRange, toAudioTime, toSongTime } from './engine.js?v=b7c74cf7dc6c';
import { CUE_TYPES, DataError, parseSong } from './model.js?v=b7c74cf7dc6c';
import { LIBRARY_KEY, MAX_LIBRARY_BYTES, PROGRESS, loadLibrary, parseBackup, parseCueLines, parseLibrary, saveLibrary, shiftSong } from './library.js?v=b7c74cf7dc6c';
const storage = {
    getItem: (key) => window.localStorage.getItem(key),
    setItem: (key, value) => window.localStorage.setItem(key, value),
};
const write = (element, text) => { if (element.textContent !== text)
    element.textContent = text; };
const setHidden = (element, hidden) => { if (element.hidden !== hidden)
    element.hidden = hidden; };
const hundredth = (value) => Math.round(value * 100) / 100;
export class FanchantTrainer {
    root;
    demo;
    catalog;
    song;
    mode = 'learn';
    preRoll = 3;
    postRoll = 2;
    selectedId = null;
    editing = false;
    editingId = null;
    editorReturn = null;
    rows = [];
    listSignature = '';
    markerDuration = -1;
    storageWarning = '';
    library;
    savedSnapshot = null;
    conflict = false;
    history = new Map();
    importGeneration = 0;
    unsubscribe;
    events = new AbortController();
    downloads = new Map();
    player;
    constructor(root, demo, catalog = []) {
        this.root = root;
        this.demo = demo;
        this.catalog = catalog;
        const defaults = [...catalog.map(item => item.song), demo];
        const loaded = loadLibrary(storage, defaults, catalog.find(item => item.song.id === 'boompala')?.song.id ?? demo.id);
        this.library = loaded.library;
        this.song = this.library.songs.find(song => song.id === this.library.selectedId);
        try {
            this.savedSnapshot = storage.getItem(LIBRARY_KEY);
        }
        catch { /* Warning from loadLibrary is displayed below. */ }
        this.storageWarning = loaded.warning ?? '';
        this.player = new LocalAudioPlayer(this.el('local-audio'));
        this.bind();
        this.rebuild();
        this.unsubscribe = this.player.subscribe(snapshot => this.render(snapshot));
    }
    el(id) {
        const element = this.root.querySelector(`#${id}`);
        if (!element)
            throw new Error(`Missing trainer element: ${id}`);
        return element;
    }
    t(key, parameters) {
        return window.SeatGraphI18n.t(`fanchant.${key}`, parameters);
    }
    on(target, event, handler) {
        target.addEventListener(event, handler, { signal: this.events.signal });
    }
    message(key, parameters) {
        const notice = this.el('notice');
        write(notice, this.t(key, parameters));
        notice.hidden = false;
    }
    errorMessage(error) {
        return error instanceof DataError ? this.t(error.code, { field: error.field }) : this.t('readFailed');
    }
    persist() {
        this.library = parseLibrary({ ...this.library, selectedId: this.song.id, songs: this.library.songs.map(song => song.id === this.song.id ? this.song : song), updatedAt: Date.now() });
        try {
            if (storage.getItem(LIBRARY_KEY) !== this.savedSnapshot)
                this.conflict = true;
        }
        catch {
            this.storageWarning = 'storageUnavailable';
        }
        if (this.conflict) {
            this.storageWarning = 'pendingConflict';
            this.el('storage-conflict').hidden = false;
            write(this.el('storage-status'), this.t('pendingConflict'));
            return;
        }
        this.storageWarning = saveLibrary(storage, this.library) ? '' : 'storageUnavailable';
        if (!this.storageWarning)
            this.savedSnapshot = JSON.stringify(this.library);
        write(this.el('storage-status'), this.t(this.storageWarning || 'savedLocal'));
    }
    commitSong(song) {
        const next = parseSong(song);
        // Validate the entire backup before touching the current data or undo stack.
        parseLibrary({ ...this.library, songs: this.library.songs.map(item => item.id === next.id ? next : item) });
        const history = this.history.get(this.song.id) ?? { undo: [], redo: [] };
        history.undo.push(structuredClone(this.song));
        if (history.undo.length > 20)
            history.undo.shift();
        history.redo = [];
        this.history.set(this.song.id, history);
        this.player.stopLoop();
        this.song = next;
        this.persist();
        this.rebuild();
    }
    recoverHistory(direction) {
        const history = this.history.get(this.song.id);
        const next = history?.[direction].pop();
        if (!history || !next)
            return;
        history[direction === 'undo' ? 'redo' : 'undo'].push(structuredClone(this.song));
        this.player.pause();
        this.player.stopLoop();
        this.closeEditor(false);
        this.song = next;
        this.selectedId = null;
        this.persist();
        this.rebuild();
    }
    translate() {
        this.root.querySelectorAll('[data-i18n]').forEach(element => {
            write(element, window.SeatGraphI18n.t(element.dataset.i18n));
        });
        this.root.querySelectorAll('[data-i18n-aria]').forEach(element => {
            element.setAttribute('aria-label', window.SeatGraphI18n.t(element.dataset.i18nAria));
        });
    }
    bind() {
        this.on(this.el('audio-file'), 'change', () => {
            const input = this.el('audio-file');
            const file = input.files?.[0];
            if (file)
                this.player.selectFile(file);
            input.value = '';
        });
        this.on(this.el('play'), 'click', () => this.player.toggle());
        this.on(this.el('seek'), 'input', () => this.player.seek(Number(this.el('seek').value)));
        for (const id of ['loop-pre', 'loop-post']) {
            this.on(this.el(id), 'change', () => {
                const input = this.el(id);
                const value = Number(input.value);
                const minimum = id === 'loop-pre' ? 0 : 2;
                if (!input.value.trim() || !Number.isFinite(value) || value < minimum || value > 15) {
                    input.value = String(id === 'loop-pre' ? this.preRoll : this.postRoll);
                    this.message('invalidLoopSettings');
                    return;
                }
                if (id === 'loop-pre')
                    this.preRoll = value;
                else
                    this.postRoll = value;
                this.player.stopLoop();
                this.render(this.player.snapshot);
            });
        }
        this.on(this.el('rate'), 'change', () => this.player.setRate(Number(this.el('rate').value)));
        this.on(this.el('loop'), 'click', () => {
            if (this.player.snapshot.loop) {
                this.player.stopLoop();
                return;
            }
            const cue = this.song.cues.find(cue => cue.id === this.selectedId);
            if (!cue)
                return;
            const range = getLoopRange(cue, this.song.audioOffset ?? 0, this.player.snapshot.duration, this.preRoll, this.postRoll);
            if (range)
                this.player.startLoop(range);
            else
                this.message('loopUnavailable');
        });
        this.root.querySelectorAll('[data-mode]').forEach(button => {
            this.on(button, 'click', () => {
                if (this.el('batch-cues').value.trim() && !window.confirm(this.t('discardDraft')))
                    return;
                this.el('batch-cues').value = '';
                this.mode = button.dataset.mode;
                this.editing = false;
                this.closeEditor(false);
                this.listSignature = '';
                this.render(this.player.snapshot);
            });
        });
        this.on(this.el('edit-toggle'), 'click', () => {
            if (this.editing && this.el('batch-cues').value.trim() && !window.confirm(this.t('discardDraft')))
                return;
            this.editing = !this.editing;
            if (this.editing)
                this.player.pause();
            else {
                this.closeEditor(false);
                this.el('batch-cues').value = '';
            }
            this.listSignature = '';
            this.render(this.player.snapshot);
        });
        this.on(this.el('add-cue'), 'click', () => this.openEditor());
        this.on(this.el('editor-cancel'), 'click', () => this.closeEditor());
        this.on(this.el('stamp-time'), 'click', () => {
            this.el('edit-time').value = String(hundredth(Math.max(0, toSongTime(this.player.snapshot.time, this.song.audioOffset))));
        });
        this.on(this.el('cue-form'), 'submit', event => { event.preventDefault(); this.saveEditor(); });
        this.on(this.el('audio-offset'), 'change', () => {
            const input = this.el('audio-offset');
            try {
                if (!input.value.trim())
                    throw new DataError('invalidNumber', 'audioOffset');
                const next = parseSong({ ...this.song, audioOffset: Number(input.value) });
                this.commitSong(next);
            }
            catch (error) {
                input.value = String(this.song.audioOffset ?? 0);
                write(this.el('notice'), this.errorMessage(error));
                this.el('notice').hidden = false;
            }
        });
        this.on(this.el('export-json'), 'click', () => this.exportJSON());
        this.on(this.el('export-library'), 'click', () => this.exportJSON(true));
        this.on(this.el('import-json'), 'change', () => {
            const input = this.el('import-json');
            const file = input.files?.[0];
            input.value = '';
            if (file)
                void this.importJSON(file);
        });
        this.on(this.el('song-select'), 'change', () => {
            const song = this.library.songs.find(song => song.id === this.el('song-select').value);
            if (song)
                this.switchSong(song);
        });
        this.on(this.el('song-search'), 'input', () => this.renderSetlist());
        this.on(this.el('song-filter'), 'change', () => this.renderSetlist());
        this.on(this.el('study-progress'), 'change', () => {
            const value = this.el('study-progress').value;
            if (!PROGRESS.includes(value))
                return;
            this.library.progress[this.song.id] = value;
            this.persist();
            this.renderSetlist();
        });
        this.on(this.el('next-song'), 'click', () => {
            const songs = this.catalog.length ? this.catalog.map(item => this.library.songs.find(song => song.id === item.song.id)) : this.library.songs;
            const at = songs.findIndex(song => song.id === this.song.id);
            const next = [...songs.slice(at + 1), ...songs.slice(0, at + 1)].find(song => this.library.progress[song.id] !== 'mastered' && song.id !== this.song.id);
            if (next)
                this.switchSong(next);
            else
                this.message('allStudied');
        });
        this.on(this.el('undo'), 'click', () => this.recoverHistory('undo'));
        this.on(this.el('redo'), 'click', () => this.recoverHistory('redo'));
        this.on(this.el('align-cue'), 'click', () => {
            const cue = this.song.cues.find(cue => cue.id === this.selectedId);
            if (!cue || !this.player.snapshot.ready)
                return;
            this.runEdit(() => this.commitSong(parseSong({ ...this.song, audioOffset: hundredth(this.player.snapshot.time - cue.time) })));
        });
        this.on(this.el('shift-cues'), 'click', () => this.runEdit(() => {
            const input = this.el('shift-seconds');
            if (!input.value.trim())
                throw new DataError('invalidNumber', 'shift');
            this.commitSong(shiftSong(this.song, Number(input.value)));
            this.message('shifted');
        }));
        this.on(this.el('batch-add'), 'click', () => this.runEdit(() => {
            this.commitSong(parseCueLines(this.el('batch-cues').value, this.song));
            this.el('batch-cues').value = '';
            this.message('batchAdded');
        }));
        this.on(this.el('create-song'), 'click', () => this.runEdit(() => {
            const song = parseSong({ id: crypto.randomUUID(), title: this.el('new-song-title').value, artist: this.song.artist ?? 'LE SSERAFIM', timingStatus: 'user', cues: [] });
            this.library = parseLibrary({ ...this.library, songs: [...this.library.songs, song] });
            this.el('new-song-title').value = '';
            this.switchSong(song);
        }));
        this.on(this.el('rename-song'), 'click', () => this.runEdit(() => {
            this.commitSong(parseSong({ ...this.song, title: this.el('new-song-title').value }));
            this.el('new-song-title').value = '';
        }));
        this.on(this.el('reset-song'), 'click', () => {
            if (!window.confirm(this.t('resetConfirm')))
                return;
            const original = this.catalog.find(item => item.song.id === this.song.id)?.song ?? (this.song.id === this.demo.id ? this.demo : null);
            if (original)
                this.commitSong(structuredClone(original));
            else {
                this.library.songs = this.library.songs.filter(song => song.id !== this.song.id);
                delete this.library.progress[this.song.id];
                this.history.delete(this.song.id);
                this.switchSong(this.library.songs[0]);
            }
        });
        this.on(this.el('reload-library'), 'click', () => {
            if (!window.confirm(this.t('reloadConfirm')))
                return;
            const loaded = loadLibrary(storage, [...this.catalog.map(item => item.song), this.demo], this.demo.id);
            if (loaded.warning) {
                this.message(loaded.warning);
                return;
            }
            this.library = loaded.library;
            this.history.clear();
            try {
                this.savedSnapshot = storage.getItem(LIBRARY_KEY);
            }
            catch {
                this.message('storageUnavailable');
                return;
            }
            this.conflict = false;
            this.el('storage-conflict').hidden = true;
            this.importGeneration++;
            this.player.clear();
            this.selectedId = null;
            this.editing = false;
            this.closeEditor(false);
            this.el('batch-cues').value = '';
            this.song = this.library.songs.find(song => song.id === this.library.selectedId);
            this.storageWarning = '';
            this.rebuild();
        });
        this.on(this.el('overwrite-library'), 'click', () => {
            if (!window.confirm(this.t('overwriteConfirm')))
                return;
            try {
                this.savedSnapshot = storage.getItem(LIBRARY_KEY);
            }
            catch {
                this.message('storageUnavailable');
                return;
            }
            this.conflict = false;
            this.el('storage-conflict').hidden = true;
            this.persist();
        });
        this.on(window, 'storage', event => {
            const update = event;
            if ((update.key === LIBRARY_KEY || update.key === null) && update.newValue !== this.savedSnapshot) {
                this.conflict = true;
                this.el('storage-conflict').hidden = false;
            }
        });
        this.on(window, 'seatgraph:localechange', () => { this.translate(); this.rebuild(); });
        this.on(window, 'keydown', event => {
            const key = event;
            const target = key.target;
            if (key.code !== 'KeyT' || key.repeat || key.altKey || key.ctrlKey || key.metaKey || !this.editing || !this.player.snapshot.ready)
                return;
            if (target instanceof HTMLElement && (['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable))
                return;
            key.preventDefault();
            this.openEditor();
        });
        this.on(window, 'pagehide', () => { this.player.clear(); this.releaseDownloads(); });
    }
    runEdit(action) {
        try {
            action();
        }
        catch (error) {
            write(this.el('notice'), this.errorMessage(error));
            this.el('notice').hidden = false;
        }
    }
    rebuild() {
        this.translate();
        write(this.el('song-title'), this.song.title);
        write(this.el('song-artist'), this.song.artist ?? this.song.artistId ?? this.t('unknownArtist'));
        this.el('sample-note').hidden = !this.song.sample;
        this.el('audio-offset').value = String(this.song.audioOffset ?? 0);
        const select = this.el('song-select');
        select.replaceChildren(...this.library.songs.map(song => {
            const entry = this.catalog.find(item => item.song.id === song.id);
            return new Option(`${entry ? `${entry.order}. ` : ''}${song.sample ? this.t('demoOption') : song.title}`, song.id);
        }));
        select.value = this.song.id;
        this.renderSetlist();
        this.renderSources();
        this.el('study-progress').value = this.library.progress[this.song.id] ?? 'new';
        this.el('undo').disabled = !this.history.get(this.song.id)?.undo.length;
        this.el('redo').disabled = !this.history.get(this.song.id)?.redo.length;
        const builtIn = this.catalog.some(item => item.song.id === this.song.id) || this.song.id === this.demo.id;
        write(this.el('reset-song'), this.t(builtIn ? 'resetSong' : 'removeSong'));
        this.el('reset-song').disabled = !builtIn && this.library.songs.length < 2;
        const types = this.el('edit-type');
        const previousType = types.value;
        types.replaceChildren(...CUE_TYPES.map(type => new Option(this.t(type), type)));
        if (CUE_TYPES.includes(previousType))
            types.value = previousType;
        const list = this.el('cue-list'), markers = this.el('cue-markers');
        list.replaceChildren();
        markers.replaceChildren();
        this.rows = this.song.cues.map((cue, index) => {
            const row = document.createElement('li');
            row.className = 'cue-row';
            row.dataset.cueId = cue.id;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'cue-go';
            const timestamp = document.createElement('time');
            timestamp.textContent = formatTime(cue.time, true);
            const text = document.createElement('span');
            text.className = 'cue-row-text';
            const type = document.createElement('span');
            type.className = 'cue-row-type';
            button.append(timestamp, text, type);
            button.addEventListener('click', () => this.jump(cue));
            const actions = document.createElement('div');
            actions.className = 'cue-row-actions';
            const edit = document.createElement('button');
            edit.type = 'button';
            edit.textContent = this.t('edit');
            edit.setAttribute('aria-label', `${this.t('edit')} · ${this.t('cueLabel', { index: index + 1, time: formatTime(cue.time, true) })}`);
            edit.addEventListener('click', () => this.openEditor(cue));
            const remove = document.createElement('button');
            remove.type = 'button';
            remove.textContent = this.t('delete');
            remove.setAttribute('aria-label', `${this.t('delete')} · ${this.t('cueLabel', { index: index + 1, time: formatTime(cue.time, true) })}`);
            remove.addEventListener('click', () => {
                if (!window.confirm(this.t('deleteConfirm')))
                    return;
                this.player.stopLoop();
                this.closeEditor(false);
                const next = { ...this.song, timingStatus: 'user', cues: this.song.cues.filter(item => item.id !== cue.id) };
                if (this.selectedId === cue.id)
                    this.selectedId = null;
                this.commitSong(next);
                this.el('add-cue').focus();
            });
            actions.append(edit, remove);
            row.append(button, actions);
            list.append(row);
            const marker = document.createElement('button');
            marker.type = 'button';
            marker.className = 'cue-marker';
            marker.textContent = String(index + 1);
            marker.setAttribute('aria-label', this.t('cueLabel', { index: index + 1, time: formatTime(toAudioTime(cue.time, this.song.audioOffset), true) }));
            marker.addEventListener('click', () => this.jump(cue));
            markers.append(marker);
            return { cue, row, button, text, type, actions, marker };
        });
        this.el('empty-cues').hidden = !!this.rows.length;
        this.markerDuration = -1;
        this.listSignature = '';
        this.render(this.player.snapshot);
    }
    renderSources() {
        const entry = this.catalog.find(item => item.song.id === this.song.id);
        write(this.el('timing-status'), this.t(this.song.sample ? 'sampleNote' : this.song.timingStatus === 'anchors' ? 'anchorTiming' : this.song.timingStatus === 'user' ? 'userTiming' : 'missingTiming', { count: this.song.cues.length }));
        write(this.el('version-note'), this.song.versionNote ?? '');
        write(this.el('official-status'), this.t(entry ? entry.official ? 'officialAvailable' : 'noOfficial' : 'customSong'));
        const links = this.el('source-links');
        links.replaceChildren();
        for (const source of this.song.sources ?? []) {
            const link = document.createElement('a');
            link.href = source.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'source-link';
            link.textContent = source.label;
            links.append(link);
        }
    }
    renderSetlist() {
        const query = this.el('song-search').value.trim().toLocaleLowerCase();
        const filter = this.el('song-filter').value;
        const songs = this.library.songs.filter(song => {
            const entry = this.catalog.find(item => item.song.id === song.id);
            return (!query || `${song.title} ${song.artist ?? ''}`.toLocaleLowerCase().includes(query)) && (filter !== 'unfinished' || this.library.progress[song.id] !== 'mastered') && (filter !== 'official' || entry?.official) && (filter !== 'priority' || entry?.priority === 1);
        });
        const total = this.catalog.length || this.library.songs.length;
        const mastered = (this.catalog.length ? this.catalog.map(item => item.song.id) : this.library.songs.map(song => song.id)).filter(id => this.library.progress[id] === 'mastered').length;
        write(this.el('setlist-summary'), this.t('setlistSummary', { total, mastered }));
        const list = this.el('setlist-list');
        list.replaceChildren();
        songs.forEach(song => {
            const entry = this.catalog.find(item => item.song.id === song.id);
            const row = document.createElement('li'), button = document.createElement('button');
            button.type = 'button';
            button.textContent = `${entry ? `${entry.order}. ` : ''}${song.sample ? this.t('demoOption') : song.title} · ${this.t(`progress_${this.library.progress[song.id] ?? 'new'}`)}`;
            button.setAttribute('aria-pressed', String(song.id === this.song.id));
            button.addEventListener('click', () => this.switchSong(song));
            row.append(button);
            list.append(row);
        });
        this.el('no-song-results').hidden = !!songs.length;
    }
    render(snapshot) {
        write(this.el('mode-label'), this.t(this.mode));
        write(this.el('audio-status'), snapshot.loading ? this.t('audioLoading', { name: snapshot.fileName }) : snapshot.fileName ? this.t('audioReady', { name: snapshot.fileName }) : this.t('noAudio'));
        const error = this.el('audio-error');
        setHidden(error, !snapshot.error);
        if (snapshot.error)
            write(error, this.t(snapshot.error));
        const play = this.el('play');
        play.disabled = !snapshot.ready;
        write(play, this.t(snapshot.playing ? 'pause' : 'play'));
        this.el('stamp-time').disabled = !snapshot.ready;
        this.el('align-cue').disabled = !snapshot.ready || !this.selectedId;
        write(this.el('audio-time'), `${formatTime(snapshot.time)} / ${formatTime(snapshot.duration)}`);
        const seek = this.el('seek');
        seek.disabled = !snapshot.ready;
        const duration = snapshot.duration || Math.max(1, toAudioTime(this.song.duration ?? (this.song.cues.at(-1)?.time ?? 0) + 2, this.song.audioOffset));
        if (seek.max !== String(duration))
            seek.max = String(duration);
        seek.value = String(snapshot.time);
        const timeText = `${formatTime(snapshot.time)} / ${formatTime(snapshot.duration)}`;
        if (seek.getAttribute('aria-valuetext') !== timeText)
            seek.setAttribute('aria-valuetext', timeText);
        if (this.markerDuration !== duration) {
            this.markerDuration = duration;
            this.layoutMarkers(duration);
        }
        const state = getCueState(this.song, snapshot.ready ? snapshot.time : (this.song.audioOffset ?? 0) - 1);
        const stage = this.el('cue-stage');
        if (stage.dataset.phase !== state.phase)
            stage.dataset.phase = state.phase;
        write(this.el('cue-phase'), this.t(!state.current && !state.next && this.song.cues.length ? 'finished' : state.phase));
        write(this.el('cue-countdown'), !snapshot.ready ? this.t('chooseAudioFirst') : state.current ? this.t('cueNow') : state.countdown === null ? '' : this.t('countdown', { seconds: state.countdown.toFixed(1) }));
        const shown = state.current ?? state.next;
        const visible = shown && answerVisible(this.mode, this.song.cues, this.song.cues.indexOf(shown), state.time);
        write(this.el('cue-text'), !shown ? this.t(this.song.cues.length ? 'complete' : 'noCues') : visible ? shown.text : this.t(state.current ? 'recall' : 'concealed'));
        write(this.el('cue-note'), shown && visible ? shown.note ?? '' : '');
        write(this.el('cue-romanization'), shown && visible ? shown.romanization ?? '' : '');
        write(this.el('cue-translation'), shown && visible ? shown.translation ?? '' : '');
        const previousIndex = state.previous ? this.song.cues.indexOf(state.previous) : -1;
        const revealed = previousIndex >= 0 && state.time >= cueEnd(this.song.cues, previousIndex) ? state.previous : this.song.cues[previousIndex - 1];
        write(this.el('cue-reveal'), this.mode === 'test' && revealed ? this.t('reveal', { text: revealed.text }) : '');
        const selected = this.song.cues.find(cue => cue.id === this.selectedId);
        const range = selected && snapshot.ready ? getLoopRange(selected, this.song.audioOffset ?? 0, snapshot.duration, this.preRoll, this.postRoll) : null;
        const loop = this.el('loop');
        loop.disabled = !range;
        write(loop, this.t(snapshot.loop ? 'stopLoop' : 'startLoop'));
        const loopPressed = String(!!snapshot.loop);
        if (loop.getAttribute('aria-pressed') !== loopPressed)
            loop.setAttribute('aria-pressed', loopPressed);
        write(this.el('loop-status'), snapshot.loop ? this.t('loopRange', { start: formatTime(snapshot.loop.start, true), end: formatTime(snapshot.loop.end, true) }) : selected ? snapshot.ready && !range ? this.t('loopUnavailable') : this.t('selectedCue', { index: this.song.cues.indexOf(selected) + 1, time: formatTime(selected.time, true) }) : this.t('selectCue'));
        write(this.el('jump-help'), this.t('jumpHelp', { seconds: this.preRoll }));
        write(this.el('storage-status'), this.t(this.storageWarning || 'savedLocal'));
        const signature = [this.mode, this.editing, this.selectedId, state.current?.id, state.next?.id, state.phase].join('|');
        if (signature === this.listSignature)
            return;
        this.listSignature = signature;
        this.root.querySelectorAll('[data-mode]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === this.mode)));
        const edit = this.el('edit-toggle');
        edit.setAttribute('aria-pressed', String(this.editing));
        write(edit, this.t(this.editing ? 'finishEditing' : 'editCues'));
        setHidden(this.el('editor-actions'), !this.editing);
        write(this.el('list-help'), this.t(this.editing ? 'editHelp' : `${this.mode}Help`));
        this.rows.forEach(({ cue, row, button, text, type, actions, marker }, index) => {
            const visible = this.editing || answerVisible(this.mode, this.song.cues, index, state.time);
            write(text, visible ? cue.text : this.t('hiddenAnswer'));
            write(type, visible ? this.t(cue.type) : this.t('cueLabel', { index: index + 1, time: formatTime(cue.time, true) }));
            row.dataset.selected = String(cue.id === this.selectedId);
            row.dataset.active = String(cue.id === state.current?.id);
            button.setAttribute('aria-pressed', String(cue.id === this.selectedId));
            marker.setAttribute('aria-pressed', String(cue.id === this.selectedId));
            setHidden(actions, !this.editing);
        });
    }
    layoutMarkers(duration) {
        // Stack nearby markers into lanes so their 44px touch targets never overlap.
        const width = this.el('cue-markers').clientWidth || 240;
        const lanes = [];
        this.rows.forEach(({ cue, marker }) => {
            const audioTime = toAudioTime(cue.time, this.song.audioOffset);
            marker.hidden = audioTime < 0 || audioTime > duration;
            if (marker.hidden)
                return;
            const x = audioTime / duration * width;
            let lane = lanes.findIndex(end => x - end >= 46);
            if (lane < 0)
                lane = lanes.length;
            lanes[lane] = x;
            marker.style.left = `${audioTime / duration * 100}%`;
            marker.style.top = `${lane * 48}px`;
        });
        this.el('cue-markers').style.height = `${Math.max(1, lanes.length) * 48}px`;
    }
    resize() { this.markerDuration = -1; this.render(this.player.snapshot); }
    jump(cue) {
        this.selectedId = cue.id;
        this.player.stopLoop();
        if (!this.player.snapshot.ready) {
            this.message('chooseAudioFirst');
            this.render(this.player.snapshot);
            return;
        }
        if (!getLoopRange(cue, this.song.audioOffset ?? 0, this.player.snapshot.duration)) {
            this.message('loopUnavailable');
            return;
        }
        this.player.seek(cueSeekTime(cue, this.song.audioOffset, this.player.snapshot.duration, this.preRoll));
        void this.player.play();
    }
    openEditor(cue) {
        this.player.pause();
        this.player.stopLoop();
        this.editorReturn = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        this.editingId = cue?.id ?? null;
        this.el('cue-editor').hidden = false;
        write(this.el('editor-heading'), this.t(cue ? 'editCue' : 'addCue'));
        this.el('edit-time').value = String(cue?.time ?? hundredth(Math.max(0, toSongTime(this.player.snapshot.time, this.song.audioOffset))));
        this.el('edit-prepare').value = cue?.prepareAt === undefined ? '' : String(cue.prepareAt);
        this.el('edit-end').value = cue?.endTime === undefined ? '' : String(cue.endTime);
        this.el('edit-type').value = cue?.type ?? 'chant';
        this.el('edit-text').value = cue?.text ?? '';
        this.el('edit-note').value = cue?.note ?? '';
        this.el('edit-romanization').value = cue?.romanization ?? '';
        this.el('edit-translation').value = cue?.translation ?? '';
        this.el('editor-error').hidden = true;
        this.el('edit-text').focus();
    }
    closeEditor(focus = true) {
        this.el('cue-editor').hidden = true;
        this.editingId = null;
        // Remove revealed draft answers when leaving the editor for Practice/Test.
        this.el('cue-form').reset();
        if (focus)
            (this.editorReturn?.isConnected ? this.editorReturn : this.el('edit-toggle')).focus();
    }
    saveEditor() {
        try {
            const original = this.song.cues.find(cue => cue.id === this.editingId);
            const time = this.el('edit-time').value;
            if (!time.trim())
                throw new DataError('invalidNumber', 'time');
            const cue = {
                ...original,
                id: original?.id ?? crypto.randomUUID(), time: Number(time),
                type: this.el('edit-type').value,
                text: this.el('edit-text').value,
            };
            for (const field of ['romanization', 'translation']) {
                const value = this.el(`edit-${field}`).value.trim();
                if (value)
                    cue[field] = value;
                else
                    delete cue[field];
            }
            const prepare = this.el('edit-prepare').value;
            if (prepare.trim())
                cue.prepareAt = Number(prepare);
            else
                delete cue.prepareAt;
            const end = this.el('edit-end').value;
            if (end.trim())
                cue.endTime = Number(end);
            else
                delete cue.endTime;
            const note = this.el('edit-note').value.trim();
            if (note)
                cue.note = note;
            else
                delete cue.note;
            const next = parseSong({ ...this.song, timingStatus: 'user', cues: [...this.song.cues.filter(item => item.id !== cue.id), cue] });
            this.commitSong(next);
            this.selectedId = cue.id;
            this.closeEditor(false);
            this.render(this.player.snapshot);
            this.rows.find(row => row.cue.id === cue.id)?.button.focus();
        }
        catch (error) {
            write(this.el('editor-error'), this.errorMessage(error));
            this.el('editor-error').hidden = false;
        }
    }
    replaceSong(song) {
        const next = parseLibrary({ ...this.library, selectedId: song.id, songs: [...this.library.songs.filter(item => item.id !== song.id), song] });
        this.player.pause();
        this.player.stopLoop();
        if (song.id !== this.song.id)
            this.player.clear();
        this.library = next;
        this.history.delete(song.id);
        this.song = song;
        this.selectedId = null;
        this.editing = false;
        this.closeEditor(false);
        this.el('batch-cues').value = '';
        this.persist();
        this.rebuild();
    }
    switchSong(song) {
        if (song.id === this.song.id)
            return;
        if ((!this.el('cue-editor').hidden || this.el('batch-cues').value.trim()) && !window.confirm(this.t('discardDraft'))) {
            this.el('song-select').value = this.song.id;
            return;
        }
        this.importGeneration++;
        this.player.clear();
        this.selectedId = null;
        this.editing = false;
        this.closeEditor(false);
        this.el('batch-cues').value = '';
        this.song = song;
        this.library.selectedId = song.id;
        this.el('notice').hidden = true;
        this.el('new-song-title').value = '';
        this.persist();
        this.rebuild();
    }
    async importJSON(file) {
        const generation = ++this.importGeneration;
        try {
            if (file.size > MAX_LIBRARY_BYTES)
                throw new DataError('libraryTooLarge');
            const raw = await file.text();
            if (generation !== this.importGeneration)
                return;
            const backup = parseBackup(raw);
            if (!window.confirm(this.t('songs' in backup ? 'libraryImportConfirm' : 'importConfirm')))
                return;
            if ('songs' in backup) {
                const defaults = [...this.catalog.map(item => item.song), this.demo].filter(song => !backup.songs.some(item => item.id === song.id));
                const next = parseLibrary({ ...backup, songs: [...backup.songs, ...defaults] });
                this.player.clear();
                this.history.clear();
                this.library = next;
                this.song = next.songs.find(song => song.id === next.selectedId);
                this.selectedId = null;
                this.editing = false;
                this.closeEditor(false);
                this.el('batch-cues').value = '';
                this.persist();
                this.rebuild();
                this.message('libraryImported', { count: backup.songs.length });
            }
            else {
                this.replaceSong(backup);
                this.message('imported', { count: backup.cues.length });
            }
        }
        catch (error) {
            if (generation === this.importGeneration) {
                write(this.el('notice'), this.errorMessage(error));
                this.el('notice').hidden = false;
            }
        }
    }
    exportJSON(all = false) {
        try {
            const url = URL.createObjectURL(new Blob([JSON.stringify(all ? this.library : this.song, null, 2) + '\n'], { type: 'application/json' }));
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = all ? 'seatgraph-fanchant-library.json' : `${this.song.id.replace(/[^a-zA-Z0-9_-]/g, '_') || 'fanchant'}.json`;
            document.body.append(anchor);
            anchor.click();
            anchor.remove();
            // Give mobile browsers time to consume the URL before releasing it.
            this.downloads.set(url, setTimeout(() => { URL.revokeObjectURL(url); this.downloads.delete(url); }, 30000));
            this.message('exported');
        }
        catch {
            this.message('exportFailed');
        }
    }
    releaseDownloads() {
        this.downloads.forEach((timer, url) => { clearTimeout(timer); URL.revokeObjectURL(url); });
        this.downloads.clear();
    }
    dispose() { this.importGeneration++; this.unsubscribe(); this.events.abort(); this.player.dispose(); this.releaseDownloads(); }
}
