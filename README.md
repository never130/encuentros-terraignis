# Encuentros Terra Ignis

Plataforma web del Encuentro **Repensar las Cuencas Maduras** (26 y 27 de noviembre de 2026, Ushuaia), organizado por Terra Ignis Energía S.A. La especificación completa está en [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

## Stack

Next.js (App Router) · TypeScript strict · Tailwind CSS v4 · shadcn/ui · Outfit (`next/font/google`) · Vercel.
Zod, Neon PostgreSQL (`@neondatabase/serverless`) y email por SMTP (Gmail) con Nodemailer.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Base de datos (Neon)

> Guía completa para separar desarrollo local y producción: [docs/ENTORNOS.md](docs/ENTORNOS.md).

1. Producción: proyecto Neon creado en la consola (São Paulo) y `DATABASE_URL` cargada a mano en Vercel.
2. Desarrollo local: otro proyecto Neon (`-dev`); su `DATABASE_URL` va en `.env.local`.
3. Crear la tabla: `npm run db:setup` (o pegar `db/schema.sql` en el SQL Editor de Neon). Es idempotente.

Flujo de inscripción: formulario → Zod (cliente) → Server Action → Zod (servidor) → honeypot → `INSERT … ON CONFLICT DO NOTHING` (duplicado = mismo encuentro + email) → `/inscripcion/exito`.

## Email de confirmación

Después de guardar la inscripción, la Server Action programa el envío con `after()` (no demora la respuesta). Si el envío sale, se marca `email_sent`; si falla, la inscripción sigue válida y figura "Pendiente" en `/admin`. Configuración de la cuenta Gmail: [docs/ENTORNOS.md](docs/ENTORNOS.md#4-email-de-confirmación-gmail).

## Compartir y QR

- `app/opengraph-image.png` (1200×630): vista previa del link en WhatsApp, LinkedIn, etc.
- `docs/qr/`: QR de la invitación hacia `/#inscripcion` (SVG para imprenta y PNG).

## Panel admin (`/admin`)

Protegido con HTTP Basic Auth (patrón de copat3D): `proxy.ts` pide la contraseña y cada ruta del panel la vuelve a verificar. Se configura con `ADMIN_PASSWORD` en Vercel y en `.env.local`; sin esa variable el panel queda cerrado. El usuario del diálogo del navegador se ignora.

- Métricas: total de inscriptos y desglose por sector y por país.
- Tabla con búsqueda (nombre, empresa, email), filtros por país y sector, orden y paginación de a 50.
- `/admin/export`: CSV para Excel en español (`;`, BOM UTF-8, fórmulas neutralizadas).
- Freno de 10 intentos fallidos por IP cada 15 minutos (en memoria; para un límite real, una regla de Cloudflare).
- Las funciones corren en San Pablo (`vercel.json` → `gru1`): crear Neon en **AWS São Paulo** para que cada consulta no cruce a EE. UU.

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
