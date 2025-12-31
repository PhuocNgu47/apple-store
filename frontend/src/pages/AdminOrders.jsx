import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { orderAPI } from '../api';

export default function AdminOrders() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getAll();
      setOrders(response.data.orders || response.data || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      alert('Cập nhật trạng thái thành công!');
      fetchOrders();
      // Update selected order
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Cập nhật trạng thái thất bại');
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-gray-100 text-gray-800',
      confirmed: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800'
    };
    const labels = {
      pending: '⏳ Chờ Xác Nhận',
      confirmed: '✓ Đã Xác Nhận',
      shipped: '🚚 Đang Giao',
      delivered: '✅ Đã Giao'
    };
    return (
      <span className={`px-3 py-1 text-sm rounded-full ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Đang tải...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header with back button */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            to="/admin" 
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            ← Quay lại
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">📦 Quản Lý Đơn Hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Mã Đơn</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Khách Hàng</th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">Tổng Tiền</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Trạng Thái</th>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Ngày Đặt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        onClick={() => setSelectedOrder(order)}
                        className={`border-b hover:bg-gray-50 cursor-pointer ${
                          selectedOrder?._id === order._id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                          {order.orderNumber || order._id.substring(0, 8) + '...'}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{order.userId?.name || 'N/A'}</p>
                          <p className="text-xs text-gray-500">{order.userId?.email}</p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <p className="font-bold text-blue-600">${order.totalAmount?.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {orders.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">📭 Chưa có đơn hàng nào</p>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="mt-4 text-gray-600 text-sm">
              Tổng cộng: <strong>{orders.length}</strong> đơn hàng
            </div>
          </div>

          {/* Order Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedOrder ? (
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">📋 Chi Tiết Đơn Hàng</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Mã Đơn Hàng</label>
                    <p className="text-gray-900 font-mono text-sm">{selectedOrder._id}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Khách Hàng</label>
                    <p className="text-gray-900 font-medium">{selectedOrder.userId?.name || 'N/A'}</p>
                    <p className="text-gray-600 text-sm">{selectedOrder.userId?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Địa Chỉ Giao Hàng</label>
                    <p className="text-gray-900 text-sm">
                      {selectedOrder.shippingAddress?.address || 'Chưa có địa chỉ'}
                      {selectedOrder.shippingAddress?.city && `, ${selectedOrder.shippingAddress.city}`}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">Cập Nhật Trạng Thái</label>
                    <select
                      value={selectedOrder.status || 'pending'}
                      onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">⏳ Chờ Xác Nhận</option>
                      <option value="confirmed">✓ Đã Xác Nhận</option>
                      <option value="shipped">🚚 Đang Giao</option>
                      <option value="delivered">✅ Đã Giao</option>
                    </select>
                  </div>

                  <div className="border-t pt-4">
                    <label className="block text-sm font-medium text-gray-500 mb-2">Sản Phẩm</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedOrder.items?.map((item, index) => (
                        <div key={item._id || index} className="flex justify-between text-sm bg-gray-50 p-2 rounded">
                          <span className="text-gray-700">
                            {item.productId?.name || item.name || 'Sản phẩm'} x{item.quantity}
                          </span>
                          <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tổng Tiền:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${selectedOrder.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">👆 Chọn đơn hàng để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
