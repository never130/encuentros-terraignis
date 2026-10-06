import type { Metadata, Viewport } from "next";

import { outfit } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Encuentro Repensar las Cuencas Maduras | Terra Ignis Energía",
  description:
    "26 y 27 de noviembre de 2026 · Fábrica de Talentos · Ushuaia, Tierra del Fuego.",
};

export const viewport: Viewport = {
  themeColor: "#0d5257",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={outfit.variable}>
      {/* Extensiones como ColorZilla agregan atributos al <body> antes de hidratar. */}
      <body className="min-h-dvh" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
