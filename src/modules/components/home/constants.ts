import * as maplibregl from "maplibre-gl";

export const MAP_STYLE = "https://tiles.openfreemap.org/styles/positron";

export const MAP_FIT_PADDING = 2;

export const METROPOLITAN_REGION_BOUNDS = new maplibregl.LngLatBounds(
    [-70.63, -33.73],
    [-70.63, -33.27],
);

export type HomeTab = "information" | "search" | "join";

export const tabs = [
    { id: "information", label: "Información", icon: "Info" },
    { id: "search", label: "Buscar", icon: "Search" },
    { id: "join", label: "Súmate", icon: "Heart" },
] as const;
