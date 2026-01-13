# 🍎 Apple Store - E-commerce Platform

Website thương mại điện tử bán sản phẩm Apple với đầy đủ tính năng, được xây dựng với kiến trúc feature-based hiện đại.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-18-green) ![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green) ![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## ✨ Tính Năng

### 👤 Khách Hàng
- ✅ Đăng ký / Đăng nhập với JWT
- ✅ Xem danh sách sản phẩm (tìm kiếm, lọc, phân trang)
- ✅ Xem chi tiết sản phẩm với reviews & ratings
- ✅ Quản lý giỏ hàng (thêm, sửa, xóa)
- ✅ Thanh toán (COD / QR chuyển khoản)
- ✅ Xem lịch sử đơn hàng với tracking
- ✅ Quản lý profile và địa chỉ

### 👨‍💼 Admin
- ✅ Dashboard thống kê tổng quan
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý đơn hàng (cập nhật trạng thái)
- ✅ Quản lý người dùng
- ✅ Cảnh báo sản phẩm sắp hết hàng

### 💳 Thanh Toán
- ✅ Thanh toán khi nhận hàng (COD)
- ✅ Chuyển khoản QR (VietQR/SePay)
- ✅ Webhook tự động cập nhật trạng thái

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, TailwindCSS, Zustand, React Router |
| **Backend** | Node.js, Express.js, JWT Authentication |
| **Database** | MongoDB 7.0, Mongoose ODM |
| **Payment** | VietQR, SePay Webhook |
| **DevOps** | Docker, Docker Compose |

## 🏗️ Kiến Trúc Dự Án

Dự án sử dụng **Feature-Based Architecture** để tổ chức code:

```
frontend/src/
├── features/              # Feature modules
│   ├── admin/            # Admin features
│   │   ├── components/   # Admin components
│   │   └── index.js
│   ├── cart/             # Cart features
│   │   ├── components/
│   │   └── index.js
│   ├── orders/           # Order features
│   │   ├── components/
│   │   ├── hooks/
│   │   └── index.js
│   └── user/             # User features
│       ├── components/
│       ├── hooks/
│       └── index.js
├── pages/                 # Page components
├── components/            # Shared components
├── hooks/                 # Shared hooks
├── store/                 # Zustand stores
└── utils/                 # Utility functions
```

**Lợi ích:**
- ✅ Tổ chức code theo tính năng, dễ tìm và maintain
- ✅ Tái sử dụng components và hooks
- ✅ Dễ mở rộng và test
- ✅ Tách biệt logic rõ ràng

## 🚀 Cài Đặt & Chạy

### Yêu Cầu
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (khuyên dùng)
- Hoặc: Node.js 18+, MongoDB 7.0+

### Cách 1: Docker (Khuyên dùng) 🐳

```bash
# Clone repo
git clone <repository-url>
cd ecommerce-project

# Chạy với Docker
docker-compose up --build -d

# Seed dữ liệu mẫu
docker exec ecommerce-api node seed.js
```

**Truy cập:**
- 🌐 Frontend: http://localhost:3000
- 🔌 API: http://localhost:5000/api
- 🗄️ MongoDB: localhost:27017
- 📊 Mongo Express: http://localhost:8081

### Cách 2: Chạy Thủ Công

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev

# Terminal 3 - MongoDB (nếu chưa có)
# Cài đặt MongoDB hoặc dùng MongoDB Atlas
```

## 👥 Tài Khoản Test

Sau khi seed dữ liệu:

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@example.com | admin123 |
| 👤 User | user@example.com | password123 |

## 📁 Cấu Trúc Dự Án

```
ecommerce-project/
├── backend/                 # Express.js API
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Auth, validation
│   ├── services/           # Business logic
│   ├── server.js           # Entry point
│   └── seed.js             # Seed data
│
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── features/       # Feature modules
│   │   ├── pages/          # Page components
│   │   ├── components/     # Shared components
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # Zustand stores
│   │   └── utils/          # Utilities
│   └── package.json
│
├── docker-compose.yml      # Docker config
└── README.md
```

## 🔌 API Endpoints

### Auth
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user

### Products
- `GET /api/products` - Danh sách sản phẩm (có filter, search, pagination)
- `GET /api/products/:id` - Chi tiết sản phẩm
- `POST /api/products/:id/reviews` - Thêm review (cần auth)
- `POST /api/products` - Tạo sản phẩm (Admin)
- `PUT /api/products/:id` - Sửa sản phẩm (Admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (Admin)

### Orders
- `GET /api/orders` - Đơn hàng của user
- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders/:id` - Chi tiết đơn hàng
- `PATCH /api/orders/:id/status` - Cập nhật trạng thái (Admin)

### Statistics (Admin)
- `GET /api/statistics/overview` - Tổng quan
- `GET /api/statistics/revenue` - Doanh thu
- `GET /api/statistics/orders` - Thống kê đơn hàng

## 📚 Tài Liệu

- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Kiến trúc dự án
- [DOCKER_SETUP.md](./DOCKER_SETUP.md) - Hướng dẫn Docker
- [TEST_GUIDE.md](./TEST_GUIDE.md) - Hướng dẫn test
- [HUONG_DAN_SEED_DATA.md](./HUONG_DAN_SEED_DATA.md) - Seed dữ liệu

## 🚀 Deploy Production

### Environment Variables

```env
# Backend
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secret-key
NODE_ENV=production
SEPAY_BANK_ID=MB
SEPAY_ACCOUNT_NO=your-account
SEPAY_ACCOUNT_NAME=YOUR NAME
SEPAY_API_KEY=your-sepay-key

# Frontend
VITE_API_URL=https://your-api.com/api
```

## 📝 License

MIT License - Sử dụng tự do cho mục đích học tập.

## 👨‍💻 Tác Giả

**Nguyen Huu Phuoc**

---

⭐ Nếu thấy hữu ích, hãy star repo này!
