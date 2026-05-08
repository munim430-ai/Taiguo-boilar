export interface Product {
  id: string;
  name: string;
  category: "Gas Boiler" | "Biomass Boiler" | "Oil Boiler" | "Electric Boiler" | "Other";
  description: string;
  capacity: string;
  pressure: string;
  fuel: string;
  efficiency: string;
  applications: string[];
  image: string;
}

export const products: Product[] = [
  {
    id: "wns-gas",
    name: "WNS Series Oil/Gas Fired Steam Boiler",
    category: "Gas Boiler",
    description: "A horizontal three-pass fire tube boiler with high thermal efficiency and low emissions. Ideal for precise temperature control.",
    capacity: "1-20 t/h",
    pressure: "0.7-2.0 MPa",
    fuel: "Natural Gas, Light Oil, Diesel",
    efficiency: "≥ 95%",
    applications: ["RMG/Textile", "Food Processing", "Chemical", "General"],
    image: "/images/wns-gas-boiler.png" // Placeholder
  },
  {
    id: "dzl-biomass",
    name: "DZL Series Biomass Fired Steam Boiler",
    category: "Biomass Boiler",
    description: "A single drum water-fire tube boiler using chain grate stoker. Highly suitable for agricultural waste fuel.",
    capacity: "1-20 t/h",
    pressure: "1.0-2.5 MPa",
    fuel: "Wood pellets, Rice husk, Agricultural waste",
    efficiency: "≥ 88%",
    applications: ["Agricultural", "Paper Mill", "Wood Processing"],
    image: "/images/dzl-biomass.png"
  },
  {
    id: "szs-gas",
    name: "SZS Series Oil/Gas Fired Steam Boiler",
    category: "Gas Boiler",
    description: "A double drum 'D' type water tube boiler, designed for large capacity steam requirements with very low NOx emissions.",
    capacity: "20-110 t/h",
    pressure: "1.25-5.3 MPa",
    fuel: "Natural Gas, Heavy Oil",
    efficiency: "≥ 98%",
    applications: ["Power Plant", "Large Textile", "Petrochemical"],
    image: "/images/szs-gas.png"
  },
  {
    id: "yyw-thermal",
    name: "YY(Q)W Series Gas/Oil Fired Thermal Oil Boiler",
    category: "Other",
    description: "Horizontal forced circulation thermal fluid heater. Provides high-temperature heat under low working pressure.",
    capacity: "120-12000 kW",
    pressure: "0.8-1.0 MPa",
    fuel: "Natural Gas, Light Oil",
    efficiency: "≥ 95%",
    applications: ["Textile Printing", "Chemical", "Plywood"],
    image: "/images/yyw-thermal.png"
  }
];
