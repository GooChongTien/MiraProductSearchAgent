export type AppState =
  | 'intro'
  | 'askType'
  | 'askCountry'
  | 'loading'
  | 'report'
  | 'error';

export interface Product {
  product_name: string;
  insurer: string;
  description: string;
  target_audience?: string;
  benefits: string[];
  coverage: string;
  url: string;
}

export interface AppData {
  insuranceType: string;
  country: string;
  reportHTML: string;
  products: Product[];
  errorMessage: string;
}

export interface ReportResponse {
  ok: boolean;
  html?: string;
  products?: Product[];
  error?: string;
}
