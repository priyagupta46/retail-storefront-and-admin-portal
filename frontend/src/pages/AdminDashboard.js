import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/orders/admin/stats', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    navigate('/admin/login');
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Today's Orders</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.todayOrders || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Today's Revenue</h3>
            <p className="text-3xl font-bold text-green-600">${stats?.todayRevenue?.toFixed(2) || '0.00'}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Active Products</h3>
            <p className="text-3xl font-bold text-purple-600">{stats?.activeProducts || 0}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-600 text-sm font-semibold">Low Stock Items</h3>
            <p className="text-3xl font-bold text-red-600">{stats?.lowStockCount || 0}</p>
          </div>
        </div>

        {/* Low Stock Alert */}
        {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-yellow-900 mb-4">Low Stock Alert</h3>
            <div className="space-y-2">
              {stats.lowStockProducts.map(product => (
                <div key={product.id} className="flex justify-between text-sm text-yellow-900">
                  <span>{product.name}</span>
                  <span className="font-semibold">Stock: {product.stock}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Products</h3>
            <p className="text-gray-600">View, create, edit and manage all products</p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition text-center"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Orders</h3>
            <p className="text-gray-600">View and manage all customer orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
