# 🗄️ Hướng Dẫn Kết Nối MongoDB Atlas

Hướng dẫn chi tiết cách kết nối dự án với MongoDB Atlas (cloud database).

## 📋 Tổng Quan

Dự án hiện tại đang dùng **Mongoose** (không cần cài `mongodb` driver riêng). Mongoose đã bao gồm MongoDB driver.

## 🚀 Các Bước Setup

### Bước 1: Tạo File .env

Tạo file `.env` trong thư mục `backend/`:

```bash
cd backend
cp .env.example .env
```

### Bước 2: Lấy Connection String từ MongoDB Atlas

1. Đăng nhập vào [MongoDB Atlas](https://cloud.mongodb.com/)
2. Vào **Database** > **Connect**
3. Chọn **Connect your application**
4. Copy connection string:
   ```
   mongodb+srv://huuphuocdev:<password>@web-app.yfoocsp.mongodb.net/?appName=web-app
   ```

### Bước 3: Cập Nhật Connection String

Mở file `backend/.env` và cập nhật:

```env
# Thay <password> bằng password thật của bạn
# Thay <database> bằng tên database (ví dụ: ecommerce)
MONGODB_URI=mongodb+srv://huuphuocdev:YOUR_PASSWORD@web-app.yfoocsp.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=web-app
```

**Lưu ý quan trọng:**
- ✅ Thay `<password>` bằng password thật (không có dấu `<>`)
- ✅ Thay `?appName=web-app` thành `?retryWrites=true&w=majority` (tùy chọn)
- ✅ Thêm tên database vào URL: `/ecommerce` (hoặc tên database bạn muốn)
- ✅ URL encode các ký tự đặc biệt trong password (nếu có)

**Ví dụ:**
```env
# Password: MyP@ssw0rd123
# URL encoded: MyP%40ssw0rd123
MONGODB_URI=mongodb+srv://huuphuocdev:MyP%40ssw0rd123@web-app.yfoocsp.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### Bước 4: Cấu Hình Network Access

1. Vào **Network Access** trong MongoDB Atlas
2. Click **Add IP Address**
3. Chọn một trong các options:
   - **Allow Access from Anywhere** (0.0.0.0/0) - Dễ nhưng kém bảo mật
   - **Add Current IP Address** - Chỉ cho phép IP hiện tại
   - **Add IP Address** - Thêm IP cụ thể

**Khuyên dùng:**
- Development: Allow từ IP của bạn
- Production: Chỉ allow từ server IP

### Bước 5: Tạo Database User (Nếu chưa có)

1. Vào **Database Access** trong MongoDB Atlas
2. Click **Add New Database User**
3. Chọn:
   - **Password** authentication
   - Username: `huuphuocdev` (hoặc username bạn muốn)
   - Password: Tạo password mạnh
   - Database User Privileges: **Read and write to any database**
4. Click **Add User**

### Bước 6: Test Kết Nối

#### Cách 1: Test với Node.js

Tạo file `test-connection.js`:

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔄 Đang kết nối đến MongoDB Atlas...');
    
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('✅ Kết nối thành công!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    
    // Test query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log('✅ Đã ngắt kết nối');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi kết nối:', error.message);
    process.exit(1);
  }
};

testConnection();
```

Chạy:
```bash
cd backend
node test-connection.js
```

#### Cách 2: Test với Server

```bash
cd backend
npm start
```

Nếu thấy: `✅ MongoDB đã kết nối thành công` → Thành công!

---

## 🔧 Cấu Hình Nâng Cao

### Connection Options

Có thể thêm options vào connection string:

```env
MONGODB_URI=mongodb+srv://huuphuocdev:password@web-app.yfoocsp.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=web-app&maxPoolSize=10&serverSelectionTimeoutMS=5000
```

**Các options hữu ích:**
- `retryWrites=true` - Tự động retry khi write fails
- `w=majority` - Write concern
- `maxPoolSize=10` - Số lượng connections tối đa
- `serverSelectionTimeoutMS=5000` - Timeout khi chọn server (5 giây)
- `connectTimeoutMS=10000` - Timeout khi kết nối (10 giây)

### Cải Thiện server.js

Cập nhật `backend/server.js` để có error handling tốt hơn:

```javascript
// DATABASE CONNECTION
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Connection options
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('✅ MongoDB đã kết nối thành công');
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    
    // Event listeners
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });
  } catch (error) {
    console.error('❌ Lỗi kết nối MongoDB:', error.message);
    process.exit(1);
  }
};

connectDB();
```

---

## 🐳 Docker với MongoDB Atlas

Nếu dùng Docker, cập nhật `docker-compose.yml`:

```yaml
backend:
  build: ./backend
  container_name: ecommerce-api
  environment:
    MONGODB_URI: ${MONGODB_URI}  # Đọc từ .env
    # ... other env vars
```

**Lưu ý:**
- Không cần service `mongodb` trong docker-compose nữa
- Chỉ cần backend và frontend services

---

## 🔒 Bảo Mật

### 1. Không Commit .env

Đảm bảo `.env` đã có trong `.gitignore`:

```gitignore
# .env
.env
.env.local
.env.production
```

### 2. Sử Dụng Environment Variables

Trong production, dùng environment variables thay vì file `.env`:

```bash
# PM2
pm2 start ecosystem.config.js --env production

# Hoặc export
export MONGODB_URI="mongodb+srv://..."
```

### 3. Rotate Passwords

Định kỳ đổi password database user (mỗi 3-6 tháng).

---

## 🐛 Troubleshooting

### Lỗi: "MongoServerError: bad auth"

**Nguyên nhân:** Password sai hoặc chưa URL encode

**Giải pháp:**
1. Kiểm tra password trong MongoDB Atlas
2. URL encode password nếu có ký tự đặc biệt
3. Test lại connection

### Lỗi: "MongoServerError: IP not whitelisted"

**Nguyên nhân:** IP của bạn chưa được whitelist

**Giải pháp:**
1. Vào **Network Access** trong MongoDB Atlas
2. Thêm IP hiện tại của bạn
3. Đợi vài phút để apply

### Lỗi: "MongooseServerSelectionError: getaddrinfo ENOTFOUND"

**Nguyên nhân:** Không thể resolve hostname

**Giải pháp:**
1. Kiểm tra internet connection
2. Kiểm tra DNS
3. Thử ping cluster: `ping web-app.yfoocsp.mongodb.net`

### Lỗi: "MongoNetworkTimeoutError"

**Nguyên nhân:** Timeout khi kết nối

**Giải pháp:**
1. Tăng timeout trong connection options
2. Kiểm tra firewall
3. Kiểm tra network access trong Atlas

---

## 📊 Monitoring

### Xem Connection Status

```javascript
// Trong server.js
console.log('MongoDB Connection State:', mongoose.connection.readyState);
// 0 = disconnected
// 1 = connected
// 2 = connecting
// 3 = disconnecting
```

### Xem Stats

```javascript
const stats = await mongoose.connection.db.stats();
console.log('Database Stats:', stats);
```

---

## ✅ Checklist

- [ ] Đã tạo file `.env` trong `backend/`
- [ ] Đã cập nhật `MONGODB_URI` với password thật
- [ ] Đã URL encode password (nếu có ký tự đặc biệt)
- [ ] Đã thêm IP vào Network Access
- [ ] Đã test kết nối thành công
- [ ] Đã commit `.env` vào `.gitignore`
- [ ] Đã cập nhật `docker-compose.yml` (nếu dùng Docker)

---

## 🎯 Next Steps

Sau khi kết nối thành công:

1. **Seed Data:**
   ```bash
   cd backend
   npm run seed
   ```

2. **Test API:**
   ```bash
   npm start
   # Test: http://localhost:5000/api/health
   ```

3. **Deploy:**
   - Cập nhật `MONGODB_URI` trong production environment
   - Đảm bảo production server IP được whitelist

---

**💡 Lưu ý:**
- MongoDB Atlas Free tier có giới hạn: 512MB storage, shared cluster
- Đủ cho development và small production
- Upgrade khi cần nhiều storage/performance hơn

