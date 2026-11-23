import React from 'react';
import { Sparkles } from 'lucide-react';
import './SectionHeading.css';

/**
 * Reusable Section Heading
 * Consistent Dark Charcoal headings (#292929) or white on dark
 */
export default function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  onDark = false,
  className = '',
  titleTag = 'h2',
  iconSrc
}) {
  const HeadingTag = titleTag;
  const theme = onDark ? 'dark' : 'light';

  return (
    <div
      className={`section-heading-wrapper ${
        centered ? 'centered' : 'left'
      } ${className}`}
    >
      {badge && (
        <div className={`section-heading-badge ${theme}`}>
          {iconSrc ? (
            <img
              src={iconSrc}
              alt=""
              className="section-heading-icon"
              aria-hidden="true"
            />
          ) : (
            <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" aria-hidden="true" />
          )}
          <span>{badge}</span>
        </div>
      )}

      {title && (
        <HeadingTag className={`section-heading-title ${theme}`}>
          {title}
        </HeadingTag>
      )}

      {subtitle && (
        <p className={`section-heading-subtitle ${theme}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
