import type {
    CenterPin,
    Gynecologist,
} from "@/src/modules/healthCenters/types";
import { compareSpanish, compareSpanishBy } from "@/src/modules/utils/strings";

export function gynecologistRows(pins: CenterPin[]) {
    const byId = new Map<string, Gynecologist>();

    for (const pin of pins) {
        for (const gynecologist of pin.gynecologists) {
            const existing = byId.get(gynecologist.id);
            if (existing) {
                if (!existing.centers?.some((center) => center.id === pin.id)) {
                    existing.centers?.push(pin);
                }
                continue;
            }

            byId.set(gynecologist.id, {
                id: gynecologist.id,
                name: gynecologist.name,
                lastname: gynecologist.lastname,
                email: gynecologist.email?.trim() || null,
                instagram: gynecologist.instagram?.trim() || null,
                centers: [pin],
            });
        }
    }

    for (const row of byId.values()) {
        row.centers?.sort((a, b) => compareSpanish(a.name, b.name));
    }

    return [...byId.values()].sort(
        compareSpanishBy(
            (row) => row.lastname,
            (row) => row.name,
        ),
    );
}
