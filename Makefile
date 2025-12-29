#!/bin/bash
# Makefile for E-Commerce Project
# Run: make help

.PHONY: help build up down logs shell-api shell-db seed clean reset

help:
	@echo "╔════════════════════════════════════════════════════════════╗"
	@echo "║  E-Commerce Project - Make Commands                        ║"
	@echo "╚════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "Development:"
	@echo "  make up              - Start all services"
	@echo "  make down            - Stop all services"
	@echo "  make build           - Build Docker images"
	@echo "  make logs            - View logs (all services)"
	@echo "  make logs-api        - View backend logs"
	@echo "  make logs-web        - View frontend logs"
	@echo "  make logs-db         - View MongoDB logs"
	@echo ""
	@echo "Database:"
	@echo "  make seed            - Seed sample data"
	@echo "  make reset           - Reset database"
	@echo "  make clean           - Remove containers & volumes"
	@echo ""
	@echo "Utilities:"
	@echo "  make shell-api       - Access backend container shell"
	@echo "  make shell-db        - Access MongoDB container shell"
	@echo "  make ps              - List running containers"
	@echo "  make restart         - Restart all services"
	@echo "  make rebuild         - Rebuild and restart"

up:
	docker-compose up -d
	@echo "✅ Services started"
	@echo ""
	@echo "📱 Frontend:   http://localhost:3000"
	@echo "🔌 Backend:    http://localhost:5000/api"
	@echo "🗄️  MongoDB:    mongodb://localhost:27017"

down:
	docker-compose down
	@echo "✅ Services stopped"

build:
	docker-compose build
	@echo "✅ Images built"

rebuild: clean build up
	@echo "✅ Rebuild complete"

logs:
	docker-compose logs -f

logs-api:
	docker-compose logs -f backend

logs-web:
	docker-compose logs -f frontend

logs-db:
	docker-compose logs -f mongodb

shell-api:
	docker exec -it ecommerce-api bash

shell-db:
	docker exec -it ecommerce-db bash

ps:
	docker-compose ps

restart:
	docker-compose restart
	@echo "✅ Services restarted"

seed:
	docker exec ecommerce-api node seed.js
	@echo "✅ Database seeded with sample data"

reset: down
	docker-compose up -d
	sleep 5
	docker exec ecommerce-api node seed.js
	@echo "✅ Database reset with sample data"

clean: down
	docker system prune -f
	@echo "✅ Cleaned up Docker resources"

status:
	@docker-compose ps
	@echo ""
	@echo "🔗 URLs:"
	@echo "   Frontend:  http://localhost:3000"
	@echo "   Backend:   http://localhost:5000/api"
	@echo "   MongoDB:   mongodb://localhost:27017/ecommerce"

test-api:
	@echo "Testing API health..."
	@curl -s http://localhost:5000/api/health | jq .
	@echo ""
	@echo "Testing product endpoint..."
	@curl -s http://localhost:5000/api/products | jq '.products[0] | {name, price}'

install-deps:
	@echo "Installing backend dependencies..."
	cd backend && npm install
	@echo "Installing frontend dependencies..."
	cd frontend && npm install
	@echo "✅ Dependencies installed"

run-dev:
	@echo "Starting development servers (without Docker)..."
	@echo "Make sure MongoDB is running on localhost:27017"
	@echo ""
	@cd backend && npm run dev &
	@cd frontend && npm run dev

format:
	@echo "Formatting code..."
	@cd frontend && npm run lint
	@echo "✅ Code formatted"
