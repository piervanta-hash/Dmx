import { useTranslations } from "next-intl";

const PORTS = ["bari", "brindisi", "igoumenitsa", "trieste", "fiume"] as const;

/**
 * "Mappa dell'Adriatico" resa come schema di tratte, non come cartina geografica:
 * non esiste ancora un asset cartografico reale, e uno schema onesto batte una
 * mappa approssimativa.
 */
export function WhyEuropeSection() {
  const t = useTranslations("home.europe");

  return (
    <section className="bg-zinco pl-8 pr-6 py-20 md:pl-20 md:pr-12 md:py-28">
      <h2 className="type-display text-display-2 text-grafite">{t("title")}</h2>
      <p className="type-body text-body-lg mt-4 max-w-2xl text-grafite/75">{t("lead")}</p>

      <div className="mt-14 max-w-2xl">
        <p className="type-data mb-6 text-grafite/55">{t("mapNote")}</p>
        <div className="flex flex-col">
          {PORTS.map((port) => (
            <div
              key={port}
              className="flex flex-col gap-1 border-t border-grafite/15 py-5 last:border-b sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <span className="type-body text-grafite">{t(`ports.${port}`)}</span>
              <span className="type-data text-grafite/55">{t("timeToConfirm")}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
