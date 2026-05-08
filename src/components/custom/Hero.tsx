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
    <section className="relative w-full overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="container px-4 md:px-6 relative z-10 mx-auto grid gap-12 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-28">
        <div className="text-center lg:text-left">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-secondary">
            Bangladesh B2B Industrial Gateway
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Henan Taiguo Boiler Products
          </h1>
          <p className="max-w-[700px] text-lg md:text-xl text-primary-foreground/80 mb-8 mx-auto lg:mx-0">
            {getSubheading()}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold px-8"
              onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Product Photos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" })}
            >
              Calculate Savings
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-6 rounded-[2rem] bg-secondary/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-primary-foreground/15 bg-white/95 p-6 shadow-2xl">
            <img
              src="/images/wns-gas-boiler.png"
              alt="WNS Series oil and gas fired steam boiler"
              className="h-[260px] w-full object-contain md:h-[360px]"
            />
            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-primary">
              <div className="rounded-xl bg-primary/5 p-3">
                <p className="text-xs text-muted-foreground">Efficiency</p>
                <p className="font-bold">≥ 95%</p>
              </div>
              <div className="rounded-xl bg-primary/5 p-3">
                <p className="text-xs text-muted-foreground">Capacity</p>
                <p className="font-bold">1-20 t/h</p>
              </div>
              <div className="rounded-xl bg-primary/5 p-3">
                <p className="text-xs text-muted-foreground">Market</p>
                <p className="font-bold">BD RMG</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
