import OpenAI from 'openai';

/**
 * Validate insurance type and country using AI
 * @param {string} insuranceType 
 * @param {string} country 
 * @returns {Promise<Object>} Validation result
 */
export async function validateInputs(insuranceType, country) {
  // Initialize OpenAI lazily to ensure environment variables are loaded
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.trim() : undefined
  });

  try {
    const validationPrompt = `Validate these inputs for insurance product research:

Insurance Type: "${insuranceType}"
Country: "${country}"

Tasks:
1. Determine if the insurance type is valid and recognizable (e.g., term life, whole life, health, travel, motor, personal accident, critical illness, etc.)
2. Determine if the country is a valid country name
3. Normalize both inputs to standard forms

Valid insurance types include (but not limited to):
- Term Life Insurance
- Whole Life Insurance
- Health/Medical Insurance
- Travel Insurance
- Motor/Car Insurance
- Personal Accident Insurance
- Critical Illness Insurance
- Home Insurance
- Disability Insurance

Respond ONLY with a JSON object in this exact format:
{
  "isValid": true/false,
  "normalizedInsuranceType": "standardized insurance type name" or null,
  "normalizedCountry": "standardized country name" or null,
  "error": "explanation if invalid" or null
}

Examples:
- "term life" + "Singapore" → {"isValid": true, "normalizedInsuranceType": "Term Life Insurance", "normalizedCountry": "Singapore", "error": null}
- "blahblah" + "xyz" → {"isValid": false, "normalizedInsuranceType": null, "normalizedCountry": null, "error": "Insurance type and country were not clearly specified"}
- "car" + "Singapore" → {"isValid": true, "normalizedInsuranceType": "Motor Insurance", "normalizedCountry": "Singapore", "error": null}`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a validation assistant. Always respond with valid JSON only, no additional text.'
        },
        {
          role: 'user',
          content: validationPrompt
        }
      ],
      temperature: 0.1,
      max_tokens: 200
    });

    const result = response.choices[0].message.content.trim();

    // Parse JSON response
    try {
      // Remove markdown code blocks if present
      const jsonMatch = result.match(/```json\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : result;
      return JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Failed to parse validation response:', result);
      return {
        isValid: false,
        normalizedInsuranceType: null,
        normalizedCountry: null,
        error: 'Failed to validate inputs. Please try again.'
      };
    }

  } catch (error) {
    console.error('Validation error:', error);
    throw error;
  }
}
