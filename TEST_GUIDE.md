# 🧪 Hướng Dẫn Test

Checklist chi tiết để test tất cả tính năng đã triển khai.

## 🚀 Bước 1: Khởi Động Dự Án

### Option A: Docker (Khuyên dùng)
```bash
cd ecommerce-project
docker-compose up --build -d
```

### Option B: Chạy Thủ Công
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

## 🌱 Bước 2: Seed Dữ Liệu

```bash
# Với Docker
docker exec ecommerce-api node seed.js

# Chạy thủ công
cd backend && npm run seed
```

**Tài khoản test:**
- Admin: `admin@example.com` / `admin123`
- User: `user@example.com` / `password123`

## ✅ Checklist Test Các Tính Năng

### 1. Product Reviews & Ratings ⭐

#### Test Case 1: Thêm Review Mới
- [ ] Đăng nhập với user account
- [ ] Vào trang chi tiết sản phẩm
- [ ] Click tab "Reviews"
- [ ] Click "+ Viết đánh giá"
- [ ] Chọn 5 sao và viết comment
- [ ] Submit và kiểm tra review hiển thị

#### Test Case 2: Cập Nhật Review
- [ ] Vào lại sản phẩm đã review
- [ ] Click "+ Viết đánh giá" (sẽ hiển thị form với review cũ)
- [ ] Thay đổi rating và comment
- [ ] Submit và kiểm tra review được cập nhật

#### Test Case 3: Sắp Xếp Reviews
- [ ] Vào trang reviews
- [ ] Thử các option sắp xếp: Mới nhất, Cũ nhất, Đánh giá cao, Đánh giá thấp
- [ ] Kiểm tra thứ tự reviews thay đổi đúng

### 2. Search & Filter Nâng Cao 🔍

#### Test Case 1: Filter Theo Category
- [ ] Vào trang sản phẩm
- [ ] Chọn category "iPhone"
- [ ] Kiểm tra chỉ hiển thị sản phẩm iPhone

#### Test Case 2: Filter Theo Giá
- [ ] Nhập minPrice: 10000000
- [ ] Nhập maxPrice: 50000000
- [ ] Kiểm tra chỉ hiển thị sản phẩm trong khoảng giá

#### Test Case 3: Filter Theo Rating
- [ ] Chọn minRating: 4
- [ ] Kiểm tra chỉ hiển thị sản phẩm có rating >= 4

#### Test Case 4: Sắp Xếp
- [ ] Thử các option sort: Giá tăng/giảm, Rating, Tên, Mới nhất
- [ ] Kiểm tra thứ tự sản phẩm thay đổi đúng

### 3. Order Status Tracking 📦

#### Test Case 1: Tạo Đơn Hàng
- [ ] Đăng nhập với user account
- [ ] Thêm sản phẩm vào giỏ hàng
- [ ] Vào checkout và đặt hàng
- [ ] Kiểm tra đơn hàng được tạo với status "pending"

#### Test Case 2: Admin Cập Nhật Status
- [ ] Đăng nhập với admin account
- [ ] Vào Admin Dashboard → Quản Lý Đơn Hàng
- [ ] Cập nhật status: pending → confirmed → shipped → delivered
- [ ] Kiểm tra status được cập nhật đúng

#### Test Case 3: User Xem Đơn Hàng
- [ ] Đăng nhập với user account
- [ ] Vào "Đơn Hàng Của Tôi"
- [ ] Kiểm tra thông tin đầy đủ: Status, Chi tiết sản phẩm, Địa chỉ giao hàng

### 4. Admin Dashboard Statistics 📊

#### Test Case 1: Overview Stats
- [ ] Đăng nhập với admin account
- [ ] Vào Admin Dashboard
- [ ] Kiểm tra các stats cards: Tổng sản phẩm, users, orders, revenue

#### Test Case 2: Low Stock Warning
- [ ] Tạo sản phẩm với stock < 10
- [ ] Vào Admin Dashboard
- [ ] Kiểm tra có cảnh báo "sản phẩm sắp hết hàng"

#### Test Case 3: Order Status Chart
- [ ] Vào Admin Dashboard
- [ ] Kiểm tra section "Thống Kê Đơn Hàng"
- [ ] Kiểm tra hiển thị số lượng đơn hàng theo từng status

### 5. Cart Management 🛒

#### Test Case 1: Thêm Vào Giỏ
- [ ] Xem sản phẩm
- [ ] Click "Thêm vào giỏ hàng"
- [ ] Kiểm tra số lượng trong giỏ tăng

#### Test Case 2: Cập Nhật Số Lượng
- [ ] Vào giỏ hàng
- [ ] Tăng/giảm số lượng
- [ ] Kiểm tra tổng tiền cập nhật đúng

#### Test Case 3: Xóa Khỏi Giỏ
- [ ] Xóa sản phẩm khỏi giỏ
- [ ] Kiểm tra sản phẩm đã bị xóa

## 🔍 Test API Trực Tiếp

### Với Postman hoặc Browser:

#### 1. Health Check
```
GET http://localhost:5000/api/health
```

#### 2. Get Products với Filter
```
GET http://localhost:5000/api/products?category=iPhone&minPrice=10000000&maxPrice=50000000&minRating=4&sort=rating
```

#### 3. Get Product Reviews
```
GET http://localhost:5000/api/products/{productId}/reviews
```

#### 4. Add Review (cần token)
```
POST http://localhost:5000/api/products/{productId}/reviews
Headers: Authorization: Bearer {token}
Body: { "rating": 5, "comment": "Sản phẩm rất tốt!" }
```

#### 5. Get Statistics (admin only)
```
GET http://localhost:5000/api/statistics/overview
Headers: Authorization: Bearer {admin-token}
```

## 🐛 Common Issues & Solutions

### Issue 1: Cannot connect to MongoDB
**Solution:**
- Kiểm tra MongoDB đang chạy
- Kiểm tra MONGODB_URI trong .env
- Với Docker: `docker ps` để xem container

### Issue 2: CORS Error
**Solution:**
- Kiểm tra VITE_API_URL trong frontend/.env
- Đảm bảo backend cho phép CORS

### Issue 3: Reviews không hiển thị user name
**Solution:**
- Kiểm tra populate user trong API
- Đảm bảo user đã đăng nhập

### Issue 4: Statistics không hiển thị
**Solution:**
- Kiểm tra đăng nhập với admin account
- Kiểm tra token có role admin
- Kiểm tra API response trong Network tab

## ✅ Final Checklist

Sau khi test xong, đảm bảo:

- [ ] Tất cả tính năng hoạt động
- [ ] Không có lỗi trong console
- [ ] UI/UX mượt mà
- [ ] Error handling đầy đủ
- [ ] Loading states hiển thị đúng
- [ ] Responsive trên mobile
- [ ] API responses đúng format

## 📚 Tài Liệu Thêm

- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh
- [CODE_EXAMPLES.md](./CODE_EXAMPLES.md) - Ví dụ code

**Chúc bạn test thành công! 🎉**
