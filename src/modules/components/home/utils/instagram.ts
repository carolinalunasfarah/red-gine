export function instagramHref(instagram: string) {
    const trimmed = instagram.trim();
    let handle = trimmed.split("/").filter(Boolean)[0];

    if (trimmed.startsWith("http")) {
        try {
            handle = new URL(trimmed).pathname.split("/").filter(Boolean)[0];
        } catch {
            return null;
        }
    }

    return handle
        ? { href: `https://www.instagram.com/${handle}`, handle }
        : null;
}
