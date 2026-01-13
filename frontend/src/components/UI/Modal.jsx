import { memo, useState } from 'react';
import { FiX } from 'react-icons/fi';

/**
 * Modal Component
 * Reusable modal/dialog
 */
const Modal = memo(({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className = '',
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className={`
            bg-white rounded-lg shadow-xl
            ${sizes[size]}
            w-full max-h-[90vh] overflow-auto
            ${className}
          `}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="flex gap-2 justify-end p-6 border-t">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
});

Modal.displayName = 'Modal';

export default Modal;
