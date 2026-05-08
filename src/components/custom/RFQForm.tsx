"use client";

import { FormEvent, useMemo, useState } from "react";
import { products } from "@/data/mockCatalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CONTACT_EMAIL = "sales@taiguo-boiler.com";

const initialForm = {
  companyName: "",
  contactName: "",
  phone: "",
  email: "",
  location: "",
  industry: "RMG/Textile",
  productId: "wns-gas",
  fuel: "Natural Gas",
  capacity: "",
  currentFuelCost: "",
  timeline: "Within 3 months",
  message: "",
};

export function RFQForm() {
  const [form, setForm] = useState(initialForm);
  const [copied, setCopied] = useState(false);

  const selectedProduct = products.find((product) => product.id === form.productId) || products[0];

  const rfqText = useMemo(() => {
    return [
      "TAIGUO BANGLADESH RFQ",
      `Company: ${form.companyName || "Not provided"}`,
      `Contact: ${form.contactName || "Not provided"}`,
      `Phone/WhatsApp: ${form.phone || "Not provided"}`,
      `Email: ${form.email || "Not provided"}`,
      `Factory location: ${form.location || "Not provided"}`,
      `Industry: ${form.industry}`,
      `Requested product: ${selectedProduct.name}`,
      `Fuel preference: ${form.fuel}`,
      `Required capacity: ${form.capacity || "Not provided"}`,
      `Current fuel cost: ${form.currentFuelCost || "Not provided"}`,
      `Purchase timeline: ${form.timeline}`,
      `Additional notes: ${form.message || "None"}`,
    ].join("\n");
  }, [form, selectedProduct.name]);

  const updateField = (field: keyof typeof initialForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setCopied(false);
  };

  const copyRFQ = async () => {
    await navigator.clipboard.writeText(rfqText);
    setCopied(true);
  };

  const downloadRFQ = () => {
    const blob = new Blob([rfqText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Taiguo_RFQ_${(form.companyName || "Bangladesh_Buyer").replace(/\s+/g, "_")}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const submitEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Bangladesh RFQ - ${form.companyName || selectedProduct.name}`);
    const body = encodeURIComponent(rfqText);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="rfq" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary mb-3">Buyer qualification</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Submit a serious boiler RFQ for Bangladesh</h2>
            <p className="text-muted-foreground text-lg leading-8">
              This form prepares a structured buyer request that can be forwarded to Taiguo sales, a local Bangladesh partner, or your procurement team. It does not use a paid backend or AI service.
            </p>

            <div className="mt-6 rounded-2xl border border-secondary/20 bg-secondary/10 p-5">
              <p className="font-semibold text-primary mb-2">What a Chinese manufacturer wants to see</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Real company and factory location</li>
                <li>• Required steam capacity and pressure range</li>
                <li>• Available fuel source in Bangladesh</li>
                <li>• Industry use-case and purchase timeline</li>
              </ul>
            </div>
          </div>

          <Card className="border-border shadow-sm">
            <CardHeader className="bg-muted/50 border-b">
              <CardTitle className="text-2xl text-primary">RFQ Form</CardTitle>
              <CardDescription>Prepare buyer requirements for quotation review.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={submitEmail} className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="Company name" value={form.companyName} onChange={(event) => updateField("companyName", event.target.value)} />
                  <Input placeholder="Contact person" value={form.contactName} onChange={(event) => updateField("contactName", event.target.value)} />
                  <Input placeholder="Phone / WhatsApp" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
                  <Input placeholder="Email" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
                  <Input placeholder="Factory location in Bangladesh" value={form.location} onChange={(event) => updateField("location", event.target.value)} />
                  <Input placeholder="Required capacity e.g. 6 t/h" value={form.capacity} onChange={(event) => updateField("capacity", event.target.value)} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium text-primary">
                    Industry
                    <select className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm" value={form.industry} onChange={(event) => updateField("industry", event.target.value)}>
                      <option>RMG/Textile</option>
                      <option>Agricultural</option>
                      <option>Food Processing</option>
                      <option>Chemical</option>
                      <option>Industrial Park</option>
                      <option>General</option>
                    </select>
                  </label>

                  <label className="text-sm font-medium text-primary">
                    Product interest
                    <select className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm" value={form.productId} onChange={(event) => updateField("productId", event.target.value)}>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>{product.name}</option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm font-medium text-primary">
                    Fuel preference
                    <select className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm" value={form.fuel} onChange={(event) => updateField("fuel", event.target.value)}>
                      <option>Natural Gas</option>
                      <option>Diesel / Light Oil</option>
                      <option>Heavy Oil</option>
                      <option>Rice Husk</option>
                      <option>Wood Pellets / Biomass</option>
                      <option>Not sure</option>
                    </select>
                  </label>

                  <label className="text-sm font-medium text-primary">
                    Timeline
                    <select className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm" value={form.timeline} onChange={(event) => updateField("timeline", event.target.value)}>
                      <option>Immediately</option>
                      <option>Within 3 months</option>
                      <option>Within 6 months</option>
                      <option>Planning stage</option>
                    </select>
                  </label>
                </div>

                <Input placeholder="Current monthly fuel cost / fuel consumption" value={form.currentFuelCost} onChange={(event) => updateField("currentFuelCost", event.target.value)} />
                <textarea
                  className="min-h-[110px] rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Extra notes: pressure, steam use, existing boiler, factory shift hours, import support needed..."
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                />

                <div className="grid gap-3 sm:grid-cols-3">
                  <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">Open Email</Button>
                  <Button type="button" variant="outline" onClick={copyRFQ}>{copied ? "Copied" : "Copy RFQ"}</Button>
                  <Button type="button" variant="outline" onClick={downloadRFQ}>Download RFQ</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
