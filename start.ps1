# Quick Start Script for E-Commerce Application (PowerShell)

Write-Host "🚀 Starting E-Commerce Application..." -ForegroundColor Green
Write-Host ""

# Check if Docker is installed
try {
    $dockerVersion = docker --version 2>&1
    Write-Host "✓ Docker found: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not installed. Please install Docker first." -ForegroundColor Red
    Write-Host "Download from: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Check if docker-compose is available
try {
    $composeVersion = docker-compose --version 2>&1
    Write-Host "✓ Docker Compose found: $composeVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  docker-compose not found, trying 'docker compose'..." -ForegroundColor Yellow
    try {
        $composeVersion = docker compose version 2>&1
        Write-Host "✓ Docker Compose (v2) found" -ForegroundColor Green
        $useDockerComposeV2 = $true
    } catch {
        Write-Host "❌ Docker Compose is not installed." -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# Build and start containers
Write-Host "📦 Building Docker images and starting containers..." -ForegroundColor Cyan
Write-Host ""

if ($useDockerComposeV2) {
    docker compose up --build
} else {
    docker-compose up --build
}

Write-Host ""
Write-Host "✅ Application is ready!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "🔌 Backend API: http://localhost:5000/api" -ForegroundColor White
Write-Host "🗄️  MongoDB: mongodb://localhost:27017/ecommerce" -ForegroundColor White
Write-Host ""
Write-Host "💡 To seed sample data, run in another terminal:" -ForegroundColor Yellow
if ($useDockerComposeV2) {
    Write-Host "   docker exec ecommerce-api node seed.js" -ForegroundColor Cyan
} else {
    Write-Host "   docker exec ecommerce-api node seed.js" -ForegroundColor Cyan
}
Write-Host ""
Write-Host "Press Ctrl+C to stop the application" -ForegroundColor Gray

