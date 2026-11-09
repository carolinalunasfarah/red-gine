import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/src/modules/styles/globals.css";

const interFont = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s / RedGine",
    default: "Red de Ginecólogas no objetoras de conciencia",
  },
  description:
    "Un directorio de ginecólogas no objetoras de conciencia en Chile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${interFont.className} h-full antialiased`}>
      <body className="flex flex-col min-h-screen bg-brand-background font-sans text-brand-text">
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
