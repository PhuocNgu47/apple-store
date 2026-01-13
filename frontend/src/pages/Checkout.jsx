import React, { useState } from 'react';
import { useCartStore } from '../store';
import { orderAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiCreditCard, FiTruck, FiSmartphone } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';
import { LoginModal, AuthPromptModal } from '../components/LoginModal';
import { useAuthStore } from '../store';
import CouponInput from '../components/CouponInput';
import OrderReview from './OrderReview';
import { addressAPI } from '../api';

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  const { token, user } = useAuthStore();
  
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [guestEmail, setGuestEmail] = useState('');
  const [guestEmailError, setGuestEmailError] = useState('');
  const [addressErrors, setAddressErrors] = useState({});
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    ward: '', // Phường/Xã
    district: '', // Quận/Huyện
    city: '', // Tỉnh/Thành phố
    country: 'Vietnam',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('qr_transfer');
  const [shippingSpeed, setShippingSpeed] = useState('standard');
  const [shippingProvider, setShippingProvider] = useState('ghn');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOrderReview, setShowOrderReview] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loadingAddresses, setLoadingAddresses] = useState(false);

  // Payment method options
  const paymentOptions = [
    { 
      id: 'qr_transfer', 
      name: 'QR MoMo / ZaloPay / VNPAY', 
      desc: 'Quét mã QR một chạm, tự điền nội dung',
      icon: FaQrcode,
      recommended: true
    },
    { 
      id: 'cash_on_delivery', 
      name: 'Thanh toán khi nhận hàng', 
      desc: 'COD - Trả tiền mặt khi giao',
      icon: FiTruck 
    },
    { 
      id: 'bank_transfer', 
      name: 'Chuyển khoản thủ công', 
      desc: 'Chuyển khoản theo hướng dẫn',
      icon: FiCreditCard 
    },
    { 
      id: 'credit_card', 
      name: 'Thẻ tín dụng/ghi nợ', 
      desc: 'Thanh toán qua cổng thẻ (demo)',
      icon: FiSmartphone 
    },
  ];

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="py-12 text-center">
          <p className="mb-4 text-6xl">🛒</p>
          <h2 className="mb-4 text-2xl font-bold">Giỏ hàng trống</h2>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Vietnamese phone: 10-11 digits, starts with 0 or +84
    const phoneRegex = /^(0|\+84)[1-9][0-9]{8,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateAddress = () => {
    const errors = {};
    let isValid = true;

    // Name validation
    if (!shippingAddress.name.trim()) {
      errors.name = 'Họ và tên là bắt buộc';
      isValid = false;
    } else if (shippingAddress.name.trim().length < 2) {
      errors.name = 'Họ và tên phải có ít nhất 2 ký tự';
      isValid = false;
    }

    // Phone validation
    if (!shippingAddress.phone.trim()) {
      errors.phone = 'Số điện thoại là bắt buộc';
      isValid = false;
    } else if (!validatePhone(shippingAddress.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ (VD: 0912345678 hoặc +84912345678)';
      isValid = false;
    }

    // Address validation
    if (!shippingAddress.address.trim()) {
      errors.address = 'Địa chỉ chi tiết là bắt buộc';
      isValid = false;
    } else if (shippingAddress.address.trim().length < 10) {
      errors.address = 'Vui lòng nhập địa chỉ chi tiết (số nhà, tên đường)';
      isValid = false;
    }

    // City validation
    if (!shippingAddress.city.trim()) {
      errors.city = 'Thành phố/Tỉnh là bắt buộc';
      isValid = false;
    }

    // District validation (recommended)
    if (!shippingAddress.district.trim()) {
      errors.district = 'Quận/Huyện là bắt buộc';
      isValid = false;
    }

    // Ward validation (recommended)
    if (!shippingAddress.ward.trim()) {
      errors.ward = 'Phường/Xã là bắt buộc';
      isValid = false;
    }

    setAddressErrors(errors);
    return isValid;
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value
    });
    // Clear error when user types
    if (addressErrors[name]) {
      setAddressErrors({
        ...addressErrors,
        [name]: ''
      });
    }
  };

  const processOrder = async () => {
    setLoading(true);
    setError('');

    try {
      // Transform items to match backend schema
      const orderItems = items.map(item => ({
        productId: item.id || item._id || item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }));

      const orderData = {
        items: orderItems,
        shippingAddress: { 
          ...shippingAddress, 
          shippingSpeed, 
          shippingProvider 
        },
        paymentMethod
      };

      // Add guest email if not authenticated
      if (!token || !user) {
        orderData.guestEmail = guestEmail.trim();
      }

      const response = await orderAPI.create(orderData);

      const orderId = response.data.order._id;
      clearCart();

      // Nếu chọn QR transfer, chuyển đến trang thanh toán QR
      if (paymentMethod === 'qr_transfer') {
        toast.success('Đơn hàng đã tạo! Vui lòng thanh toán');
        navigate(`/payment/${orderId}`);
      } else {
        toast.success('Đặt hàng thành công!');
        navigate('/order-success');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Đặt hàng thất bại. Vui lòng thử lại.');
      toast.error('Đặt hàng thất bại!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    // Validate address first
    if (!validateAddress()) {
      toast.error('Vui lòng điền đầy đủ thông tin địa chỉ');
      return;
    }

    // Check if user is authenticated or has guest email
    if (!token || !user) {
      // Guest checkout: require email
      if (!guestEmail.trim()) {
        setShowAuthPrompt(true);
        return;
      }
      
      // Validate guest email
      if (!validateEmail(guestEmail)) {
        setGuestEmailError('Email không hợp lệ');
        setShowAuthPrompt(true);
        return;
      }
    }
    
    await processOrder();
  };

  // Format to VND
  const formatVND = (usd) => {
    const vnd = usd * 24000;
    return vnd.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container max-w-6xl px-4 mx-auto">
        <h1 className="mb-8 text-3xl font-bold">🛍️ Thanh Toán</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Shipping Address */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                <FiTruck className="text-blue-600" /> Địa Chỉ Giao Hàng
              </h2>
              
              {error && (
                <div className="px-4 py-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-xl">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email field for guest users */}
                {(!token || !user) && (
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">
                      Email nhận thông tin đơn hàng <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={guestEmail}
                      onChange={(e) => {
                        setGuestEmail(e.target.value);
                        setGuestEmailError('');
                      }}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        guestEmailError ? 'border-red-500' : 'border-gray-200'
                      }`}
                      required
                    />
                    {guestEmailError && (
                      <p className="mt-1 text-sm text-red-500">{guestEmailError}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      Chúng tôi sẽ gửi thông tin đơn hàng và hóa đơn tới email này
                    </p>
                  </div>
                )}

                {/* Name and Phone */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Họ và tên người nhận *"
                      value={shippingAddress.name}
                      onChange={handleAddressChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        addressErrors.name ? 'border-red-500' : 'border-gray-200'
                      }`}
                      required
                    />
                    {addressErrors.name && (
                      <p className="mt-1 text-xs text-red-500">{addressErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Số điện thoại * (VD: 0912345678)"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        addressErrors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
                      required
                    />
                    {addressErrors.phone && (
                      <p className="mt-1 text-xs text-red-500">{addressErrors.phone}</p>
                    )}
                  </div>
                </div>
                
                {/* Detailed Address */}
                <div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Số nhà, tên đường * (VD: 123 Nguyễn Huệ)"
                    value={shippingAddress.address}
                    onChange={handleAddressChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      addressErrors.address ? 'border-red-500' : 'border-gray-200'
                    }`}
                    required
                  />
                  {addressErrors.address && (
                    <p className="mt-1 text-xs text-red-500">{addressErrors.address}</p>
                  )}
                </div>

                {/* Ward, District, City */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div>
                    <input
                      type="text"
                      name="ward"
                      placeholder="Phường/Xã *"
                      value={shippingAddress.ward}
                      onChange={handleAddressChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        addressErrors.ward ? 'border-red-500' : 'border-gray-200'
                      }`}
                      required
                    />
                    {addressErrors.ward && (
                      <p className="mt-1 text-xs text-red-500">{addressErrors.ward}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="district"
                      placeholder="Quận/Huyện *"
                      value={shippingAddress.district}
                      onChange={handleAddressChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        addressErrors.district ? 'border-red-500' : 'border-gray-200'
                      }`}
                      required
                    />
                    {addressErrors.district && (
                      <p className="mt-1 text-xs text-red-500">{addressErrors.district}</p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="city"
                      placeholder="Thành phố/Tỉnh *"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        addressErrors.city ? 'border-red-500' : 'border-gray-200'
                      }`}
                      required
                    />
                    {addressErrors.city && (
                      <p className="mt-1 text-xs text-red-500">{addressErrors.city}</p>
                    )}
                  </div>
                </div>

                {/* Country and ZipCode */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      name="country"
                      placeholder="Quốc gia"
                      value={shippingAddress.country}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="Mã bưu điện (tùy chọn)"
                      value={shippingAddress.zipCode}
                      onChange={handleAddressChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Payment Method */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-white shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                <FiCreditCard className="text-blue-600" /> Phương Thức Thanh Toán
              </h2>
              
              <div className="space-y-3">
                {paymentOptions.map(option => (
                  <label 
                    key={option.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${
                      paymentMethod === option.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={option.id}
                      checked={paymentMethod === option.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <option.icon className={`text-2xl ${paymentMethod === option.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{option.name}</span>
                        {option.recommended && (
                          <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">
                            Khuyên dùng
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Shipping Options (VN) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="p-6 bg-white shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                <FiTruck className="text-blue-600" /> Vận chuyển (demo VN)
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-700">Tốc độ giao</p>
                  <div className="space-y-2">
                    {[{ id: 'express', label: 'Hỏa tốc 2h (GrabExpress/Ahamove)' }, { id: 'standard', label: 'Tiêu chuẩn 2-4 ngày (GHTK/GHN/Viettel Post)' }, { id: 'pickup', label: 'Nhận tại cửa hàng (Click & Collect)' }].map(opt => (
                      <label key={opt.id} className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingSpeed"
                          value={opt.id}
                          checked={shippingSpeed === opt.id}
                          onChange={(e) => setShippingSpeed(e.target.value)}
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-gray-700">Đơn vị vận chuyển</p>
                  <select
                    value={shippingProvider}
                    onChange={(e) => setShippingProvider(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ghn">GHN</option>
                    <option value="ghtk">GHTK</option>
                    <option value="viettel">Viettel Post</option>
                  </select>
                  <p className="mt-2 text-xs text-gray-500">Mô phỏng: chưa kết nối API hãng vận chuyển.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky p-6 bg-white shadow-lg rounded-2xl top-24">
              <h2 className="mb-4 text-xl font-bold">📦 Đơn Hàng</h2>
              
              <div className="space-y-4 overflow-auto max-h-64">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b">
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full rounded-lg" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium line-clamp-1">{item.name}</p>
                      <p className="text-sm text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="font-bold">${(item.price * item.quantity).toFixed(0)}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-4 space-y-2 border-t">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span>${getTotalPrice().toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between pt-2 text-xl font-bold border-t">
                  <span>Tổng cộng:</span>
                  <div className="text-right">
                    <p className="text-blue-600">${getTotalPrice().toFixed(0)}</p>
                    <p className="text-sm font-normal text-gray-500">≈ {formatVND(getTotalPrice())}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center justify-center w-full gap-2 py-4 mt-6 text-lg font-semibold text-white transition bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                    Đang xử lý...
                  </>
                ) : paymentMethod === 'qr_transfer' ? (
                  <>
                    <FaQrcode /> Tạo Đơn & Thanh Toán QR
                  </>
                ) : (
                  <>Đặt Hàng</>
                )}
              </button>

              <p className="mt-3 text-xs text-center text-gray-500">
                Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng
              </p>
            </div>
          </motion.div>
        </div>

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            setShowAuthPrompt(false);
            // Don't navigate, just stay on checkout
            toast.success('Đăng nhập thành công!');
          }}
        />

        {/* Auth Prompt Modal */}
        <AuthPromptModal
          isOpen={showAuthPrompt}
          onClose={() => setShowAuthPrompt(false)}
          onLoginClick={() => {
            setShowAuthPrompt(false);
            setShowLoginModal(true);
          }}
          guestEmail={guestEmail}
          onGuestEmailChange={setGuestEmail}
          guestEmailError={guestEmailError}
          onContinueGuest={async () => {
            // Validate guest email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!guestEmail.trim()) {
              setGuestEmailError('Email là bắt buộc để nhận thông tin đơn hàng');
              return;
            }
            
            if (!emailRegex.test(guestEmail.trim())) {
              setGuestEmailError('Email không hợp lệ. Vui lòng kiểm tra lại.');
              return;
            }
            
            setGuestEmailError('');
            setShowAuthPrompt(false);
            
            // Validate address before proceeding
            if (!validateAddress()) {
              toast.error('Vui lòng điền đầy đủ thông tin địa chỉ giao hàng');
              return;
            }
            
            // Process order
            await processOrder();
          }}
        />
      </div>
    </div>
  );
}
