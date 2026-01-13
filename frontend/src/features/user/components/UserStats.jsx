import React from 'react';

/**
 * UserStats Component
 * Component hiển thị thống kê của user
 */
export default function UserStats({ stats = {} }) {
  const statsCards = [
    {
      title: 'Tổng Đơn Hàng',
      value: stats.totalOrders || 0,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Tổng Chi Tiêu',
      value: `$${stats.totalSpent || 0}`,
      gradient: 'from-green-500 to-green-600'
    },
    {
      title: 'Trạng Thái Thành Viên',
      value: stats.memberStatus || 'Khách Hàng',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {statsCards.map((stat, index) => (
        <div
          key={index}
          className={`bg-gradient-to-br ${stat.gradient} text-white rounded-lg p-6`}
        >
          <p className="text-sm opacity-90">{stat.title}</p>
          <p className="text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

