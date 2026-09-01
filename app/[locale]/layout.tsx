import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL, buildAlternates } from "@/lib/seo";
import { organizationJsonLd } from "@/lib/structured-data";
import { archivo, notoSansGreek } from "../fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.home" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s — Domeinox` },
    description:
      "Domeinox sh.p.k. — steel container modules, manufactured in Albania — Europe. Domeinox starts from steel.",
    alternates: buildAlternates("/", locale),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Rende il locale disponibile ai Server Component discendenti senza doverlo ripassare a mano.
  setRequestLocale(locale);

  // Il font greco si carica solo per la locale `el`, mai per le altre — vedi app/fonts/index.ts.
  const fontVariables = locale === "el" ? `${archivo.variable} ${notoSansGreek.variable}` : archivo.variable;

  return (
    <html lang={locale} className={`${fontVariables} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }} />
        <NextIntlClientProvider>
          <SmoothScrollProvider />
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
