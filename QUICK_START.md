# 🚀 Quick Start Guide

Hướng dẫn nhanh để chạy dự án và test các tính năng.

## 📋 Cách 1: Docker (Khuyên dùng)

```bash
cd ecommerce-project
docker-compose up --build -d
```

**Sau khi chạy:**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:5000/api
- 🗄️ MongoDB: mongodb://localhost:27017/ecommerce
- 📊 Mongo Express: http://localhost:8081

## 📋 Cách 2: Chạy Thủ Công

### Bước 1: Cài đặt MongoDB
- **Windows:** Tải từ https://www.mongodb.com/try/download/community
- **Linux:** `sudo apt-get install mongodb && sudo systemctl start mongodb`
- **Hoặc dùng MongoDB Atlas (cloud)**

### Bước 2: Backend
```bash
cd ecommerce-project/backend
npm install

# Tạo file .env
echo MONGODB_URI=mongodb://localhost:27017/ecommerce > .env
echo JWT_SECRET=tmdt_secret_key_123456 >> .env
echo JWT_EXPIRE=7d >> .env
echo NODE_ENV=development >> .env
echo PORT=5000 >> .env

# Chạy backend
npm run dev
```

### Bước 3: Frontend
```bash
# Terminal mới
cd ecommerce-project/frontend
npm install

# Tạo file .env
echo VITE_API_URL=http://localhost:5000/api > .env

# Chạy frontend
npm run dev
```

## 🌱 Seed Dữ Liệu

### Với Docker:
```bash
# Seed dữ liệu cơ bản (khuyên dùng)
docker exec ecommerce-api node seed.js

# Hoặc seed từ API (nhiều sản phẩm hơn)
docker exec ecommerce-api node seedFromAPI.js
```

### Chạy thủ công:
```bash
cd ecommerce-project/backend
npm run seed
# hoặc
npm run seed:api
```

## 👤 Tài Khoản Test

Sau khi seed, đăng nhập với:

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@example.com | admin123 |
| 👤 User | user@example.com | password123 |

## 🧪 Test Các Tính Năng

### 1. ✅ Product Reviews & Ratings
1. Đăng nhập với user account
2. Vào trang sản phẩm bất kỳ
3. Click tab **"Reviews"**
4. Click **"+ Viết đánh giá"**
5. Chọn số sao và viết comment
6. Submit và xem review hiển thị

### 2. ✅ Search & Filter
1. Vào trang sản phẩm
2. Thử các filter: Category, Price Range, Rating, In Stock
3. Thử sắp xếp: Price, Rating, Name, Newest

### 3. ✅ Order Status Tracking
1. Đăng nhập với user account
2. Thêm sản phẩm vào giỏ hàng và đặt hàng
3. Đăng nhập với **admin account**
4. Vào **Admin Dashboard** → **Quản Lý Đơn Hàng**
5. Cập nhật status: pending → confirmed → shipped → delivered

### 4. ✅ Admin Dashboard Statistics
1. Đăng nhập với **admin account**
2. Vào **Admin Dashboard**
3. Kiểm tra các thống kê: products, users, orders, revenue

## 🔍 Kiểm Tra API

### Health Check:
```bash
curl http://localhost:5000/api/health
```

### Get Products với Filter:
```bash
curl "http://localhost:5000/api/products?category=iPhone&minPrice=10000000&maxPrice=50000000&minRating=4&sort=rating"
```

## 🐛 Troubleshooting

### Lỗi: MongoDB connection failed
```bash
# Kiểm tra MongoDB đang chạy
# Windows: net start MongoDB
# Linux: sudo systemctl status mongodb
```

### Lỗi: Port already in use
```bash
# Thay đổi port trong .env hoặc docker-compose.yml
PORT=5001  # Backend
PORT=3001  # Frontend
```

### Lỗi: Module not found
```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: CORS error
- Kiểm tra `VITE_API_URL` trong frontend/.env
- Đảm bảo backend cho phép CORS

## ✅ Checklist Test

- [ ] Backend chạy thành công (port 5000)
- [ ] Frontend chạy thành công (port 3000)
- [ ] MongoDB kết nối được
- [ ] Seed data thành công
- [ ] Đăng nhập được với admin/user
- [ ] Xem được danh sách sản phẩm
- [ ] Thêm review cho sản phẩm
- [ ] Filter và search sản phẩm
- [ ] Tạo đơn hàng
- [ ] Admin cập nhật order status
- [ ] Xem statistics trong dashboard

## 📚 Tài Liệu Thêm

Xem thư mục `../docs/` để biết thêm các hướng dẫn chi tiết:
- [DOCKER_SETUP.md](../docs/DOCKER_SETUP.md) - Chi tiết về Docker
- [TEST_GUIDE.md](../docs/TEST_GUIDE.md) - Hướng dẫn test đầy đủ
- [ARCHITECTURE.md](../docs/ARCHITECTURE.md) - Kiến trúc dự án
- [INDEX.md](../docs/INDEX.md) - Danh sách đầy đủ tất cả tài liệu

**Chúc bạn test thành công! 🚀**
