import { setRequestLocale } from "next-intl/server";
import { FamilyPageBody } from "@/components/products/FamilyPageBody";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FamilyPageBody family="housing" />;
}
