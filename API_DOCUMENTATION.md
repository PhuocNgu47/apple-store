# 📚 API Documentation

Tài liệu đầy đủ về các API endpoints của dự án E-commerce.

## 🔐 Authentication

Tất cả các API cần authentication (trừ register/login) đều yêu cầu header:
```
Authorization: Bearer <token>
```

### POST /api/auth/register
Đăng ký tài khoản mới

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "_id": "...",
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### POST /api/auth/login
Đăng nhập

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "jwt-token-here",
  "user": {
    "_id": "...",
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### GET /api/auth/me
Lấy thông tin user hiện tại (cần authentication)

**Response:**
```json
{
  "_id": "...",
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "role": "user"
}
```

---

## 📦 Products

### GET /api/products
Lấy danh sách sản phẩm (có phân trang, tìm kiếm, filter)

**Query Parameters:**
- `page` (number): Số trang (mặc định: 1)
- `limit` (number): Số sản phẩm mỗi trang (mặc định: 12)
- `category` (string): Lọc theo danh mục (iPhone, iPad, MacBook, etc.)
- `search` (string): Tìm kiếm theo tên hoặc mô tả
- `minPrice` (number): Giá tối thiểu
- `maxPrice` (number): Giá tối đa
- `inStock` (boolean): Chỉ lấy sản phẩm còn hàng
- `minRating` (number): Đánh giá tối thiểu
- `sort` (string): Sắp xếp (newest, price, rating, name)
- `order` (string): Thứ tự (asc, desc)

**Example:**
```
GET /api/products?page=1&limit=12&category=iPhone&search=pro&minPrice=500&maxPrice=1500
```

**Response:**
```json
{
  "success": true,
  "products": [...],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 50,
    "pages": 5
  }
}
```

### GET /api/products/:id
Lấy chi tiết sản phẩm

**Response:**
```json
{
  "_id": "...",
  "name": "iPhone 15 Pro Max",
  "description": "...",
  "price": 1199,
  "originalPrice": 1199,
  "category": "iPhone",
  "stock": 50,
  "rating": 4.5,
  "reviews": [...],
  "images": [...]
}
```

### POST /api/products/:id/reviews
Thêm review cho sản phẩm (cần authentication)

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Sản phẩm rất tốt!"
}
```

### POST /api/products
Tạo sản phẩm mới (Admin only)

**Request Body:**
```json
{
  "name": "iPhone 15 Pro Max",
  "description": "...",
  "price": 1199,
  "originalPrice": 1199,
  "category": "iPhone",
  "stock": 50,
  "image": "https://...",
  "images": ["https://...", "https://..."]
}
```

### PUT /api/products/:id
Cập nhật sản phẩm (Admin only)

### DELETE /api/products/:id
Xóa sản phẩm (Admin only)

---

## 🛒 Orders

### GET /api/orders
Lấy danh sách đơn hàng
- User: Chỉ lấy đơn hàng của mình
- Admin: Lấy tất cả đơn hàng

**Response:**
```json
{
  "orders": [
    {
      "_id": "...",
      "orderNumber": "1234567890",
      "userId": {...},
      "items": [...],
      "totalAmount": 1998,
      "status": "pending",
      "paymentStatus": "pending",
      "createdAt": "..."
    }
  ]
}
```

### GET /api/orders/:id
Lấy chi tiết đơn hàng

### POST /api/orders
Tạo đơn hàng mới (cần authentication)

**Request Body:**
```json
{
  "items": [
    {
      "productId": "product-id",
      "quantity": 2,
      "price": 999
    }
  ],
  "shippingAddress": {
    "name": "Nguyễn Văn A",
    "phone": "0123456789",
    "address": "123 Đường ABC",
    "city": "Hồ Chí Minh",
    "country": "Vietnam"
  },
  "paymentMethod": "cod"
}
```

**Response:**
```json
{
  "success": true,
  "order": {
    "_id": "...",
    "orderNumber": "1234567890",
    "totalAmount": 1998,
    "status": "pending"
  }
}
```

### PATCH /api/orders/:id/status
Cập nhật trạng thái đơn hàng (Admin only)

**Request Body:**
```json
{
  "status": "processing",
  "note": "Đang chuẩn bị hàng"
}
```

---

## 👤 Users

### GET /api/users/profile
Lấy thông tin profile của user hiện tại

### PUT /api/users/profile
Cập nhật profile

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "phone": "0123456789",
  "address": "123 Đường ABC",
  "city": "Hồ Chí Minh",
  "country": "Vietnam"
}
```

