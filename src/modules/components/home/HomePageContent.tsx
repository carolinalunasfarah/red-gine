"use client";

import { useEffect, useState } from "react";
import { loadCenterPins } from "@/src/modules/healthCenters/actions";
import type { CenterPin } from "@/src/modules/healthCenters/types";
import { Information } from "./Information";
import { Map } from "./Map";

export function HomePageContent() {
    const [pins, setPins] = useState<CenterPin[]>([]);

    useEffect(() => {
        void loadCenterPins()
            .then(setPins)
            .catch((error: unknown) => {
                console.error("health_centers", error);
            });
    }, []);

    return (
        <div className="grid h-dvh w-full grid-rows-2 gap-4 p-4 md:grid-cols-3 md:grid-rows-1">
            <section className="min-h-0 overflow-y-auto rounded-lg border border-brand-text p-4">
                <Information />
            </section>
            <section className="flex min-h-0 flex-col overflow-hidden rounded-lg md:col-span-2">
                <div className="min-h-0 flex-1">
                    <Map pins={pins} />
                </div>
            </section>
        </div>
    );
}
