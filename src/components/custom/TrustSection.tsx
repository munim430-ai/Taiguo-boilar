const trustItems = [
  {
    title: "Market bridge",
    value: "China → Bangladesh",
    description: "Positioned for a Chinese boiler manufacturer seeking structured entry into Bangladesh's industrial steam market.",
  },
  {
    title: "Buyer workflow",
    value: "RFQ-ready",
    description: "Captures fuel, capacity, industry, and location before quotation so the factory receives useful buyer context.",
  },
  {
    title: "Technical discipline",
    value: "Spec-first",
    description: "Product pages focus on capacity, pressure, fuel, efficiency, and application instead of generic marketing language.",
  },
  {
    title: "No AI risk",
    value: "Deterministic",
    description: "Spec PDFs map exact catalog values only. No AI is used to invent, alter, or translate technical parameters.",
  },
];

const credibilityItems = [
  "Factory certificate area: ISO / ASME / CE / Grade A license",
  "Factory inspection, FAT, and shipment documentation workflow",
  "Bangladesh buyer qualification before forwarding RFQ to China",
  "RMG, dyeing, food processing, agriculture, and industrial park use-cases",
  "Local currency ROI view for Bangladesh factory owners",
  "Downloadable engineering spec sheets for procurement review",
];

export function TrustSection() {
  return (
    <section id="partner" className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-secondary mb-3">
              Bangladesh market-entry gateway
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Built to show Taiguo as a serious industrial partner for Bangladesh.
            </h2>
            <p className="text-primary-foreground/75 text-lg leading-8">
              The portal is designed for Chinese factory leadership, Bangladeshi industrial buyers, and local procurement teams. It presents product fit, buyer intent, quotation readiness, and technical documentation in one workflow.
            </p>

            <div className="mt-8 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5">
              <p className="font-semibold text-secondary mb-3">Partner message</p>
              <p className="text-primary-foreground/80 leading-7">
                中国制造能力 + 孟加拉本地市场执行。A credible digital bridge for Bangladesh factories to compare Taiguo boilers, prepare RFQs, and move from inquiry to qualified quotation.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustItems.map((item) => (
              <div key={item.title} className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5">
                <p className="text-sm text-primary-foreground/60">{item.title}</p>
                <p className="mt-2 text-2xl font-bold text-secondary">{item.value}</p>
                <p className="mt-3 text-sm leading-6 text-primary-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary mb-4">Credibility modules for factory presentation</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {credibilityItems.map((item) => (
              <div key={item} className="rounded-xl bg-primary-foreground/10 px-4 py-3 text-sm text-primary-foreground/85">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-primary-foreground/55">
            Confirmed certificates and factory photos should replace placeholder verification labels before a public sales launch.
          </p>
        </div>
      </div>
    </section>
  );
}
