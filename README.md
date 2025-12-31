# 🍎 Apple Store - E-commerce Demo

Website thương mại điện tử bán sản phẩm Apple với đầy đủ tính năng.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-18-green) ![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green) ![Docker](https://img.shields.io/badge/Docker-Ready-blue)

## ✨ Tính năng

### 👤 Khách hàng
- ✅ Đăng ký / Đăng nhập với JWT
- ✅ Xem danh sách sản phẩm theo danh mục
- ✅ Tìm kiếm sản phẩm
- ✅ Xem chi tiết sản phẩm
- ✅ Thêm vào giỏ hàng
- ✅ Thanh toán (COD / QR chuyển khoản)
- ✅ Xem lịch sử đơn hàng

### 👨‍💼 Admin
- ✅ Dashboard thống kê
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý đơn hàng
- ✅ Quản lý người dùng

### 💳 Thanh toán
- ✅ Thanh toán khi nhận hàng (COD)
- ✅ Chuyển khoản QR (VietQR/SePay)
- ✅ Webhook tự động cập nhật trạng thái

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, TailwindCSS, Zustand, Framer Motion |
| Backend | Node.js, Express.js, JWT Authentication |
| Database | MongoDB 7.0, Mongoose ODM |
| Payment | VietQR, SePay Webhook |
| DevOps | Docker, Docker Compose |

## 🚀 Cài đặt & Chạy

### Yêu cầu
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (khuyên dùng)
- Hoặc: Node.js 18+, MongoDB 7.0+

### Cách 1: Docker (Khuyên dùng) 🐳

```bash
# Clone repo
git clone https://github.com/your-username/ecommerce-project.git
cd ecommerce-project

# Chạy với Docker
docker-compose up --build -d

# Seed dữ liệu mẫu
docker exec ecommerce-api node seed.js

# Hoặc seed từ API (nhiều sản phẩm hơn)
docker exec ecommerce-api node seedFromAPI.js
```

**Truy cập:**
- 🌐 Frontend: http://localhost:3000
- 🔌 API: http://localhost:5000
- 🗄️ MongoDB: localhost:27017

### Cách 2: Chạy thủ công

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm install
npm run dev
```

## 👥 Tài khoản test

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@example.com | admin123 |
| 👤 User | user@example.com | password123 |

## 📁 Cấu trúc dự án

```
ecommerce-project/
├── backend/                 # Express.js API
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/             # API endpoints
│   │   ├── auth.js         # Đăng nhập/Đăng ký
│   │   ├── products.js     # CRUD sản phẩm
│   │   ├── orders.js       # Quản lý đơn hàng
│   │   ├── users.js        # Quản lý users
│   │   └── payment.js      # Thanh toán QR
│   ├── middleware/
│   │   └── auth.js         # JWT middleware
│   ├── server.js           # Entry point
│   ├── seed.js             # Seed data cơ bản
│   └── seedFromAPI.js      # Seed từ DummyJSON API
│
├── frontend/               # React + Vite
│   ├── src/
│   │   ├── api/           # Axios config
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── PaymentQR.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminProducts.jsx
│   │   │   ├── AdminUsers.jsx
│   │   │   └── AdminOrders.jsx
│   │   ├── store/         # Zustand state
│   │   └── styles/        # TailwindCSS
│   └── index.html
│
├── docker-compose.yml      # Docker config
└── README.md
```

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký |
| POST | `/api/auth/login` | Đăng nhập |
| GET | `/api/auth/me` | Lấy thông tin user |

### Products
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/products` | Danh sách sản phẩm |
| GET | `/api/products/:id` | Chi tiết sản phẩm |
| POST | `/api/products` | Tạo sản phẩm (Admin) |
| PUT | `/api/products/:id` | Sửa sản phẩm (Admin) |
| DELETE | `/api/products/:id` | Xóa sản phẩm (Admin) |

### Orders
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/orders` | Đơn hàng của user |
| POST | `/api/orders` | Tạo đơn hàng |
| PATCH | `/api/orders/:id/status` | Cập nhật trạng thái (Admin) |

### Payment
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/payment/qr/:orderId` | Lấy QR thanh toán |
| GET | `/api/payment/status/:orderId` | Kiểm tra trạng thái |
| POST | `/api/payment/sepay-webhook` | Webhook từ SePay |
| POST | `/api/payment/simulate/:orderId` | Giả lập thanh toán (Test) |

## 💳 Cấu hình thanh toán SePay

### 1. Đăng ký SePay
Truy cập https://my.sepay.vn và đăng ký tài khoản.

### 2. Cấu hình biến môi trường

Sửa file `docker-compose.yml`:

```yaml
environment:
  SEPAY_BANK_ID: MB              # Mã ngân hàng
  SEPAY_ACCOUNT_NO: "0935771670" # Số tài khoản
  SEPAY_ACCOUNT_NAME: NGUYEN HUU PHUOC
  SEPAY_API_KEY: your-api-key    # Lấy từ SePay
```

### 3. Cấu hình Webhook (Production)

Trong SePay Dashboard, thêm webhook URL:
```
https://your-domain.com/api/payment/sepay-webhook
```

### Danh sách mã ngân hàng phổ biến

| Ngân hàng | Mã |
|-----------|-----|
| MB Bank | `MB` |
| Vietcombank | `VCB` |
| Techcombank | `TCB` |
| ACB | `ACB` |
| BIDV | `BIDV` |
| VPBank | `VPB` |

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

## 👨‍💻 Tác giả

**Nguyen Huu Phuoc**

---

⭐ Nếu thấy hữu ích, hãy star repo này!
