import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter]);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders', {
        params: { page, limit: 10, status: statusFilter }
      });
      setOrders(response.data.orders);
      setPagination(response.data.pagination);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/admin/dashboard" className="text-blue-600 hover:underline">← Dashboard</Link>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Order ID</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Customer</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Total</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 text-sm font-semibold">#{order.id}</td>
                      <td className="px-6 py-4 text-sm">{order.customer_name}</td>
                      <td className="px-6 py-4 text-sm">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${
                          order.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'Shipped' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-sm">
                        <Link
                          to={`/admin/orders/${order.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.pages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-4 py-2 rounded ${
                      page === pageNum ? 'bg-blue-600 text-white' : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
