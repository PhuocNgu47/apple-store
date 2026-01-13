import toast from 'react-hot-toast';

/**
 * Notification Service
 * Unified API for showing notifications
 */

/**
 * Show success notification
 * @param {string} message - Message to display
 * @param {object} options - Toast options
 */
export const notifySuccess = (message, options = {}) => {
  return toast.success(message, {
    duration: 3000,
    icon: '✅',
    ...options,
  });
};

/**
 * Show error notification
 * @param {string} message - Message to display
 * @param {object} options - Toast options
 */
export const notifyError = (message, options = {}) => {
  return toast.error(message, {
    duration: 4000,
    icon: '❌',
    ...options,
  });
};

/**
 * Show info notification
 * @param {string} message - Message to display
 * @param {object} options - Toast options
 */
export const notifyInfo = (message, options = {}) => {
  return toast((t) => (
    <div className="flex gap-2">
      <span>ℹ️</span>
      <span>{message}</span>
    </div>
  ), {
    duration: 3000,
    ...options,
  });
};

/**
 * Show warning notification
 * @param {string} message - Message to display
 * @param {object} options - Toast options
 */
export const notifyWarning = (message, options = {}) => {
  return toast((t) => (
    <div className="flex gap-2">
      <span>⚠️</span>
      <span>{message}</span>
    </div>
  ), {
    duration: 3000,
    ...options,
  });
};

/**
 * Show loading notification
 * @param {string} message - Message to display
 */
export const notifyLoading = (message) => {
  return toast.loading(message);
};

/**
 * Update existing notification
 * @param {string} toastId - Toast ID
 * @param {object} options - Update options
 */
export const notifyUpdate = (toastId, options = {}) => {
  toast.custom((t) => (
    <div>{options.message}</div>
  ), { id: toastId, ...options });
};

/**
 * Dismiss notification
 * @param {string} toastId - Toast ID (optional, dismisses all if not provided)
 */
export const notifyDismiss = (toastId) => {
  if (toastId) {
    toast.dismiss(toastId);
  } else {
    toast.dismiss();
  }
};

/**
 * Promise notification
 * @param {Promise} promise - Promise to track
 * @param {object} messages - Success/error/loading messages
 */
export const notifyPromise = (promise, messages) => {
  return toast.promise(
    promise,
    {
      loading: messages.loading || 'Đang xử lý...',
      success: messages.success || 'Thành công!',
      error: messages.error || 'Có lỗi xảy ra',
    }
  );
};

/**
 * Confirm notification
 * @param {string} message - Confirmation message
 * @param {function} onConfirm - Callback when confirmed
 * @param {function} onCancel - Callback when cancelled
 */
export const notifyConfirm = (message, onConfirm, onCancel) => {
  return toast.custom((t) => (
    <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm">
      <p className="mb-4">{message}</p>
      <div className="flex gap-2">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          className="flex-1 bg-blue-600 text-white py-2 rounded"
        >
          Xác Nhận
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onCancel?.();
          }}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded"
        >
          Hủy
        </button>
      </div>
    </div>
  ), {
    duration: Infinity,
  });
};

/**
 * Handle API errors and show notification
 * @param {Error} error - Error object
 * @param {string} defaultMessage - Default message if error has no message
 */
export const notifyApiError = (error, defaultMessage = 'Có lỗi xảy ra') => {
  const message = error.response?.data?.message || error.message || defaultMessage;
  notifyError(message);
};

/**
 * Notification presets for common actions
 */
export const NOTIFICATION_PRESETS = {
  LOGIN_SUCCESS: () => notifySuccess('Đăng nhập thành công'),
  LOGOUT_SUCCESS: () => notifySuccess('Đăng xuất thành công'),
  REGISTER_SUCCESS: () => notifySuccess('Đăng ký thành công'),
  ADD_TO_CART: () => notifySuccess('Thêm vào giỏ hàng thành công'),
  REMOVE_FROM_CART: () => notifySuccess('Xóa khỏi giỏ hàng thành công'),
  CREATE_ORDER: () => notifySuccess('Tạo đơn hàng thành công'),
  PAYMENT_SUCCESS: () => notifySuccess('Thanh toán thành công'),
  PAYMENT_FAILED: () => notifyError('Thanh toán thất bại'),
  PROFILE_UPDATED: () => notifySuccess('Cập nhật hồ sơ thành công'),
  PASSWORD_CHANGED: () => notifySuccess('Thay đổi mật khẩu thành công'),
  PRODUCT_CREATED: () => notifySuccess('Tạo sản phẩm thành công'),
  PRODUCT_UPDATED: () => notifySuccess('Cập nhật sản phẩm thành công'),
  PRODUCT_DELETED: () => notifySuccess('Xóa sản phẩm thành công'),
  INVALID_EMAIL: () => notifyError('Email không hợp lệ'),
  INVALID_PASSWORD: () => notifyError('Mật khẩu không hợp lệ'),
  NETWORK_ERROR: () => notifyError('Lỗi kết nối'),
  SERVER_ERROR: () => notifyError('Lỗi máy chủ'),
};

export default {
  success: notifySuccess,
  error: notifyError,
  info: notifyInfo,
  warning: notifyWarning,
  loading: notifyLoading,
  update: notifyUpdate,
  dismiss: notifyDismiss,
  promise: notifyPromise,
  confirm: notifyConfirm,
  apiError: notifyApiError,
  presets: NOTIFICATION_PRESETS,
};
