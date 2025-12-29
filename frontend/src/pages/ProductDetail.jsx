import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../api';
import { useCartStore } from '../store';
import ProductComparison from '../components/ProductComparison';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getOne(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!product) {
    return <div className="container py-8">Product not found</div>;
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Product Image */}
        <div className="bg-gray-200 h-96 rounded flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400">No image available</span>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="mb-4">
            <span className="text-yellow-500">{'⭐'.repeat(Math.round(product.rating || 4))}</span>
            <span className="text-gray-600 ml-2">({product.reviews?.length || 0} reviews)</span>
          </div>

          <div className="mb-6">
            <p className="text-4xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="text-lg text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-2">Stock: {product.stock} units</p>
            <p className="text-gray-700">Category: {product.category}</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Quantity:</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="btn btn-secondary px-4"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-2 py-2 border border-gray-300 rounded text-center"
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="btn btn-secondary px-4"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              addToCart(product, quantity);
              alert('Added to cart!');
            }}
            disabled={product.stock === 0}
            className="w-full btn btn-primary py-3 text-lg disabled:opacity-50"
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-4 px-4 ${activeTab === 'description' ? 'border-b-2 border-blue-600' : ''}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-4 ${activeTab === 'reviews' ? 'border-b-2 border-blue-600' : ''}`}
          >
            Reviews ({product.reviews?.length || 0})
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'description' && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Product Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {product.description || 'No description available'}
          </p>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-4">
              {product.reviews.map((review, idx) => (
                <div key={idx} className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">User</span>
                    <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No reviews yet</p>
          )}
        </div>
      )}

      {/* Product Comparison Section - Apple Focus */}
      {product.category === 'iPhone' && (
        <ProductComparison />
      )}
    </div>
  );
}
