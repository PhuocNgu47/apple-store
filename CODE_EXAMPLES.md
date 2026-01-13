# 💻 Code Examples - E-commerce Best Practices

> Các ví dụ code thực tế áp dụng cho dự án

---

## 📋 Mục Lục

1. [Backend Examples](#backend-examples)
2. [Frontend Examples](#frontend-examples)
3. [Common Patterns](#common-patterns)

---

## 🔧 Backend Examples

### 1. **Service Layer Pattern**

#### `services/orderService.js`

```javascript
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { sendOrderConfirmationEmail } from './emailService.js';

/**
 * Tạo đơn hàng mới với validation và stock management
 */
export const createOrder = async (userId, items, shippingAddress, paymentMethod) => {
  // 1. Validate input
  if (!items || items.length === 0) {
    throw new Error('Giỏ hàng trống');
  }

  if (!shippingAddress?.phone || !shippingAddress?.address) {
    throw new Error('Thông tin giao hàng không đầy đủ');
  }

  // 2. Validate và tính toán giá
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    
    if (!product) {
      throw new Error(`Sản phẩm ${item.productId} không tồn tại`);
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `Sản phẩm ${product.name} chỉ còn ${product.stock} sản phẩm`
      );
    }

    // Sử dụng giá hiện tại (có thể thay đổi)
    const itemPrice = product.price;
    const itemTotal = itemPrice * item.quantity;
    totalAmount += itemTotal;

    orderItems.push({
      productId: product._id,
      quantity: item.quantity,
      price: itemPrice
    });
  }

  // 3. Tạo order
  const order = await Order.create({
    userId,
    items: orderItems,
    shippingAddress,
    paymentMethod,
    totalAmount,
    status: 'pending',
    paymentStatus: paymentMethod === 'cash_on_delivery' ? 'pending' : 'pending'
  });

  // 4. Trừ stock
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: -item.quantity }
    });
  }

  // 5. Gửi email xác nhận
  try {
    await sendOrderConfirmationEmail(order);
  } catch (error) {
    console.error('Lỗi gửi email:', error);
    // Không throw error, vì order đã được tạo thành công
  }

  return order;
};

/**
 * Hủy đơn hàng và hoàn lại stock
 */
export const cancelOrder = async (orderId, userId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Đơn hàng không tồn tại');
  }

  if (order.userId.toString() !== userId) {
    throw new Error('Không có quyền hủy đơn hàng này');
  }

  if (!['pending', 'confirmed'].includes(order.status)) {
    throw new Error('Không thể hủy đơn hàng ở trạng thái này');
  }

  // Hoàn lại stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { stock: item.quantity }
    });
  }

  order.status = 'cancelled';
  await order.save();

  return order;
};
```

#### `routes/orders.js` - Sử dụng Service

```javascript
import express from 'express';
import { protect } from '../middleware/auth.js';
import { createOrder, cancelOrder } from '../services/orderService.js';
import Order from '../models/Order.js';

const router = express.Router();

// Tạo đơn hàng
router.post('/', protect, async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;
    
    const order = await createOrder(
      req.user.id,
      items,
      shippingAddress,
      paymentMethod
    );

    res.status(201).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Hủy đơn hàng
router.patch('/:id/cancel', protect, async (req, res) => {
  try {
    const order = await cancelOrder(req.params.id, req.user.id);
    
    res.json({
      success: true,
      order
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
```

---

### 2. **Validation Middleware**

#### `middleware/validation.js`

```javascript
import { body, validationResult } from 'express-validator';

/**
 * Validation cho đăng ký
 */
export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Email không hợp lệ')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Mật khẩu phải có ít nhất 6 ký tự')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Mật khẩu phải có chữ hoa, chữ thường và số'),
  
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Tên phải từ 2-50 ký tự'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];

/**
 * Validation cho checkout
 */
export const validateCheckout = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Giỏ hàng không được trống'),
  
  body('items.*.productId')
    .isMongoId()
    .withMessage('ID sản phẩm không hợp lệ'),
  
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Số lượng phải lớn hơn 0'),
  
  body('shippingAddress.name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Tên người nhận không hợp lệ'),
  
  body('shippingAddress.phone')
    .matches(/^[0-9]{10}$/)
    .withMessage('Số điện thoại phải có 10 chữ số'),
  
  body('shippingAddress.address')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Địa chỉ quá ngắn'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
```

---

### 3. **Error Handler Middleware**

#### `middleware/errorHandler.js`

```javascript
/**
 * Custom Error Class
 */
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global Error Handler
 */
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Lỗi máy chủ nội bộ';

  // Log error
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field} đã tồn tại`
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token đã hết hạn'
    });
  }

  // Default error
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
```

---

### 4. **Product Search với Filter**

#### `routes/products.js`

```javascript
import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

