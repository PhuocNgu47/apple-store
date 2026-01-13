import React from 'react';
import { formatCurrency } from '../../../utils';

/**
 * CartItemsList Component
 * Hiển thị danh sách sản phẩm trong giỏ hàng
 */
export default function CartItemsList({
  items,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="card space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 border-b pb-4">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-gray-600">
              {formatCurrency(item.price, 'USD')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrease(item.id, item.quantity)}
              className="btn btn-secondary px-2"
            >
              -
            </button>
            <span className="px-4">{item.quantity}</span>
            <button
              onClick={() => onIncrease(item.id, item.quantity)}
              className="btn btn-secondary px-2"
            >
              +
            </button>
          </div>
          <p className="font-bold min-w-24 text-right">
            {formatCurrency(item.price * item.quantity, 'USD')}
          </p>
          <button
            onClick={() => onRemove(item.id)}
            className="btn btn-secondary text-red-600"
          >
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}


