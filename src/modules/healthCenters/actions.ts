"use server";

import { getCenterPins } from "./queries";

export async function loadCenterPins() {
    return getCenterPins();
}