/**
 * GET /api/products
 * Tìm kiếm và lọc sản phẩm
 */
router.get('/', async (req, res) => {
  try {
    const {
      search,        // Tìm kiếm tên
      category,      // Lọc theo danh mục
      minPrice,      // Giá tối thiểu
      maxPrice,      // Giá tối đa
      inStock,       // Chỉ sản phẩm còn hàng
      sort = 'createdAt',  // Sắp xếp
      order = 'desc',     // Thứ tự
      page = 1,      // Trang
      limit = 12     // Số sản phẩm/trang
    } = req.query;

    // Build query
    const query = {};

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by stock
    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    // Sort
    const sortOptions = {};
    if (sort === 'price') {
      sortOptions.price = order === 'asc' ? 1 : -1;
    } else if (sort === 'rating') {
      sortOptions.rating = order === 'asc' ? 1 : -1;
    } else {
      sortOptions.createdAt = order === 'asc' ? 1 : -1;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum)
        .select('-reviews'), // Không trả về reviews để giảm payload
      Product.countDocuments(query)
    ]);

    res.json({
      success: true,
      products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
```

---

## 🎨 Frontend Examples

### 1. **Custom Hook: useProducts**

#### `hooks/useProducts.js`

```javascript
import { useState, useEffect } from 'react';
import api from '../services/api';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category) params.append('category', filters.category);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.sort) params.append('sort', filters.sort);
        if (filters.page) params.append('page', filters.page);

        const response = await api.get(`/products?${params}`);
        
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } catch (err) {
        setError(err.response?.data?.message || 'Lỗi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return { products, loading, error, pagination };
};
```

#### Sử dụng trong Component

```javascript
import { useProducts } from '../hooks/useProducts';

const ProductList = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    page: 1
  });

  const { products, loading, error, pagination } = useProducts(filters);

  if (loading) return <ProductSkeleton />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      <FilterBar filters={filters} onChange={setFilters} />
      <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination 
        current={pagination.page} 
        total={pagination.pages}
        onChange={(page) => setFilters({ ...filters, page })}
      />
    </div>
  );
};
```

---

### 2. **Cart Management với Zustand**

#### `store/cartStore.js`

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingItem = items.find(item => item.productId === product._id);

        if (existingItem) {
          set({
            items: items.map(item =>
              item.productId === product._id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...items, {
              productId: product._id,
              product: product, // Lưu thông tin sản phẩm để hiển thị
              quantity,
              price: product.price
            }]
          });
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter(item => item.productId !== productId)
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          )
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'cart-storage', // Tên trong localStorage
    }
  )
);
```

#### Sử dụng trong Component

```javascript
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addItem, getItemCount } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success('Đã thêm vào giỏ hàng!');
  };

  const itemCount = getItemCount();

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString('vi-VN')} đ</p>
      <button onClick={handleAddToCart}>
        Thêm vào giỏ ({itemCount})
      </button>
    </div>
  );
};
```

---

### 3. **Form với React Hook Form + Zod**

#### `components/Forms/CheckoutForm.jsx`

