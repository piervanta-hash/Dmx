import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { archivo } from "../fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "../globals.css";

export const metadata: Metadata = {
  title: "Domeinox",
  description: "Domeinox sh.p.k. — moduli in acciaio, fabbricati in Albania.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

  return (
    <html lang={locale} className={`${archivo.variable} antialiased`}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
