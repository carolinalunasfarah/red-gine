"use client";

import { useEffect, useState } from "react";
import type { SwipeDirection } from "../types";

export function useSwipeDirection() {
    const [direction, setDirection] = useState<SwipeDirection>("down");

    useEffect(() => {
        const media = window.matchMedia("(min-width: 768px)");
        const update = () => setDirection(media.matches ? "right" : "down");
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    return direction;
}
