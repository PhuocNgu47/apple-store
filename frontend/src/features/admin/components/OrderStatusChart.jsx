import React from 'react';
import { formatCurrency } from '../../../utils';

/**
 * OrderStatusChart Component
 * Component hiển thị thống kê đơn hàng theo trạng thái
 */
export default function OrderStatusChart({ orderStats }) {
  if (!orderStats || orderStats.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Thống Kê Đơn Hàng</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {orderStats.map((stat) => (
          <div key={stat.status} className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
            <p className="text-xs text-gray-500 mt-1">
              {formatCurrency(stat.totalAmount, 'VND')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

