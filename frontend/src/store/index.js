/**
 * Zustand Store
 * Quản lý state toàn cục của ứng dụng
 */

import { create } from 'zustand';

// ============================================
// AUTH STORE
// ============================================

/**
 * Store quản lý trạng thái authentication
 * Lưu thông tin user, token, loading state
 */
export const useAuthStore = create((set) => {
  // Safely get initial token from localStorage only in browser environment
  let initialToken = null;
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      initialToken = localStorage.getItem('token') || null;
    } catch (error) {
      console.error('Lỗi đọc token từ localStorage:', error);
      initialToken = null;
    }
  }

  return {
  // State
  user: null,                                    // Thông tin user hiện tại
  token: initialToken,  // JWT token (lưu trong localStorage)
  isLoading: false,                              // Trạng thái đang tải
  error: null,                                   // Lỗi (nếu có)

  // Actions
  /**
   * Set thông tin user
   * @param {Object} user - Thông tin user { id, name, email, role }
   */
  setUser: (user) => set({ user }),

  /**
   * Set token và lưu vào localStorage
   * @param {String} token - JWT token
   */
  setToken: (token) => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
    set({ token });
  },

  /**
   * Đăng xuất
   * Xóa token và thông tin user
   */
  logout: () => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
    set({ 
      user: null, 
      token: null,
      error: null 
    });
  },

  /**
   * Set trạng thái loading
   * @param {Boolean} isLoading - Trạng thái loading
   */
  setLoading: (isLoading) => set({ isLoading }),

  /**
   * Set lỗi
   * @param {String|Object|null} error - Thông tin lỗi
   */
  setError: (error) => set({ error })
  };
});

// ============================================
// CART STORE
// ============================================

/**
 * Store quản lý giỏ hàng
 * Lưu danh sách sản phẩm trong giỏ hàng (persist trong localStorage)
 */
export const useCartStore = create((set, get) => {
  // Safely get initial cart from localStorage only in browser environment
  let initialCart = [];
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      const cartData = localStorage.getItem('cart');
      initialCart = cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Lỗi đọc giỏ hàng từ localStorage:', error);
      initialCart = [];
    }
  }

  return {
  // State - Khởi tạo từ localStorage hoặc mảng rỗng
  items: initialCart,

  /**
   * Thêm sản phẩm vào giỏ hàng
   * Nếu sản phẩm đã có, tăng số lượng
   * 
   * @param {Object} product - Thông tin sản phẩm { _id, name, price, image }
   * @param {Number} quantity - Số lượng thêm vào (mặc định: 1)
   */
  addToCart: (product, quantity = 1) => {
    const items = [...get().items]; // Copy mảng để tránh mutation trực tiếp
    const existingItemIndex = items.findIndex(item => item.id === product._id);
    
    if (existingItemIndex >= 0) {
      // Sản phẩm đã có trong giỏ hàng -> tăng số lượng
      items[existingItemIndex].quantity += quantity;
    } else {
      // Sản phẩm mới -> thêm vào giỏ hàng
      items.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
    }
    
    // Lưu vào localStorage và cập nhật state
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
    set({ items });
  },

  /**
   * Xóa sản phẩm khỏi giỏ hàng
   * @param {String} productId - ID của sản phẩm cần xóa
   */
  removeFromCart: (productId) => {
    const items = get().items.filter(item => item.id !== productId);
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(items));
    }
    set({ items });
  },

  /**
   * Cập nhật số lượng sản phẩm trong giỏ hàng
   * Nếu số lượng <= 0, tự động xóa sản phẩm
   * 
   * @param {String} productId - ID của sản phẩm
   * @param {Number} quantity - Số lượng mới
   */
  updateQuantity: (productId, quantity) => {
    const items = [...get().items];
    const itemIndex = items.findIndex(item => item.id === productId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Xóa sản phẩm nếu số lượng <= 0
        items.splice(itemIndex, 1);
      } else {
        // Cập nhật số lượng
        items[itemIndex].quantity = quantity;
      }
      
      // Lưu vào localStorage và cập nhật state
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(items));
      }
      set({ items });
    }
  },

  /**
   * Xóa toàn bộ giỏ hàng
   */
  clearCart: () => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('cart');
    }
    set({ items: [] });
  },

  /**
   * Tính tổng tiền trong giỏ hàng
   * @returns {Number} - Tổng tiền
   */
  getTotalPrice: () => {
    return get().items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  },

  /**
   * Tính tổng số lượng sản phẩm trong giỏ hàng
   * @returns {Number} - Tổng số lượng
   */
  getTotalItems: () => {
    return get().items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }
  };
});
