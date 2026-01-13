import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '../../../utils';

/**
 * RecentOrdersList Component
 * Component hiển thị danh sách đơn hàng gần đây
 */
export default function RecentOrdersList({ orders, limit = 5 }) {
  if (!orders || orders.length === 0) {
    return null;
  }

  const getStatusBadge = (status) => {
    const styles = {
      delivered: 'bg-green-100 text-green-800',
      shipped: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-yellow-100 text-yellow-800',
      pending: 'bg-gray-100 text-gray-800'
    };
    
    const labels = {
      delivered: 'Đã giao',
      shipped: 'Đã gửi',
      confirmed: 'Đã xác nhận',
      pending: 'Đang chờ'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded ${styles[status] || styles.pending}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">📦 Đơn Hàng Gần Đây</h2>
        <Link
          to="/admin/orders"
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Xem tất cả →
        </Link>
      </div>
      <div className="space-y-3">
        {orders.slice(0, limit).map((order) => (
          <div
            key={order._id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">
                  #{order.orderNumber}
                </span>
                {getStatusBadge(order.status)}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {order.userId?.name || order.guestEmail || 'Khách'} • {formatDate(order.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                {formatCurrency(order.totalAmount, 'VND')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

