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
