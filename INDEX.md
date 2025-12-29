# 📚 INDEX - Danh Sách Tài Liệu

Tất cả các tài liệu & file cần thiết đã được tạo sẵn. Dưới đây là hướng dẫn sử dụng:

## 🚀 BẮT ĐẦU NHANH

### Bước 1: Chạy Ứng Dụng
```bash
cd ecommerce-project
docker-compose up --build

# Hoặc chạy script (Windows):
start.bat

# Hoặc chạy script (macOS/Linux):
./start.sh
```

### Bước 2: Truy Cập
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api

### Bước 3: Seed Dữ Liệu Mẫu
```bash
docker exec ecommerce-api node seed.js
```

---

## 📖 TÀI LIỆU (Đọc theo thứ tự)

### 1. [SUMMARY.md](./SUMMARY.md) ⭐ **BẮT ĐẦU ĐÂY**
- Tóm tắt nhanh về dự án
- Điểm số dự tính
- Tài khoản test
- Quick commands
- Checklist

### 2. [README.md](./README.md)
- Project overview
- Tính năng chính
- Công nghệ sử dụng
- Cài đặt & chạy
- API endpoints
- Troubleshooting

### 3. [SETUP.md](./SETUP.md)
- Chi tiết setup & installation
- Environment variables
- Docker Compose
- Local development
- Testing API
- Debugging tips

### 4. [QUICKSTART-WINDOWS.md](./QUICKSTART-WINDOWS.md)
- **Cho người dùng Windows/VMware**
- Hướng dẫn chi tiết
- Troubleshooting
- Workflow phát triển

### 5. [FEATURES.md](./FEATURES.md)
- Danh sách tính năng chi tiết
- Cơ bản (4.0 điểm)
- Nâng cao
- Database schema
- API endpoints
- 3-4 trang đầy đủ

### 6. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- Giải thích cấu trúc thư mục
- File descriptions
- Data flow
- Service architecture
- Dependencies summary

### 7. [RESOURCES.md](./RESOURCES.md)
- Links & tools
- Documentation links
- Tutorials
- CLI commands
- Deployment options
- Best practices

---

## 🗂️ FILE STRUCTURE

### Backend (`/backend`)
```
backend/
├── models/
│   ├── User.js          # User schema + password hashing
│   ├── Product.js       # Product schema + reviews
│   └── Order.js         # Order schema
├── routes/
│   ├── auth.js          # Login, Register, Verify
│   ├── products.js      # Product CRUD + reviews
│   ├── orders.js        # Order management
│   └── users.js         # User profile
├── middleware/
│   └── auth.js          # JWT + Admin authorization
├── server.js            # Express server
├── seed.js              # Database seeding
├── Dockerfile
└── package.json
```

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx             # Danh sách sản phẩm
│   │   ├── Login.jsx            # Đăng nhập
│   │   ├── Register.jsx         # Đăng ký
│   │   ├── ProductDetail.jsx    # Chi tiết SP
│   │   ├── Cart.jsx             # Giỏ hàng
│   │   ├── Checkout.jsx         # Thanh toán
│   │   ├── Orders.jsx           # Lịch sử đơn
│   │   ├── Dashboard.jsx        # Trang cá nhân
│   │   ├── AdminProducts.jsx    # Admin panel
│   │   └── OrderSuccess.jsx     # Xác nhận đơn
│   ├── components/
│   │   └── Navbar.jsx           # Navigation
│   ├── api/
│   │   └── index.js             # API calls
│   ├── store/
│   │   └── index.js             # Zustand stores
│   ├── styles/
│   │   └── index.css            # Global styles
│   ├── App.jsx
│   └── main.jsx
├── Dockerfile
└── package.json
```

---

## 🎯 HƯỚNG DẪN SỬ DỤNG

### Cho Người Chạy Lần Đầu

1. Đọc [SUMMARY.md](./SUMMARY.md) (5 phút)
2. Chạy `docker-compose up --build`
3. Đợi 2-3 phút
4. Mở http://localhost:3000
5. Chạy `docker exec ecommerce-api node seed.js`
6. Login với: admin@example.com / admin123
7. Test features

### Cho Người Muốn Hiểu Sâu

1. Đọc [FEATURES.md](./FEATURES.md) - Tính năng chi tiết
2. Đọc [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Cấu trúc code
3. Xem code trong backend/routes/ & frontend/pages/
4. Đọc [RESOURCES.md](./RESOURCES.md) - Tài liệu tham khảo

### Cho Người Muốn Deploy

1. Đọc [SETUP.md](./SETUP.md) - Chi tiết setup
2. Cập nhật JWT_SECRET, MONGODB_URI
3. Thay đổi environment variables
4. Build Docker images
5. Deploy tới cloud platform

### Cho Người Dùng Windows/VMware

1. **Đọc [QUICKSTART-WINDOWS.md](./QUICKSTART-WINDOWS.md)** ⭐
2. Chạy `start.bat`
3. Hoặc chạy Docker commands thủ công

---

## 🔗 CÁC COMMAND QUAN TRỌNG

### Docker
```bash
# Start
docker-compose up --build

