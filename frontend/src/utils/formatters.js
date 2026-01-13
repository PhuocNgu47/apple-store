/**
 * Format Utilities
 * Các hàm định dạng dữ liệu
 * Sử dụng date-fns và numeral để format chuẩn hơn
 */

import { format as formatDateFns, formatDistanceToNow, formatRelative } from 'date-fns';
import { vi } from 'date-fns/locale';
import numeral from 'numeral';

/**
 * Format tiền tệ
 * Sử dụng numeral để format số tiền
 * 
 * @param {number} amount - Số tiền
 * @param {string} currency - Loại tiền tệ ('VND', 'USD')
 * @param {Object} options - Tùy chọn format
 * @returns {string} - Tiền được định dạng
 */
export const formatCurrency = (amount, currency = 'VND', options = {}) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return currency === 'VND' ? '0 ₫' : '$0';
  }

  const { 
    decimals = currency === 'VND' ? 0 : 2,
    showSymbol = true 
  } = options;

  // Format số với numeral
  const formatted = numeral(amount).format(decimals === 0 ? '0,0' : '0,0.00');

  // Thêm ký hiệu tiền tệ
  if (!showSymbol) return formatted;

  switch (currency) {
    case 'VND':
      return `${formatted} ₫`;
    case 'USD':
      return `$${formatted}`;
    case 'EUR':
      return `€${formatted}`;
    default:
      return `${formatted} ${currency}`;
  }
};

/**
 * Format ngày tháng
 * Sử dụng date-fns để format date chuẩn hơn
 * 
 * @param {Date|string|number} date - Ngày cần format
 * @param {string} formatStr - Format pattern (xem date-fns format)
 * @returns {string} - Ngày được định dạng
 * 
 * @example
 * formatDate(new Date(), 'dd/MM/yyyy') // "25/12/2024"
 * formatDate(new Date(), 'dd MMMM yyyy', 'vi') // "25 tháng 12 2024"
 */
export const formatDate = (date, formatStr = 'dd/MM/yyyy', locale = vi) => {
  if (!date) return '';

  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Kiểm tra date hợp lệ
    if (isNaN(dateObj.getTime())) {
      return '';
    }

    return formatDateFns(dateObj, formatStr, { locale });
  } catch (error) {
    console.error('formatDate error:', error);
    return '';
  }
};

/**
 * Format thời gian
 * @param {Date|string} date - Thời gian cần format
 * @returns {string} - Thời gian được định dạng
 */
export const formatTime = (date) => {
  if (!date) return '';

  const d = new Date(date);
  return d.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

/**
 * Format khoảng cách thời gian từ hiện tại
 * Sử dụng date-fns formatDistanceToNow
 * 
 * @param {Date|string|number} date - Ngày cần format
 * @param {Object} options - Tùy chọn
 * @returns {string} - Khoảng cách thời gian (ví dụ: "2 giờ trước")
 */
export const formatRelativeTime = (date, options = {}) => {
  if (!date) return '';

  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return '';
    }

    return formatDistanceToNow(dateObj, {
      addSuffix: true,
      locale: vi,
      ...options
    });
  } catch (error) {
    console.error('formatRelativeTime error:', error);
    return '';
  }
};

/**
 * Truncate text
 * @param {string} text - Text cần truncate
 * @param {number} length - Độ dài tối đa
 * @returns {string} - Text được truncate
 */
export const truncateText = (text, length = 50) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Format số điện thoại
 * @param {string} phone - Số điện thoại
 * @returns {string} - Số điện thoại được format
 */
export const formatPhoneNumber = (phone) => {
  if (!phone) return '';

  // Loại bỏ tất cả ký tự không phải số
  const cleaned = phone.replace(/\D/g, '');

  // Format theo định dạng: 0XXX XXX XXXX
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
  }

  return phone;
};

/**
 * Format số với định dạng tùy chỉnh
 * Sử dụng numeral
 * 
 * @param {number} number - Số cần format
 * @param {string} format - Format pattern (xem numeral docs)
 * @returns {string} - Số được định dạng
 * 
 * @example
 * formatNumber(1234.56, '0,0.00') // "1,234.56"
 * formatNumber(1234, '0.0a') // "1.2k"
 */
export const formatNumber = (number, format = '0,0') => {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }
  return numeral(number).format(format);
};

/**
 * Format slug từ text
 * @param {string} text - Text cần format
 * @returns {string} - Slug
 */
export const slugify = (text) => {
  if (!text) return '';

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
