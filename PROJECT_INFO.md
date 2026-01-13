# 📊 Tổng Hợp Thông Tin Dự Án

Tài liệu tổng hợp tất cả thông tin quan trọng về dự án E-commerce.

## 🎯 Tổng Quan Dự Án

**Tên dự án:** Hệ Thống Thương Mại Điện Tử Bán Sản Phẩm Apple

**Mô tả:** Website e-commerce bán sản phẩm Apple với đầy đủ tính năng quản lý sản phẩm, đơn hàng, thanh toán và dashboard admin.

**Tech Stack:**
- **Frontend:** React 18, Vite, TailwindCSS, Zustand, React Router
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB 7.0, Mongoose ODM
- **Payment:** VietQR, SePay Webhook
- **DevOps:** Docker, Docker Compose

---

## 📁 Cấu Trúc Dự Án

```
ecommerce-project/
├── backend/                 # Express.js API Server
│   ├── config/             # Database, environment config
│   ├── middleware/         # Auth, rate limiter
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Address.js
│   │   └── Coupon.js
│   ├── routes/             # API endpoints
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   ├── users.js
│   │   ├── addresses.js
│   │   ├── coupons.js
│   │   ├── payment.js
│   │   └── statistics.js
│   ├── services/           # Business logic
│   │   └── emailService.js
│   ├── utils/              # Utilities
│   │   └── logger.js
│   ├── examples/           # Example code
│   ├── uploads/            # Uploaded files
│   ├── server.js           # Entry point
│   ├── seed.js             # Seed data script
│   └── package.json
│
├── frontend/               # React Application
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── components/     # Shared components
│   │   │   ├── UI/         # UI components
│   │   │   ├── Forms/      # Form components
│   │   │   └── admin/      # Admin components
│   │   ├── features/       # Feature modules
│   │   │   ├── admin/      # Admin features
│   │   │   ├── cart/       # Cart features
│   │   │   ├── orders/     # Order features
│   │   │   └── user/       # User features
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom hooks
│   │   ├── store/          # Zustand stores
│   │   ├── utils/          # Utilities
│   │   ├── config/         # Configuration
│   │   ├── layouts/        # Layout components
│   │   └── styles/         # Global styles
│   └── package.json
│
├── docker-compose.yml      # Docker configuration
├── README.md               # Main documentation
└── [Các file hướng dẫn khác]
```

---

## 🗄️ Database Schema

### Collections

#### 1. Users
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  address: String,
  city: String,
  country: String,
  role: Enum ['user', 'admin'],
  createdAt: Date
}
```

#### 2. Products
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String,
  stock: Number,
  image: String,
  images: [String],
  rating: Number,
  reviews: [{
    user: ObjectId (ref: User),
    rating: Number,
    comment: String,
    createdAt: Date
  }],
  seller: ObjectId (ref: User),
  createdAt: Date
}
```

