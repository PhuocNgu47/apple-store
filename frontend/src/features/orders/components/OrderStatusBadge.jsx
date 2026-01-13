import React from 'react';

/**
 * OrderStatusBadge Component (for User)
 * Component hiển thị badge trạng thái đơn hàng cho user
 */
export default function OrderStatusBadge({ status }) {
  const styles = {
    pending: 'bg-gray-100 text-gray-800',
    confirmed: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  
  const labels = {
    pending: '⏳ Chờ Xác Nhận',
    confirmed: '✓ Đã Xác Nhận',
    shipped: '🚚 Đang Giao Hàng',
    delivered: '✅ Đã Giao Hàng',
    cancelled: '❌ Đã Hủy'
  };

  return (
    <span className={`px-3 py-1 text-sm rounded-full ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  );
}

