import React from 'react';

/**
 * StatsCard Component
 * Component hiển thị thẻ thống kê trên dashboard
 */
export default function StatsCard({ title, value, icon, borderColor, subtitle }) {
  // If value is a string, display it as is (already formatted)
  // If value is a number, format it appropriately
  const displayValue = typeof value === 'string' ? value : value;

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {displayValue}
          </p>
          {subtitle && (
            <p className="text-xs text-orange-600 mt-1">{subtitle}</p>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}

