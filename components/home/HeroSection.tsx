import { useTranslations } from "next-intl";

/**
 * Apertura a schermo pieno. È l'elemento LCP: statica, nessuna libreria, nessuno
 * script bloccante. Il render fotografico non esiste ancora — al suo posto un
 * rendering isometrico reale (generato da scripts/generate-product-renders.mjs,
 * stessa palette a 6 token), non un campo colore vuoto.
 *
 * Il marchio in apertura è la dichiarazione, non una tavola quotata: le quote
 * tecniche (in scala reale) vivono già nella sezione "Il montaggio" subito
 * sotto — qui bastano un'etichetta di modello e le dimensioni in piccolo.
 */
export function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    // L'header è sticky ma occupa spazio nel flusso (80px sotto xl, 68px da xl in su): un
    // hero a 100svh sommato a quello sfora sempre il primo viewport, tagliando la didascalia
    // in fondo prima ancora di scrollare. Si sottrae l'altezza dell'header, non si usa 100svh puro.
    <section className="relative flex h-[calc(100svh-80px)] min-h-[560px] flex-col justify-between bg-pav xl:h-[calc(100svh-68px)]">
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG statico locale, è l'elemento LCP: niente overhead di next/image qui. */}
      <img
        src="/renders/hero-fianco.svg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-calce/85 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-calce/85 to-transparent" />

      <div className="relative px-8 pt-10 md:px-20 md:pt-14">
        <p className="type-display text-[clamp(3rem,5vw+1rem,7rem)] leading-[0.9] tracking-tight text-grafite">
          Domeinox
        </p>
        <p className="type-body mt-4 max-w-xl text-lg text-grafite/80 md:text-xl">{t("tagline")}</p>
      </div>

      <div className="relative flex items-baseline justify-between px-8 pb-8 md:px-20 md:pb-14">
        <p className="type-data text-grafite">
          {t("model")} <span className="text-grafite/60">— {t("dimensions")}</span>
        </p>
      </div>
    </section>
  );
}
