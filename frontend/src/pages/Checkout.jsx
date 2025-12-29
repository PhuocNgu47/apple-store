import React, { useState, useEffect } from 'react';
import { useCartStore } from '../store';
import { orderAPI } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore(state => state.items);
  const getTotalPrice = useCartStore(state => state.getTotalPrice);
  const clearCart = useCartStore(state => state.clearCart);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('cash_on_delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <div className="container py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await orderAPI.create({
        items,
        shippingAddress,
        paymentMethod
      });
      clearCart();
      navigate('/order-success');
    } catch (err) {
      setError(err.response?.data?.message || 'Order creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={shippingAddress.name}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={shippingAddress.phone}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={shippingAddress.address}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={shippingAddress.city}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={shippingAddress.country}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={shippingAddress.zipCode}
              onChange={handleAddressChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              required
            />

            <h2 className="text-xl font-bold mt-8 mb-4">Payment Method</h2>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="cash_on_delivery">Cash on Delivery</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 text-lg"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="card space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="text-xl font-bold flex justify-between pt-4 border-t">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
