import React from 'react';
import './ImagePlaceholder.css';

/**
 * ImagePlaceholder Component
 * Provides clean, dimension-accurate placeholders for future image replacement.
 * Strictly adheres to PRD: no external URLs, no stock photos, neutral subtle borders.
 */
export default function ImagePlaceholder({
  aspectRatio = 'aspect-[16/10]',
  rounded = 'rounded-lg',
  className = '',
  label = '',
  src = null,
  alt = 'Slika storitve Claviro Cleaning'
}) {
  // If an image source is provided in the future, render it directly
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`w-full ${aspectRatio} object-cover ${rounded} ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={`image-placeholder w-full overflow-hidden bg-neutral-100 border border-neutral-200/90 relative flex items-center justify-center transition-colors duration-200 ${aspectRatio} ${rounded} ${className}`}
      role="img"
      aria-label={label || 'Prostor za sliko'}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-200/40 via-transparent to-neutral-200/20 pointer-events-none" />
      {label && (
        <span className="text-xs uppercase tracking-wider font-medium text-neutral-400 select-none px-2 text-center z-10">
          {label}
        </span>
      )}
    </div>
  );
}
