import { products } from "@/data/mockCatalog";

export function ProductShowcase() {
  return (
    <section id="catalog" className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">
            Machinery Gallery
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Taiguo boiler product photos and core specifications
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Visual catalog for local buyers to compare boiler type, fuel source, pressure range, capacity, and target applications before requesting a formal specification sheet.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
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

                <div className="mt-4 flex flex-wrap gap-2">
                  {product.applications.map((application) => (
                    <span
                      key={application}
                      className="rounded-full bg-primary/5 px-2.5 py-1 text-xs text-primary"
                    >
                      {application}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
