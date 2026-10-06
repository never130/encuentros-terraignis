import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // El panel no se indexa (además está protegido con contraseña).
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/inscripcion/exito"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
