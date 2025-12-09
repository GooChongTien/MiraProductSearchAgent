@echo off
title Mira - Backend Server

cd backend

echo ===============================================
echo Starting Mira Backend Server
echo ===============================================
echo.

REM Check if .env exists
if not exist ".env" (
    echo [ERROR] .env file not found in backend folder!
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

echo Starting backend on http://localhost:3001
echo Keep this window open!
echo.
echo Press Ctrl+C to stop the server
echo ===============================================
echo.

npm run dev
