import { products } from "@/data/mockCatalog";

export function ProductComparison() {
  return (
    <section id="compare" className="py-16 bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Procurement comparison</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Compare boiler models before submitting RFQ</h2>
          <p className="text-muted-foreground text-lg">A compact decision table for factory owners, engineers, and procurement teams evaluating steam or thermal heating systems.</p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-background shadow-sm">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="px-4 py-4 font-semibold">Model</th>
                <th className="px-4 py-4 font-semibold">Type</th>
                <th className="px-4 py-4 font-semibold">Capacity</th>
                <th className="px-4 py-4 font-semibold">Pressure</th>
                <th className="px-4 py-4 font-semibold">Fuel</th>
                <th className="px-4 py-4 font-semibold">Efficiency</th>
                <th className="px-4 py-4 font-semibold">Bangladesh fit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                  <td className="px-4 py-4 font-semibold text-primary">{product.name}</td>
                  <td className="px-4 py-4">{product.category}</td>
                  <td className="px-4 py-4">{product.capacity}</td>
                  <td className="px-4 py-4">{product.pressure}</td>
                  <td className="px-4 py-4">{product.fuel}</td>
                  <td className="px-4 py-4 font-semibold text-green-700">{product.efficiency}</td>
                  <td className="px-4 py-4 text-muted-foreground">{product.buyerNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
