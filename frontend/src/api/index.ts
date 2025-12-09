import { ReportResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function generateReport(
  insuranceType: string,
  country: string
): Promise<ReportResponse> {
  try {
    const response = await fetch(`${API_URL}/api/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        insurance_type: insuranceType,
        country: country,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        ok: false,
        error: errorData.error || 'Failed to generate report',
      };
    }

    const data: ReportResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return {
      ok: false,
      error: 'Unable to connect to the server. Please try again later.',
    };
  }
}
