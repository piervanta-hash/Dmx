import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { buildAlternates } from "@/lib/seo";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import { DataPlaceholder } from "@/components/media/DataPlaceholder";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quoteRequest" });
  return {
    title: t("title"),
    description: t("lead"),
    alternates: buildAlternates("/contact", locale),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "quoteRequest" });
  const ti = await getTranslations({ locale, namespace: "contactInfo" });

  return (
    <>
      <section className="bg-calce px-8 py-24 md:px-20 md:py-32">
        <h1 className="type-display text-display-1 text-grafite">{t("title")}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{t("lead")}</p>
      </section>
      <section className="bg-zinco px-8 py-16 md:px-20 md:py-24">
        <div className="grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="type-display text-display-3 text-grafite">{ti("title")}</h2>
            <dl className="type-data mt-6 flex flex-col gap-4">
              <div>
                <dt className="text-grafite/75">{ti("addressLabel")}</dt>
                <dd className="mt-1">
                  <DataPlaceholder label={ti("toConfirm")} />
                </dd>
              </div>
              <div>
                <dt className="text-grafite/75">{ti("phoneLabel")}</dt>
                <dd className="mt-1">
                  <DataPlaceholder label={ti("toConfirm")} />
                </dd>
              </div>
              <div>
                <dt className="text-grafite/75">{ti("emailLabel")}</dt>
                <dd className="mt-1">
                  <DataPlaceholder label={ti("toConfirm")} />
                </dd>
              </div>
            </dl>
          </div>
          <div className="max-w-2xl">
            <QuoteRequestForm />
          </div>
        </div>
      </section>
    </>
  );
}
