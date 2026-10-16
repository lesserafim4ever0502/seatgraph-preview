const validId = (value) => /^[A-Za-z0-9_-]{11}$/.test(value);
/** Only documented YouTube URLs; discard tracking/playlist/time parameters. */
export function youtubeId(input) {
    const text = input.trim();
    if (validId(text))
        return text;
    if (text.length > 2048)
        return null;
    try {
        const url = new URL(text);
        if (url.protocol !== 'https:' || url.username || url.password || url.port)
            return null;
        let id = null;
        if (['youtu.be', 'www.youtu.be'].includes(url.hostname)) {
            const parts = url.pathname.split('/').filter(Boolean);
            if (parts.length === 1)
                id = parts[0];
        }
        else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com', 'www.youtube-nocookie.com', 'youtube-nocookie.com'].includes(url.hostname)) {
            if (url.pathname === '/watch')
                id = url.searchParams.get('v');
            else
                id = url.pathname.match(/^\/(?:embed|shorts|live)\/([A-Za-z0-9_-]{11})\/?$/)?.[1] ?? null;
        }
        return id && validId(id) ? id : null;
    }
    catch {
        return null;
    }
}