# Stop
docker-compose down

# View logs
docker-compose logs -f

# Seed data
docker exec ecommerce-api node seed.js

# Reset
docker-compose down -v
docker-compose up --build
```

### Makefile (Linux/macOS)
```bash
make up              # Start services
make down            # Stop services
make logs            # View logs
make seed            # Seed database
make reset           # Reset database
make help            # Show all commands
```

---

## ✅ CHECKLIST

- [ ] Đọc SUMMARY.md
- [ ] Chạy `docker-compose up --build`
- [ ] Truy cập http://localhost:3000
- [ ] Seed data
- [ ] Đăng ký/Đăng nhập
- [ ] Browse sản phẩm
- [ ] Thêm vào giỏ hàng
- [ ] Checkout
- [ ] Xem orders
- [ ] Login admin
- [ ] Quản lý sản phẩm

---

## 🎓 ĐIỂM SỐ DỰ TÍNH

| Mục | Điểm | Ghi Chú |
|-----|------|--------|
| Giao diện | 1.5/1.5 | ✅ Tailwind CSS |
| Đăng nhập | 0.3 | ✅ JWT auth |
| Tìm kiếm | 0.3 | ✅ Search/filter |
| Giỏ hàng | 0.3 | ✅ CRUD |
| Thanh toán | 0.3 | ✅ Checkout |
| Đơn hàng | 0.3 | ✅ Management |
| Admin | 0.3 | ✅ Product CRUD |
| Đánh giá | 0.2 | ✅ Reviews |
| Tài khoản | 0.2 | ✅ Profile |
| **Tổng** | **4.0/4.0** | ✅ Đạt cao |

---

## 🆘 TROUBLESHOOTING

### Vấn đề | Giải pháp
- **Port in use** | Thay port trong docker-compose.yml
- **MongoDB error** | Restart: `docker-compose restart mongodb`
- **API 404** | Check backend logs: `docker-compose logs backend`
- **No products** | Seed data: `docker exec ecommerce-api node seed.js`

Xem [SETUP.md](./SETUP.md) hoặc [QUICKSTART-WINDOWS.md](./QUICKSTART-WINDOWS.md) để chi tiết.

---

## 📱 TEST ACCOUNTS

```
Admin:
  Email: admin@example.com
  Password: admin123

User 1:
  Email: john@example.com
  Password: john123

User 2:
  Email: jane@example.com
  Password: jane123
```

---

## 📞 CẦN GIÚP ĐỠ?

1. Kiểm tra **SUMMARY.md** → nhanh nhất
2. Kiểm tra **SETUP.md** hoặc **QUICKSTART-WINDOWS.md**
3. Xem logs: `docker-compose logs`
4. Reset: `docker-compose down -v && docker-compose up --build`

---

## 🎉 READY TO GO!

✅ Tất cả file đã sẵn sàng
✅ Docker setup hoàn tất
✅ Database schema định nghĩa
✅ API endpoints đầy đủ
✅ Frontend components hoàn chỉnh
✅ Documentation chi tiết

**Bắt đầu chạy dự án ngay!** 🚀

---

## 📚 REFERENCES

- React: https://react.dev
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Docker: https://docs.docker.com
- Tailwind: https://tailwindcss.com
- JWT: https://jwt.io

---

**Created for TMDT Course Final Project**
**Good luck! 💪**
