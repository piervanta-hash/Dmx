import type { StaticAppPathname } from "@/i18n/routing";

export interface NavItem {
  href: StaticAppPathname;
  messageKey:
    | "home"
    | "products"
    | "configurator"
    | "projects"
    | "production"
    | "certifications"
    | "logistics"
    | "company"
    | "contact";
}

/** Voci di primo livello della navigazione, nell'ordine dell'architettura del sito. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/products", messageKey: "products" },
  { href: "/configurator", messageKey: "configurator" },
  { href: "/projects", messageKey: "projects" },
  { href: "/production", messageKey: "production" },
  { href: "/certifications", messageKey: "certifications" },
  { href: "/logistics", messageKey: "logistics" },
  { href: "/company", messageKey: "company" },
  { href: "/contact", messageKey: "contact" },
];

export interface ProductFamily {
  href: StaticAppPathname;
  messageKey: "productsOffices" | "productsHousing" | "productsSanitary" | "productsSpecial" | "productsHospitality";
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  { href: "/products/offices", messageKey: "productsOffices" },
  { href: "/products/housing", messageKey: "productsHousing" },
  { href: "/products/sanitary", messageKey: "productsSanitary" },
  { href: "/products/special", messageKey: "productsSpecial" },
  { href: "/products/hospitality", messageKey: "productsHospitality" },
];

export interface FooterExtraLink {
  href: StaticAppPathname;
  messageKey: "downloads";
}

/** Link secondari, fuori dalla navigazione principale del brief — solo in footer. */
export const FOOTER_EXTRA_LINKS: FooterExtraLink[] = [{ href: "/downloads", messageKey: "downloads" }];

export const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  it: "IT",
  sq: "SQ",
};
