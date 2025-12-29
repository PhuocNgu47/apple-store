import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-md">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. You will receive an email confirmation shortly.
        </p>
        <div className="space-y-2">
          <button
            onClick={() => navigate('/')}
            className="w-full btn btn-primary py-2"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="w-full btn btn-secondary py-2"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
