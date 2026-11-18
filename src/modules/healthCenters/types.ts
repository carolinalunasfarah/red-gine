export type CenterPin = {
    id: string;
    count: number;
    lat: number;
    lng: number;
};

export type HealthCenter = {
    id: string;
    gine_id: string | null;
    name: string | null;
    comuna: string | null;
    region: string | null;
    lat: number | null;
    lng: number | null;
    isOnline: boolean;
};
