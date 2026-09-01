import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ProductionSequenceSection } from "@/components/home/ProductionSequenceSection";
import { CtaSection } from "@/components/home/CtaSection";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.production" });
  const tp = await getTranslations({ locale, namespace: "production" });

  return (
    <>
      <section className="bg-zinco px-8 py-24 md:px-20 md:py-32">
        <h1 className="type-display text-display-1 text-grafite">{t("title")}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{tp("lead")}</p>
      </section>
      <ProductionSequenceSection />
      <CtaSection />
    </>
  );
}
