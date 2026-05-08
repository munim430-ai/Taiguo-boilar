"use client";

import { useRegion } from "@/contexts/RegionContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Industry, Region } from "@/contexts/RegionContext";

const navItems = [
  { label: "Partner", href: "#partner" },
  { label: "Industries", href: "#industries" },
  { label: "Catalog", href: "#catalog" },
  { label: "Compare", href: "#compare" },
  { label: "RFQ", href: "#rfq" },
];

export function Header() {
  const { region, setRegion, industry, setIndustry } = useRegion();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex min-h-16 items-center justify-between gap-4 px-4 sm:px-8 mx-auto">
        <a href="#" className="flex items-center gap-3">
          <div className="h-9 w-9 bg-primary rounded-md flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-black text-xl leading-none">T</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-lg text-primary leading-none block">Taiguo Bangladesh Gateway</span>
            <span className="text-xs text-muted-foreground">Industrial boiler sourcing portal</span>
          </div>
        </a>

        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-muted-foreground">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-primary transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

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
