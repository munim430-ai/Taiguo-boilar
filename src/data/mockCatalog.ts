export interface Product {
  id: string;
  name: string;
  category: "Gas Boiler" | "Biomass Boiler" | "Oil Boiler" | "Electric Boiler" | "Thermal Oil" | "Hot Air" | "Other";
  description: string;
  capacity: string;
  pressure: string;
  fuel: string;
  efficiency: string;
  applications: string[];
  image: string;
  recommendedFor: string;
  buyerNote: string;
  bangladeshFit: string;
}

export const products: Product[] = [
  {
    id: "wns-gas",
    name: "WNS Series Oil/Gas Fired Steam Boiler",
    category: "Gas Boiler",
    description: "Horizontal three-pass fire tube steam boiler for stable steam supply, high thermal efficiency, and low-emission operation.",
    capacity: "1-20 t/h",
    pressure: "0.7-2.0 MPa",
    fuel: "Natural Gas, Light Oil, Diesel",
    efficiency: "≥ 95%",
    applications: ["RMG/Textile", "Food Processing", "Chemical", "General"],
    image: "/images/wns-gas-boiler.png",
    recommendedFor: "Textile dyeing, garments steam lines, food plants, factories converting from diesel to gas.",
    buyerNote: "Best first product for Bangladesh RMG factories where gas access and steam reliability are priorities.",
    bangladeshFit: "High fit for Dhaka, Gazipur, Narayanganj, Chattogram industrial buyers using process steam."
  },
  {
    id: "dzl-biomass",
    name: "DZL Series Biomass Fired Steam Boiler",
    category: "Biomass Boiler",
    description: "Single drum water-fire tube boiler with chain grate stoker for agricultural biomass and local solid fuel use.",
    capacity: "1-20 t/h",
    pressure: "1.0-2.5 MPa",
    fuel: "Wood pellets, Rice husk, Agricultural waste",
    efficiency: "≥ 88%",
    applications: ["Agricultural", "Paper Mill", "Wood Processing", "Food Processing"],
    image: "/images/dzl-biomass.png",
    recommendedFor: "Rice mills, agro-processing factories, wood processing, paper mills, and sites with biomass fuel access.",
    buyerNote: "Strong Bangladesh agriculture option where rice husk or biomass fuel is available locally.",
    bangladeshFit: "High fit for agricultural districts, rice-processing zones, and factories seeking lower fuel dependency."
  },
  {
    id: "szs-gas",
    name: "SZS Series Oil/Gas Fired Steam Boiler",
    category: "Gas Boiler",
    description: "Double drum D-type water tube boiler for large-capacity steam demand and low-NOx industrial operations.",
    capacity: "20-110 t/h",
    pressure: "1.25-5.3 MPa",
    fuel: "Natural Gas, Heavy Oil",
    efficiency: "≥ 98%",
    applications: ["Power Plant", "Large Textile", "Petrochemical", "Industrial Park"],
    image: "/images/szs-gas.png",
    recommendedFor: "Large textile groups, industrial parks, petrochemical users, and high-capacity process steam systems.",
    buyerNote: "Enterprise-grade option for high steam load customers needing stronger engineering support.",
    bangladeshFit: "Good fit for large export-oriented industrial groups and multi-factory steam infrastructure."
  },
  {
    id: "yyw-thermal",
    name: "YY(Q)W Series Gas/Oil Fired Thermal Oil Boiler",
    category: "Thermal Oil",
    description: "Horizontal forced-circulation thermal fluid heater for high-temperature heating at lower working pressure.",
    capacity: "120-12000 kW",
    pressure: "0.8-1.0 MPa",
    fuel: "Natural Gas, Light Oil",
    efficiency: "≥ 95%",
    applications: ["Textile Printing", "Chemical", "Plywood", "Asphalt"],
    image: "/images/yyw-thermal.png",
    recommendedFor: "Textile printing, chemical heating, plywood, asphalt, and high-temperature process heat users.",
    buyerNote: "Useful where factories need thermal oil heating instead of direct steam supply.",
    bangladeshFit: "Good fit for textile printing, chemical, plywood, and temperature-sensitive process factories."
  }
];

export const productCategories = Array.from(new Set(products.map((product) => product.category)));
export const productApplications = Array.from(new Set(products.flatMap((product) => product.applications)));
