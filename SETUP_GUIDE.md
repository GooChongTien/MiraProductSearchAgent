# Mira Setup Guide

## Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed ([Download here](https://nodejs.org/))
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Step 1: Backend Setup

1. Open a terminal and navigate to the backend folder:
```bash
cd C:\Users\Goo Chong Tien\Downloads\MiraProductSearchAgent\backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
copy .env.example .env
```

4. Edit `.env` file and add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-key-here
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173
```

5. Start the backend server:
```bash
npm run dev
```

You should see:
```
🚀 Mira Backend running on http://localhost:3001
📝 Environment: development
🔑 OpenAI API Key: ✅ Configured
```

**Keep this terminal window open!**

### Step 2: Frontend Setup

1. Open a **NEW** terminal window and navigate to the frontend folder:
```bash
cd C:\Users\Goo Chong Tien\Downloads\MiraProductSearchAgent\frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
copy .env.example .env
```

The `.env` file should contain:
```env
VITE_API_URL=http://localhost:3001
```

4. Start the frontend development server:
```bash
npm run dev
```

The app should automatically open in your browser at `http://localhost:5173`

**Keep this terminal window open too!**

### Step 3: Test the Application

1. Click "Start Research"
2. Enter an insurance type (e.g., "term life")
3. Enter a country (e.g., "Singapore")
4. Wait for the report to generate (30-60 seconds)
5. View, download, or share your report!

---

## Troubleshooting

### Backend Issues

**Error: "OpenAI API Key: ❌ Missing"**
- Make sure you created the `.env` file in the `backend` folder
- Check that your API key is correctly copied (starts with `sk-`)
- Ensure there are no extra spaces or quotes around the key

**Error: "Port 3001 already in use"**
- Change the port in `backend/.env` to something else (e.g., `PORT=3002`)
- Update `frontend/.env` to match (e.g., `VITE_API_URL=http://localhost:3002`)

**Error: "npm: command not found"**
- Install Node.js from https://nodejs.org/
- Restart your terminal after installation

### Frontend Issues

**Error: "Failed to fetch" or "Unable to connect to server"**
- Make sure the backend is running (check the first terminal window)
- Verify the `VITE_API_URL` in `frontend/.env` matches the backend port
- Check if there's a firewall blocking the connection

**White screen or nothing happens**
- Open browser DevTools (F12) and check the Console tab for errors
- Try clearing browser cache and refreshing
- Make sure you ran `npm install` in the frontend folder

### General Issues

**Changes not appearing**
- Frontend: Vite has hot reload, just save the file
- Backend: Stop the server (Ctrl+C) and restart with `npm run dev`

**OpenAI API Errors**
- Check your API key is valid and has available credits
- If you get rate limit errors, wait a minute and try again
- Make sure your OpenAI account is in good standing

---

## Project Structure

```
MiraProductSearchAgent/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── report.js          # API endpoint
│   │   ├── services/
│   │   │   └── reportGenerator.js # Main logic
│   │   ├── utils/
│   │   │   ├── validation.js      # Input validation
│   │   │   └── htmlBuilder.js     # Report HTML generation
│   │   └── index.js               # Server entry point
│   ├── .env                       # Environment variables (create this!)
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingScreen.tsx
│   │   │   ├── QuestionScreen.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── ReportScreen.tsx
│   │   │   └── ErrorScreen.tsx
│   │   ├── api/
│   │   │   └── index.ts           # API client
│   │   ├── App.tsx                # Main app logic
│   │   ├── types.ts               # TypeScript types
│   │   ├── main.tsx               # React entry point
│   │   └── index.css              # Global styles
│   ├── .env                       # Environment variables (create this!)
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## Development Tips

### Making Changes

**Backend changes:**
- Files are in `backend/src/`
- Server auto-restarts on file changes (using `--watch` flag)
- Check console for errors and logs

**Frontend changes:**
- Files are in `frontend/src/`
- Browser auto-refreshes on file changes
- Open DevTools (F12) to see console logs

### Customization Ideas

**Change colors:**
- Edit `frontend/tailwind.config.js` - look for the `colors` section

**Add more insurance types:**
- Edit examples in `frontend/src/App.tsx` in the `askType` section

**Modify report styling:**
- Edit `backend/src/utils/htmlBuilder.js` - look for the `<style>` section

**Change AI model:**
- Edit `backend/src/services/reportGenerator.js` and `backend/src/utils/validation.js`
- Change `gpt-4o` to `gpt-4o-mini` for faster/cheaper responses
- Or `gpt-4-turbo` for even better results

---

## Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
```
Output will be in `frontend/dist/` - upload to any static hosting (Vercel, Netlify, etc.)

### Deploy Backend
- Update environment variables on your hosting service
- Set `NODE_ENV=production`
- Update `ALLOWED_ORIGINS` to your frontend domain
- Use a process manager like PM2 for Node.js

---

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Ensure all prerequisites are installed
3. Verify environment variables are correct
4. Check terminal output for specific error messages

Happy researching! 🎉
