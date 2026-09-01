import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getModel, modelsByFamily } from "@/lib/products-data";
import { ModelPageBody } from "@/components/products/ModelPageBody";

const FAMILY = "sanitary" as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    modelsByFamily(FAMILY).map((model) => ({ locale, model: model.code })),
  );
}

export default async function Page({ params }: { params: Promise<{ locale: string; model: string }> }) {
  const { locale, model: modelCode } = await params;
  setRequestLocale(locale);
  const model = getModel(modelCode);
  if (!model || model.family !== FAMILY) notFound();
  return <ModelPageBody model={model} />;
}
