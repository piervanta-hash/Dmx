import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

const CATEGORIES = ["technicalSheets", "certificates", "catalog", "cad", "bim"] as const;

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "downloads" });

  return (
    <>
      <section className="bg-calce px-8 py-24 md:px-20 md:py-32">
        <h1 className="type-display text-display-1 text-grafite">{t("title")}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{t("lead")}</p>
      </section>
      <section className="bg-zinco px-8 py-16 md:px-20 md:py-24">
        <ul className="type-body flex max-w-2xl flex-col">
          {CATEGORIES.map((key) => (
            <li key={key} className="flex items-baseline justify-between gap-4 border-b border-grafite/15 py-5 first:border-t">
              <span className="text-grafite">{t(`categories.${key}`)}</span>
              <span className="type-data text-grafite/75">{t("notAvailable")}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
