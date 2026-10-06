/**
 * Verifica la cabecera `Authorization: Basic ...` contra ADMIN_PASSWORD (patrón de copat3D).
 *
 * La usan `proxy.ts` (protege las páginas de /admin) y cada ruta o acción del panel por su
 * cuenta: una Server Function o un Route Handler no deben confiar solo en el matcher del proxy.
 *
 * Sin ADMIN_PASSWORD configurada siempre rechaza: el valor ausente cae del lado seguro.
 * El usuario del diálogo del navegador se ignora; solo cuenta la contraseña.
 */
export function verifyAdminAuth(authorization: string | null): boolean {
  const password = process.env.ADMIN_PASSWORD?.trim();
  if (!password) return false;
  if (!authorization?.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    // atob devuelve Latin-1; se reinterpreta como UTF-8 para claves con acentos o eñe.
    const bytes = Uint8Array.from(atob(authorization.slice(6)), (c) => c.charCodeAt(0));
    decoded = new TextDecoder().decode(bytes);
  } catch {
    return false;
  }

  // indexOf y no split(":"): la contraseña puede contener dos puntos (RFC 7617).
  const separator = decoded.indexOf(":");
  if (separator === -1) return false;

  return equalsConstantTime(decoded.slice(separator + 1), password);
}

/** Comparación en tiempo constante: `===` filtra por tiempo cuántos caracteres acertó. */
function equalsConstantTime(a: string, b: string): boolean {
  const bytesA = new TextEncoder().encode(a);
  const bytesB = new TextEncoder().encode(b);
  const sameLength = bytesA.length === bytesB.length;
  const reference = sameLength ? bytesB : bytesA;
  let diff = 0;
  for (let i = 0; i < bytesA.length; i++) diff |= bytesA[i] ^ reference[i];
  return sameLength && diff === 0;
}

export const ADMIN_REALM = 'Basic realm="Encuentros Terra Ignis - Panel", charset="UTF-8"';
