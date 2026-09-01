"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { OptionGroup } from "./OptionGroup";
import { ConfiguratorReview } from "./ConfiguratorReview";
import {
  CONFIGURATOR_STEP_COUNT,
  FITOUT_OPTIONS,
  FORMAT_OPTIONS,
  INITIAL_ANSWERS,
  INSULATION_OPTIONS,
  SYSTEMS_OPTIONS,
  USE_OPTIONS,
  isStepAnswered,
  type ConfiguratorAnswers,
} from "@/lib/configurator-steps";

const STEP_KEYS = ["use", "format", "insulation", "fitout", "systems", "quantity"] as const;

/** Configuratore a passi: uso, formato, coibentazione, allestimento, impianti, quantità — poi riepilogo. */
export function ConfiguratorWizard() {
  const t = useTranslations("configurator");
  const tc = useTranslations("home.classes");
  const [answers, setAnswers] = useState<ConfiguratorAnswers>(INITIAL_ANSWERS);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<"steps" | "review">("steps");

  const stepKey = STEP_KEYS[step];
  const answered = isStepAnswered(step, answers);

  function goNext() {
    if (!answered) return;
    if (step === CONFIGURATOR_STEP_COUNT - 1) {
      setPhase("review");
    } else {
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  if (phase === "review") {
    return <ConfiguratorReview answers={answers} onBack={() => setPhase("steps")} />;
  }

  return (
    <div>
      <p className="type-data text-grafite/75">
        {t("stepLabel", { current: step + 1, total: CONFIGURATOR_STEP_COUNT })}
      </p>

      <div className="mt-8">
        {stepKey === "use" && (
          <OptionGroup
            name="use"
            legend={t("steps.use.label")}
            options={USE_OPTIONS}
            value={answers.use}
            onChange={(v) => setAnswers((a) => ({ ...a, use: v }))}
            optionLabel={(key) => t(`steps.use.options.${key}`)}
          />
        )}
        {stepKey === "format" && (
          <OptionGroup
            name="format"
            legend={t("steps.format.label")}
            options={FORMAT_OPTIONS}
            value={answers.format}
            onChange={(v) => setAnswers((a) => ({ ...a, format: v }))}
            optionLabel={(key) => `${tc(`${key}.label`)} — ${tc(`${key}.width`)}`}
          />
        )}
        {stepKey === "insulation" && (
          <OptionGroup
            name="insulation"
            legend={t("steps.insulation.label")}
            options={INSULATION_OPTIONS}
            value={answers.insulation}
            onChange={(v) => setAnswers((a) => ({ ...a, insulation: v }))}
            optionLabel={(key) => t(`steps.insulation.options.${key}`)}
          />
        )}
        {stepKey === "fitout" && (
          <OptionGroup
            name="fitout"
            legend={t("steps.fitout.label")}
            options={FITOUT_OPTIONS}
            value={answers.fitout}
            onChange={(v) => setAnswers((a) => ({ ...a, fitout: v }))}
            optionLabel={(key) => t(`steps.fitout.options.${key}`)}
          />
        )}
        {stepKey === "systems" && (
          <OptionGroup
            name="systems"
            legend={t("steps.systems.label")}
            options={SYSTEMS_OPTIONS}
            value={answers.systems}
            onChange={(v) => setAnswers((a) => ({ ...a, systems: v }))}
            optionLabel={(key) => t(`steps.systems.options.${key}`)}
          />
        )}
        {stepKey === "quantity" && (
          <div>
            <label htmlFor="configurator-quantity" className="type-display text-display-3 text-grafite">
              {t("steps.quantity.label")}
            </label>
            <div className="mt-6 flex items-baseline gap-3">
              <input
                id="configurator-quantity"
                type="number"
                min={1}
                value={answers.quantity}
                onChange={(e) => setAnswers((a) => ({ ...a, quantity: Number(e.target.value) }))}
                className="type-display text-display-3 w-32 border-b border-grafite/40 bg-transparent py-2 text-grafite focus:border-genziana focus:outline-none"
              />
              <span className="type-data text-grafite/75">{t("steps.quantity.unit")}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 flex gap-6">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="type-body border border-grafite/40 px-6 py-3 text-grafite transition-colors hover:border-grafite"
          >
            {t("back")}
          </button>
        )}
        <button
          type="button"
          onClick={goNext}
          disabled={!answered}
          className="type-body border border-grafite bg-grafite px-6 py-3 text-calce transition-colors hover:bg-transparent hover:text-grafite disabled:opacity-40"
        >
          {step === CONFIGURATOR_STEP_COUNT - 1 ? t("toSummary") : t("next")}
        </button>
      </div>
    </div>
  );
}
