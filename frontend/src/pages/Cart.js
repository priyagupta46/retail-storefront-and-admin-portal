import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, tax, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="border rounded-lg p-4 flex gap-4">
                <div className="bg-gray-200 w-20 h-20 rounded flex-shrink-0 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">No image</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    −
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-24">
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 text-sm hover:underline mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-6 text-red-600 hover:text-red-700 font-semibold"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full block text-center bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/"
              className="w-full block text-center mt-3 border border-gray-300 py-3 rounded font-semibold hover:bg-gray-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
