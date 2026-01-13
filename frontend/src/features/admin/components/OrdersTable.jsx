import React from 'react';
import { formatDate } from '../../../utils';
import StatusBadge from './StatusBadge';

/**
 * OrdersTable Component
 * Component hiển thị bảng danh sách đơn hàng
 */
export default function OrdersTable({ orders, selectedOrderId, onOrderSelect }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="text-center py-12">
          <p className="text-gray-500">📭 Chưa có đơn hàng nào</p>
        </div>
      </div>
    );
  }

  return (
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
                onClick={() => onOrderSelect(order)}
                className={`border-b hover:bg-gray-50 cursor-pointer ${
                  selectedOrderId === order._id ? 'bg-blue-50' : ''
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
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {order.createdAt ? formatDate(order.createdAt, 'dd/MM/yyyy') : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

