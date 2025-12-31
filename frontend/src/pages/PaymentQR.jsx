import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiCheckCircle, FiClock, FiCopy, FiRefreshCw, FiArrowLeft } from 'react-icons/fi';
import { FaQrcode, FaMobileAlt } from 'react-icons/fa';
import API from '../api';

export default function PaymentQR() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [order, setOrder] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [countdown, setCountdown] = useState(15 * 60); // 15 phút
  const [checking, setChecking] = useState(false);

  // Fetch QR payment info
  const fetchPaymentInfo = async () => {
    try {
      const response = await API.get(`/payment/qr/${orderId}`);
      setPaymentInfo(response.data.payment);
      setOrder(response.data.order);
      
      if (response.data.order.paymentStatus === 'completed') {
        setIsPaid(true);
      }
    } catch (error) {
      console.error('Failed to fetch payment info:', error);
      toast.error('Không thể tải thông tin thanh toán');
    } finally {
      setLoading(false);
    }
  };

  // Check payment status (polling)
  const checkPaymentStatus = useCallback(async () => {
    try {
      setChecking(true);
      const response = await API.get(`/payment/status/${orderId}`);
      
      if (response.data.order.isPaid) {
        setIsPaid(true);
        toast.success('🎉 Thanh toán thành công!', { duration: 5000 });
      }
    } catch (error) {
      console.error('Failed to check status:', error);
    } finally {
      setChecking(false);
    }
  }, [orderId]);

  // Simulate payment (for testing)
  const simulatePayment = async () => {
    try {
      await API.post(`/payment/simulate/${orderId}`);
      setIsPaid(true);
      toast.success('🎉 Đã giả lập thanh toán thành công!');
    } catch (error) {
      toast.error('Lỗi giả lập thanh toán');
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`Đã copy ${label}!`);
  };

  // Initial load
  useEffect(() => {
    fetchPaymentInfo();
  }, [orderId]);

  // Polling every 5 seconds
  useEffect(() => {
    if (isPaid) return;
    
    const interval = setInterval(() => {
      checkPaymentStatus();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaid, checkPaymentStatus]);

  // Countdown timer
  useEffect(() => {
    if (isPaid || countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaid, countdown]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format currency to VND
  const formatVND = (amount) => {
    // Giả sử 1 USD = 24,000 VND (cho demo)
    const vnd = amount * 24000;
    return vnd.toLocaleString('vi-VN') + ' đ';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin thanh toán...</p>
        </div>
      </div>
    );
  }

  // Payment success screen
  if (isPaid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <FiCheckCircle className="text-7xl text-green-500 mx-auto mb-4" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Thanh Toán Thành Công!</h1>
          <p className="text-gray-600 mb-6">
            Đơn hàng <strong>#{order?.orderNumber}</strong> đã được xác nhận thanh toán
          </p>

          <div className="bg-green-50 p-4 rounded-xl mb-6">
            <p className="text-sm text-gray-600">Số tiền đã thanh toán</p>
            <p className="text-2xl font-bold text-green-600">
              {formatVND(order?.totalAmount)}
            </p>
          </div>

          <div className="space-y-3">
            <Link 
              to="/orders"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Xem Đơn Hàng
            </Link>
            <Link 
              to="/"
              className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition"
            >
              Tiếp Tục Mua Sắm
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link to="/orders" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <FiArrowLeft className="mr-2" /> Quay lại đơn hàng
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Thanh Toán Chuyển Khoản</h1>
          <p className="text-gray-600">Quét mã QR bằng ứng dụng ngân hàng hoặc MoMo</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Code Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            {/* Countdown */}
            <div className="flex items-center justify-center gap-2 mb-4 text-gray-600">
              <FiClock className="text-orange-500" />
              <span>Thời gian còn lại:</span>
              <span className={`font-bold ${countdown < 60 ? 'text-red-500' : 'text-orange-500'}`}>
                {formatTime(countdown)}
              </span>
            </div>

            {/* QR Image */}
            <div className="bg-white border-4 border-blue-100 rounded-2xl p-4 mb-4">
              {paymentInfo?.qrUrl ? (
                <img 
                  src={paymentInfo.vietQRUrl || paymentInfo.qrUrl}
                  alt="QR Code thanh toán"
                  className="w-full max-w-[280px] mx-auto rounded-lg"
                />
              ) : (
                <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center mx-auto">
                  <FaQrcode className="text-6xl text-gray-300" />
                </div>
              )}
            </div>

            {/* Scan instructions */}
            <div className="text-center text-sm text-gray-500">
              <FaMobileAlt className="inline mr-1" />
              Mở app Ngân hàng / MoMo → Quét QR → Xác nhận
            </div>

            {/* Check status button */}
            <button
              onClick={checkPaymentStatus}
              disabled={checking}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-3 rounded-xl font-semibold transition disabled:opacity-50"
            >
              <FiRefreshCw className={checking ? 'animate-spin' : ''} />
              {checking ? 'Đang kiểm tra...' : 'Kiểm tra thanh toán'}
            </button>
          </motion.div>

          {/* Payment Details Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            {/* Order Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Thông tin đơn hàng</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã đơn hàng:</span>
                  <span className="font-semibold">#{order?.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Số tiền (USD):</span>
                  <span className="font-semibold">${order?.totalAmount}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Số tiền (VNĐ):</span>
                  <span className="font-bold text-blue-600">{formatVND(order?.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Bank Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Thông tin chuyển khoản</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Ngân hàng</p>
                      <p className="font-bold text-lg">{paymentInfo?.bankId}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(paymentInfo?.bankId, 'ngân hàng')}
                      className="p-2 hover:bg-gray-200 rounded-lg transition"
                    >
                      <FiCopy className="text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Số tài khoản</p>
                      <p className="font-bold text-lg font-mono">{paymentInfo?.accountNo}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(paymentInfo?.accountNo, 'số tài khoản')}
                      className="p-2 hover:bg-gray-200 rounded-lg transition"
                    >
                      <FiCopy className="text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Chủ tài khoản</p>
                      <p className="font-bold text-lg">{paymentInfo?.accountName}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-blue-600 font-semibold">Nội dung chuyển khoản</p>
                      <p className="font-bold text-xl text-blue-700 font-mono">{paymentInfo?.content}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(paymentInfo?.content, 'nội dung')}
                      className="p-2 hover:bg-blue-100 rounded-lg transition"
                    >
                      <FiCopy className="text-blue-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Test button (for demo) */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800 mb-2">
                🧪 <strong>Demo Mode:</strong> Nhấn nút bên dưới để giả lập thanh toán thành công
              </p>
              <button
                onClick={simulatePayment}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
              >
                Giả Lập Thanh Toán
              </button>
            </div>

            {/* Instructions */}
            <div className="bg-gray-100 rounded-xl p-4 text-sm text-gray-600">
              <p className="font-semibold mb-2">📌 Hướng dẫn:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Mở ứng dụng Ngân hàng hoặc MoMo</li>
                <li>Quét mã QR hoặc chuyển khoản thủ công</li>
                <li>Nhập đúng nội dung chuyển khoản</li>
                <li>Xác nhận và chờ hệ thống tự động cập nhật</li>
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
