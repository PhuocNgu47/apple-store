import React from 'react';
import { Link } from 'react-router-dom';
import OrderCard from './OrderCard';

/**
 * OrdersList Component
 * Component hiển thị danh sách đơn hàng
 */
export default function OrdersList({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Chưa có đơn hàng nào</h2>
        <p className="text-gray-500 mb-6">Bạn chưa đặt đơn hàng nào. Hãy mua sắm ngay!</p>
        <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Mua Sắm Ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map(order => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}

