# Cấu Trúc Dự Án E-Commerce

```
ecommerce-project/
│
├── 📁 frontend/                    # React application
│   ├── 📁 src/
│   │   ├── 📁 pages/              # Pages components
│   │   │   ├── Home.jsx           # Trang chủ - danh sách sản phẩm
│   │   │   ├── Login.jsx          # Trang đăng nhập
│   │   │   ├── Register.jsx       # Trang đăng ký
│   │   │   ├── ProductDetail.jsx  # Chi tiết sản phẩm
│   │   │   ├── Cart.jsx           # Giỏ hàng
│   │   │   ├── Checkout.jsx       # Thanh toán
│   │   │   ├── Orders.jsx         # Quản lý đơn hàng
│   │   │   ├── OrderSuccess.jsx   # Xác nhận đơn hàng
│   │   │   ├── Dashboard.jsx      # Trang cá nhân user
│   │   │   └── AdminProducts.jsx  # Quản lý sản phẩm (Admin)
│   │   │
│   │   ├── 📁 components/         # Reusable components
│   │   │   └── Navbar.jsx         # Navigation bar
│   │   │
│   │   ├── 📁 api/                # API integration
│   │   │   └── index.js           # Axios setup & API functions
│   │   │
│   │   ├── 📁 store/              # State management (Zustand)
│   │   │   └── index.js           # Auth & Cart stores
│   │   │
│   │   ├── 📁 styles/             # Styling
│   │   │   └── index.css          # Global styles + Tailwind
│   │   │
│   │   ├── App.jsx                # Main app component & routing
│   │   └── main.jsx               # Entry point
│   │
│   ├── index.html                 # HTML template
│   ├── package.json               # Dependencies
│   ├── vite.config.js             # Vite configuration
│   ├── tailwind.config.js         # Tailwind CSS config
│   ├── postcss.config.js          # PostCSS config
│   ├── .env                       # Environment variables
│   ├── .env.example               # Example env file
│   ├── .gitignore                 # Git ignore rules
│   ├── .dockerignore              # Docker ignore rules
│   └── Dockerfile                 # Docker image definition
│
├── 📁 backend/                    # Node.js/Express API
│   ├── 📁 models/                 # MongoDB schemas
│   │   ├── User.js                # User model
│   │   ├── Product.js             # Product model
│   │   └── Order.js               # Order model
│   │
│   ├── 📁 routes/                 # API routes
│   │   ├── auth.js                # Authentication routes
│   │   ├── products.js            # Product routes
│   │   ├── orders.js              # Order routes
│   │   └── users.js               # User routes
│   │
│   ├── 📁 middleware/             # Express middleware
│   │   └── auth.js                # JWT authentication
│   │
│   ├── server.js                  # Main server file
│   ├── seed.js                    # Database seeding script
│   ├── package.json               # Dependencies
│   ├── .env                       # Environment variables
│   ├── .env.example               # Example env file
│   ├── .gitignore                 # Git ignore rules
│   ├── .dockerignore              # Docker ignore rules
│   └── Dockerfile                 # Docker image definition
│
├── 📄 docker-compose.yml          # Docker Compose configuration
├── 📄 README.md                   # Project documentation
├── 📄 FEATURES.md                 # Detailed feature documentation
├── 📄 SETUP.md                    # Setup instructions
├── 📄 QUICKSTART-WINDOWS.md       # Quick start for Windows users
├── 📄 start.bat                   # Windows quick start script
├── 📄 start.sh                    # Unix quick start script
├── 📄 .gitignore                  # Root .gitignore
└── 📄 PROJECT_STRUCTURE.md        # This file

```

## 📦 File Descriptions

### Frontend Files

| File | Purpose |
|------|---------|
| `pages/Home.jsx` | Trang chủ hiển thị danh sách sản phẩm với search & filter |
| `pages/Login.jsx` | Form đăng nhập với validation |
| `pages/Register.jsx` | Form đăng ký người dùng mới |
| `pages/ProductDetail.jsx` | Chi tiết sản phẩm với reviews & rating |
| `pages/Cart.jsx` | Giỏ hàng với quantity control |
| `pages/Checkout.jsx` | Multi-step checkout form |
| `pages/Orders.jsx` | Lịch sử đơn hàng của user |
| `pages/Dashboard.jsx` | User profile & settings |
| `pages/AdminProducts.jsx` | Admin panel quản lý sản phẩm |
| `components/Navbar.jsx` | Navigation bar với cart badge |
| `api/index.js` | Axios config & API endpoints |
| `store/index.js` | Zustand stores (Auth & Cart) |

### Backend Files

