import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './PageBanner.css';

/**
 * Reusable PageBanner component
 * Displays page title, breadcrumb navigation, and dark background matching reference.
 */
export default function PageBanner({
  title = 'Williams Housekeeping',
  subtitle = '',
  breadcrumbs = [{ name: 'Domov', path: '/' }],
  image = null
}) {
  return (
    <section className="page-banner relative text-white overflow-hidden text-left">
      {/* Background Image */}
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="page-banner-img"
        />
      )}

      {/* Dark gradient overlay behind text to ensure crisp legibility without coloring the image */}
      {image ? (
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20 pointer-events-none"
          aria-hidden="true"
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/20 via-[#141414] to-[#0B0B0C] opacity-90 pointer-events-none" />
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left pt-14 sm:pt-20 lg:pt-24 pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-3 drop-shadow-md text-left">
          {title}
        </h1>

        {subtitle && (
          <p className="text-slate-100 max-w-2xl text-base sm:text-lg mb-5 leading-relaxed drop-shadow text-left">
            {subtitle}
          </p>
        )}

        {/* Breadcrumb */}
        <nav aria-label="Drobtice" className="flex items-center justify-start gap-2 text-sm text-slate-200 drop-shadow text-left">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.path || idx}>
              {idx > 0 && <ChevronRight className="w-4 h-4 text-slate-300 drop-shadow" />}
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {crumb.name}
                </Link>
              ) : (
                <span className="text-[#D4AF37] font-semibold">{crumb.name}</span>
              )}
            </React.Fragment>
          ))}
          <ChevronRight className="w-4 h-4 text-slate-300 drop-shadow" />
          <span className="text-[#D4AF37] font-semibold">{title}</span>
        </nav>
      </div>
    </section>
  );
}
