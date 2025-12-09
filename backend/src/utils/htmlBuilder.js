/**
 * Build self-contained HTML report
 * @param {Object} params
 * @param {string} params.insurance_type
 * @param {string} params.country
 * @param {Array} params.products
 * @param {string} params.generatedAt
 * @returns {string} Complete HTML document
 */
export function buildHTMLReport({ insurance_type, country, products, generatedAt }) {
  const formattedDate = new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const productsHTML = products.map((product, index) => `
    <div class="product-card">
      <div class="product-header">
        <h2 class="product-number">Product ${index + 1}</h2>
        <h3 class="product-name">${escapeHtml(product.product_name)}</h3>
        <p class="insurer-name">${escapeHtml(product.insurer)}</p>
      </div>
      
      <div class="product-body">
        <div class="section">
          <h4>Description</h4>
          <p>${escapeHtml(product.description)}</p>
        </div>

        <div class="section">
          <h4>Key Benefits</h4>
          <ul class="benefits-list">
            ${product.benefits.map(benefit => `<li>${escapeHtml(benefit)}</li>`).join('\n            ')}
          </ul>
        </div>

        ${product.coverage ? `
        <div class="section">
          <h4>Coverage Highlights</h4>
          <p>${escapeHtml(product.coverage)}</p>
        </div>
        ` : ''}

        <div class="section">
          <a href="${escapeHtml(product.url)}" target="_blank" rel="noopener noreferrer" class="product-link">
            View Official Product Page →
          </a>
        </div>
      </div>
    </div>
  `).join('\n\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Insurance Product Research Report - ${escapeHtml(insurance_type)} in ${escapeHtml(country)}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      min-height: 100vh;
    }

    .container {
      max-width: 900px;
      margin: 0 auto;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px 30px;
      text-align: center;
    }

    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .header .subtitle {
      font-size: 18px;
      opacity: 0.95;
      margin-bottom: 20px;
    }

    .meta-info {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
      margin-top: 20px;
      font-size: 14px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .content {
      padding: 40px 30px;
    }

    .product-card {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 30px;
      border: 2px solid #e9ecef;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .product-header {
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 2px solid #dee2e6;
    }

    .product-number {
      color: #667eea;
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }

    .product-name {
      font-size: 24px;
      font-weight: 700;
      color: #212529;
      margin-bottom: 8px;
    }

    .insurer-name {
      font-size: 16px;
      color: #6c757d;
      font-weight: 500;
    }

    .product-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .section h4 {
      font-size: 16px;
      font-weight: 600;
      color: #495057;
      margin-bottom: 10px;
    }

    .section p {
      color: #495057;
      line-height: 1.7;
    }

    .benefits-list {
      list-style: none;
      padding-left: 0;
    }

    .benefits-list li {
      padding-left: 24px;
      margin-bottom: 8px;
      color: #495057;
      position: relative;
    }

    .benefits-list li:before {
      content: "✓";
      position: absolute;
      left: 0;
      color: #667eea;
      font-weight: bold;
    }

    .product-link {
      display: inline-block;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .product-link:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .disclaimer {
      background: #fff3cd;
      border: 1px solid #ffc107;
      border-radius: 8px;
      padding: 20px;
      margin-top: 30px;
      color: #856404;
    }

    .disclaimer h4 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 10px;
      color: #856404;
    }

    .disclaimer p {
      font-size: 14px;
      line-height: 1.6;
    }

    .footer {
      text-align: center;
      padding: 30px;
      color: #6c757d;
      font-size: 14px;
      border-top: 1px solid #e9ecef;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }

      .container {
        box-shadow: none;
        border-radius: 0;
      }

      .product-card {
        page-break-inside: avoid;
      }
    }

    @media (max-width: 768px) {
      body {
        padding: 10px;
      }

      .header {
        padding: 30px 20px;
      }

      .header h1 {
        font-size: 24px;
      }

      .header .subtitle {
        font-size: 16px;
      }

      .content {
        padding: 30px 20px;
      }

      .product-card {
        padding: 20px;
      }

      .product-name {
        font-size: 20px;
      }

      .meta-info {
        gap: 15px;
        font-size: 13px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Insurance Product Research Report</h1>
      <p class="subtitle">${escapeHtml(insurance_type)} in ${escapeHtml(country)}</p>
      <div class="meta-info">
        <div class="meta-item">
          <span>📋</span>
          <span>${products.length} Products Found</span>
        </div>
        <div class="meta-item">
          <span>📅</span>
          <span>${formattedDate}</span>
        </div>
        <div class="meta-item">
          <span>🌍</span>
          <span>${escapeHtml(country)}</span>
        </div>
      </div>
    </div>

    <div class="content">
      ${productsHTML}

      <div class="disclaimer">
        <h4>⚠️ Important Disclaimer</h4>
        <p>
          This information is gathered from publicly available sources and is provided for research purposes only. 
          Product details, terms, conditions, and availability may change. Always verify all information directly 
          with the insurer before making any decisions. This report does not constitute financial advice.
        </p>
      </div>
    </div>

    <div class="footer">
      <p>Generated by Mira · Insurance Product Research Assistant</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Escape HTML special characters
 * @param {string} text 
 * @returns {string}
 */
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, m => map[m]);
}
