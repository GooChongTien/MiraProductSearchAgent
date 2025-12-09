import OpenAI from 'openai';
import { validateInputs } from '../utils/validation.js';
import { buildHTMLReport } from '../utils/htmlBuilder.js';

/**
 * Generate insurance product research report
 * @param {Object} params
 * @param {string} params.insurance_type - Type of insurance (e.g., "term life")
 * @param {string} params.country - Country to search in (e.g., "Singapore")
 * @returns {Promise<Object>} Result with ok status and html or error message
 */
// Helper function to validate URLs
async function validateProductUrls(products) {
  console.log(`🕵️ Validating ${products.length} product links...`);

  const validatedProducts = await Promise.all(products.map(async (product) => {
    try {
      // 1. Check if URL is present.
      if (!product.url) return null;

      // 2. Try to fetch the URL (GET request for better compatibility).
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

      try {
        const response = await fetch(product.url, {
          method: 'GET',
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
          }
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          return product; // URL is good.
        } else if (response.status === 403 || response.status === 401 || response.status === 405) {
          // 403/401: Forbidden/Unauthorized usually means "Bot detected" but the Page EXISTS.
          // 405: Method Not Allowed.
          console.warn(`⚠️ Link blocked/protected (${response.status}), assuming valid: ${product.url}`);
          return product;
        } else {
          console.warn(`⚠️ Link dead (${response.status}): ${product.url}`);
          throw new Error('Status not OK');
        }
      } catch (err) {
        clearTimeout(timeoutId);
        // 3. Fallback: Try to find root domain.
        try {
          const urlObj = new URL(product.url);
          const rootUrl = `${urlObj.protocol}//${urlObj.hostname}`;

          console.log(`🔄 Fallback to root: ${rootUrl}`);
          return {
            ...product,
            url: rootUrl,
            description: `${product.description} (Note: Exact product page unavailable, linking to insurer homepage.)`
          };
        } catch (e) {
          return null; // Invalid URL string.
        }
      }
    } catch (error) {
      console.error(`❌ Validation error for ${product.product_name}:`, error.message);
      return null;
    }
  }));

  // Filter out nulls (failed validations).
  return validatedProducts.filter(p => p !== null);
}

// Helper function to perform Tavily Search
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
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "advanced",
        include_domains: [],
        exclude_domains: [],
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

export async function generateReport({ insurance_type, country }) {
  // Initialize OpenAI lazily to ensure environment variables are loaded
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.trim() : undefined
  });

  try {
    // Step 1: Validate inputs using AI
    const validation = await validateInputs(insurance_type, country);

    if (!validation.isValid) {
      return {
        ok: false,
        error: validation.error || 'Insurance type or country was not clearly specified, or no matching products were found.'
      };
    }

    // Step 2: Research (Web Search)
    // Use country-specific query to find LOCAL insurers, not US-based generic ones
    const searchQuery = `${insurance_type} insurance ${country} local insurers buy online official site 2024`;
    const searchContext = await performTavilySearch(searchQuery);

    // Step 3: Analyze & Generate JSON
    console.log('🧠 Analyzing search results and generating report...');

    const researchPrompt = `You are an insurance product research assistant. Research and provide information about ${insurance_type} insurance products available in ${country}.

${searchContext ? `HERE IS REAL-TIME SEARCH CONTEXT (Use this as your primary source):\n${searchContext}\n\n` : ''}

Please search for real insurance products and provide a comprehensive report with the following structure:

1. For each product found (aim for 3-5 products), include:
   - Product Name
   - Insurer/Company Name (MUST be an insurer operating IN ${country})
   - Key Benefits (3-5 bullet points)
   - Target audience or eligibility
   - Official website or product page link (MUST be from the insurer's official domain)

2. CRITICAL REQUIREMENTS:
   - **ONLY include insurers that operate IN ${country}**. For example, for Vietnam: Chubb Vietnam, PVI Insurance, Bao Viet, Manulife Vietnam, Prudential Vietnam, etc.
   - **DO NOT include US-based general travel insurers** like Travel Guard, World Nomads, Allianz Travel, SafeTrip, etc. These are NOT local to ${country}.
   - Only include real, verifiable insurance products. Do NOT make up product names or companies.
   - The URL MUST be from the official insurer's website in ${country} (e.g., chubb.com/vn-en, pvi.com.vn, baoviet.com.vn).
   - Do NOT use URLs from news sites, blogs, comparison sites, or aggregators.
   - If you cannot find the official product page, use the insurer's main website URL.

3. If you cannot find specific products from LOCAL insurers in ${country}, respond with exactly: "NO_RESULTS_FOUND"

Format your response as a JSON array of products:
[
  {
    "product_name": "...",
    "insurer": "...",
    "description": "...",
    "target_audience": "...",
    "benefits": ["...", "...", "..."],
    "url": "..."
  }
]

Important: Only include real, verifiable insurance products. Double-check that URLs are from the official insurer's website.`;

    const researchResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful insurance research assistant. Always provide accurate, real information about insurance products. If you cannot find sufficient products, clearly state so.'
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

    // Check for NO_RESULTS_FOUND (matching reference behavior)
    if (researchResult === 'NO_RESULTS_FOUND' || researchResult.includes('NO_RESULTS_FOUND')) {
      return {
        ok: false,
        error: `Could not find valid ${insurance_type} insurance products in ${country}. Please try a different search.`
      };
    }

    // Parse the products
    let products;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = researchResult.match(/```json\s*([\s\S]*?)\s*```/) ||
        researchResult.match(/\[[\s\S]*\]/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : researchResult;
      products = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse research results:', parseError);
      return {
        ok: false,
        error: 'Failed to process research results. Please try again.'
      };
    }

    // NEW STEP: Validate URLs
    const validatedProducts = await validateProductUrls(products);

    // Validate we have enough products
    if (!Array.isArray(validatedProducts) || validatedProducts.length < 1) {
      return {
        ok: false,
        error: 'Insufficient valid products found. The AI found products but their links could not be verified.'
      };
    }

    // Step 3: Build HTML report (Optional for frontend use-case, but good for "Download")
    const html = buildHTMLReport({
      insurance_type: validation.normalizedInsuranceType || insurance_type,
      country: validation.normalizedCountry || country,
      products: validatedProducts,
      generatedAt: new Date().toISOString()
    });

    console.log(`✅ Report generated successfully with ${validatedProducts.length} verified products`);

    return {
      ok: true,
      html,
      products: validatedProducts // Return raw data for frontend UI
    };

  } catch (error) {
    console.error('Error in generateReport:', error);

    // Handle OpenAI API errors
    if (error.status === 401) {
      console.error('❌ OpenAI Auth Error: Invalid API Key. Please check your .env file.');
      return {
        ok: false,
        error: 'Authentication failed: Invalid OpenAI API Key.'
      };
    }

    if (error.status === 429) {
      console.error('❌ OpenAI Rate Limit: Too many requests or quota exceeded.');
      return {
        ok: false,
        error: 'Service busy or quota exceeded. Please try again later.'
      };
    }

    throw error;
  }
}
