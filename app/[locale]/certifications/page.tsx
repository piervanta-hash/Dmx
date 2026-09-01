import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { DataPlaceholder } from "@/components/media/DataPlaceholder";
import { CtaSection } from "@/components/home/CtaSection";

const CATEGORIES = ["qualityManagement", "welding", "productCompliance"] as const;

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.certifications" });
  const tc = await getTranslations({ locale, namespace: "certifications" });

  return (
    <>
      <section className="bg-calce px-8 py-24 md:px-20 md:py-32">
        <h1 className="type-display text-display-1 text-grafite">{t("title")}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{tc("lead")}</p>
      </section>
      <section className="bg-zinco px-8 py-16 md:px-20 md:py-24">
        <ul className="type-body flex max-w-2xl flex-col">
          {CATEGORIES.map((key) => (
            <li key={key} className="flex items-baseline justify-between gap-4 border-b border-grafite/15 py-5 first:border-t">
              <span className="text-grafite">{tc(`categories.${key}`)}</span>
              <DataPlaceholder label={tc("toConfirm")} />
            </li>
          ))}
        </ul>
      </section>
      <CtaSection />
    </>
  );
}
