import React from 'react';

/**
 * QuickStats Component
 * Component hiển thị các thống kê nhanh của user
 */
export default function QuickStats({ stats = {} }) {
  const quickStats = [
    {
      label: 'Total Orders',
      value: stats.totalOrders || 0,
      color: 'blue'
    },
    {
      label: 'Completed Orders',
      value: stats.completedOrders || 0,
      color: 'green'
    },
    {
      label: 'Total Spent',
      value: `$${stats.totalSpent || 0}`,
      color: 'yellow'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600'
  };

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-4">📊 Thống Kê Nhanh</h2>
      <div className="space-y-4">
        {quickStats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-lg ${colorClasses[stat.color]}`}>
            <p className="text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

