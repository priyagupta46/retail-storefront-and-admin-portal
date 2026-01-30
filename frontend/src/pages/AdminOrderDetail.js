import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const response = await api.patch(`/orders/${id}/status`, { status: newStatus });
      setOrder(response.data);
    } catch (error) {
      console.error('Error updating order:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>;
  if (!order) return <div className="max-w-7xl mx-auto px-4 py-8">Order not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/admin/orders" className="text-blue-600 hover:underline mb-6 inline-block">
        ← Back to Orders
      </Link>

      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Order #{order.id}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Customer Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Name:</span>
                <p className="font-semibold">{order.customer_name}</p>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <p className="font-semibold">{order.email}</p>
              </div>
              <div>
                <span className="text-gray-600">Contact:</span>
                <p className="font-semibold">{order.contact_number}</p>
              </div>
              <div>
                <span className="text-gray-600">Shipping Address:</span>
                <p className="font-semibold">{order.shipping_address}</p>
              </div>
            </div>
          </div>

          {/* Order Information */}
          <div>
            <h2 className="text-xl font-bold mb-4">Order Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-600">Order Date:</span>
                <p className="font-semibold">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-600">Status:</span>
                <p className="font-semibold">{order.status}</p>
              </div>
              <div>
                <span className="text-gray-600">Total:</span>
                <p className="font-bold text-lg text-blue-600">${order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Quantity</th>
                  <th className="px-4 py-3 text-left">Unit Price</th>
                  <th className="px-4 py-3 text-left">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {order.items?.map(item => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.quantity}</td>
                    <td className="px-4 py-3">${item.unit_price.toFixed(2)}</td>
                    <td className="px-4 py-3 font-semibold">${item.line_total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Update */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Update Status</h2>
          <div className="flex gap-2 flex-wrap">
            {['New', 'Processing', 'Shipped', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={updating}
                className={`px-4 py-2 rounded font-semibold ${
                  order.status === status
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                } disabled:opacity-50`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
