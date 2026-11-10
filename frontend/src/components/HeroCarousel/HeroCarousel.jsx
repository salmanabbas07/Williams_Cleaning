import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone
} from 'lucide-react';
import Button from '../Button/Button';
import './HeroCarousel.css';

/**
 * HeroCarousel Component
 * Features:
 * - Smooth horizontal track sliding transition
 * - Consistent autoplay with pause-on-hover & clean timer reset on interaction
 * - Perfect vertical centering and padding to keep content inside bounds
 * - Eager initial image load, lazy subsequent images
 * - Touch swipe & keyboard navigation
 */
const heroSlidesData = [
  {
    id: 1,
    image: '/images/bannerLP1.png',
    badge: 'Williams Housekeeping • Zanesljiva hotelska podpora',
    title: 'Vrhunske ekipe za hotelsko gospodinjstvo in poslovno čiščenje',
    description:
      'Zanesljive, usposobljene in strokovno vodene ekipe za brezhibno čistočo vaših hotelov, letovišč in poslovnih prostorov. Prilagodljive kadrovske rešitve z najvišjo stopnjo evropske kakovosti in 24/7 podporo.',
    primaryBtn: {
      text: 'Pošljite povpraševanje',
      to: '/kontakt'
    },
    secondaryBtn: {
      text: 'Pokličite: +386 69 803 622',
      href: 'tel:+38669803622'
    }
  },
  {
    id: 2,
    image: '/images/bannerLP2.png',
    badge: 'Vrhunski standardi • Strokovno usposobljeno osebje',
    title: 'Brezhibna čistoča in najvišji higienski standardi',
    description:
      'Rigorozno izbrano in certificirano osebje, prilagojeno specifičnim zahtevam vašega hotela ali poslovnega objekta. Zagotovite vašim cenjenim gostom nepozabno izkušnjo udobja in reda.',
    primaryBtn: {
      text: 'Naše storitve',
      to: '/storitve'
    },
    secondaryBtn: {
      text: 'Pokličite: +386 69 803 622',
      href: 'tel:+38669803622'
    }
  },
  {
    id: 3,
    image: '/images/bannerLP3.png',
    badge: 'Prilagodljive rešitve • 24/7 operativna podpora',
    title: 'Zanesljiv partner za sezonske in dolgoročne potrebe',
    description:
      'Hitra odzivnost, stalen nadzor kakovosti na terenu ter takojšnja menjava kadra v primeru nepredvidenih potreb. Skrbimo za vaše prostore, da se vi lahko brez skrbi osredotočite na goste.',
    primaryBtn: {
      text: 'Stopite v stik z nami',
      to: '/kontakt'
    },
    secondaryBtn: {
      text: 'Več o nas',
      to: '/o-nas'
    }
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);
  const touchEndXRef = useRef(null);
  const autoPlayIntervalRef = useRef(null);

  const totalSlides = heroSlidesData.length;

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Helper to restart autoplay timer on manual interactions
  const resetAutoplayTimer = useCallback(() => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
    }
    if (!isPaused) {
      autoPlayIntervalRef.current = setInterval(() => {
        goToNextSlide();
      }, 5000);
    }
  }, [isPaused, goToNextSlide]);

  // Autoplay management
  useEffect(() => {
    if (isPaused) {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
      return;
    }

    autoPlayIntervalRef.current = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isPaused, goToNextSlide]);

  // Manual navigation handlers that reset the timer
  const handleManualNext = () => {
    goToNextSlide();
    resetAutoplayTimer();
  };

  const handleManualPrev = () => {
    goToPrevSlide();
    resetAutoplayTimer();
  };

  const handleManualDot = (idx) => {
    goToSlide(idx);
    resetAutoplayTimer();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handleManualPrev();
    } else if (e.key === 'ArrowRight') {
      handleManualNext();
    }
  };

  // Touch swipe handling
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      const minSwipeDistance = 45;
      if (distance > minSwipeDistance) {
        handleManualNext();
      } else if (distance < -minSwipeDistance) {
        handleManualPrev();
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <section
      className="hero-carousel-section"
      aria-label="Predstavitvena pasica"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="hero-carousel-container">
        <div
          className="hero-carousel-frame"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Williams Housekeeping predstavitveni vrtiljak"
        >
          {/* Viewport with sliding track */}
          <div className="hero-carousel-viewport">
            <div
              className="hero-carousel-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {heroSlidesData.map((slide, idx) => {
                const isInitial = idx === 0;

                return (
                  <div
                    key={slide.id}
                    className="hero-slide-item"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} od ${totalSlides}: ${slide.title}`}
                  >
                    {/* Left Side: Single Image covering left side */}
                    <div className="hero-slide-media">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="hero-slide-img"
                        loading={isInitial ? 'eager' : 'lazy'}
                        fetchPriority={isInitial ? 'high' : 'auto'}
                      />
                      <div className="hero-slide-media-overlay" aria-hidden="true" />
                    </div>

                    {/* Right Side: Slide Content */}
                    <div className="hero-slide-content">
                      {/* Badge */}
                      <div className="hero-slide-badge">
                        <Sparkles className="hero-slide-badge-icon" />
                        <span>{slide.badge}</span>
                      </div>

                      {/* Heading: single H1 for primary slide, H2 for secondary slides */}
                      {idx === 0 ? (
                        <h1 className="hero-slide-title">
                          {slide.title}
                        </h1>
                      ) : (
                        <h2 className="hero-slide-title">
                          {slide.title}
                        </h2>
                      )}

                      {/* Description */}
                      <p className="hero-slide-desc">
                        {slide.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="hero-slide-actions">
                        {slide.primaryBtn.to ? (
                          <Button
                            to={slide.primaryBtn.to}
                            variant="primary"
                            size="md"
                            icon={ArrowRight}
                            className="shadow-md"
                          >
                            {slide.primaryBtn.text}
                          </Button>
                        ) : null}

                        {slide.secondaryBtn.href ? (
                          <Button
                            href={slide.secondaryBtn.href}
                            variant="outline"
                            size="md"
                            showIconCircle={false}
                            className="border-2 border-[#0B4D26] text-[#0B4D26] hover:bg-[#0B4D26] hover:text-white"
                          >
                            {slide.secondaryBtn.text}
                          </Button>
                        ) : slide.secondaryBtn.to ? (
                          <Button
                            to={slide.secondaryBtn.to}
                            variant="outline"
                            size="md"
                            showIconCircle={false}
                            className="border-2 border-[#0B4D26] text-[#0B4D26] hover:bg-[#0B4D26] hover:text-white"
                          >
                            {slide.secondaryBtn.text}
                          </Button>
                        ) : null}
                      </div>

                      {/* Meta Row: Social & Direct Phone */}
                      <div className="hero-slide-meta">
                        <div className="flex items-center gap-3">
                          <span className="hero-social-label">
                            Sledite nam:
                          </span>
                          <div className="hero-social-list">
                            {/* Facebook Business */}
                            <a
                              href="https://www.facebook.com/Williams.Cleanings"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Facebook Business"
                              title="Facebook Business"
                              className="hero-social-btn"
                            >
                              <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                            </a>
                            {/* Instagram */}
                            <a
                              href="https://www.instagram.com/williams.cleaners.slovenia?rpxt=YnB3Zm1vcm1rOXpk"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Instagram"
                              title="Instagram"
                              className="hero-social-btn"
                            >
                              <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </a>
                            {/* WhatsApp */}
                            <a
                              href="https://wa.me/38669803622"
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="WhatsApp"
                              title="WhatsApp: +386 69 803 622"
                              className="hero-social-btn"
                            >
                              <svg fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.112.551 4.177 1.6 6l-1.7 6.2 6.35-1.66c1.76.96 3.75 1.46 5.752 1.46h.005c6.634 0 12.001-5.367 12.001-11.988 0-3.205-1.248-6.218-3.518-8.487C18.25 1.252 15.238 0 12.031 0zm0 21.98c-1.79 0-3.55-.48-5.09-1.39l-.36-.22-3.78.99 1.01-3.68-.24-.38a9.98 9.98 0 01-1.53-5.31c0-5.52 4.49-10.01 10.01-10.01 2.67 0 5.18 1.04 7.07 2.93 1.89 1.89 2.93 4.4 2.93 7.07 0 5.52-4.49 10-9.99 10zm5.48-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
                              </svg>
                            </a>
                          </div>
                        </div>

                        <div className="hero-contact-group">
                          <div className="hero-contact-inline">
                            <Phone className="w-3.5 h-3.5 text-[#EEA800] shrink-0" aria-hidden="true" />
                            <span>Telefon:</span>
                            <a href="tel:+38669803622" className="hero-phone-link">
                              +386 69 803 622
                            </a>
                          </div>
                          <div className="hero-contact-inline">
                            <Phone className="w-3.5 h-3.5 text-[#EEA800] shrink-0" aria-hidden="true" />
                            <span>Telefon:</span>
                            <a href="tel:040791618" className="hero-phone-link">
                              040 791 618
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={handleManualPrev}
            className="hero-nav-arrow prev"
            aria-label="Prejšnja prosojnica"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleManualNext}
            className="hero-nav-arrow next"
            aria-label="Naslednja prosojnica"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide Indicator Dots */}
          <div
            className="hero-carousel-dots"
            role="tablist"
            aria-label="Prosojnice"
          >
            {heroSlidesData.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleManualDot(idx)}
                className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Pojdi na prosojnico ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
