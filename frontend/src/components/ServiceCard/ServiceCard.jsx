import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import Button from '../Button/Button';
import './ServiceCard.css';

/**
 * ServiceCard Component
 * Reused across Home and Services pages.
 */
export default function ServiceCard({
  id,
  slug,
  title = 'Hotelsko gospodinjstvo',
  description = 'Profesionalne storitve čiščenja in vzdrževanja za vaše objekte.',
  features = [],
  image,
  aspectRatio = 'aspect-[16/10]',
  onSelect,
  className = ''
}) {
  const serviceSlug = slug || id;
  const targetUrl = `/services#${serviceSlug}`;

  const handleButtonClick = (e) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(serviceSlug);
    }
  };

  return (
    <article className={`service-card group ${className}`}>
      {/* Image Area */}
      <div className="service-card-img-wrapper">
        <ImagePlaceholder
          src={image}
          alt={`Storitve čiščenja: ${title} — Williams Housekeeping`}
          aspectRatio={aspectRatio}
          rounded="rounded-xl"
          label={`Slika: ${title}`}
          className="transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>

      {/* Card Content */}
      <div className="service-card-body">
        <h3 className="service-card-title">
          {title}
        </h3>

        <p className="service-card-desc">
          {description}
        </p>

        {features && features.length > 0 && (
          <ul className="service-card-features">
            {features.slice(0, 3).map((feat, idx) => (
              <li key={idx} className="service-card-feature-item">
                <CheckCircle2 className="service-card-feature-icon" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="service-card-footer">
          <Button
            to={targetUrl}
            onClick={handleButtonClick}
            variant="primary"
            size="sm"
            icon={ArrowRight}
            className="w-full sm:w-auto"
          >
            Več informacij
          </Button>
        </div>
      </div>
    </article>
  );
}
