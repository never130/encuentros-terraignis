import { z } from "zod";

import { sectors, type SectorValue } from "@/content/registration";
import { isCountryCode } from "@/lib/countries";
import { capitalizeFirst, collapseSpaces, toNameCase, toSentenceCase } from "@/lib/text/normalize";

/* Schema único: lo usan el formulario (cliente) y la Server Action (servidor). */

const sectorValues = sectors.map((sector) => sector.value) as [SectorValue, ...SectorValue[]];

/* Los textos se guardan normalizados: espacios simples y mayúsculas prolijas (ver lib/text/normalize). */
const requiredText = (max: number, format: (value: string) => string = collapseSpaces) =>
  z
    .string()
    .transform(collapseSpaces)
    .pipe(z.string().min(1, "Completá este campo.").max(max, `Máximo ${max} caracteres.`))
    .transform(format);

const optionalText = (max: number, format: (value: string) => string = collapseSpaces) =>
  z
    .string()
    .transform(collapseSpaces)
    .pipe(z.string().max(max, `Máximo ${max} caracteres.`))
    .transform((value) => (value ? format(value) : undefined));

/* Los bots de spam suelen meter links en el campo nombre. */
const hasLink = (value: string) => /(https?:\/\/|www\.|\.(com|net|org|ru|xyz)\b)/i.test(value);

export const registrationSchema = z
  .object({
    fullName: requiredText(160, toNameCase).refine((value) => !hasLink(value), "Ingresá solo tu nombre y apellido."),
    organization: requiredText(200, capitalizeFirst),
    role: requiredText(160, toSentenceCase),
    sector: z.enum(sectorValues, { error: "Seleccioná un sector." }),
    sectorOther: optionalText(160, toSentenceCase),
    city: requiredText(120, toNameCase),
    region: optionalText(120, toNameCase),
    country: z.string().refine(isCountryCode, "Seleccioná un país."),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(254, "El correo es demasiado largo.")
      .pipe(z.email("Ingresá un correo electrónico válido.")),
    phone: optionalText(40).refine(
      (value) => value === undefined || /^\+?[\d\s().-]{6,}$/.test(value),
      "Ingresá un teléfono válido, con código de país si es del exterior."
    ),
    consent: z.literal(true, {
      error: "Necesitamos tu autorización para registrar la inscripción.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.sector === "other" && !data.sectorOther) {
      ctx.addIssue({
        code: "custom",
        path: ["sectorOther"],
        message: "Especificá el sector.",
      });
    }
  });

export type RegistrationInput = z.output<typeof registrationSchema>;
export type RegistrationField = keyof z.input<typeof registrationSchema>;
export type FieldErrors = Partial<Record<RegistrationField, string>>;

/** Convierte el FormData del formulario en el objeto que valida el schema. */
export function formDataToRegistration(formData: FormData) {
  const text = (name: RegistrationField) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : "";
  };

  return {
    fullName: text("fullName"),
    organization: text("organization"),
    role: text("role"),
    sector: text("sector"),
    sectorOther: text("sectorOther"),
    city: text("city"),
    region: text("region"),
    country: text("country"),
    email: text("email"),
    phone: text("phone"),
    consent: formData.get("consent") === "on",
  };
}

/** Primer mensaje de error por campo. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const fieldErrors: FieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as RegistrationField | undefined;
    if (field && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
}
