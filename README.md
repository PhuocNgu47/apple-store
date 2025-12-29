# E-Commerce Application

Ứng dụng thương mại điện tử đầy đủ chức năng xây dựng với React, Node.js, Express, và MongoDB.

## Tính năng

### Chức năng cơ bản
- ✅ **Đăng ký/Đăng nhập** - Hệ thống xác thực người dùng với JWT
- ✅ **Duyệt sản phẩm** - Danh sách sản phẩm với tìm kiếm và lọc theo danh mục
- ✅ **Giỏ hàng** - Thêm/xóa sản phẩm, cập nhật số lượng
- ✅ **Thanh toán** - Quá trình checkout với địa chỉ giao hàng
- ✅ **Quản lý đơn hàng** - Xem danh sách đơn hàng của người dùng

### Chức năng nâng cao
- 📊 **Thống kê** - Dashboard với biểu đồ doanh số
- 💬 **Đánh giá sản phẩm** - Hệ thống review và rating
- 👨‍💼 **Quản lý sản phẩm** - Admin có thể thêm/sửa/xóa sản phẩm
- 📦 **Theo dõi đơn hàng** - Cập nhật trạng thái đơn hàng
- 💳 **Nhiều phương thức thanh toán** - Tiền mặt, thẻ tín dụng, chuyển khoản

## Công nghệ sử dụng

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Zustand (State Management)
- Axios (HTTP Client)
- Chart.js (Biểu đồ)

### Backend
- Node.js + Express
- MongoDB
- Mongoose (ODM)
- JWT (Authentication)
- bcryptjs (Password Hashing)

### DevOps
- Docker & Docker Compose
- Multi-stage builds

## Cài đặt và chạy

### Yêu cầu
- Docker & Docker Compose (đã cài sẵn trên VMware)
- Hoặc: Node.js 18+, MongoDB

### Chạy với Docker (Khuyến nghị)

```bash
# Clone hoặc download dự án
cd ecommerce-project

# Chạy tất cả services
docker-compose up --build

# Truy cập
Frontend: http://localhost:3000
Backend API: http://localhost:5000
MongoDB: localhost:27017
```

### Chạy local development

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/verify` - Xác thực token

### Products
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm (admin)
- `PUT /api/products/:id` - Cập nhật sản phẩm (admin)
- `DELETE /api/products/:id` - Xóa sản phẩm (admin)
- `POST /api/products/:id/reviews` - Thêm review

### Orders
- `GET /api/orders` - Lấy đơn hàng của user
- `GET /api/orders/:id` - Chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng
- `PUT /api/orders/:id` - Cập nhật đơn hàng

### Users
- `GET /api/users/profile` - Lấy profile user
- `PUT /api/users/profile` - Cập nhật profile

## Dữ liệu mẫu

Để thêm dữ liệu mẫu, kết nối MongoDB qua MongoDB Compass hoặc CLI:

```bash
# Kết nối tới MongoDB
mongosh "mongodb://localhost:27017/ecommerce"

# Hoặc sử dụng script seed data nếu có
```

## Cấu trúc thư mục

```
ecommerce-project/
├── frontend/
│   ├── src/
│   │   ├── pages/       # Các trang chính
│   │   ├── components/  # React components
│   │   ├── api/        # API calls
│   │   ├── store/      # Zustand stores
│   │   └── styles/     # CSS
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middleware/     # Auth middleware
│   ├── server.js       # Entry point
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Đăng nhập mẫu

Sau khi đăng ký tài khoản, bạn có thể đăng nhập với email và password.

Admin account (cần tạo thủ công):
- Email: admin@example.com
- Password: admin123
- Role: admin

## Troubleshooting

### MongoDB connection error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
Giải pháp: Đảm bảo MongoDB container đang chạy
```bash
docker-compose ps
docker-compose logs mongodb
```

### API not found (404)
- Kiểm tra backend có đang chạy trên port 5000
- Kiểm tra VITE_API_URL trong frontend

### Port conflict
Thay đổi ports trong docker-compose.yml hoặc:
```bash
docker-compose down
# Chỉnh sửa docker-compose.yml
docker-compose up
```

## Phát triển thêm

### Thêm feature mới
1. Tạo model/schema trong backend/models
2. Tạo route trong backend/routes
3. Tạo page/component trong frontend/src
4. Cập nhật API calls trong frontend/api

### Deployment
- Cập nhật JWT_SECRET trong .env
- Thay đổi MONGODB_URI để trỏ tới production DB
- Build và push Docker images lên registry
- Deploy trên cloud platform (AWS, Azure, Heroku, etc.)

## Support

Để báo cáo lỗi hoặc yêu cầu feature, tạo issue hoặc liên hệ team phát triển.

## License

MIT License
