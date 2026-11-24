"use client";

import type { CenterPin } from "@/src/modules/healthCenters/types";
import {
    Button,
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/modules/ui";
import type { SearchState } from "./types";
import {
    ONLINE_PLACE,
    comunaOptions,
    hasOnlineCenters,
    regionOptions,
} from "./utils/centers";

export function Search({
    pins,
    value,
    resultCount,
    onChange,
}: {
    pins: CenterPin[];
    value: SearchState;
    resultCount: number;
    onChange: (value: SearchState) => void;
}) {
    const regions = regionOptions(pins);
    const comunas =
        value.place && value.place !== ONLINE_PLACE
            ? comunaOptions(pins, value.place)
            : [];

    function clearFilters() {
        onChange({
            ...value,
            place: "",
            comuna: "",
            centerQuery: "",
            gynecologistQuery: "",
        });
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
                <Button
                    size="sm"
                    variant={value.mode === "center" ? "secondary" : "outline"}
                    onClick={() => onChange({ ...value, mode: "center" })}>
                    Centro
                </Button>
                <Button
                    size="sm"
                    variant={
                        value.mode === "gynecologist" ? "secondary" : "outline"
                    }
                    onClick={() =>
                        onChange({ ...value, mode: "gynecologist" })
                    }>
                    Ginecóloga
                </Button>
            </div>
            {value.mode === "center" ? (
                <div className="flex flex-col gap-2 md:flex-row">
                    <Select
                        value={value.place || null}
                        onValueChange={(next) =>
                            onChange({
                                ...value,
                                place: next ?? "",
                                comuna: "",
                            })
                        }>
                        <SelectTrigger className="w-full md:w-56">
                            <SelectValue placeholder="Región" />
                        </SelectTrigger>
                        <SelectContent>
                            {hasOnlineCenters(pins) && (
                                <SelectItem value={ONLINE_PLACE}>
                                    En línea
                                </SelectItem>
                            )}
                            {regions.map((region) => (
                                <SelectItem
                                    key={region}
                                    value={region}
                                    multiline>
                                    {region}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {value.place !== ONLINE_PLACE && (
                        <Select
                            value={value.comuna || null}
                            disabled={!value.place}
                            onValueChange={(next) =>
                                onChange({ ...value, comuna: next ?? "" })
                            }>
                            <SelectTrigger className="w-full md:w-56">
                                <SelectValue placeholder="Comuna" />
                            </SelectTrigger>
                            <SelectContent>
                                {comunas.map((item) => (
                                    <SelectItem key={item} value={item} multiline>
                                        {item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    <Input
                        value={value.centerQuery}
                        onChange={(event) =>
                            onChange({
                                ...value,
                                centerQuery: event.target.value,
                            })
                        }
                        placeholder="Nombre del centro"
                        className="md:max-w-xs"
                    />
                    <Button size="sm" variant="outline" onClick={clearFilters}>
                        Limpiar
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-2 md:flex-row">
                    <Input
                        value={value.gynecologistQuery}
                        onChange={(event) =>
                            onChange({
                                ...value,
                                gynecologistQuery: event.target.value,
                            })
                        }
                        placeholder="Nombre o apellido"
                        className="md:max-w-xs"
                    />
                    <Button size="sm" variant="outline" onClick={clearFilters}>
                        Limpiar
                    </Button>
                </div>
            )}
            {resultCount === 0 && (
                <p className="text-sm">No se encontraron resultados</p>
            )}
        </div>
    );
}
