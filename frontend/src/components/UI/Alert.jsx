import { memo } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

/**
 * Alert Component
 * Reusable alert message
 */
const Alert = memo(({
  type = 'info',
  title,
  message,
  closable = true,
  onClose,
  className = '',
}) => {
  const types = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: FiInfo,
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: FiCheckCircle,
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: FiAlertCircle,
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: FiXCircle,
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        ${config.bg} ${config.border} ${config.text}
        border rounded-lg p-4
        flex gap-4 items-start
        ${className}
      `}
    >
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />

      <div className="flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {message && <p className="text-sm">{message}</p>}
      </div>

      {closable && (
        <button
          onClick={onClose}
          className="text-current hover:opacity-70 flex-shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';

export default Alert;
