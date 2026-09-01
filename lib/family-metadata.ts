import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { buildAlternates } from './seo';
import type { AppPathname } from '@/i18n/routing';
import type { FamilyKey, ModelData } from './products-data';

export const PATH_BY_FAMILY: Record<FamilyKey, AppPathname> = {
  offices: '/products/offices',
  housing: '/products/housing',
  sanitary: '/products/sanitary',
  special: '/products/special',
  hospitality: '/products/hospitality',
};

export const MODEL_PATH_BY_FAMILY: Record<FamilyKey, AppPathname> = {
  offices: '/products/offices/[model]',
  housing: '/products/housing/[model]',
  sanitary: '/products/sanitary/[model]',
  special: '/products/special/[model]',
  hospitality: '/products/hospitality/[model]',
};

const PAGE_KEY_BY_FAMILY: Record<FamilyKey, string> = {
  offices: 'productsOffices',
  housing: 'productsHousing',
  sanitary: 'productsSanitary',
  special: 'productsSpecial',
  hospitality: 'productsHospitality',
};

/** Metadata condivisa dalle 5 pagine famiglia — titolo reale, descrizione dal familyLead. */
export async function familyMetadata(locale: string, family: FamilyKey): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'pages' });
  const tf = await getTranslations({ locale, namespace: 'products.familyLead' });
  return {
    title: t(`${PAGE_KEY_BY_FAMILY[family]}.title`),
    description: tf(family),
    alternates: buildAlternates(PATH_BY_FAMILY[family], locale),
  };
}

/** Metadata condivisa dalle 9 schede prodotto — titolo e descrizione reali del modello. */
export async function modelMetadata(locale: string, model: ModelData): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'products.models' });
  return {
    title: t(`${model.code}.name`),
    description: t(`${model.code}.description`),
    alternates: buildAlternates(MODEL_PATH_BY_FAMILY[model.family], locale, { model: model.code }),
  };
}
