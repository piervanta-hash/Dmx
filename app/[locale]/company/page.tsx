import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { simplePageMetadata } from "@/lib/simple-metadata";
import { CapacitySection } from "@/components/home/CapacitySection";
import { CtaSection } from "@/components/home/CtaSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return simplePageMetadata(locale, "/company", "company", "company");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.company" });
  const tc = await getTranslations({ locale, namespace: "company" });
  const markets = tc.raw("markets") as string[];

  return (
    <>
      <section className="bg-calce px-8 py-24 md:px-20 md:py-32">
        <h1 className="type-display text-display-1 text-grafite">{t("title")}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{tc("lead")}</p>
      </section>
      <section className="bg-zinco px-8 py-16 md:px-20 md:py-24">
        <h2 className="type-display text-display-3 text-grafite">{tc("marketsTitle")}</h2>
        <ul className="type-body mt-6 flex max-w-2xl flex-wrap gap-x-8 gap-y-3 text-grafite/85">
          {markets.map((market) => (
            <li key={market} className="border-b border-grafite/25">
              {market}
            </li>
          ))}
        </ul>
      </section>
      <CapacitySection />
      <CtaSection />
    </>
  );
}