### GET /api/users
Lấy danh sách tất cả users (Admin only)

### PUT /api/users/:id/role
Cập nhật role của user (Admin only)

**Request Body:**
```json
{
  "role": "admin"
}
```

---

## 📍 Addresses

### GET /api/addresses
Lấy danh sách địa chỉ của user

### GET /api/addresses/:id
Lấy chi tiết một địa chỉ

### POST /api/addresses
Tạo địa chỉ mới

**Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "phone": "0123456789",
  "address": "123 Đường ABC",
  "city": "Hồ Chí Minh",
  "country": "Vietnam",
  "isDefault": true,
  "label": "Nhà riêng"
}
```

### PUT /api/addresses/:id
Cập nhật địa chỉ

### DELETE /api/addresses/:id
Xóa địa chỉ

---

## 🎟️ Coupons

### POST /api/coupons/validate
Validate và tính discount của coupon (Public)

**Request Body:**
```json
{
  "code": "SALE20",
  "subtotal": 1000
}
```

**Response:**
```json
{
  "success": true,
  "coupon": {
    "code": "SALE20",
    "name": "Giảm 20%",
    "discountType": "percentage",
    "discountValue": 20
  },
  "discount": 200,
  "finalAmount": 800
}
```

### GET /api/coupons
Lấy danh sách coupons (Admin only)

### POST /api/coupons
Tạo coupon mới (Admin only)

**Request Body:**
```json
{
  "code": "SALE20",
  "name": "Giảm 20%",
  "discountType": "percentage",
  "discountValue": 20,
  "minPurchaseAmount": 500,
  "maxDiscountAmount": 500,
  "usageLimit": 100,
  "validFrom": "2024-01-01",
  "validUntil": "2024-12-31",
  "applicableProducts": ["product-id-1", "product-id-2"],
  "applicableCategories": ["iPhone", "iPad"]
}
```

### PUT /api/coupons/:id
Cập nhật coupon (Admin only)

### DELETE /api/coupons/:id
Xóa coupon (Admin only)

---

## 💳 Payment

### GET /api/payment/qr/:orderId
Tạo QR code thanh toán cho đơn hàng

**Response:**
```json
{
  "success": true,
  "qrCode": "data:image/png;base64,...",
  "qrData": "00020101021238570010A00000072701270006...",
  "amount": 1998,
  "accountNo": "0935771670",
  "accountName": "NGUYEN HUU PHUOC",
  "bankId": "MB"
}
```

### POST /api/payment/webhook
Webhook từ SePay để cập nhật trạng thái thanh toán (tự động)

---

## 📊 Statistics (Admin Only)

### GET /api/statistics/overview
Thống kê tổng quan

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalProducts": 50,
    "totalUsers": 100,
    "totalOrders": 200,
    "totalRevenue": 50000,
    "pendingOrders": 10,
    "lowStockProducts": 5
  }
}
```

### GET /api/statistics/revenue
Thống kê doanh thu theo thời gian

**Query Parameters:**
- `period` (string): daily, weekly, monthly, yearly

### GET /api/statistics/orders
Thống kê đơn hàng theo trạng thái

---

## ⚠️ Error Responses

Tất cả các API đều trả về format lỗi thống nhất:

```json
{
  "success": false,
  "message": "Error message here"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (chưa đăng nhập)
- `403` - Forbidden (không có quyền)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📝 Notes

1. Tất cả các API cần authentication đều yêu cầu header `Authorization: Bearer <token>`
2. Admin endpoints yêu cầu user có role = "admin"
3. Pagination mặc định: page=1, limit=12
4. Tất cả timestamps đều dùng ISO 8601 format
5. File uploads sẽ được lưu trong `backend/uploads/`

