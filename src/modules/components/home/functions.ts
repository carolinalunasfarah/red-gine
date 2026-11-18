export function createPinElement(count: number) {
    const pin = document.createElement("div");
    pin.textContent = String(count);
    pin.style.width = "28px";
    pin.style.height = "28px";
    pin.style.borderRadius = "999px";
    pin.style.background = "#664b7c";
    pin.style.color = "#ffffff";
    pin.style.display = "flex";
    pin.style.alignItems = "center";
    pin.style.justifyContent = "center";
    pin.style.fontWeight = "700";
    pin.style.fontSize = "13px";
    pin.style.border = "2px solid #ffffff";
    pin.style.boxShadow = "0 1px 4px rgba(0, 0, 0, 0.35)";

    return pin;
}
