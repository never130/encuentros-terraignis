/**
 * Límite de intentos por ventana de tiempo, en memoria (tomado de copat3D).
 *
 * Es un badén, no un portón: en Vercel cada instancia serverless tiene su propia
 * memoria y se recicla. Frena a un script que prueba claves desde una IP; no a
 * alguien decidido con muchas.
 */
export function createLimiter(windowMs: number, maxPerWindow: number) {
  const hits = new Map<string, number[]>();

  return function exceedsLimit(key: string): boolean {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

    if (recent.length >= maxPerWindow) {
      hits.set(key, recent);
      return true;
    }

    recent.push(now);
    hits.set(key, recent);

    // Poda para que el Map no crezca sin techo mientras viva la instancia.
    if (hits.size > 500) {
      for (const [k, v] of hits) {
        if (v.every((t) => now - t >= windowMs)) hits.delete(k);
      }
    }
    return false;
  };
}
