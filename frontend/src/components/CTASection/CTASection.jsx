import React from 'react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import Button from '../Button/Button';
import './CTASection.css';

/**
 * Reusable CTASection Component
 * High-converting call-to-action banner
 */
export default function CTASection({
  title = 'Zanesljive rešitve za brezhibno čistočo vaših prostorov',
  subtitle = 'Stopite v stik z našo ekipo in skupaj bomo oblikovali prilagojeno ponudbo za vaše hotelske ali poslovne prostore.',
  badge = 'POVVPRAŠEVANJE & SODELOVANJE',
  primaryBtnText = 'Pošljite povpraševanje',
  primaryBtnTo = '/kontakt',
  secondaryBtnText = 'Pokličite nas: +386 69 803 622',
  secondaryBtnHref = 'tel:+38669803622',
  secondaryBtn2Text = 'Pokličite nas: 040 791 618',
  secondaryBtn2Href = 'tel:040791618',
  className = ''
}) {
  return (
    <section className={`cta-section ${className}`}>
      {/* Decorative ambient glow */}
      <div className="cta-glow-top" aria-hidden="true" />
      <div className="cta-glow-bottom" aria-hidden="true" />

      <div className="cta-content">
        {badge && (
          <div className="cta-badge">
            <Sparkles className="w-3.5 h-3.5 text-[#32B3BF]" />
            <span>{badge}</span>
          </div>
        )}

        <h2 className="cta-title">
          {title}
        </h2>

        <p className="cta-subtitle">
          {subtitle}
        </p>

        <div className="cta-buttons-row">
          <Button
            to={primaryBtnTo}
            variant="primary"
            size="lg"
            icon={ArrowRight}
            className="w-full sm:w-auto shadow-lg"
          >
            {primaryBtnText}
          </Button>

          {secondaryBtnHref && (
            <Button
              href={secondaryBtnHref}
              variant="outlineWhite"
              size="lg"
              icon={PhoneCall}
              className="w-full sm:w-auto"
            >
              {secondaryBtnText}
            </Button>
          )}

          {secondaryBtn2Href && (
            <Button
              href={secondaryBtn2Href}
              variant="outlineWhite"
              size="lg"
              icon={PhoneCall}
              className="w-full sm:w-auto"
            >
              {secondaryBtn2Text}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
