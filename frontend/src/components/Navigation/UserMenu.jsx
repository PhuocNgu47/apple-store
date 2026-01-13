import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { USER_DROPDOWN_MENU } from '@/config/navigation';
import { useAuth } from '@/hooks';

/**
 * UserMenu Component
 * Dropdown menu untuk user profile
 */
const UserMenu = memo(({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        <img
          src={user?.avatar || 'https://via.placeholder.com/32'}
          alt={user?.name}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">{user?.name}</span>
        <FiChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 w-48 mt-2 bg-white border rounded-lg shadow-lg">
          {USER_DROPDOWN_MENU.map(item => (
            <div key={item.id}>
              {item.action === 'logout' ? (
                <button
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full gap-2 px-4 py-2 text-left hover:bg-gray-100"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center w-full gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

UserMenu.displayName = 'UserMenu';

export default UserMenu;
