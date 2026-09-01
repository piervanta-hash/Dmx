import { routing, type AppPathname } from '@/i18n/routing';

/**
 * Dominio di produzione non ancora assegnato: nessuno reale è stato fornito.
 * Placeholder esplicito, mai un dominio inventato spacciato per vero — da
 * sostituire con NEXT_PUBLIC_SITE_URL prima del lancio (vedi lista dati mancanti).
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.domeinox.example';

/** Risolve il segmento localizzato di una rotta, sostituendo eventuali parametri dinamici. */
function localizedPath(key: AppPathname, locale: string, params?: Record<string, string>): string {
  const entry = routing.pathnames[key];
  let path = typeof entry === 'string' ? entry : ((entry as Record<string, string>)[locale] ?? (entry as Record<string, string>)[routing.defaultLocale]);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      path = path.replace(`[${k}]`, v);
    }
  }
  return path;
}

export function absoluteUrl(key: AppPathname, locale: string, params?: Record<string, string>): string {
  const path = localizedPath(key, locale, params);
  return path === '/' ? `${SITE_URL}/${locale}` : `${SITE_URL}/${locale}${path}`;
}

/**
 * Alternate hreflang per tutte e cinque le lingue più x-default, e canonical
 * autoreferenziale sulla lingua corrente — non sempre sull'inglese.
 */
export function buildAlternates(key: AppPathname, currentLocale: string, params?: Record<string, string>) {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = absoluteUrl(key, locale, params);
  }
  languages['x-default'] = languages[routing.defaultLocale];
  return {
    canonical: languages[currentLocale],
    languages,
  };
}
