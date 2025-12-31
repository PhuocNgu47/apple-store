import React, { useState } from 'react';
import { useCartStore } from '../store';
import { orderAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiCreditCard, FiTruck, FiSmartphone } from 'react-icons/fi';
import { FaQrcode } from 'react-icons/fa';

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    country: 'Vietnam',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('qr_transfer');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Payment method options
  const paymentOptions = [
    { 
      id: 'qr_transfer', 
      name: 'Chuyển khoản QR', 
      desc: 'Quét mã QR bằng MoMo/Ngân hàng',
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
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center py-12">
          <p className="text-6xl mb-4">🛒</p>
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const response = await orderAPI.create({
        items: orderItems,
        shippingAddress,
        paymentMethod
      });

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

  // Format to VND
  const formatVND = (usd) => {
    const vnd = usd * 24000;
    return vnd.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">🛍️ Thanh Toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FiTruck className="text-blue-600" /> Địa Chỉ Giao Hàng
              </h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Họ và tên *"
                    value={shippingAddress.name}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại *"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ chi tiết (số nhà, đường, phường/xã) *"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="Thành phố *"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Quốc gia"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Mã bưu điện"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </form>
            </motion.div>

            {/* Payment Method */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
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
                          <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
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
          </div>

          {/* Right Column - Order Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">📦 Đơn Hàng</h2>
              
              <div className="space-y-4 max-h-64 overflow-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
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

              <div className="mt-4 pt-4 border-t space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span>${getTotalPrice().toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span className="text-green-600">Miễn phí</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Tổng cộng:</span>
                  <div className="text-right">
                    <p className="text-blue-600">${getTotalPrice().toFixed(0)}</p>
                    <p className="text-sm text-gray-500 font-normal">≈ {formatVND(getTotalPrice())}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
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

              <p className="text-xs text-gray-500 text-center mt-3">
                Bằng việc đặt hàng, bạn đồng ý với điều khoản sử dụng
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
