import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";

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
  return <PagePlaceholder pageKey="products" />;
}
