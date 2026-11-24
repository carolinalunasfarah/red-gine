"use client";

import { Info, Search, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/src/modules/utils";
import { tabs, type HomeTab } from "./constants";

const tabIcons = {
    Info,
    Search,
} satisfies Record<(typeof tabs)[number]["icon"], LucideIcon>;

export function HomeMobileNav({
    information,
    map,
}: {
    information: ReactNode;
    map: ReactNode;
}) {
    const [tab, setTab] = useState<HomeTab>("information");

    return (
        <>
            <div
                className={cn(
                    "relative z-10 min-h-0 md:flex md:min-h-full md:flex-col",
                    tab === "information" ? "flex flex-1 flex-col" : "hidden",
                )}>
                {information}
            </div>
            <section
                className={cn(
                    "relative z-10 min-h-0 flex-col overflow-y-auto p-4 md:col-span-2 md:flex md:overflow-hidden md:p-8",
                    tab === "search" ? "flex flex-1" : "hidden",
                )}>
                {map}
            </section>
            <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 border-t border-brand-surface bg-brand-background pb-[env(safe-area-inset-bottom)] md:hidden">
                {tabs.map(({ id, label, icon }) => {
                    const selected = tab === id;
                    const TabIcon = tabIcons[icon];

                    return (
                        <button
                            key={id}
                            type="button"
                            aria-current={selected ? "page" : undefined}
                            onClick={() => setTab(id)}
                            className={cn(
                                "flex cursor-pointer flex-col items-center gap-1 py-2 text-xs",
                                selected
                                    ? "text-brand-surface-text bg-brand-surface"
                                    : "text-brand-text/55",
                            )}>
                            <TabIcon className="size-5" />
                            {label}
                        </button>
                    );
                })}
            </nav>
        </>
    );
}
