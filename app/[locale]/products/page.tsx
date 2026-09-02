import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { ProductFamiliesSection } from "@/components/home/ProductFamiliesSection";
import { CtaSection } from "@/components/home/CtaSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.products" });
  const tf = await getTranslations({ locale, namespace: "home.families" });
  return {
    title: t("title"),
    description: tf("lead"),
    alternates: buildAlternates("/products", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.products" });

  return (
    <>
      <section className="bg-calce px-8 pt-24 md:px-20 md:pt-32">
        <h1 className="type-display text-display-1 text-grafite">{t("title")}</h1>
      </section>
      <ProductFamiliesSection />
      <CtaSection />
    </>
  );
}
