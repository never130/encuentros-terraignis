import { event } from "@/content/event";
import { siteUrl } from "@/lib/site";

export const confirmationSubject = `Inscripción confirmada | ${event.name}`;

/** El nombre lo escribe el inscripto: se escapa antes de insertarlo en el HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const programUrl = `${siteUrl}/#programa`;
const { location } = event;

/** Versión texto plano: la usan clientes sin HTML y mejora la entrega (menos puntaje de spam). */
export function confirmationText(fullName: string): string {
  return [
    `Hola, ${fullName}:`,
    "",
    `Tu inscripción al Encuentro ${event.name} fue registrada correctamente.`,
    "",
    event.dateLabel,
    "",
    location.name,
    location.address,
    `${location.city}, ${location.province}`,
    "",
    "Podés consultar el programa actualizado en:",
    programUrl,
    "",
    "Terra Ignis Energía",
  ].join("\n");
}

/*
 * HTML de email: tablas y estilos en línea (Gmail y Outlook ignoran <style> y CSS moderno).
 * Outfit se pide a Google Fonts; donde no carga (Gmail, Outlook) cae a Arial/Helvetica.
 * Colores oficiales: #0D5257 y #FF5E00. El botón naranja usa texto blanco de 18 px en negrita.
 */
export function confirmationHtml(fullName: string): string {
  const name = escapeHtml(fullName);
  const font = "Outfit, Arial, Helvetica, sans-serif";

  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${escapeHtml(confirmationSubject)}</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#eef3f3;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#eef3f3;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background-color:#ffffff;">
    <tr><td style="background-color:#0d5257;padding:28px 32px 24px 32px;border-left:8px solid #ff5e00;">
      <img src="${siteUrl}/email/terra-ignis-logo.png" width="120" height="45" alt="Terra Ignis Energía" style="display:block;border:0;width:120px;height:auto;">
      <p style="margin:24px 0 0 0;font-family:${font};font-size:16px;font-weight:300;letter-spacing:1px;color:#ffffff;text-transform:uppercase;">Encuentro:</p>
      <p style="margin:2px 0 0 0;font-family:${font};font-size:28px;line-height:1.05;font-weight:800;color:#ffffff;text-transform:uppercase;">${event.name}</p>
    </td></tr>
    <tr><td style="padding:32px;font-family:${font};color:#0d2532;">
      <p style="margin:0 0 6px 0;font-size:13px;font-weight:700;letter-spacing:2px;color:#0d5257;text-transform:uppercase;">Inscripción confirmada</p>
      <p style="margin:0 0 16px 0;font-size:18px;line-height:1.5;">Hola, ${name}:</p>
      <p style="margin:0 0 24px 0;font-size:16px;line-height:1.6;">Tu inscripción al Encuentro <strong>${event.name}</strong> fue registrada correctamente.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:2px solid #606060;border-bottom:2px solid #606060;">
        <tr><td style="padding:16px 0 8px 0;font-family:${font};font-size:20px;font-weight:800;color:#0d5257;">${event.dateLabel}</td></tr>
        <tr><td style="padding:0 0 16px 0;font-family:${font};font-size:16px;line-height:1.5;color:#0d2532;"><strong>${location.name}</strong><br>${location.address}<br>${location.city}, ${location.province}</td></tr>
      </table>
      <p style="margin:24px 0 16px 0;font-size:16px;line-height:1.6;">Podés consultar el programa actualizado en:</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="background-color:#ff5e00;">
          <a href="${programUrl}" style="display:inline-block;padding:14px 28px;font-family:${font};font-size:18px;font-weight:700;letter-spacing:1px;color:#ffffff;text-decoration:none;text-transform:uppercase;">Ver programa</a>
        </td>
      </tr></table>
      <p style="margin:12px 0 0 0;font-size:13px;line-height:1.5;color:#0d2532;"><a href="${programUrl}" style="color:#0d5257;">${programUrl}</a></p>
    </td></tr>
    <tr><td style="background-color:#152841;padding:20px 32px;font-family:${font};font-size:14px;color:#ffffff;">
      <strong>Terra Ignis Energía</strong>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}
