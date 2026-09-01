import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { simplePageMetadata } from "@/lib/simple-metadata";
import { ClassesSection } from "@/components/home/ClassesSection";
import { WhyEuropeSection } from "@/components/home/WhyEuropeSection";
import { CtaSection } from "@/components/home/CtaSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return simplePageMetadata(locale, "/logistics", "logistics", "logistics");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.logistics" });
  const tl = await getTranslations({ locale, namespace: "logistics" });

  return (
    <>
      <section className="bg-calce px-8 py-24 md:px-20 md:py-32">
        <h1 className="type-display text-display-1 text-grafite">{t("title")}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{tl("lead")}</p>
      </section>
      <ClassesSection />
      <WhyEuropeSection />
      <CtaSection />
    </>
  );
}
