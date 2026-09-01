import { useTranslations } from "next-intl";

export function ClassesSection() {
  const t = useTranslations("home.classes");

  return (
    <section className="bg-grafite pl-8 pr-6 py-20 md:pl-20 md:pr-12 md:py-28">
      <h2 className="type-display text-display-2 text-calce">{t("title")}</h2>
      <p className="type-body text-body-lg mt-4 max-w-2xl text-calce/80">{t("lead")}</p>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
        {(["classA", "classB"] as const).map((cls) => (
          <div key={cls}>
            <p className="type-display text-display-3 text-genziana">{t(`${cls}.label`)}</p>
            <p className="type-data mt-3 text-calce/60">{t(`${cls}.width`)}</p>
            <p className="type-body mt-6 text-calce/85">{t(`${cls}.transport`)}</p>
            <p className="type-body mt-4 text-calce/60">{t(`${cls}.use`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
