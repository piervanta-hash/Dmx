import { useTranslations } from "next-intl";

type PageKey =
  | "home"
  | "products"
  | "productsOffices"
  | "productsHousing"
  | "productsSanitary"
  | "productsSpecial"
  | "productsHospitality"
  | "configurator"
  | "projects"
  | "production"
  | "certifications"
  | "logistics"
  | "company"
  | "contact";

/** Involucro condiviso per le pagine ancora senza contenuto reale (Fase 1). */
export function PagePlaceholder({ pageKey }: { pageKey: PageKey }) {
  const t = useTranslations("pages");
  const tp = useTranslations("placeholder");

  return (
    <section className="bg-zinco px-8 py-24 md:px-20 md:py-32">
      <p className="type-data text-grafite/60">{tp("label")}</p>
      <h1 className="type-display text-display-1 mt-4 text-grafite">{t(`${pageKey}.title`)}</h1>
      <p className="type-body mt-6 max-w-xl text-grafite/75">{tp("note")}</p>
    </section>
  );
}
