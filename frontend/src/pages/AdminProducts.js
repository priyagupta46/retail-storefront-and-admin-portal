import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products', { params: { page, limit: 10 } });
      setProducts(response.data.products);
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

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
      await api.patch(`/products/${id}/status`, { status: newStatus });
      fetchProducts();
    } catch (error) {
      console.error('Error updating status:', error);
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
          <h1 className="text-2xl font-bold text-gray-900">Products Management</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/admin/products/create"
          className="inline-block mb-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          + Create Product
        </Link>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg overflow-x-auto border border-gray-200">
              <table className="w-full min-w-[900px]">
                <thead className="bg-gradient-to-b from-gray-100 to-gray-200 sticky top-0 z-10 border-b border-gray-300">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 tracking-wide">Image</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 tracking-wide">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 tracking-wide">Price</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 tracking-wide">Stock</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 tracking-wide">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-700 tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, idx) => (
                    <tr
                      key={product.id}
                      className={
                        `transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`
                      }
                    >
                      <td className="px-6 py-4 text-sm">
                        {product.image_url ? (
                          <img
                            src={`http://localhost:5000${product.image_url}`}
                            alt={product.name}
                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, boxShadow: '0 2px 8px #0001' }}
                          />
                        ) : (
                          <span className="text-gray-400">No image</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-blue-700 font-bold">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">{product.stock}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${
                          product.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleToggleStatus(product.id, product.status)}
                          className="text-purple-600 hover:underline font-medium"
                        >
                          {product.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:underline font-medium"
                        >
                          Delete
                        </button>
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
