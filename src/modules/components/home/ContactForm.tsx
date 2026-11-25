"use client";

import { chileLocations } from "@/src/modules/data/chileLocations";
import { submitJoinRequest } from "@/src/modules/lib/contact/actions";
import {
    JOIN_CENTER_MIN_LENGTH,
    JOIN_INSTAGRAM_MAX_LENGTH,
    JOIN_INSTAGRAM_PATTERN,
    JOIN_NAME_MIN_LENGTH,
} from "@/src/modules/lib/contact/constants";
import {
    Button,
    Input,
    Field,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/modules/ui";
import { isValidEmail } from "@/src/modules/utils";
import { Loader2 } from "lucide-react";
import { useState, useTransition, type SyntheticEvent } from "react";
import { toast } from "sonner";

interface ContactFormProps {
    idPrefix: string;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export function ContactForm({
    idPrefix,
    onSuccess,
    onCancel,
}: ContactFormProps) {
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [instagram, setInstagram] = useState("");
    const [online, setOnline] = useState(false);
    const [region, setRegion] = useState("");
    const [comuna, setComuna] = useState("");
    const [center, setCenter] = useState("");
    const [address, setAddress] = useState("");
    const [isPending, startTransition] = useTransition();

    const trimmedName = name.trim();
    const trimmedLastname = lastname.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedInstagram = instagram.trim().replace(/^@+/, "");
    const trimmedCenter = center.trim();
    const trimmedAddress = address.trim();
    const comunas =
        chileLocations.find((item) => item.nombre === region)?.comunas ?? [];

    const instagramLooksValid =
        trimmedInstagram.length === 0 ||
        (trimmedInstagram.length <= JOIN_INSTAGRAM_MAX_LENGTH &&
            JOIN_INSTAGRAM_PATTERN.test(trimmedInstagram));
    const emailLooksValid =
        trimmedEmail.length === 0 || isValidEmail(trimmedEmail);
    const hasContact =
        (trimmedEmail.length > 0 && emailLooksValid) ||
        (trimmedInstagram.length > 0 && instagramLooksValid);
    const hasPlace = online || (region.length > 0 && comuna.length > 0);

    const canSubmit =
        trimmedName.length >= JOIN_NAME_MIN_LENGTH &&
        trimmedLastname.length >= JOIN_NAME_MIN_LENGTH &&
        trimmedCenter.length >= JOIN_CENTER_MIN_LENGTH &&
        hasContact &&
        emailLooksValid &&
        instagramLooksValid &&
        hasPlace;

    function resetForm() {
        setName("");
        setLastname("");
        setEmail("");
        setInstagram("");
        setOnline(false);
        setRegion("");
        setComuna("");
        setCenter("");
        setAddress("");
    }

    function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData();
        formData.set("name", trimmedName);
        formData.set("lastname", trimmedLastname);
        formData.set("email", trimmedEmail);
        formData.set("instagram", trimmedInstagram);
        formData.set("online", online ? "true" : "false");
        formData.set("region", online ? "" : region);
        formData.set("comuna", online ? "" : comuna);
        formData.set("center", trimmedCenter);
        formData.set("address", online ? "" : trimmedAddress);

        startTransition(async () => {
            const result = await submitJoinRequest(formData);

            if (result.success) {
                toast.success(
                    "¡Muchas gracias por sumarte! Esperamos pronto subir tus datos a la red.",
                    { id: "join-sent", duration: 5000 },
                );
                resetForm();
                onSuccess?.();
                return;
            }

            if (result.error) {
                toast.error(
                    "No se pudieron enviar tus datos. Inténtalo de nuevo.",
                    {
                        id: "join-error",
                        duration: 5000,
                    },
                );
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="text-sm text-brand-text">
                Deja al menos tu correo o nombre en Instagram para que podamos
                contactarte en caso de necesitarlo.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre *" id={`${idPrefix}-name`}>
                    <Input
                        id={`${idPrefix}-name`}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Nombre"
                        autoComplete="given-name"
                        required
                    />
                </Field>
                <Field label="Apellido(s) *" id={`${idPrefix}-lastname`}>
                    <Input
                        id={`${idPrefix}-lastname`}
                        value={lastname}
                        onChange={(event) => setLastname(event.target.value)}
                        placeholder="Apellido"
                        autoComplete="family-name"
                        required
                    />
                </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Correo electrónico" id={`${idPrefix}-email`}>
                    <Input
                        id={`${idPrefix}-email`}
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="hola@ejemplo.com"
                        autoComplete="email"
                    />
                </Field>
                <Field label="Instagram" id={`${idPrefix}-instagram`}>
                    <Input
                        id={`${idPrefix}-instagram`}
                        value={instagram}
                        onChange={(event) => setInstagram(event.target.value)}
                        placeholder="usuaria"
                        autoComplete="off"
                    />
                </Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={online}
                    onChange={(event) => {
                        const next = event.target.checked;
                        setOnline(next);
                        if (next) {
                            setRegion("");
                            setComuna("");
                            setAddress("");
                        }
                    }}
                    className="size-5 accent-brand-surface"
                />
                Atiendo sólo en línea
            </label>
            {online ? null : (
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Región *" id={`${idPrefix}-region`}>
                        <Select
                            value={region || null}
                            onValueChange={(next) => {
                                setRegion(next ?? "");
                                setComuna("");
                            }}>
                            <SelectTrigger
                                id={`${idPrefix}-region`}
                                className="w-full">
                                <SelectValue placeholder="Región" />
                            </SelectTrigger>
                            <SelectContent
                                className="max-h-60"
                                collisionAvoidance={{
                                    side: "flip",
                                    align: "shift",
                                    fallbackAxisSide: "end",
                                }}>
                                {chileLocations.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.nombre}
                                        multiline>
                                        {item.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field label="Comuna *" id={`${idPrefix}-comuna`}>
                        <Select
                            value={comuna || null}
                            disabled={!region}
                            onValueChange={(next) => setComuna(next ?? "")}>
                            <SelectTrigger
                                id={`${idPrefix}-comuna`}
                                className="w-full">
                                <SelectValue placeholder="Comuna" />
                            </SelectTrigger>
                            <SelectContent
                                className="max-h-60"
                                collisionAvoidance={{
                                    side: "flip",
                                    align: "shift",
                                    fallbackAxisSide: "end",
                                }}>
                                {comunas.map((item) => (
                                    <SelectItem
                                        key={item.id}
                                        value={item.nombre}
                                        multiline>
                                        {item.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>
                </div>
            )}
            <Field label="Nombre del centro *" id={`${idPrefix}-center`}>
                <Input
                    id={`${idPrefix}-center`}
                    value={center}
                    onChange={(event) => setCenter(event.target.value)}
                    placeholder="Nombre del centro"
                    required
                />
            </Field>
            {online ? null : (
                <Field label="Dirección" id={`${idPrefix}-address`}>
                    <Input
                        id={`${idPrefix}-address`}
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder="Calle y número"
                        autoComplete="street-address"
                    />
                </Field>
            )}
            <div className="flex gap-3">
                {onCancel ? (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        className="flex-1"
                        disabled={isPending}>
                        Cancelar
                    </Button>
                ) : null}
                <Button
                    type="submit"
                    variant="accent"
                    className="flex-1"
                    disabled={isPending || !canSubmit}>
                    {isPending ? (
                        <>
                            <Loader2
                                className="size-4 animate-spin"
                                aria-hidden
                            />
                            Enviando...
                        </>
                    ) : (
                        "Enviar"
                    )}
                </Button>
            </div>
        </form>
    );
}
