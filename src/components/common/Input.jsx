/**
 * Input Component
 * A reusable, accessible input field component with support for labels, errors, and various input types
 *
 * @component
 * @example
 * <Input
 *   label="Email"
 *   type="email"
 *   placeholder="Enter your email"
 *   required
 * />
 *
 * @example
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 * />
 */

import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required = false,
  disabled = false,
  autoComplete,
  className = '',
  id,
  ...props
}) => {
  const baseInputStyles =
    "appearance-none rounded relative block w-full px-3 py-3 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:z-10 sm:text-sm transition-colors duration-200";

  const borderStyles = error
    ? "border-red-500 focus:border-red-500"
    : "border-gray-300 focus:border-blue-500";

  const disabledStyles = disabled
    ? "bg-gray-100 cursor-not-allowed opacity-60"
    : "bg-white";

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || label.toLowerCase().replace(/\s+/g, '-')}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        id={id || label?.toLowerCase().replace(/\s+/g, '-')}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={`${baseInputStyles} ${borderStyles} ${disabledStyles} ${className}`}
        {...props}
      />

      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
