@echo off
echo ===============================================
echo Mira - Insurance Product Research Setup
echo ===============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js is installed
node --version
echo.

REM Check if we're in the right directory
if not exist "backend" (
    echo [ERROR] backend folder not found!
    echo Please run this script from the MiraProductSearchAgent directory
    echo.
    pause
    exit /b 1
)

if not exist "frontend" (
    echo [ERROR] frontend folder not found!
    echo Please run this script from the MiraProductSearchAgent directory
    echo.
    pause
    exit /b 1
)

echo ===============================================
echo Step 1: Backend Setup
echo ===============================================
cd backend

REM Check if .env exists
if not exist ".env" (
    echo [INFO] Creating .env file from template...
    copy .env.example .env
    echo.
    echo [ACTION REQUIRED] Please edit backend\.env and add your OpenAI API key!
    echo Press any key after you've added your API key...
    pause >nul
)

REM Install backend dependencies
if not exist "node_modules" (
    echo [INFO] Installing backend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo [OK] Backend dependencies already installed
)

echo.
echo ===============================================
echo Step 2: Frontend Setup
echo ===============================================
cd ..\frontend

REM Check if .env exists
if not exist ".env" (
    echo [INFO] Creating .env file from template...
    copy .env.example .env
)

REM Install frontend dependencies
if not exist "node_modules" (
    echo [INFO] Installing frontend dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo [OK] Frontend dependencies already installed
)

cd ..

echo.
echo ===============================================
echo Setup Complete!
echo ===============================================
echo.
echo Next steps:
echo 1. Make sure you've added your OpenAI API key to backend\.env
echo 2. Open TWO terminal windows:
echo.
echo    Terminal 1 - Backend:
echo    cd backend
echo    npm run dev
echo.
echo    Terminal 2 - Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open http://localhost:5173 in your browser
echo.
echo See SETUP_GUIDE.md for detailed instructions
echo ===============================================
pause
