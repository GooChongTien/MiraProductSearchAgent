import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import reportRouter from './routes/report.js';

// Setup paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Point to the backend root where .env is located (one level up from src)
const envPath = path.join(__dirname, '../.env');

// Load environment variables with override to ensure we get the latest file content
// and ignore any stale shell variables
dotenv.config({ path: envPath, override: true });

// Validate required environment variables
const requiredEnvVars = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  TAVILY_API_KEY: process.env.TAVILY_API_KEY
};

const missingVars = [];
const placeholderVars = [];

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    missingVars.push(key);
  } else if (value.includes('your-') || value.includes('-here') || value === 'sk-proj-x' || value === 'tvly-dev-x') {
    placeholderVars.push(key);
  }
}

if (missingVars.length > 0 || placeholderVars.length > 0) {
  console.error('\n❌ Environment Configuration Error!\n');

  if (missingVars.length > 0) {
    console.error('Missing required environment variables:');
    missingVars.forEach(varName => console.error(`  - ${varName}`));
  }

  if (placeholderVars.length > 0) {
    console.error('\nPlaceholder values detected (please replace with real API keys):');
    placeholderVars.forEach(varName => console.error(`  - ${varName}`));
  }

  console.error('\n📝 Setup Instructions:');
  console.error('1. Copy backend/.env.example to backend/.env');
  console.error('2. Replace placeholder values with your actual API keys:');
  console.error('   - Get OpenAI API key from: https://platform.openai.com/api-keys');
  console.error('   - Get Tavily API key from: https://tavily.com/\n');

  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(express.json());

// CORS configuration
const envOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];
const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:5174'
];
const allowedOrigins = [...new Set([...envOrigins, ...defaultOrigins])];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api', reportRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mira Backend running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    const maskedKey = `${apiKey.substring(0, 3)}...${apiKey.substring(apiKey.length - 4)}`;
    console.log(`🔑 OpenAI API Key: ✅ Loaded (${maskedKey})`);
  } else {
    console.log('🔑 OpenAI API Key: ❌ Missing');
  }
});
