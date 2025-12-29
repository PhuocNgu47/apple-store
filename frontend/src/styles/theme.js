/**
 * Design System - Shared Theme Configuration
 * Dùng chung cho toàn bộ ứng dụng
 */

export const COLORS = {
  // Primary
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c3d66',
  },

  // Grayscale
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Status Colors
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6',

  // Semantic
  text: {
    primary: '#111827',
    secondary: '#6b7280',
    tertiary: '#9ca3af',
    light: '#f9fafb',
  },
  bg: {
    primary: '#ffffff',
    secondary: '#f9fafb',
    tertiary: '#f3f4f6',
  },
};

export const SPACING = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem',   // 48px
  '4xl': '4rem',   // 64px
};

export const BREAKPOINTS = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const SHADOWS = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
};

export const TRANSITIONS = {
  fast: '150ms ease-in-out',
  base: '200ms ease-in-out',
  slow: '300ms ease-in-out',
};

export const BORDER_RADIUS = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  full: '9999px',
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: '2.25rem', // 36px
    fontWeight: 700,
    lineHeight: 1.2,
  },
  h2: {
    fontSize: '1.875rem', // 30px
    fontWeight: 700,
    lineHeight: 1.3,
  },
  h3: {
    fontSize: '1.5rem', // 24px
    fontWeight: 700,
    lineHeight: 1.4,
  },
  h4: {
    fontSize: '1.25rem', // 20px
    fontWeight: 600,
    lineHeight: 1.5,
  },
  body: {
    fontSize: '1rem', // 16px
    fontWeight: 400,
    lineHeight: 1.6,
  },
  caption: {
    fontSize: '0.875rem', // 14px
    fontWeight: 400,
    lineHeight: 1.5,
  },
  small: {
    fontSize: '0.75rem', // 12px
    fontWeight: 400,
    lineHeight: 1.4,
  },
};

export const BUTTON_STYLES = {
  lg: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 600,
  },
  md: {
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  sm: {
    padding: '0.375rem 0.75rem',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
};

export default {
  COLORS,
  SPACING,
  BREAKPOINTS,
  SHADOWS,
  TRANSITIONS,
  BORDER_RADIUS,
  TYPOGRAPHY,
  BUTTON_STYLES,
};
