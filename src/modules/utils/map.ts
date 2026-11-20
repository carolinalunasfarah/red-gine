"use client";

import { useEffect, useState } from "react";

export function useSwipeDirection() {
    const [direction, setDirection] = useState<"down" | "right">("down");

    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)");
        const update = () => setDirection(media.matches ? "right" : "down");
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    return direction;
}

export function instagramHref(instagram: string) {
    const trimmed = instagram.trim();
    let handle = trimmed.replace(/^@/, "").split("/").filter(Boolean)[0];

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
