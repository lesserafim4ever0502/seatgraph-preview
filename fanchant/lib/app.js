import { parseSong } from './model.js?v=853c406c5363';
import { FanchantTrainer } from './trainer.js?v=853c406c5363';
import { parseCatalog } from './library.js?v=853c406c5363';
function asset(path) {
    const url = new URL(path, import.meta.url);
    url.search = new URL(import.meta.url).search;
    return url;
}
async function boot() {
    const root = document.getElementById('trainer');
    const status = document.getElementById('boot-status');
    if (!root || !status)
        return;
    try {
        const [demoResponse, catalogResponse] = await Promise.all([
            fetch(asset('../data/fanchants/boompala.json')),
            fetch(asset('../data/fanchants/catalog.json')),
        ]);
        if (!demoResponse.ok || !catalogResponse.ok)
            throw new Error('Fanchant data unavailable');
        const demo = parseSong(await demoResponse.json());
        const catalog = parseCatalog(await catalogResponse.json());
        const trainer = new FanchantTrainer(root, demo, catalog);
        document.getElementById('trainer-content').hidden = false;
        status.hidden = true;
        trainer.resize();
        if (typeof ResizeObserver !== 'undefined')
            new ResizeObserver(() => trainer.resize()).observe(document.getElementById('cue-markers'));
        window.addEventListener('resize', () => trainer.resize(), { passive: true });
    }
    catch {
        status.textContent = window.SeatGraphI18n.t('fanchant.loadFailed');
        status.setAttribute('role', 'alert');
    }
}
void boot();
