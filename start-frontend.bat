@echo off
title Mira - Frontend Server

cd frontend

echo ===============================================
echo Starting Mira Frontend Server
echo ===============================================
echo.

REM Check if .env exists
if not exist ".env" (
    echo [ERROR] .env file not found in frontend folder!
    echo Please run setup.bat first or create the .env file manually.
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo [ERROR] Dependencies not installed!
    echo Please run: npm install
    echo.
    pause
    exit /b 1
)

echo Starting frontend on http://localhost:5173
echo Keep this window open!
echo.
echo Press Ctrl+C to stop the server
echo ===============================================
echo.

npm run dev
