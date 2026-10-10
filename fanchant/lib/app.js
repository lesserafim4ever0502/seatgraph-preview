// Generated from fanchant/src; run the web Fanchant build.
import { parseSong } from './model.js';
import { FanchantTrainer } from './trainer.js';
async function boot() {
    const root = document.getElementById('trainer');
    const status = document.getElementById('boot-status');
    if (!root || !status) return;
    try {
        const response = await fetch(new URL('../data/fanchants/boompala.json', import.meta.url));
        if (!response.ok) throw new Error(`Demo HTTP ${response.status}`);
        const demo = parseSong(await response.json());
        const trainer = new FanchantTrainer(root, demo);
        document.getElementById('trainer-content').hidden = false;
        status.hidden = true;
        trainer.resize();
        if (typeof ResizeObserver !== 'undefined') new ResizeObserver(()=>trainer.resize()).observe(document.getElementById('cue-markers'));
        window.addEventListener('resize', ()=>trainer.resize(), {
            passive: true
        });
    } catch  {
        status.textContent = window.SeatGraphI18n.t('fanchant.loadFailed');
        status.setAttribute('role', 'alert');
    }
}
void boot();
