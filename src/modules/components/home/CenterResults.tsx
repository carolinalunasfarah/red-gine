"use client";

import { useCallback, useState } from "react";
import type { CenterPin } from "@/src/modules/healthCenters/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/modules/ui";
import { useSwipeDirection } from "./hooks/useSwipeDirection";
import { CenterDrawer } from "./CenterDrawer";
import { CenterList } from "./CenterList";
import { Map } from "./Map";

export function CenterResults({
    placed,
    online,
    resultCount,
    hasFilter,
}: {
    placed: CenterPin[];
    online: CenterPin[];
    resultCount: number;
    hasFilter: boolean;
}) {
    const [selected, setSelected] = useState<CenterPin | null>(null);
    const [open, setOpen] = useState(false);
    const swipeDirection = useSwipeDirection();
    const selectPin = useCallback((pin: CenterPin) => {
        setSelected(pin);
        setOpen(true);
    }, []);
    const showOnlineOnMap = placed.length === 0 && online.length > 0;

    return (
        <>
            <Tabs
                defaultValue="map"
                className="min-h-0 w-full flex-1 flex-col gap-3">
                <TabsList className="horizontal h-10 w-full shrink-0">
                    <TabsTrigger value="map" className="h-8 flex-1">
                        Mapa ({resultCount})
                    </TabsTrigger>
                    <TabsTrigger value="list" className="h-8 flex-1">
                        Listado ({resultCount})
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    value="map"
                    keepMounted
                    className="flex min-h-0 w-full flex-1 flex-col gap-3">
                    {showOnlineOnMap && (
                        <CenterList
                            title="En línea"
                            pins={online}
                            onSelect={selectPin}
                            className="max-h-40"
                        />
                    )}
                    <Map
                        pins={placed}
                        frame={hasFilter ? "results" : "default"}
                        onSelect={selectPin}
                    />
                </TabsContent>
                <TabsContent
                    value="list"
                    className="flex min-h-[70dvh] w-full flex-1 flex-col gap-4 overflow-y-auto md:min-h-0">
                    {online.length > 0 && (
                        <CenterList
                            title="En línea"
                            pins={online}
                            onSelect={selectPin}
                        />
                    )}
                    {placed.length > 0 && (
                        <CenterList
                            title="Centros"
                            pins={placed}
                            onSelect={selectPin}
                        />
                    )}
                </TabsContent>
            </Tabs>
            <CenterDrawer
                pin={selected}
                open={open}
                onOpenChange={setOpen}
                swipeDirection={swipeDirection}
            />
        </>
    );
}
