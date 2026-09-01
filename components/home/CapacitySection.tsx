import { useTranslations } from "next-intl";
import { DataPlaceholder } from "@/components/media/DataPlaceholder";

const STATS = ["modules", "floorArea", "years", "countries"] as const;

export function CapacitySection() {
  const t = useTranslations("home.capacity");

  return (
    <section className="bg-calce pl-8 pr-6 py-20 md:pl-20 md:pr-12 md:py-28">
      <h2 className="type-display text-display-2 text-grafite">{t("title")}</h2>
      <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat}>
            <DataPlaceholder label={t("valueToConfirm")} size="lg" />
            <p className="type-body mt-3 text-grafite/70">{t(`stats.${stat}.label`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
