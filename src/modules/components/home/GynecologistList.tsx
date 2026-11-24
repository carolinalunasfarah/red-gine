import type {
    CenterPin,
    Gynecologist,
} from "@/src/modules/healthCenters/types";

export function GynecologistList({
    title,
    rows,
    onSelect,
    className,
}: {
    title: string;
    rows: Gynecologist[];
    onSelect: (pin: CenterPin) => void;
    className?: string;
}) {
    return (
        <section className={className}>
            <h2 className="mb-2 text-sm font-medium">{title}</h2>
            <ul className="flex flex-col gap-2 overflow-y-auto">
                {rows.map((row) => (
                    <li
                        key={row.id}
                        className="rounded-lg bg-brand-surface/20 px-3 py-2">
                        <span className="block text-base font-medium">
                            {`${row.name} ${row.lastname}`.trim()}
                        </span>
                        <ul className="mt-1 flex flex-col">
                            {row.centers?.map((center) => (
                                <li key={center.id}>
                                    <button
                                        type="button"
                                        onClick={() => onSelect(center)}
                                        className="cursor-pointer text-left text-sm text-brand-text/80 underline">
                                        {center.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
}
