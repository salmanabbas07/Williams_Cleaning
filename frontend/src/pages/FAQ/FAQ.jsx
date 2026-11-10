import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';
import PageBanner from '../../components/PageBanner/PageBanner';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import CTASection from '../../components/CTASection/CTASection';
import SEO from '../../components/SEO/SEO';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Kakšne vrste storitev gospodinjstva ponujate?',
      a: 'Zagotavljamo stalne, začasne in sezonske ekipe za hotele, letovišča in poslovne objekte — vključno z dnevnimi in globinskimi čiščenji sob, urejanjem kopalnic, skrbjo za posteljnino ter vzdrževanjem skupnih hotelskih prostorov pod vodstvom izkušenih nadzornikov.'
    },
    {
      q: 'Ali lahko zagotovite osebje v času glavne sezone?',
      a: 'Naša kadrovska baza omogoča pravočasno okrepitev vaših kapacitet v mesecih z najvišjo zasedenostjo, ko se obseg menjav in prijav gostov bistveno poveča.'
    },
    {
      q: 'Kako hitro lahko zagotovite začasno ali nadomestno osebje?',
      a: 'V večini primerov lahko ustrezno usposobljeno nadomestno osebje zagotovimo v roku 24 do 48 ur po prejemu vašega povpraševanja.'
    },
    {
      q: 'Ali so v vaših ekipah vključeni tudi nadzorniki kakovosti?',
      a: 'Naše ekipe delujejo pod neposrednim vodstvom izkušenih vodij izmen in nadzornikov, ki bdijo nad doslednim izvajanjem dogovorjenih standardov čistoče.'
    },
    {
      q: 'Katere lokacije pokrivate v Sloveniji in regiji?',
      a: 'Naše storitve so na voljo po celotni Sloveniji ter po predhodnem dogovoru tudi v obmejnih turističnih regijah.'
    },
    {
      q: 'Kako poteka izbira in usposabljanje vašega kadra?',
      a: 'Uporabljamo strog 5-stopenjski postopek preverjanja referenc, praktičnega testiranja in usposabljanja po veljavnih hotelskih standardih.'
    },
    {
      q: 'Ali ponujate tudi čiščenje poslovnih in pisarniških prostorov?',
      a: 'Da, poleg hotelskih storitev ponujamo celovito redno in periodično vzdrževanje poslovnih zgradb, pisarn ter salonov.'
    },
    {
      q: 'Kakšen nadzor kakovosti uporabljate za zagotavljanje konsistence?',
      a: 'Izvajamo redne kontrolne sezname (SOP), anonimne preglede ter tedenska poročila o doseganju dogovorjenih standardov kakovosti.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <div className="faq-page">
      <SEO
        title="Pogosta vprašanja | Williams Housekeeping čiščenje"
        description="Poiščite odgovore na pogosta vprašanja o hotelskem gospodinjstvu, odzivnem času, standardih kakovosti in najemu ekip za čiščenje pri Williams Housekeeping."
        canonical="https://www.williamscleaning.si/pogosta-vprasanja"
        schemaJson={faqSchema}
      />
      <PageBanner
        title="Pogosta vprašanja"
        subtitle="Odgovori na najpogostejša vprašanja o naših storitvah, organizaciji dela in sodelovanju."
        breadcrumbs={[{ name: 'Domov', path: '/' }]}
        image="/images/FAQ_lp.png"
      />

      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Pogosta vprašanja"
            title="Imate vprašanja? Tukaj so odgovori."
            subtitle="Če med spodnjimi odgovori ne najdete želene informacije, smo vam vedno na voljo prek kontaktnih kanalov."
            centered={true}
          />

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 overflow-hidden transition-all bg-white shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B70A6] focus:ring-inset"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-gray-900 text-base sm:text-lg leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0B70A6] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-gray-50/40 animate-fadeIn">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Imate specifično vprašanje za vaš objekt?"
        subtitle="Naša ekipa vam bo z veseljem podrobno razložila vse podrobnosti sodelovanja in pripravila neobvezujočo ponudbo."
        primaryBtnText="Pošljite povpraševanje"
        primaryBtnTo="/kontakt"
      />
    </div>
  );
}
