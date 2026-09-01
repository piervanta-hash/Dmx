import { useTranslations } from "next-intl";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";

const STEPS = ["cutting", "welding", "insulation", "systems", "finishing", "loading"] as const;

/**
 * Unica sezione del sito dove la numerazione è legittima: è una sequenza reale,
 * non un elenco generico travestito da processo.
 */
export function ProductionSequenceSection() {
  const t = useTranslations("home.production");

  return (
    <section className="bg-calce py-20 md:py-28">
      <div className="pl-8 pr-6 md:pl-20 md:pr-12">
        <h2 className="type-display text-display-2 text-grafite">{t("title")}</h2>
        <p className="type-body text-body-lg mt-4 max-w-2xl text-grafite/75">{t("lead")}</p>
      </div>

      <div className="mt-14 flex flex-col gap-16 pl-8 pr-6 md:pl-20 md:pr-12">
        {STEPS.map((step, i) => (
          <div key={step} className="grid gap-6 md:grid-cols-[auto_1fr_1.4fr] md:items-center md:gap-10">
            <span className="type-display text-display-3 text-grafite/60">
              {String(i + 1).padStart(2, "0")}
            </span>
            <ImagePlaceholder slot={`domeinox-produzione-${step}.jpg`} ratio="fianco" caption="" className="md:max-w-sm" />
            <div>
              <h3 className="type-display text-display-3 text-grafite">{t(`steps.${step}.title`)}</h3>
              <p className="type-body mt-2 max-w-md text-grafite/75">{t(`steps.${step}.body`)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
