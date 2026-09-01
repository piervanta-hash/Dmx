import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { AssemblyPlaceholderSection } from "@/components/home/AssemblyPlaceholderSection";
import { ProductFamiliesSection } from "@/components/home/ProductFamiliesSection";
import { ClassesSection } from "@/components/home/ClassesSection";
import { ProductionSequenceSection } from "@/components/home/ProductionSequenceSection";
import { WhyEuropeSection } from "@/components/home/WhyEuropeSection";
import { CapacitySection } from "@/components/home/CapacitySection";
import { CtaSection } from "@/components/home/CtaSection";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-col">
      <HeroSection />
      <AssemblyPlaceholderSection />
      <ProductFamiliesSection />
      <ClassesSection />
      <ProductionSequenceSection />
      <WhyEuropeSection />
      <CapacitySection />
      <CtaSection />
    </main>
  );
}
