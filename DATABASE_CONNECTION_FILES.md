# 📁 Các File Kết Nối Database

Tài liệu liệt kê tất cả các file liên quan đến kết nối database trong dự án.

## 🎯 File Chính Kết Nối Database

### 1. **`backend/server.js`** ⭐ FILE QUAN TRỌNG NHẤT

**Vai trò:** File chính khởi tạo server và kết nối MongoDB

**Vị trí:** `backend/server.js`

**Nội dung:**
```javascript
// DATABASE CONNECTION
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI chưa được cấu hình trong .env');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB đã kết nối thành công');
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    
    // Event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });
    
    // ... more event handlers
  } catch (error) {
    console.error('❌ Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB(); // Gọi khi server start
```

**Khi nào chạy:**
- Khi start server: `npm start` hoặc `node server.js`
- Tự động kết nối khi server khởi động

**Connection String:**
- Đọc từ biến môi trường: `process.env.MONGODB_URI`
- File `.env` trong `backend/.env`

---

## 📊 Model Files (Định Nghĩa Schema)

Các file này **KHÔNG** kết nối database trực tiếp, nhưng định nghĩa schema và được sử dụng sau khi kết nối:

### 2. **`backend/models/User.js`**
- Định nghĩa User schema
- Sử dụng: `import User from './models/User.js'`

### 3. **`backend/models/Product.js`**
- Định nghĩa Product schema
- Sử dụng: `import Product from './models/Product.js'`

### 4. **`backend/models/Order.js`**
- Định nghĩa Order schema
- Sử dụng: `import Order from './models/Order.js'`

### 5. **`backend/models/Address.js`**
- Định nghĩa Address schema
- Sử dụng: `import Address from './models/Address.js'`

### 6. **`backend/models/Coupon.js`**
- Định nghĩa Coupon schema
- Sử dụng: `import Coupon from './models/Coupon.js'`

**Lưu ý:** Các Model files chỉ định nghĩa schema, không tự kết nối. Chúng được sử dụng sau khi `mongoose.connect()` đã được gọi.

---

## 🌱 Seed Files (Kết Nối để Seed Data)

### 7. **`backend/seed.js`** ⭐ FILE SEED CHÍNH

**Vai trò:** Seed dữ liệu mẫu vào database

**Cách chạy:**
```bash
cd backend
npm run seed
# hoặc
node seed.js
```

**Kết nối:**
```javascript
await mongoose.connect(process.env.MONGODB_URI);
```

**Dữ liệu seed:**
- ~10 users (admin + users)
- ~50+ products (Apple products)
- 5 sample orders

### 8. **`backend/seedFromAPI.js`**

**Vai trò:** Seed dữ liệu từ DummyJSON API

**Cách chạy:**
```bash
npm run seed:api
# hoặc
node seedFromAPI.js
```

**Kết nối:**
```javascript
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
await mongoose.connect(MONGODB_URI);
```

### 9. **`backend/seedFromAppleAPI.js`**

**Vai trò:** Seed dữ liệu từ Apple API

**Cách chạy:**
```bash
npm run seed:apple
# hoặc
node seedFromAppleAPI.js
```

### 10. **`backend/seed-cellphones.js`**

**Vai trò:** Seed dữ liệu điện thoại với ảnh thật

**Kết nối:**
```javascript
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
await mongoose.connect(MONGODB_URI);
```

---

## 🧪 Test & Example Files

### 11. **`backend/test-connection.js`** ⭐ FILE TEST KẾT NỐI

**Vai trò:** Test kết nối MongoDB Atlas

**Cách chạy:**
```bash
cd backend
node test-connection.js
```

**Kết nối:**
```javascript
const conn = await mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

**Chức năng:**
- Test kết nối MongoDB
- Hiển thị thông tin database
- Đếm số collections và documents

### 12. **`backend/examples/relationship-examples.js`**

**Vai trò:** Ví dụ về quan hệ dữ liệu

**Cách chạy:**
```bash
node examples/relationship-examples.js
```

**Kết nối:**
```javascript
await mongoose.connect(process.env.MONGODB_URI);
```

### 13. **`backend/examples/develop-relationship-example.js`**

**Vai trò:** Ví dụ phát triển quan hệ mới

**Kết nối:**
```javascript
await mongoose.connect(process.env.MONGODB_URI);
```

---

## ⚙️ Configuration Files

### 14. **`backend/.env`** ⭐ FILE CẤU HÌNH

**Vai trò:** Chứa connection string và các biến môi trường

**Nội dung:**
```env
MONGODB_URI=mongodb+srv://huuphuocdev:phuocadmin@web-app.yfoocsp.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=web-app
```

**Lưu ý:**
- ⚠️ File này KHÔNG được commit lên Git (đã có trong `.gitignore`)
- ✅ Tạo từ `.env.example` hoặc tạo thủ công

### 15. **`docker-compose.yml`** (Root)

**Vai trò:** Cấu hình MongoDB cho Docker

**Nội dung:**
```yaml
services:
  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  backend:
    environment:
      MONGODB_URI: mongodb://mongodb:27017/ecommerce
