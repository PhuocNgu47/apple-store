import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '@/config/navigation';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

/**
 * FooterNav Component
 * Navigation links dalam footer
 */
const FooterNav = memo(({ className = '' }) => {
  const iconMap = {
    FiFacebook,
    FiTwitter,
    FiInstagram,
    FiYoutube,
  };

  return (
    <div className={`bg-gray-900 text-gray-100 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="font-semibold text-white mb-4">Về Chúng Tôi</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.about.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="font-semibold text-white mb-4">Chính Sách</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.policy.map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-4">Theo Dõi</h4>
            <div className="flex gap-4">
              {FOOTER_LINKS.social.map(link => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  title={link.label}
                >
                  {link.icon === 'FiFacebook' && <FiFacebook className="w-6 h-6" />}
                  {link.icon === 'FiTwitter' && <FiTwitter className="w-6 h-6" />}
                  {link.icon === 'FiInstagram' && <FiInstagram className="w-6 h-6" />}
                  {link.icon === 'FiYoutube' && <FiYoutube className="w-6 h-6" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p>&copy; 2024 Apple Store. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
});

FooterNav.displayName = 'FooterNav';

export default FooterNav;
