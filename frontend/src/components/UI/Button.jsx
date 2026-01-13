/**
 * Button Component
 * Component button tái sử dụng với nhiều biến thể và kích thước
 * 
 * @param {React.ReactNode} children - Nội dung của button
 * @param {string} variant - Loại button: 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost'
 * @param {string} size - Kích thước: 'sm' | 'md' | 'lg'
 * @param {boolean} disabled - Vô hiệu hóa button
 * @param {boolean} loading - Hiển thị trạng thái loading
 * @param {boolean} fullWidth - Button chiếm toàn bộ chiều rộng
 * @param {string} className - CSS classes tùy chỉnh
 * @param {string} type - Loại button: 'button' | 'submit' | 'reset'
 */
import { memo } from 'react';

const Button = memo(({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded transition-all focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabledStyles}
        ${widthStyles}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
