# Entornos: desarrollo local y producción

> **Estado:** pendiente de configurar. Seguir esta guía en orden cuando se cree la infraestructura.

## Regla principal

**La base de producción y la de desarrollo son proyectos Neon distintos.** La `DATABASE_URL` de producción vive **solo en Vercel**; nunca va en `.env.local`.

| Entorno | Base de datos | Dónde vive la configuración |
|---|---|---|
| Local (tu compu) | Proyecto Neon `encuentros-terraignis-dev` | `.env.local` (no se sube a git) |
| Previews de Vercel | Rama automática por preview (integración Neon) | Vercel → Environment Variables → *Preview* |
| Producción | Proyecto Neon de producción, rama `main` | Vercel → Environment Variables → *Production* |

**Por qué proyectos separados y no una rama `dev`:**

1. **Cuota:** el plan Free de Neon da 100 CU-horas **por proyecto** y las ramas las comparten. Con un proyecto aparte, las pruebas locales no consumen la cuota de producción.
2. **Datos personales:** una rama nueva copia los datos de su rama madre. Con inscripciones reales, nombres, emails y teléfonos terminarían en el entorno de pruebas.
3. **Errores humanos:** con dos proyectos con nombre distinto no se ejecuta SQL en producción por error.

---

## 1. Producción (una sola vez)

1. **Subir el repo a GitHub** y en Vercel: *Add New → Project → Import* el repositorio.
2. En el proyecto de Vercel: **Storage → Create Database → Neon** (plan Free).
   - **Región: AWS South America East 1 (São Paulo)**. Las funciones de Vercel corren en San Pablo (`vercel.json` → `gru1`). Si Neon queda en otra región, cada consulta cruza el continente.
   - Si ofrece crear **una rama por cada Preview deployment**: aceptar.
   - La integración carga `DATABASE_URL` en Vercel automáticamente.
3. **Crear la tabla en producción:** en Neon → proyecto de producción → rama `main` → **SQL Editor** → pegar el contenido de [`db/schema.sql`](../db/schema.sql) → *Run*. Es idempotente: ejecutarlo dos veces no rompe nada.
4. En Vercel → **Settings → Environment Variables**, agregar para *Production* (y *Preview* si se quiere probar el panel en previews):
   - `ADMIN_PASSWORD` → clave larga y única para el panel `/admin`. Compartirla solo con quienes operen el panel.
5. **Redeploy** para que tome las variables (Deployments → ⋯ → Redeploy).
6. Verificar:
   - Una inscripción de prueba en la URL de producción → aparece en `/admin`.
   - `/admin/export` descarga el CSV.
   - Borrar la inscripción de prueba en Neon (SQL Editor): `DELETE FROM registrations WHERE email = 'tu-email-de-prueba';`

## 2. Desarrollo local (una sola vez)

1. En [neon.com](https://neon.com) → **New Project** → nombre `encuentros-terraignis-dev`, región **AWS São Paulo**.
2. Copiar su *connection string* (Dashboard → **Connect**).
3. En la raíz del proyecto, copiar `.env.example` como `.env.local` y completar:

   ```env
   DATABASE_URL=postgresql://...      # la del proyecto -dev, NUNCA la de producción
   ADMIN_PASSWORD=una-clave-local     # distinta a la de producción
   ```

4. Crear la tabla:

   ```powershell
   npm run db:setup
   ```

   El script imprime `Base de datos: <host>` antes de aplicar el esquema. **Confirmar que el host sea el del proyecto -dev** (se ve en Neon → Connect).

5. `npm run dev` → inscribirse en http://localhost:3000 → revisar en http://localhost:3000/admin (usuario cualquiera, contraseña = `ADMIN_PASSWORD` local).

**No usar `vercel env pull`**: trae las variables de Vercel, incluida la `DATABASE_URL` de producción, a tu compu.

## 3. Uso diario

- Vaciar los datos de prueba locales: en Neon (proyecto -dev) → SQL Editor → `TRUNCATE registrations;`
- Si cambia [`db/schema.sql`](../db/schema.sql): aplicar en local con `npm run db:setup` y en producción pegándolo en el SQL Editor del proyecto de producción.
- Antes del evento: descargar un backup del CSV desde `/admin/export`.

## Variables de entorno

| Variable | Local (`.env.local`) | Vercel Production | Notas |
|---|---|---|---|
| `DATABASE_URL` | Proyecto Neon **-dev** | La carga la integración (prod) | Solo servidor |
| `ADMIN_PASSWORD` | Clave local | Clave de producción | Sin ella `/admin` queda cerrado |
| `RESEND_API_KEY` | (Fase 4) | (Fase 4) | Solo servidor |
| `RESEND_FROM_EMAIL` | (Fase 4) | (Fase 4) | Remitente; cambiar de dominio no requiere tocar código |

## Checklist

- [ ] Repo en GitHub e importado en Vercel
- [ ] Neon de producción creado desde Vercel, región São Paulo
- [ ] Tabla creada en producción (SQL Editor, rama `main`)
- [ ] `ADMIN_PASSWORD` cargada en Vercel + redeploy
- [ ] Inscripción de prueba en producción visible en `/admin` y borrada
- [ ] Proyecto Neon `encuentros-terraignis-dev` creado, región São Paulo
- [ ] `.env.local` con la URL de -dev y clave local
- [ ] `npm run db:setup` mostró el host de -dev
- [ ] Inscripción local visible en `localhost:3000/admin`