| File | Purpose |
|------|---------|
| `models/User.js` | User schema với password hashing |
| `models/Product.js` | Product schema với reviews |
| `models/Order.js` | Order schema với items |
| `routes/auth.js` | Register, Login, Verify endpoints |
| `routes/products.js` | Product CRUD & review endpoints |
| `routes/orders.js` | Order management endpoints |
| `routes/users.js` | User profile endpoints |
| `middleware/auth.js` | JWT & Admin authorization |
| `server.js` | Express server setup |
| `seed.js` | Database seeding with test data |

### Configuration Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Define & run 3 services: MongoDB, Backend, Frontend |
| `Dockerfile` (backend) | Build backend Docker image |
| `Dockerfile` (frontend) | Build frontend Docker image |
| `vite.config.js` | Vite build configuration |
| `tailwind.config.js` | Tailwind CSS customization |
| `.env` | Environment variables (local development) |
| `.dockerignore` | Files to exclude from Docker build |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation |
| `FEATURES.md` | Detailed feature list & specifications |
| `SETUP.md` | Setup & installation instructions |
| `QUICKSTART-WINDOWS.md` | Quick start guide for Windows/VMware |

---

## 🔄 Data Flow

### Authentication Flow
```
User Registration
  ↓
Frontend: POST /register
  ↓
Backend: Hash password, Create user, Generate JWT
  ↓
Frontend: Store token in localStorage
  ↓
User Login
```

### Shopping Flow
```
Browse Products (Home)
  ↓
View Details (ProductDetail)
  ↓
Add to Cart (Zustand store + localStorage)
  ↓
View Cart
  ↓
Checkout (Create Order)
  ↓
Payment
  ↓
Order Confirmation
  ↓
View My Orders
```

### Admin Flow
```
Login as Admin
  ↓
Navigate to /admin/products
  ↓
Create/Edit/Delete Products
  ↓
Products appear on Home page
```

---

## 🗄️ Database Collections

### Users
- _id, name, email, password (hashed), phone, address, city, country, role, createdAt

### Products
- _id, name, description, price, originalPrice, category, image, stock, rating, reviews, seller, createdAt

### Orders
- _id, orderNumber, user, items, totalAmount, shippingAddress, paymentMethod, paymentStatus, orderStatus, createdAt, updatedAt

---

## 🚀 Service Architecture

```
┌─────────────────┐
│    Browser      │
│  (Localhost:3000)│
└────────┬────────┘
         │
    HTTP │ (React)
         │
┌────────▼──────────────┐
│  Frontend Container    │
│  (Vite + React)        │
│  Port: 3000            │
└────────┬───────────────┘
         │
    JSON │ over HTTP
         │
┌────────▼──────────────────┐
│  Backend Container         │
│  (Node.js + Express)       │
│  Port: 5000                │
└────────┬───────────────────┘
         │
    TCP │ MongoDB Protocol
         │
┌────────▼──────────────────┐
│  MongoDB Container         │
│  (MongoDB 7.0)             │
│  Port: 27017               │
└────────────────────────────┘
```

---

## 📊 Dependencies Summary

### Frontend (20 packages)
- React 18, React DOM, React Router
- Axios, Zustand, Tailwind, Vite
- Chart.js, React-ChartJS-2

### Backend (10 packages)
- Express, Mongoose, MongoDB
- JWT, bcryptjs, CORS, dotenv

### Total: ~100+ dependencies (with sub-dependencies)

---

## ⚡ Performance Considerations

### Frontend
- Lazy loading components
- LocalStorage for cart persistence
- Zustand for minimal state management overhead
- Tailwind CSS utility classes (minimal CSS)

### Backend
- MongoDB connection pooling
- Request validation middleware
- Error handling
- JWT token caching ready

### DevOps
- Docker multi-stage builds
- Minimal base images (alpine)
- Volume mounting for development
- Network isolation

---

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT authentication & expiration
- CORS enabled
- Protected API routes
- Role-based access control
- Input validation
- Environment variables for secrets

---

## 📈 Scalability

Có thể scale thêm:
- Redis caching layer
- Database replication
- Microservices architecture
- Load balancing
- CDN for static assets
- Message queues for async tasks

---

## 🎯 Next Steps

1. **Development**: Chạy `docker-compose up`
2. **Testing**: Seed data & test các features
3. **Customization**: Thêm tính năng theo yêu cầu
4. **Production**: Build & deploy trên cloud

---

## 📝 Notes

- Tất cả files được organized theo convention rõ ràng
- Dễ dàng thêm features mới
- Clear separation of concerns
- Ready for team collaboration
- Docker setup giúp deployment dễ dàng
