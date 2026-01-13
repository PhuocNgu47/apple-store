# 📝 Hướng Dẫn Thêm Sản Phẩm Tự Tạo

> Hướng dẫn chi tiết cách thêm nhiều sản phẩm Apple thực tế vào database

---

## 📁 File Cần Sửa

**File chính:** `backend/seed.js`

**Vị trí:** Array `PRODUCTS` (dòng 17-159)

---

## 🎯 Cách Thêm Sản Phẩm

### Bước 1: Mở file seed.js

```bash
cd ecommerce-project/backend
# Mở file seed.js trong editor
```

### Bước 2: Tìm array PRODUCTS

Tìm dòng:
```javascript
const PRODUCTS = [
  // ... các sản phẩm hiện tại ...
];
```

### Bước 3: Thêm sản phẩm mới

Thêm object sản phẩm vào array `PRODUCTS`:

```javascript
{
  name: 'Tên sản phẩm',
  description: 'Mô tả chi tiết sản phẩm',
  price: 999,                    // Giá bán (USD)
  originalPrice: 1199,           // Giá gốc (để hiển thị giảm giá)
  category: 'iPhone',            // Category: iPhone, MacBook, iPad, Apple Watch, Accessories
  image: 'https://...',          // URL ảnh sản phẩm
  stock: 25,                     // Số lượng tồn kho
  rating: 5,                      // Đánh giá (1-5)
  specs: {                       // Thông số kỹ thuật
    screen: '6.7" Super Retina XDR',
    processor: 'Apple A17 Pro',
    camera: '48MP Wide + 12MP Ultra Wide',
    battery: '4685 mAh',
    storage: '256GB/512GB/1TB',
    color: 'Black, Silver, Gold'
  }
}
```

---

## 📋 Template Sản Phẩm

### iPhone Template:

```javascript
{
  name: 'iPhone 15 Pro Max',
  description: 'Điện thoại flagship Apple với chip A17 Pro, camera 48MP, màn hình Super Retina XDR 6.7 inch. Tính năng nổi bật: USB-C, Action Button, Titanium design',
  price: 1199,
  originalPrice: 1299,
  category: 'iPhone',
  image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro+Max',
  stock: 25,
  rating: 5,
  specs: {
    screen: '6.7" Super Retina XDR',
    processor: 'Apple A17 Pro',
    camera: '48MP Wide + 12MP Ultra Wide + 12MP Telephoto',
    battery: '4685 mAh',
    storage: '256GB/512GB/1TB',
    color: 'Natural Titanium, Blue Titanium, White Titanium, Black Titanium'
  }
}
```

### MacBook Template:

```javascript
{
  name: 'MacBook Pro 16" (M3 Pro)',
  description: 'MacBook Pro cao cấp với chip M3 Pro, màn hình Liquid Retina XDR 16.2 inch. Hiệu năng cực mạnh cho video editing, 3D rendering',
  price: 2499,
  originalPrice: 2499,
  category: 'MacBook',
  image: 'https://via.placeholder.com/300x300?text=MacBook+Pro+16',
  stock: 10,
  rating: 5,
  specs: {
    screen: '16.2" Liquid Retina XDR',
    processor: 'Apple M3 Pro',
    memory: '18GB/36GB unified memory',
    storage: '512GB/1TB/2TB/4TB/8TB SSD',
    battery: 'Up to 22 hours',
    color: 'Space Black, Silver'
  }
}
```

### iPad Template:

```javascript
{
  name: 'iPad Pro 12.9" (M2)',
  description: 'Máy tính bảng cao cấp với chip M2, màn hình Liquid Retina XDR 12.9 inch. Hỗ trợ Apple Pencil Pro, MagicKeyboard',
  price: 1099,
  originalPrice: 1099,
  category: 'iPad',
  image: 'https://via.placeholder.com/300x300?text=iPad+Pro+12.9',
  stock: 15,
  rating: 5,
  specs: {
    screen: '12.9" Liquid Retina XDR',
    processor: 'Apple M2',
    camera: '12MP Wide + 10MP Ultra Wide',
    battery: 'Up to 10 hours',
    storage: '128GB/256GB/512GB/1TB/2TB',
    color: 'Space Gray, Silver'
  }
}
```

### Apple Watch Template:

```javascript
{
  name: 'Apple Watch Series 9',
  description: 'Smartwatch Apple mới nhất với chip S9, màn hình Always-On. Tính năng health: ECG, SpO2, sleep tracking',
  price: 399,
  originalPrice: 399,
  category: 'Apple Watch',
  image: 'https://via.placeholder.com/300x300?text=Apple+Watch+Series+9',
  stock: 50,
  rating: 4.8,
  specs: {
    screen: '1.9" LTPO OLED',
    processor: 'Apple S9',
    battery: '~18 hours',
    features: 'ECG, Blood Oxygen, Always-On Display, Fitness Tracking',
    color: 'Silver, Midnight, Gold, Starlight'
  }
}
```

### Accessories Template:

