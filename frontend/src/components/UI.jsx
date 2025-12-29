/**
 * Shared UI Components - Reusable & Professional
 * Dùng chung cho toàn bộ ứng dụng
 */

// ============================================
// LAYOUT COMPONENTS
// ============================================

export function Section({ children, className = '', title, subtitle }) {
  return (
    <div className={`section ${className}`}>
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

export function Grid({ children, className = '', columns = 'grid-responsive' }) {
  return (
    <div className={`${columns} ${className}`}>
      {children}
    </div>
  );
}

export function Card({ children, className = '', variant = 'default', onClick }) {
  const variants = {
    default: 'card',
    lg: 'card-lg',
    sm: 'card-sm',
    bordered: 'card-bordered',
    hover: 'card-hover',
  };

  return (
    <div className={`${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

// ============================================
// BUTTON COMPONENTS
// ============================================

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    success: 'btn-success',
    danger: 'btn-danger',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
  };

  const sizes = {
    sm: 'btn btn-primary-sm',
    md: 'btn',
    lg: 'btn btn-primary-lg',
  };

  const sizeClass = sizes[size].replace('btn-primary', variants[variant]);

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// ============================================
// FORM COMPONENTS
// ============================================

export function FormGroup({ 
  label, 
  children, 
  error, 
  required = false,
  className = '' 
}) {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label className="label">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      {children}
      {error && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  );
}

export function Input({ 
  label, 
  error,
  required = false,
  className = '',
  ...props 
}) {
  return (
    <FormGroup label={label} error={error} required={required}>
      <input className={`input-base ${className}`} {...props} />
    </FormGroup>
  );
}

export function Select({ 
  label, 
  options = [], 
  error,
  required = false,
  className = '',
  ...props 
}) {
  return (
    <FormGroup label={label} error={error} required={required}>
      <select className={`input-base ${className}`} {...props}>
        <option value="">-- Chọn --</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormGroup>
  );
}

export function Textarea({ 
  label, 
  error,
  required = false,
  className = '',
  ...props 
}) {
  return (
    <FormGroup label={label} error={error} required={required}>
      <textarea className={`input-base ${className}`} {...props} />
    </FormGroup>
  );
}

// ============================================
// TEXT & TYPOGRAPHY
// ============================================

export function Heading({ 
  level = 2, 
  children, 
  className = '' 
}) {
  const levels = {
    1: 'h1',
    2: 'h2',
    3: 'h3',
    4: 'h4',
    5: 'h5',
    6: 'h6',
  };

  const Tag = levels[level];
  return <Tag className={className}>{children}</Tag>;
}

export function Text({ 
  variant = 'body', 
  children, 
  className = '',
  as = 'p' 
}) {
  const variants = {
    body: 'text-base leading-relaxed',
    caption: 'text-sm text-gray-600',
    small: 'text-xs text-gray-500',
    muted: 'text-gray-500',
    light: 'text-gray-400',
  };

  const Tag = as;
  return (
    <Tag className={`${variants[variant]} ${className}`}>
      {children}
    </Tag>
  );
}

// ============================================
// BADGE & TAG
// ============================================

export function Badge({ 
  children, 
  variant = 'primary',
  className = '' 
}) {
  const variants = {
    primary: 'badge-primary',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
  };

  return (
    <span className={`${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

// ============================================
// DIVIDER
// ============================================

export function Divider({ className = '' }) {
  return <div className={`divider ${className}`} />;
}

// ============================================
// FLEX UTILITIES
// ============================================

export function FlexCenter({ children, className = '' }) {
  return <div className={`flex-center ${className}`}>{children}</div>;
}

export function FlexBetween({ children, className = '' }) {
  return <div className={`flex-between ${className}`}>{children}</div>;
}

// ============================================
// CONTAINER
// ============================================

export function Container({ children, className = '' }) {
  return <div className={`container ${className}`}>{children}</div>;
}

// ============================================
// RESPONSIVE UTILITIES
// ============================================

export function ResponsiveText({ children, className = '' }) {
  return <div className={`text-responsive ${className}`}>{children}</div>;
}

export function HiddenMobile({ children, className = '' }) {
  return <div className={`hidden-mobile ${className}`}>{children}</div>;
}

export function HiddenDesktop({ children, className = '' }) {
  return <div className={`hidden-desktop ${className}`}>{children}</div>;
}
