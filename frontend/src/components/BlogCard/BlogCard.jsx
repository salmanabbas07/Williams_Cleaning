import React from 'react';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import './BlogCard.css';

/**
 * Reusable BlogCard Component
 */
export default function BlogCard({
  id,
  title = 'Aktualne novice in strokovni nasveti',
  image = null,
  date = '24. Okt 2025',
  category = 'Novice',
  excerpt = 'Kratka vsebina in strokovni poudarki iz sveta hotelirstva in čiščenja.',
  readTime = '4 min branja',
  className = ''
}) {
  return (
    <article className={`blog-card group ${className}`}>
      <div className="blog-card-img-wrapper">
        <ImagePlaceholder
          src={image}
          alt={`Članek: ${title} — Williams Housekeeping blog`}
          aspectRatio="aspect-[16/10]"
          rounded="rounded-xl"
          label={`Slika: ${title}`}
          className="transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>

      <div className="blog-card-body">
        <div className="blog-card-meta">
          <span className="blog-meta-item highlight">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </span>
          <span className="text-gray-300">•</span>
          <span className="blog-meta-item">
            <Clock className="w-3.5 h-3.5" />
            {readTime}
          </span>
        </div>

        <h3 className="blog-card-title">
          {title}
        </h3>

        <p className="blog-card-excerpt">
          {excerpt}
        </p>

        <div className="blog-card-footer">
          <Link to="/blog" className="blog-read-more-link">
            <span>Preberi več</span>
            <ArrowRight className="blog-read-more-icon" />
          </Link>
        </div>
      </div>
    </article>
  );
}
