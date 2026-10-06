import { NextResponse, type NextRequest } from "next/server";

import { ADMIN_REALM, verifyAdminAuth } from "@/lib/admin-auth";
import { createLimiter } from "@/lib/rate-limit";

/** 10 intentos FALLIDOS por IP cada 15 minutos. Con la clave correcta se recarga sin límite. */
const exceedsFailedAttempts = createLimiter(15 * 60 * 1000, 10);

/**
 * Portón de /admin con HTTP Basic Auth (patrón de copat3D): el navegador muestra su propio
 * diálogo y recuerda la clave mientras esté abierto. Debe llamarse `proxy.ts`: en Next 16 un
 * `middleware.ts` queda ignorado y /admin se serviría sin protección.
 */
export function proxy(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (verifyAdminAuth(authorization)) {
    return NextResponse.next();
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "sin-ip";
  // Solo cuenta cuando se envió una clave incorrecta; la primera visita sin cabecera es el diálogo normal.
  if (authorization && exceedsFailedAttempts(ip)) {
    return new NextResponse("Demasiados intentos. Espera unos minutos.", {
      status: 429,
      headers: { "Retry-After": "900" },
    });
  }

  // Los valores de cabecera HTTP son Latin-1: sin tildes en el realm.
  return new NextResponse("Acceso restringido.", {
    status: 401,
    headers: { "WWW-Authenticate": ADMIN_REALM },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
