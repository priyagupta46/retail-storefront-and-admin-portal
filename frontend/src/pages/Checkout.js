import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    contactNumber: '',
    shippingAddress: ''
  });

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800">
          Cart is empty. Please add items before checking out.
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form
      if (!formData.customerName || !formData.email || !formData.contactNumber || !formData.shippingAddress) {
        throw new Error('All fields are required');
      }

      if (formData.customerName.length < 3 || formData.customerName.length > 100) {
        throw new Error('Name must be between 3 and 100 characters');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Invalid email address');
      }

      if (formData.contactNumber.length < 7 || formData.contactNumber.length > 15) {
        throw new Error('Contact number must be between 7 and 15 characters');
      }

      if (formData.shippingAddress.length < 10 || formData.shippingAddress.length > 200) {
        throw new Error('Address must be between 10 and 200 characters');
      }

      // Create order
      const orderData = {
        ...formData,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        }))
      };

      const response = await api.post('/orders', orderData);
      clearCart();
      navigate(`/order-success/${response.data.id}`);
    } catch (err) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 text-red-800">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength="100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+1234567890"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength="15"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              placeholder="123 Main St, City, Country 12345"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              maxLength="200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-2 mb-6 pb-6 border-b">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pb-6 border-b">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax (10%):</span>
                <span>${(total - cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
