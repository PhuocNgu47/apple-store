/**
 * API Configuration
 */
export const API_CONFIG = {
  // Base URL cho API calls
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',

  // Timeout cho requests
  TIMEOUT: 10000,

  // Retry configuration
  RETRY: {
    MAX_RETRIES: 3,
    DELAY: 1000,
  },

  // Endpoints
  ENDPOINTS: {
    // Auth
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      VERIFY: '/auth/verify',
      REFRESH: '/auth/refresh',
    },

    // Users
    USERS: {
      PROFILE: '/users/profile',
      UPDATE: '/users/:id',
      LIST: '/users',
    },

    // Products
    PRODUCTS: {
      LIST: '/products',
      GET: '/products/:id',
      CREATE: '/products',
      UPDATE: '/products/:id',
      DELETE: '/products/:id',
      SEARCH: '/products/search',
    },

    // Orders
    ORDERS: {
      LIST: '/orders',
      GET: '/orders/:id',
      CREATE: '/orders',
      UPDATE: '/orders/:id',
      CANCEL: '/orders/:id/cancel',
    },

    // Payment
    PAYMENT: {
      CREATE: '/payment/create',
      VERIFY: '/payment/verify',
      CALLBACK: '/payment/callback',
    },
  },
};

export default API_CONFIG;
