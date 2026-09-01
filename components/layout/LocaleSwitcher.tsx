"use client";

import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { LOCALE_LABELS } from "@/lib/nav-items";

interface LocaleSwitcherProps {
  tone?: "onDark" | "onLight";
}

export function LocaleSwitcher({ tone = "onDark" }: LocaleSwitcherProps) {
  const locale = useLocale();
  // Su rotte dinamiche (es. schede prodotto) usePathname() è il template con "[model]":
  // servono anche i params effettivi per ricostruire l'URL nella lingua di destinazione.
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const mutedClass = tone === "onDark" ? "text-calce/60 hover:text-calce" : "text-grafite/75 hover:text-grafite";
  const activeClass = tone === "onDark" ? "text-calce" : "text-grafite";

  return (
    <nav aria-label="Lingua" className="flex items-center gap-4">
      {routing.locales.map((code) => (
        <button
          key={code}
          type="button"
          aria-current={code === locale ? "true" : undefined}
          onClick={() =>
            router.replace(
              // @ts-expect-error -- pathname/params provengono da usePathname/useParams a runtime:
              // la combinazione è sempre valida ma next-intl non riesce a inferirlo staticamente qui.
              { pathname, params },
              { locale: code },
            )
          }
          className={`type-data ${code === locale ? activeClass + " underline decoration-genziana underline-offset-4" : mutedClass} transition-colors`}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </nav>
  );
}
