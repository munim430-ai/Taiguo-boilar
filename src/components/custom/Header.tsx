"use client";

import { useRegion } from "@/contexts/RegionContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Industry, Region } from "@/contexts/RegionContext";

export function Header() {
  const { region, setRegion, industry, setIndustry } = useRegion();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8 mx-auto">
        <div className="flex items-center gap-2">
          {/* Mock Logo */}
          <div className="h-8 w-8 bg-primary rounded-sm flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl leading-none">T</span>
          </div>
          <span className="font-bold text-xl text-primary hidden sm:inline-block">
            Taiguo Boiler Gateway
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Select value={region} onValueChange={(val) => setRegion(val as Region)}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bangladesh">Bangladesh (MVP)</SelectItem>
              <SelectItem value="Global">Global HQ</SelectItem>
            </SelectContent>
          </Select>

          <Select value={industry} onValueChange={(val) => setIndustry(val as Industry)}>
            <SelectTrigger className="w-[140px] h-9 hidden sm:flex">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="RMG/Textile">RMG / Textile</SelectItem>
              <SelectItem value="Agricultural">Agricultural</SelectItem>
              <SelectItem value="General">General Industrial</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </header>
  );
}
