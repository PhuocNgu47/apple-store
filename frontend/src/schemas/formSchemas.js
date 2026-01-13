/**
 * Validation Schemas
 * Tập trung định nghĩa validation rules cho forms
 */

/**
 * Login Form Schema
 */
export const loginSchema = {
  email: {
    required: true,
    type: 'email',
    minLength: 5,
    maxLength: 100,
  },
  password: {
    required: true,
    type: 'password',
    minLength: 6,
    maxLength: 50,
  },
};

/**
 * Register Form Schema
 */
export const registerSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    required: true,
    type: 'email',
    minLength: 5,
    maxLength: 100,
  },
  password: {
    required: true,
    type: 'password',
    minLength: 6,
    maxLength: 50,
  },
  confirmPassword: {
    required: true,
    type: 'password',
    minLength: 6,
    maxLength: 50,
    match: 'password',
  },
  phone: {
    type: 'phone',
    required: false,
  },
};

/**
 * Checkout Form Schema
 */
export const checkoutSchema = {
  fullName: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  phone: {
    required: true,
    type: 'phone',
  },
  email: {
    required: true,
    type: 'email',
  },
  address: {
    required: true,
    minLength: 10,
    maxLength: 200,
  },
  city: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  district: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  ward: {
    required: false,
    minLength: 2,
    maxLength: 50,
  },
  zipCode: {
    required: false,
    minLength: 3,
    maxLength: 10,
  },
  note: {
    required: false,
    maxLength: 500,
  },
  paymentMethod: {
    required: true,
  },
};

/**
 * Profile Update Schema
 */
export const profileSchema = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
    type: 'email',
  },
  phone: {
    required: false,
    type: 'phone',
  },
  avatar: {
    required: false,
    type: 'file',
  },
  bio: {
    required: false,
    maxLength: 500,
  },
};

/**
 * Password Change Schema
 */
export const passwordSchema = {
  currentPassword: {
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  newPassword: {
    required: true,
    minLength: 6,
    maxLength: 50,
  },
  confirmPassword: {
    required: true,
    minLength: 6,
    maxLength: 50,
    match: 'newPassword',
  },
};

/**
 * Product Form Schema (Admin)
 */
export const productSchema = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  description: {
    required: true,
    minLength: 10,
    maxLength: 2000,
  },
  category: {
    required: true,
  },
  price: {
    required: true,
    type: 'number',
    min: 0,
    max: 999999999,
  },
  stock: {
    required: true,
    type: 'number',
    min: 0,
  },
  image: {
    required: false,
    type: 'file',
  },
  images: {
    required: false,
    type: 'file',
  },
  sku: {
    required: false,
    minLength: 2,
    maxLength: 50,
  },
  status: {
    required: true,
  },
};

/**
 * Review/Comment Schema
 */
export const reviewSchema = {
  rating: {
    required: true,
    type: 'number',
    min: 1,
    max: 5,
  },
  comment: {
    required: true,
    minLength: 10,
    maxLength: 1000,
  },
};

/**
 * Search/Filter Schema
 */
export const searchSchema = {
  keyword: {
    required: false,
    maxLength: 100,
  },
  category: {
    required: false,
  },
  minPrice: {
    required: false,
    type: 'number',
    min: 0,
  },
  maxPrice: {
    required: false,
    type: 'number',
    min: 0,
  },
  sort: {
    required: false,
  },
  page: {
    required: false,
    type: 'number',
    min: 1,
  },
};

/**
 * Coupon/Discount Schema
 */
export const couponSchema = {
  code: {
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  discountType: {
    required: true,
  },
  discountValue: {
    required: true,
    type: 'number',
    min: 0,
  },
  maxUses: {
    required: true,
    type: 'number',
    min: 1,
  },
  expiryDate: {
    required: true,
    type: 'date',
  },
};

/**
 * Get schema by form type
 * @param {string} formType - Form type (login, register, etc)
 * @returns {object} - Schema object
 */
export const getSchema = (formType) => {
  const schemas = {
    login: loginSchema,
    register: registerSchema,
    checkout: checkoutSchema,
    profile: profileSchema,
    password: passwordSchema,
    product: productSchema,
    review: reviewSchema,
    search: searchSchema,
    coupon: couponSchema,
  };

  return schemas[formType] || {};
};
