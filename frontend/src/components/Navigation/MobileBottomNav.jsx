import { memo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MOBILE_BOTTOM_NAV, isMenuItemActive } from '@/config/navigation';
import { Badge } from '@/components/UI';
import { useCartStore } from '@/store';

/**
 * MobileBottomNav Component
 */
const MobileBottomNav = memo(({ className = '' }) => {
  const { pathname } = useLocation();
  const cartItems = useCartStore(state => state.items);

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 ${className}`}>
      <div className="flex justify-around items-center h-16">
        {MOBILE_BOTTOM_NAV.map(item => (
          <Link
            key={item.id}
            to={item.path}
            className={`
              flex flex-col items-center justify-center w-full h-full
              relative transition-colors
              ${isMenuItemActive(pathname, item.path)
                ? 'text-blue-600'
                : 'text-gray-600'
              }
            `}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>

            {item.badge && item.id === 'cart' && getCartCount() > 0 && (
              <Badge
                variant="danger"
                size="sm"
                className="absolute top-1 right-2"
              >
                {getCartCount()}
              </Badge>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
});

MobileBottomNav.displayName = 'MobileBottomNav';

export default MobileBottomNav;
