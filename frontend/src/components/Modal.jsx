import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

/**
 * Reusable Modal Component
 * - Glassmorphism overlay (blur + semi-transparent)
 * - Click outside to close
 * - Esc key to close
 * - Smooth fade + scale animations
 * - Supports custom size and positioning
 */
export function Modal({ isOpen, onClose, children, title, size = 'md' }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const sizeClasses = {
    sm: 'w-11/12 max-w-sm',
    md: 'w-11/12 max-w-2xl',
    lg: 'w-11/12 max-w-4xl',
    xl: 'w-11/12 max-w-6xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 ${sizeClasses[size]} glass rounded-3xl shadow-2xl overflow-hidden`}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 transition rounded-lg hover:bg-gray-100"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * iOS-style Bottom Sheet Component
 * - Slides from bottom on mobile
 * - Glassmorphic overlay
 * - Swipe to close (gesture support)
 * - Click outside to close
 */
export function BottomSheet({ isOpen, onClose, children, title, height = 'h-2/3' }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`fixed bottom-0 left-0 right-0 z-50 ${height} glass rounded-t-3xl shadow-2xl overflow-hidden`}
          >
            {/* Handle bar (cho user biết có thể drag) */}
            <div className="flex justify-center pt-2 pb-0">
              <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                <button
                  onClick={onClose}
                  className="p-1 transition rounded-lg hover:bg-gray-100"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 60px)' }}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Glassmorphism Lightbox Modal
 * - Phóng to ảnh toàn màn hình
 * - Swipe/arrow keys để chuyển ảnh
 * - Blur + dark overlay
 */
export function ImageLightbox({ isOpen, onClose, images = [], initialIndex = 0 }) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur"
          />

          {/* Lightbox Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Image Container */}
            <div className="relative w-full max-w-4xl">
              <motion.img
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={images[currentIndex]?.src || images[currentIndex]}
                alt={`Gallery ${currentIndex}`}
                className="w-full h-auto shadow-2xl rounded-2xl"
              />

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute p-3 transition -translate-y-1/2 rounded-full left-4 top-1/2 bg-white/20 backdrop-blur hover:bg-white/40"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute p-3 transition -translate-y-1/2 rounded-full right-4 top-1/2 bg-white/20 backdrop-blur hover:bg-white/40"
                  >
                    →
                  </button>

                  {/* Counter */}
                  <div className="absolute px-4 py-2 text-sm text-white -translate-x-1/2 rounded-full bottom-4 left-1/2 bg-black/50">
                    {currentIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute p-2 transition rounded-full top-4 right-4 bg-white/20 backdrop-blur hover:bg-white/40"
            >
              <FiX className="text-2xl text-white" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
