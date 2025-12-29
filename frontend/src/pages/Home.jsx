import React, { useState, useEffect } from 'react';
import { productAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store';

export default function Home() {
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addToCart);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories] = useState(['iPhone', 'iPad', 'Apple Watch', 'Accessories']);

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;
      
      const response = await productAPI.getAll(params);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Apple Style */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">🍎 Apple Official Store</h1>
          <p className="text-xl opacity-90 mb-8">Các sản phẩm Apple chính hãng, được cập nhật liên tục với mức giá cạnh tranh nhất thị trường</p>
          <div className="flex gap-4">
            <button
              onClick={() => setCategory('iPhone')}
              className="btn btn-primary px-6 py-3 text-lg"
            >
              Khám phá iPhone
            </button>
            <button
              onClick={() => setCategory('iPad')}
              className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition"
            >
              Xem iPad
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-16 bg-white shadow-md z-40">
        <div className="container py-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setCategory('')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                category === '' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả sản phẩm
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  category === cat 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-12">
        {/* Featured Products Section */}
        {!category && products.filter(p => p.name.includes('Pro')).length > 0 && (
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">⭐ Sản Phẩm Nổi Bật</h2>
              <a href="#" className="text-blue-600 hover:underline">Xem tất cả →</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.name.includes('Pro')).slice(0, 3).map(product => (
                <ProductCard key={product._id} product={product} addToCart={addToCart} navigate={navigate} />
              ))}
            </div>
          </section>
        )}

        {/* Best Sellers Section */}
        {!category && products.filter(p => p.rating >= 4.8).length > 0 && (
          <section className="mb-16 bg-gray-50 -mx-4 px-4 py-8">
            <div className="container">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">🔥 Best Sellers</h2>
                <a href="#" className="text-blue-600 hover:underline">Xem tất cả →</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.filter(p => p.rating >= 4.8).slice(0, 4).map(product => (
                  <ProductCard key={product._id} product={product} addToCart={addToCart} navigate={navigate} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search Section when category selected */}
        {category && (
          <div className="mb-8">
            <input
              type="text"
              placeholder={`Tìm kiếm trong ${category}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* All Products Section */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Đang tải sản phẩm...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Không tìm thấy sản phẩm</p>
          </div>
        ) : (
          <section>
            {category && <h2 className="text-3xl font-bold mb-6">{category}</h2>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} addToCart={addToCart} navigate={navigate} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-gray-100 py-8 mt-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl mb-2">✓</p>
              <h3 className="font-bold mb-2">Hàng Chính Hãng</h3>
              <p className="text-gray-600">Bảo hành 12 tháng chính hãng Apple</p>
            </div>
            <div className="text-center">
              <p className="text-3xl mb-2">🚚</p>
              <h3 className="font-bold mb-2">Giao Hàng Nhanh</h3>
              <p className="text-gray-600">Miễn phí vận chuyển cho đơn trên 5 triệu</p>
            </div>
            <div className="text-center">
              <p className="text-3xl mb-2">💬</p>
              <h3 className="font-bold mb-2">Hỗ Trợ 24/7</h3>
              <p className="text-gray-600">Tư vấn miễn phí từ chuyên gia Apple</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, addToCart, navigate }) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="card hover:shadow-xl transition group cursor-pointer relative">
      {/* Badge */}
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
          -{discount}%
        </div>
      )}

      {/* Image */}
      <div className="bg-gray-200 h-48 rounded mb-4 flex items-center justify-center overflow-hidden relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        )}
      </div>

      {/* Category */}
      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
        {product.category}
      </span>

      {/* Name */}
      <h3
        className="font-bold text-lg mb-2 cursor-pointer hover:text-blue-600 line-clamp-2"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {product.description}
      </p>

      {/* Rating */}
      <div className="flex items-center mb-3">
        <span className="text-yellow-500">{'⭐'.repeat(Math.round(product.rating || 4))}</span>
        <span className="text-gray-500 text-sm ml-2">({product.reviews?.length || 0})</span>
      </div>

      {/* Specs (if available) */}
      {product.specs && (
        <div className="bg-gray-50 p-2 rounded mb-3 text-xs text-gray-700 space-y-1">
          {product.specs.screen && <p>📱 {product.specs.screen}</p>}
          {product.specs.processor && <p>⚡ {product.specs.processor}</p>}
          {product.specs.camera && <p>📷 {product.specs.camera}</p>}
        </div>
      )}

      {/* Price */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-blue-600">
          ${product.price.toLocaleString()}
        </p>
        {product.originalPrice && product.originalPrice !== product.price && (
          <p className="text-sm text-gray-500 line-through">
            ${product.originalPrice.toLocaleString()}
          </p>
        )}
      </div>

      {/* Stock */}
      <p className={`text-sm mb-3 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
      </p>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => {
            addToCart(product);
            alert('Đã thêm vào giỏ hàng!');
          }}
          disabled={product.stock === 0}
          className="flex-1 btn btn-primary disabled:opacity-50"
        >
          {product.stock > 0 ? '🛒 Thêm Vào Giỏ' : 'Hết Hàng'}
        </button>
        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className="btn btn-secondary px-3 py-2"
        >
          📄 Chi Tiết
        </button>
      </div>
    </div>
  );
}
