import React from 'react';
import { Link } from 'react-router-dom';

/**
 * QuickActions Component
 * Component hiển thị các hành động nhanh trên dashboard
 */
export default function QuickActions({ pendingOrders = 0 }) {
  const actions = [
    {
      to: '/admin/products',
      icon: '🛍️',
      title: 'Quản Lý Sản Phẩm',
      description: 'Thêm, sửa, xóa sản phẩm',
      textColor: 'text-blue-600',
      iconBg: 'bg-blue-100'
    },
    {
      to: '/admin/users',
      icon: '👥',
      title: 'Quản Lý Người Dùng',
      description: 'Phân quyền và quản lý tài khoản',
      textColor: 'text-green-600',
      iconBg: 'bg-green-100'
    },
    {
      to: '/admin/orders',
      icon: '📦',
      title: 'Quản Lý Đơn Hàng',
      description: 'Xử lý và cập nhật đơn hàng',
      textColor: 'text-purple-600',
      iconBg: 'bg-purple-100',
      badge: pendingOrders > 0 ? pendingOrders : null
    }
  ];

  return (
    <>
      <h2 className="text-xl font-bold text-gray-900 mb-4">⚡ Quản Lý Nhanh</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition group border border-gray-100 relative"
          >
            {action.badge && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {action.badge} mới
              </span>
            )}
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${action.iconBg} rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition`}>
                {action.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{action.title}</h3>
                <p className="text-gray-500 text-sm">{action.description}</p>
              </div>
            </div>
            <div className={`mt-4 ${action.textColor} text-sm font-medium group-hover:translate-x-1 transition`}>
              Xem tất cả →
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

