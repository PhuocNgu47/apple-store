import React from 'react';
import { useAuthStore } from '../store';
import {
  OrdersList,
  OrdersLoading,
  OrdersError,
  OrdersEmpty,
  useOrders
} from '../features/orders';

export default function Orders() {
  const token = useAuthStore(state => state.token);
  const { orders, loading, error, refetch } = useOrders(token);

  // Nếu chưa đăng nhập
  if (!token) {
    return <OrdersEmpty />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">📦 Đơn Hàng Của Tôi</h1>

        {loading ? (
          <OrdersLoading />
        ) : error ? (
          <OrdersError error={error} onRetry={refetch} />
        ) : (
          <>
            <OrdersList orders={orders} />
            {/* Summary */}
            {orders.length > 0 && (
              <div className="mt-6 text-gray-600 text-sm text-center">
                Tổng cộng: <strong>{orders.length}</strong> đơn hàng
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
