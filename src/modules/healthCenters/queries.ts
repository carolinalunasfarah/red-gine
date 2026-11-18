import { createClient } from "@/src/modules/utils/server";
import type { CenterPin, HealthCenter } from "./types";

export async function getCenterPins(): Promise<CenterPin[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("health_centers")
        .select("id, gine_id, name, comuna, region, lat, lng");

    if (error) {
        throw new Error(error.message);
    }

    const groups = new Map<
        string,
        CenterPin & { gynecologists: Set<string> }
    >();

    for (const row of (data ?? []) as HealthCenter[]) {
        if (row.lat == null || row.lng == null) continue;

        const key = `${row.name?.trim()}::${row.comuna?.trim()}::${row.region?.trim()}`;
        const gynecologistId = row.gine_id ?? row.id;
        const existing = groups.get(key);

        if (!existing) {
            groups.set(key, {
                id: row.id,
                count: 1,
                lat: row.lat,
                lng: row.lng,
                gynecologists: new Set([gynecologistId]),
            });
            continue;
        }

        existing.gynecologists.add(gynecologistId);
        existing.count = existing.gynecologists.size;
    }

    return [...groups.values()].map(({ id, count, lat, lng }) => ({
        id,
        count,
        lat,
        lng,
    }));
}
