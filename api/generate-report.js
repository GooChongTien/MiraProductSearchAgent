import { generateReport } from '../backend/src/services/reportGenerator.js';

// CORS headers for Vercel
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { insurance_type, country } = req.body;

    // Validation
    if (!insurance_type || typeof insurance_type !== 'string') {
      return res.status(400).json({
        ok: false,
        error: 'Insurance type is required and must be a string'
      });
    }

    if (!country || typeof country !== 'string') {
      return res.status(400).json({
        ok: false,
        error: 'Country is required and must be a string'
      });
    }

    // Trim and validate length
    const trimmedInsuranceType = insurance_type.trim();
    const trimmedCountry = country.trim();

    if (trimmedInsuranceType.length < 2 || trimmedInsuranceType.length > 100) {
      return res.status(400).json({
        ok: false,
        error: 'Insurance type must be between 2 and 100 characters'
      });
    }

    if (trimmedCountry.length < 2 || trimmedCountry.length > 100) {
      return res.status(400).json({
        ok: false,
        error: 'Country must be between 2 and 100 characters'
      });
    }

    console.log(`📋 Generating report for: ${trimmedInsuranceType} in ${trimmedCountry}`);

    // Generate report
    const result = await generateReport({
      insurance_type: trimmedInsuranceType,
      country: trimmedCountry
    });

    // Set CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(200).json(result);

  } catch (error) {
    console.error('Report generation error:', error);

    // Set CORS headers
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.status(500).json({
      ok: false,
      error: 'Failed to generate report. Please try again later.'
    });
  }
}
