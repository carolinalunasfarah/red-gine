const BRAND_ACCENT = "#405c37";
const BRAND_BACKGROUND = "#664b7c";

const SECOND_WAVE_STOPS = [
    { offset: "20%", color: BRAND_ACCENT },
    { offset: "90%", color: BRAND_BACKGROUND },
] as const;

const WAVE_PATHS = [
    "M 0,700 L 0,175 C 69.72051282051282,137.3948717948718 139.44102564102565,99.78974358974361 214,117 C 288.55897435897435,134.2102564102564 367.9564102564103,206.23589743589744 463,206 C 558.0435897435897,205.76410256410256 668.7333333333332,133.26666666666665 758,98 C 847.2666666666668,62.73333333333335 915.1102564102566,64.69743589743592 995,104 C 1074.8897435897434,143.30256410256408 1166.8256410256408,219.9435897435897 1243,238 C 1319.1743589743592,256.0564102564103 1379.5871794871796,215.52820512820514 1440,175 L 1440,700 L 0,700 Z",
    "M 0,700 L 0,408 C 79.29743589743589,400.0076923076923 158.59487179487178,392.0153846153847 235,387 C 311.4051282051282,381.9846153846153 384.9179487179488,379.9461538461538 467,412 C 549.0820512820512,444.0538461538462 639.7333333333332,510.2 712,494 C 784.2666666666668,477.8 838.1487179487178,379.2538461538462 921,347 C 1003.8512820512822,314.7461538461538 1115.6717948717949,348.7846153846154 1207,370 C 1298.3282051282051,391.2153846153846 1369.1641025641024,399.60769230769233 1440,408 L 1440,700 L 0,700 Z",
] as const;

const WAVE_OPACITIES = [1, 1] as const;
const SECOND_WAVE_SCALE = 1.25;
const WAVE_SHIFT_X = 200;
const WAVE_SHIFT_Y = 160;

const VERTICAL_WAVE_WIDTH = 1040;
const VERTICAL_WAVE_HEIGHT = 1440;

function verticalWaveTile() {
    const stops = SECOND_WAVE_STOPS.map(
        ({ offset, color }) =>
            `<stop offset="${offset}" stop-color="${color}"/>`,
    ).join("");
    const paths = WAVE_PATHS.map((path, index) => {
        const fill =
            index === 1 ? BRAND_ACCENT : "url(#home-wave-vertical-second)";
        const transform =
            index === 0
                ? `scale(1 ${SECOND_WAVE_SCALE}) rotate(-180 720 350)`
                : "rotate(-180 720 350)";

        return `<path d="${path}" fill="${fill}" fill-opacity="${WAVE_OPACITIES[index]}" transform="${transform}"/>`;
    }).join("");

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VERTICAL_WAVE_WIDTH} ${VERTICAL_WAVE_HEIGHT}" preserveAspectRatio="xMinYMid meet"><defs><linearGradient id="home-wave-vertical-second" gradientUnits="userSpaceOnUse" x1="720" y1="700" x2="720" y2="0">${stops}</linearGradient></defs><rect x="0" y="0" width="${WAVE_SHIFT_X + 50}" height="${VERTICAL_WAVE_HEIGHT}" fill="${BRAND_ACCENT}"/><g transform="translate(${WAVE_SHIFT_X} 0) translate(0 ${VERTICAL_WAVE_HEIGHT}) rotate(-90)">${paths}</g></svg>`;
}

const VERTICAL_WAVE_BACKGROUND = `url("data:image/svg+xml,${encodeURIComponent(verticalWaveTile())}")`;

function Wave({
    id,
    width,
    height,
    vertical,
    className,
}: {
    id: string;
    width: number;
    height: number;
    vertical: boolean;
    className?: string;
}) {
    const paths = WAVE_PATHS.map((path, index) => (
        <path
            key={index}
            d={path}
            fill={index === 1 ? BRAND_ACCENT : `url(#${id}-second)`}
            fillOpacity={WAVE_OPACITIES[index]}
            transform={
                index === 0
                    ? `scale(1 ${SECOND_WAVE_SCALE}) rotate(-180 720 350)`
                    : "rotate(-180 720 350)"
            }
        />
    ));

    return (
        <svg
            aria-hidden
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio={vertical ? "xMinYMid slice" : "xMidYMin slice"}
            className={className}
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient
                    id={`${id}-second`}
                    gradientUnits="userSpaceOnUse"
                    x1="720"
                    y1="700"
                    x2="720"
                    y2="0">
                    {SECOND_WAVE_STOPS.map(({ offset, color }) => (
                        <stop key={offset} offset={offset} stopColor={color} />
                    ))}
                </linearGradient>
            </defs>
            {vertical ? (
                <rect
                    x="0"
                    y="0"
                    width={WAVE_SHIFT_X + 50}
                    height={height}
                    fill={BRAND_ACCENT}
                />
            ) : (
                <rect
                    x="0"
                    y="0"
                    width={width}
                    height={WAVE_SHIFT_Y + 20}
                    fill={BRAND_ACCENT}
                />
            )}
            {vertical ? (
                <g
                    transform={`translate(${WAVE_SHIFT_X} 0) translate(0 ${height}) rotate(-90)`}>
                    {paths}
                </g>
            ) : (
                <g transform={`translate(0 ${WAVE_SHIFT_Y})`}>{paths}</g>
            )}
        </svg>
    );
}

export function HomeBackground() {
    const className = "pointer-events-none absolute top-0 left-0 z-0";

    return (
        <>
            <Wave
                id="home-wave-horizontal"
                width={1440}
                height={1000}
                vertical={false}
                className={`${className} h-[75dvh] w-full md:hidden`}
            />
            <div
                aria-hidden
                className={`${className} inset-y-0 hidden h-full w-[54%] bg-repeat-y md:block`}
                style={{
                    backgroundImage: VERTICAL_WAVE_BACKGROUND,
                    backgroundSize: "100% auto",
                }}
            />
        </>
    );
}
