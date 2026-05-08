"use client";

import { useRegion } from "@/contexts/RegionContext";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { region, industry } = useRegion();

  const getSubheading = () => {
    if (region === "Bangladesh" && industry === "RMG/Textile") {
      return "Powering the heart of Bangladesh's RMG sector with high-efficiency WNS Gas Boilers.";
    }
    if (region === "Bangladesh" && industry === "Agricultural") {
      return "Sustainable biomass thermal solutions for Bangladesh's agricultural processing.";
    }
    return "World-class industrial thermal solutions and pressure vessels.";
  };

  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-primary text-primary-foreground">
      {/* Abstract Industrial Background pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="container px-4 md:px-6 relative z-10 mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
          Henan Taiguo Boiler Products
        </h1>
        <p className="max-w-[700px] text-lg md:text-xl text-primary-foreground/80 mb-8">
          {getSubheading()}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8">
            View Product Catalog
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            Speak to AI Sales Rep
          </Button>
        </div>
      </div>
    </section>
  );
}
