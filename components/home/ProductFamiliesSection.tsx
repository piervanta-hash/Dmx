import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";
import { PRODUCT_FAMILIES } from "@/lib/nav-items";

const SLOTS: Record<string, string> = {
  productsOffices: "domeinox-a20-u1-fronte.jpg",
  productsHousing: "domeinox-a20-l2-fronte.jpg",
  productsSanitary: "domeinox-a20-s1-fronte.jpg",
  productsSpecial: "domeinox-a10-g-fronte.jpg",
  productsHospitality: "domeinox-b21-l-fronte.jpg",
};

const MESSAGE_KEYS: Record<string, "offices" | "housing" | "sanitary" | "special" | "hospitality"> = {
  productsOffices: "offices",
  productsHousing: "housing",
  productsSanitary: "sanitary",
  productsSpecial: "special",
  productsHospitality: "hospitality",
};

export function ProductFamiliesSection() {
  const t = useTranslations("home.families");
  const tc = useTranslations("common");

  return (
    <section className="bg-calce py-20 md:py-28">
      <div className="pl-8 pr-6 md:pl-20 md:pr-12">
        <h2 className="type-display text-display-2 text-grafite">{t("title")}</h2>
        <p className="type-body text-body-lg mt-4 max-w-2xl text-grafite/75">{t("lead")}</p>
      </div>

      <div className="mt-14 flex flex-col">
        {PRODUCT_FAMILIES.map((family) => {
          const key = MESSAGE_KEYS[family.messageKey];
          return (
            <Link
              key={family.href}
              href={family.href}
              className="group flex flex-col gap-6 border-t border-grafite/15 py-10 pl-8 pr-6 last:border-b md:flex-row md:items-center md:gap-16 md:py-12 md:pl-20 md:pr-12"
            >
              <div className="w-full md:w-72 md:shrink-0">
                <ImagePlaceholder slot={SLOTS[family.messageKey]} ratio="fronte" caption="" />
              </div>
              <div>
                <h3 className="type-display text-display-3 text-grafite group-hover:text-genziana">
                  {t(`${key}.name`)}
                </h3>
                <p className="type-body mt-2 max-w-md text-grafite/75">{t(`${key}.description`)}</p>
                <dl className="type-data mt-6 flex flex-wrap gap-x-10 gap-y-2 text-grafite/70">
                  <div>
                    <dt className="text-grafite/75">{tc("area")}</dt>
                    <dd>{t(`${key}.area`)}</dd>
                  </div>
                  <div>
                    <dt className="text-grafite/75">{tc("leadTime")}</dt>
                    <dd>{t(`${key}.leadTime`)}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
