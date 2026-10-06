import "server-only";

import { neon } from "@neondatabase/serverless";

/** Cliente SQL de Neon. Solo servidor: DATABASE_URL nunca llega al navegador. */
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está configurada.");
  }
  return neon(url);
}