```javascript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../../services/api';
import toast from 'react-hot-toast';

const checkoutSchema = z.object({
  name: z.string()
    .min(2, 'Tên phải có ít nhất 2 ký tự')
    .max(50, 'Tên quá dài'),
  
  phone: z.string()
    .regex(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số'),
  
  address: z.string()
    .min(10, 'Địa chỉ quá ngắn')
    .max(200, 'Địa chỉ quá dài'),
  
  city: z.string()
    .min(1, 'Vui lòng chọn thành phố'),
  
  paymentMethod: z.enum(['cash_on_delivery', 'qr_transfer'], {
    errorMap: () => ({ message: 'Vui lòng chọn phương thức thanh toán' })
  })
});

const CheckoutForm = ({ cartItems, onSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cash_on_delivery'
    }
  });

  const onSubmit = async (data) => {
    try {
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress: {
          name: data.name,
          phone: data.phone,
          address: data.address,
          city: data.city
        },
        paymentMethod: data.paymentMethod
      };

      const response = await api.post('/orders', orderData);
      
      toast.success('Đặt hàng thành công!');
      onSuccess(response.data.order);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>Tên người nhận</label>
        <input
          {...register('name')}
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label>Số điện thoại</label>
        <input
          {...register('phone')}
          className={errors.phone ? 'border-red-500' : ''}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{errors.phone.message}</span>
        )}
      </div>

      <div>
        <label>Địa chỉ</label>
        <textarea
          {...register('address')}
          rows={3}
          className={errors.address ? 'border-red-500' : ''}
        />
        {errors.address && (
          <span className="text-red-500 text-sm">{errors.address.message}</span>
        )}
      </div>

      <div>
        <label>Thành phố</label>
        <select {...register('city')}>
          <option value="">Chọn thành phố</option>
          <option value="hcm">TP. Hồ Chí Minh</option>
          <option value="hn">Hà Nội</option>
          <option value="dn">Đà Nẵng</option>
        </select>
        {errors.city && (
          <span className="text-red-500 text-sm">{errors.city.message}</span>
        )}
      </div>

      <div>
        <label>Phương thức thanh toán</label>
        <div className="space-y-2">
          <label>
            <input
              type="radio"
              {...register('paymentMethod')}
              value="cash_on_delivery"
            />
            Thanh toán khi nhận hàng (COD)
          </label>
          <label>
            <input
              type="radio"
              {...register('paymentMethod')}
              value="qr_transfer"
            />
            Chuyển khoản QR
          </label>
        </div>
        {errors.paymentMethod && (
          <span className="text-red-500 text-sm">
            {errors.paymentMethod.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full"
      >
        {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
      </button>
    </form>
  );
};

export default CheckoutForm;
```

---

### 4. **Error Boundary Component**

#### `components/ErrorBoundary.jsx`

```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // Có thể gửi lỗi lên error tracking service (Sentry, etc.)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Đã có lỗi xảy ra
            </h2>
            <p className="text-gray-600 mb-4">
              Vui lòng thử lại sau
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

#### Sử dụng trong App

```javascript
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* ... routes ... */}
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
```

---

## 🔄 Common Patterns

### 1. **API Response Wrapper**

#### Backend: Luôn trả về format nhất quán

```javascript
// utils/response.js
export const successResponse = (data, message = 'Thành công') => {
  return {
    success: true,
    message,
    data
  };
};

export const errorResponse = (message = 'Có lỗi xảy ra', errors = null) => {
  return {
    success: false,
    message,
    ...(errors && { errors })
  };
};

// Sử dụng
res.json(successResponse(order, 'Đặt hàng thành công'));
res.status(400).json(errorResponse('Dữ liệu không hợp lệ', validationErrors));
```

### 2. **Async Error Handler Wrapper**

```javascript
// utils/asyncHandler.js
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Sử dụng - không cần try-catch
router.get('/products', asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(successResponse(products));
}));
```

### 3. **Pagination Helper**

```javascript
// utils/pagination.js
export const getPagination = (page = 1, limit = 10) => {
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
  const skip = (pageNum - 1) * limitNum;

  return { page: pageNum, limit: limitNum, skip };
};

export const getPaginationMeta = (page, limit, total) => {
  return {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
    hasNext: page * limit < total,
    hasPrev: page > 1
  };
};
```

---

## 📝 Notes

- ✅ **Luôn validate input** ở cả frontend và backend
- ✅ **Xử lý lỗi đầy đủ** với thông báo rõ ràng
- ✅ **Tách business logic** ra service layer
- ✅ **Sử dụng TypeScript** nếu có thể (type safety)
- ✅ **Code reusability** - tạo custom hooks/components
- ✅ **Consistent naming** - camelCase cho JS, PascalCase cho components

---

*Các ví dụ này có thể áp dụng trực tiếp vào dự án của bạn!*

