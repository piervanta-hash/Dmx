import type { MetadataRoute } from 'next';
import { routing, type AppPathname } from '@/i18n/routing';
import { absoluteUrl, buildAlternates } from '@/lib/seo';
import { MODELS } from '@/lib/products-data';
import { MODEL_PATH_BY_FAMILY } from '@/lib/family-metadata';

const STATIC_PATHS: AppPathname[] = [
  '/',
  '/products',
  '/products/offices',
  '/products/housing',
  '/products/sanitary',
  '/products/special',
  '/products/hospitality',
  '/configurator',
  '/downloads',
  '/projects',
  '/production',
  '/certifications',
  '/logistics',
  '/company',
  '/contact',
];

/** Sitemap multilingua: una entry per lingua e rotta, con hreflang verso tutte le altre. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(path, locale),
        alternates: { languages: buildAlternates(path, locale).languages },
      });
    }
  }

  for (const model of MODELS) {
    const path = MODEL_PATH_BY_FAMILY[model.family];
    for (const locale of routing.locales) {
      entries.push({
        url: absoluteUrl(path, locale, { model: model.code }),
        alternates: { languages: buildAlternates(path, locale, { model: model.code }).languages },
      });
    }
  }

  return entries;
}
