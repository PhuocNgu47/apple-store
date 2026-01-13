# Script test Docker containers
# Chạy: .\test-docker.ps1

Write-Host "=== Testing Docker Containers ===" -ForegroundColor Cyan
Write-Host ""

# Test Backend
Write-Host "1. Testing Backend API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/health" -Method Get
    Write-Host "   ✓ Backend is running" -ForegroundColor Green
    Write-Host "   Status: $($response.status)" -ForegroundColor Gray
    Write-Host "   MongoDB: $($response.mongodb)" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ Backend is not accessible" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

Write-Host ""

# Test Products API
Write-Host "2. Testing Products API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method Get
    Write-Host "   ✓ Products API is working" -ForegroundColor Green
    $count = if ($response.products) { $response.products.Count } else { 0 }
    Write-Host "   Products found: $count" -ForegroundColor Gray
} catch {
    Write-Host "   ✗ Products API error" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

Write-Host ""

# Test Frontend
Write-Host "3. Testing Frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✓ Frontend is running" -ForegroundColor Green
        Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Gray
    }
} catch {
    Write-Host "   ✗ Frontend is not accessible" -ForegroundColor Red
    Write-Host "   Error: $_" -ForegroundColor Red
}

Write-Host ""

# Check containers
Write-Host "4. Checking Docker Containers..." -ForegroundColor Yellow
$containers = docker ps --format "{{.Names}}\t{{.Status}}" | Select-String "ecommerce"
if ($containers) {
    Write-Host "   Running containers:" -ForegroundColor Green
    $containers | ForEach-Object {
        Write-Host "   - $_" -ForegroundColor Gray
    }
} else {
    Write-Host "   ✗ No containers found" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== Test Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Access URLs:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:  http://localhost:5000/api" -ForegroundColor White
Write-Host '  Health:   http://localhost:5000/api/health' -ForegroundColor White

