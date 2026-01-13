import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../utils';

/**
 * CartSummary Component
 * Hiển thị tóm tắt đơn hàng trong giỏ hàng
 */
export default function CartSummary({ subtotal, onCheckout }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="card sticky top-4">
      <h2 className="text-xl font-bold mb-4">Tóm Tắt Đơn Hàng</h2>
      <div className="space-y-2 mb  -4">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{formatCurrency(subtotal, 'USD')}</span>
        </div>
        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span>{formatCurrency(0, 'USD')}</span>
        </div>
        <div className="flex justify-between text-lg font-bold border-t pt-2">
          <span>Tổng cộng</span>
          <span>{formatCurrency(subtotal, 'USD')}</span>
        </div>
      </div>
      <button
        onClick={handleCheckout}
        className="w-full btn btn-primary py-2"
      >
        Thanh Toán
      </button>
    </div>
  );
}


