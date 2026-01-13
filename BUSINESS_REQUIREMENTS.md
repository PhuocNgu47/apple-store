# 📋 Nghiệp Vụ Trang Web Bán Hàng Thực Tế

## 1. QUẢN LÝ SẢN PHẨM
- ✅ Hiển thị danh sách sản phẩm (có phân trang, filter, search)
- ✅ Chi tiết sản phẩm (hình ảnh, mô tả, giá, stock)
- ✅ Quản lý tồn kho (stock tracking)
- ✅ Đánh giá và review sản phẩm
- ✅ So sánh sản phẩm
- ⚠️ Cần thêm: Variants (màu sắc, dung lượng), Bundle deals, Related products

## 2. GIỎ HÀNG (CART)
- ✅ Thêm/xóa sản phẩm
- ✅ Cập nhật số lượng
- ✅ Tính tổng tiền
- ✅ Lưu giỏ hàng (localStorage)
- ⚠️ Cần thêm: Save for later, Cart sharing, Wishlist

## 3. QUY TRÌNH MUA HÀNG (CHECKOUT FLOW)

### 3.1. Xác thực người dùng
- ✅ Đăng nhập/Đăng ký
- ✅ **Guest Checkout với Email bắt buộc** ⭐ (ĐANG CẢI THIỆN)
- ⚠️ Cần thêm: Social login (Google, Facebook)

### 3.2. Thông tin giao hàng
- ✅ Form địa chỉ giao hàng
- ⚠️ **Cần cải thiện:**
  - Validation đầy đủ (số nhà, phường/xã, quận/huyện, tỉnh/thành phố)
  - Tự động điền địa chỉ từ API (Vietnam Post, GHN)
  - Lưu địa chỉ cho user đã đăng nhập
  - Chọn địa chỉ đã lưu
  - Địa chỉ nhận hàng khác địa chỉ thanh toán

### 3.3. Phương thức vận chuyển
- ✅ Chọn tốc độ giao (Express, Standard, Pickup)
- ✅ Chọn đơn vị vận chuyển (GHN, GHTK, Viettel Post)
- ⚠️ Cần thêm: Tính phí vận chuyển thực tế từ API

### 3.4. Phương thức thanh toán
- ✅ QR Transfer (MoMo, ZaloPay, VNPAY)
- ✅ Cash on Delivery (COD)
- ✅ Bank Transfer
- ✅ Credit/Debit Card
- ⚠️ Cần thêm: Installment (Trả góp), E-wallet

### 3.5. Xem lại đơn hàng (Order Review)
- ⚠️ **THIẾU:** Trang xem lại đơn hàng trước khi confirm
- Cần hiển thị:
  - Danh sách sản phẩm
  - Tổng tiền (tạm tính, phí ship, giảm giá, tổng cộng)
  - Địa chỉ giao hàng
  - Phương thức thanh toán
  - Mã giảm giá (nếu có)
  - Điều khoản và điều kiện

### 3.6. Xác nhận đơn hàng
- ✅ Tạo đơn hàng
- ✅ Gửi email xác nhận
- ✅ Tạo mã đơn hàng (orderNumber)
- ⚠️ Cần thêm: SMS notification, Order tracking link

### 3.7. Thanh toán
- ✅ QR Payment page
- ✅ Payment status tracking
- ⚠️ Cần thêm: Payment gateway integration thực tế

### 3.8. Trang thành công (Order Success)
- ✅ Hiển thị thông tin đơn hàng
- ⚠️ Cần thêm: Order tracking, Download invoice, Share order

## 4. QUẢN LÝ ĐỊA CHỈ
- ⚠️ **THIẾU:** Quản lý địa chỉ giao hàng
- Cần có:
  - Lưu nhiều địa chỉ
  - Đặt địa chỉ mặc định
  - Sửa/xóa địa chỉ
  - Validation địa chỉ Việt Nam

## 5. QUẢN LÝ ĐƠN HÀNG
- ✅ Xem danh sách đơn hàng (user)
- ✅ Xem chi tiết đơn hàng
- ✅ Tracking đơn hàng
- ✅ Hủy đơn hàng (trước khi ship)
- ⚠️ Cần thêm: Đổi trả hàng, Hoàn tiền, In hóa đơn

## 6. THÔNG BÁO & EMAIL
- ✅ Email xác nhận đơn hàng
- ✅ Email cập nhật trạng thái
- ⚠️ Cần thêm: SMS, Push notification, In-app notification

## 7. ADMIN PANEL
- ✅ Quản lý sản phẩm
- ✅ Quản lý đơn hàng
- ✅ Quản lý người dùng
- ✅ Dashboard thống kê
- ⚠️ Cần thêm: Quản lý địa chỉ, Quản lý mã giảm giá, Báo cáo

## 8. TÍNH NĂNG BỔ SUNG
- ⚠️ Mã giảm giá (Coupon/Voucher)
- ⚠️ Chương trình khuyến mãi
- ⚠️ Tích điểm thưởng (Loyalty program)
- ⚠️ Đánh giá sau khi nhận hàng
- ⚠️ Gợi ý sản phẩm (Recommendations)
- ⚠️ Lịch sử xem sản phẩm
- ⚠️ So sánh giá với các shop khác

---

## 🎯 ƯU TIÊN CẢI THIỆN NGAY

1. **Guest Checkout với Email bắt buộc** ⭐ (ĐANG LÀM)
2. **Validation địa chỉ giao hàng đầy đủ** ⭐
3. **Order Review Page** (Xem lại đơn hàng trước khi confirm)
4. **Quản lý địa chỉ giao hàng** (Lưu, sửa, xóa)
5. **Cải thiện Order Success Page**

