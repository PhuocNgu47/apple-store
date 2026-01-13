import React from 'react';
import { useCartStore } from '../store';
import { CartEmpty, CartItemsList, CartSummary } from '../features/cart';

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const handleIncrease = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const handleDecrease = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ Hàng</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemsList
            items={items}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={removeFromCart}
          />
        </div>

        <div>
          <CartSummary subtotal={getTotalPrice()} />
        </div>
      </div>
    </div>
  );
}
