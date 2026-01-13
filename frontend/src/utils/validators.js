/**
 * Validation Utilities
 * Các hàm xác thực dữ liệu
 */

/**
 * Validate email
 * @param {string} email - Email cần kiểm tra
 * @returns {boolean} - True nếu hợp lệ
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password
 * @param {string} password - Password cần kiểm tra
 * @returns {object} - Kết quả với valid và message
 */
export const isValidPassword = (password) => {
  const errors = [];

  if (!password) {
    return { valid: false, message: 'Password không được để trống' };
  }

  if (password.length < 6) {
    errors.push('Ít nhất 6 ký tự');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Ít nhất 1 chữ hoa');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Ít nhất 1 chữ thường');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Ít nhất 1 số');
  }

  if (errors.length > 0) {
    return {
      valid: false,
      message: 'Password yêu cầu: ' + errors.join(', '),
    };
  }

  return { valid: true };
};

/**
 * Validate số điện thoại
 * @param {string} phone - Số điện thoại
 * @returns {boolean}
 */
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(0\d{9}|0\d{10})$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Validate URL
 * @param {string} url - URL cần kiểm tra
 * @returns {boolean}
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate số
 * @param {any} value - Giá trị cần kiểm tra
 * @returns {boolean}
 */
export const isValidNumber = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

/**
 * Validate address
 * @param {string} address - Địa chỉ
 * @returns {boolean}
 */
export const isValidAddress = (address) => {
  return address && address.trim().length >= 5;
};

/**
 * Validate form data
 * @param {object} data - Dữ liệu form
 * @param {object} rules - Rules xác thực
 * @returns {object} - Errors object
 */
export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];

    if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors[field] = `${field} là bắt buộc`;
      return;
    }

    if (rule.type === 'email' && value && !isValidEmail(value)) {
      errors[field] = 'Email không hợp lệ';
    }

    if (rule.type === 'phone' && value && !isValidPhoneNumber(value)) {
      errors[field] = 'Số điện thoại không hợp lệ';
    }

    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `Ít nhất ${rule.minLength} ký tự`;
    }

    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `Tối đa ${rule.maxLength} ký tự`;
    }

    if (rule.min && value && parseFloat(value) < rule.min) {
      errors[field] = `Tối thiểu ${rule.min}`;
    }

    if (rule.max && value && parseFloat(value) > rule.max) {
      errors[field] = `Tối đa ${rule.max}`;
    }
  });

  return errors;
};
