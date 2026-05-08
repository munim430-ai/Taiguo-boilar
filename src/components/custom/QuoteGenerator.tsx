"use client";

import { useRegion } from "@/contexts/RegionContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateDeterministicQuote } from "@/lib/pdfGenerator";
import { products } from "@/data/mockCatalog";
import { FileText } from "lucide-react";

export function QuoteGenerator() {
  const { region } = useRegion();

  const handleGenerateQuote = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      // In a real app, you might capture the company name via a form
      generateDeterministicQuote(product, "Valued Client", region);
    }
  };

  return (
    <Card className="w-full mt-12 border-border shadow-sm">
      <CardHeader className="bg-muted/50 border-b">
        <CardTitle className="text-2xl text-primary">Deterministic Spec Sheets</CardTitle>
        <CardDescription>
          Generate strictly formatted, non-AI-altered technical documentation directly from engineering databases.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm mb-1">{product.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{product.capacity} | {product.efficiency}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleGenerateQuote(product.id)}
            >
              <FileText className="w-4 h-4" />
              Download Spec PDF
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
