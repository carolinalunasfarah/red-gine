import { CenterExplorer, HomePageContent } from "@/src/modules/components/home";
import { getCenterPins } from "@/src/modules/healthCenters/queries";

export default async function Home() {
    const pins = await getCenterPins();

    return (
        <div className="min-h-screen sm:min-h-dvh">
            <HomePageContent map={<CenterExplorer pins={pins} />} />
        </div>
    );
}
