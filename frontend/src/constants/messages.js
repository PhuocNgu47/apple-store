/**
 * Messages Constants
 */

export const MESSAGES = {
  // Success messages
  SUCCESS: {
    LOGIN: 'Đăng nhập thành công',
    REGISTER: 'Đăng ký thành công',
    LOGOUT: 'Đăng xuất thành công',
    ADD_TO_CART: 'Thêm vào giỏ hàng thành công',
    REMOVE_FROM_CART: 'Xóa khỏi giỏ hàng thành công',
    UPDATE_CART: 'Cập nhật giỏ hàng thành công',
    CREATE_ORDER: 'Tạo đơn hàng thành công',
    UPDATE_PRODUCT: 'Cập nhật sản phẩm thành công',
    DELETE_PRODUCT: 'Xóa sản phẩm thành công',
    CREATE_PRODUCT: 'Tạo sản phẩm thành công',
    UPDATE_PROFILE: 'Cập nhật hồ sơ thành công',
  },

  // Error messages
  ERROR: {
    INVALID_EMAIL: 'Email không hợp lệ',
    INVALID_PASSWORD: 'Mật khẩu không hợp lệ',
    PASSWORD_MISMATCH: 'Mật khẩu không trùng khớp',
    USER_NOT_FOUND: 'Không tìm thấy người dùng',
    INVALID_CREDENTIALS: 'Email hoặc mật khẩu không chính xác',
    UNAUTHORIZED: 'Bạn không có quyền truy cập',
    FORBIDDEN: 'Cấm truy cập',
    NOT_FOUND: 'Không tìm thấy',
    SERVER_ERROR: 'Lỗi máy chủ',
    NETWORK_ERROR: 'Lỗi kết nối',
    SOMETHING_WENT_WRONG: 'Có gì đó không đúng',
    CART_IS_EMPTY: 'Giỏ hàng trống',
    INSUFFICIENT_STOCK: 'Hết hàng',
  },

  // Confirmation messages
  CONFIRM: {
    DELETE_PRODUCT: 'Bạn chắc chắn muốn xóa sản phẩm này?',
    LOGOUT: 'Bạn chắc chắn muốn đăng xuất?',
    CLEAR_CART: 'Xóa tất cả sản phẩm khỏi giỏ hàng?',
  },
};

export default MESSAGES;
