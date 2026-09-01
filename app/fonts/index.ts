import localFont from 'next/font/local';

/**
 * Archivo variabile, self-hosted (non Google Fonts CDN: una richiesta esterna in meno
 * sul path critico dell'LCP). Copre latin + latin-ext (albanese compreso). Il greco non è
 * coperto — Archivo non ha un subset greco — vedi lib/design-tokens.ts per il fallback.
 */
export const archivo = localFont({
  src: [
    { path: './archivo-latin.woff2', weight: '300 800', style: 'normal' },
    { path: './archivo-latin-ext.woff2', weight: '300 800', style: 'normal' },
  ],
  variable: '--font-archivo',
  display: 'swap',
});

/**
 * Fallback per la sola build/locale `el`: Archivo non copre il greco (verificato,
 * non solo dichiarato — vedi lib/design-tokens.ts). Noto Sans, self-hosted e
 * sottoinsiemato a latin+greek, sostituisce Archivo per intere pagine in greco
 * (non carattere per carattere) così il font resta coerente su tutta la pagina.
 */
export const notoSansGreek = localFont({
  src: [
    { path: './notosans-greek-400.woff2', weight: '400', style: 'normal' },
    { path: './notosans-greek-700.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-noto-greek',
  display: 'swap',
});
