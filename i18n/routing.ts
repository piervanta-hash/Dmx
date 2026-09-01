import { defineRouting } from 'next-intl/routing';

/**
 * Lingue attive in questa fase: inglese (sorgente), italiano, albanese.
 * Tedesco e greco entrano in Fase 7. Albanese e greco richiedono revisione
 * madrelingua prima della pubblicazione — vedi lib/design-tokens.ts.
 */
export const routing = defineRouting({
  locales: ['en', 'it', 'sq'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/products': {
      en: '/products',
      it: '/prodotti',
      sq: '/produktet',
    },
    '/products/offices': {
      en: '/products/offices',
      it: '/prodotti/uffici',
      sq: '/produktet/zyra',
    },
    '/products/housing': {
      en: '/products/housing',
      it: '/prodotti/alloggi',
      sq: '/produktet/banesa',
    },
    '/products/sanitary': {
      en: '/products/sanitary',
      it: '/prodotti/servizi-igienici',
      sq: '/produktet/sanitare',
    },
    '/products/special': {
      en: '/products/special',
      it: '/prodotti/speciali',
      sq: '/produktet/speciale',
    },
    '/products/hospitality': {
      en: '/products/hospitality',
      it: '/prodotti/ricettivo',
      sq: '/produktet/mikpritje',
    },
    '/products/offices/[model]': {
      en: '/products/offices/[model]',
      it: '/prodotti/uffici/[model]',
      sq: '/produktet/zyra/[model]',
    },
    '/products/housing/[model]': {
      en: '/products/housing/[model]',
      it: '/prodotti/alloggi/[model]',
      sq: '/produktet/banesa/[model]',
    },
    '/products/sanitary/[model]': {
      en: '/products/sanitary/[model]',
      it: '/prodotti/servizi-igienici/[model]',
      sq: '/produktet/sanitare/[model]',
    },
    '/products/special/[model]': {
      en: '/products/special/[model]',
      it: '/prodotti/speciali/[model]',
      sq: '/produktet/speciale/[model]',
    },
    '/products/hospitality/[model]': {
      en: '/products/hospitality/[model]',
      it: '/prodotti/ricettivo/[model]',
      sq: '/produktet/mikpritje/[model]',
    },
    '/configurator': {
      en: '/configurator',
      it: '/configura',
      sq: '/konfiguro',
    },
    '/downloads': {
      en: '/downloads',
      it: '/download',
      sq: '/shkarkimet',
    },
    '/projects': {
      en: '/projects',
      it: '/progetti',
      sq: '/projektet',
    },
    '/production': {
      en: '/production',
      it: '/produzione',
      sq: '/prodhimi',
    },
    '/certifications': {
      en: '/certifications',
      it: '/certificazioni',
      sq: '/certifikimet',
    },
    '/logistics': {
      en: '/logistics',
      it: '/logistica',
      sq: '/logjistika',
    },
    '/company': {
      en: '/company',
      it: '/azienda',
      sq: '/kompania',
    },
    '/contact': {
      en: '/contact',
      it: '/contatti',
      sq: '/kontakti',
    },
    '/design-system': '/design-system',
  },
});

export type AppPathname = keyof typeof routing.pathnames;

/** Solo le rotte statiche (esclude i segmenti dinamici tipo "[model]"): usato per i menu di navigazione. */
export type StaticAppPathname = Exclude<AppPathname, `${string}[model]${string}`>;
