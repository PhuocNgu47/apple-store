# 🌱 Hướng Dẫn Seed Dữ Liệu

Hướng dẫn chi tiết để tạo dữ liệu mẫu cho database.

## 📋 Tổng Quan

Dự án có **2 cách** để seed dữ liệu:

1. **seed.js** - Dữ liệu tự tạo (Apple products) - **Khuyên dùng cho demo**
2. **seedFromAPI.js** - Lấy từ DummyJSON API (nhiều sản phẩm hơn)

## 🎯 Cách 1: Seed Dữ Liệu Tự Tạo (Khuyên dùng)

### Với Docker:
```bash
docker exec ecommerce-api node seed.js
```

### Chạy thủ công:
```bash
cd ecommerce-project/backend
npm run seed
```

### Dữ liệu sẽ được tạo:

✅ **Users:**
- Admin: `admin@example.com` / `admin123`
- User: `user@example.com` / `password123`

✅ **Products (Apple Store):**
- iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15
- MacBook Pro 16", MacBook Air M2
- iPad Pro 12.9", iPad Air
- Apple Watch Series 9
- AirPods Pro 2
- Và nhiều sản phẩm khác...

**Tổng cộng:** ~15-20 sản phẩm Apple

## 🌐 Cách 2: Seed Từ API (Nhiều sản phẩm hơn)

### Với Docker:
```bash
docker exec ecommerce-api node seedFromAPI.js
```

### Chạy thủ công:
```bash
cd ecommerce-project/backend
npm run seed:api
```

### Dữ liệu sẽ được tạo:

✅ **Users:** Giống như cách 1

✅ **Products:** 
- Lấy từ DummyJSON API
- Bao gồm: smartphones, laptops, tablets, accessories, watches
- **Tổng cộng:** ~50+ sản phẩm
- Tự động map categories sang Apple categories

## 🔍 Kiểm Tra Dữ Liệu Đã Seed

### Với Docker:
```bash
# Vào MongoDB shell
docker exec -it ecommerce-db mongosh

# Hoặc từ máy local
mongosh mongodb://localhost:27017/ecommerce
```

### Các lệnh MongoDB:
```javascript
// Xem databases
show dbs

// Chọn database
use ecommerce

// Đếm số products
db.products.countDocuments()

// Xem products
db.products.find().pretty()

// Đếm số users
db.users.countDocuments()

// Xem users
db.users.find().pretty()
```

## 🗑️ Xóa Dữ Liệu Cũ (Nếu cần)

### Xóa tất cả:
```bash
# Với Docker
docker exec -it ecommerce-db mongosh ecommerce --eval "db.dropDatabase()"

# Sau đó seed lại
docker exec ecommerce-api node seed.js
```

### Hoặc xóa từng collection:
```javascript
// Trong MongoDB shell
use ecommerce
db.products.deleteMany({})
db.users.deleteMany({})
db.orders.deleteMany({})
```

## 📝 Chi Tiết Dữ Liệu Seed

### Users được tạo:

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | admin123 | admin |
| user@example.com | password123 | user |

### Products (seed.js):

**iPhone:**
- iPhone 15 Pro Max - $1,199
- iPhone 15 Pro - $999
- iPhone 15 - $799
- iPhone 14 Pro - $899
- iPhone 14 - $699

**MacBook:**
- MacBook Pro 16" - $2,499
- MacBook Pro 14" - $1,999
- MacBook Air M2 - $1,199
- MacBook Air M1 - $999

**iPad:**
- iPad Pro 12.9" - $1,099
- iPad Pro 11" - $799
- iPad Air - $599
- iPad Mini - $499

**Apple Watch:**
- Apple Watch Series 9 - $399
- Apple Watch Ultra 2 - $799

**Accessories:**
- AirPods Pro 2 - $249
- AirPods Max - $549
- Magic Keyboard - $149
- Magic Mouse - $79

## ⚠️ Lưu Ý

1. **Seed chỉ chạy 1 lần** - Nếu chạy lại sẽ tạo duplicate users (email unique)
2. **Products có thể seed nhiều lần** - Sẽ thêm mới vào database
3. **Orders không được seed** - Cần tạo thủ công qua UI

## 🚀 Quick Start

### Bước 1: Chạy Docker
```bash
cd ecommerce-project
docker-compose up --build -d
```

### Bước 2: Seed Data
```bash
# Seed dữ liệu tự tạo (khuyên dùng)
docker exec ecommerce-api node seed.js

# Hoặc seed từ API (nhiều sản phẩm hơn)
docker exec ecommerce-api node seedFromAPI.js
```

### Bước 3: Kiểm Tra
- Frontend: http://localhost:3000
- Đăng nhập với: `admin@example.com` / `admin123`
- Xem sản phẩm đã được seed

## 🎯 Khuyến Nghị

**Cho Demo/Presentation:**
- ✅ Dùng **seed.js** (dữ liệu tự tạo)
- ✅ Sản phẩm Apple thực tế
- ✅ Dữ liệu nhất quán
- ✅ Dễ kiểm soát

**Cho Testing:**
- ✅ Dùng **seedFromAPI.js** (nhiều sản phẩm hơn)
- ✅ Nhiều dữ liệu để test filter, search
- ✅ Đa dạng categories

## 📚 Tài Liệu Thêm

- [HUONG_DAN_THEM_SAN_PHAM.md](./HUONG_DAN_THEM_SAN_PHAM.md) - Hướng dẫn thêm sản phẩm
- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh

**Sau khi seed xong, bạn có thể test tất cả tính năng! 🎉**
