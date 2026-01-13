import React, { useState, useEffect } from 'react';
import { productAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiEye, FiTruck, FiShield, FiHeadphones } from 'react-icons/fi';
import { FaApple, FaStar } from 'react-icons/fa';
import { ProductCard } from '../components/ProductCard';
import { AddToCartFeedback } from '../components/AddToCartFeedback';
import { ProductGridSkeleton } from '../components/UI';
import { useDebounce } from 'use-debounce';

export default function Home() {
  const navigate = useNavigate();
  const addToCart = useCartStore(state => state.addToCart);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories] = useState(['iPhone', 'iPad', 'Apple Watch', 'Accessories']);
  const [origin, setOrigin] = useState('');
  const [condition, setCondition] = useState('');
  const [storage, setStorage] = useState('');
  const [color, setColor] = useState('');
  const [addToCartFeedback, setAddToCartFeedback] = useState({ isOpen: false, product: null });
  
  // Debounce search để tránh spam API
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, category]); // Dùng debouncedSearch thay vì search

  // Gom meta tạm thời từ tên sản phẩm để demo bộ lọc VN (VNA/Quốc tế, dung lượng, màu, tình trạng)
  const addDerivedMeta = (product) => {
    const name = (product.name || '').toLowerCase();
    const originMeta = name.includes('vna') ? 'VNA' : 'Quốc tế';
    const storageMatch = name.match(/(1tb|512|256|128)\s?(tb|gb)?/i);
    const storageMeta = storageMatch ? storageMatch[0].toUpperCase().replace('TB', 'TB').replace('GB', 'GB') : '128GB';
    const colorMeta = name.includes('purple')
      ? 'Deep Purple'
      : name.includes('gold')
        ? 'Gold'
        : name.includes('blue')
          ? 'Blue'
          : 'Titan';
    const conditionMeta = product.originalPrice && product.originalPrice > product.price
      ? 'Like New 99%'
      : 'Mới 100%';

    return { ...product, meta: { origin: originMeta, storage: storageMeta, color: colorMeta, condition: conditionMeta } };
  };

  const enrichedProducts = products.map(addDerivedMeta);
  const filteredProducts = enrichedProducts.filter((p) => {
    const matchesOrigin = origin ? p.meta.origin === origin : true;
    const matchesCondition = condition ? p.meta.condition === condition : true;
    const matchesStorage = storage ? p.meta.storage === storage : true;
    const matchesColor = color ? p.meta.color === color : true;
    return matchesOrigin && matchesCondition && matchesStorage && matchesColor;
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (debouncedSearch) params.search = debouncedSearch; // Dùng debouncedSearch
      if (category) params.category = category;
      
      const response = await productAPI.getAll(params);
      setProducts(response.data.products || []);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0e3c93b9-6f1c-4dd1-b04b-99cb93fefc2f',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          sessionId:'debug-session',
          runId:'pre-fix',
          hypothesisId:'H2',
          location:'Home.jsx:fetchProducts:success',
          message:'Fetched products',
          data:{
            count: response?.data?.products?.length || 0,
            sample: (response?.data?.products || []).slice(0,3).map(p => ({
              id: p._id,
              name: p.name,
              image: p.image,
              thumbnail: p.thumbnail,
              images: Array.isArray(p.images) ? p.images.slice(0,2) : []
            }))
          },
          timestamp:Date.now()
        })
      }).catch(()=>{});
      // #endregion
    } catch (error) {
      console.error('Failed to fetch products:', error);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0e3c93b9-6f1c-4dd1-b04b-99cb93fefc2f',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          sessionId:'debug-session',
          runId:'pre-fix',
          hypothesisId:'H2',
          location:'Home.jsx:fetchProducts:error',
          message:'Fetch products failed',
          data:{ error: error?.message || 'unknown' },
          timestamp:Date.now()
        })
      }).catch(()=>{});
      // #endregion
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
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
        className="relative py-32 overflow-hidden text-white bg-gradient-to-br from-gray-950 via-blue-900 to-gray-950"
      >
        {/* Gradient Blob Background */}
        <div className="absolute rounded-full pointer-events-none -top-40 -right-40 w-80 h-80 bg-blue-500/10 blur-3xl"></div>
        <div className="absolute rounded-full pointer-events-none -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 blur-3xl"></div>

        <div className="container relative z-10 px-4 mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FaApple className="text-5xl" />
              <h1 className="text-5xl font-bold">Apple Official Store</h1>
            </div>
            <p className="max-w-2xl mb-8 text-xl leading-relaxed opacity-80">
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
              className="px-8 py-3 text-lg font-semibold text-white transition-all bg-blue-600 shadow-lg hover:bg-blue-700 rounded-3xl hover:scale-105"
            >
              Khám phá iPhone
            </button>
            <button
              onClick={() => setCategory('iPad')}
              className="px-8 py-3 text-white transition-all border bg-white/20 backdrop-blur rounded-3xl hover:bg-white/30 hover:scale-105 border-white/30"
            >
              Xem iPad
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Category Navigation */}
      <div className="sticky z-40 bg-white shadow-md top-16">
        <div className="container py-4">
          <div className="flex gap-2 pb-2 overflow-x-auto">
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
        {/* Bộ lọc VN cơ bản (demo) */}
        <div className="grid grid-cols-1 gap-4 p-4 mb-8 border border-gray-100 md:grid-cols-4 bg-gray-50 rounded-2xl">
          <FilterSelect label="Xuất xứ" value={origin} onChange={setOrigin} options={[{ label: 'Tất cả', value: '' }, { label: 'VNA', value: 'VNA' }, { label: 'Quốc tế', value: 'Quốc tế' }]} />
          <FilterSelect label="Tình trạng" value={condition} onChange={setCondition} options={[{ label: 'Tất cả', value: '' }, { label: 'Mới 100%', value: 'Mới 100%' }, { label: 'Like New 99%', value: 'Like New 99%' }]} />
          <FilterSelect label="Dung lượng" value={storage} onChange={setStorage} options={[{ label: 'Tất cả', value: '' }, { label: '128GB', value: '128GB' }, { label: '256GB', value: '256GB' }, { label: '512GB', value: '512GB' }, { label: '1TB', value: '1TB' }]} />
          <FilterSelect label="Màu sắc" value={color} onChange={setColor} options={[{ label: 'Tất cả', value: '' }, { label: 'Deep Purple', value: 'Deep Purple' }, { label: 'Gold', value: 'Gold' }, { label: 'Blue', value: 'Blue' }, { label: 'Titan', value: 'Titan' }]} />
        </div>

        {/* Featured Products Section */}
        {!category && products.filter(p => p.name.includes('Pro')).length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">⭐ Sản Phẩm Nổi Bật</h2>
              <a href="#" className="text-blue-600 hover:underline">Xem tất cả →</a>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.filter(p => p.name.includes('Pro')).slice(0, 3).map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onQuickViewAdd={(prod) => {
                    setAddToCartFeedback({ isOpen: true, product: prod });
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Best Sellers Section */}
        {!category && products.filter(p => p.rating >= 4.8).length > 0 && (
          <section className="px-4 py-8 mb-16 -mx-4 bg-gray-50 rounded-2xl">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">🔥 Best Sellers</h2>
                <a href="#" className="text-blue-600 hover:underline">Xem tất cả →</a>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {products.filter(p => p.rating >= 4.8).slice(0, 4).map(product => (
                  <ProductCard 
                    key={product._id} 
                    product={product}
                    onQuickViewAdd={(prod) => {
                      setAddToCartFeedback({ isOpen: true, product: prod });
                    }}
                  />
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
          <ProductGridSkeleton count={8} />
        ) : products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="mb-4 text-6xl">📦</p>
            <p className="text-xl text-gray-600">Không tìm thấy sản phẩm</p>
          </div>
        ) : (
          <section>
            {category && <h2 className="mb-6 text-3xl font-bold">{category}</h2>}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product._id} 
                  product={product}
                  onQuickViewAdd={(prod) => {
                    setAddToCartFeedback({ isOpen: true, product: prod });
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Info Banner */}
      <div className="py-12 mt-12 bg-gray-100">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div 
              className="p-6 text-center bg-white shadow-sm rounded-xl"
              whileHover={{ y: -5 }}
            >
              <FiShield className="mx-auto mb-3 text-4xl text-blue-600" />
              <h3 className="mb-2 text-lg font-bold">Hàng Chính Hãng</h3>
              <p className="text-gray-600">Bảo hành 12 tháng chính hãng Apple</p>
            </motion.div>
            <motion.div 
              className="p-6 text-center bg-white shadow-sm rounded-xl"
              whileHover={{ y: -5 }}
            >
              <FiTruck className="mx-auto mb-3 text-4xl text-green-600" />
              <h3 className="mb-2 text-lg font-bold">Giao Hàng Nhanh</h3>
              <p className="text-gray-600">Miễn phí vận chuyển cho đơn trên 5 triệu</p>
            </motion.div>
            <motion.div 
              className="p-6 text-center bg-white shadow-sm rounded-xl"
              whileHover={{ y: -5 }}
            >
              <FiHeadphones className="mx-auto mb-3 text-4xl text-purple-600" />
              <h3 className="mb-2 text-lg font-bold">Hỗ Trợ 24/7</h3>
              <p className="text-gray-600">Tư vấn miễn phí từ chuyên gia Apple</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add to Cart Feedback Modal */}
      <AddToCartFeedback
        isOpen={addToCartFeedback.isOpen}
        onClose={() => setAddToCartFeedback({ isOpen: false, product: null })}
        product={addToCartFeedback.product}
        onViewCart={() => navigate('/cart')}
      />
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-700">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
