import type { CenterPin } from "@/src/modules/healthCenters/types";

export function CenterList({
    title,
    pins,
    onSelect,
    className,
}: {
    title: string;
    pins: CenterPin[];
    onSelect: (pin: CenterPin) => void;
    className?: string;
}) {
    return (
        <section className={className}>
            <h2 className="mb-2 text-sm font-medium">{title}</h2>
            <ul className="flex flex-col gap-2 overflow-y-auto">
                {pins.map((pin) => (
                    <li key={pin.id}>
                        <button
                            type="button"
                            onClick={() => onSelect(pin)}
                            className="w-full cursor-pointer rounded-lg bg-brand-surface/20 px-3 py-2 text-left">
                            <span className="block text-base font-medium">
                                {pin.name}
                            </span>
                            <span className="block text-sm text-brand-text/80">
                                {pin.isOnline
                                    ? null
                                    : [pin.address, pin.comuna]
                                          .filter(Boolean)
                                          .join(", ")}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    );
}
