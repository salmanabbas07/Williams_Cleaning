import React from 'react';
import { Star } from 'lucide-react';
import ImagePlaceholder from '../ImagePlaceholder/ImagePlaceholder';
import './TestimonialCard.css';

/**
 * Reusable Testimonial Card
 */
export default function TestimonialCard({
  quote = 'Claviro Cleaning nam zagotavlja izjemno zanesljivo in profesionalno ekipo.',
  author = 'Zadovoljen naročnik',
  position = 'Vodja operacij',
  company = 'Hotelski partner',
  rating = 5,
  className = ''
}) {
  return (
    <div className={`testimonial-card-component ${className}`}>
      <div>
        {/* Rating Stars using Claviro Champagne Gold */}
        <div className="testimonial-card-stars" aria-label={`Ocena: ${rating} od 5 zvezdic`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'text-[#C5A46D] fill-[#C5A46D]' : 'text-[#D8ECEE]'
              }`}
            />
          ))}
        </div>

        {/* Quote content */}
        <p className="testimonial-card-quote">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* Author details */}
      <div className="testimonial-card-footer">
        <ImagePlaceholder
          aspectRatio="aspect-square"
          rounded="rounded-full"
          className="w-11 h-11 shrink-0 border border-[#32B3BF]/40"
          label="Avatar"
        />
        <div className="min-w-0">
          <div className="testimonial-card-author-name truncate">
            {author}
          </div>
          <div className="testimonial-card-author-role truncate">
            {position}
          </div>
          {company && (
            <div className="testimonial-card-author-company truncate">
              {company}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
