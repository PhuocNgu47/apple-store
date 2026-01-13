/**
 * API Response Schemas
 * Định nghĩa structure của API responses
 */

/**
 * User Schema
 */
export const userSchema = {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  email: { type: 'string', required: true },
  phone: { type: 'string', required: false },
  role: { type: 'string', enum: ['customer', 'admin'], required: true },
  avatar: { type: 'string', required: false },
  createdAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
};

/**
 * Product Schema
 */
export const productSchema = {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  description: { type: 'string', required: true },
  category: { type: 'string', required: true },
  price: { type: 'number', required: true },
  originalPrice: { type: 'number', required: false },
  discount: { type: 'number', required: false },
  stock: { type: 'number', required: true },
  image: { type: 'string', required: true },
  images: { type: 'array', required: false },
  rating: { type: 'number', required: false },
  reviews: { type: 'number', required: false },
  sku: { type: 'string', required: false },
  status: { type: 'string', enum: ['active', 'inactive'], required: true },
  createdAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
};

/**
 * Order Schema
 */
export const orderSchema = {
  id: { type: 'string', required: true },
  userId: { type: 'string', required: true },
  user: { type: 'object', required: false },
  items: { type: 'array', required: true },
  shippingAddress: { type: 'object', required: true },
  totalAmount: { type: 'number', required: true },
  discountAmount: { type: 'number', required: false },
  shippingFee: { type: 'number', required: false },
  status: {
    type: 'string',
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    required: true,
  },
  paymentStatus: {
    type: 'string',
    enum: ['unpaid', 'paid', 'failed'],
    required: true,
  },
  paymentMethod: { type: 'string', required: true },
  trackingNumber: { type: 'string', required: false },
  notes: { type: 'string', required: false },
  createdAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
};

/**
 * Cart Item Schema
 */
export const cartItemSchema = {
  id: { type: 'string', required: true },
  productId: { type: 'string', required: true },
  product: { type: 'object', required: false },
  quantity: { type: 'number', required: true, min: 1 },
  price: { type: 'number', required: true },
  discount: { type: 'number', required: false },
  total: { type: 'number', required: true },
};

/**
 * Review Schema
 */
export const reviewSchema = {
  id: { type: 'string', required: true },
  productId: { type: 'string', required: true },
  userId: { type: 'string', required: true },
  user: { type: 'object', required: false },
  rating: { type: 'number', required: true, min: 1, max: 5 },
  comment: { type: 'string', required: true },
  verified: { type: 'boolean', required: true },
  helpful: { type: 'number', required: false },
  createdAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
};

/**
 * Category Schema
 */
export const categorySchema = {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  description: { type: 'string', required: false },
  image: { type: 'string', required: false },
  slug: { type: 'string', required: true },
  productCount: { type: 'number', required: false },
  createdAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
};

/**
 * Coupon Schema
 */
export const couponSchema = {
  id: { type: 'string', required: true },
  code: { type: 'string', required: true },
  description: { type: 'string', required: false },
  discountType: { type: 'string', enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: 'number', required: true },
  minPurchase: { type: 'number', required: false },
  maxUses: { type: 'number', required: true },
  usedCount: { type: 'number', required: true },
  expiryDate: { type: 'date', required: true },
  active: { type: 'boolean', required: true },
  createdAt: { type: 'date', required: true },
  updatedAt: { type: 'date', required: true },
};

/**
 * Paginated Response Schema
 */
export const paginatedResponseSchema = {
  data: { type: 'array', required: true },
  pagination: {
    type: 'object',
    properties: {
      page: { type: 'number' },
      pageSize: { type: 'number' },
      total: { type: 'number' },
      totalPages: { type: 'number' },
    },
  },
};

/**
 * API Error Response Schema
 */
export const errorResponseSchema = {
  success: { type: 'boolean', required: true },
  message: { type: 'string', required: true },
  errors: { type: 'object', required: false },
  statusCode: { type: 'number', required: true },
};
