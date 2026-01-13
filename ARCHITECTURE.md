# 🏗️ Kiến Trúc Dự Án

Tài liệu mô tả kiến trúc và cấu trúc code của dự án E-commerce.

## 📋 Tổng Quan

Dự án sử dụng **Feature-Based Architecture** - tổ chức code theo tính năng thay vì theo loại file. Điều này giúp:
- ✅ Dễ tìm và maintain code
- ✅ Tái sử dụng components và hooks
- ✅ Dễ mở rộng và test
- ✅ Tách biệt logic rõ ràng

## 🗂️ Cấu Trúc Thư Mục

### Frontend Structure

```
frontend/src/
├── features/              # Feature modules (tổ chức theo tính năng)
│   ├── admin/            # Admin features
│   │   ├── components/    # Admin-specific components
│   │   │   ├── StatsCard.jsx
│   │   │   ├── OrdersTable.jsx
│   │   │   ├── ProductsTable.jsx
│   │   │   └── index.js
│   │   └── index.js      # Export tất cả
│   │
│   ├── cart/             # Cart features
│   │   ├── components/
│   │   │   ├── CartEmpty.jsx
│   │   │   ├── CartItemsList.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── index.js
│   │   └── index.js
│   │
│   ├── orders/           # Order features
│   │   ├── components/
│   │   │   ├── OrderCard.jsx
│   │   │   ├── OrdersList.jsx
│   │   │   └── index.js
│   │   ├── hooks/
│   │   │   ├── useOrders.js
│   │   │   └── index.js
│   │   └── index.js
│   │
│   └── user/             # User features
│       ├── components/
│       │   ├── ProfileCard.jsx
│       │   ├── ProfileForm.jsx
│       │   ├── UserStats.jsx
│       │   └── index.js
│       ├── hooks/
│       │   ├── useProfile.js
│       │   ├── useUserStats.js
│       │   └── index.js
│       └── index.js
│
├── pages/                 # Page components (route handlers)
│   ├── Home.jsx
│   ├── Cart.jsx
│   ├── Orders.jsx
│   ├── Dashboard.jsx
│   ├── AdminDashboard.jsx
│   └── ...
│
├── components/            # Shared components (dùng chung)
│   ├── UI/               # UI primitives
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Loader.jsx
│   │   └── index.js
│   ├── ProductCard.jsx
│   ├── Navbar.jsx
│   └── Footer.jsx
│
├── hooks/                 # Shared hooks
│   ├── useApi.js
│   ├── useForm.js
│   └── useModal.js
│
├── store/                 # Zustand stores
│   └── index.js          # Auth store, Cart store
│
├── api/                   # API client
│   └── index.js          # productAPI, orderAPI, userAPI, etc.
│
├── utils/                 # Utility functions
│   ├── formatters.js     # formatCurrency, formatDate
│   ├── validators.js
│   └── index.js
│
└── config/                # Configuration
    ├── routes.jsx         # Route definitions
    └── api.js             # API config
```

### Backend Structure

```
backend/
├── models/                # Mongoose schemas
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   ├── Address.js
│   └── Coupon.js
│
├── routes/                # API endpoints
│   ├── auth.js
│   ├── products.js
│   ├── orders.js
│   ├── users.js
│   ├── statistics.js
│   └── payment.js
│
├── middleware/            # Express middleware
│   └── auth.js           # JWT authentication
│
├── services/             # Business logic
│   └── emailService.js   # Email notifications
│
├── utils/                 # Helper functions
│   └── ...
│
└── server.js             # Entry point
```

## 🎯 Feature-Based Organization

### Ví dụ: Feature `orders`

```javascript
// features/orders/hooks/useOrders.js
export const useOrders = (token) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // ... logic
  return { orders, loading, error, refetch };
};

// features/orders/components/OrderCard.jsx
export default function OrderCard({ order }) {
  // Component hiển thị một order
}

// features/orders/index.js
export * from './components';
export * from './hooks';
```

**Sử dụng trong page:**
```javascript
// pages/Orders.jsx
import { OrdersList, useOrders } from '../features/orders';

export default function Orders() {
  const { orders, loading } = useOrders(token);
  return <OrdersList orders={orders} />;
}
```

## 🔄 Data Flow

### 1. User Action → API Call → State Update

```
User clicks "Add to Cart"
  ↓
CartStore.addItem(product)
  ↓
API call (optional - nếu lưu vào DB)
  ↓
Update Zustand store
  ↓
UI re-render
```

### 2. Page Load → Fetch Data → Display

```
Page mounts
  ↓
useOrders hook fetches data
  ↓
API call to /api/orders
  ↓
Update state (orders, loading, error)
  ↓
Render components
```

## 🎨 Component Hierarchy

### Example: Cart Page

```
Cart (page)
  ├── CartEmpty (nếu giỏ trống)
  └── CartItemsList (nếu có items)
      ├── CartItem (mỗi item)
      └── CartSummary
          └── Checkout Button
```

### Example: Admin Dashboard

```
AdminDashboard (page)
  ├── StatsCard (x4)
  ├── OrderStatusChart
  ├── RecentOrdersList
  │   └── OrderCard (x5)
  └── LowStockAlert
```

## 🔌 API Integration

### API Client Structure

```javascript
// api/index.js
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getOne: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  // ...
};

export const orderAPI = {
  getAll: () => api.get('/orders'),
  create: (data) => api.post('/orders', data),
  // ...
};
```

### Custom Hooks Pattern

```javascript
// features/orders/hooks/useOrders.js
export const useOrders = (token) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderAPI.getAll();
        setOrders(res.data.orders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchOrders();
  }, [token]);

  return { orders, loading, error, refetch: fetchOrders };
};
```

## 📦 State Management

### Zustand Stores

```javascript
// store/index.js
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  login: (user, token) => set({ user, token }),
  logout: () => set({ user: null, token: null }),
}));

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => { /* ... */ },
      removeItem: (id) => { /* ... */ },
    }),
    { name: 'cart-storage' }
  )
);
```

## 🔐 Authentication Flow

```
1. User submits login form
   ↓
2. POST /api/auth/login
   ↓
3. Backend validates credentials
   ↓
4. Returns JWT token
   ↓
5. Frontend stores token in Zustand + localStorage
   ↓
6. API interceptor adds token to headers
   ↓
7. Protected routes check auth state
```

## 🎯 Best Practices

### 1. Feature Isolation
- Mỗi feature tự chứa components và hooks
- Không import trực tiếp giữa các features
- Dùng shared components khi cần

### 2. Component Composition
- Tách nhỏ components
- Mỗi component có một responsibility
- Tái sử dụng qua props

### 3. Custom Hooks
- Tách logic ra hooks
- Hooks có thể dùng chung hoặc feature-specific
- Dễ test và maintain

### 4. API Layer
- Tất cả API calls qua api client
- Centralized error handling
- Consistent response format

## 📚 Tài Liệu Thêm

- [README.md](./README.md) - Tổng quan dự án
- [QUICK_START.md](./QUICK_START.md) - Hướng dẫn nhanh
- [CODE_EXAMPLES.md](./CODE_EXAMPLES.md) - Ví dụ code

