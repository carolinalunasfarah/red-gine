"use client";

import { XIcon } from "lucide-react";
import type { CenterPin } from "@/src/modules/healthCenters/types";
import {
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from "@/src/modules/ui";
import { instagramHref } from "@/src/modules/utils";

export function CenterDrawer({
    pin,
    open,
    onOpenChange,
    swipeDirection,
}: {
    pin: CenterPin | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    swipeDirection: "down" | "right";
}) {
    const destination = pin?.address
        ? encodeURIComponent(
              [pin.address, pin.comuna, pin.region].filter(Boolean).join(", "),
          )
        : null;

    return (
        <Drawer
            open={open}
            onOpenChange={onOpenChange}
            showSwipeHandle
            swipeDirection={swipeDirection}>
            <DrawerContent>
                {pin && (
                    <>
                        <DrawerHeader className="relative pr-12">
                            <DrawerTitle>{pin.name}</DrawerTitle>
                            {pin.address && (
                                <p className="text-sm md:text-base">
                                    {pin.address}
                                </p>
                            )}
                            <DrawerDescription className="sr-only">
                                Ginecólogas de este centro
                            </DrawerDescription>
                            {destination && (
                                <div className="mt-2 flex flex-col gap-2">
                                    <p className="text-base font-medium">
                                        ¿Cómo llegar?
                                    </p>
                                    <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                                        <Button
                                            nativeButton={false}
                                            size="sm"
                                            className="text-xs md:text-sm"
                                            render={
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${destination}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            }>
                                            Google Maps
                                        </Button>
                                        <Button
                                            nativeButton={false}
                                            size="sm"
                                            className="text-xs md:text-sm"
                                            render={
                                                <a
                                                    href={`https://maps.apple.com/?daddr=${destination}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                />
                                            }>
                                            Apple Maps
                                        </Button>
                                    </div>
                                </div>
                            )}
                            <DrawerClose className="absolute top-4 right-4 flex size-6 cursor-pointer items-center justify-center rounded-full bg-brand-background text-brand-text">
                                <XIcon className="size-4" />
                                <span className="sr-only">Cerrar</span>
                            </DrawerClose>
                        </DrawerHeader>
                        <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-3 pb-4 [scrollbar-color:var(--color-brand-surface)_transparent] scrollbar-thin [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-surface [&::-webkit-scrollbar-track]:bg-transparent">
                            <ul className="flex flex-col gap-3">
                                {pin.gynecologists.map(
                                    (gynecologist, index) => {
                                        const instagram = gynecologist.instagram
                                            ? instagramHref(
                                                  gynecologist.instagram,
                                              )
                                            : null;
                                        const email =
                                            gynecologist.email?.trim();

                                        return (
                                            <li
                                                key={gynecologist.id}
                                                className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1">
                                                <span className="col-start-1 row-start-1 inline-flex h-5 min-w-5 items-center justify-center self-center rounded-full bg-brand-text px-1 text-xs leading-none font-bold text-brand-background md:text-sm">
                                                    {index + 1}
                                                </span>
                                                <span className="col-start-2 row-start-1 text-base md:text-lg">
                                                    {`${gynecologist.name} ${gynecologist.lastname}`.trim()}
                                                </span>
                                                {instagram ? (
                                                    <a
                                                        href={instagram.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="col-start-2 row-start-2 text-brand-surface-text underline">
                                                        @{instagram.handle}
                                                    </a>
                                                ) : (
                                                    email && (
                                                        <a
                                                            href={`mailto:${email}`}
                                                            className="col-start-2 row-start-2 text-brand-surface-text underline">
                                                            {email}
                                                        </a>
                                                    )
                                                )}
                                            </li>
                                        );
                                    },
                                )}
                            </ul>
                        </div>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    );
}
