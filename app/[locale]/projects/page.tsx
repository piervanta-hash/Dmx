import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { simplePageMetadata } from "@/lib/simple-metadata";
import { CtaSection } from "@/components/home/CtaSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return simplePageMetadata(locale, "/projects", "projects", "projects");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.projects" });
  const tp = await getTranslations({ locale, namespace: "projects" });

  return (
    <>
      <section className="bg-calce px-8 py-24 md:px-20 md:py-32">
        <h1 className="type-display text-display-1 text-grafite">{t("title")}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{tp("lead")}</p>
      </section>
      <section className="bg-zinco px-8 py-24 md:px-20 md:py-32">
        <div className="max-w-md border border-dashed border-grafite/40 p-10">
          <p className="type-display text-display-3 text-grafite">{tp("empty.title")}</p>
          <p className="type-body mt-4 text-grafite/75">{tp("empty.body")}</p>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
