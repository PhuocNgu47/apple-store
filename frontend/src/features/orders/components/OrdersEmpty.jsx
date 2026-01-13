import React from 'react';
import { Link } from 'react-router-dom';

/**
 * OrdersEmpty Component
 * Component hiển thị khi user chưa đăng nhập
 */
export default function OrdersEmpty() {
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

