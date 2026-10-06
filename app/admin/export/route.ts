import { event } from "@/content/event";
import { ADMIN_REALM, verifyAdminAuth } from "@/lib/admin-auth";
import { toCsv } from "@/lib/csv";
import { listRegistrations } from "@/lib/registrations/admin-queries";

export const dynamic = "force-dynamic";

const header = [
  "Nombre y apellido",
  "Empresa / Organismo / Institución",
  "Cargo / Función",
  "Sector",
  "Ciudad",
  "Provincia / Estado / Región",
  "País",
  "Correo electrónico",
  "Teléfono",
  "Fecha de inscripción",
  "Email de confirmación",
];

export async function GET(request: Request) {
  // Verificación propia: no depender solo del matcher del proxy.
  if (!verifyAdminAuth(request.headers.get("authorization"))) {
    return new Response("Acceso restringido.", {
      status: 401,
      headers: { "WWW-Authenticate": ADMIN_REALM },
    });
  }

  let registrations;
  try {
    registrations = await listRegistrations(event.slug);
  } catch (error) {
    console.error("[admin] Falló la exportación CSV", error);
    return new Response("No se pudo leer la base de datos. Intentá de nuevo en unos instantes.", {
      status: 503,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const csv = toCsv(
    header,
    registrations.map((r) => [
      r.fullName,
      r.organization,
      r.role,
      r.sectorLabel,
      r.city,
      r.region ?? "",
      r.countryName,
      r.email,
      r.phone ?? "",
      r.createdAtLabel,
      r.emailSent ? "Enviado" : "Pendiente",
    ])
  );

  const date = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="inscriptos-${event.slug}-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
