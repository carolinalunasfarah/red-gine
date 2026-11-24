import type {
    CenterPin,
    Gynecologist,
} from "@/src/modules/healthCenters/types";
import { compareSpanish, compareSpanishBy } from "@/src/modules/utils/strings";
import type { GynecologistRow } from "../types";
import { instagramHref } from "./instagram";

function contactOf(gynecologist: Gynecologist) {
    const instagram = gynecologist.instagram
        ? instagramHref(gynecologist.instagram)
        : null;
    if (instagram?.handle) return instagram.handle;

    return gynecologist.email?.trim() || null;
}

export function gynecologistRows(pins: CenterPin[]) {
    const byId = new Map<string, GynecologistRow>();

    for (const pin of pins) {
        for (const gynecologist of pin.gynecologists) {
            const existing = byId.get(gynecologist.id);
            if (existing) {
                if (!existing.centers.some((center) => center.id === pin.id)) {
                    existing.centers.push(pin);
                }
                continue;
            }

            byId.set(gynecologist.id, {
                id: gynecologist.id,
                name: gynecologist.name,
                lastname: gynecologist.lastname,
                contact: contactOf(gynecologist),
                centers: [pin],
            });
        }
    }

    for (const row of byId.values()) {
        row.centers.sort((a, b) => compareSpanish(a.name, b.name));
    }

    return [...byId.values()].sort(
        compareSpanishBy(
            (row) => row.lastname,
            (row) => row.name,
        ),
    );
}
