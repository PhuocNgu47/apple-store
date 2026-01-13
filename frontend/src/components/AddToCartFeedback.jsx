import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiArrowRight, FiX } from 'react-icons/fi';

/**
 * Add to Cart Feedback Modal
 * - Hiển thị ở góc phải dưới
 * - Auto-dismiss sau 3 giây
 * - Buttons: "View cart" hoặc "Keep shopping"
 * - Smooth slide-in/out animation
 */
export function AddToCartFeedback({ isOpen, onClose, product, onViewCart }) {
  const [shouldClose, setShouldClose] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setShouldClose(true);
      setTimeout(() => {
        onClose();
        setShouldClose(false);
      }, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  const handleViewCart = () => {
    setShouldClose(true);
    setTimeout(() => {
      onViewCart();
      onClose();
      setShouldClose(false);
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && !shouldClose && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 50 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 right-6 z-50 w-80 glass rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Progress bar (auto-dismiss indicator) */}
          <motion.div
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 3, ease: 'linear' }}
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 origin-left"
          />

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-start gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-14 h-14 object-cover rounded-lg"
                />
              </motion.div>

              <div className="flex-1">
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Added to your bag
                </motion.p>
                <p className="font-bold text-gray-900 line-clamp-2 text-sm mt-1">
                  {product?.name}
                </p>
                <p className="text-lg font-bold text-blue-600 mt-0.5">
                  ${product?.price?.toFixed(2)}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
              >
                <FiX className="text-gray-500" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewCart}
                className="py-2 px-3 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition flex items-center justify-center gap-1"
              >
                <FiShoppingCart className="text-lg" />
                View Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="py-2 px-3 bg-gray-100 text-gray-900 rounded-lg font-medium text-sm hover:bg-gray-200 transition"
              >
                Continue
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
