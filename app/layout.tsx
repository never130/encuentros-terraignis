import type { Metadata, Viewport } from "next";

import { outfit } from "@/lib/fonts";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const title = "Encuentro Repensar las Cuencas Maduras | Terra Ignis Energía";
const description =
  "26 y 27 de noviembre de 2026 · Fábrica de Talentos · Ushuaia, Tierra del Fuego.";

// La imagen para compartir es app/opengraph-image.png (1200×630); Next la agrega sola.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: "Encuentros Terra Ignis",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
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
