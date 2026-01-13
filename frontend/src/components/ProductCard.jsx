import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FiShoppingCart, FiEye } from 'react-icons/fi';
import { useCartStore } from '../store';
import { QuickViewModal } from './QuickViewModal';
import { formatCurrency } from '../utils';

/**
 * Product Card Component
 * - Hiển thị sản phẩm trong grid
 * - Hover: Hiển thị Quick View button
 * - Quick View: Modal preview mà không cần vào trang detail
 * - Click để xem full details
 */
export function ProductCard({ product, onQuickViewAdd }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const imageSrc = product.image 
    || product.thumbnail 
    || (Array.isArray(product.images) ? product.images[0] : '') 
    || '/placeholder-image.jpg';

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0e3c93b9-6f1c-4dd1-b04b-99cb93fefc2f',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      sessionId:'debug-session',
      runId:'pre-fix',
      hypothesisId:'H3',
      location:'ProductCard.jsx:imageSrc',
      message:'Product image source resolved',
      data:{
        productId: product?._id,
        name: product?.name,
        image: product?.image,
        thumbnail: product?.thumbnail,
        firstImage: Array.isArray(product?.images) ? product.images[0] : null,
        imageSrc
      },
      timestamp:Date.now()
    })
  }).catch(()=>{});
  // #endregion

  const handleQuickAdd = () => {
    addToCart(product);
    onQuickViewAdd?.(product);
    setIsQuickViewOpen(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="group"
      >
        <Link to={`/product/${product._id}`}>
          <div className="relative h-56 mb-3 overflow-hidden bg-gray-100 rounded-2xl">
            {/* Product Image với Lazy Loading */}
            <LazyLoadImage
              src={imageSrc}
              alt={product.name}
              effect="blur"
              placeholderSrc="/placeholder-image.jpg"
              className="object-cover w-full h-full transition duration-500"
              wrapperClassName="w-full h-full"
            />

            {/* Overlay Actions - Hiển thị khi hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-end justify-center gap-3 p-4 bg-black/40 backdrop-blur-sm"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  setIsQuickViewOpen(true);
                }}
                className="p-3 transition rounded-full shadow-lg bg-white/90 backdrop-blur hover:bg-white"
                title="Quick View"
              >
                <FiEye className="text-2xl text-gray-900" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault();
                  handleQuickAdd();
                }}
                className="p-3 text-white transition bg-blue-600 rounded-full shadow-lg hover:bg-blue-700"
                title="Add to Cart"
              >
                <FiShoppingCart className="text-2xl" />
              </motion.button>
            </motion.div>

            {/* Badge - NEW/SALE */}
            {product.isNew && (
              <div className="absolute px-3 py-1 text-xs font-bold text-white bg-green-500 rounded-full top-3 left-3">
                NEW
              </div>
            )}
          </div>
        </Link>

        {/* Product Info */}
        <div className="pb-2 space-y-2">
          {/* Category */}
          <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
            {product.category || 'Gadget'}
          </p>

          {/* Product Name */}
          <Link
            to={`/product/${product._id}`}
            className="block font-bold text-gray-900 transition line-clamp-2 hover:text-blue-600"
          >
            {product.name}
          </Link>

          {/* Rating & Reviews */}
          {product.rating && (
            <div className="flex items-center gap-1.5 text-xs">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < Math.round(product.rating) ? '⭐' : '☆'}>
                    {i < Math.round(product.rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-500">({product.reviews?.length || 0})</span>
            </div>
          )}

          {/* Price với format currency */}
          <div className="flex items-end gap-2 pt-1">
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(product.price, 'USD')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(product.originalPrice, 'USD')}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
        product={product}
      />
    </>
  );
}
