"use client";

import React, { createContext, useContext, useState } from "react";

export type Region = "Bangladesh" | "Global";
export type Industry = "RMG/Textile" | "Agricultural" | "General";

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  industry: Industry;
  setIndustry: (industry: Industry) => void;
  currency: string;
  exchangeRate: number; // Against USD for simple calculations
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const [region, setRegion] = useState<Region>("Bangladesh");
  const [industry, setIndustry] = useState<Industry>("RMG/Textile");

  // Simple hardcoded mapping for MVP
  const currency = region === "Bangladesh" ? "BDT" : "USD";
  const exchangeRate = region === "Bangladesh" ? 110 : 1;

  return (
    <RegionContext.Provider value={{ region, setRegion, industry, setIndustry, currency, exchangeRate }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}
