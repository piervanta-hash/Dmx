import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_ITEMS, PRODUCT_FAMILIES } from "@/lib/nav-items";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function SiteFooter() {
  const t = useTranslations("nav");
  const tf = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-calce pl-8 pr-6 pt-16 pb-10 md:pl-20 md:pr-12 md:pt-20">
      <div className="flex flex-col justify-between gap-12 md:flex-row">
        <div className="max-w-sm">
          <p className="type-display text-display-3 text-grafite">Domeinox</p>
          <p className="type-body mt-4 text-grafite/75">{tf("manufactured")}</p>
        </div>

        <div className="flex flex-wrap gap-16">
          <nav aria-label={t("home")} className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="type-body text-grafite/75 hover:text-grafite">
                {t(item.messageKey)}
              </Link>
            ))}
          </nav>
          <nav aria-label={t("products")} className="flex flex-col gap-3">
            {PRODUCT_FAMILIES.map((item) => (
              <Link key={item.href} href={item.href} className="type-body text-grafite/75 hover:text-grafite">
                {t(item.messageKey)}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-4 border-t border-grafite/15 pt-8 md:flex-row md:items-end md:justify-between">
        <LocaleSwitcher tone="onLight" />
        <div className="type-data flex flex-col gap-1 text-grafite/75 md:items-end md:text-right">
          <p>{tf("languageNote")}</p>
          <p>
            © {year} Domeinox sh.p.k. {tf("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
