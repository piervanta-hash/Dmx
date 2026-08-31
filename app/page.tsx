import { AssemblySection } from '@/components/assembly/AssemblySection';

export default function Home() {
  return (
    <main>
      {/* 1. Apertura — render statico, LCP in meno di un secondo. */}
      <section className="relative flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-white px-6 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assembly-fallback.svg"
          alt="Modulo Domeinox posato in Albania"
          width={800}
          height={500}
          fetchPriority="high"
          className="w-full max-w-2xl"
        />
        <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-[#24272A] sm:text-4xl">
          Moduli in acciaio, prodotti in Albania.
        </h1>
      </section>

      {/* 2. Il montaggio — animazione 3D scroll-driven. */}
      <AssemblySection />

      {/* 3. Cosa produciamo — le famiglie di prodotto. */}
      <section className="flex min-h-[60vh] items-center justify-center bg-white px-6">
        <p className="text-lg text-[#24272A]">Cosa produciamo — le famiglie di prodotto.</p>
      </section>
    </main>
  );
}
