import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { familyMetadata } from "@/lib/family-metadata";
import { FamilyPageBody } from "@/components/products/FamilyPageBody";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return familyMetadata(locale, "sanitary");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FamilyPageBody family="sanitary" />;
}
