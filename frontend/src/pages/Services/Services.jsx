import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Clock,
  ChevronRight,
  Phone,
  Mail,
  Users
} from 'lucide-react';
import PageBanner from '../../components/PageBanner/PageBanner';
import Button from '../../components/Button/Button';
import SEO from '../../components/SEO/SEO';
import { servicesData, getServiceBySlug } from '../../data/services';
import './Services.css';

export default function Services() {
  const location = useLocation();

  // Currently active service for the main details layout
  const [activeServiceSlug, setActiveServiceSlug] = useState('hotel-housekeeping');

  // Find active service object (defaults to first service if not found)
  const activeService = getServiceBySlug(activeServiceSlug) || servicesData[0];

  // Sync with URL hash on load or hash change (e.g. /services#specialized-and-deep-cleaning)
  useEffect(() => {
    if (location.hash) {
      const hashClean = location.hash.replace('#', '');
      const matched = getServiceBySlug(hashClean);
      if (matched) {
        setActiveServiceSlug(matched.slug);
      }
    }
  }, [location.hash]);

  // Handler when clicking a service in the sidebar
  const handleSelectService = (slug) => {
    const matched = getServiceBySlug(slug);
    if (matched) {
      setActiveServiceSlug(matched.slug);
      window.history.replaceState(null, '', `#${matched.slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="services-page">
      <SEO
        title="Storitve čiščenja | Claviro Cleaning hotelsko gospodinjstvo"
        description="Celovite storitve čiščenja: hotelsko gospodinjstvo, sezonske ekipe, poslovno in pisarniško čiščenje ter globinsko vzdrževanje objektov po vsej Sloveniji."
        canonical="https://www.williamscleaning.si/storitve"
      />
      {/* 1. Page Banner */}
      <PageBanner
        title="Storitve"
        subtitle="Celovite storitve čiščenja, gospodinjstva in kadrovske podpore za hotele ter poslovne objekte."
        breadcrumbs={[{ name: 'Domov', path: '/' }]}
        image="/images/service_lp.webp"
      />

      <div className="bg-[var(--website-bg)] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 2-Column Content & Sidebar Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Main Service Details */}
          <main className="lg:col-span-8">
            {/* Featured Image */}
            <div className="service-detail-image-box mb-6 sm:mb-8">
              <img
                src={activeService.image}
                alt={`${activeService.title} — Profesionalne storitve Claviro Cleaning`}
                className="w-full h-auto max-h-[460px] object-cover rounded-2xl sm:rounded-3xl shadow-sm border border-[rgba(10,84,99,0.10)]"
              />
            </div>

            {/* Badge, Title & Intro Description */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F4EB] text-[#0A5463] text-xs font-bold mb-3 border border-[rgba(10,84,99,0.10)] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Podroben pregled</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A5463] tracking-tight mb-4">
                {activeService.title}
              </h1>
              <p className="text-base sm:text-lg text-[#46545A] leading-relaxed">
                {activeService.intro || activeService.description}
              </p>
            </div>

            {/* Section: Primerno za (Perfect For) */}
            {activeService.perfectFor && activeService.perfectFor.length > 0 && (
              <div className="service-detail-section mb-10 pb-8 border-b border-[rgba(10,84,99,0.10)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0A5463] mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#168B9F] inline-block" />
                  Primerno za
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {activeService.perfectFor.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-[#46545A] bg-[#F8F4EB] p-3 rounded-xl border border-[rgba(10,84,99,0.10)] shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#168B9F] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {activeService.perfectForNote && (
                  <div className="service-note-box amber-note">
                    <p className="text-xs sm:text-sm text-[#46545A] italic">
                      {activeService.perfectForNote}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Section: Kaj vključujejo naše storitve (What Our Teams Include) */}
            {activeService.includes && activeService.includes.length > 0 && (
              <div className="service-detail-section mb-10 pb-8 border-b border-[rgba(10,84,99,0.10)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0A5463] mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#168B9F] inline-block" />
                  Kaj vključujejo naše storitve
                </h2>

                <ul className="space-y-3 mb-5">
                  {activeService.includes.map((inc, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#46545A]">
                      <div className="w-5 h-5 rounded-full bg-[#168B9F]/15 text-[#168B9F] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>

                {activeService.supervisorNote && (
                  <div className="service-note-box emerald-note">
                    <ShieldCheck className="w-5 h-5 text-[#168B9F] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-[#46545A]">
                      {activeService.supervisorNote}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Section: Zakaj hoteli izberejo naše storitve (Why Hotels Choose Us) */}
            {activeService.whyChooseUs && activeService.whyChooseUs.length > 0 && (
              <div className="service-detail-section mb-10 pb-8 border-b border-[rgba(10,84,99,0.10)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0A5463] mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#168B9F] inline-block" />
                  Zakaj hoteli izberejo naše storitve
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                  {activeService.whyChooseUs.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-[#46545A] bg-[#F8F4EB] p-3.5 rounded-xl border border-[rgba(10,84,99,0.10)] shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#168B9F] shrink-0 mt-0.5" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {activeService.whyChooseUsCallout && (
                  <div className="service-callout-banner">
                    <Sparkles className="w-5 h-5 text-[#32B3BF] shrink-0" />
                    <span className="text-sm sm:text-base font-medium">
                      {activeService.whyChooseUsCallout}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Section: Zagotovljene kadrovske kategorije (Staff Categories Provided) */}
            {activeService.staffCategories && activeService.staffCategories.length > 0 && (
              <div className="service-detail-section mb-10 pb-8 border-b border-[rgba(10,84,99,0.10)]">
                <h2 className="text-xl sm:text-2xl font-bold text-[#0A5463] mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#168B9F] inline-block" />
                  Zagotovljene kadrovske kategorije
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                  {activeService.staffCategories.map((cat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-[#46545A] bg-[#F8F4EB] px-3.5 py-2.5 rounded-lg border border-[rgba(10,84,99,0.10)] shadow-sm">
                      <Users className="w-4 h-4 text-[#168B9F] shrink-0" />
                      <span className="font-medium">{cat}</span>
                    </div>
                  ))}
                </div>

                {activeService.staffNote && (
                  <p className="text-xs sm:text-sm text-[#46545A]/70 italic mt-2">
                    {activeService.staffNote}
                  </p>
                )}
              </div>
            )}
          </main>

          {/* Right Column: Sticky Sidebar Menu & Quick Contact */}
          <aside className="lg:col-span-4 sticky top-28 space-y-6">
            
            {/* All Services Navigation Card */}
            <div className="bg-[#F8F4EB] rounded-2xl border border-[rgba(10,84,99,0.10)] p-5 sm:p-6 shadow-sm">
              <h3 className="text-base sm:text-lg font-bold text-[#0A5463] mb-4 pb-3 border-b border-[rgba(10,84,99,0.10)] flex items-center justify-between">
                <span>Vse storitve</span>
                <span className="text-xs font-semibold text-[#0A5463] bg-[#168B9F]/15 px-2.5 py-0.5 rounded-full">
                  {servicesData.length}
                </span>
              </h3>

              <nav aria-label="Meni storitev" className="space-y-2">
                {servicesData.map((s) => {
                  const isCurrent = s.slug === activeService.slug || s.id === activeService.id;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleSelectService(s.slug)}
                      className={`w-full text-left group flex items-center justify-between px-4 py-3 rounded-xl text-xs sm:text-sm transition-all ${
                        isCurrent
                          ? 'bg-[#123B50] text-white font-bold shadow-sm'
                          : 'bg-[#F8F4EB] hover:bg-[#EFE9DC] text-[#0A5463] hover:text-[#0A5463] border border-[rgba(10,84,99,0.10)]'
                      }`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isCurrent
                            ? 'text-white'
                            : 'text-[#46545A]/50 group-hover:text-[#168B9F] group-hover:translate-x-0.5'
                        }`}
                      />
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Quick Inquiry / Contact Card */}
            <div className="bg-[#F8F4EB] text-[#46545A] rounded-2xl p-6 shadow-sm border border-[rgba(10,84,99,0.10)]">
              <div className="inline-flex items-center gap-1.5 bg-[#168B9F]/10 text-[#0A5463] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 border border-[rgba(10,84,99,0.10)]">
                <Clock className="w-3.5 h-3.5 text-[#168B9F]" />
                <span>Hitra ponudba v 24h</span>
              </div>

              <h4 className="text-lg font-bold text-[#0A5463] mb-2">
                Potrebujete hotelsko osebje?
              </h4>
              <p className="text-xs text-[#46545A] leading-relaxed mb-5">
                Stopite v stik z nami za neobvezujoč posvet in prilagojeno ponudbo za vaš objekt.
              </p>

              <div className="space-y-3 mb-6">
                <a
                  href="tel:+38669803622"
                  className="flex items-center gap-3 text-xs sm:text-sm text-[#46545A] hover:text-[#168B9F] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#168B9F]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#168B9F]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#46545A]/70">Telefon:</div>
                    <div className="font-semibold text-[#0A5463]">+386 69 803 622</div>
                  </div>
                </a>

                <a
                  href="tel:040791618"
                  className="flex items-center gap-3 text-xs sm:text-sm text-[#46545A] hover:text-[#168B9F] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#168B9F]/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#168B9F]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#46545A]/70">Telefon:</div>
                    <div className="font-semibold text-[#0A5463]">040 791 618</div>
                  </div>
                </a>

                <a
                  href="mailto:info.willamscleaning@gmail.com"
                  className="flex items-center gap-3 text-xs sm:text-sm text-[#46545A] hover:text-[#168B9F] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#168B9F]/10 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#168B9F]" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#46545A]/70">E-pošta:</div>
                    <div className="font-semibold text-[#0A5463] truncate">info.willamscleaning@gmail.com</div>
                  </div>
                </a>
              </div>

              <Button
                to="/kontakt"
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                Pošlji povpraševanje
              </Button>
            </div>

          </aside>
        </div>
      </div>
    </div>
  </div>
);
}
