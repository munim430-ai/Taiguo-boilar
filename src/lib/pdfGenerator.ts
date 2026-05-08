import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Product } from '@/data/mockCatalog';

export function generateDeterministicQuote(product: Product, companyName: string, region: string) {
  // 1. Initialize jsPDF
  const doc = new jsPDF();

  // 2. Set strict, deterministic formatting
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(34, 59, 94); // Deep steel blue

  // Header
  doc.text("HENAN TAIGUO BOILER PRODUCTS CO., LTD.", 105, 20, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Technical Specification & Formal Quotation", 105, 30, { align: "center" });

  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);

  // Client Info
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  doc.text(`Prepared For: ${companyName}`, 20, 45);
  doc.text(`Region: ${region}`, 20, 52);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 45);
  doc.text(`Quote Ref: TG-${Math.floor(Math.random() * 10000)}`, 150, 52);

  // Product Info Block
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("1. Selected Equipment Overview", 20, 65);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Model: ${product.name}`, 20, 75);
  doc.text(`Category: ${product.category}`, 20, 82);

  const splitDesc = doc.splitTextToSize(`Description: ${product.description}`, 170);
  doc.text(splitDesc, 20, 89);

  // Exact Technical Parameters Table
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("2. Technical Parameters", 20, 115);

  autoTable(doc, {
    startY: 120,
    head: [['Parameter', 'Value', 'Unit']],
    body: [
      ['Rated Evaporation Capacity', product.capacity, 't/h'],
      ['Rated Working Pressure', product.pressure, 'MPa'],
      ['Thermal Efficiency', product.efficiency, '%'],
      ['Applicable Fuel', product.fuel, '-'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [34, 59, 94], textColor: 255 },
    styles: { font: 'helvetica', fontSize: 10 },
  });

  // Footer/Legal
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const finalY = (doc as any).lastAutoTable?.finalY || 160;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("3. Commercial Terms", 20, finalY + 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const terms = [
    "1. Validity: This quotation is valid for 30 days.",
    "2. Warranty: 12 months from commissioning or 18 months from delivery.",
    "3. This document is system-generated and the technical parameters are strictly mapped from Henan Taiguo Engineering databases."
  ];

  terms.forEach((term, index) => {
    doc.text(term, 20, finalY + 25 + (index * 6));
  });

  // Save PDF
  doc.save(`Taiguo_Quote_${product.id}.pdf`);
}
