/**
 * Rate limit in memoria, per IP — nessuna dipendenza nuova, nessuno store esterno.
 * Limite noto: la mappa vive nel processo del server, quindi si azzera a ogni
 * riavvio e non è condivisa tra più istanze (es. deploy serverless multi-istanza).
 * Sufficiente per bloccare abusi da un singolo script; non sostituisce un vero
 * servizio di rate limiting se il traffico giustificherà più istanze.
 */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.set(key, timestamps);
  return timestamps.length >= MAX_REQUESTS;
}

export function recordHit(key: string): void {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
}
