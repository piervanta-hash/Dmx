import { setRequestLocale } from "next-intl/server";
import { PALETTE, RATIOS } from "@/lib/design-tokens";

const SWATCHES: { token: keyof typeof PALETTE; use: string; fg: "grafite" | "calce" }[] = [
  { token: "zinco", use: "Superficie dominante, grandi campiture", fg: "grafite" },
  { token: "grafite", use: "Testo, sezioni scure a piena pagina", fg: "calce" },
  { token: "calce", use: "Fondo chiaro, freddo — mai caldo", fg: "grafite" },
  { token: "pav", use: "Riempimento interno nelle planimetrie", fg: "grafite" },
  { token: "genziana", use: "Accento unico: link, stati attivi, quote", fg: "calce" },
  { token: "minio", use: "Solo il telaio in acciaio", fg: "calce" },
];

const FORMATI = [
  { sigla: "A10", ingombro: "3000 × 2438", lorda: "7,3 m²", netta: "6,7 m²", altezza: "2591" },
  { sigla: "A20", ingombro: "6058 × 2438", lorda: "14,8 m²", netta: "13,8 m²", altezza: "2591" },
  { sigla: "A30", ingombro: "9125 × 2438", lorda: "22,2 m²", netta: "20,9 m²", altezza: "2591" },
  { sigla: "A40", ingombro: "12192 × 2438", lorda: "29,7 m²", netta: "28,0 m²", altezza: "2591" },
];

export default async function DesignSystemPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col">
      {/* Intestazione */}
      <section className="bg-grafite py-16 pl-8 pr-6 md:py-24 md:pl-20 md:pr-12">
        <p className="type-data mb-3 text-calce/70">Fase 0 — fondamenta</p>
        <h1 className="type-display text-display-1 max-w-4xl text-calce">Sistema di design</h1>
        <p className="type-body mt-6 text-calce/85">
          Palette, scala tipografica e le due sole proporzioni ammesse. Verifica qui la direzione
          prima che entri nel resto del sito.
        </p>
      </section>

      {/* Palette: bande piene, non swatch in card */}
      <section className="bg-calce pb-4 pt-16 md:pt-20">
        <h2 className="type-display text-display-3 pl-8 text-grafite md:pl-20">Colore</h2>
        <div className="mt-8 flex flex-col">
          {SWATCHES.map((s) => (
            <div
              key={s.token}
              className="flex flex-col justify-center gap-1 py-10 pl-8 pr-6 md:flex-row md:items-baseline md:justify-start md:gap-10 md:py-12 md:pl-20 md:pr-12"
              style={{ background: PALETTE[s.token], color: PALETTE[s.fg] }}
            >
              <span className="type-display text-display-3 md:w-64">{s.token}</span>
              <span className="type-data md:w-32">{PALETTE[s.token]}</span>
              <span className="type-body opacity-90">{s.use}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Tipografia */}
      <section className="bg-zinco py-16 pl-8 pr-6 md:py-24 md:pl-20 md:pr-12">
        <h2 className="type-display text-display-3 text-grafite">Tipografia</h2>
        <p className="type-body mt-4 text-grafite/80">
          Una sola famiglia, Archivo variabile, self-hosted. L&apos;asse di larghezza distingue i
          ruoli, non un secondo font.
        </p>

        <div className="mt-14 flex flex-col gap-12">
          <div>
            <p className="type-data mb-3 text-genziana">display-1 · wdth 122 · wght 700</p>
            <p className="type-display text-display-1 text-grafite">Domeinox parte dall&apos;acciaio.</p>
          </div>
          <div>
            <p className="type-data mb-3 text-genziana">display-2</p>
            <p className="type-display text-display-2 text-grafite">Il montaggio.</p>
          </div>
          <div>
            <p className="type-data mb-3 text-genziana">display-3</p>
            <p className="type-display text-display-3 text-grafite">Le due classi.</p>
          </div>
          <div className="max-w-2xl">
            <p className="type-data mb-3 text-genziana">body · wdth 100 · wght 400 · riga max 68ch</p>
            <p className="type-body text-body-lg text-grafite">
              Domeinox sh.p.k., carpenteria in acciaio in Albania, produce internamente dalla
              lamiera al modulo finito e arredato. Gli altri assemblano moduli comprati.
            </p>
          </div>
          <div className="max-w-xl">
            <p className="type-data mb-3 text-genziana">data · tabular-nums, mai monospace</p>
            <table className="type-data w-full text-grafite">
              <thead>
                <tr className="border-b border-grafite/25 text-left">
                  <th className="py-2 pr-6 font-normal">Sigla</th>
                  <th className="py-2 pr-6 font-normal">Ingombro (mm)</th>
                  <th className="py-2 pr-6 font-normal">Lorda</th>
                  <th className="py-2 pr-6 font-normal">Netta</th>
                  <th className="py-2 font-normal">Altezza</th>
                </tr>
              </thead>
              <tbody>
                {FORMATI.map((f) => (
                  <tr key={f.sigla} className="border-b border-grafite/10">
                    <td className="py-2 pr-6">{f.sigla}</td>
                    <td className="py-2 pr-6">{f.ingombro}</td>
                    <td className="py-2 pr-6">{f.lorda}</td>
                    <td className="py-2 pr-6">{f.netta}</td>
                    <td className="py-2">{f.altezza}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Le due proporzioni ammesse */}
      <section className="bg-calce py-16 pl-8 pr-6 md:py-24 md:pl-20 md:pr-12">
        <h2 className="type-display text-display-3 text-grafite">Proporzioni</h2>
        <p className="type-body mt-4 max-w-xl text-grafite/80">
          Le uniche due ammesse per immagini e blocchi di contenuto in tutto il sito. Nessun altro
          rapporto.
        </p>
        <div className="mt-12 flex flex-col gap-10 md:flex-row md:items-start">
          <div className="w-full md:w-[46%]">
            <div
              className="aspect-fronte w-full bg-pav outline outline-1 -outline-offset-1 outline-grafite/20"
              aria-hidden="true"
            />
            <p className="type-data mt-3 text-grafite">
              fronte · 2438 × 2591 mm · {RATIOS.fronte.toFixed(2).replace(".", ",")} : 1
            </p>
          </div>
          <div className="w-full md:flex-1">
            <div
              className="aspect-fianco w-full bg-pav outline outline-1 -outline-offset-1 outline-grafite/20"
              aria-hidden="true"
            />
            <p className="type-data mt-3 text-grafite">
              fianco · 6058 × 2591 mm · {RATIOS.fianco.toFixed(2).replace(".", ",")} : 1
            </p>
          </div>
        </div>
      </section>

      {/* Movimento */}
      <section className="bg-grafite py-16 pl-8 pr-6 md:py-24 md:pl-20 md:pr-12">
        <h2 className="type-display text-display-3 text-calce">Movimento</h2>
        <p className="type-body mt-4 max-w-xl text-calce/85">
          Due soli momenti orchestrati in tutto il sito: il montaggio 3D nella home e le quote che
          si disegnano sopra i render dei prodotti. Tutto il resto è fermo o risponde a
          un&apos;azione. <code className="type-data text-genziana">prefers-reduced-motion</code>{" "}
          rispettato ovunque — verificato in Fase 3.
        </p>
      </section>
    </main>
  );
}
