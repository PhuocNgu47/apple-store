# 🔧 Hướng Dẫn Tích Hợp

Hướng dẫn tích hợp các tính năng mới vào dự án.

## ✅ Tính Năng Đã Hoàn Thành

### 1. Order Review Page
- **File:** `frontend/src/pages/OrderReview.jsx`
- **Chức năng:** Xem lại đơn hàng trước khi xác nhận
- **Tích hợp:** Import vào Checkout page

### 2. Address Management
- **Backend Model:** `backend/models/Address.js`
- **Backend Routes:** `backend/routes/addresses.js`
- **API Client:** Đã thêm vào `frontend/src/api/index.js`

**Endpoints:**
- `GET /api/addresses` - Lấy danh sách địa chỉ
- `POST /api/addresses` - Tạo địa chỉ mới
- `PUT /api/addresses/:id` - Cập nhật địa chỉ
- `DELETE /api/addresses/:id` - Xóa địa chỉ
- `PATCH /api/addresses/:id/set-default` - Đặt làm mặc định

### 3. Coupon System
- **Backend Model:** `backend/models/Coupon.js`
- **Backend Routes:** `backend/routes/coupons.js`
- **Component:** `frontend/src/components/CouponInput.jsx`
- **API:** `POST /api/coupons/validate` - Validate và tính discount

### 4. Order Model Updates
- Đã thêm `couponCode` và `discountAmount` vào Order model
- Backend tự động tính tổng tiền sau khi trừ discount

## 📝 Tích Hợp Vào Checkout.jsx

### 1. Load Saved Addresses (khi user đã đăng nhập)

```jsx
useEffect(() => {
  if (token && user) {
    setLoadingAddresses(true);
    addressAPI.getAll()
      .then(res => {
        setSavedAddresses(res.data.addresses || []);
        // Auto-select default address
        const defaultAddr = res.data.addresses?.find(a => a.isDefault);
        if (defaultAddr) {
          setSelectedAddressId(defaultAddr._id);
          setShippingAddress({
            name: defaultAddr.name,
            phone: defaultAddr.phone,
            address: defaultAddr.address,
            // ... other fields
          });
        }
      })
      .catch(err => console.error('Load addresses error:', err))
      .finally(() => setLoadingAddresses(false));
  }
}, [token, user]);
```

### 2. Thêm Dropdown chọn địa chỉ đã lưu

```jsx
{savedAddresses.length > 0 && (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-semibold">
      Chọn địa chỉ đã lưu:
    </label>
    <select
      value={selectedAddressId || ''}
      onChange={(e) => {
        const addr = savedAddresses.find(a => a._id === e.target.value);
        if (addr) {
          setSelectedAddressId(addr._id);
          setShippingAddress({
            name: addr.name,
            phone: addr.phone,
            address: addr.address,
            // ... other fields
          });
        }
      }}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl"
    >
      <option value="">Chọn địa chỉ...</option>
      {savedAddresses.map(addr => (
        <option key={addr._id} value={addr._id}>
          {addr.label} - {addr.address}, {addr.district}, {addr.city}
          {addr.isDefault && ' (Mặc định)'}
        </option>
      ))}
    </select>
  </div>
)}
```

### 3. Thêm CouponInput vào form

```jsx
{/* Trong phần Order Summary, trước tổng tiền */}
<CouponInput
  subtotal={getTotalPrice()}
  onApply={(coupon) => setAppliedCoupon(coupon)}
  onRemove={() => setAppliedCoupon(null)}
  appliedCoupon={appliedCoupon}
/>
```

### 4. Cập nhật tính tổng tiền với discount

```jsx
const subtotal = getTotalPrice();
const discount = appliedCoupon?.discount || 0;
const total = subtotal - discount;
```

### 5. Thêm nút "Xem lại đơn hàng"

```jsx
{/* Trước nút "Đặt Hàng" */}
<button
  onClick={() => {
    if (!validateAddress()) {
      toast.error('Vui lòng điền đầy đủ thông tin địa chỉ');
      return;
    }
    setShowOrderReview(true);
  }}
  className="w-full py-3 mb-3 text-blue-600 border-2 border-blue-600 hover:bg-blue-50 rounded-xl font-semibold transition"
>
  📋 Xem Lại Đơn Hàng
</button>
```

### 6. Render Order Review

```jsx
{showOrderReview ? (
  <OrderReview
    shippingAddress={shippingAddress}
    paymentMethod={paymentMethod}
    couponCode={appliedCoupon?.code}
    discountAmount={appliedCoupon?.discount}
    onBack={() => setShowOrderReview(false)}
    onConfirm={processOrder}
  />
) : (
  // ... existing checkout form
)}
```

### 7. Cập nhật processOrder để gửi coupon

```jsx
const orderData = {
  items: orderItems,
  shippingAddress: { ...shippingAddress },
  paymentMethod,
  couponCode: appliedCoupon?.code || null,
  discountAmount: appliedCoupon?.discount || 0
};
```

## 🚀 Tính Phí Vận Chuyển (Tùy chọn)

Để tích hợp tính phí vận chuyển thực tế:

1. **Đăng ký API từ nhà cung cấp:**
   - GHN: https://api.ghn.vn
   - GHTK: https://services.giaohangtietkiem.vn
   - Viettel Post: https://api.viettelpost.vn

2. **Tạo service tính phí:**
   ```js
   // backend/services/shippingService.js
   export const calculateShippingFee = async (provider, from, to, weight) => {
     // Call API của nhà cung cấp
   };
   ```

3. **Tạo endpoint:**
   ```js
   // backend/routes/shipping.js
   router.post('/calculate', async (req, res) => {
     const { provider, from, to, weight } = req.body;
     const fee = await calculateShippingFee(provider, from, to, weight);
     res.json({ fee });
   });
   ```

## 📦 Seed Data cho Testing

Tạo file `backend/seed-coupons.js` để seed mã giảm giá mẫu:

```js
import Coupon from './models/Coupon.js';

const coupons = [
  {
    code: 'WELCOME10',
    name: 'Chào mừng 10%',
    description: 'Giảm 10% cho đơn hàng đầu tiên',
    discountType: 'percentage',
    discountValue: 10,
    minPurchaseAmount: 50,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  },
  {
    code: 'SAVE20',
    name: 'Tiết kiệm 20 USD',
    description: 'Giảm 20 USD cho đơn hàng trên 200 USD',
    discountType: 'fixed',
    discountValue: 20,
    minPurchaseAmount: 200,
    validFrom: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
];
```

## ✅ Checklist Tích Hợp

- [x] Backend Models (Address, Coupon)
- [x] Backend Routes (addresses, coupons)
- [x] API Client (addressAPI, couponAPI)
- [x] Order Review Component
- [x] Coupon Input Component
- [ ] Tích hợp vào Checkout.jsx
- [ ] Tạo Address Management UI (trang quản lý địa chỉ)
- [ ] Tính phí vận chuyển từ API

## 🎯 Next Steps

1. Hoàn thiện tích hợp vào Checkout.jsx theo hướng dẫn trên
2. Tạo trang quản lý địa chỉ (`/dashboard/addresses`)
3. Tích hợp tính phí vận chuyển (nếu cần)
4. Test toàn bộ flow mua hàng

## 📚 Tài Liệu Thêm

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Kiến trúc dự án
- [TEST_GUIDE.md](./TEST_GUIDE.md) - Hướng dẫn test
