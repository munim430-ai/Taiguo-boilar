import { Header } from "@/components/custom/Header";
import { Hero } from "@/components/custom/Hero";
import { ProductShowcase } from "@/components/custom/ProductShowcase";
import { TrustSection } from "@/components/custom/TrustSection";
import { IndustryUseCases } from "@/components/custom/IndustryUseCases";
import { ProductComparison } from "@/components/custom/ProductComparison";
import { ROICalculator } from "@/components/custom/ROICalculator";
import { QuoteGenerator } from "@/components/custom/QuoteGenerator";
import { RFQForm } from "@/components/custom/RFQForm";
import { StickyContact } from "@/components/custom/StickyContact";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <TrustSection />
        <IndustryUseCases />
        <ProductShowcase />
        <ProductComparison />

        <section id="tools" className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Buyer tools</p>
            <h2 className="text-3xl font-bold text-primary mb-4">Calculate, document, and prepare a qualified RFQ</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compare savings, download deterministic product spec sheets, and prepare a structured request for Bangladesh industrial buyers without paid AI services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ROICalculator />
          </div>

          <QuoteGenerator />
        </section>

        <RFQForm />
      </main>
      <footer className="bg-primary text-primary-foreground/70 py-10 text-center text-sm border-t border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <p className="font-semibold text-primary-foreground">Henan Taiguo Boiler Products · Bangladesh Digital Sourcing Gateway</p>
          <p className="mt-2">Built for Bangladesh RMG, agriculture, food processing, chemical, and industrial steam buyers.</p>
        </div>
      </footer>
      <StickyContact />
    </div>
  );
}
