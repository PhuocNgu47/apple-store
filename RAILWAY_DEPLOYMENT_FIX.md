# 🚂 Hướng Dẫn Sửa Lỗi Railway Deployment

## ❌ Lỗi Hiện Tại

Deployment `meticulous-purpose / production` đang bị **FAILED** trên Railway.

## 🔍 Các Nguyên Nhân Thường Gặp

### 1. **Thiếu Environment Variables** (Phổ biến nhất)

Railway cần các biến môi trường sau:

**Bắt buộc:**
- `MONGODB_URI` - Connection string MongoDB Atlas
- `JWT_SECRET` - Secret key cho JWT authentication
- `NODE_ENV=production`

**Tùy chọn:**
- `PORT` - Railway tự động set, không cần config
- `JWT_EXPIRE=7d`
- `SEPAY_BANK_ID`, `SEPAY_ACCOUNT_NO`, `SEPAY_ACCOUNT_NAME`, `SEPAY_API_KEY`
- `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASSWORD`
- `FRONTEND_URL`

### 2. **Lỗi Kết Nối MongoDB**

- MongoDB Atlas chưa whitelist IP của Railway
- Connection string sai format
- Database user chưa được tạo hoặc password sai

### 3. **Lỗi Build**

- Dependencies không install được
- Node.js version không khớp
- Build script lỗi

### 4. **Lỗi Start Command**

- Server không start được
- Port conflict
- Module import lỗi

## ✅ Cách Kiểm Tra và Sửa

### Bước 1: Vào Railway Dashboard

1. Truy cập: https://railway.app
2. Đăng nhập và vào project của bạn
3. Click vào service `meticulous-purpose` hoặc service bị lỗi

### Bước 2: Kiểm Tra Logs

1. Click tab **"Deployments"**
2. Click vào deployment failed (có dấu ❌)
3. Xem **"Build Logs"** và **"Deploy Logs"**

**Các lỗi thường thấy:**

```
Error: Cannot find module 'xxx'
→ Thiếu dependency trong package.json

Error: MONGODB_URI is not defined
→ Chưa set environment variable

Error: connect ECONNREFUSED
→ MongoDB connection failed

Error: Port already in use
→ Port conflict (Railway tự động set PORT)
```

### Bước 3: Kiểm Tra Environment Variables

1. Vào **"Variables"** tab trong Railway
2. Đảm bảo có các biến sau:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-min-32-characters
NODE_ENV=production
```

**Lưu ý:**
- Railway tự động set `PORT`, không cần config
- `MONGODB_URI` phải đúng format
- `JWT_SECRET` nên dài ít nhất 32 ký tự

### Bước 4: Kiểm Tra MongoDB Atlas

1. Vào MongoDB Atlas dashboard
2. **Network Access** → **IP Access List**
3. Thêm `0.0.0.0/0` để cho phép tất cả IP (hoặc IP của Railway)
4. **Database Access** → Kiểm tra user có quyền đọc/ghi

### Bước 5: Redeploy

Sau khi sửa:
1. Click **"Redeploy"** trong Railway
2. Hoặc push code mới lên GitHub (nếu có auto-deploy)

## 🔧 Các Lỗi Cụ Thể và Cách Sửa

### Lỗi: "Cannot find module"

**Nguyên nhân:** Thiếu dependency

**Giải pháp:**
```bash
# Kiểm tra package.json có đầy đủ dependencies
# Railway sẽ tự động chạy npm install
```

### Lỗi: "MONGODB_URI is not defined"

**Nguyên nhân:** Chưa set environment variable

**Giải pháp:**
1. Vào Railway → Variables
2. Thêm `MONGODB_URI` với giá trị từ MongoDB Atlas

### Lỗi: "connect ECONNREFUSED" hoặc "MongoServerError"

**Nguyên nhân:** Không kết nối được MongoDB

**Giải pháp:**
1. Kiểm tra MongoDB Atlas IP whitelist
2. Kiểm tra connection string đúng chưa
3. Kiểm tra username/password

### Lỗi: "Port already in use"

**Nguyên nhân:** Port conflict

**Giải pháp:**
- Railway tự động set PORT, không cần config
- Đảm bảo code dùng `process.env.PORT` (đã đúng trong server.js)

### Lỗi: "SyntaxError" hoặc "Unexpected token"

**Nguyên nhân:** Code syntax error

**Giải pháp:**
1. Test code local trước khi push
2. Kiểm tra Node.js version (Railway dùng Node 18)

## 📋 Checklist Sửa Lỗi

- [ ] Đã vào Railway dashboard
- [ ] Đã xem logs của deployment failed
- [ ] Đã kiểm tra Environment Variables:
  - [ ] `MONGODB_URI` đã được set
  - [ ] `JWT_SECRET` đã được set
  - [ ] `NODE_ENV=production` đã được set
- [ ] Đã kiểm tra MongoDB Atlas:
  - [ ] IP whitelist đã thêm `0.0.0.0/0`
  - [ ] Database user có quyền
  - [ ] Connection string đúng format
- [ ] Đã kiểm tra package.json có đầy đủ dependencies
- [ ] Đã test code local trước
- [ ] Đã redeploy sau khi sửa

## 🚀 Cách Deploy Lại

### Option 1: Redeploy trong Railway

1. Vào Railway dashboard
2. Click vào service
3. Click **"Redeploy"** button
4. Chọn deployment cũ hoặc tạo mới

### Option 2: Push Code Mới

1. Sửa code local
2. Commit và push lên GitHub
3. Railway sẽ tự động deploy (nếu có auto-deploy)

### Option 3: Manual Deploy

1. Vào Railway → Deployments
2. Click **"New Deployment"**
3. Chọn branch/commit muốn deploy

## 💡 Tips

1. **Luôn test local trước khi deploy:**
   ```bash
   npm install
   npm start
   ```

2. **Kiểm tra logs thường xuyên:**
   - Railway logs rất chi tiết
   - Copy error message để Google

3. **Dùng Railway CLI để debug:**
   ```bash
   npm install -g @railway/cli
   railway login
   railway logs
   ```

4. **Kiểm tra health endpoint:**
   - Sau khi deploy thành công, test: `https://your-app.railway.app/api/health`

## 📞 Nếu Vẫn Lỗi

1. Copy toàn bộ error logs từ Railway
2. Kiểm tra lại tất cả environment variables
3. Test connection MongoDB từ local
4. Kiểm tra Railway status page: https://status.railway.app

## 🔗 Tài Liệu Tham Khảo

- [Railway Documentation](https://docs.railway.app/)
- [MongoDB Atlas Setup](./HUONG_DAN_MONGODB_ATLAS.md)
- [Environment Variables Setup](./backend/ENV_SETUP.md)

---

**Lưu ý:** Deployment failed không ảnh hưởng đến code trên GitHub. Code vẫn an toàn và có thể deploy lại sau khi sửa lỗi.

