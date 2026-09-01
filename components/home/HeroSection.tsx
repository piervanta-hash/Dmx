import { useTranslations } from "next-intl";
import { HeroDimensionOverlay } from "./HeroDimensionOverlay";

/**
 * Apertura a schermo pieno. È l'elemento LCP: statica, nessuna libreria, nessuno
 * script bloccante. Il render fotografico non esiste ancora — al suo posto un
 * rendering isometrico reale (generato da scripts/generate-product-renders.mjs,
 * stessa palette a 6 token), non un campo colore vuoto.
 */
export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative flex h-[100svh] min-h-[560px] items-end bg-pav">
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG statico locale, è l'elemento LCP: niente overhead di next/image qui. */}
      <img
        src="/renders/hero-fianco.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <HeroDimensionOverlay width="6058 mm" height="2438 mm" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-calce/80 to-transparent" />
      <div className="relative pb-8 md:pb-14">
        <p className="type-display text-display-1 text-grafite">{t("model")}</p>
        <p className="type-data pl-1 text-grafite/70">{t("dimensions")}</p>
      </div>
    </section>
  );
}
