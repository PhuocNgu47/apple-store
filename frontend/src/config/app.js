/**
 * App Configuration
 */
export const APP_CONFIG = {
  // App metadata
  APP_NAME: 'Apple Store',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Premium Apple Products E-commerce Store',

  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 100,
  },

  // Product
  PRODUCT: {
    MIN_PRICE: 0,
    MAX_PRICE: 100000000,
    DEFAULT_SORT: 'newest',
  },

  // Order
  ORDER: {
    STATUS: {
      PENDING: 'pending',
      PROCESSING: 'processing',
      SHIPPED: 'shipped',
      DELIVERED: 'delivered',
      CANCELLED: 'cancelled',
    },
    PAYMENT_STATUS: {
      UNPAID: 'unpaid',
      PAID: 'paid',
      FAILED: 'failed',
    },
  },

  // User roles
  USER_ROLES: {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
  },

  // Toast messages
  TOAST: {
    DURATION: 3000,
    POSITION: 'top-center',
  },

  // Currency
  CURRENCY: {
    SYMBOL: '₫',
    CODE: 'VND',
  },
};

export default APP_CONFIG;
