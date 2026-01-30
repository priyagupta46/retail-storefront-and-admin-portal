import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      setNotification('Quantity exceeds available stock');
      return;
    }
    addToCart(product, quantity);
    setNotification(`${quantity} ${product.name} added to cart!`);
    setQuantity(1);
    setTimeout(() => setNotification(''), 3000);
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>;
  if (!product) return <div className="max-w-7xl mx-auto px-4 py-8">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-8 inline-block">← Back to Products</Link>

      {notification && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-800">
          {notification}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <div className="bg-gray-200 w-full h-96 flex items-center justify-center rounded">
            <span className="text-gray-500 text-lg">Product Image</span>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>
          
          <div className="mb-6">
            <span className="text-gray-500">Category:</span>
            <span className="ml-2 inline-block px-3 py-1 bg-gray-100 rounded">{product.category}</span>
          </div>

          <div className="mb-6">
            <p className="text-4xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
          </div>

          <div className="mb-6">
            <p className="text-lg">
              <span className="font-semibold">Stock Available:</span> 
              <span className={`ml-2 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock} units
              </span>
            </p>
          </div>

          {product.stock > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="w-16 px-3 py-2 border border-gray-300 rounded text-center"
                />
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
