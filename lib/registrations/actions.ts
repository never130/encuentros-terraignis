"use server";

import { redirect } from "next/navigation";

import { event } from "@/content/event";
import { privacyVersion, successPath } from "@/content/registration";
import { insertRegistration } from "@/lib/registrations/repository";
import {
  formDataToRegistration,
  registrationSchema,
  toFieldErrors,
  type FieldErrors,
} from "@/lib/validation/registration";

export type RegistrationState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: FieldErrors }
  | { status: "duplicate" }
  | { status: "error" };

export async function registerAction(
  _previous: RegistrationState,
  formData: FormData
): Promise<RegistrationState> {
  // Honeypot: un humano no ve ni completa este campo. Se simula éxito sin guardar.
  const honeypot = formData.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    redirect(successPath);
  }

  const parsed = registrationSchema.safeParse(formDataToRegistration(formData));
  if (!parsed.success) {
    return { status: "invalid", fieldErrors: toFieldErrors(parsed.error) };
  }

  let result;
  try {
    result = await insertRegistration(event.slug, parsed.data, privacyVersion);
  } catch (error) {
    // Nunca exponer errores de la base al usuario.
    console.error("[registro] Falló el INSERT en registrations", error);
    return { status: "error" };
  }

  if (result.status === "duplicate") {
    return { status: "duplicate" };
  }

  // Fase 4: intentar el email de confirmación aquí, sin afectar la inscripción guardada.

  redirect(successPath);
}
