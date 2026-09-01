import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Teaser statico. Il form a campi arriva in Fase 5 — qui porta solo a /contact. */
export function CtaSection() {
  const t = useTranslations("home.cta");

  return (
    <section className="bg-grafite pl-8 pr-6 py-24 md:pl-20 md:pr-12 md:py-32">
      <h2 className="type-display text-display-1 max-w-3xl text-calce">{t("title")}</h2>
      <p className="type-body text-body-lg mt-6 max-w-xl text-calce/80">{t("body")}</p>
      <Link
        href="/contact"
        className="type-body mt-10 inline-block border border-calce px-8 py-4 text-calce transition-colors hover:bg-calce hover:text-grafite"
      >
        {t("button")}
      </Link>
    </section>
  );
}
