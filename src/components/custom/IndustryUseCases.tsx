const useCases = [
  {
    sector: "RMG & Textile",
    headline: "Stable steam for dyeing, washing, ironing, and finishing lines.",
    details: "Bangladesh garments factories need predictable steam output, lower fuel waste, and fast quotation cycles. WNS and SZS models are positioned for textile users depending on plant scale.",
    fit: "WNS for SME/mid factories · SZS for large groups",
  },
  {
    sector: "Agriculture & Rice Processing",
    headline: "Biomass steam options for rice husk and agricultural residue.",
    details: "Agro-processing buyers often have access to local biomass fuels. DZL biomass boilers can be presented as a fuel-diversification option for rice mills and rural processing sites.",
    fit: "DZL biomass boiler",
  },
  {
    sector: "Food & Beverage",
    headline: "Clean process steam for boiling, sterilization, drying, and packaging.",
    details: "Factories can compare gas and biomass routes based on fuel availability, process temperature, and steam demand before requesting a technical quotation.",
    fit: "WNS gas or DZL biomass",
  },
  {
    sector: "Chemical, Plywood & Thermal Process",
    headline: "Thermal oil heating for high-temperature, low-pressure applications.",
    details: "YY(Q)W thermal oil systems are positioned for production lines where thermal fluid heating is more suitable than steam generation.",
    fit: "YY(Q)W thermal oil boiler",
  },
];

export function IndustryUseCases() {
  return (
    <section id="industries" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Bangladesh MVP industries</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Localized use-cases for Bangladesh factory owners</h2>
          <p className="text-muted-foreground text-lg">The portal speaks to real procurement situations in Bangladesh: steam reliability, fuel cost, factory location, and industry-specific boiler fit.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {useCases.map((item) => (
            <article key={item.sector} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-4 inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">{item.sector}</div>
              <h3 className="text-xl font-bold text-primary mb-3">{item.headline}</h3>
              <p className="text-muted-foreground leading-7 mb-5">{item.details}</p>
              <div className="rounded-xl bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">Recommended fit: {item.fit}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
