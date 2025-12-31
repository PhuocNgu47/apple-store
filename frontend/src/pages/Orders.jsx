import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../api';
import { useAuthStore } from '../store';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useAuthStore(state => state.token);

  useEffect(() => {
    if (token) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchOrders = async () => {
    try {
      setError(null);
      const response = await orderAPI.getAll();
      // Backend trả về { orders: [...] }
      const ordersData = response.data.orders || response.data || [];
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Không thể tải đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm hiển thị trạng thái đơn hàng
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-gray-100 text-gray-800',
      confirmed: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    const labels = {
      pending: '⏳ Chờ Xác Nhận',
      confirmed: '✓ Đã Xác Nhận',
      shipped: '🚚 Đang Giao Hàng',
      delivered: '✅ Đã Giao Hàng',
      cancelled: '❌ Đã Hủy'
    };
    return (
      <span className={`px-3 py-1 text-sm rounded-full ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  // Nếu chưa đăng nhập
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-12 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">🔐 Vui lòng đăng nhập</h2>
            <p className="text-gray-600 mb-6">Bạn cần đăng nhập để xem đơn hàng của mình</p>
            <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Đăng Nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">📦 Đơn Hàng Của Tôi</h1>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải đơn hàng...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={fetchOrders} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              Thử Lại
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-6xl mb-4">🛒</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Chưa có đơn hàng nào</h2>
            <p className="text-gray-500 mb-6">Bạn chưa đặt đơn hàng nào. Hãy mua sắm ngay!</p>
            <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Mua Sắm Ngay
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Mã đơn hàng</p>
                    <p className="font-bold text-gray-900">{order.orderNumber || order._id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ngày đặt</p>
                    <p className="font-medium">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Trạng thái</p>
                    {getStatusBadge(order.status)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tổng tiền</p>
                    <p className="font-bold text-blue-600 text-lg">
                      ${order.totalAmount?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <p className="font-semibold text-gray-700 mb-3">Sản phẩm đã đặt:</p>
                  <div className="space-y-3">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                          {item.productId?.image ? (
                            <img 
                              src={item.productId.image} 
                              alt={item.productId?.name || 'Product'} 
                              className="w-full h-full object-cover rounded"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              📦
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.productId?.name || item.name || 'Sản phẩm'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Số lượng: {item.quantity} × ${item.price?.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            ${(item.price * item.quantity)?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="px-6 py-4 border-t bg-gray-50">
                    <p className="font-semibold text-gray-700 mb-2">📍 Địa chỉ giao hàng:</p>
                    <p className="text-gray-600">
                      {order.shippingAddress.name} - {order.shippingAddress.phone}
                    </p>
                    <p className="text-gray-600">
                      {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {orders.length > 0 && (
          <div className="mt-6 text-gray-600 text-sm text-center">
            Tổng cộng: <strong>{orders.length}</strong> đơn hàng
          </div>
        )}
      </div>
    </div>
  );
}
