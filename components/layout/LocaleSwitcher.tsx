"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { LOCALE_LABELS } from "@/lib/nav-items";

interface LocaleSwitcherProps {
  tone?: "onDark" | "onLight";
}

export function LocaleSwitcher({ tone = "onDark" }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
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
          onClick={() => router.replace(pathname, { locale: code })}
          className={`type-data ${code === locale ? activeClass + " underline decoration-genziana underline-offset-4" : mutedClass} transition-colors`}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </nav>
  );
}
