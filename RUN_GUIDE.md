# 🍎 Apple Store - Deployment & Running Guide

## ✅ Completed Customization

Your e-commerce application has been **successfully transformed into an Apple Product Store** with:

### 1. Database & Products (✓ Complete)
- **8 Apple Products** with detailed specs:
  - iPhone 15 Pro Max ($1,199)
  - iPhone 15 Pro ($999)
  - iPhone 15 ($799)
  - iPhone 15 Plus ($899)
  - iPad Pro 12.9" M2 ($1,099)
  - iPad Air 11" M1 ($599)
  - Apple Watch Series 9 ($399)
  - AirPods Pro 2nd Gen ($249)

### 2. Frontend Customization (✓ Complete)
- **Home Page** with:
  - Apple Store hero banner
  - Sticky category navigation (iPhone, iPad, Apple Watch, Accessories)
  - Featured Products section (Pro models)
  - Best Sellers section (4.8+ rating)
  - New Arrivals section
  
- **Navbar** updated with:
  - Apple branding (🍎 Apple Store)
  - Vietnamese language
  - Admin panel indicator
  - Modern styling
  
- **Product Comparison** feature for iPhone models:
  - Compare Pro Max vs Pro vs regular
  - Detailed specifications table
  
- **All pages** translated to Vietnamese:
  - Tiếng Việt hoàn toàn

### 3. Backend Ready (✓ Complete)
- Node.js/Express API with all endpoints
- MongoDB database with Apple products
- Authentication & authorization
- JWT tokens & role-based access control

### 4. Docker Setup (✓ Ready)
- Multi-container orchestration
- MongoDB, Node.js backend, React frontend
- All services configured and working

---

## 🚀 How to Run Locally (Windows/VMware)

### Method 1: Docker (Recommended)

**Requirement**: Docker Desktop installed on Windows/VMware

```bash
cd d:\Learning\Courses\TMDT\ecommerce-project

# Start all services
docker compose up -d

# Check status
docker compose ps

# View logs
docker compose logs -f

# Stop services
docker compose down
```

**Access Points**:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- MongoDB: localhost:27017

### Method 2: Manual (Development)

**Backend**:
```bash
cd backend
npm install
npm start
# Runs on: http://localhost:5000
```

**Frontend**:
```bash
cd frontend
npm install
npm run dev
# Runs on: http://localhost:3000
```

**MongoDB**:
- Make sure MongoDB is running locally or use Atlas

---

## 📝 Test Accounts

### Admin Account:
```
Email: admin@example.com
Password: admin123
```

### Regular User Account:
```
Email: john@example.com
Password: john123
```

---

## 🎯 Features Ready to Demo

### User Features:
✓ Browse products (Home page with filters)
✓ View product details with specs
✓ Compare iPhone models
✓ Add to cart
✓ Checkout process
✓ Order history
✓ User dashboard

### Admin Features:
✓ Manage products (Create, Edit, Delete)
✓ View all products in admin panel
✓ Inventory management

### SEO & Marketing:
✓ Product comparison tool
✓ Featured & best sellers sections
✓ SEO-optimized descriptions
✓ Product specifications displayed
✓ Sale prices with original pricing

---

## 📁 Project Structure

```
ecommerce-project/
├── backend/
│   ├── models/          (User, Product, Order)
│   ├── routes/          (auth, products, orders, users)
│   ├── middleware/      (auth verification)
│   ├── seed.js          (Apple products data)
│   ├── Dockerfile       (Node.js container)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/       (Home, Login, Cart, Checkout, Orders, etc.)
│   │   ├── components/  (Navbar, ProductComparison)
│   │   ├── api/         (API calls - Axios)
│   │   ├── store/       (Zustand state management)
│   │   ├── styles/      (Tailwind CSS)
│   │   └── main.jsx
│   ├── Dockerfile       (React/Serve container)
│   ├── vite.config.js   (Vite bundler config)
│   └── package.json
│
├── docker-compose.yml   (3 services: MongoDB, Backend, Frontend)
└── Documentation/
    ├── README.md
    ├── APPLE_STORE_GUIDE.md
    └── SETUP files
```

---

## 🔧 Environment Variables

### Backend (.env):
```
NODE_ENV=production
MONGODB_URI=mongodb://mongodb:27017/ecommerce
JWT_SECRET=tmdt_secret_key_123456
JWT_EXPIRE=7d
PORT=5000
```

### Frontend (.env):
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### Docker issues:
```bash
# Remove all containers and volumes
docker-compose down -v

# Rebuild from scratch
docker-compose up --build

# Check container logs
docker-compose logs <service-name>
# service-name: mongodb, backend, or frontend
```

### Frontend build errors:
```bash
cd frontend
rm -r node_modules dist
npm install
npm run build
```

### Backend connection issues:
```bash
# Check if MongoDB is accessible
docker-compose exec backend npm start
```

---

## 📊 API Endpoints

### Authentication:
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login
- `POST /api/auth/verify` - Verify token

### Products:
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create (admin only)
- `PUT /api/products/:id` - Update (admin only)
- `DELETE /api/products/:id` - Delete (admin only)

### Orders:
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (admin)

### Users:
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

---

## 🎓 For TMĐT Evaluation

This project demonstrates:
✓ **Full-stack development**: React + Node.js + MongoDB
✓ **Modern tech stack**: Vite, Tailwind, Zustand, Axios
✓ **Real-world focus**: Apple product focus, not generic
✓ **SEO optimization**: Product descriptions, metadata, structure
✓ **Marketing features**: Featured products, comparisons, promotions
✓ **Professional UI**: Modern design, responsive, Vietnamese localization
✓ **Complete CRUD**: Products, orders, user management
✓ **Authentication**: JWT tokens, password hashing, role-based access
✓ **Docker deployment**: Production-ready containerization

---

## 📞 Support

For issues:
1. Check `docker-compose logs`
2. Verify MongoDB is running
3. Check port availability (3000, 5000, 27017)
4. Review files in `/docs` folder for detailed guides

---

**Status**: ✅ Ready for Deployment & Assessment
**Type**: Apple Product Store E-commerce
**Language**: Vietnamese UI + English API
**Deployment**: Docker Compose (Recommended)

