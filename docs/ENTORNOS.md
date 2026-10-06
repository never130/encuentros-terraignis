# Entornos: desarrollo local y producción

> **Estado:** pendiente de configurar. Seguir esta guía en orden cuando se cree la infraestructura.

## Regla principal

**La base de producción y la de desarrollo son proyectos Neon distintos.** La `DATABASE_URL` de producción vive **solo en Vercel**; nunca va en `.env.local`.

| Entorno | Base de datos | Dónde vive la configuración |
|---|---|---|
| Local (tu compu) | Proyecto Neon `encuentros-terraignis-dev` | `.env.local` (no se sube a git) |
| Previews de Vercel | Sin base propia por ahora (sin `DATABASE_URL` en *Preview*: el formulario muestra el error amable) | Vercel → Environment Variables → *Preview* |
| Producción | Proyecto Neon de producción, rama `main` | Vercel → Environment Variables → *Production* |

**Por qué proyectos separados y no una rama `dev`:**

1. **Cuota:** el plan Free de Neon da 100 CU-horas **por proyecto** y las ramas las comparten. Con un proyecto aparte, las pruebas locales no consumen la cuota de producción.
2. **Datos personales:** una rama nueva copia los datos de su rama madre. Con inscripciones reales, nombres, emails y teléfonos terminarían en el entorno de pruebas.
3. **Errores humanos:** con dos proyectos con nombre distinto no se ejecuta SQL en producción por error.

---

## 1. Producción (una sola vez)

> Camino elegido: el proyecto Neon se crea **a mano en la consola de Neon** y la `DATABASE_URL` se carga **a mano en Vercel**. No conectar además la integración Neon de Vercel: crearía otra base y otra `DATABASE_URL`.

1. **Subir el repo a GitHub** y en Vercel: *Add New → Project → Import* el repositorio.
2. En [console.neon.tech](https://console.neon.tech) → **New project**:
   - **Project name:** `encuentros-terraignis`
   - **Region: AWS South America East 1 (São Paulo)**. Las funciones de Vercel corren en San Pablo (`vercel.json` → `gru1`); si Neon queda en otra región, cada consulta cruza el continente.
   - **Services:** solo *Postgres database*. Object storage, Functions, AI gateway y Neon Auth apagados.
3. **Connect** → rama `main` → *Connection pooling* activado → copiar la connection string (host con `-pooler`). **No pegarla en `.env.local`.**
4. **Crear la tabla:** Neon → **SQL Editor** (rama `main`) → pegar el contenido de [`db/schema.sql`](../db/schema.sql) → *Run*. Es idempotente.
5. En Vercel → **Settings → Environment Variables**, entorno **Production**:
   - `DATABASE_URL` → la connection string del paso 3.
   - `ADMIN_PASSWORD` → clave larga y única para el panel `/admin`.
6. **Redeploy** para que tome las variables (Deployments → ⋯ → Redeploy).
7. Verificar:
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
| `DATABASE_URL` | Proyecto Neon **-dev** | Connection string de producción (cargada a mano) | Solo servidor |
| `ADMIN_PASSWORD` | Clave local | Clave de producción | Sin ella `/admin` queda cerrado |
| `RESEND_API_KEY` | (Fase 4) | (Fase 4) | Solo servidor |
| `RESEND_FROM_EMAIL` | (Fase 4) | (Fase 4) | Remitente; cambiar de dominio no requiere tocar código |

## Checklist

- [ ] Repo en GitHub e importado en Vercel
- [ ] Neon de producción creado en la consola de Neon, región São Paulo, solo Postgres
- [ ] Tabla creada en producción (SQL Editor, rama `main`)
- [ ] `DATABASE_URL` y `ADMIN_PASSWORD` cargadas en Vercel (Production) + redeploy
- [ ] Inscripción de prueba en producción visible en `/admin` y borrada
- [ ] Proyecto Neon `encuentros-terraignis-dev` creado, región São Paulo
- [ ] `.env.local` con la URL de -dev y clave local
- [ ] `npm run db:setup` mostró el host de -dev
- [ ] Inscripción local visible en `localhost:3000/admin`
