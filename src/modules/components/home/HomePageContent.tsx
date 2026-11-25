import type { ReactNode } from "react";
import { HomeBackground } from "./HomeBackground";
import { HomeMobileNav } from "./HomeMobileNav";
import { Information } from "./Information";
import { InformationSections } from "./InformationSections";

export function HomePageContent({ map }: { map: ReactNode }) {
    return (
        <div className="relative flex h-dvh flex-col md:grid md:h-auto md:min-h-dvh md:grid-cols-3 md:grid-rows-1 md:gap-0">
            <HomeBackground />
            <HomeMobileNav
                information={
                    <section className="relative flex min-h-0 flex-1 flex-col overflow-y-auto p-6 pt-12 md:p-8 md:min-h-full md:overflow-visible">
                        <Information />
                        <InformationSections />
                        <a
                            href="https://www.minsal.cl/ley-n21-030-informacion-para-la-ciudadania/"
                            target="_blank"
                            className="text-sm text-brand-text md:text-brand-accent-surface-text mt-4 block text-start underline">
                            Fuente: Ministerio de Salud
                        </a>
                    </section>
                }
                map={
                    <div className="block p-3 pt-6 pb-24 md:flex md:min-h-0 md:flex-1 md:flex-col md:p-0 md:pb-0">
                        {map}
                    </div>
                }
            />
        </div>
    );
}
