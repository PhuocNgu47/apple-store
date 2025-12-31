import React, { useState, useEffect } from 'react';
import { productAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiEye, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import { FaApple, FaStar } from 'react-icons/fa';

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
      toast.error('Không thể tải sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`Đã thêm ${product.name} vào giỏ hàng!`, {
      icon: '🛒',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Apple Store Vietnam - Mua iPhone, iPad, MacBook Chính Hãng</title>
        <meta name="description" content="Đại lý ủy quyền Apple chính thức tại Việt Nam. Mua iPhone, iPad, Apple Watch, MacBook với giá tốt nhất, bảo hành chính hãng 12 tháng." />
        <meta name="keywords" content="apple store, iphone, ipad, macbook, apple watch, chính hãng, việt nam" />
        <link rel="canonical" href="https://applestore.vn" />
      </Helmet>

      {/* Hero Section - Apple Style */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaApple className="text-5xl" />
              <h1 className="text-5xl font-bold">Apple Official Store</h1>
            </div>
            <p className="text-xl opacity-90 mb-8 max-w-2xl">
              Các sản phẩm Apple chính hãng, được cập nhật liên tục với mức giá cạnh tranh nhất thị trường
            </p>
          </motion.div>
          <motion.div 
            className="flex gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setCategory('iPhone')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-all hover:scale-105"
            >
              Khám phá iPhone
            </button>
            <button
              onClick={() => setCategory('iPad')}
              className="bg-gray-700 text-white px-8 py-3 rounded-xl hover:bg-gray-600 transition-all hover:scale-105"
            >
              Xem iPad
            </button>
          </motion.div>
        </div>
      </motion.div>

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
                <ProductCard key={product._id} product={product} addToCart={handleAddToCart} navigate={navigate} />
              ))}
            </div>
          </section>
        )}

        {/* Best Sellers Section */}
        {!category && products.filter(p => p.rating >= 4.8).length > 0 && (
          <section className="mb-16 bg-gray-50 -mx-4 px-4 py-8 rounded-2xl">
            <div className="container mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">🔥 Best Sellers</h2>
                <a href="#" className="text-blue-600 hover:underline">Xem tất cả →</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.filter(p => p.rating >= 4.8).slice(0, 4).map(product => (
                  <ProductCard key={product._id} product={product} addToCart={handleAddToCart} navigate={navigate} />
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* All Products Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Đang tải sản phẩm...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">📦</p>
            <p className="text-xl text-gray-600">Không tìm thấy sản phẩm</p>
          </div>
        ) : (
          <section>
            {category && <h2 className="text-3xl font-bold mb-6">{category}</h2>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} addToCart={handleAddToCart} navigate={navigate} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Info Banner */}
      <div className="bg-gray-100 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6 bg-white rounded-xl shadow-sm"
              whileHover={{ y: -5 }}
            >
              <FiShield className="text-4xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2 text-lg">Hàng Chính Hãng</h3>
              <p className="text-gray-600">Bảo hành 12 tháng chính hãng Apple</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 bg-white rounded-xl shadow-sm"
              whileHover={{ y: -5 }}
            >
              <FiTruck className="text-4xl text-green-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2 text-lg">Giao Hàng Nhanh</h3>
              <p className="text-gray-600">Miễn phí vận chuyển cho đơn trên 5 triệu</p>
            </motion.div>
            <motion.div 
              className="text-center p-6 bg-white rounded-xl shadow-sm"
              whileHover={{ y: -5 }}
            >
              <FiHeadphones className="text-4xl text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold mb-2 text-lg">Hỗ Trợ 24/7</h3>
              <p className="text-gray-600">Tư vấn miễn phí từ chuyên gia Apple</p>
            </motion.div>
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
    <motion.div 
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Badge */}
      {discount > 0 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
          -{discount}%
        </div>
      )}

      {/* Image */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-52 flex items-center justify-center overflow-hidden relative">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <FaApple className="text-6xl text-gray-300" />
        )}
        
        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product._id}`);
            }}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-blue-600 hover:text-white transition"
          >
            <FiEye className="text-xl" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:bg-green-600 hover:text-white transition"
          >
            <FiShoppingCart className="text-xl" />
          </motion.button>
        </div>
      </div>

      <div className="p-5">
        {/* Category */}
        <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-2">
          {product.category}
        </span>

        {/* Name */}
        <h3
          className="font-bold text-lg mb-2 cursor-pointer hover:text-blue-600 line-clamp-2 transition"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.round(product.rating || 4) ? 'text-yellow-400' : 'text-gray-200'} />
            ))}
          </div>
          <span className="text-gray-400 text-sm ml-2">({product.reviews?.length || 0})</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-blue-600">
            ${product.price.toLocaleString()}
          </p>
          {product.originalPrice && product.originalPrice !== product.price && (
            <p className="text-sm text-gray-400 line-through">
              ${product.originalPrice.toLocaleString()}
            </p>
          )}
        </div>

        {/* Stock */}
        <p className={`text-sm mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {product.stock > 0 ? `✓ Còn ${product.stock} sản phẩm` : '✗ Hết hàng'}
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            <FiShoppingCart /> Thêm Giỏ
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/product/${product._id}`)}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-xl font-semibold transition"
          >
            <FiEye />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
