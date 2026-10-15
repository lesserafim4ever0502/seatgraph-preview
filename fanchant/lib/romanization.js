// Curated reading aids for the existing name calls, not a general transliterator.
// Korean transcription reference: https://www.korean.go.kr/front_eng/roman/roman_01.do
const NAME_READINGS = new Map([
    ['김채원', 'Kim Chae-won'],
    ['사쿠라', 'Sa-ku-ra'],
    ['허윤진', 'Heo Yun-jin'],
    ['카즈하', 'Ka-jeu-ha'],
    ['홍은채', 'Hong Eun-chae'],
    ['르세라핌', 'Reu-se-ra-pim'],
]);
/** Preserve manual readings; supply missing known-name readings without rewriting saved cues. */
export function cueRomanization(cue) {
    if (cue.romanization !== undefined)
        return cue.romanization;
    const names = cue.text.normalize('NFC').trim().split(/\s+/u);
    const readings = names.map(name => NAME_READINGS.get(name));
    return readings.every((value) => value !== undefined) ? readings.join(' · ') : '';
}
