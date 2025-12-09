import OpenAI from 'openai';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Helper function to validate URLs
async function validateProductUrls(products) {
  console.log(`🕵️ Validating ${products.length} product links...`);

  const validatedProducts = await Promise.all(products.map(async (product) => {
    try {
      if (!product.url) return null;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      try {
        const response = await fetch(product.url, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
          }
        });
        clearTimeout(timeoutId);

        if (response.ok || response.status === 403 || response.status === 401 || response.status === 405) {
          return product;
        } else {
          throw new Error('Status not OK');
        }
      } catch (err) {
        clearTimeout(timeoutId);
        try {
          const urlObj = new URL(product.url);
          const rootUrl = `${urlObj.protocol}//${urlObj.hostname}`;
          return {
            ...product,
            url: rootUrl,
            description: `${product.description} (Note: Exact product page unavailable, linking to insurer homepage.)`
          };
        } catch (e) {
          return null;
        }
      }
    } catch (error) {
      console.error(`❌ Validation error for ${product.product_name}:`, error.message);
      return null;
    }
  }));

  return validatedProducts.filter(p => p !== null);
}

// Helper function for Tavily search
async function performTavilySearch(query) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ No TAVILY_API_KEY found. Skipping web search.');
    return null;
  }

  console.log(`🌐 Searching web for: "${query}"...`);
  try {
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "advanced",
        max_results: 5
      })
    });

    if (!response.ok) {
      throw new Error(`Tavily API error: ${response.status}`);
    }

    const data = await response.json();
    const context = data.results.map(r => `Title: ${r.title}\nURL: ${r.url}\nContent: ${r.content}`).join('\n\n');
    console.log(`✅ Search complete. Found ${data.results.length} results.`);
    return context;
  } catch (error) {
    console.error('❌ Search failed:', error.message);
    return null;
  }
}

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { insurance_type, country } = req.body;

    // Validation
    if (!insurance_type || typeof insurance_type !== 'string') {
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      return res.status(400).json({
        ok: false,
        error: 'Insurance type is required and must be a string'
      });
    }

    if (!country || typeof country !== 'string') {
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      return res.status(400).json({
        ok: false,
        error: 'Country is required and must be a string'
      });
    }

    const trimmedInsuranceType = insurance_type.trim();
    const trimmedCountry = country.trim();

    console.log(`📋 Generating report for: ${trimmedInsuranceType} in ${trimmedCountry}`);

    // Check for API keys
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY is not set');
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      return res.status(500).json({
        ok: false,
        error: 'Server configuration error: Missing API keys'
      });
    }

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Perform web search
    const searchQuery = `${trimmedInsuranceType} insurance ${trimmedCountry} local insurers buy online official site 2024`;
    const searchContext = await performTavilySearch(searchQuery);

    // Generate report with AI
    console.log('🧠 Analyzing search results and generating report...');

    const researchPrompt = `You are an insurance product research assistant. Research and provide information about ${trimmedInsuranceType} insurance products available in ${trimmedCountry}.

${searchContext ? `HERE IS REAL-TIME SEARCH CONTEXT:\n${searchContext}\n\n` : ''}

Please search for real insurance products and provide a comprehensive report with the following structure:

1. For each product found (aim for 3-5 products), include:
   - Product Name
   - Insurer/Company Name (MUST be an insurer operating IN ${trimmedCountry})
   - Key Benefits (3-5 bullet points)
   - Target audience or eligibility
   - Official website or product page link

2. CRITICAL REQUIREMENTS:
   - ONLY include insurers that operate IN ${trimmedCountry}
   - DO NOT include US-based general travel insurers
   - Only include real, verifiable insurance products
   - The URL MUST be from the official insurer's website in ${trimmedCountry}

3. If you cannot find specific products from LOCAL insurers in ${trimmedCountry}, respond with exactly: "NO_RESULTS_FOUND"

Format your response as a JSON array:
[
  {
    "product_name": "...",
    "insurer": "...",
    "description": "...",
    "target_audience": "...",
    "benefits": ["...", "...", "..."],
    "url": "..."
  }
]`;

    const researchResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful insurance research assistant. Always provide accurate, real information about insurance products.'
        },
        {
          role: 'user',
          content: researchPrompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000
    });

    const researchResult = researchResponse.choices[0].message.content.trim();

    if (researchResult === 'NO_RESULTS_FOUND' || researchResult.includes('NO_RESULTS_FOUND')) {
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      return res.status(200).json({
        ok: false,
        error: `Could not find valid ${trimmedInsuranceType} insurance products in ${trimmedCountry}. Please try a different search.`
      });
    }

    // Parse products
    let products;
    try {
      const jsonMatch = researchResult.match(/```json\s*([\s\S]*?)\s*```/) ||
        researchResult.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : researchResult;
      products = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse research results:', parseError);
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      return res.status(500).json({
        ok: false,
        error: 'Failed to process research results. Please try again.'
      });
    }

    // Validate URLs
    const validatedProducts = await validateProductUrls(products);

    if (!Array.isArray(validatedProducts) || validatedProducts.length < 1) {
      Object.entries(corsHeaders).forEach(([key, value]) => {
        res.setHeader(key, value);
      });
      return res.status(200).json({
        ok: false,
        error: 'Insufficient valid products found.'
      });
    }

    console.log(`✅ Report generated successfully with ${validatedProducts.length} verified products`);

    // Set CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(200).json({
      ok: true,
      products: validatedProducts,
      html: '' // Not used in the new UI
    });

  } catch (error) {
    console.error('Report generation error:', error);

    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(500).json({
      ok: false,
      error: error.message || 'Failed to generate report. Please try again later.'
    });
  }
}
