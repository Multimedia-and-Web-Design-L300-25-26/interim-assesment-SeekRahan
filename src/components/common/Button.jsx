/**
 * Button Component
 * A versatile button component with multiple variants, sizes, and states
 *
 * @component
 * @example
 * <Button variant="primary">Click me</Button>
 *
 * @example
 * <Button size="lg" isLoading>Loading...</Button>
 */

import React from 'react';

const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyles = "rounded-full font-medium transition-all duration-200 inline-block text-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  // Variants
  const variants = {
    primary: "bg-[#0052FF] text-white hover:bg-[#0045D8] active:bg-[#0039A6]",
    secondary: "bg-white text-black border border-gray-300 hover:bg-gray-50 active:bg-gray-100",
    outline: "border border-gray-300 text-black hover:border-gray-800 active:border-gray-900",
    text: "text-[#0052FF] hover:text-[#0045D8] hover:underline",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    ghost: "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
  };

  // Sizes
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
