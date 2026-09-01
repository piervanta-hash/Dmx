import { SITE_URL, absoluteUrl } from './seo';
import type { AppPathname } from '@/i18n/routing';
import type { ModelData } from './products-data';

/** Organization — un'unica istanza, iniettata nel layout radice. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Domeinox sh.p.k.',
    url: SITE_URL,
    description: 'Manufactured in Albania — Europe. Steel container-module manufacturer.',
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Product — niente offers/price (nessun prezzo esiste, mai inventarlo) e niente
 * image (nessuna foto reale esiste ancora). Solo i dati che abbiamo per davvero.
 */
export function productJsonLd(
  model: ModelData,
  pathnameKey: AppPathname,
  locale: string,
  name: string,
  description: string,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    sku: model.code,
    manufacturer: {
      '@type': 'Organization',
      name: 'Domeinox sh.p.k.',
    },
    url: absoluteUrl(pathnameKey, locale, { model: model.code }),
  };
}
