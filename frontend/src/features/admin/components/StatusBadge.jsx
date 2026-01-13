import React from 'react';

/**
 * StatusBadge Component
 * Component hiển thị badge trạng thái đơn hàng
 */
export default function StatusBadge({ status, size = 'sm' }) {
  const styles = {
    pending: 'bg-gray-100 text-gray-800',
    confirmed: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800'
  };
  
  const labels = {
    pending: '⏳ Chờ Xác Nhận',
    confirmed: '✓ Đã Xác Nhận',
    shipped: '🚚 Đang Giao',
    delivered: '✅ Đã Giao'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`${sizeClasses[size]} rounded-full ${styles[status] || styles.pending}`}>
      {labels[status] || status}
    </span>
  );
}

