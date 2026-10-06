import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Cabeceras de seguridad (mismo criterio que copat3D). Ninguna cambia cómo se ve el sitio.
  async headers() {
    const security = [
      // Nadie puede embeber el sitio en un <iframe> (clickjacking sobre el formulario o /admin).
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
      },
      // Con HSTS el navegador no ofrece "continuar de todos modos" ante un certificado ajeno,
      // así nadie tipea la clave del panel en una página interceptada.
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains",
      },
    ];

    return [
      { source: "/:path*", headers: security },
      // Datos personales: ningún proxy ni caché intermedio guarda el panel ni el CSV.
      {
        source: "/admin/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
