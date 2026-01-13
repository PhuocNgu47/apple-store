import React from 'react';

/**
 * LowStockAlert Component
 * Component cảnh báo sản phẩm sắp hết hàng
 */
export default function LowStockAlert({ lowStockCount }) {
  if (!lowStockCount || lowStockCount === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        <div>
          <p className="font-semibold text-yellow-800">
            Cảnh báo: {lowStockCount} sản phẩm sắp hết hàng
          </p>
          <p className="text-sm text-yellow-600">Vui lòng kiểm tra và nhập thêm hàng</p>
        </div>
      </div>
    </div>
  );
}

