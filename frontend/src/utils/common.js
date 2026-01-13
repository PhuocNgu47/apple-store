/**
 * Common Utilities
 */
export const sleep = (ms = 1000) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {function}
 */
export const debounce = (func, wait = 300) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {function} func - Function to throttle
 * @param {number} limit - Limit time in ms
 * @returns {function}
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;

  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Deep clone object
 * @param {any} obj - Object to clone
 * @returns {any}
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Merge objects
 * @param  {...any} objects - Objects to merge
 * @returns {object}
 */
export const mergeObjects = (...objects) => {
  return objects.reduce((result, obj) => {
    return { ...result, ...obj };
  }, {});
};

/**
 * Get nested value from object
 * @param {object} obj - Object
 * @param {string} path - Path like 'user.profile.name'
 * @param {any} defaultValue - Default value
 * @returns {any}
 */
export const getNestedValue = (obj, path, defaultValue = undefined) => {
  try {
    const value = path.split('.').reduce((current, prop) => current?.[prop], obj);
    return value !== undefined ? value : defaultValue;
  } catch {
    return defaultValue;
  }
};

/**
 * Set nested value in object
 * @param {object} obj - Object
 * @param {string} path - Path like 'user.profile.name'
 * @param {any} value - Value to set
 * @returns {object} - Modified object
 */
export const setNestedValue = (obj, path, value) => {
  const keys = path.split('.');
  const lastKey = keys.pop();

  let current = obj;
  for (const key of keys) {
    if (!(key in current)) {
      current[key] = {};
    }
    current = current[key];
  }

  current[lastKey] = value;
  return obj;
};

/**
 * Remove duplicates from array
 * @param {array} arr - Array
 * @param {string} key - Optional key for object array
 * @returns {array}
 */
export const removeDuplicates = (arr, key = null) => {
  if (!key) {
    return [...new Set(arr)];
  }

  const seen = new Set();
  return arr.filter(item => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
};

/**
 * Group array by key
 * @param {array} arr - Array
 * @param {string|function} key - Key or getter function
 * @returns {object}
 */
export const groupBy = (arr, key) => {
  return arr.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key];

    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);

    return result;
  }, {});
};

/**
 * Check if object is empty
 * @param {object} obj - Object
 * @returns {boolean}
 */
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

/**
 * Generate random ID
 * @returns {string}
 */
export const generateId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Copy to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
};
