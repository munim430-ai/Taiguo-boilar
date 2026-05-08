"use client";

export function StickyContact() {
  const rfq = () => document.getElementById("rfq")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:flex-row">
      <button
        onClick={rfq}
        className="rounded-full bg-secondary px-5 py-3 text-sm font-bold text-secondary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-secondary/90"
      >
        Send RFQ
      </button>
      <a
        href="mailto:sales@taiguo-boiler.com?subject=Bangladesh%20Boiler%20RFQ"
        className="rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:bg-primary/90"
      >
        Email Factory
      </a>
    </div>
  );
}
