import { useTranslations } from "next-intl";
import { QuoteRequestForm } from "@/components/forms/QuoteRequestForm";
import type { ConfiguratorAnswers } from "@/lib/configurator-steps";

/** Riepilogo tecnico stampabile + invio come richiesta di preventivo — nessun prezzo mostrato. */
export function ConfiguratorReview({ answers, onBack }: { answers: ConfiguratorAnswers; onBack: () => void }) {
  const t = useTranslations("configurator");
  const tc = useTranslations("home.classes");

  const rows: { label: string; value: string }[] = [
    { label: t("steps.use.label"), value: answers.use ? t(`steps.use.options.${answers.use}`) : "" },
    {
      label: t("steps.format.label"),
      value: answers.format ? `${tc(`${answers.format}.label`)} — ${tc(`${answers.format}.width`)}` : "",
    },
    { label: t("steps.insulation.label"), value: answers.insulation ? t(`steps.insulation.options.${answers.insulation}`) : "" },
    { label: t("steps.fitout.label"), value: answers.fitout ? t(`steps.fitout.options.${answers.fitout}`) : "" },
    { label: t("steps.systems.label"), value: answers.systems ? t(`steps.systems.options.${answers.systems}`) : "" },
    { label: t("steps.quantity.label"), value: `${answers.quantity} ${t("steps.quantity.unit")}` },
  ];

  const projectTypeLabel = answers.use ? t(`steps.use.options.${answers.use}`) : "";

  return (
    <div>
      <button type="button" onClick={onBack} className="type-data text-grafite/75 hover:text-grafite">
        {t("back")}
      </button>

      <div id="configurator-print-summary" className="mt-8 border border-grafite/25 p-8">
        <h2 className="type-display text-display-3 text-grafite">{t("summary.title")}</h2>
        <dl className="type-data mt-6 flex flex-col gap-3">
          {rows.map((row) => (
            <div key={row.label} className="flex justify-between gap-6 border-b border-grafite/15 py-2">
              <dt className="text-grafite/75">{row.label}</dt>
              <dd className="text-grafite">{row.value}</dd>
            </div>
          ))}
        </dl>
        <button
          type="button"
          onClick={() => window.print()}
          className="type-data mt-6 border border-grafite/40 px-5 py-2 text-grafite hover:border-grafite print:hidden"
        >
          {t("summary.print")}
        </button>
      </div>

      <p className="type-body mt-6 max-w-xl text-grafite/75">{t("summary.noPriceNote")}</p>

      <div className="mt-12">
        <QuoteRequestForm hideProjectFields prefill={{ projectType: projectTypeLabel, quantity: answers.quantity }} />
      </div>
    </div>
  );
}
