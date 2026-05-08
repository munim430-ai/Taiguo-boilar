"use client";

import { useRegion } from "@/contexts/RegionContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Industry, Region } from "@/contexts/RegionContext";

export function Header() {
  const { region, setRegion, industry, setIndustry } = useRegion();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-900/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex min-h-16 items-center justify-between gap-4 px-4 sm:px-8 mx-auto">
        <a href="#" className="flex items-center gap-3">
          <div className="h-11 w-20 rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-border">
            <img src="/images/tggl-logo.svg" alt="TGGL logo" className="h-full w-full object-contain" />
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-lg text-primary leading-none block">Taiguo Bangladesh Gateway</span>
            <span className="text-xs text-muted-foreground">TGGL industrial boiler sourcing portal</span>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <Select value={region} onValueChange={(val) => setRegion(val as Region)}>
            <SelectTrigger className="w-[138px] h-9">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bangladesh">Bangladesh</SelectItem>
              <SelectItem value="Global">Global HQ</SelectItem>
            </SelectContent>
          </Select>

          <Select value={industry} onValueChange={(val) => setIndustry(val as Industry)}>
            <SelectTrigger className="w-[145px] h-9 hidden md:flex">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RMG/Textile">RMG / Textile</SelectItem>
              <SelectItem value="Agricultural">Agricultural</SelectItem>
              <SelectItem value="General">General Industrial</SelectItem>
            </SelectContent>
          </Select>

          <a href="#rfq" className="hidden lg:inline-flex h-9 items-center rounded-lg bg-secondary px-4 text-sm font-bold text-secondary-foreground shadow-sm hover:bg-secondary/90">
            Send RFQ
          </a>
        </div>
      </div>
    </header>
  );
}
