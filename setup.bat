@echo off
REM Retail System Setup Script

echo.
echo ========================================
echo   RetailHub - Full-Stack Setup
echo ========================================
echo.

echo Installing backend dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Backend installation failed!
    exit /b 1
)
cd ..

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend installation failed!
    exit /b 1
)
cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Seed the database:
echo    cd backend
echo    npm run seed
echo.
echo 2. Start the backend (in one terminal):
echo    cd backend
echo    npm run dev
echo.
echo 3. Start the frontend (in another terminal):
echo    cd frontend
echo    npm start
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo Default Admin Credentials:
echo   Email: admin@retail.com
echo   Password: admin123
echo.
pause
