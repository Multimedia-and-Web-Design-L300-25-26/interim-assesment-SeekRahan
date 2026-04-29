/**
 * Card Component
 * A versatile card component for displaying content with image, title, description, and actions
 *
 * @component
 * @example
 * <Card
 *   image={image}
 *   title="Bitcoin"
 *   description="The original cryptocurrency"
 * />
 *
 * @example
 * <Card
 *   title="Feature"
 *   description="Description here"
 *   actions={<Button>Learn more</Button>}
 * />
 */

import React from 'react';

const Card = ({
  image,
  imageAlt = 'Card image',
  title,
  description,
  subtitle,
  badge,
  actions,
  onClick,
  className = '',
  imageClassName = '',
  contentClassName = '',
  variant = 'default', // 'default' | 'compact' | 'featured'
  hoverable = false,
  ...props
}) => {
  const baseStyles = 'rounded-lg overflow-hidden bg-white';
  const variantStyles = {
    default: 'shadow-sm hover:shadow-md transition-shadow',
    compact: 'shadow-none border border-gray-100',
    featured: 'shadow-lg',
  };
  const hoverableStyles = hoverable
    ? 'hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer'
    : '';

  const containerClass = `${baseStyles} ${variantStyles[variant]} ${hoverableStyles} ${className}`;

  const imageDefaultClass = 'w-full h-48 object-cover';
  const imageFinalClass = `${imageDefaultClass} ${imageClassName}`;

  const contentDefaultClass = 'p-6';
  const contentFinalClass = `${contentDefaultClass} ${contentClassName}`;

  return (
    <div
      className={containerClass}
      onClick={onClick}
      {...props}
    >
      {/* Image Section */}
      {image && (
        <div className="overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={imageAlt}
            className={imageFinalClass}
          />
        </div>
      )}

      {/* Content Section */}
      <div className={contentFinalClass}>
        {/* Badge */}
        {badge && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded-full">
              {badge}
            </span>
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {title}
          </h3>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-gray-500 mb-3">
            {subtitle}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm mb-4">
            {description}
          </p>
        )}

        {/* Actions */}
        {actions && (
          <div className="flex gap-2 pt-4 border-t border-gray-100">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
