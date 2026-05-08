"use client";

import { useState } from "react";
import { Hero } from "@/components/custom/Hero";
import { TrustSection } from "@/components/custom/TrustSection";
import { IndustryUseCases } from "@/components/custom/IndustryUseCases";
import { ProductShowcase } from "@/components/custom/ProductShowcase";
import { ProductComparison } from "@/components/custom/ProductComparison";
import { ROICalculator } from "@/components/custom/ROICalculator";
import { QuoteGenerator } from "@/components/custom/QuoteGenerator";
import { RFQForm } from "@/components/custom/RFQForm";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "products", label: "Products" },
  { id: "compare", label: "Compare" },
  { id: "tools", label: "Buyer Tools" },
  { id: "partner", label: "Partner Trust" },
] as const;

type TabId = typeof tabs[number]["id"];

export function TabbedPortal() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <main className="flex-1">
      <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex gap-2 overflow-x-auto px-4 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                activeTab === tab.id
                  ? "bg-secondary text-secondary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          <Hero />
          <IndustryUseCases />
        </>
      )}

      {activeTab === "products" && <ProductShowcase />}

      {activeTab === "compare" && <ProductComparison />}

      {activeTab === "tools" && (
        <>
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
        </>
      )}

      {activeTab === "partner" && <TrustSection />}
    </main>
  );
}
