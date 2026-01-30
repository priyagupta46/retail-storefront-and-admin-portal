import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function OrderSuccess() {
  const { orderId } = useParams();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="text-6xl text-green-600 mb-4">✓</div>
          <h1 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h1>
        </div>

        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <p className="text-gray-600 mb-4">Your order has been received and is being processed.</p>
          <p className="text-2xl font-bold text-blue-600">Order ID: #{orderId}</p>
          <p className="text-gray-600 text-sm mt-2">Please save this ID for your reference.</p>
        </div>

        <div className="space-y-4 text-left bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">What's Next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ A confirmation email will be sent shortly</li>
            <li>✓ You can track your order using the order ID</li>
            <li>✓ Your order will be processed within 24 hours</li>
            <li>✓ Shipping updates will be sent to your email</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
          <Link
            to="/admin/login"
            className="block w-full border border-gray-300 text-gray-700 py-3 rounded font-semibold hover:bg-gray-50"
          >
            Track Order (Admin)
          </Link>
        </div>
      </div>
    </div>
  );
}