```

**Lưu ý:** Chỉ dùng khi chạy với Docker (local MongoDB)

---

## 📋 Tóm Tắt

### Files Kết Nối Database Trực Tiếp:

| File | Mục Đích | Khi Nào Chạy |
|------|----------|--------------|
| **`server.js`** | Kết nối chính khi start server | `npm start` |
| **`seed.js`** | Seed dữ liệu mẫu | `npm run seed` |
| **`test-connection.js`** | Test kết nối | `node test-connection.js` |
| **`seedFromAPI.js`** | Seed từ API | `npm run seed:api` |
| **`seedFromAppleAPI.js`** | Seed từ Apple API | `npm run seed:apple` |
| **`seed-cellphones.js`** | Seed điện thoại | `node seed-cellphones.js` |
| **`examples/*.js`** | Ví dụ và demo | `node examples/...` |

### Files Cấu Hình:

| File | Mục Đích |
|------|----------|
| **`.env`** | Connection string và config |
| **`docker-compose.yml`** | Docker MongoDB config |

### Files Định Nghĩa Schema (Không kết nối trực tiếp):

| File | Schema |
|------|--------|
| **`models/User.js`** | User model |
| **`models/Product.js`** | Product model |
| **`models/Order.js`** | Order model |
| **`models/Address.js`** | Address model |
| **`models/Coupon.js`** | Coupon model |

---

## 🔍 Cách Kiểm Tra Kết Nối

### 1. Kiểm Tra Server Đã Kết Nối Chưa

```bash
cd backend
npm start
```

Nếu thấy:
```
✅ MongoDB đã kết nối thành công
📊 Database: ecommerce
🌐 Host: ...
```

→ Đã kết nối thành công!

### 2. Test Kết Nối Riêng

```bash
cd backend
node test-connection.js
```

### 3. Kiểm Tra Health Endpoint

```bash
curl http://localhost:5000/api/health
```

Response:
```json
{
  "status": "ok",
  "mongodb": "connected"
}
```

---

## 🛠️ Troubleshooting

### Lỗi: "MONGODB_URI chưa được cấu hình"

**Nguyên nhân:** File `.env` chưa có hoặc thiếu biến `MONGODB_URI`

**Giải pháp:**
1. Kiểm tra file `backend/.env` có tồn tại không
2. Kiểm tra có dòng `MONGODB_URI=...` không
3. Xem `backend/ENV_SETUP.md` để setup

### Lỗi: "MongoServerError: bad auth"

**Nguyên nhân:** Username/password sai

**Giải pháp:**
1. Kiểm tra password trong `.env`
2. URL encode password nếu có ký tự đặc biệt
3. Kiểm tra database user trong MongoDB Atlas

### Lỗi: "IP not whitelisted"

**Nguyên nhân:** IP chưa được whitelist trong MongoDB Atlas

**Giải pháp:**
1. Vào MongoDB Atlas > Network Access
2. Thêm IP hiện tại
3. Đợi vài phút để apply

---

## 📚 Tài Liệu Liên Quan

- [HUONG_DAN_MONGODB_ATLAS.md](./HUONG_DAN_MONGODB_ATLAS.md) - Hướng dẫn MongoDB Atlas
- [ENV_SETUP.md](./backend/ENV_SETUP.md) - Hướng dẫn setup .env
- [QUAN_HE_DU_LIEU.md](./QUAN_HE_DU_LIEU.md) - Quan hệ dữ liệu

---

**💡 Lưu ý:**
- File **`server.js`** là file QUAN TRỌNG NHẤT - kết nối database khi server start
- Tất cả các file khác đều import và sử dụng connection từ `server.js` hoặc tự kết nối riêng
- File `.env` chứa connection string - KHÔNG được commit lên Git

