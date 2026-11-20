"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { CenterPin } from "@/src/modules/healthCenters/types";
import {
    MAP_FIT_PADDING,
    MAP_STYLE,
    METROPOLITAN_REGION_BOUNDS,
} from "./constants";
import { useSwipeDirection } from "@/src/modules/utils";
import { CenterDrawer } from "./CenterDrawer";
import { createPinElement } from "./functions";

maplibregl.setWorkerUrl(
    new URL(
        "../../../../node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs",
        import.meta.url,
    ).href,
);

export function Map({ pins }: { pins: CenterPin[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<maplibregl.Marker[]>([]);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<CenterPin | null>(null);
    const swipeDirection = useSwipeDirection();

    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        const map = new maplibregl.Map({
            container: containerRef.current,
            style: MAP_STYLE,
            bounds: METROPOLITAN_REGION_BOUNDS,
            fitBoundsOptions: { padding: MAP_FIT_PADDING },
        });

        map.addControl(new maplibregl.NavigationControl(), "top-right");
        mapRef.current = map;

        const resizeObserver = new ResizeObserver(() => {
            map.resize();
        });
        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
            for (const marker of markersRef.current) marker.remove();
            markersRef.current = [];
            map.remove();
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        for (const marker of markersRef.current) marker.remove();
        markersRef.current = pins.map((pin) => {
            const element = createPinElement(pin.count);
            element.addEventListener("click", () => {
                setSelected(pin);
                setOpen(true);
            });

            return new maplibregl.Marker({ element })
                .setLngLat([pin.lng, pin.lat])
                .addTo(map);
        });
    }, [pins]);

    return (
        <>
            <div
                ref={containerRef}
                className="min-h-0 w-full flex-1 overflow-hidden rounded-lg"
            />
            <CenterDrawer
                pin={selected}
                open={open}
                onOpenChange={setOpen}
                swipeDirection={swipeDirection}
            />
        </>
    );
}
