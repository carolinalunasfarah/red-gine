"use server";

import { chileLocations } from "@/src/modules/data/chileLocations";
import { isValidEmail } from "@/src/modules/utils";
import {
    JOIN_ADDRESS_MAX_LENGTH,
    JOIN_CENTER_MAX_LENGTH,
    JOIN_CENTER_MIN_LENGTH,
    JOIN_EMAIL_MAX_LENGTH,
    JOIN_INSTAGRAM_MAX_LENGTH,
    JOIN_INSTAGRAM_PATTERN,
    JOIN_NAME_MAX_LENGTH,
    JOIN_NAME_MIN_LENGTH,
} from "./constants";
import type { ActionFormState } from "./types";

export async function submitJoinRequest(
    formData: FormData,
): Promise<ActionFormState> {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
        console.error("DISCORD_WEBHOOK_URL is not configured.");
        return {
            error: "El formulario no está disponible en este momento. Inténtalo más tarde.",
        };
    }

    const name = readField(formData, "name", JOIN_NAME_MAX_LENGTH);
    const lastname = readField(formData, "lastname", JOIN_NAME_MAX_LENGTH);
    const email = readField(formData, "email", JOIN_EMAIL_MAX_LENGTH).toLowerCase();
    const instagram = normalizeInstagram(
        readField(formData, "instagram", JOIN_INSTAGRAM_MAX_LENGTH + 1),
    );
    const center = readField(formData, "center", JOIN_CENTER_MAX_LENGTH);
    const address = readField(formData, "address", JOIN_ADDRESS_MAX_LENGTH);
    const online = formData.get("online") === "true";
    const region = online ? "" : readField(formData, "region", JOIN_NAME_MAX_LENGTH);
    const comuna = online ? "" : readField(formData, "comuna", JOIN_NAME_MAX_LENGTH);

    if (name.length < JOIN_NAME_MIN_LENGTH) {
        return {
            error: `El nombre debe tener al menos ${JOIN_NAME_MIN_LENGTH} caracteres.`,
        };
    }

    if (lastname.length < JOIN_NAME_MIN_LENGTH) {
        return {
            error: `El apellido debe tener al menos ${JOIN_NAME_MIN_LENGTH} caracteres.`,
        };
    }

    if (email && !isValidEmail(email)) {
        return { error: "El correo electrónico no es válido." };
    }

    if (instagram && !JOIN_INSTAGRAM_PATTERN.test(instagram)) {
        return { error: "El Instagram no es válido." };
    }

    if (instagram.length > JOIN_INSTAGRAM_MAX_LENGTH) {
        return { error: "El Instagram es demasiado largo." };
    }

    if (!email && !instagram) {
        return { error: "Indica un correo o un Instagram para poder escribirte." };
    }

    if (center.length < JOIN_CENTER_MIN_LENGTH) {
        return {
            error: `El nombre del centro debe tener al menos ${JOIN_CENTER_MIN_LENGTH} caracteres.`,
        };
    }

    if (!online) {
        const location = chileLocations.find((item) => item.nombre === region);
        const comunaExists = location?.comunas.some(
            (item) => item.nombre === comuna,
        );

        if (!location || !comunaExists) {
            return { error: "Elige una región y una comuna de la lista." };
        }
    }

    const fields = [
        { name: "Nombre", value: name, inline: true },
        { name: "Apellidos", value: lastname, inline: true },
        { name: "Correo", value: email || "—", inline: true },
        { name: "Instagram", value: instagram || "—", inline: true },
        { name: "Atención", value: online ? "En línea" : "Presencial", inline: true },
        { name: "Región", value: region || "—", inline: true },
        { name: "Comuna", value: comuna || "—", inline: true },
        { name: "Centro", value: center },
        { name: "Dirección", value: address || "—" },
    ];

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "Red Gine",
                embeds: [
                    {
                        title: "Nueva ginecóloga para sumarse",
                        fields,
                        footer: { text: "Red Gine" },
                        timestamp: new Date().toISOString(),
                    },
                ],
            }),
        });

        if (!response.ok) {
            console.error(
                "Discord webhook failed:",
                response.status,
                await response.text(),
            );
            return {
                error: "No se pudieron enviar tus datos. Inténtalo de nuevo.",
            };
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "No se pudieron enviar tus datos. Inténtalo de nuevo." };
    }
}

function readField(formData: FormData, key: string, maxLength: number) {
    return String(formData.get(key) ?? "").trim().slice(0, maxLength);
}

function normalizeInstagram(value: string) {
    return value.replace(/^@+/, "");
}