```javascript
{
  name: 'AirPods Pro (2nd Gen)',
  description: 'Tai nghe AirPods Pro generation 2 với Adaptive Audio, Active Noise Cancellation. Âm thanh Spatial Audio',
  price: 249,
  originalPrice: 249,
  category: 'Accessories',
  image: 'https://via.placeholder.com/300x300?text=AirPods+Pro',
  stock: 100,
  rating: 5,
  specs: {
    features: 'ANC, Adaptive Audio, Spatial Audio, USB-C',
    battery: '6 hours (+ 30 hours case)',
    color: 'White',
    weight: '5.3g each'
  }
}
```

---

## 🚀 Sử Dụng Template File

Tôi đã tạo file `backend/apple-products-template.js` với **40+ sản phẩm Apple thực tế**.

### Cách sử dụng:

1. **Mở file template:**
   ```bash
   backend/apple-products-template.js
   ```

2. **Copy sản phẩm bạn muốn** từ template

3. **Paste vào file seed.js** trong array `PRODUCTS`

4. **Chạy seed:**
   ```bash
   npm run seed
   # hoặc
   docker exec ecommerce-api node seed.js
   ```

---

## 📊 Danh Sách Sản Phẩm Trong Template

### iPhone (8 sản phẩm):
- iPhone 15 Pro Max
- iPhone 15 Pro
- iPhone 15
- iPhone 15 Plus
- iPhone 14 Pro Max
- iPhone 14 Pro
- iPhone 14
- iPhone SE (3rd Gen)

### MacBook (7 sản phẩm):
- MacBook Pro 16" (M3 Pro)
- MacBook Pro 14" (M3 Pro)
- MacBook Pro 16" (M3)
- MacBook Air 15" (M2)
- MacBook Air 13" (M2)
- MacBook Air 13" (M1)
- iMac 24" (M3)

### iPad (6 sản phẩm):
- iPad Pro 12.9" (M2)
- iPad Pro 11" (M2)
- iPad Air 11" (M1)
- iPad Air 10.9" (M1)
- iPad (10th Gen)
- iPad Mini (6th Gen)

### Apple Watch (3 sản phẩm):
- Apple Watch Ultra 2
- Apple Watch Series 9
- Apple Watch SE (2nd Gen)

### Accessories (9 sản phẩm):
- AirPods Pro (2nd Gen)
- AirPods (3rd Gen)
- AirPods Max
- Magic Keyboard
- Magic Mouse
- Apple Pencil (2nd Gen)
- HomePod Mini
- HomePod (2nd Gen)
- Apple TV 4K (3rd Gen)

**Tổng cộng: 33 sản phẩm Apple thực tế!**

---

## 💡 Tips

1. **Thêm nhiều sản phẩm cùng lúc:** Copy nhiều objects và paste vào array
2. **Sửa giá:** Điều chỉnh `price` và `originalPrice` để tạo giảm giá
3. **Thay đổi stock:** Đặt `stock` khác nhau để test tính năng "sắp hết hàng"
4. **Thêm reviews:** Sau khi seed, có thể thêm reviews qua UI
5. **Images:** Có thể dùng placeholder hoặc link ảnh thật từ Apple Store

---

## ✅ Sau Khi Thêm Xong

1. **Lưu file seed.js**

2. **Chạy seed:**
   ```bash
   # Với Docker
   docker exec ecommerce-api node seed.js
   
   # Chạy thủ công
   cd backend
   npm run seed
   ```

3. **Kiểm tra:**
   - Vào http://localhost:3000
   - Xem danh sách sản phẩm đã được thêm

---

## 📝 Ví Dụ: Thêm 5 Sản Phẩm Mới

```javascript
// Trong file seed.js, thêm vào array PRODUCTS:

{
  name: 'iPhone 13 Pro',
  description: 'iPhone Pro với chip A15 Bionic, camera 12MP Pro. Màn hình Super Retina XDR 6.1 inch',
  price: 899,
  originalPrice: 999,
  category: 'iPhone',
  image: 'https://via.placeholder.com/300x300?text=iPhone+13+Pro',
  stock: 30,
  rating: 4.8,
  specs: {
    screen: '6.1" Super Retina XDR',
    processor: 'Apple A15 Bionic',
    camera: '12MP Wide + 12MP Ultra Wide + 12MP Telephoto',
    battery: '3095 mAh',
    storage: '128GB/256GB/512GB/1TB',
    color: 'Graphite, Gold, Silver, Sierra Blue, Alpine Green'
  }
},
{
  name: 'Mac Studio (M2 Ultra)',
  description: 'Mac Studio với chip M2 Ultra, hiệu năng cực mạnh. Thiết kế nhỏ gọn, phù hợp cho studio',
  price: 3999,
  originalPrice: 3999,
  category: 'MacBook',
  image: 'https://via.placeholder.com/300x300?text=Mac+Studio',
  stock: 5,
  rating: 5,
  specs: {
    processor: 'Apple M2 Ultra',
    memory: '64GB/128GB unified memory',
    storage: '1TB/2TB/4TB/8TB SSD',
    ports: '6x Thunderbolt 4, 2x USB-A, HDMI, 10Gb Ethernet',
    color: 'Silver'
  }
},
// ... thêm 3 sản phẩm nữa ...
```

---

**Chúc bạn thêm sản phẩm thành công! 🎉**

