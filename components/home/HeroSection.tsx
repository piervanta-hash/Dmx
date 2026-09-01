import { useTranslations } from "next-intl";
import { HeroDimensionOverlay } from "./HeroDimensionOverlay";

/**
 * Apertura a schermo pieno. È l'elemento LCP: statica, nessuna libreria, nessuno
 * script bloccante. Il render fotorealistico non esiste ancora — il campo colore
 * pav tiene il posto con la proporzione fianco già corretta (2,34 : 1 sull'intero
 * riquadro, non solo su un blocco interno).
 */
export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-end bg-pav">
      <HeroDimensionOverlay width="6058 mm" height="2438 mm" />
      <div className="absolute right-6 top-6 flex flex-col items-end md:right-12 md:top-10">
        <span className="type-data text-grafite/50">domeinox-hero-a20-fianco.jpg</span>
        <span className="type-data text-grafite/50">2,34 : 1</span>
      </div>
      <div className="pb-8 md:pb-14">
        <p className="type-display text-display-1 text-grafite">{t("model")}</p>
        <p className="type-data pl-1 text-grafite/70">{t("dimensions")}</p>
      </div>
    </section>
  );
}
