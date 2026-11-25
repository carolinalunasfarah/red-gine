"use client";

import { useMemo, useState } from "react";
import type { CenterPin } from "@/src/modules/healthCenters/types";
import { Results } from "./Results";
import { Search } from "./Search";
import type { SearchState } from "./types";
import { filterCenters } from "./utils";

const initialSearch: SearchState = {
    mode: "center",
    place: "",
    comuna: "",
    centerQuery: "",
    gynecologistQuery: "",
};

export function Explorer({ pins }: { pins: CenterPin[] }) {
    const [search, setSearch] = useState<SearchState>(initialSearch);
    const query =
        search.mode === "center"
            ? search.centerQuery
            : search.gynecologistQuery;
    const results = useMemo(
        () =>
            filterCenters(pins, {
                mode: search.mode,
                place: search.place,
                comuna: search.comuna,
                query,
            }),
        [pins, search, query],
    );
    const placed = useMemo(
        () => results.filter((pin) => !pin.isOnline),
        [results],
    );
    const online = useMemo(
        () => results.filter((pin) => pin.isOnline),
        [results],
    );

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-3">
            <Search
                pins={pins}
                value={search}
                resultCount={results.length}
                onChange={setSearch}
            />
            <Results
                placed={placed}
                online={online}
                mode={search.mode}
                resultCount={results.length}
                hasFilter={Boolean(
                    search.place || search.comuna || query.trim(),
                )}
            />
        </div>
    );
}
