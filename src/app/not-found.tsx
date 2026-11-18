import Link from "next/link";
import { buttonVariants } from "@/src/modules/ui/Button";
import { cn } from "@/src/modules/utils";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-semibold">Esta página no existe :(</h1>
      <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
        Volver al inicio
      </Link>
    </div>
  );
}
