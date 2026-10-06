/* Normalización de lo que escribe la persona antes de guardarlo (cliente y servidor). */

/** Partículas que van en minúscula salvo al inicio: "María de los Ángeles". */
const PARTICLES = new Set(["de", "del", "la", "las", "los", "y", "e", "da", "das", "do", "dos", "di", "van", "von", "der"]);

export function collapseSpaces(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function capitalizeSegment(segment: string): string {
  return segment.charAt(0).toLocaleUpperCase("es") + segment.slice(1);
}

/**
 * Nombres propios y lugares en formato "Nombre Apellido".
 * - Palabras todo en minúscula o todo en MAYÚSCULA se normalizan: "ever loza" → "Ever Loza", "JUAN" → "Juan".
 * - Palabras con mayúsculas intermedias se respetan tal cual: "McDonald", "DiMaría".
 * - Respeta guiones y apóstrofos: "jean-pierre o'connor" → "Jean-Pierre O'Connor".
 */
export function toNameCase(value: string): string {
  return collapseSpaces(value)
    .split(" ")
    .map((word, index) => {
      const lower = word.toLocaleLowerCase("es");
      const rest = word.slice(1);
      // Escrito a propósito con mayúscula inicial e intermedia ("McDonald"): se respeta.
      const isMixed =
        /^\p{Lu}/u.test(word) &&
        rest !== rest.toLocaleLowerCase("es") &&
        rest !== rest.toLocaleUpperCase("es");
      if (isMixed) return word;
      if (index > 0 && PARTICLES.has(lower)) return lower;
      return lower.replace(/(^|[-'’])(\p{L})/gu, (_, sep: string, letter: string) => sep + letter.toLocaleUpperCase("es"));
    })
    .join(" ");
}

/**
 * Primera letra en mayúscula y el resto como se escribió. Para organizaciones:
 * "prueba sas" → "Prueba sas", y "YPF S.A." queda intacto (las siglas se respetan).
 */
export function capitalizeFirst(value: string): string {
  return capitalizeSegment(collapseSpaces(value));
}

/**
 * Formato oración para cargos: "gerente de operaciones" → "Gerente de operaciones" y
 * "GERENTE GENERAL" (Bloq Mayús) → "Gerente general". Textos cortos en mayúscula ("CEO") se respetan.
 */
export function toSentenceCase(value: string): string {
  const text = collapseSpaces(value);
  const allCaps = /\p{L}/u.test(text) && text === text.toLocaleUpperCase("es");
  const words = text.split(" ").length;
  return capitalizeSegment(allCaps && words > 1 ? text.toLocaleLowerCase("es") : text);
}
