import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { formatArea } from "@/lib/format";
import type { ModelData } from "@/lib/products-data";

const FAMILY_PATHNAME = {
  offices: "/products/offices/[model]",
  housing: "/products/housing/[model]",
  sanitary: "/products/sanitary/[model]",
  special: "/products/special/[model]",
  hospitality: "/products/hospitality/[model]",
} as const;

/** Riga di ingresso a una scheda modello, dentro l'elenco di famiglia. */
export function FamilyModelCard({ model }: { model: ModelData }) {
  const locale = useLocale();
  const t = useTranslations("products.models");
  const tc = useTranslations("home.classes");
  const ts = useTranslations("products.specs");
  const common = useTranslations("common");

  const classLabel = model.class === "A" ? tc("classA.label") : tc("classB.label");
  const dims = `${model.dimensions.w.toLocaleString(locale, { useGrouping: true })} × ${model.dimensions.d.toLocaleString(locale, { useGrouping: true })} mm`;

  return (
    <Link
      href={{ pathname: FAMILY_PATHNAME[model.family], params: { model: model.code } }}
      className="group flex flex-col gap-6 border-t border-grafite/15 py-10 pl-8 pr-6 last:border-b md:flex-row md:items-center md:gap-16 md:py-12 md:pl-20 md:pr-12"
    >
      <div className="w-full md:w-72 md:shrink-0">
        <ImagePlaceholder slot={`domeinox-${model.code.toLowerCase()}-fronte.jpg`} ratio="fronte" caption="" />
      </div>
      <div>
        <p className="type-data text-genziana">
          {model.code} — {classLabel}
        </p>
        <h3 className="type-display text-display-3 mt-1 text-grafite group-hover:text-genziana">
          {t(`${model.code}.name`)}
        </h3>
        <p className="type-body mt-2 max-w-md text-grafite/75">{t(`${model.code}.description`)}</p>
        <dl className="type-data mt-6 flex flex-wrap gap-x-10 gap-y-2 text-grafite/70">
          <div>
            <dt className="text-grafite/75">{common("area")}</dt>
            <dd>{formatArea(model.areaNet, locale)}</dd>
          </div>
          <div>
            <dt className="text-grafite/75">{ts("externalDimensions")}</dt>
            <dd>{dims}</dd>
          </div>
        </dl>
      </div>
    </Link>
  );
}
