# 🚀 Hướng Dẫn Cài Đặt Dự Án

Hướng dẫn chi tiết để cài đặt và chạy dự án E-commerce từ đầu.

## 📋 Yêu Cầu Hệ Thống

### Phần Mềm Cần Thiết

1. **Node.js** (v18 trở lên)
   - Download: https://nodejs.org/
   - Kiểm tra: `node --version`

2. **MongoDB** (v7.0 trở lên)
   - Option 1: MongoDB Atlas (Cloud - Khuyên dùng)
   - Option 2: MongoDB Local
   - Download: https://www.mongodb.com/try/download/community

3. **Git** (để clone repository)
   - Download: https://git-scm.com/

4. **Docker** (Optional - nếu dùng Docker)
   - Download: https://www.docker.com/products/docker-desktop/

---

## 🔧 Cài Đặt Chi Tiết

### Bước 1: Clone Repository

```bash
git clone <repository-url>
cd ecommerce-project
```

### Bước 2: Cài Đặt Backend

```bash
cd backend
npm install
```

**Các package chính được cài đặt:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `dotenv` - Environment variables
- `cors` - Cross-origin resource sharing

### Bước 3: Cài Đặt Frontend

```bash
cd ../frontend
npm install
```

**Các package chính được cài đặt:**
- `react` - UI library
- `react-router-dom` - Routing
- `zustand` - State management
- `axios` - HTTP client
- `tailwindcss` - CSS framework
- `vite` - Build tool

### Bước 4: Cấu Hình MongoDB

#### Option A: MongoDB Atlas (Khuyên dùng)

1. Đăng ký tài khoản tại: https://www.mongodb.com/cloud/atlas
2. Tạo cluster mới (Free tier)
3. Tạo database user
4. Whitelist IP address (0.0.0.0/0 cho development)
5. Lấy connection string

Xem chi tiết: [HUONG_DAN_MONGODB_ATLAS.md](./HUONG_DAN_MONGODB_ATLAS.md)

#### Option B: MongoDB Local

1. Cài đặt MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   brew services start mongodb-community
   # hoặc
   sudo systemctl start mongod
   ```

### Bước 5: Cấu Hình Environment Variables

#### Backend (.env)

Tạo file `backend/.env`:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name?retryWrites=true&w=majority
# Hoặc local: MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# SePay Payment (Optional)
SEPAY_BANK_ID=MB
SEPAY_ACCOUNT_NO=your-account-number
SEPAY_ACCOUNT_NAME=YOUR NAME
SEPAY_API_KEY=your-sepay-api-key

# Email (Optional)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:3000
```

**Lưu ý:** Copy từ file `backend/env.example` và điền thông tin thực tế.

#### Frontend (.env)

Tạo file `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_NODE_ENV=development
```

**Lưu ý:** Copy từ file `frontend/env.example`.

### Bước 6: Seed Dữ Liệu Mẫu

```bash
cd backend
npm run seed
# hoặc
node seed.js
```

**Dữ liệu được tạo:**
- 10 Users (2 admin + 8 users)
- 50+ Products (iPhone, iPad, MacBook, etc.)
- 5 Sample Orders
- 3 Coupons

**Tài khoản test:**
- Admin: `admin@example.com` / `admin123`
- User: `user@example.com` / `password123`

### Bước 7: Chạy Dự Án

#### Terminal 1 - Backend

```bash
cd backend
npm run dev
# hoặc
npm start
```

Backend sẽ chạy tại: http://localhost:5000

#### Terminal 2 - Frontend

```bash
cd frontend
npm run dev
```

Frontend sẽ chạy tại: http://localhost:3000

---

## 🐳 Cài Đặt Với Docker (Khuyên dùng)

### Yêu Cầu
- Docker Desktop đã được cài đặt

### Các Bước

1. **Cấu hình .env**
   - Tạo `backend/.env` như trên
   - Tạo `frontend/.env` như trên

2. **Chạy với Docker Compose**

```bash
docker-compose up --build -d
```

3. **Seed dữ liệu**

```bash
docker exec ecommerce-api node seed.js
```

4. **Truy cập**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api
   - MongoDB: localhost:27017
   - Mongo Express: http://localhost:8081

5. **Dừng containers**

```bash
docker-compose down
```

Xem chi tiết: [DOCKER_SETUP.md](./DOCKER_SETUP.md)

---

## ✅ Kiểm Tra Cài Đặt

### 1. Kiểm Tra Backend

```bash
cd backend
node test-connection.js
```

Nếu thành công, bạn sẽ thấy:
```
✅ Kết nối MongoDB thành công!
```

### 2. Kiểm Tra API

Mở browser: http://localhost:5000/api/products

Nếu thấy JSON response, backend đã chạy đúng.

### 3. Kiểm Tra Frontend

Mở browser: http://localhost:3000

Nếu thấy trang chủ, frontend đã chạy đúng.

---

## 🔧 Xử Lý Lỗi Thường Gặp

### Lỗi: "Cannot find module"

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: "MongoDB connection failed"

1. Kiểm tra `MONGODB_URI` trong `.env`
2. Kiểm tra MongoDB đã chạy chưa
3. Kiểm tra network/firewall

### Lỗi: "Port already in use"

```bash
# Windows: Tìm process sử dụng port
netstat -ano | findstr :5000

# Mac/Linux: Tìm process
lsof -i :5000

# Hoặc đổi port trong .env
PORT=5001
```

### Lỗi: "JWT_SECRET is required"

Đảm bảo file `.env` đã được tạo và có `JWT_SECRET`.

---

## 📚 Tài Liệu Tham Khảo

- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh
- [ENV_SETUP.md](./backend/ENV_SETUP.md) - Cấu hình environment
- [HUONG_DAN_MONGODB_ATLAS.md](./HUONG_DAN_MONGODB_ATLAS.md) - Setup MongoDB Atlas
- [DOCKER_SETUP.md](./DOCKER_SETUP.md) - Hướng dẫn Docker
- [TEST_GUIDE.md](./TEST_GUIDE.md) - Hướng dẫn test

---

## 🎯 Checklist Cài Đặt

- [ ] Node.js đã được cài đặt (v18+)
- [ ] MongoDB đã được cài đặt hoặc có Atlas account
- [ ] Repository đã được clone
- [ ] Backend dependencies đã được cài đặt (`npm install` trong `backend/`)
- [ ] Frontend dependencies đã được cài đặt (`npm install` trong `frontend/`)
- [ ] File `backend/.env` đã được tạo và cấu hình
- [ ] File `frontend/.env` đã được tạo và cấu hình
- [ ] MongoDB connection đã được test thành công
- [ ] Dữ liệu mẫu đã được seed
- [ ] Backend đã chạy tại http://localhost:5000
- [ ] Frontend đã chạy tại http://localhost:3000
- [ ] Có thể đăng nhập với tài khoản test

---

**💡 Tip:** Nếu gặp lỗi, hãy kiểm tra:
1. Console logs của backend và frontend
2. File `.env` có đúng format không
3. MongoDB connection string có đúng không
4. Ports có bị conflict không

