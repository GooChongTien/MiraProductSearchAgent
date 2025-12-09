# Mira - Insurance Product Research

A simple, guided web application for researching insurance products across different countries.

## Project Structure

```
MiraProductSearchAgent/
├── frontend/          # React + Vite + TypeScript + Tailwind CSS
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/           # Node.js + Express + OpenAI API
│   ├── src/
│   └── package.json
└── README.md
```

## Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- State machine pattern for flow control

### Backend
- Node.js 18+
- Express.js
- OpenAI API (GPT-4)
- CORS enabled for local development

## Prerequisites

- Node.js 18 or higher
- npm or yarn
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- Tavily API key ([Get one here](https://tavily.com/))

## Setup Instructions

> **⚠️ SECURITY WARNING**: Never commit `.env` files to version control. They contain sensitive API keys and should remain local to your machine.

### 1. Clone the Repository

```bash
git clone https://github.com/GooChongTien/MiraProductSearchAgent.git
cd MiraProductSearchAgent
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Create your `.env` file from the example template:**

```bash
# Copy the example file
cp .env.example .env

# Or on Windows:
copy .env.example .env
```

**Edit `backend/.env` and add your API keys:**

```env
# Get your OpenAI API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-your-actual-openai-key-here

# Get your Tavily API key from: https://tavily.com/
TAVILY_API_KEY=tvly-your-actual-tavily-key-here

# Optional: CORS settings (defaults are fine for local development)
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173,http://localhost:5174

# Optional: Port configuration
PORT=3001
NODE_ENV=development
```

> **Note**: The backend will not start if you use placeholder values. You must replace them with real API keys.

**Start the backend server:**

```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

**Create your `.env` file from the example template:**

```bash
# Copy the example file
cp .env.example .env

# Or on Windows:
copy .env.example .env
```

**Edit `frontend/.env` (usually the default is fine):**

```env
VITE_API_URL=http://localhost:3001
```

**Start the frontend development server:**

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Quick Start (Windows)

For convenience, you can use the provided batch scripts:

```bash
# First time setup - installs dependencies
setup.bat

# Start backend (run in one terminal)
start-backend.bat

# Start frontend (run in another terminal)
start-frontend.bat
```

> **Remember**: You still need to create and configure your `.env` files before running these scripts!

## User Flow

1. **Landing Screen**: Welcome message with "Start" button
2. **Question 1**: "What type of insurance are you looking for?"
3. **Question 2**: "Which country do you want Mira to search in?"
4. **Thinking Stage**: Processing with loading indicator
5. **Report Screen**: Display results with product details
   - OR **Error Screen**: If validation fails or no products found

## Features

- ✅ Fully responsive design (desktop, tablet, mobile)
- ✅ One question at a time (no chat bubbles)
- ✅ Validation for insurance type and country
- ✅ AI-powered product research via OpenAI
- ✅ Self-contained HTML report generation
- ✅ Download report as HTML file
- ✅ Share functionality (native share or clipboard)
- ✅ Start over capability

## API Endpoints

### POST /api/generate-report

**Request Body:**
```json
{
  "insurance_type": "term life",
  "country": "Singapore"
}
```

**Success Response:**
```json
{
  "ok": true,
  "html": "<!DOCTYPE html>..."
}
```

**Error Response:**
```json
{
  "ok": false,
  "error": "Insurance type or country was not clearly specified"
}
```

## Development

### Frontend Development
```bash
cd frontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev        # Start development server with hot reload
npm start          # Start production server
```

## Production Deployment

### Frontend
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update `VITE_API_URL` to point to your production backend

### Backend
1. Set environment variables on your hosting service
2. Deploy the backend application
3. Ensure CORS is configured for your frontend domain

## Security Best Practices

### Environment Variables
- ✅ **DO**: Keep `.env` files local and never commit them to version control
- ✅ **DO**: Use `.env.example` files as templates (with placeholder values)
- ✅ **DO**: Add `.env` to your `.gitignore` file (already configured in this project)
- ❌ **DON'T**: Commit real API keys to GitHub, even in private repositories
- ❌ **DON'T**: Share your `.env` files via Slack, email, or other channels

### If You Accidentally Expose API Keys

If you accidentally commit API keys to git:

1. **Immediately revoke the exposed keys:**
   - OpenAI: https://platform.openai.com/api-keys
   - Tavily: https://tavily.com/

2. **Generate new API keys** from the same platforms

3. **Remove the keys from git history** (if already committed):
   ```bash
   # Remove the file from git history
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch backend/.env" \
     --prune-empty --tag-name-filter cat -- --all

   # Force push (WARNING: This rewrites history)
   git push origin --force --all
   ```

4. **Update your local `.env` files** with the new keys

### Verifying Before Push

Always verify your files before pushing to GitHub:

```bash
# Check what files will be committed
git status

# Verify .env files are not tracked
git ls-files | grep ".env"

# This should return empty (no .env files)
```

## License

Proprietary - All rights reserved
