export type Gynecologist = {
    id: string;
    name: string;
    lastname: string;
    instagram: string | null;
    email: string | null;
};

export type CenterPin = {
    id: string;
    name: string;
    count: number;
    lat: number | null;
    lng: number | null;
    isOnline: boolean;
    address: string | null;
    comuna: string | null;
    region: string | null;
    gynecologists: Gynecologist[];
};

export type HealthCenter = {
    id: string;
    name: string | null;
    comuna: string | null;
    region: string | null;
    lat: number | null;
    lng: number | null;
    isOnline: boolean;
    address: string | null;
};

export type CenterLink = {
    gine_id: string;
    health_center_id: string;
};
