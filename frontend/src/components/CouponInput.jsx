import React, { useState } from 'react';
import { FiTag, FiX, FiCheck } from 'react-icons/fi';
import { couponAPI } from '../api';
import toast from 'react-hot-toast';

/**
 * Coupon Input Component
 * Nhập và validate mã giảm giá
 */
export default function CouponInput({ subtotal, onApply, onRemove, appliedCoupon }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!code.trim()) {
      setError('Vui lòng nhập mã giảm giá');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await couponAPI.validate(code.trim(), subtotal);
      
      if (response.data.success) {
        toast.success(`Áp dụng mã giảm giá thành công! Giảm ${response.data.discount.toFixed(2)} USD`);
        onApply({
          code: response.data.coupon.code,
          name: response.data.coupon.name,
          discount: response.data.discount
        });
        setCode('');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Mã giảm giá không hợp lệ';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    onRemove();
    setCode('');
    setError('');
    toast.success('Đã xóa mã giảm giá');
  };

  if (appliedCoupon) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiCheck className="text-green-600 text-xl" />
            <div>
              <p className="font-semibold text-green-900">{appliedCoupon.name}</p>
              <p className="text-sm text-green-700">Mã: {appliedCoupon.code}</p>
              <p className="text-sm text-green-600">
                Giảm: {appliedCoupon.discount.toFixed(2)} USD
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition"
          >
            <FiX className="text-xl" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Mã Giảm Giá
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <FiTag className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Nhập mã giảm giá"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleApply();
              }
            }}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-200'
            }`}
            disabled={loading}
          />
        </div>
        <button
          onClick={handleApply}
          disabled={loading || !code.trim()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition"
        >
          {loading ? '...' : 'Áp dụng'}
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

