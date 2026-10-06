import "server-only";

import nodemailer from "nodemailer";

import {
  confirmationHtml,
  confirmationSubject,
  confirmationText,
} from "@/lib/email/registration-confirmation-template";

/*
 * Único punto de envío de email. Hoy: SMTP de una cuenta Gmail dedicada (contraseña de
 * aplicación). Para pasar a otro proveedor (por ejemplo Resend con el dominio de Terra Ignis)
 * se cambia solo este archivo: la Server Action no sabe qué servicio se usa.
 *
 * Límite de Gmail: ~500 envíos por día. Si se supera, el envío falla y la inscripción
 * queda guardada con email_sent = false (visible como "Pendiente" en /admin).
 */

export type SendResult = { status: "sent" } | { status: "skipped" } | { status: "failed" };

export async function sendRegistrationConfirmation(to: {
  email: string;
  fullName: string;
}): Promise<SendResult> {
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD?.replace(/\s+/g, "");
  if (!user || !password) {
    // Sin configuración no se intenta: la inscripción ya quedó guardada.
    console.warn("[email] SMTP_USER / SMTP_PASSWORD no configuradas: no se envía la confirmación.");
    return { status: "skipped" };
  }

  const port = Number(process.env.SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user, pass: password },
    // Que un SMTP lento no deje colgada la función serverless.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });

  const fromName = process.env.EMAIL_FROM_NAME || "Encuentros Terra Ignis";

  try {
    await transport.sendMail({
      // Gmail exige que el remitente sea la propia cuenta autenticada.
      from: { name: fromName, address: user },
      to: { name: to.fullName, address: to.email },
      subject: confirmationSubject,
      text: confirmationText(to.fullName),
      html: confirmationHtml(to.fullName),
    });
    return { status: "sent" };
  } catch (error) {
    // Cuota diaria agotada, credenciales inválidas o SMTP caído: se registra y se sigue.
    console.error("[email] No se pudo enviar la confirmación", error);
    return { status: "failed" };
  } finally {
    transport.close();
  }
}
