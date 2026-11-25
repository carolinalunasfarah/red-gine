import { chileLocations } from "@/src/modules/data/chileLocations";
import type { CenterPin } from "@/src/modules/healthCenters/types";
import { compareSpanish, includesSpanish } from "@/src/modules/utils/strings";
import type { CenterSearch } from "../types";

export const ONLINE_PLACE = "online";

export function filterCenters(pins: CenterPin[], search: CenterSearch) {
    const query = search.query.trim();

    if (search.mode === "gynecologist") {
        if (!query) return pins;

        return pins.flatMap((pin) => {
            const gynecologists = pin.gynecologists.filter((gynecologist) =>
                includesSpanish(
                    `${gynecologist.name} ${gynecologist.lastname}`,
                    query,
                ),
            );
            if (gynecologists.length === 0) return [];

            return [{ ...pin, gynecologists, count: gynecologists.length }];
        });
    }

    return pins.filter((pin) => {
        if (search.place === ONLINE_PLACE) {
            if (!pin.isOnline) return false;
        } else if (search.place || search.comuna) {
            if (pin.isOnline) return false;
            if (search.place && pin.region !== search.place) return false;
            if (search.comuna && pin.comuna !== search.comuna) return false;
        }

        return !query || includesSpanish(pin.name, query);
    });
}

export function regionOptions(pins: CenterPin[]) {
    const regions = new Set(
        pins.flatMap((pin) =>
            !pin.isOnline && pin.region ? [pin.region] : [],
        ),
    );

    return chileLocations
        .filter((region) => regions.has(region.nombre))
        .map((region) => region.nombre);
}

export function comunaOptions(pins: CenterPin[], region: string) {
    const comunas = new Set(
        pins.flatMap((pin) =>
            !pin.isOnline && pin.region === region && pin.comuna
                ? [pin.comuna]
                : [],
        ),
    );
    const catalog = chileLocations.find((item) => item.nombre === region);
    if (!catalog) return [...comunas].sort(compareSpanish);

    return catalog.comunas
        .map((comuna) => comuna.nombre)
        .filter((nombre) => comunas.has(nombre));
}

export function hasOnlineCenters(pins: CenterPin[]) {
    return pins.some((pin) => pin.isOnline);
}
