/**
 * API Client
 * Cấu hình Axios và định nghĩa các API endpoints
 */

import axios from 'axios';

// Lấy URL API từ biến môi trường hoặc dùng giá trị mặc định
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Tạo instance Axios với cấu hình mặc định
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Timeout 10 giây
  headers: {
    'Content-Type': 'application/json'
  }
});

// ============================================
// REQUEST INTERCEPTOR
// ============================================

/**
 * Interceptor để thêm token vào mọi request
 * Tự động lấy token từ localStorage và thêm vào header Authorization
 */
api.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');

    // Nếu có token, thêm vào header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);

// ============================================
// RESPONSE INTERCEPTOR
// ============================================

/**
 * Interceptor để xử lý response và lỗi
 * Tự động xử lý lỗi 401 (unauthorized) để logout user
 */
api.interceptors.response.use(
  (response) => {
    // Trả về response thành công
    return response;
  },
  (error) => {
    // Xử lý lỗi response
    if (error.response) {
      const { status } = error.response;

      // Nếu token hết hạn hoặc không hợp lệ (401), xóa token và redirect
      if (status === 401) {
        localStorage.removeItem('token');
        // Chỉ redirect nếu không phải ở trang login/register
        if (!window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

// ============================================
// AUTH API
// ============================================

/**
 * API cho Authentication
 * Đăng ký, đăng nhập, xác thực token
 */
export const authAPI = {
  /**
   * Đăng ký tài khoản mới
   * @param {Object} data - Thông tin đăng ký { name, email, password, confirmPassword }
   */
  register: (data) => api.post('/auth/register', data),

  /**
   * Đăng nhập
   * @param {Object} data - Thông tin đăng nhập { email, password }
   */
  login: (data) => api.post('/auth/login', data),

  /**
   * Xác thực token hiện tại
   * Dùng để kiểm tra token còn hợp lệ không khi reload trang
   */
  verify: () => api.post('/auth/verify')
};

// ============================================
// PRODUCT API
// ============================================

/**
 * API cho Product
 * CRUD operations cho sản phẩm
 */
export const productAPI = {
  /**
   * Lấy danh sách sản phẩm
   * @param {Object} params - Query params { page, limit, category, search }
   */
  getAll: (params) => api.get('/products', { params }),

  /**
   * Lấy thông tin chi tiết sản phẩm
   * @param {String} id - ID của sản phẩm
   */
  getOne: (id) => api.get(`/products/${id}`),

  /**
   * Tạo sản phẩm mới (Admin only)
   * @param {Object} data - Thông tin sản phẩm
   */
  create: (data) => api.post('/products', data),

  /**
   * Cập nhật sản phẩm (Admin only)
   * @param {String} id - ID của sản phẩm
   * @param {Object} data - Dữ liệu cập nhật
   */
  update: (id, data) => api.put(`/products/${id}`, data),

  /**
   * Xóa sản phẩm (Admin only)
   * @param {String} id - ID của sản phẩm
   */
  delete: (id) => api.delete(`/products/${id}`),

  /**
   * Thêm đánh giá cho sản phẩm
   * @param {String} id - ID của sản phẩm
   * @param {Object} data - Thông tin đánh giá { rating, comment }
   */
  addReview: (id, data) => api.post(`/products/${id}/reviews`, data),

  /**
   * Lấy danh sách reviews của sản phẩm
   * @param {String} id - ID của sản phẩm
   * @param {Object} params - Query params { page, limit, sort }
   */
  getReviews: (id, params) => api.get(`/products/${id}/reviews`, { params })
};

// ============================================
// ORDER API
// ============================================

/**
 * API cho Order
 * Quản lý đơn hàng
 */
export const orderAPI = {
  /**
   * Lấy danh sách đơn hàng của user hiện tại (hoặc tất cả nếu là admin)
   */
  getAll: () => api.get('/orders'),

  /**
   * Lấy thông tin chi tiết đơn hàng
   * @param {String} id - ID của đơn hàng
   */
  getOne: (id) => api.get(`/orders/${id}`),

  /**
   * Tạo đơn hàng mới
   * @param {Object} data - Thông tin đơn hàng { items, shippingAddress, paymentMethod }
   */
  create: (data) => api.post('/orders', data),

  /**
   * Cập nhật đơn hàng (Admin only)
   * @param {String} id - ID của đơn hàng
   * @param {Object} data - Dữ liệu cập nhật
   */
  update: (id, data) => api.put(`/orders/${id}`, data),

  /**
   * Cập nhật trạng thái đơn hàng (Admin only)
   * @param {String} id - ID của đơn hàng
   * @param {String} status - Trạng thái mới ('pending', 'confirmed', 'shipped', 'delivered')
   */
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status })
};

// ============================================
// USER API
// ============================================

/**
 * API cho User
 * Quản lý thông tin người dùng
 */
export const userAPI = {
  /**
   * Lấy thông tin profile của user hiện tại
   */
  getProfile: () => api.get('/users/profile'),

  /**
   * Cập nhật thông tin profile
   * @param {Object} data - Thông tin cập nhật { name, phone, address, city, country }
   */
  updateProfile: (data) => api.put('/users/profile', data),

  /**
   * Lấy danh sách tất cả users (Admin only)
   */
  getAll: () => api.get('/users'),

  /**
   * Cập nhật role của user (Admin only)
   * @param {String} id - ID của user
   * @param {String} role - Role mới ('user' hoặc 'admin')
   */
  updateRole: (id, role) => api.put(`/users/${id}/role`, { role }),

  /**
   * Xóa user (Admin only)
   * @param {String} id - ID của user
   */
  deleteUser: (id) => api.delete(`/users/${id}`)
};

// ============================================
// STATISTICS API
// ============================================

/**
 * API cho Statistics (Admin only)
 */
export const statisticsAPI = {
  /**
   * Lấy thống kê tổng quan
   */
  getOverview: () => api.get('/statistics/overview'),

  /**
   * Lấy thống kê doanh thu
   * @param {String} period - Kỳ thống kê ('7days', '30days', '90days', 'year')
   */
  getRevenue: (period) => api.get('/statistics/revenue', { params: { period } }),

  /**
   * Lấy thống kê đơn hàng
   */
  getOrders: () => api.get('/statistics/orders'),

  /**
   * Lấy thống kê sản phẩm
   */
  getProducts: () => api.get('/statistics/products'),

  /**
   * Lấy đơn hàng gần đây
   * @param {Number} limit - Số lượng đơn hàng
   */
  getRecentOrders: (limit) => api.get('/statistics/recent-orders', { params: { limit } })
};

// ============================================
// ADDRESS API
// ============================================

/**
 * API cho Address Management
 * Quản lý địa chỉ giao hàng
 */
export const addressAPI = {
  /**
   * Lấy danh sách địa chỉ của user
   */
  getAll: () => api.get('/addresses'),

  /**
   * Lấy chi tiết một địa chỉ
   * @param {String} id - ID của địa chỉ
   */
  getOne: (id) => api.get(`/addresses/${id}`),

  /**
   * Tạo địa chỉ mới
   * @param {Object} data - Thông tin địa chỉ
   */
  create: (data) => api.post('/addresses', data),

  /**
   * Cập nhật địa chỉ
   * @param {String} id - ID của địa chỉ
   * @param {Object} data - Dữ liệu cập nhật
   */
  update: (id, data) => api.put(`/addresses/${id}`, data),

  /**
   * Xóa địa chỉ
   * @param {String} id - ID của địa chỉ
   */
  delete: (id) => api.delete(`/addresses/${id}`),

  /**
   * Đặt địa chỉ làm mặc định
   * @param {String} id - ID của địa chỉ
   */
  setDefault: (id) => api.patch(`/addresses/${id}/set-default`)
};

// ============================================
// COUPON API
// ============================================

/**
 * API cho Coupon/Voucher
 */
export const couponAPI = {
  /**
   * Validate và tính discount của coupon
   * @param {String} code - Mã giảm giá
   * @param {Number} subtotal - Tổng tiền đơn hàng
   */
  validate: (code, subtotal) => api.post('/coupons/validate', { code, subtotal }),

  /**
   * Lấy danh sách coupon (Admin only)
   */
  getAll: () => api.get('/coupons'),

  /**
   * Tạo coupon mới (Admin only)
   * @param {Object} data - Thông tin coupon
   */
  create: (data) => api.post('/coupons', data),

  /**
   * Cập nhật coupon (Admin only)
   * @param {String} id - ID của coupon
   * @param {Object} data - Dữ liệu cập nhật
   */
  update: (id, data) => api.put(`/coupons/${id}`, data),

  /**
   * Xóa coupon (Admin only)
   * @param {String} id - ID của coupon
   */
  delete: (id) => api.delete(`/coupons/${id}`)
};

// Export default instance để có thể dùng trực tiếp nếu cần
export default api;
