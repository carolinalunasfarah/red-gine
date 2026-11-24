import { HomePageContent } from "@/src/modules/components/home/HomePageContent";
import { MapSkeleton } from "@/src/modules/components/home/MapSkeleton";

export default function Loading() {
    return (
        <div className="min-h-screen sm:min-h-dvh">
            <HomePageContent map={<MapSkeleton />} />
        </div>
    );
}
