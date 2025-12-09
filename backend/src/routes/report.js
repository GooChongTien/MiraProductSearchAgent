import express from 'express';
import { generateReport } from '../services/reportGenerator.js';

const router = express.Router();

/**
 * POST /api/generate-report
 * Generate an insurance product research report
 * 
 * Request body:
 * {
 *   "insurance_type": "term life",
 *   "country": "Singapore"
 * }
 */
router.post('/generate-report', async (req, res) => {
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

    res.json(result);

  } catch (error) {
    console.error('Report generation error:', error);
    
    res.status(500).json({
      ok: false,
      error: 'Failed to generate report. Please try again later.'
    });
  }
});

export default router;
