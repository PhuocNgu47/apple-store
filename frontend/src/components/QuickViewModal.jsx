import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';

/**
 * Quick View Modal - Preview sản phẩm mà không cần vào trang detail
 * - Hiển thị ảnh, tên, giá, màu sắc
 * - Nút Add to cart
 * - Trigger từ ProductCard hover
 */
export function QuickViewModal({ isOpen, onClose, product }) {
  const [selectedColor, setSelectedColor] = useState('silver');
  const [addedToCart, setAddedToCart] = useState(false);

  const mockColors = ['silver', 'gold', 'midnight', 'purple'];

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
      onClose();
    }, 1500);
  };

  if (!product) return null;

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm pointer-events-none ${isOpen ? 'pointer-events-auto' : ''}`}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9, y: isOpen ? 0 : 20 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-96 glass rounded-3xl shadow-2xl overflow-hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Image */}
        <div className="relative w-full h-64 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center overflow-hidden">
          <motion.img
            key={selectedColor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            src={product.image}
            alt={product.name}
            className="h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Product Info */}
          <div>
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{product.name}</h3>
            <p className="text-2xl font-bold text-blue-600 mt-1">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 ? (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Color: <span className="capitalize font-bold">{selectedColor}</span></p>
              <div className="flex gap-3">
                {mockColors.map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-full border-2 transition ${
                      selectedColor === color
                        ? 'border-blue-600 shadow-lg'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{
                      backgroundColor: color === 'silver' ? '#c0c0c0' : color === 'gold' ? '#ffd700' : color === 'midnight' ? '#000' : '#a78bfa',
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {/* Status Message */}
          {addedToCart && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 bg-green-100 text-green-700 rounded-xl"
            >
              <FiCheck className="text-xl" />
              <span className="font-medium">Added to your bag!</span>
            </motion.div>
          )}

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={addedToCart}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
              addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <FiShoppingCart className="text-xl" />
            {addedToCart ? 'Added!' : 'Add to Bag'}
          </motion.button>

          {/* View Details Link */}
          <button
            onClick={onClose}
            className="w-full py-2 text-blue-600 font-medium hover:text-blue-700 transition"
          >
            View Full Details →
          </button>
        </div>
      </motion.div>
    </>
  );
}
