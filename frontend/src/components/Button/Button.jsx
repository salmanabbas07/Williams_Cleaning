import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Button.css';

/**
 * Reusable Button Component
 * Styled after Premium Royal Black & Gold Luxury Theme:
 * - Primary buttons: Royal Gold Gradient (#98752C -> #D4AF37 -> #F5DF9B -> #C69B32 -> #98752C)
 * - Text: Royal Obsidian (#0B0B0C)
 * - Hover: Champagne Gold (#F5DF9B)
 * - Royal Obsidian circular badge (#0B0B0C) with Rich Metallic Gold arrow (#D4AF37)
 * - Smooth interactive hover animation with elevation and sliding arrow
 */
export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon = ArrowRight,
  showIconCircle = true,
  type = 'button',
  onClick,
  disabled = false,
  ...rest
}) {
  const baseStyles = 'group inline-flex items-center justify-center font-bold uppercase tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-full';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-2',
    md: 'text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 gap-2.5 shadow-sm',
    lg: 'text-sm sm:text-base px-5 sm:px-7 py-3 sm:py-3.5 gap-3 shadow-md'
  };

  const circleSizes = {
    sm: 'w-5 h-5 text-xs',
    md: 'w-6 sm:w-7 h-6 sm:h-7',
    lg: 'w-7 sm:w-8 h-7 sm:h-8'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-3.5 sm:w-4 h-3.5 sm:h-4',
    lg: 'w-4 sm:w-4.5 h-4 sm:h-4.5'
  };

  const variantStyles = {
    // Theme-based Royal Gold Gradient button with Royal Obsidian text and dark circle icon
    primary: 'btn-royal-gold text-[#0B0B0C] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:ring-[#D4AF37]',
    golden: 'btn-royal-gold text-[#0B0B0C] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:ring-[#D4AF37]',
    blue: 'btn-royal-gold text-[#0B0B0C] hover:shadow-md hover:-translate-y-0.5 focus:ring-[#D4AF37]',
    darkNavy: 'bg-[#141414] hover:bg-[#0B0B0C] text-white hover:shadow-md hover:-translate-y-0.5 focus:ring-[#141414]',
    outline: 'border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0B0B0C] hover:shadow-md hover:-translate-y-0.5 focus:ring-[#D4AF37]',
    outlineWhite: 'border-2 border-white text-white hover:bg-white hover:text-[#0B0B0C] hover:shadow-md hover:-translate-y-0.5 focus:ring-white',
    ghost: 'text-[#D4AF37] hover:text-[#F5DF9B] hover:bg-[#F8F5ED] focus:ring-[#D4AF37]'
  };

  const isPrimary = variant === 'primary' || variant === 'golden' || variant === 'blue';
  const circleBg = isPrimary ? 'bg-[#0B0B0C] text-[#D4AF37]' : 'bg-white/20 text-current';

  const content = (
    <>
      {showIconCircle && Icon && (
        <span
          className={`shrink-0 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-sm ${circleSizes[size] || circleSizes.md} ${circleBg}`}
          aria-hidden="true"
        >
          <Icon className={`${iconSizes[size] || iconSizes.md} transition-transform duration-300 group-hover:scale-110`} />
        </span>
      )}
      <span className="transition-transform duration-200">{children}</span>
    </>
  );

  const combinedClasses = `${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...rest}
    >
      {content}
    </button>
  );
}
