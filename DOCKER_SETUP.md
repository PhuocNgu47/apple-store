# 🐳 Hướng Dẫn Docker

Hướng dẫn chi tiết về cách sử dụng Docker trong dự án.

## 📋 Yêu Cầu

- Docker Desktop đã cài đặt
- Docker Compose version 2.0+
- Port 3000, 5000, 27017, 8081 chưa được sử dụng

## 🚀 Cách Chạy

### 1. Build và chạy tất cả services

```bash
cd ecommerce-project
docker-compose up --build -d
```

**Giải thích:**
- `--build`: Build lại images
- `-d`: Chạy ở chế độ detached (background)

### 2. Xem logs

```bash
# Tất cả logs
docker-compose logs -f

# Logs của service cụ thể
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### 3. Dừng services

```bash
# Dừng containers
docker-compose down

# Dừng và xóa volumes (xóa database)
docker-compose down -v
```

## 📡 Truy Cập

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health
- **MongoDB**: localhost:27017
- **Mongo Express**: http://localhost:8081 (admin/admin)

## 🔧 Seed Dữ Liệu

Sau khi containers đã chạy:

```bash
# Seed dữ liệu cơ bản (khuyên dùng)
docker exec ecommerce-api node seed.js

# Hoặc seed từ API (nhiều sản phẩm hơn)
docker exec ecommerce-api node seedFromAPI.js
```

## 🧪 Test Kết Nối

### Test Backend:
```bash
curl http://localhost:5000/api/health
```

Kết quả mong đợi:
```json
{
  "status": "ok",
  "timestamp": "2025-01-06T05:09:11.000Z",
  "mongodb": "connected",
  "version": "1.0.0"
}
```

### Test Frontend:
Mở browser và truy cập: http://localhost:3000

## 🐛 Troubleshooting

### 1. Port đã được sử dụng

```bash
# Kiểm tra port nào đang dùng
netstat -ano | findstr :3000
netstat -ano | findstr :5000
netstat -ano | findstr :27017

# Hoặc sửa ports trong docker-compose.yml
```

### 2. Container không start

```bash
# Xem logs chi tiết
docker-compose logs backend
docker-compose logs frontend

# Rebuild lại
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### 3. MongoDB không kết nối được

```bash
# Kiểm tra MongoDB đã chạy chưa
docker ps | grep mongo

# Xem logs MongoDB
docker logs ecommerce-db

# Restart MongoDB
docker restart ecommerce-db
```

### 4. Frontend không kết nối được Backend

- Kiểm tra `VITE_API_URL` trong docker-compose.yml
- Đảm bảo backend đã chạy trước
- Kiểm tra network: `docker network ls`

### 5. Build lỗi

```bash
# Clean build
docker-compose down
docker system prune -a
docker-compose build --no-cache
docker-compose up -d
```

## 📦 Cấu Trúc Docker

```
ecommerce-project/
├── docker-compose.yml       # Cấu hình tất cả services
├── backend/
│   ├── Dockerfile           # Backend image
│   └── .dockerignore        # Files không copy vào image
└── frontend/
    ├── Dockerfile           # Frontend image (multi-stage build)
    └── .dockerignore        # Files không copy vào image
```

## 🔐 Environment Variables

Các biến môi trường được định nghĩa trong `docker-compose.yml`:

**Backend:**
- `MONGODB_URI`: Connection string MongoDB
- `JWT_SECRET`: Secret key cho JWT
- `JWT_EXPIRE`: Thời gian hết hạn token
- `NODE_ENV`: development/production
- `SEPAY_*`: Cấu hình SePay payment

**Frontend:**
- `VITE_API_URL`: URL của backend API

## 📊 Kiểm Tra Trạng Thái

```bash
# Xem status tất cả containers
docker-compose ps

# Xem resource usage
docker stats

# Xem network
docker network inspect ecommerce-project_ecommerce-network
```

## 🧹 Cleanup

```bash
# Dừng và xóa containers
docker-compose down

# Dừng, xóa containers và volumes
docker-compose down -v

# Xóa images
docker rmi ecommerce-project-backend ecommerce-project-frontend

# Xóa tất cả (cẩn thận!)
docker system prune -a
```

## 🔄 Rebuild Sau Khi Sửa Code

```bash
# Rebuild và restart
docker-compose up --build -d

# Hoặc rebuild từng service
docker-compose build backend
docker-compose build frontend
docker-compose up -d
```

## 📝 Notes

- MongoDB data được lưu trong volume `mongo_data`, không mất khi restart
- Frontend được build với production mode
- Backend chạy với `npm start` (không có hot reload)
- Để development với hot reload, chạy `npm run dev` trực tiếp (không dùng Docker)

## 🚨 Quan Trọng

- **Production**: Sử dụng environment variables từ file `.env` hoặc secret management
- **Security**: Không commit `.env` files với secrets thật
- **Performance**: Build images sẽ mất vài phút lần đầu, các lần sau sẽ nhanh hơn nhờ cache

## 📚 Tài Liệu Thêm

- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh
- [RESTART_GUIDE.md](./RESTART_GUIDE.md) - Hướng dẫn restart
