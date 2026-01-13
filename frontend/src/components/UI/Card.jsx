import { memo } from 'react';

/**
 * Card Component
 * Reusable card container
 */
const Card = memo(({
  children,
  className = '',
  hoverable = false,
  ...props
}) => {
  const hoverStyles = hoverable ? 'hover:shadow-lg cursor-pointer transition-shadow' : '';

  return (
    <div
      className={`
        bg-white rounded-lg shadow
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
