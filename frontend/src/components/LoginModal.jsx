import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store';
import { authAPI } from '../api';

/**
 * LoginModal - Authentication modal for checkout
 * - Appears during checkout without page navigation
 * - Email/password form with validation
 * - Show/hide password toggle
 * - Loading state
 * - Error handling with toast notifications
 * - Smooth Framer Motion animations
 */
export function LoginModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const { setToken, setUser } = useAuthStore();

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = 'Email là bắt buộc';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải từ 6 ký tự trở lên';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await authAPI.login({ email, password });
      
      if (response.data.token) {
        // Store token & user data
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);

        toast.success(`Chào mừng ${response.data.user.name}! 🎉`, {
          icon: '👋',
          duration: 3000,
        });

        // Reset form
        setEmail('');
        setPassword('');
        setShowPassword(false);

        // Close modal & trigger success callback
        setTimeout(() => {
          onClose();
          onSuccess?.();
        }, 500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Đăng nhập thất bại';
      toast.error(errorMsg, {
        icon: '❌',
      });
      setErrors({ 
        email: '', 
        password: errorMsg 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      // Demo with test account
      const response = await authAPI.login({ 
        email: 'user@example.com', 
        password: 'password123' 
      });
      
      if (response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('token', response.data.token);

        toast.success('Demo login successful! 🎉', {
          icon: '👋',
        });

        setTimeout(() => {
          onClose();
          onSuccess?.();
        }, 500);
      }
    } catch (error) {
      toast.error('Demo login failed. Using mock data.', {
        icon: '⚠️',
      });
      // Still close for demo purposes
      setTimeout(() => {
        onClose();
        onSuccess?.();
      }, 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-96 glass rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header with close button */}
            <div className="px-6 py-4 border-b border-white/20 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Đăng Nhập</h2>
                <p className="text-sm text-gray-500 mt-1">Để hoàn tất đơn hàng</p>
              </div>
              <button
                onClick={onClose}
                disabled={loading}
                className="p-1 hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleLogin} className="px-6 py-6 space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="your@email.com"
                    disabled={loading}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:bg-gray-50 ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    placeholder="••••••••"
                    disabled={loading}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50 disabled:bg-gray-50 ${
                      errors.password ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    defaultChecked
                    disabled={loading}
                    className="rounded border-gray-300 disabled:opacity-50"
                  />
                  Nhớ mật khẩu
                </label>
                <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                  Quên mật khẩu?
                </a>
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    Đang đăng nhập...
                  </>
                ) : (
                  <>
                    Đăng Nhập
                    <FiArrowRight />
                  </>
                )}
              </motion.button>

              {/* Demo Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl font-medium transition disabled:opacity-50 text-sm"
              >
                Thử với tài khoản Demo
              </button>

              {/* Register Link */}
              <div className="text-center pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Chưa có tài khoản?{' '}
                  <a href="/register" className="text-blue-600 font-semibold hover:text-blue-700">
                    Đăng ký ngay
                  </a>
                </p>
              </div>
            </form>

            {/* Info Footer */}
            <div className="px-6 py-3 bg-blue-50 border-t border-blue-100 flex items-start gap-2">
              <span className="text-blue-600 text-lg flex-shrink-0">ℹ️</span>
              <p className="text-xs text-blue-700">
                Đăng nhập để quản lý đơn hàng, lưu địa chỉ và được cập nhật về khuyến mãi.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * AuthPromptModal - Guest checkout modal with email requirement
 * - Appears if user not authenticated
 * - Requires email for order confirmation
 * - Option to login or continue as guest with email
 * - Email validation before proceeding
 */
export function AuthPromptModal({ 
  isOpen, 
  onClose, 
  onLoginClick, 
  onContinueGuest,
  guestEmail = '',
  onGuestEmailChange = () => {},
  guestEmailError = ''
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-96 glass rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="text-5xl mb-3">🛍️</div>
                <h2 className="text-2xl font-bold text-gray-900">Thanh Toán</h2>
                <p className="text-gray-600 mt-2 text-sm">
                  Bạn muốn đăng nhập hay tiếp tục mua sắm?
                </p>
              </div>

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onLoginClick}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition flex items-center justify-center gap-2"
                >
                  🔐 Đăng Nhập
                </motion.button>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/80 text-gray-600">hoặc</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Địa chỉ Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={guestEmail}
                    onChange={(e) => onGuestEmailChange(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-900 transition ${
                      guestEmailError 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-400'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      guestEmailError 
                        ? 'focus:ring-red-300' 
                        : 'focus:ring-blue-300'
                    }`}
                  />
                  {guestEmailError && (
                    <p className="text-xs text-red-600 mt-1">⚠️ {guestEmailError}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Chúng tôi sẽ gửi thông tin đơn hàng và hóa đơn tới email này
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onContinueGuest}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition"
                >
                  ✓ Tiếp Tục Mua Sắm
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
