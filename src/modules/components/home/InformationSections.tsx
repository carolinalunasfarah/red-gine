"use client";

import { ChevronDown } from "lucide-react";
import {
    buttonVariants,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    ScrollArea,
} from "@/src/modules/ui";
import { cn } from "@/src/modules/utils";
import { InformationText } from "./InformationText";
import type { InformationTopic } from "./types";
import { INFORMATION_TOPICS } from "./utils/information";

export function InformationSections() {
    return (
        <div className="mt-6 flex flex-col gap-3">
            {INFORMATION_TOPICS.map((topic) => (
                <InformationSection key={topic.title} topic={topic} />
            ))}
        </div>
    );
}

function InformationSection({ topic }: { topic: InformationTopic }) {
    return (
        <Collapsible className="flex shrink-0 basis-auto flex-col overflow-hidden rounded-2xl border border-brand-surface-text bg-brand-surface text-brand-surface-text md:border-brand-accent-surface-text md:bg-brand-accent-surface md:text-brand-accent-surface-text">
            <CollapsibleTrigger
                className={cn(
                    buttonVariants({ variant: "accent" }),
                    "bg-brand-surface text-brand-surface-text hover:bg-brand-surface/85 hover:text-brand-surface-text md:bg-brand-accent-surface md:text-brand-accent-surface-text md:hover:bg-brand-accent-surface/85 md:hover:text-brand-accent-surface-text",
                    "group h-auto w-full shrink-0 justify-between rounded-none px-5 py-3 text-left whitespace-normal font-semibold",
                )}>
                {topic.title}
                <ChevronDown className="size-4 shrink-0 transition-transform group-data-panel-open:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-brand-surface text-brand-surface-text md:bg-brand-accent md:text-brand-text">
                <ScrollArea
                    className={cn(
                        "h-64 max-h-64 bg-brand-background text-brand-text md:h-auto md:max-h-none md:bg-brand-accent md:text-brand-text",
                        "**:data-[slot=scroll-area-viewport]:max-h-64 md:**:data-[slot=scroll-area-viewport]:h-auto md:**:data-[slot=scroll-area-viewport]:max-h-none",
                        "**:data-[slot=scroll-area-scrollbar]:top-2! **:data-[slot=scroll-area-scrollbar]:bottom-2! **:data-[slot=scroll-area-scrollbar]:w-1.5! **:data-[slot=scroll-area-scrollbar]:rounded-full **:data-[slot=scroll-area-scrollbar]:bg-brand-surface-text/25 md:**:data-[slot=scroll-area-scrollbar]:bg-brand-text/25",
                        "**:data-[slot=scroll-area-thumb]:rounded-full **:data-[slot=scroll-area-thumb]:bg-brand-surface-text md:**:data-[slot=scroll-area-thumb]:bg-brand-text",
                    )}>
                    <div className="px-5 pr-6 py-4 text-sm md:text-base leading-relaxed">
                        <p>
                            <InformationText text={topic.description} />
                        </p>
                        <ul className="mt-2 list-disc space-y-1 pl-5">
                            {topic.points.map((point) => (
                                <li key={point}>
                                    <InformationText text={point} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </ScrollArea>
            </CollapsibleContent>
        </Collapsible>
    );
}
