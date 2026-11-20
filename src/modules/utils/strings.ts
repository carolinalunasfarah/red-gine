export function compareSpanish(a: string, b: string) {
    return a.localeCompare(b, "es", { sensitivity: "base" });
}

export function compareSpanishBy<T>(...pick: Array<(item: T) => string>) {
    return (a: T, b: T) => {
        for (const getValue of pick) {
            const result = compareSpanish(getValue(a), getValue(b));
            if (result !== 0) return result;
        }
        return 0;
    };
}
