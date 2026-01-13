import React from 'react';
import { formatCurrency } from '../../../utils';
import StatusBadge from './StatusBadge';

/**
 * OrderDetailsSidebar Component
 * Component hiển thị chi tiết đơn hàng ở sidebar
 */
export default function OrderDetailsSidebar({ order, onStatusChange }) {
  if (!order) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">👆 Chọn đơn hàng để xem chi tiết</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-4">
      <h2 className="text-xl font-bold mb-4">📋 Chi Tiết Đơn Hàng</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-500">Mã Đơn Hàng</label>
          <p className="text-gray-900 font-mono text-sm">{order._id}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">Khách Hàng</label>
          <p className="text-gray-900 font-medium">{order.userId?.name || 'N/A'}</p>
          <p className="text-gray-600 text-sm">{order.userId?.email}</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">Địa Chỉ Giao Hàng</label>
          <p className="text-gray-900 text-sm">
            {order.shippingAddress?.address || 'Chưa có địa chỉ'}
            {order.shippingAddress?.city && `, ${order.shippingAddress.city}`}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Cập Nhật Trạng Thái</label>
          <select
            value={order.status || 'pending'}
            onChange={(e) => onStatusChange(order._id, e.target.value)}
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
            {order.items?.map((item, index) => (
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
              ${order.totalAmount?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

