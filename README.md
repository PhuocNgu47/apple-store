# 🍎 Apple Store - E-commerce Platform

Website thương mại điện tử bán sản phẩm Apple với đầy đủ tính năng, được xây dựng với kiến trúc feature-based hiện đại.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-18-green) ![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green) ![Docker](https://img.shields.io/badge/Docker-Ready-blue) ![Express](https://img.shields.io/badge/Express-4.18-lightgrey) ![Vite](https://img.shields.io/badge/Vite-5.0-purple)

**Repository:** [https://github.com/PhuocNgu47/apple-store](https://github.com/PhuocNgu47/apple-store)

## ✨ Tính Năng

### 👤 Khách Hàng
- ✅ Đăng ký / Đăng nhập với JWT Authentication
- ✅ Xem danh sách sản phẩm (tìm kiếm, lọc theo category/price/rating, phân trang)
- ✅ Xem chi tiết sản phẩm với reviews & ratings
- ✅ So sánh sản phẩm
- ✅ Quản lý giỏ hàng (thêm, sửa, xóa, cập nhật số lượng)
- ✅ Áp dụng mã giảm giá (Coupons)
- ✅ Thanh toán (COD / QR chuyển khoản VietQR/SePay)
- ✅ Xem lịch sử đơn hàng với tracking chi tiết
- ✅ Quản lý profile và địa chỉ giao hàng

### 👨‍💼 Admin
- ✅ Dashboard thống kê tổng quan (doanh thu, đơn hàng, sản phẩm, người dùng)
- ✅ Quản lý sản phẩm (CRUD đầy đủ với upload hình ảnh)
- ✅ Quản lý đơn hàng (xem chi tiết, cập nhật trạng thái)
- ✅ Quản lý người dùng
- ✅ Quản lý mã giảm giá (Coupons)
- ✅ Cảnh báo sản phẩm sắp hết hàng
- ✅ Biểu đồ thống kê doanh thu và đơn hàng

### 💳 Thanh Toán
- ✅ Thanh toán khi nhận hàng (COD)
- ✅ Chuyển khoản QR (VietQR/SePay)
- ✅ Webhook tự động cập nhật trạng thái

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, TailwindCSS, Zustand, React Router, React Hook Form, Zod |
| **UI Libraries** | Framer Motion, React Icons, Chart.js, Swiper, React Hot Toast |
| **Backend** | Node.js 18+, Express.js 4.18, JWT Authentication, bcryptjs |
| **Database** | MongoDB 7.0, Mongoose 8.0 ODM |
| **Payment** | VietQR, SePay Webhook API |
| **DevOps** | Docker, Docker Compose, Railway (Deployment) |
| **Other** | Nodemailer (Email), Axios (HTTP Client) |

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
# Clone repository
git clone https://github.com/PhuocNgu47/apple-store.git
cd apple-store/ecommerce-project

# Chạy với Docker Compose
docker-compose up --build -d

# Seed dữ liệu mẫu (chờ vài giây để containers khởi động)
docker exec ecommerce-api node seed.js
```

**Truy cập:**
- 🌐 Frontend: http://localhost:3000
- 🔌 API: http://localhost:5000/api
- 🗄️ MongoDB: localhost:27017
- 📊 Mongo Express: http://localhost:8081

### Cách 2: Chạy Thủ Công

#### Bước 1: Setup MongoDB
- Cài đặt MongoDB local hoặc sử dụng [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (khuyên dùng)

#### Bước 2: Backend Setup
```bash
cd backend
npm install

# Tạo file .env
cp .env.example .env
# Chỉnh sửa .env với thông tin MongoDB của bạn

# Chạy backend
npm run dev
```

#### Bước 3: Frontend Setup
```bash
# Terminal mới
cd frontend
npm install

# Tạo file .env
cp env.example .env
# Đảm bảo VITE_API_URL=http://localhost:5000/api

# Chạy frontend
npm run dev
```

#### Bước 4: Seed Dữ Liệu
```bash
cd backend
npm run seed
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
├── backend/                    # Express.js API Server
│   ├── config/                  # Database configuration
│   ├── models/                  # Mongoose schemas (User, Product, Order, Coupon, Address)
│   ├── routes/                  # API endpoints
│   │   ├── auth.js              # Authentication routes
│   │   ├── products.js          # Product CRUD routes
│   │   ├── orders.js            # Order management routes
│   │   ├── users.js             # User management routes
│   │   ├── payment.js           # Payment processing routes
│   │   ├── statistics.js        # Admin statistics routes
│   │   ├── addresses.js          # Address management routes
│   │   └── coupons.js           # Coupon management routes
│   ├── middleware/              # Express middleware
│   │   ├── auth.js              # JWT authentication middleware
│   │   └── rateLimiter.js       # Rate limiting middleware
│   ├── services/                # Business logic services
│   │   └── emailService.js      # Email sending service
│   ├── utils/                   # Utility functions
│   │   └── logger.js            # Logging utility
│   ├── uploads/                 # Uploaded images storage
│   ├── server.js                # Express app entry point
│   ├── seed.js                  # Database seeding script
│   ├── Dockerfile               # Docker image config
│   └── package.json
│
├── frontend/                    # React + Vite Frontend
│   ├── src/
│   │   ├── features/            # Feature-based modules
│   │   │   ├── admin/           # Admin dashboard features
│   │   │   ├── cart/           # Shopping cart features
│   │   │   ├── orders/         # Order management features
│   │   │   └── user/           # User profile features
│   │   ├── pages/               # Page components
│   │   ├── components/          # Shared/reusable components
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # Zustand state management
│   │   ├── api/                 # API client configuration
│   │   ├── config/              # App configuration
│   │   ├── schemas/             # Zod validation schemas
│   │   ├── services/            # Frontend services
│   │   ├── utils/               # Utility functions
│   │   └── styles/              # Global styles & theme
│   ├── Dockerfile               # Docker image config
│   └── package.json
│
├── docker-compose.yml           # Docker Compose configuration
├── QUICK_START.md               # Quick start guide
└── README.md                    # Project documentation
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user hiện tại (cần auth)

### Products (`/api/products`)
- `GET /api/products` - Danh sách sản phẩm (query: `?category=iPhone&minPrice=10000000&maxPrice=50000000&minRating=4&sort=rating&page=1&limit=12`)
- `GET /api/products/:id` - Chi tiết sản phẩm
- `POST /api/products/:id/reviews` - Thêm review cho sản phẩm (cần auth)
- `POST /api/products` - Tạo sản phẩm mới (Admin only)
- `PUT /api/products/:id` - Cập nhật sản phẩm (Admin only)
- `DELETE /api/products/:id` - Xóa sản phẩm (Admin only)

### Orders (`/api/orders`)
- `GET /api/orders` - Danh sách đơn hàng của user (cần auth)
- `POST /api/orders` - Tạo đơn hàng mới (cần auth)
- `GET /api/orders/:id` - Chi tiết đơn hàng (cần auth)
- `PATCH /api/orders/:id/status` - Cập nhật trạng thái đơn hàng (Admin only)

### Users (`/api/users`)
- `GET /api/users` - Danh sách tất cả users (Admin only)
- `GET /api/users/:id` - Chi tiết user (Admin only)
- `PUT /api/users/:id` - Cập nhật thông tin user (Admin only)

### Addresses (`/api/addresses`)
- `GET /api/addresses` - Lấy danh sách địa chỉ của user (cần auth)
- `POST /api/addresses` - Thêm địa chỉ mới (cần auth)
- `PUT /api/addresses/:id` - Cập nhật địa chỉ (cần auth)
- `DELETE /api/addresses/:id` - Xóa địa chỉ (cần auth)

### Coupons (`/api/coupons`)
- `GET /api/coupons` - Danh sách coupons (Admin only)
- `POST /api/coupons` - Tạo coupon mới (Admin only)
- `POST /api/coupons/validate` - Validate coupon code (cần auth)
- `PUT /api/coupons/:id` - Cập nhật coupon (Admin only)
- `DELETE /api/coupons/:id` - Xóa coupon (Admin only)

### Payment (`/api/payment`)
- `POST /api/payment/create-qr` - Tạo QR code thanh toán (cần auth)
- `POST /api/payment/webhook` - Webhook nhận thông báo thanh toán từ SePay

### Statistics (`/api/statistics`) - Admin only
- `GET /api/statistics/overview` - Tổng quan thống kê
- `GET /api/statistics/revenue` - Thống kê doanh thu
- `GET /api/statistics/orders` - Thống kê đơn hàng

## 📚 Tài Liệu

- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh
- [📖 Tài liệu chi tiết](../docs/) - Xem thư mục `docs/` để biết thêm các hướng dẫn chi tiết

## 🚀 Deploy Production

Dự án hỗ trợ deploy trên **Railway** hoặc các platform tương tự.

### Environment Variables

#### Backend (.env)
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRE=7d

# Server
PORT=5000
NODE_ENV=production

# SePay Payment
SEPAY_BANK_ID=MB
SEPAY_ACCOUNT_NO=your-account-number
SEPAY_ACCOUNT_NAME=YOUR NAME
SEPAY_API_KEY=your-sepay-api-key

# Email (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=https://your-frontend-domain.com
```

#### Frontend (.env)
```env
VITE_API_URL=https://your-api-domain.com/api
VITE_NODE_ENV=production
```

### Railway Deployment

1. **Backend Deployment:**
   - Connect GitHub repository
   - Select `backend` folder as root
   - Add environment variables
   - Deploy

2. **Frontend Deployment:**
   - Connect GitHub repository
   - Select `frontend` folder as root
   - Add `VITE_API_URL` environment variable
   - Deploy

3. **MongoDB:**
   - Sử dụng MongoDB Atlas (khuyên dùng) hoặc Railway MongoDB service

## 📝 License

MIT License - Sử dụng tự do cho mục đích học tập và nghiên cứu.

## 👨‍💻 Tác Giả

**Nguyen Huu Phuoc**

- GitHub: [@PhuocNgu47](https://github.com/PhuocNgu47)
- Repository: [apple-store](https://github.com/PhuocNgu47/apple-store)

---

## 🙏 Lời Cảm Ơn

Cảm ơn bạn đã quan tâm đến dự án này! Nếu thấy hữu ích, hãy ⭐ star repo này để ủng hộ!

## 📞 Liên Hệ & Đóng Góp

Mọi đóng góp và phản hồi đều được chào đón! Vui lòng tạo [Issue](https://github.com/PhuocNgu47/apple-store/issues) hoặc [Pull Request](https://github.com/PhuocNgu47/apple-store/pulls).
