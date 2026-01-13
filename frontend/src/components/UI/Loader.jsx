import { memo } from 'react';

/**
 * Loader Component
 * Reusable loading spinner
 */
const Loader = memo(({
  size = 'md',
  color = 'blue',
  fullScreen = false,
  text = 'Loading...',
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    gray: 'border-gray-500',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`
          border-4 rounded-full animate-spin
          border-gray-200 border-t-${color}-500
          ${sizes[size]}
          ${colors[color]}
        `}
      />
      {text && <p className="text-gray-600">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
});

Loader.displayName = 'Loader';

export default Loader;
