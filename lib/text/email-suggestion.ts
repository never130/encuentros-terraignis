/* Sugerencia ante errores de tipeo en dominios comunes ("gmial.com" → "gmail.com"). Solo sugiere, nunca corrige solo. */

const COMMON_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "hotmail.com.ar",
  "outlook.com",
  "outlook.com.ar",
  "live.com",
  "live.com.ar",
  "yahoo.com",
  "yahoo.com.ar",
  "icloud.com",
];

function distance(a: string, b: string): number {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

/** Devuelve el email con el dominio corregido, o null si no hay una sugerencia clara. */
export function suggestEmail(email: string): string | null {
  const value = email.trim().toLowerCase();
  const at = value.lastIndexOf("@");
  if (at < 1) return null;
  const domain = value.slice(at + 1);
  if (!domain || COMMON_DOMAINS.includes(domain)) return null;

  let best: { domain: string; score: number } | null = null;
  for (const candidate of COMMON_DOMAINS) {
    const score = distance(domain, candidate);
    if (score > 0 && score <= 2 && (!best || score < best.score)) best = { domain: candidate, score };
  }
  return best ? `${value.slice(0, at)}@${best.domain}` : null;
}
