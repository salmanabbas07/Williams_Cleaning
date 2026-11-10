import React from 'react';
import { MapPin, Phone, Mail, Globe, Sparkles } from 'lucide-react';
import PageBanner from '../../components/PageBanner/PageBanner';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ContactForm from '../../components/ContactForm/ContactForm';
import ImagePlaceholder from '../../components/ImagePlaceholder/ImagePlaceholder';
import Button from '../../components/Button/Button';
import SEO from '../../components/SEO/SEO';
import './Contact.css';

export default function Contact() {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Naslov sedeža',
      content: 'Kotnikova ulica 28, 1000 Ljubljana, Slovenija',
      note: 'Slovenija',
      link: null
    },
    {
      icon: Phone,
      title: 'Telefonski kontakt',
      phones: [
        { text: '+386 69 803 622', link: 'tel:+38669803622' },
        { text: '040 791 618', link: 'tel:040791618' }
      ],
      note: 'Pon - Pet: 08:00 - 18:00'
    },
    {
      icon: Mail,
      title: 'Elektronski naslov',
      content: 'info.willamscleaning@gmail.com',
      note: 'Odziv v roku 24 ur',
      link: 'mailto:info.willamscleaning@gmail.com'
    },
    {
      icon: Globe,
      title: 'Uradna spletna stran',
      content: 'www.williamshousekeeping.com',
      note: 'williamshousekeeping.com',
      link: 'https://williamshousekeeping.com'
    }
  ];

  return (
    <div className="contact-page">
      <SEO
        title="Kontakt | Williams Housekeeping čiščenje Ljubljana"
        description="Stopite v stik z Williams Housekeeping za ponudbo hotelskega gospodinjstva in poslovnega čiščenja: +386 69 803 622, Kotnikova ulica 28, 1000 Ljubljana."
        canonical="https://www.williamscleaning.si/kontakt"
      />
      {/* 1. Page Banner */}
      <PageBanner
        title="Kontakt"
        subtitle="Stopite v stik z našo strokovno ekipo za brezplačno svetovanje in neobvezujočo ponudbo."
        breadcrumbs={[{ name: 'Domov', path: '/' }]}
        image="/images/contact_lp.png"
      />

      {/* 2. Contact Info Cards */}
      <section className="py-16 sm:py-20 bg-gray-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactDetails.map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 sm:p-7 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#EEA800] flex items-center justify-center mb-4 border border-amber-100 group-hover:bg-[#EEA800] group-hover:text-[#0B4D26] transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      {item.title}
                    </h3>
                    {item.phones ? (
                      <div className="space-y-1">
                        {item.phones.map((phone, pIdx) => (
                          <a
                            key={pIdx}
                            href={phone.link}
                            className="text-base font-bold text-[#0B4D26] hover:text-[#EEA800] transition-colors block break-words"
                          >
                            {phone.text}
                          </a>
                        ))}
                      </div>
                    ) : item.link ? (
                      <a
                        href={item.link}
                        target={item.link.startsWith('http') ? '_blank' : undefined}
                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-base font-bold text-[#0B4D26] hover:text-[#EEA800] transition-colors block break-words"
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-base font-bold text-gray-900 leading-snug">
                        {item.content}
                      </p>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
                    {item.note}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Main Form & Info Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Section intro and details */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Stopite v stik</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-brand-green leading-tight mb-4">
                Pošljite nam vaše povpraševanje
              </h2>

              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Izpolnite obrazec s podatki o vašem objektu ali nas neposredno pokličite. Z veseljem vam bomo svetovali in pripravili optimalno rešitev.
              </p>

              {/* Call Widget directly matching user uploaded image */}
              <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200/80 mb-8 shadow-sm">
                <Button
                  href="tel:+38669803622"
                  variant="primary"
                  size="md"
                  className="w-full mb-4 shadow-md"
                >
                  POKLIČITE ZDAJ
                </Button>

                <div className="space-y-2 pt-1 text-left">
                  <a
                    href="tel:+38669803622"
                    className="text-2xl font-black text-[#0B4D26] hover:underline block tracking-tight leading-tight"
                  >
                    + 386 69 803 622
                  </a>

                  <a
                    href="tel:040791618"
                    className="text-2xl font-black text-[#0B4D26] hover:underline block tracking-tight leading-tight"
                  >
                    040 791 618
                  </a>

                  <a
                    href="https://wa.me/38669803622"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#0B4D26] hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-[#EEA800] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.112.551 4.177 1.6 6l-1.7 6.2 6.35-1.66c1.76.96 3.75 1.46 5.752 1.46h.005c6.634 0 12.001-5.367 12.001-11.988 0-3.205-1.248-6.218-3.518-8.487C18.25 1.252 15.238 0 12.031 0zm0 21.98c-1.79 0-3.55-.48-5.09-1.39l-.36-.22-3.78.99 1.01-3.68-.24-.38a9.98 9.98 0 01-1.53-5.31c0-5.52 4.49-10.01 10.01-10.01 2.67 0 5.18 1.04 7.07 2.93 1.89 1.89 2.93 4.4 2.93 7.07 0 5.52-4.49 10-9.99 10zm5.48-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
                    </svg>
                    <span>WhatsApp: +386 69 803 622</span>
                  </a>

                  <a
                    href="mailto:info.willamscleaning@gmail.com"
                    className="text-sm font-semibold text-[#0B4D26] hover:underline flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[#EEA800] shrink-0" />
                    <span>info.willamscleaning@gmail.com</span>
                  </a>

                  <a
                    href="https://williamshousekeeping.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-600 hover:text-[#0B4D26] flex items-center gap-2 pt-1 border-t border-amber-200/60"
                  >
                    <Globe className="w-3.5 h-3.5 text-[#EEA800] shrink-0" />
                    <span>www.williamshousekeeping.com</span>
                  </a>

                  <div className="pt-2 border-t border-amber-200/60 flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-medium">Sledite nam:</span>
                    <a
                      href="https://www.facebook.com/Williams.Cleanings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#0B4D26] transition-colors"
                      title="Facebook Business"
                      aria-label="Facebook Business"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/williams.cleaners.slovenia?rpxt=YnB3Zm1vcm1rOXpk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#0B4D26] transition-colors"
                      title="Instagram"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                  Lokacija na zemljevidu (Ljubljana)
                </h4>
                <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                  <ImagePlaceholder
                    aspectRatio="aspect-[16/9]"
                    rounded="rounded-none"
                    label="Zemljevid: Kotnikova ulica 28, Ljubljana"
                    className="bg-slate-100"
                  />
                  <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                      Kotnikova ulica 28, Ljubljana
                    </span>
                    <a
                      href="https://maps.google.com/?q=Kotnikova+ulica+28,+1000+Ljubljana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0B70A6] font-semibold hover:underline"
                    >
                      Odpri v Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Validated Contact Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
