import { Header } from "@/components/custom/Header";
import { Hero } from "@/components/custom/Hero";
import { ROICalculator } from "@/components/custom/ROICalculator";
import { QuoteGenerator } from "@/components/custom/QuoteGenerator";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Interactive Digital Gateway</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate potential savings, compare boiler options, and generate a quote request without paid AI services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ROICalculator />
          </div>

          <QuoteGenerator />
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground/60 py-8 text-center text-sm border-t border-primary-foreground/10 mt-12">
        <p>© {new Date().getFullYear()} Henan Taiguo Boiler Products Co., Ltd. Localized Digital Gateway.</p>
      </footer>
    </div>
  );
}
