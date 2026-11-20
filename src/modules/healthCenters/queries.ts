import { createClient } from "@/src/modules/utils/server";
import { compareSpanishBy } from "@/src/modules/utils/strings";
import type {
    CenterPin,
    HealthCenter,
    CenterLink,
    Gynecologist,
} from "./types";

export async function getCenterPins(): Promise<CenterPin[]> {
    const supabase = await createClient();
    const [centersResult, gynecologistsResult, linksResult] = await Promise.all(
        [
            supabase
                .from("health_centers")
                .select("id, name, comuna, region, lat, lng, address"),
            supabase
                .from("gynecologists")
                .select("id, name, lastname, instagram, email")
                .eq("verified", true),
            supabase
                .from("gynecologist_health_centers")
                .select("gine_id, health_center_id"),
        ],
    );

    if (centersResult.error) {
        throw new Error(centersResult.error.message);
    }
    if (gynecologistsResult.error) {
        throw new Error(gynecologistsResult.error.message);
    }
    if (linksResult.error) {
        throw new Error(linksResult.error.message);
    }

    const gynecologistsById = new Map<string, Gynecologist>(
        ((gynecologistsResult.data ?? []) as Gynecologist[]).map((row) => [
            row.id,
            {
                id: row.id,
                name: row.name?.trim() ?? "",
                lastname: row.lastname?.trim() ?? "",
                instagram: row.instagram?.trim() || null,
                email: row.email?.trim() || null,
            },
        ]),
    );

    const gynecologistsByCenter = new Map<string, Map<string, Gynecologist>>();

    for (const link of (linksResult.data ?? []) as CenterLink[]) {
        const gynecologist = gynecologistsById.get(link.gine_id);
        if (!gynecologist) continue;

        const group =
            gynecologistsByCenter.get(link.health_center_id) ??
            new Map<string, Gynecologist>();
        group.set(gynecologist.id, gynecologist);
        gynecologistsByCenter.set(link.health_center_id, group);
    }

    return ((centersResult.data ?? []) as HealthCenter[]).flatMap((row) => {
        if (row.lat == null || row.lng == null) return [];

        const gynecologists = [
            ...(gynecologistsByCenter.get(row.id)?.values() ?? []),
        ].sort(
            compareSpanishBy(
                (gynecologist) => gynecologist.lastname,
                (gynecologist) => gynecologist.name,
            ),
        );
        if (gynecologists.length === 0) return [];

        return [
            {
                id: row.id,
                name: row.name?.trim() || "Centro",
                count: gynecologists.length,
                lat: row.lat,
                lng: row.lng,
                address: row.address?.trim() || null,
                comuna: row.comuna?.trim() || null,
                region: row.region?.trim() || null,
                gynecologists,
            },
        ];
    });
}
