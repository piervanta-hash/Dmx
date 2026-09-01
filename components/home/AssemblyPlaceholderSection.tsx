import { useTranslations } from "next-intl";
import { ImagePlaceholder } from "@/components/media/ImagePlaceholder";

/**
 * Segnaposto statico per il blocco "Il montaggio" — la versione 3D scroll-driven
 * arriva in Fase 3, secondo la specifica animazione-montaggio-domeinox.md.
 */
export function AssemblyPlaceholderSection() {
  const t = useTranslations("home.assembly");

  return (
    <section className="bg-grafite pl-8 pr-6 py-20 md:pl-20 md:pr-12 md:py-28">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <p className="type-data mb-3 text-genziana">{t("eyebrow")}</p>
          <h2 className="type-display text-display-2 text-calce">{t("title")}</h2>
          <p className="type-body text-body-lg mt-6 text-calce/85">{t("body")}</p>
          <p className="type-data mt-8 text-calce/40">{t("note")}</p>
        </div>
        <ImagePlaceholder
          slot="domeinox-assonometria-esplosa.svg"
          ratio="fianco"
          caption="Exploded axonometric — replaced by the animation in Fase 3"
        />
      </div>
    </section>
  );
}
