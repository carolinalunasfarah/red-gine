import type { ReactNode } from "react";
import { ContactDialog } from "./ContactDialog";
import { ContactForm } from "./ContactForm";
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
                    <section className="relative flex min-h-0 flex-1 flex-col overflow-y-auto p-6 pt-12 md:p-8 md:min-h-full">
                        <Information />
                        <InformationSections />
                        <a
                            href="https://www.minsal.cl/ley-n21-030-informacion-para-la-ciudadania/"
                            target="_blank"
                            className="text-sm text-brand-text/80 mt-4 block text-start underline">
                            Fuente: Ministerio de Salud
                        </a>
                        <article className="mt-10 hidden w-full flex-nowrap items-center justify-between gap-4 md:flex">
                            <h3 className="min-w-0 text-md leading-tight font-semibold">
                                ¿Eres no objetora de conciencia?
                            </h3>
                            <span className="shrink-0">
                                <ContactDialog />
                            </span>
                        </article>
                    </section>
                }
                join={
                    <section className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 pt-12 pb-24">
                        <h2 className="text-xl font-bold">
                            ¡Súmate a Red Gine!
                        </h2>
                        <div className="mt-6">
                            <ContactForm idPrefix="join-page" />
                        </div>
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