#### 3. Orders
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  orderNumber: String (unique),
  items: [{
    productId: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: Enum ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
  paymentStatus: Enum ['pending', 'completed', 'failed'],
  paymentMethod: Enum ['cod', 'qr'],
  shippingAddress: Object,
  statusHistory: [{
    status: String,
    updatedAt: Date,
    updatedBy: ObjectId (ref: User),
    note: String
  }],
  createdAt: Date
}
```

#### 4. Addresses
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  name: String,
  phone: String,
  address: String,
  city: String,
  country: String,
  isDefault: Boolean,
  label: String,
  createdAt: Date
}
```

#### 5. Coupons
```javascript
{
  _id: ObjectId,
  code: String (unique, uppercase),
  name: String,
  discountType: Enum ['percentage', 'fixed'],
  discountValue: Number,
  minPurchaseAmount: Number,
  maxDiscountAmount: Number,
  usageLimit: Number,
  usedCount: Number,
  validFrom: Date,
  validUntil: Date,
  applicableProducts: [ObjectId (ref: Product)],
  applicableCategories: [String],
  isActive: Boolean,
  createdAt: Date
}
```

### Relationships

- **User → Orders** (1:N)
- **User → Addresses** (1:N)
- **Order → Products** (N:M qua items[])
- **Product → Reviews** (1:N embedded)
- **Coupon → Products** (N:M)

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/me` - Lấy thông tin user

### Products
- `GET /api/products` - Danh sách sản phẩm (có filter, search, pagination)
- `GET /api/products/:id` - Chi tiết sản phẩm
- `POST /api/products/:id/reviews` - Thêm review
- `POST /api/products` - Tạo sản phẩm (Admin)
- `PUT /api/products/:id` - Sửa sản phẩm (Admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (Admin)

### Orders
- `GET /api/orders` - Danh sách đơn hàng
- `GET /api/orders/:id` - Chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng
- `PATCH /api/orders/:id/status` - Cập nhật trạng thái (Admin)

### Users
- `GET /api/users/profile` - Lấy profile
- `PUT /api/users/profile` - Cập nhật profile
- `GET /api/users` - Danh sách users (Admin)
- `PUT /api/users/:id/role` - Cập nhật role (Admin)

### Addresses
- `GET /api/addresses` - Danh sách địa chỉ
- `POST /api/addresses` - Tạo địa chỉ
- `PUT /api/addresses/:id` - Cập nhật địa chỉ
- `DELETE /api/addresses/:id` - Xóa địa chỉ

### Coupons
- `POST /api/coupons/validate` - Validate coupon
- `GET /api/coupons` - Danh sách coupons (Admin)
- `POST /api/coupons` - Tạo coupon (Admin)
- `PUT /api/coupons/:id` - Cập nhật coupon (Admin)
- `DELETE /api/coupons/:id` - Xóa coupon (Admin)

### Payment
- `GET /api/payment/qr/:orderId` - Tạo QR code thanh toán
- `POST /api/payment/webhook` - Webhook từ SePay

### Statistics (Admin)
- `GET /api/statistics/overview` - Thống kê tổng quan
- `GET /api/statistics/revenue` - Thống kê doanh thu
- `GET /api/statistics/orders` - Thống kê đơn hàng

Xem chi tiết: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 👥 Tài Khoản Test

Sau khi seed dữ liệu:

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@example.com | admin123 |
| 👤 User | user@example.com | password123 |

---

## 🚀 Cách Chạy Dự Án

### Development

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### Docker

```bash
docker-compose up --build -d
docker exec ecommerce-api node seed.js
```

Xem chi tiết: [INSTALLATION.md](./INSTALLATION.md)

---

## 📦 Dependencies Chính

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables
- `cors` - CORS middleware

### Frontend
- `react` - UI library
- `react-router-dom` - Routing
- `zustand` - State management
- `axios` - HTTP client
- `tailwindcss` - CSS framework
- `vite` - Build tool

---

## 🔐 Security

- **Password Hashing:** bcryptjs
- **Authentication:** JWT tokens
- **Authorization:** Role-based (user/admin)
- **CORS:** Configured
- **Rate Limiting:** Implemented
- **Input Validation:** Server-side validation

---

## 📊 Tính Năng

### User Features
- ✅ Đăng ký/Đăng nhập
- ✅ Xem danh sách sản phẩm (tìm kiếm, lọc, phân trang)
- ✅ Xem chi tiết sản phẩm với reviews
- ✅ Quản lý giỏ hàng
- ✅ Đặt hàng
- ✅ Thanh toán (COD/QR)
- ✅ Xem lịch sử đơn hàng
- ✅ Quản lý profile và địa chỉ

### Admin Features
- ✅ Dashboard thống kê
- ✅ Quản lý sản phẩm (CRUD)
- ✅ Quản lý đơn hàng (cập nhật trạng thái)
- ✅ Quản lý người dùng
- ✅ Quản lý coupons
- ✅ Cảnh báo sản phẩm sắp hết hàng

---

## 📚 Tài Liệu

- [README.md](./README.md) - Tổng quan dự án
- [INSTALLATION.md](./INSTALLATION.md) - Hướng dẫn cài đặt
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Tài liệu API
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Kiến trúc hệ thống
- [REPORT_GUIDE.md](./REPORT_GUIDE.md) - Hướng dẫn viết báo cáo
- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh
- [DOCKER_SETUP.md](./DOCKER_SETUP.md) - Hướng dẫn Docker
- [TEST_GUIDE.md](./TEST_GUIDE.md) - Hướng dẫn test

---

## 🛠️ Development Tools

- **Code Editor:** VS Code
- **Version Control:** Git
- **API Testing:** Postman
- **Database:** MongoDB Compass / Atlas
- **Package Manager:** npm

---

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
SEPAY_BANK_ID=MB
SEPAY_ACCOUNT_NO=...
SEPAY_ACCOUNT_NAME=...
SEPAY_API_KEY=...
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_NODE_ENV=development
```

---

## 🎨 UI/UX Features

- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Modern UI với TailwindCSS
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation
- ✅ Toast notifications
- ✅ Modal dialogs
- ✅ Pagination
- ✅ Search và filter

---

## 🔄 Workflow

### User Flow
1. Đăng ký/Đăng nhập
2. Xem danh sách sản phẩm
3. Xem chi tiết sản phẩm
4. Thêm vào giỏ hàng
5. Đặt hàng
6. Thanh toán
7. Xem lịch sử đơn hàng

### Admin Flow
1. Đăng nhập với tài khoản admin
2. Xem dashboard thống kê
3. Quản lý sản phẩm
4. Quản lý đơn hàng
5. Cập nhật trạng thái đơn hàng

---

## 📈 Performance

- **Frontend:** Vite build tool (fast HMR)
- **Backend:** Express.js (lightweight)
- **Database:** MongoDB indexes
- **Images:** Placeholder URLs (có thể optimize)

---

## 🐛 Known Issues

- Chưa có real-time notifications
- Chưa có email notifications (optional)
- Chưa có image upload (dùng placeholder)
- Chưa có unit tests

---

## 🚧 Future Improvements

- 📧 Email notifications
- 📸 Image upload
- 🔔 Real-time notifications
- 🧪 Unit tests và integration tests
- 📱 Mobile app
- 🌐 Multi-language support
- 🔍 Advanced search
- 📊 More statistics

---

## 👨‍💻 Contributors

- **Nguyen Huu Phuoc** - Developer

---

## 📄 License

MIT License - Sử dụng tự do cho mục đích học tập.

---

**Cập nhật lần cuối:** 2024

