"use client";

import { useMemo, useState } from "react";
import { products, productApplications, productCategories } from "@/data/mockCatalog";
import { Button } from "@/components/ui/button";

export function ProductShowcase() {
  const [category, setCategory] = useState("All");
  const [application, setApplication] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const applicationMatch = application === "All" || product.applications.includes(application);
      return categoryMatch && applicationMatch;
    });
  }, [category, application]);

  return (
    <section id="catalog" className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
              Machinery Gallery
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Boiler photos, specifications, and buyer-fit guidance
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Filter the catalog by fuel system and Bangladesh use-case before generating a deterministic engineering spec sheet.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:w-[520px]">
            <label className="text-sm font-medium text-primary">
              Boiler type
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="All">All boiler types</option>
                {productCategories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-primary">
              Application
              <select
                value={application}
                onChange={(event) => setApplication(event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="All">All applications</option>
                {productApplications.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/3] bg-white">
                <img
                  src={product.image}
                  alt={`${product.name} industrial boiler`}
                  className="h-full w-full object-contain p-4"
                />
              </div>

              <div className="p-5">
                <div className="mb-3 inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
                  {product.category}
                </div>
                <h3 className="text-lg font-bold text-primary leading-snug mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {product.description}
                </p>

                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground">Capacity</dt>
                    <dd className="font-semibold text-foreground">{product.capacity}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Pressure</dt>
                    <dd className="font-semibold text-foreground">{product.pressure}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Fuel</dt>
                    <dd className="font-semibold text-foreground">{product.fuel}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground">Efficiency</dt>
                    <dd className="font-semibold text-foreground">{product.efficiency}</dd>
                  </div>
                </dl>

                <div className="mt-4 rounded-xl bg-primary/5 p-3 text-xs leading-5 text-primary">
                  <strong>Bangladesh fit:</strong> {product.bangladeshFit}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.applications.map((item) => (
                    <span key={item} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-background p-8 text-center text-muted-foreground">
            No catalog item matches this filter. Adjust boiler type or application.
          </div>
        )}

        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-secondary/20 bg-secondary/10 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-primary">Need factory quotation support for Bangladesh?</p>
            <p className="text-sm text-muted-foreground">Use the RFQ form below to prepare buyer requirements before contacting Taiguo or a local partner.</p>
          </div>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => document.getElementById("rfq")?.scrollIntoView({ behavior: "smooth" })}>
            Start RFQ
          </Button>
        </div>
      </div>
    </section>
  );
}
