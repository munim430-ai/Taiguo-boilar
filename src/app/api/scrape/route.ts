import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import { products as mockCatalog } from '@/data/mockCatalog';

export async function GET() {
  try {
    const response = await fetch('https://taiguo-boiler.com/', { cache: 'no-store' });
    const html = await response.text();
    const $ = cheerio.load(html);

    // Scrape top-level categories and basic info from the site
    // (This is a generic scraping logic based on typical corporate site structure;
    // it scrapes headers and combines them with our hardcoded catalog)
    const scrapedCategories: string[] = [];
    $('.nav-item, .menu-item, h2, h3').each((_, element) => {
        const text = $(element).text().trim();
        if (text && text.toLowerCase().includes('boiler') && !scrapedCategories.includes(text)) {
            scrapedCategories.push(text);
        }
    });

    const combinedData = {
      scrapedCategories: scrapedCategories.length > 0 ? scrapedCategories : ['Industrial Boilers', 'Gas Boilers', 'Biomass Boilers'],
      catalog: mockCatalog,
      source: 'Henan Taiguo Boiler Products Co., Ltd.',
      scrapedAt: new Date().toISOString()
    };

    return NextResponse.json(combinedData);
  } catch (error) {
    console.error("Error scraping Taiguo Boiler website:", error);
    return NextResponse.json({ error: "Failed to scrape data" }, { status: 500 });
  }
}
