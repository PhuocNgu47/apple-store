#!/bin/bash
# Quick Start Script for E-Commerce Application

echo "🚀 Starting E-Commerce Application..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✓ Docker found"
echo ""

# Build and start containers
echo "📦 Building Docker images and starting containers..."
docker-compose up --build

echo ""
echo "✅ Application is ready!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:5000/api"
echo "🗄️  MongoDB: mongodb://localhost:27017/ecommerce"
echo ""
echo "💡 To seed sample data, run in another terminal:"
echo "   docker exec ecommerce-api node seed.js"
echo ""
echo "Press Ctrl+C to stop the application"
