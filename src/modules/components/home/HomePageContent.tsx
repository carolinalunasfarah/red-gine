import type { ReactNode } from "react";
import { Information } from "./Information";

export function HomePageContent({ map }: { map: ReactNode }) {
    return (
        <div className="grid h-dvh w-full grid-rows-2 gap-4 p-4 md:grid-cols-3 md:grid-rows-1">
            <section className="min-h-0 overflow-y-auto rounded-lg border border-brand-text p-4">
                <Information />
            </section>
            <section className="flex min-h-0 flex-col overflow-hidden rounded-lg md:col-span-2">
                <div className="flex min-h-0 flex-1 flex-col">{map}</div>
            </section>
        </div>
    );
}
