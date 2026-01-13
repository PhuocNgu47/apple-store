import React from 'react';
import { formatDate } from '../../../utils';
import OrderStatusBadge from './OrderStatusBadge';

/**
 * OrderCard Component
 * Component hiển thị thông tin một đơn hàng
 */
export default function OrderCard({ order }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Order Header */}
      <div className="bg-gray-50 px-6 py-4 border-b flex flex-wrap justify-between items-center gap-4">
        <div>
          <p className="text-sm text-gray-500">Mã đơn hàng</p>
          <p className="font-bold text-gray-900">{order.orderNumber || order._id}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Ngày đặt</p>
          <p className="font-medium">
            {order.createdAt ? formatDate(order.createdAt, 'dd MMMM yyyy') : 'N/A'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Trạng thái</p>
          <OrderStatusBadge status={order.status} />
        </div>
        <div>
          <p className="text-sm text-gray-500">Tổng tiền</p>
          <p className="font-bold text-blue-600 text-lg">
            ${order.totalAmount?.toLocaleString() || 0}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <div className="px-6 py-4">
        <p className="font-semibold text-gray-700 mb-3">Sản phẩm đã đặt:</p>
        <div className="space-y-3">
          {order.items?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                {item.productId?.image ? (
                  <img 
                    src={item.productId.image} 
                    alt={item.productId?.name || 'Product'} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    📦
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {item.productId?.name || item.name || 'Sản phẩm'}
                </p>
                <p className="text-sm text-gray-500">
                  Số lượng: {item.quantity} × ${item.price?.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  ${(item.price * item.quantity)?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      {order.shippingAddress && (
        <div className="px-6 py-4 border-t bg-gray-50">
          <p className="font-semibold text-gray-700 mb-2">📍 Địa chỉ giao hàng:</p>
          <p className="text-gray-600">
            {order.shippingAddress.name} - {order.shippingAddress.phone}
          </p>
          <p className="text-gray-600">
            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
          </p>
        </div>
      )}
    </div>
  );
}

