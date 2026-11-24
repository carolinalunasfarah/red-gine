import type { ReactNode } from "react";
import { HomeBackground } from "./HomeBackground";
import { Information } from "./Information";

export function HomePageContent({ map }: { map: ReactNode }) {
    return (
        <div className="relative grid w-full gap-4 md:h-dvh md:grid-cols-4 md:grid-rows-1 md:gap-0">
            <HomeBackground />
            <div className="relative z-10 min-h-56 md:min-h-0">
                <section className="relative min-h-0 overflow-y-auto p-4 md:h-full md:p-8">
                    <Information />
                </section>
            </div>
            <section className="relative z-10 flex min-h-0 flex-col overflow-hidden p-4 pt-0 md:col-span-3 md:p-8">
                <div className="flex min-h-0 flex-1 flex-col">{map}</div>
            </section>
        </div>
    );
}
