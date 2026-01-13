# 🔄 Hướng Dẫn Restart

Hướng dẫn restart containers sau khi có code mới.

## ✅ Khi Nào Cần Restart?

- ✅ Thêm models/routes mới → Cần restart backend
- ✅ Thêm components mới → Cần rebuild frontend
- ✅ Sửa environment variables → Cần restart containers
- ✅ Database changes → Không cần restart (nhưng có thể cần seed lại)

## 🚀 Cách Restart

### Restart Tất Cả
```bash
cd ecommerce-project
docker-compose restart
```

### Restart Từng Service
```bash
# Restart Backend
docker-compose restart backend

# Restart Frontend
docker-compose restart frontend

# Restart MongoDB
docker-compose restart mongodb
```

### Rebuild và Restart (Khi có code mới)
```bash
# Rebuild và restart
docker-compose up --build -d

# Hoặc rebuild từng service
docker-compose build backend
docker-compose build frontend
docker-compose up -d
```

## 🔧 Restart Sau Khi Thêm Code Mới

### Backend (Models/Routes mới)
```bash
# Restart backend để load models/routes mới
docker-compose restart backend

# Hoặc rebuild nếu có thay đổi lớn
docker-compose build backend
docker-compose up -d backend
```

### Frontend (Components mới)
```bash
# Rebuild frontend để load components mới
docker-compose build frontend
docker-compose up -d frontend
```

## 🧪 Kiểm Tra Sau Khi Restart

### 1. Kiểm tra Backend API
```bash
# Health check
curl http://localhost:5000/api/health

# Test API mới (nếu có)
curl http://localhost:5000/api/your-new-endpoint
```

### 2. Kiểm tra Frontend
- Mở trình duyệt: http://localhost:3000
- Hard refresh: `Ctrl + Shift + R` (Windows) hoặc `Cmd + Shift + R` (Mac)
- Kiểm tra Console không có lỗi

### 3. Kiểm tra Logs
```bash
# Xem logs backend
docker-compose logs backend --tail 50

# Xem logs frontend
docker-compose logs frontend --tail 50
```

## 🐛 Troubleshooting

### Backend không start
```bash
# Xem logs chi tiết
docker-compose logs backend

# Kiểm tra lỗi trong logs
docker-compose logs backend | grep -i error
```

### Frontend không load
```bash
# Xem logs frontend
docker-compose logs frontend

# Rebuild lại
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

### API không hoạt động
- Kiểm tra backend đang chạy: `docker-compose ps`
- Kiểm tra logs: `docker-compose logs backend --tail 50`
- Kiểm tra network: `docker network ls`

### Clear cache trình duyệt
- Hard refresh: `Ctrl + Shift + R`
- Hoặc mở Incognito mode
- Clear browser cache

## 📝 Lưu Ý

1. **Backend**: Khi thêm models/routes mới → Cần restart backend
2. **Frontend**: Khi thêm components mới → Cần rebuild frontend
3. **Database**: Không cần restart, nhưng có thể cần seed data mới
4. **Environment Variables**: Thay đổi trong docker-compose.yml → Cần restart containers

## 🎯 Quick Commands

```bash
# Restart tất cả
docker-compose restart

# Rebuild và restart
docker-compose up --build -d

# Xem logs
docker-compose logs -f

# Dừng tất cả
docker-compose down

# Dừng và xóa volumes
docker-compose down -v
```

## 📚 Tài Liệu Thêm

- [DOCKER_SETUP.md](./DOCKER_SETUP.md) - Hướng dẫn Docker chi tiết
- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh

---

**Status:** ✅ Containers đã restart và sẵn sàng!
