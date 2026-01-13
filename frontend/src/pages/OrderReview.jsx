import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEdit, FiCheck, FiArrowLeft, FiTruck, FiCreditCard, FiMapPin } from 'react-icons/fi';
import { useCartStore } from '../store';
import { useAuthStore } from '../store';
import { formatCurrency } from '../utils';
import toast from 'react-hot-toast';

/**
 * Order Review Page
 * Trang xem lại đơn hàng trước khi xác nhận cuối cùng
 * Hiển thị: Sản phẩm, Địa chỉ, Phương thức thanh toán, Tổng tiền
 */
export default function OrderReview({ 
  shippingAddress, 
  paymentMethod, 
  shippingSpeed, 
  shippingProvider,
  guestEmail,
  couponCode,
  discountAmount,
  onBack,
  onConfirm 
}) {
  const navigate = useNavigate();
  const items = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = getTotalPrice();
  const shippingFee = 0; // TODO: Calculate from API
  const discount = discountAmount || 0;
  const total = subtotal + shippingFee - discount;

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container max-w-4xl px-4 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-4 text-gray-600 hover:text-gray-900 transition"
          >
            <FiArrowLeft /> Quay lại
          </button>
          <h1 className="text-3xl font-bold">📋 Xem Lại Đơn Hàng</h1>
          <p className="text-gray-600 mt-2">Vui lòng kiểm tra thông tin trước khi xác nhận đặt hàng</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - Order Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Products */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                🛍️ Sản Phẩm ({items.length})
              </h2>
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="object-cover w-full h-full"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                      <p className="text-sm text-gray-500">Giá: {formatCurrency(item.price, 'USD')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {formatCurrency(item.price * item.quantity, 'USD')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-white shadow-lg rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <FiMapPin className="text-blue-600" /> Địa Chỉ Giao Hàng
                </h2>
                {isEditing ? (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-green-600 hover:text-green-700"
                  >
                    <FiCheck /> Xong
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <FiEdit /> Sửa
                  </button>
                )}
              </div>
              
              {isEditing ? (
                <div className="text-sm text-gray-500">
                  <p>Nhấn "Quay lại" để chỉnh sửa địa chỉ</p>
                </div>
              ) : (
                <div className="space-y-2 text-gray-700">
                  <p className="font-semibold">{shippingAddress.name}</p>
                  <p>{shippingAddress.phone}</p>
                  <p>
                    {shippingAddress.address}
                    {shippingAddress.ward && `, ${shippingAddress.ward}`}
                    {shippingAddress.district && `, ${shippingAddress.district}`}
                    {shippingAddress.city && `, ${shippingAddress.city}`}
                  </p>
                  {shippingAddress.country && <p>{shippingAddress.country}</p>}
                  {shippingAddress.zipCode && <p>Mã bưu điện: {shippingAddress.zipCode}</p>}
                </div>
              )}
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                <FiCreditCard className="text-blue-600" /> Phương Thức Thanh Toán
              </h2>
              <div className="flex items-center gap-3">
                {paymentMethod === 'qr_transfer' && (
                  <>
                    <div className="p-3 bg-blue-50 rounded-lg">📱</div>
                    <div>
                      <p className="font-semibold">QR MoMo / ZaloPay / VNPAY</p>
                      <p className="text-sm text-gray-500">Quét mã QR để thanh toán</p>
                    </div>
                  </>
                )}
                {paymentMethod === 'cash_on_delivery' && (
                  <>
                    <div className="p-3 bg-green-50 rounded-lg">💰</div>
                    <div>
                      <p className="font-semibold">Thanh toán khi nhận hàng (COD)</p>
                      <p className="text-sm text-gray-500">Trả tiền mặt khi giao hàng</p>
                    </div>
                  </>
                )}
                {paymentMethod === 'bank_transfer' && (
                  <>
                    <div className="p-3 bg-purple-50 rounded-lg">🏦</div>
                    <div>
                      <p className="font-semibold">Chuyển khoản thủ công</p>
                      <p className="text-sm text-gray-500">Chuyển khoản theo hướng dẫn</p>
                    </div>
                  </>
                )}
                {paymentMethod === 'credit_card' && (
                  <>
                    <div className="p-3 bg-orange-50 rounded-lg">💳</div>
                    <div>
                      <p className="font-semibold">Thẻ tín dụng/ghi nợ</p>
                      <p className="text-sm text-gray-500">Thanh toán qua cổng thẻ</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Shipping Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-white shadow-lg rounded-2xl"
            >
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold">
                <FiTruck className="text-blue-600" /> Thông Tin Vận Chuyển
              </h2>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Tốc độ:</span>{' '}
                  {shippingSpeed === 'express' && 'Hỏa tốc 2h'}
                  {shippingSpeed === 'standard' && 'Tiêu chuẩn 2-4 ngày'}
                  {shippingSpeed === 'pickup' && 'Nhận tại cửa hàng'}
                </p>
                <p>
                  <span className="font-semibold">Đơn vị:</span>{' '}
                  {shippingProvider === 'ghn' && 'GHN'}
                  {shippingProvider === 'ghtk' && 'GHTK'}
                  {shippingProvider === 'viettel' && 'Viettel Post'}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="sticky p-6 bg-white shadow-lg rounded-2xl top-24">
              <h2 className="mb-4 text-xl font-bold">💰 Tổng Kết</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(subtotal, 'USD')}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span className={shippingFee === 0 ? 'text-green-600' : ''}>
                    {shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee, 'USD')}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá:</span>
                    <span>-{formatCurrency(discount, 'USD')}</span>
                  </div>
                )}

                <div className="pt-3 border-t">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Tổng cộng:</span>
                    <span className="text-blue-600">{formatCurrency(total, 'USD')}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    ≈ {(total * 24000).toLocaleString('vi-VN')}đ
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-2">Thông tin liên hệ:</p>
                <p className="font-semibold text-gray-900">
                  {user?.email || guestEmail}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Email xác nhận sẽ được gửi tới địa chỉ này
                </p>
              </div>

              {/* Confirm Button */}
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="w-full py-4 mt-6 text-lg font-semibold text-white transition bg-blue-600 hover:bg-blue-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-b-2 border-white rounded-full animate-spin"></div>
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    ✓ Xác Nhận Đặt Hàng
                  </>
                )}
              </button>

              <p className="mt-3 text-xs text-center text-gray-500">
                Bằng việc xác nhận, bạn đồng ý với{' '}
                <a href="/terms" className="text-blue-600 hover:underline">điều khoản sử dụng</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

