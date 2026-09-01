import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { simplePageMetadata } from "@/lib/simple-metadata";
import { ConfiguratorWizard } from "@/components/configurator/ConfiguratorWizard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return simplePageMetadata(locale, "/configurator", "configurator", "configurator");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.configurator" });
  const tc = await getTranslations({ locale, namespace: "configurator" });

  return (
    <>
      <section className="bg-calce px-8 py-24 md:px-20 md:py-32">
        <h1 className="type-display text-display-1 text-grafite">{t("title")}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{tc("lead")}</p>
      </section>
      <section className="bg-zinco px-8 py-16 md:px-20 md:py-24">
        <div className="max-w-2xl">
          <ConfiguratorWizard />
        </div>
      </section>
    </>
  );
}
