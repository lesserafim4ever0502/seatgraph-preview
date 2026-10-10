import { LocalAudioPlayer } from './audio.js';
import { answerVisible, cueEnd, cueSeekTime, formatTime, getCueState, getLoopRange, toAudioTime, toSongTime } from './engine.js';
import { CUE_TYPES, DataError, loadSong, MAX_JSON_BYTES, parseSong, parseSongJSON, saveSong } from './model.js';
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
    song;
    mode = 'learn';
    selectedId = null;
    editing = false;
    editingId = null;
    editorReturn = null;
    rows = [];
    listSignature = '';
    markerDuration = -1;
    storageWarning = '';
    importGeneration = 0;
    unsubscribe;
    events = new AbortController();
    downloads = new Map();
    player;
    constructor(root, demo) {
        this.root = root;
        this.demo = demo;
        const loaded = loadSong(storage, demo);
        this.song = loaded.song;
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
        this.storageWarning = saveSong(storage, this.song) ? '' : 'storageUnavailable';
        write(this.el('storage-status'), this.t(this.storageWarning || 'savedLocal'));
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
        this.on(this.el('rate'), 'change', () => this.player.setRate(Number(this.el('rate').value)));
        this.on(this.el('loop'), 'click', () => {
            if (this.player.snapshot.loop) {
                this.player.stopLoop();
                return;
            }
            const cue = this.song.cues.find(cue => cue.id === this.selectedId);
            if (!cue)
                return;
            const range = getLoopRange(cue, this.song.audioOffset ?? 0, this.player.snapshot.duration);
            if (range)
                this.player.startLoop(range);
            else
                this.message('loopUnavailable');
        });
        this.root.querySelectorAll('[data-mode]').forEach(button => {
            this.on(button, 'click', () => {
                this.mode = button.dataset.mode;
                this.editing = false;
                this.closeEditor(false);
                this.listSignature = '';
                this.render(this.player.snapshot);
            });
        });
        this.on(this.el('edit-toggle'), 'click', () => {
            this.editing = !this.editing;
            if (this.editing)
                this.player.pause();
            else
                this.closeEditor(false);
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
                this.player.stopLoop();
                this.song = next;
                this.persist();
                this.rebuild();
            }
            catch (error) {
                input.value = String(this.song.audioOffset ?? 0);
                write(this.el('notice'), this.errorMessage(error));
                this.el('notice').hidden = false;
            }
        });
        this.on(this.el('export-json'), 'click', () => this.exportJSON());
        this.on(this.el('import-json'), 'change', () => {
            const input = this.el('import-json');
            const file = input.files?.[0];
            input.value = '';
            if (file)
                void this.importJSON(file);
        });
        this.on(this.el('song-select'), 'change', () => {
            if (this.el('song-select').value === 'demo' && window.confirm(this.t('demoConfirm'))) {
                this.replaceSong(structuredClone(this.demo));
            }
            else
                this.el('song-select').value = 'current';
        });
        this.on(window, 'seatgraph:localechange', () => { this.translate(); this.rebuild(); });
        this.on(window, 'pagehide', () => { this.player.clear(); this.releaseDownloads(); });
    }
    rebuild() {
        this.translate();
        write(this.el('song-title'), this.song.title);
        write(this.el('song-artist'), this.song.artist ?? this.song.artistId ?? this.t('unknownArtist'));
        this.el('sample-note').hidden = !this.song.sample;
        this.el('audio-offset').value = String(this.song.audioOffset ?? 0);
        const select = this.el('song-select');
        select.replaceChildren(new Option(this.song.title, 'current'), new Option(this.t('demoOption'), 'demo'));
        select.value = 'current';
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
                this.song = { ...this.song, cues: this.song.cues.filter(item => item.id !== cue.id) };
                if (this.selectedId === cue.id)
                    this.selectedId = null;
                this.persist();
                this.rebuild();
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
        const state = getCueState(this.song, snapshot.ready ? snapshot.time : this.song.audioOffset ?? 0);
        const stage = this.el('cue-stage');
        if (stage.dataset.phase !== state.phase)
            stage.dataset.phase = state.phase;
        write(this.el('cue-phase'), this.t(!state.current && !state.next && this.song.cues.length ? 'finished' : state.phase));
        write(this.el('cue-countdown'), !snapshot.ready ? this.t('chooseAudioFirst') : state.current ? this.t('cueNow') : state.countdown === null ? '' : this.t('countdown', { seconds: state.countdown.toFixed(1) }));
        const shown = state.current ?? state.next;
        const visible = shown && answerVisible(this.mode, this.song.cues, this.song.cues.indexOf(shown), state.time);
        write(this.el('cue-text'), !shown ? this.t(this.song.cues.length ? 'complete' : 'noCues') : visible ? shown.text : this.t(state.current ? 'recall' : 'concealed'));
        write(this.el('cue-note'), shown && visible ? shown.note ?? '' : '');
        const previousIndex = state.previous ? this.song.cues.indexOf(state.previous) : -1;
        const revealed = previousIndex >= 0 && state.time >= cueEnd(this.song.cues, previousIndex) ? state.previous : this.song.cues[previousIndex - 1];
        write(this.el('cue-reveal'), this.mode === 'test' && revealed ? this.t('reveal', { text: revealed.text }) : '');
        const selected = this.song.cues.find(cue => cue.id === this.selectedId);
        const range = selected && snapshot.ready ? getLoopRange(selected, this.song.audioOffset ?? 0, snapshot.duration) : null;
        const loop = this.el('loop');
        loop.disabled = !range;
        write(loop, this.t(snapshot.loop ? 'stopLoop' : 'startLoop'));
        const loopPressed = String(!!snapshot.loop);
        if (loop.getAttribute('aria-pressed') !== loopPressed)
            loop.setAttribute('aria-pressed', loopPressed);
        write(this.el('loop-status'), snapshot.loop ? this.t('loopRange', { start: formatTime(snapshot.loop.start, true), end: formatTime(snapshot.loop.end, true) }) : selected ? snapshot.ready && !range ? this.t('loopUnavailable') : this.t('selectedCue', { index: this.song.cues.indexOf(selected) + 1, time: formatTime(selected.time, true) }) : this.t('selectCue'));
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
        this.player.seek(cueSeekTime(cue, this.song.audioOffset, this.player.snapshot.duration));
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
        this.el('edit-type').value = cue?.type ?? 'chant';
        this.el('edit-text').value = cue?.text ?? '';
        this.el('edit-note').value = cue?.note ?? '';
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
            const prepare = this.el('edit-prepare').value;
            if (prepare.trim())
                cue.prepareAt = Number(prepare);
            else
                delete cue.prepareAt;
            const note = this.el('edit-note').value.trim();
            if (note)
                cue.note = note;
            else
                delete cue.note;
            this.song = parseSong({ ...this.song, cues: [...this.song.cues.filter(item => item.id !== cue.id), cue] });
            this.selectedId = cue.id;
            this.persist();
            this.closeEditor(false);
            this.rebuild();
            this.rows.find(row => row.cue.id === cue.id)?.button.focus();
        }
        catch (error) {
            write(this.el('editor-error'), this.errorMessage(error));
            this.el('editor-error').hidden = false;
        }
    }
    replaceSong(song) {
        this.player.pause();
        this.player.stopLoop();
        if (song.id !== this.song.id)
            this.player.clear();
        this.song = song;
        this.selectedId = null;
        this.closeEditor(false);
        this.persist();
        this.rebuild();
    }
    async importJSON(file) {
        const generation = ++this.importGeneration;
        try {
            if (file.size > MAX_JSON_BYTES)
                throw new DataError('tooLarge');
            const raw = await file.text();
            if (generation !== this.importGeneration)
                return;
            const song = parseSongJSON(raw);
            if (!window.confirm(this.t('importConfirm')))
                return;
            this.replaceSong(song);
            this.message('imported', { count: song.cues.length });
        }
        catch (error) {
            if (generation === this.importGeneration) {
                write(this.el('notice'), this.errorMessage(error));
                this.el('notice').hidden = false;
            }
        }
    }
    exportJSON() {
        try {
            const url = URL.createObjectURL(new Blob([JSON.stringify(this.song, null, 2) + '\n'], { type: 'application/json' }));
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `${this.song.id.replace(/[^a-zA-Z0-9_-]/g, '_') || 'fanchant'}.json`;
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
