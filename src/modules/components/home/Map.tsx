"use client";

import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

maplibregl.setWorkerUrl(
  new URL(
    "../../../../node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs",
    import.meta.url,
  ).href,
);

interface CentroAtencion {
  nombreCentro: string;
  comuna: string;
  region: string;
  lat: number;
  lng: number;
}

export interface Ginecologa {
  id: string;
  nombre: string;
  apellidos: string;
  contacto: {
    instagram?: string;
    email?: string;
  };
  centros: CentroAtencion[];
  verificado: boolean;
}

export function Map({ ginecologas }: { ginecologas: Ginecologa[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: [-70.67, -33.45],
      zoom: 4,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    const coordinates: [number, number][] = [];
    const pinColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-brand-background")
        .trim() || "#664b7c";

    for (const ginecologa of ginecologas) {
      for (const centro of ginecologa.centros) {
        const coordinate: [number, number] = [centro.lng, centro.lat];
        coordinates.push(coordinate);

        new maplibregl.Marker({ color: pinColor })
          .setLngLat(coordinate)
          .setPopup(
            new maplibregl.Popup().setText(
              `${ginecologa.nombre} ${ginecologa.apellidos} · ${centro.nombreCentro}`,
            ),
          )
          .addTo(map);
      }
    }

    if (coordinates.length === 1) {
      map.setCenter(coordinates[0]);
      map.setZoom(12);
    } else if (coordinates.length > 1) {
      const bounds = coordinates.reduce(
        (nextBounds, coordinate) => nextBounds.extend(coordinate),
        new maplibregl.LngLatBounds(coordinates[0], coordinates[0]),
      );
      map.fitBounds(bounds, { padding: 80, maxZoom: 11 });
    }

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
    };
  }, [ginecologas]);

  return <div ref={containerRef} className="h-full w-full" />;
}
