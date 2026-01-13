/**
 * Storage Utilities
 * Quản lý localStorage, sessionStorage
 */

const STORAGE_PREFIX = 'app_';

/**
 * Set value to localStorage
 * @param {string} key - Key
 * @param {any} value - Value
 */
export const setLocalStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(STORAGE_PREFIX + key, serialized);
  } catch (error) {
    console.error('localStorage setItem error:', error);
  }
};

/**
 * Get value from localStorage
 * @param {string} key - Key
 * @param {any} defaultValue - Default value
 * @returns {any}
 */
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('localStorage getItem error:', error);
    return defaultValue;
  }
};

/**
 * Remove from localStorage
 * @param {string} key - Key
 */
export const removeLocalStorage = (key) => {
  try {
    localStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.error('localStorage removeItem error:', error);
  }
};

/**
 * Clear all app data from localStorage
 */
export const clearLocalStorage = () => {
  try {
    Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  } catch (error) {
    console.error('localStorage clear error:', error);
  }
};

/**
 * Set value to sessionStorage
 * @param {string} key - Key
 * @param {any} value - Value
 */
export const setSessionStorage = (key, value) => {
  try {
    const serialized = JSON.stringify(value);
    sessionStorage.setItem(STORAGE_PREFIX + key, serialized);
  } catch (error) {
    console.error('sessionStorage setItem error:', error);
  }
};

/**
 * Get value from sessionStorage
 * @param {string} key - Key
 * @param {any} defaultValue - Default value
 * @returns {any}
 */
export const getSessionStorage = (key, defaultValue = null) => {
  try {
    const item = sessionStorage.getItem(STORAGE_PREFIX + key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('sessionStorage getItem error:', error);
    return defaultValue;
  }
};

/**
 * Remove from sessionStorage
 * @param {string} key - Key
 */
export const removeSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(STORAGE_PREFIX + key);
  } catch (error) {
    console.error('sessionStorage removeItem error:', error);
  }
};
