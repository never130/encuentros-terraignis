// Crea la tabla `registrations` en Neon a partir de db/schema.sql.
// Uso: npm run db:setup   (lee DATABASE_URL desde .env.local)
import { readFile } from "node:fs/promises";

import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("Falta DATABASE_URL en .env.local");
  process.exit(1);
}

// Muestra el host (sin credenciales) para confirmar si es la rama de desarrollo o la de producción.
console.log(`Base de datos: ${new URL(url).host}`);

const sql = neon(url);
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");

// El driver HTTP ejecuta una sentencia por llamada.
const statements = schema
  .split("\n")
  .filter((line) => !line.trim().startsWith("--"))
  .join("\n")
  .split(";")
  .map((statement) => statement.trim())
  .filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}

console.log(`Esquema aplicado (${statements.length} sentencias).`);
