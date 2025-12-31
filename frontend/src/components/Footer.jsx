import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaApple } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">📬 Đăng ký nhận tin</h3>
              <p className="text-blue-100">Nhận thông tin khuyến mãi và sản phẩm mới nhất</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Email của bạn..." 
                className="px-4 py-3 rounded-lg flex-1 md:w-64 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-semibold">
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FaApple className="text-3xl text-white" />
              <span className="text-2xl font-bold text-white">Apple Store</span>
            </div>
            <p className="text-gray-400 mb-4">
              Đại lý ủy quyền chính thức của Apple tại Việt Nam. 
              Cam kết 100% sản phẩm chính hãng với chế độ bảo hành tốt nhất.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Sản Phẩm</h4>
            <ul className="space-y-2">
              <li><Link to="/?category=iPhone" className="hover:text-blue-400 transition">iPhone</Link></li>
              <li><Link to="/?category=iPad" className="hover:text-blue-400 transition">iPad</Link></li>
              <li><Link to="/?category=Apple Watch" className="hover:text-blue-400 transition">Apple Watch</Link></li>
              <li><Link to="/?category=MacBook" className="hover:text-blue-400 transition">MacBook</Link></li>
              <li><Link to="/?category=Accessories" className="hover:text-blue-400 transition">Phụ kiện</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Chính sách đổi trả</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Chính sách bảo hành</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Phương thức thanh toán</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Vận chuyển & giao hàng</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Liên Hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <MdLocationOn className="text-blue-400 text-xl flex-shrink-0" />
                <span>123 Nguyễn Huệ, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="text-blue-400 text-xl flex-shrink-0" />
                <span>1900 1234 56</span>
              </li>
              <li className="flex items-center gap-3">
                <MdEmail className="text-blue-400 text-xl flex-shrink-0" />
                <span>support@applestore.vn</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400">Giờ làm việc:</p>
              <p className="font-semibold">8:00 - 22:00 (Thứ 2 - CN)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 Apple Store Vietnam. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-blue-400 transition">Điều khoản sử dụng</a>
              <a href="#" className="hover:text-blue-400 transition">Chính sách bảo mật</a>
              <a href="#" className="hover:text-blue-400 transition">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
