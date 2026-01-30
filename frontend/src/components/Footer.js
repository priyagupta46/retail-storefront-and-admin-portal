import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">About RetailHub</h3>
            <p className="text-gray-400">Your one-stop shop for quality products at great prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/products" className="hover:text-white">Products</a></li>
              <li><a href="/cart" className="hover:text-white">Cart</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400">Email: support@retailhub.com</p>
            <p className="text-gray-400">Phone: 1-800-RETAIL</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 RetailHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
