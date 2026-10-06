# Encuentros Terra Ignis

Plataforma web del Encuentro **Repensar las Cuencas Maduras** (26 y 27 de noviembre de 2026, Ushuaia), organizado por Terra Ignis Energía S.A. La especificación completa está en [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

## Stack

Next.js (App Router) · TypeScript strict · Tailwind CSS v4 · shadcn/ui · Outfit (`next/font/google`) · Vercel.
Fases siguientes: Zod, Neon PostgreSQL (`@neondatabase/serverless`) y Resend.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Estructura

```
app/                 layout (Outfit, metadata) y landing única
components/
  brand/             marca provisoria (reemplazar por SVG oficiales)
  event/             header, hero, accesos, ejes, ubicación, footer
  program/           programa con tabs y timeline
  partners/          instituciones que acompañan
  registration/      sección y formulario de inscripción
  ui/                componentes shadcn/ui
content/             datos del evento, programa, sectores y navegación (fuente única)
lib/                 utilidades (fuente, países)
```

## Identidad visual

Colores oficiales definidos como tokens en `app/globals.css`:

- Pantone 7476 C — `#0D5257` (`terra-petrol`, color estructural)
- Pantone Orange C — `#FF5E00` (`terra-orange` / `brand-accent`, acento)

El lenguaje visual replica el PDF oficial del programa ("Programa Encuentro Cuencas Maduras y Empresas Provinciales final"):

- Degradé `terra-gradient` tomado del PDF: teal `#098188` → petrol oficial `#0D5257` (30 %) → azul noche `#152841`.
- Franjas naranjas (`components/brand/stripes.tsx`) con la geometría exacta del PDF.
- Filete con piquito (`NotchRule`) y cajas con cuadrado en la esquina (`CornerBox`).
- Logos oficiales en `public/logos/`, extraídos en vectores del PDF (versión negativa, solo para fondos oscuros).
- El PDF usa Gilroy (fuente comercial); la web usa Outfit, la tipografía oficial informada por Terra Ignis.

Blanco sobre naranja mide ≈ 3.1:1, por lo que los textos naranjas y los botones naranjas usan tamaños de texto grande WCAG (≥ 19 px en negrita).
