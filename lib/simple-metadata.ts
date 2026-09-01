import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from './seo';
import type { AppPathname } from '@/i18n/routing';

/**
 * Metadata per le pagine con un solo blocco di testo introduttivo: titolo da
 * pages.<pageKey>.title, descrizione da <leadNamespace>.lead.
 */
export async function simplePageMetadata(
  locale: string,
  pathKey: AppPathname,
  pageKey: string,
  leadNamespace: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages' });
  const tl = await getTranslations({ locale, namespace: leadNamespace });
  return {
    title: t(`${pageKey}.title`),
    description: tl('lead'),
    alternates: buildAlternates(pathKey, locale),
  };
}
