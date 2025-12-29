@echo off
REM Quick Start Script for E-Commerce Application (Windows)

echo 🚀 Starting E-Commerce Application...
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker first.
    exit /b 1
)

echo ✓ Docker found
echo.

REM Build and start containers
echo 📦 Building Docker images and starting containers...
docker-compose up --build

echo.
echo ✅ Application is ready!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔌 Backend API: http://localhost:5000/api
echo 🗄️  MongoDB: mongodb://localhost:27017/ecommerce
echo.
echo 💡 To seed sample data, run in another terminal:
echo    docker exec ecommerce-api node seed.js
echo.
echo Press Ctrl+C to stop the application
pause
