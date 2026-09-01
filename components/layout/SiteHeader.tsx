"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/nav-items";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-grafite">
      <div className="flex items-center justify-between py-5 pl-8 pr-6 md:pl-20 md:pr-12">
        <Link href="/" onClick={() => setOpen(false)} className="type-display text-xl text-calce">
          Domeinox
        </Link>

        <nav aria-label={t("home")} className="hidden items-center gap-3 xl:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`type-body whitespace-nowrap text-xs transition-colors ${
                  active ? "text-genziana-scuro" : "text-calce/75 hover:text-calce"
                }`}
              >
                {t(item.messageKey)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden xl:block">
          <LocaleSwitcher tone="onDark" />
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-end justify-center gap-1.5 xl:hidden"
        >
          <span className={`h-px w-7 bg-calce transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-7 bg-calce transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-calce transition-transform ${open ? "-translate-y-2 w-7 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-x-0 top-[72px] bottom-0 z-40 flex flex-col justify-between overflow-y-auto bg-grafite px-8 py-10 xl:hidden">
          <nav className="flex flex-col gap-6">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`type-display text-display-3 ${active ? "text-genziana-scuro" : "text-calce"}`}
                >
                  {t(item.messageKey)}
                </Link>
              );
            })}
          </nav>
          <div className="pt-10">
            <LocaleSwitcher tone="onDark" />
          </div>
        </div>
      )}
    </header>
  );
}
