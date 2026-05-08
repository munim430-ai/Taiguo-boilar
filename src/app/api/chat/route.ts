import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { products } from '@/data/mockCatalog';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, region, industry } = await req.json();

  // Create a system prompt injecting the hardcoded catalog and localization info
  const systemPrompt = `
You are an elite B2B technical sales representative for Henan Taiguo Boiler Products.
Your goal is to assist clients by answering questions about thermal efficiency, capacity, dimensions, and suitable boiler choices.

Current Client Context:
- Region: ${region}
- Industry: ${industry}

Product Catalog Context:
${JSON.stringify(products, null, 2)}

Instructions:
1. Only recommend products from the provided catalog context.
2. Provide precise, technical answers using the data (efficiency, pressure, capacity) from the catalog.
3. Be professional, modern, and persuasive. Focus on ROI and efficiency.
4. If the client is from Bangladesh or the RMG/Textile/Agricultural industry, emphasize how the WNS Gas Boiler or DZL Biomass Boiler fits their specific needs.
  `;

  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: systemPrompt,
    messages,
  });

  return result.toAIStreamResponse();
}
