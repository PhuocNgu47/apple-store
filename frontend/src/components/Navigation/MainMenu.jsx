import { memo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CUSTOMER_MENU, isMenuItemActive } from '@/config/navigation';

/**
 * MainMenu Component
 * Navigation menu cho customer
 */
const MainMenu = memo(({ className = '' }) => {
  const { pathname } = useLocation();

  return (
    <nav className={`flex items-center gap-8 ${className}`}>
      {CUSTOMER_MENU.map(item => (
        <Link
          key={item.id}
          to={item.path}
          className={`
            text-sm font-medium transition-colors
            ${isMenuItemActive(pathname, item.path)
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-900'
            }
          `}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
});

MainMenu.displayName = 'MainMenu';

export default MainMenu;
