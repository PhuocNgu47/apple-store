import React from 'react';

/**
 * OrdersLoading Component
 * Component hiển thị trạng thái loading khi tải đơn hàng
 */
export default function OrdersLoading() {
  return (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Đang tải đơn hàng...</p>
    </div>
  );
}

