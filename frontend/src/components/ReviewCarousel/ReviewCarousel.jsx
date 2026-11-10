import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import SectionHeading from '../SectionHeading/SectionHeading';
import { testimonialsData } from '../../data/testimonials';
import './ReviewCarousel.css';

/**
 * ReviewCarousel Component
 * - Displays exactly 5 testimonial cards
 * - Continuous infinite marquee carousel that loops seamlessly without stopping
 * - Automatically continues moving and restarts smoothly without a visible jump
 * - Preserves existing design, colors, typography, spacing, and styling
 * - Fully responsive on desktop, tablet, and mobile
 * - Pauses on hover/touch for comfortable reading
 */
export default function ReviewCarousel() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      className="review-carousel-section"
      aria-label="Mnenja partnerjev"
    >
      <div className="review-carousel-container">
        {/* Section Heading */}
        <SectionHeading
          badge="Mnenja partnerjev"
          iconSrc="/images/title_icon.svg"
          title="Kaj o naših storitvah pravijo hotelski partnerji"
          centered={true}
        />

        {/* Continuous Seamless Carousel Viewport */}
        <div
          className="review-carousel-viewport"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          role="region"
          aria-label="Vrtiljak mnenj hotelskih partnerjev"
        >
          <div
            className="review-carousel-marquee"
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {/* Set 1: 5 Testimonial Cards */}
            <div className="review-marquee-set">
              {testimonialsData.map((testimonial) => {
                const initials = testimonial.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2);

                return (
                  <div
                    key={`t1-${testimonial.id}`}
                    className="review-slide-card"
                  >
                    <div className="review-card">
                      <div>
                        {/* 5 Stars + Quote Badge */}
                        <div className="review-card-top">
                          <div
                            className="review-stars"
                            aria-label={`Ocena: ${testimonial.rating} od 5 zvezdic`}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className="review-star-icon"
                              />
                            ))}
                          </div>
                          <div className="review-quote-badge" aria-hidden="true">
                            <Quote className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Review Quote */}
                        <p className="review-text">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </div>

                      {/* Author Metadata */}
                      <div className="review-author-row">
                        <div className="review-avatar" aria-hidden="true">
                          {initials || 'WH'}
                        </div>
                        <div className="review-author-meta">
                          <div className="review-author-name">
                            {testimonial.author}
                          </div>
                          <div className="review-author-role">
                            {testimonial.position}
                          </div>
                          {testimonial.company && (
                            <div className="review-author-company">
                              {testimonial.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Set 2: Identical Clone for Seamless Infinite Loop */}
            <div className="review-marquee-set" aria-hidden="true">
              {testimonialsData.map((testimonial) => {
                const initials = testimonial.author
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2);

                return (
                  <div
                    key={`t2-${testimonial.id}`}
                    className="review-slide-card"
                  >
                    <div className="review-card">
                      <div>
                        {/* 5 Stars + Quote Badge */}
                        <div className="review-card-top">
                          <div
                            className="review-stars"
                            aria-label={`Ocena: ${testimonial.rating} od 5 zvezdic`}
                          >
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className="review-star-icon"
                              />
                            ))}
                          </div>
                          <div className="review-quote-badge" aria-hidden="true">
                            <Quote className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Review Quote */}
                        <p className="review-text">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </div>

                      {/* Author Metadata */}
                      <div className="review-author-row">
                        <div className="review-avatar" aria-hidden="true">
                          {initials || 'WH'}
                        </div>
                        <div className="review-author-meta">
                          <div className="review-author-name">
                            {testimonial.author}
                          </div>
                          <div className="review-author-role">
                            {testimonial.position}
                          </div>
                          {testimonial.company && (
                            <div className="review-author-company">
                              {testimonial.company}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
