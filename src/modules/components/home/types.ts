export type SearchMode = "center" | "gynecologist";

export type SearchState = {
    mode: SearchMode;
    place: string;
    comuna: string;
    centerQuery: string;
    gynecologistQuery: string;
};

export type CenterSearch = {
    mode: SearchMode;
    place: string;
    comuna: string;
    query: string;
};

export type MapFrame = "default" | "results";

export type SwipeDirection = "down" | "right";

export type InformationTopic = {
    title: string;
    description: string;
    points: string[];
};
