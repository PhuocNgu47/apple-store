/**
 * Input Component
 * Component input text tái sử dụng với label, error message và validation
 * 
 * @param {string} label - Nhãn hiển thị phía trên input
 * @param {string} error - Thông báo lỗi hiển thị phía dưới input
 * @param {string} hint - Gợi ý hiển thị khi không có lỗi
 * @param {boolean} required - Đánh dấu trường bắt buộc (hiển thị dấu *)
 * @param {boolean} fullWidth - Input chiếm toàn bộ chiều rộng
 * @param {string} className - CSS classes tùy chỉnh
 */
import { memo } from 'react';

const Input = memo(({
  label,
  error,
  hint,
  required = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
      {hint && !error && (
        <p className="text-gray-500 text-sm mt-1">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
