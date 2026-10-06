"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { consentText, sectors } from "@/content/registration";
import type { CountryOption } from "@/lib/countries";

const inputClassName = "h-12 bg-white px-4 text-base md:text-base";
const selectClassName =
  "w-full [&_select]:h-12 [&_select]:bg-white [&_select]:pr-10 [&_select]:pl-4 [&_select]:text-base [&>svg]:right-4";

/*
 * FASE 2: formulario visual. La validación Zod, la Server Action y el
 * guardado en Neon se conectan en la Fase 3.
 */
export function RegistrationForm({ countries }: { countries: CountryOption[] }) {
  const [sector, setSector] = useState("");
  const [previewNotice, setPreviewNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreviewNotice(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
      <p className="text-sm text-muted-foreground">
        Los campos marcados con <span aria-hidden="true">*</span>
        <span className="sr-only">asterisco</span> son obligatorios.
      </p>

      <Field id="fullName" label="Nombre y apellido" required>
        <Input id="fullName" name="fullName" autoComplete="name" required className={inputClassName} />
      </Field>

      <Field id="organization" label="Empresa / Organismo / Institución" required>
        <Input
          id="organization"
          name="organization"
          autoComplete="organization"
          required
          className={inputClassName}
        />
      </Field>

      <Field id="role" label="Cargo / Función" required>
        <Input
          id="role"
          name="role"
          autoComplete="organization-title"
          required
          className={inputClassName}
        />
      </Field>

      <Field id="sector" label="Sector" required>
        <NativeSelect
          id="sector"
          name="sector"
          required
          value={sector}
          onChange={(event) => setSector(event.target.value)}
          className={selectClassName}
        >
          <NativeSelectOption value="" disabled>
            Seleccioná un sector
          </NativeSelectOption>
          {sectors.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>

      {sector === "other" && (
        <Field id="sectorOther" label="Especifique el sector" required>
          <Input id="sectorOther" name="sectorOther" required className={inputClassName} />
        </Field>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field id="city" label="Ciudad" required>
          <Input
            id="city"
            name="city"
            autoComplete="address-level2"
            required
            className={inputClassName}
          />
        </Field>

        <Field id="region" label="Provincia / Estado / Región">
          <Input
            id="region"
            name="region"
            autoComplete="address-level1"
            className={inputClassName}
          />
        </Field>
      </div>

      <Field id="country" label="País" required>
        <NativeSelect
          id="country"
          name="country"
          autoComplete="country"
          required
          defaultValue=""
          className={selectClassName}
        >
          <NativeSelectOption value="" disabled>
            Seleccioná un país
          </NativeSelectOption>
          {countries.map((country) => (
            <NativeSelectOption key={country.code} value={country.code}>
              {country.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </Field>

      <Field id="email" label="Correo electrónico" required>
        <Input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required
          className={inputClassName}
        />
      </Field>

      <Field
        id="phone"
        label="Teléfono de contacto"
        hint="Incluí el código de país, por ejemplo +54 para Argentina."
      >
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-describedby="phone-hint"
          className={inputClassName}
        />
      </Field>

      <div className="flex gap-3 border-t border-border pt-6">
        <Checkbox
          id="consent"
          name="consent"
          required
          className="mt-0.5 size-5 border-input [&_svg]:size-4"
        />
        <Label htmlFor="consent" className="block text-[0.9375rem] leading-relaxed font-normal">
          {consentText} <span aria-hidden="true">*</span>
        </Label>
      </div>

      <Button type="submit" variant="accent" size="cta" className="w-full">
        Confirmar inscripción
      </Button>

      <p role="status" className="min-h-5 text-sm text-muted-foreground">
        {previewNotice &&
          "Vista previa: el envío de inscripciones se habilita en la próxima fase."}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required = false,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-2">
      <Label htmlFor={id} className="text-[0.9375rem] leading-snug">
        {label}
        {required && <span aria-hidden="true">*</span>}
      </Label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}
