import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * CartEmpty Component
 * Hiển thị trạng thái giỏ hàng trống
 */
export default function CartEmpty() {
  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="text-center py-12">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
        <p className="text-gray-600 mb-6">
          Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Tiếp tục mua sắm
        </button>
      </div>
    </div>
  );
}


