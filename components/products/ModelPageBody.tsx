import { useTranslations } from "next-intl";
import { ProductFloorPlan } from "@/components/products/ProductFloorPlan";
import { ProductSpecTable } from "@/components/products/ProductSpecTable";
import { ProductDownloads } from "@/components/products/ProductDownloads";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import type { ModelData } from "@/lib/products-data";

/** Corpo condiviso delle 9 schede modello: intestazione, immagini, pianta quotata, dati, download. */
export function ModelPageBody({ model }: { model: ModelData }) {
  const t = useTranslations("products.models");
  const tc = useTranslations("home.classes");
  const ts = useTranslations("products.specs");
  const classLabel = model.class === "A" ? tc("classA.label") : tc("classB.label");
  const title = t(`${model.code}.name`);

  return (
    <>
      <section className="bg-calce px-8 py-24 md:px-20 md:py-32">
        <p className="type-data text-genziana">
          {model.code} — {classLabel}
        </p>
        <h1 className="type-display text-display-1 mt-4 text-grafite">{title}</h1>
        <p className="type-body text-body-lg mt-6 max-w-xl text-grafite/75">{t(`${model.code}.description`)}</p>
      </section>

      <section className="bg-zinco px-8 py-16 md:px-20 md:py-24">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <ImagePlaceholder slot={`domeinox-${model.code.toLowerCase()}-fronte.jpg`} ratio="fronte" caption="" />
          <ImagePlaceholder slot={`domeinox-${model.code.toLowerCase()}-fianco.jpg`} ratio="fianco" caption="" />
        </div>
      </section>

      <section className="bg-calce px-8 py-16 md:px-20 md:py-24">
        <h2 className="type-display text-display-3 text-grafite">{ts("floorPlanTitle")}</h2>
        <div className="mt-10 max-w-4xl">
          <ProductFloorPlan model={model} title={`${title} — ${ts("floorPlanTitle")}`} />
        </div>
      </section>

      <section className="bg-zinco px-8 py-16 md:px-20 md:py-24">
        <h2 className="type-display text-display-3 text-grafite">{ts("sectionTitle")}</h2>
        <div className="mt-10 max-w-3xl">
          <ProductSpecTable model={model} />
        </div>
      </section>

      <section className="bg-calce px-8 py-16 md:px-20 md:py-24">
        <div className="max-w-2xl">
          <ProductDownloads />
        </div>
      </section>
    </>
  );
}
