"use client";

import { buttonVariants } from "@/src/modules/ui";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/modules/ui";
import { cn } from "@/src/modules/utils";
import { useState } from "react";
import { ContactForm } from "./ContactForm";

export function ContactDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                className={cn(
                    buttonVariants({ variant: "accent" }),
                    "shrink-0",
                )}>
                Enviar mis datos
            </DialogTrigger>
            <DialogContent className="max-h-[min(40rem,calc(100dvh-1rem))] overflow-y-hidden">
                <DialogHeader>
                    <DialogTitle>¡Súmate a Red Gine!</DialogTitle>
                </DialogHeader>
                <ContactForm
                    idPrefix="join-dialog"
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
