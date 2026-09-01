/**
 * Formattazione numerica locale-aware condivisa. `useGrouping` è passato esplicitamente
 * (non 'auto'): la versione ICU di Node e quella del browser applicano soglie diverse
 * per il raggruppamento delle migliaia in alcune lingue (es. "6058" vs "6.058" in
 * italiano per numeri a 4 cifre), il che produce un mismatch di idratazione SSR/CSR
 * se lasciato implicito.
 */
export function formatMm(value: number, locale: string): string {
  return `${value.toLocaleString(locale, { useGrouping: true })} mm`;
}

export function formatArea(value: number, locale: string): string {
  return `${value.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1, useGrouping: true })} m²`;
}
