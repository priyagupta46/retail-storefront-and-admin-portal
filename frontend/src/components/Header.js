import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold hover:text-blue-100">
              RetailHub
            </Link>
            <nav className="flex gap-6">
              <Link to="/" className="hover:text-blue-100">Home</Link>
              <Link to="/cart" className="hover:text-blue-100">Cart</Link>
            </nav>
          </div>
          <Link to="/admin/login" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50">
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
}
