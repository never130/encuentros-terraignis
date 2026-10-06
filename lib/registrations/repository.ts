import "server-only";

import { getSql } from "@/lib/db/client";
import type { RegistrationInput } from "@/lib/validation/registration";

export type InsertRegistrationResult =
  | { status: "created"; id: string }
  | { status: "duplicate" };

/**
 * Inserta la inscripción. El duplicado (mismo encuentro + email) lo resuelve la
 * restricción UNIQUE de la base, sin condiciones de carrera.
 */
export async function insertRegistration(
  eventSlug: string,
  data: RegistrationInput,
  privacyVersion: string
): Promise<InsertRegistrationResult> {
  const sql = getSql();
  const sectorOther = data.sector === "other" ? (data.sectorOther ?? null) : null;

  const rows = await sql`
    INSERT INTO registrations (
      event_slug, full_name, organization, role, sector, sector_other,
      city, region, country, email, phone,
      consent, consent_at, privacy_version
    ) VALUES (
      ${eventSlug}, ${data.fullName}, ${data.organization}, ${data.role},
      ${data.sector}, ${sectorOther}, ${data.city}, ${data.region ?? null},
      ${data.country}, ${data.email}, ${data.phone ?? null},
      true, now(), ${privacyVersion}
    )
    ON CONFLICT (event_slug, email) DO NOTHING
    RETURNING id
  `;

  const [row] = rows as { id: string }[];
  return row ? { status: "created", id: row.id } : { status: "duplicate" };
}
