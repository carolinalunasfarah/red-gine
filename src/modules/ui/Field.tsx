import { ReactNode } from "react";
import { Label } from "./Label";

export function Field({
    label,
    id,
    children,
}: {
    label: string;
    id: string;
    children: ReactNode;
}) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{label}</Label>
            {children}
        </div>
    );
}
