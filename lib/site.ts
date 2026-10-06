/**
 * URL pública del sitio (definitiva: Vercel). Se puede pisar con NEXT_PUBLIC_SITE_URL.
 * `||` y no `??`: una variable creada pero vacía en Vercel llega como "" y rompería new URL().
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://encuentros-terraignis.vercel.app"
).replace(/\/+$/, "");
