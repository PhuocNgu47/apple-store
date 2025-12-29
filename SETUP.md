# Hướng dẫn Setup và Chạy E-Commerce Application

## 📋 Yêu cầu hệ thống

- Docker & Docker Compose (đã cài sẵn trên VMware)
- hoặc: Node.js 18+, MongoDB 7.0+
- RAM: Tối thiểu 2GB
- Disk: Tối thiểu 5GB

## 🚀 Chạy với Docker (Cách dễ nhất)

### Bước 1: Chuẩn bị dự án

```bash
# Navigate to project directory
cd ecommerce-project

# Kiểm tra Docker đã cài
docker --version
docker-compose --version
```

### Bước 2: Build và chạy

```bash
# Build images và start containers
docker-compose up --build

# Lần chạy sau, chỉ cần:
docker-compose up
```

### Bước 3: Truy cập ứng dụng

```
Frontend:        http://localhost:3000
Backend API:     http://localhost:5000/api
MongoDB:         mongodb://localhost:27017/ecommerce
API Health:      http://localhost:5000/api/health
```

### Bước 4: Seed dữ liệu mẫu (tuỳ chọn)

```bash
# Truy cập container backend
docker exec -it ecommerce-api bash

# Chạy seed script
node seed.js

# Exit
exit
```

### Các lệnh Docker hữu ích

```bash
# Xem logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop services
docker-compose down

# Stop và xóa volumes
docker-compose down -v

# Rebuild services
docker-compose up --build --force-recreate
```

## 💻 Chạy Local Development (không Docker)

### Backend Setup

```bash
cd backend

# Cài dependencies
npm install

# Tạo .env file
cp .env.example .env

# Chỉnh sửa MONGODB_URI trong .env nếu cần
# Mặc định: mongodb://localhost:27017/ecommerce

# Chạy server
npm run dev

# Seed data (nếu cần)
node seed.js
```

Backend sẽ chạy trên: `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Cài dependencies
npm install

# Tạo .env file
cp .env.example .env

# Chạy dev server
npm run dev
```

Frontend sẽ chạy trên: `http://localhost:3000`

## 🧪 Kiểm tra API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Đăng ký tài khoản
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Đăng nhập
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Lấy danh sách sản phẩm
```bash
curl http://localhost:5000/api/products
```

### Lấy sản phẩm với tìm kiếm
```bash
curl "http://localhost:5000/api/products?search=iPhone&category=Electronics&page=1&limit=10"
```

## 🔧 Troubleshooting

### Port đã được sử dụng

```bash
# Tìm process sử dụng port
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill process (Windows)
taskkill /PID <PID> /F

# hoặc chỉnh sửa docker-compose.yml ports
```

### MongoDB connection error

```bash
# Kiểm tra MongoDB container
docker ps

# Xem logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Frontend không kết nối tới API

1. Kiểm tra VITE_API_URL trong frontend/.env
2. Kiểm tra backend đang chạy: http://localhost:5000/api/health
3. Kiểm tra CORS settings trong backend/server.js

```javascript
app.use(cors());  // Đảm bảo cors() được enable
```

### Frontend không hiển thị sản phẩm

```bash
# Seed dữ liệu mẫu vào MongoDB
docker exec ecommerce-api node seed.js

# Hoặc kết nối trực tiếp MongoDB
mongosh "mongodb://localhost:27017/ecommerce"
```

## 📝 Tài khoản test

Sau khi seed database:

```
Admin Account:
- Email: admin@example.com
- Password: admin123

User Account 1:
- Email: john@example.com
- Password: john123

User Account 2:
- Email: jane@example.com
- Password: jane123
```

## 🎨 Giao diện

### Pages chính
- ✅ Home (Trang chủ)
- ✅ Products (Danh sách sản phẩm)
- ✅ Product Detail (Chi tiết sản phẩm)
- ✅ Login / Register (Đăng nhập / Đăng ký)
- ✅ Cart (Giỏ hàng)
- ✅ Checkout (Thanh toán)
- ✅ Orders (Quản lý đơn hàng)
- ✅ Dashboard (Trang cá nhân)

## 🚀 Build cho Production

### Frontend

```bash
cd frontend
npm run build

# Output sẽ ở: frontend/dist/
```

### Backend

```bash
# Sử dụng Dockerfile có sẵn
docker build -t ecommerce-api:latest ./backend
```

### Deployment

```bash
# Sửa environment variables
# Thay đổi JWT_SECRET
# Cập nhật MONGODB_URI tới production database

docker-compose -f docker-compose.yml up -d
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Auth
- `POST /auth/register` - Đăng ký
- `POST /auth/login` - Đăng nhập
- `POST /auth/verify` - Kiểm tra token

#### Products
- `GET /products` - Lấy tất cả sản phẩm
- `GET /products/:id` - Lấy chi tiết sản phẩm
- `POST /products` - Tạo sản phẩm (Admin)
- `PUT /products/:id` - Cập nhật sản phẩm (Admin)
- `DELETE /products/:id` - Xóa sản phẩm (Admin)
- `POST /products/:id/reviews` - Thêm đánh giá

#### Orders
- `GET /orders` - Lấy đơn hàng của user
- `GET /orders/:id` - Lấy chi tiết đơn hàng
- `POST /orders` - Tạo đơn hàng
- `PUT /orders/:id` - Cập nhật đơn hàng

#### Users
- `GET /users/profile` - Lấy thông tin user
- `PUT /users/profile` - Cập nhật thông tin user

## 💡 Tips

1. **Mở DevTools**: F12 hoặc Ctrl+Shift+I để debug
2. **Check localStorage**: Xem token và cart data
3. **API Response**: Xem Network tab để kiểm tra requests
4. **MongoDB GUI**: Dùng MongoDB Compass để quản lý database
5. **VSCode Extensions**: Cài REST Client để test API trực tiếp

## 🤝 Support

Nếu gặp vấn đề:
1. Kiểm tra logs: `docker-compose logs`
2. Restart services: `docker-compose restart`
3. Clear data: `docker-compose down -v` (xóa data)
4. Rebuild: `docker-compose up --build --force-recreate`

## 📄 License

MIT License - Tự do sử dụng cho dự án học tập
