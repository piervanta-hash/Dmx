import { defineRouting } from 'next-intl/routing';

/**
 * Cinque lingue: inglese (sorgente), italiano, albanese, tedesco, greco.
 * Albanese e greco richiedono revisione madrelingua prima della pubblicazione
 * — vedi lib/design-tokens.ts e il footer del sito.
 */
export const routing = defineRouting({
  locales: ['en', 'it', 'sq', 'de', 'el'],
  defaultLocale: 'en',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/products': {
      en: '/products',
      it: '/prodotti',
      sq: '/produktet',
      de: '/produkte',
      el: '/προϊόντα',
    },
    '/products/offices': {
      en: '/products/offices',
      it: '/prodotti/uffici',
      sq: '/produktet/zyra',
      de: '/produkte/buero',
      el: '/προϊόντα/γραφεία',
    },
    '/products/housing': {
      en: '/products/housing',
      it: '/prodotti/alloggi',
      sq: '/produktet/banesa',
      de: '/produkte/wohnmodule',
      el: '/προϊόντα/στέγαση',
    },
    '/products/sanitary': {
      en: '/products/sanitary',
      it: '/prodotti/servizi-igienici',
      sq: '/produktet/sanitare',
      de: '/produkte/sanitaer',
      el: '/προϊόντα/υγιεινή',
    },
    '/products/special': {
      en: '/products/special',
      it: '/prodotti/speciali',
      sq: '/produktet/speciale',
      de: '/produkte/spezial',
      el: '/προϊόντα/ειδικά',
    },
    '/products/hospitality': {
      en: '/products/hospitality',
      it: '/prodotti/ricettivo',
      sq: '/produktet/mikpritje',
      de: '/produkte/gaeste',
      el: '/προϊόντα/φιλοξενία',
    },
    '/products/offices/[model]': {
      en: '/products/offices/[model]',
      it: '/prodotti/uffici/[model]',
      sq: '/produktet/zyra/[model]',
      de: '/produkte/buero/[model]',
      el: '/προϊόντα/γραφεία/[model]',
    },
    '/products/housing/[model]': {
      en: '/products/housing/[model]',
      it: '/prodotti/alloggi/[model]',
      sq: '/produktet/banesa/[model]',
      de: '/produkte/wohnmodule/[model]',
      el: '/προϊόντα/στέγαση/[model]',
    },
    '/products/sanitary/[model]': {
      en: '/products/sanitary/[model]',
      it: '/prodotti/servizi-igienici/[model]',
      sq: '/produktet/sanitare/[model]',
      de: '/produkte/sanitaer/[model]',
      el: '/προϊόντα/υγιεινή/[model]',
    },
    '/products/special/[model]': {
      en: '/products/special/[model]',
      it: '/prodotti/speciali/[model]',
      sq: '/produktet/speciale/[model]',
      de: '/produkte/spezial/[model]',
      el: '/προϊόντα/ειδικά/[model]',
    },
    '/products/hospitality/[model]': {
      en: '/products/hospitality/[model]',
      it: '/prodotti/ricettivo/[model]',
      sq: '/produktet/mikpritje/[model]',
      de: '/produkte/gaeste/[model]',
      el: '/προϊόντα/φιλοξενία/[model]',
    },
    '/configurator': {
      en: '/configurator',
      it: '/configura',
      sq: '/konfiguro',
      de: '/konfigurator',
      el: '/διαμόρφωση',
    },
    '/downloads': {
      en: '/downloads',
      it: '/download',
      sq: '/shkarkimet',
      de: '/downloads',
      el: '/λήψεις',
    },
    '/projects': {
      en: '/projects',
      it: '/progetti',
      sq: '/projektet',
      de: '/projekte',
      el: '/έργα',
    },
    '/production': {
      en: '/production',
      it: '/produzione',
      sq: '/prodhimi',
      de: '/produktion',
      el: '/παραγωγή',
    },
    '/certifications': {
      en: '/certifications',
      it: '/certificazioni',
      sq: '/certifikimet',
      de: '/zertifizierungen',
      el: '/πιστοποιήσεις',
    },
    '/logistics': {
      en: '/logistics',
      it: '/logistica',
      sq: '/logjistika',
      de: '/logistik',
      el: '/εφοδιαστική',
    },
    '/company': {
      en: '/company',
      it: '/azienda',
      sq: '/kompania',
      de: '/unternehmen',
      el: '/εταιρεία',
    },
    '/contact': {
      en: '/contact',
      it: '/contatti',
      sq: '/kontakti',
      de: '/kontakt',
      el: '/επικοινωνία',
    },
    '/design-system': '/design-system',
  },
});

export type AppPathname = keyof typeof routing.pathnames;

/** Solo le rotte statiche (esclude i segmenti dinamici tipo "[model]"): usato per i menu di navigazione. */
export type StaticAppPathname = Exclude<AppPathname, `${string}[model]${string}`>;
