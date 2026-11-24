export function includesSpanish(value: string, query: string) {
    const foldedQuery = foldSpanish(query.trim());
    if (!foldedQuery) return true;

    return foldSpanish(value).includes(foldedQuery);
}

function foldSpanish(value: string) {
    return value
        .toLocaleLowerCase("es")
        .normalize("NFD")
        .replace(/[\u0300-\u0302\u0304-\u036f]/g, "");
}

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
