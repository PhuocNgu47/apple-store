import React from 'react';

/**
 * OrdersError Component
 * Component hiển thị lỗi khi tải đơn hàng
 */
export default function OrdersError({ error, onRetry }) {
  return (
    <div className="text-center py-12">
      <p className="text-red-600 mb-4">{error}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Thử Lại
        </button>
      )}
    </div>
  );
}

