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
| `SMTP_USER` | Cuenta Gmail (puede ser la misma) | Cuenta Gmail del encuentro | Remitente del email de confirmación |
| `SMTP_PASSWORD` | Contraseña de aplicación | Contraseña de aplicación | **No** es la clave de la cuenta. Solo servidor |
| `EMAIL_FROM_NAME` | Opcional | Opcional | Nombre visible del remitente (por defecto "Encuentros Terra Ignis") |

## 4. Email de confirmación (Gmail)

El email se envía por SMTP desde una **cuenta Gmail dedicada** (no se puede enviar "desde" `vercel.app`: ningún proveedor permite usar un dominio que no se controla).

1. Crear una cuenta Gmail para el encuentro (por ejemplo `encuentros.terraignis@gmail.com`).
2. En esa cuenta: [myaccount.google.com/security](https://myaccount.google.com/security) → activar **Verificación en 2 pasos**.
3. [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords) → crear una **contraseña de aplicación** (nombre: "Encuentros web"). Google muestra 16 letras una sola vez.
4. Cargar en Vercel (Production) y en `.env.local`:
   - `SMTP_USER` = la dirección Gmail
   - `SMTP_PASSWORD` = las 16 letras (con o sin espacios)
5. Redeploy y hacer una inscripción de prueba: tiene que llegar el email y en `/admin` la fila pasa a **Enviado**.

**Límites y comportamiento:**
- Gmail permite ~**500 envíos por día**. Si se supera, la inscripción se guarda igual y queda **Pendiente** en `/admin`.
- Si faltan las variables, no se intenta enviar (la inscripción se guarda igual).
- El email sale después de responder al usuario: la pantalla de éxito no espera al correo.
- Para pasar a un dominio institucional (Resend + DNS de Terra Ignis) se cambia solo `lib/email/send-registration-confirmation.ts`.

## 5. QR de la invitación

`docs/qr/qr-inscripcion.svg` (para imprenta, vectorial) y `docs/qr/qr-inscripcion.png` (2048 px) apuntan a `https://encuentros-terraignis.vercel.app/#inscripcion`. Negro sobre blanco, con margen (quiet zone) de 4 módulos: no recortar el borde blanco. Probar con Android, iPhone, en pantalla y en papel antes de imprimir.

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
- [ ] Cuenta Gmail del encuentro con verificación en 2 pasos y contraseña de aplicación
- [ ] `SMTP_USER` y `SMTP_PASSWORD` en Vercel (Production) + redeploy
- [ ] Inscripción de prueba: llega el email y figura "Enviado" en `/admin`
- [ ] Vista previa del link probada en WhatsApp (imagen Open Graph)
- [ ] QR probado en Android, iPhone, pantalla y papel
