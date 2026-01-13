import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productAPI } from '../api';
import { useCartStore } from '../store';
import ProductComparison from '../components/ProductComparison';
import ProductReviews from '../components/ProductReviews';
import { ImageLightbox } from '../components/Modal';
import { ProductDetailSkeleton } from '../components/UI';
import { formatCurrency, formatDate } from '../utils';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [months, setMonths] = useState(12);
  const [bankRate, setBankRate] = useState(1.49); // %/tháng mô phỏng trả góp
  const [notifyContact, setNotifyContact] = useState('');
  const [imeiInput, setImeiInput] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getOne(id);
      // Backend trả về { success, product, reviewStats }
      setProduct(response.data?.product || response.data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="container py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy sản phẩm</h2>
        <p className="text-gray-600 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Quay lại
        </button>
      </div>
    );
  }

  // Chuẩn hóa dữ liệu hiển thị
  const currency = product.currency || 'VND';
  const price = Number(product.price) || 0;
  const originalPrice = product.originalPrice ? Number(product.originalPrice) : null;
  const mainImage = product.image || product.thumbnail;
  const gallery = product.images && product.images.length > 0
    ? product.images
    : (mainImage ? [mainImage] : []);

  // Mô phỏng tính trả góp (VN): tiền gốc + lãi suất theo tháng (không dùng hook để tránh lỗi #310)
  const rate = bankRate / 100;
  const principal = price;
  const monthly = months > 0 ? (principal * (1 + rate * months)) / months : 0;
  const monthlyPayment = monthly.toFixed(2);

  const accessories = [
    { name: 'Ốp lưng MagSafe', price: 39, tag: 'Phụ kiện gợi ý' },
    { name: 'Củ sạc nhanh 20W', price: 25, tag: 'Bán chạy' },
    { name: 'AppleCare+ 2 năm', price: 199, tag: 'Bảo vệ máy' }
  ];

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Product Image - Click to open lightbox */}
        <div 
          onClick={() => setIsLightboxOpen(true)}
          className="bg-gray-200 h-96 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300 transition group"
        >
          {mainImage ? (
            <div className="relative w-full h-full">
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover group-hover:opacity-90 transition"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20">
                <div className="text-white text-center">
                  <p className="text-lg font-semibold">Click to enlarge</p>
                </div>
              </div>
            </div>
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
            <p className="text-4xl font-bold text-blue-600">
              {formatCurrency(price, currency)}
            </p>
            {originalPrice && (
              <p className="text-lg text-gray-500 line-through">
                {formatCurrency(originalPrice, currency)}
              </p>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 mb-2">
              Tình trạng: {product.stockStatus || (product.stock > 0 ? 'In Stock' : 'Hết hàng')}
            </p>
            <p className="text-gray-700">Danh mục: {product.category}</p>
            {product.brand && <p className="text-gray-700">Thương hiệu: {product.brand}</p>}
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

          {/* Specifications */}
          {product.specifications && typeof product.specifications === 'object' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="p-3 rounded bg-gray-50 border">
                  <p className="text-sm text-gray-500">{key}</p>
                  <p className="font-semibold text-gray-800">{String(value)}</p>
                </div>
              ))}
            </div>
          )}

          {/* Promotions */}
          {product.promotions?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Khuyến mãi</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {product.promotions.map((promo, idx) => (
                  <li key={idx}>{promo}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Warranty / Return */}
          {(product.warranty || product.returnPolicy) && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              {product.warranty && (
                <div className="p-3 rounded bg-green-50 border border-green-100">
                  <p className="font-semibold text-green-700">Bảo hành</p>
                  <p>{product.warranty}</p>
                </div>
              )}
              {product.returnPolicy && (
                <div className="p-3 rounded bg-orange-50 border border-orange-100">
                  <p className="font-semibold text-orange-700">Đổi trả</p>
                  <p>{product.returnPolicy}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="card">
          <ProductReviews 
            productId={id} 
            productRating={product.rating}
            onReviewAdded={(updatedProduct) => {
              setProduct(updatedProduct);
            }}
          />
        </div>
      )}

      {/* Product Comparison Section - Apple Focus */}
      {product.category === 'iPhone' && (
        <ProductComparison />
      )}

      {/* Trả góp nhanh (demo) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <h3 className="text-xl font-bold mb-3">💳 Tính trả góp 0%*</h3>
          <p className="text-sm text-gray-500 mb-4">Mô phỏng nhanh, có thể điều chỉnh kỳ hạn và lãi suất</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-600">Kỳ hạn (tháng)</label>
              <input
                type="range"
                min="3"
                max="24"
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value, 10))}
                className="w-full"
              />
              <p className="text-lg font-semibold">{months} tháng</p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Lãi suất (%/tháng)</label>
              <input
                type="number"
                value={bankRate}
                min="0"
                step="0.1"
                onChange={(e) => setBankRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
              <p className="text-sm text-gray-500">Ví dụ Home Credit/FE</p>
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm text-gray-600">Ước tính mỗi tháng</p>
            <p className="text-3xl font-bold text-blue-600">${monthlyPayment}</p>
            <p className="text-xs text-gray-500">*Con số mô phỏng để demo, chưa kết nối ngân hàng.</p>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-3">🔔 Nhận thông báo có hàng</h3>
          <p className="text-sm text-gray-500 mb-3">Đặc biệt hữu ích cho màu hot như Gold/Titan.</p>
          <div className="flex gap-3 mb-3">
            <input
              type="email"
              value={notifyContact}
              onChange={(e) => setNotifyContact(e.target.value)}
              placeholder="Email hoặc số điện thoại"
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
            <button
              onClick={() => {
                if (!notifyContact) return alert('Vui lòng nhập thông tin liên hệ');
                alert('Đã lưu đăng ký. Khi có hàng sẽ gửi thông báo (demo).');
                setNotifyContact('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Đăng ký
            </button>
          </div>
          <p className="text-xs text-gray-500">Đây là mô phỏng, chưa gửi email thật.</p>
        </div>
      </div>

      {/* Gợi ý phụ kiện bán kèm */}
      <div className="card mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">🧩 Gợi ý phụ kiện đi kèm</h3>
          <span className="text-sm text-gray-500">Cross-sell demo</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {accessories.map((item) => (
            <div key={item.name} className="p-4 border rounded-xl">
              <p className="text-xs text-blue-600 font-semibold mb-1">{item.tag}</p>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600 mb-3">${item.price}</p>
              <button
                onClick={() => addToCart({ ...item, _id: item.name, image: '', stock: 99, category: 'Accessories' })}
                className="w-full bg-gray-900 text-white py-2 rounded hover:bg-black"
              >
                Thêm nhanh
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tra cứu bảo hành (giả lập) */}
      <div className="card mt-8">
        <h3 className="text-xl font-bold mb-3">🔍 Tra cứu bảo hành (IMEI/SN)</h3>
        <div className="flex gap-3 mb-3">
          <input
            type="text"
            value={imeiInput}
            onChange={(e) => setImeiInput(e.target.value)}
            placeholder="Nhập IMEI / Serial Number"
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={() => {
              if (!imeiInput) return alert('Vui lòng nhập IMEI/SN');
              alert('Demo: Máy còn bảo hành 11 tháng tại Apple VN.');
            }}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Tra cứu
          </button>
        </div>
        <p className="text-xs text-gray-500">Chức năng đang mô phỏng, chưa kết nối API Apple.</p>
      </div>

      {/* Image Lightbox Modal */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={[
          product.image,
          ...(Array(2).fill(product.image)) // Mock multiple images
        ]}
        initialIndex={lightboxIndex}
      />
    </div>
  );
}
