import { HomePageContent, MapSkeleton } from "@/src/modules/components/home";

export default function Loading() {
    return (
        <div className="min-h-screen sm:min-h-dvh">
            <HomePageContent map={<MapSkeleton />} />
        </div>
    );
}
