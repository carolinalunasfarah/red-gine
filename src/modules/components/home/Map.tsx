"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { CenterPin } from "@/src/modules/healthCenters/types";
import {
    MAP_FIT_PADDING,
    MAP_STYLE,
    METROPOLITAN_REGION_BOUNDS,
} from "./constants";
import type { MapFrame } from "./types";
import { createPinElement } from "./utils";

maplibregl.setWorkerUrl(
    new URL(
        "../../../../node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs",
        import.meta.url,
    ).href,
);

export function Map({
    pins,
    frame,
    onSelect,
}: {
    pins: CenterPin[];
    frame: MapFrame;
    onSelect: (pin: CenterPin) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<maplibregl.Marker[]>([]);
    const frameRef = useRef(frame);
    const pinsRef = useRef(pins);
    const viewKeyRef = useRef("");

    useEffect(() => {
        frameRef.current = frame;
        pinsRef.current = pins;
    }, [frame, pins]);

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

        let hidden = true;
        const resizeObserver = new ResizeObserver(() => {
            map.resize();
            const visible = (containerRef.current?.clientHeight ?? 0) > 0;
            if (visible && hidden) {
                const nextKey = viewKey(frameRef.current, pinsRef.current);
                if (viewKeyRef.current !== nextKey) {
                    fitMap(map, frameRef.current, pinsRef.current);
                    viewKeyRef.current = nextKey;
                }
            }
            hidden = !visible;
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
        markersRef.current = pins.flatMap((pin) => {
            if (pin.lat == null || pin.lng == null) return [];

            const element = createPinElement(pin.count);
            element.addEventListener("click", () => onSelect(pin));

            return [
                new maplibregl.Marker({ element })
                    .setLngLat([pin.lng, pin.lat])
                    .addTo(map),
            ];
        });
    }, [onSelect, pins]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || (containerRef.current?.clientHeight ?? 0) === 0) return;

        fitMap(map, frame, pins);
        viewKeyRef.current = viewKey(frame, pins);
    }, [frame, pins]);

    return (
        <div
            ref={containerRef}
            className="min-h-[70dvh] w-full flex-1 overflow-hidden rounded-lg md:min-h-0"
        />
    );
}

function viewKey(frame: MapFrame, pins: CenterPin[]) {
    return `${frame}:${pins.map((pin) => pin.id).join("\0")}`;
}

function fitMap(map: maplibregl.Map, frame: MapFrame, pins: CenterPin[]) {
    const located = pins.filter(
        (pin): pin is CenterPin & { lat: number; lng: number } =>
            pin.lat != null && pin.lng != null,
    );

    if (frame === "default") {
        map.fitBounds(METROPOLITAN_REGION_BOUNDS, {
            padding: MAP_FIT_PADDING,
        });
        return;
    }

    if (located.length === 0) return;

    if (located.length === 1) {
        map.easeTo({
            center: [located[0].lng, located[0].lat],
            zoom: 12,
        });
        return;
    }

    const bounds = new maplibregl.LngLatBounds();
    for (const pin of located) bounds.extend([pin.lng, pin.lat]);
    map.fitBounds(bounds, { padding: 48, maxZoom: 12 });
}
