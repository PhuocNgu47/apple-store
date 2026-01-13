import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BREADCRUMB_CONFIG } from '@/config/navigation';
import { FiChevronRight } from 'react-icons/fi';

/**
 * Breadcrumb Component
 * Navigation breadcrumb trail
 */
const Breadcrumb = memo(({ className = '' }) => {
  const { pathname } = useLocation();

  const generateBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Trang Chủ', path: '/' }];

    let path = '';
    parts.forEach((part, idx) => {
      path += `/${part}`;
      const config = BREADCRUMB_CONFIG[path];

      if (config) {
        breadcrumbs.push({
          label: config.label,
          path: path,
          isLast: idx === parts.length - 1,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`}>
      {breadcrumbs.map((crumb, idx) => (
        <div key={crumb.path} className="flex items-center gap-2">
          {crumb.isLast ? (
            <span className="text-gray-500">{crumb.label}</span>
          ) : (
            <Link to={crumb.path} className="text-blue-600 hover:underline">
              {crumb.label}
            </Link>
          )}

          {idx < breadcrumbs.length - 1 && (
            <FiChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
