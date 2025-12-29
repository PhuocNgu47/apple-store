#!/bin/bash
# Auto setup script for Linux/Mac users

echo "================================================"
echo "  E-Commerce Project - Auto Setup Script"
echo "================================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed"
    echo "📥 Please install Docker from: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✓ Docker found: $(docker --version)"

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed"
    echo "📥 Please install Docker Compose from: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✓ Docker Compose found: $(docker-compose --version)"
echo ""

# Create .env files if not exists
echo "📝 Setting up environment files..."

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✓ Created backend/.env"
fi

if [ ! -f "frontend/.env" ]; then
    cp frontend/.env.example frontend/.env
    echo "✓ Created frontend/.env"
fi

echo ""
echo "🏗️  Building and starting services..."
docker-compose up --build

echo ""
echo "✅ Setup complete!"
echo ""
echo "📱 Frontend:   http://localhost:3000"
echo "🔌 Backend:    http://localhost:5000/api"
echo "🗄️  Database:   mongodb://localhost:27017/ecommerce"
echo ""
echo "💾 To seed sample data, run:"
echo "   docker exec ecommerce-api node seed.js"
echo ""
echo "🛑 To stop: Press Ctrl+C"
