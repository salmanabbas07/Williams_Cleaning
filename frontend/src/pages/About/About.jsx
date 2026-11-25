import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Users,
  ShieldCheck,
  Clock,
  ArrowRight,
  Layers
} from 'lucide-react';
import PageBanner from '../../components/PageBanner/PageBanner';
import SectionHeading from '../../components/SectionHeading/SectionHeading';
import ImagePlaceholder from '../../components/ImagePlaceholder/ImagePlaceholder';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import CTASection from '../../components/CTASection/CTASection';
import Button from '../../components/Button/Button';
import SEO from '../../components/SEO/SEO';
import { testimonialsData } from '../../data/testimonials';
import { processStepsData } from '../../data/processSteps';
import './About.css';

export default function About() {
  const whyChooseFeatures = [
    {
      icon: Layers,
      title: 'Celovite rešitve',
      description:
        'Od vsakodnevnega gospodinjstva do globinske obnove, nege preprog, čiščenja stekel in okolju prijaznega vzdrževanja vrtov — zagotavljamo popolne, celovite rešitve na enem mestu.',
      bullets: [
        'Vsakodnevno gospodinjstvo in tekoče vzdrževanje',
        'Globinska obnova, nega preprog in profesionalno čiščenje stekel',
        'Okolju prijazno vzdrževanje vrtov in urejanje okolice'
      ]
    },
    {
      icon: Users,
      title: 'Usposobljena in profesionalna ekipa',
      description:
        'Naše osebje je preverjeno, temeljito strokovno usposobljeno in opremljeno z vodilnimi tehnikami v panogi, kar zagotavlja zanesljive in dosledne rezultate.',
      bullets: [
        'Preverjeni kadri z ustreznimi kompetencami in izkušnjami',
        'Strokovna usposobljenost po vodilnih standardih v panogi',
        'Zanesljivost, diskretnost in dosledna kakovost izvedbe'
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Sodobna oprema in varni izdelki',
      description:
        'Uporabljamo napredno opremo za čiščenje ter okolju prijazna in varna čistilna sredstva, ki zagotavljajo visok higienski standard brez škodovanja okolju.',
      bullets: [
        'Napredna profesionalna oprema in pripomočki',
        'Ekološka, varna in zdravju prijazna čistilna sredstva',
        'Visoka raven higiene z odgovornim ravnanjem do okolja'
      ]
    },
    {
      icon: Clock,
      title: 'Prilagojeni načrti storitev',
      description:
        'Zavedamo se, da je vsak prostor drugačen. Ponujamo prilagodljive urnike (dnevno, tedensko, mesečno ali enkratno globinsko čiščenje), ki se nemoteno ujemajo z vašim proračunom in operativnimi potrebami.',
      bullets: [
        'Prilagodljivi urniki: dnevno, tedensko ali mesečno čiščenje',
        'Enkratna specializirana in globinska čiščenja',
        'Popolna prilagoditev vašim operativnim potrebam in proračunu'
      ]
    }
  ];

  return (
    <div className="about-page">
      <SEO
        title="O nas | Claviro Cleaning strokovno hotelsko čiščenje"
        description="Spoznajte Claviro Cleaning — vaš zanesljiv partner za profesionalno hotelsko gospodinjstvo, poslovno čiščenje in vzdrževanje objektov po Sloveniji."
        canonical="https://www.williamscleaning.si/o-nas"
      />
      {/* 1. Page Banner */}
      <PageBanner
        title="O nas"
        subtitle="Dobrodošli pri Claviro Cleaning — vašem zanesljivem partnerju za brezhibno čiste in zdrave prostore."
        breadcrumbs={[{ name: 'Domov', path: '/' }]}
        image="/images/about_lp.webp"
      />

      {/* 2. Company Introduction */}
      <section className="py-10 sm:py-14 bg-[var(--website-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <ImagePlaceholder
                  src="/images/about_image.webp"
                  alt="Predstavitev ekipe Claviro Cleaning za hotelsko gospodinjstvo in poslovno čiščenje"
                  aspectRatio="aspect-[4/5]"
                  rounded="rounded-2xl"
                  label="Predstavitev ekipe Claviro Cleaning"
                  className="shadow-xl border-2 border-[rgba(10,84,99,0.10)]"
                />
              </div>
            </div>

            {/* Right Column: Company Info */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F8F4EB] text-[#0A5463] border border-[rgba(10,84,99,0.10)] shadow-sm mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>O nas &bull; Claviro Cleaning</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0A5463] leading-tight mb-4">
                Dobrodošli pri Claviro Cleaning — Vaš zanesljiv partner za brezhibne in zdrave prostore
              </h2>

              <p className="text-[#46545A] text-base leading-relaxed mb-4">
                Pri Claviro Cleaning verjamemo, da je čisto okolje temelj zdravja, produktivnosti in miru. Smo ponudnik profesionalnih rešitev za čiščenje, predan zagotavljanju vrhunskih storitev, prilagojenih edinstvenim potrebam stanovanjskih, poslovnih in komercialnih naročnikov.
              </p>

              <p className="text-[#46545A] text-sm leading-relaxed mb-6">
                Ne glede na to, ali gre za osvežitev vašega doma, vzdrževanje higienskega in navdihujočega pisarniškega delovnega prostora, vrhunsko oskrbo vrtov in urejanje okolice ali ponudbo globinskega čiščenja in vzdrževanja za hotele ter nastanitvene obrate — poskrbimo za vse. Naše strokovno znanje zajema vse vrste specializiranih storitev čiščenja, s čimer zagotavljamo, da vsak kotiček prejme skrb in pozornost, ki si jo zasluži.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0A5463]">
                  <CheckCircle2 className="w-5 h-5 text-[#168B9F] shrink-0" />
                  <span>Osvežitev domov in stanovanj</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0A5463]">
                  <CheckCircle2 className="w-5 h-5 text-[#168B9F] shrink-0" />
                  <span>Higienski pisarniški in poslovni prostori</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0A5463]">
                  <CheckCircle2 className="w-5 h-5 text-[#168B9F] shrink-0" />
                  <span>Vrhunska oskrba vrtov in urejanje okolice</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0A5463]">
                  <CheckCircle2 className="w-5 h-5 text-[#168B9F] shrink-0" />
                  <span>Globinsko čiščenje hotelov in nastanitev</span>
                </div>
              </div>

              <div>
                <Button to="/kontakt" variant="primary" size="md" icon={ArrowRight}>
                  Pošljite povpraševanje
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 5-STEP HIRING & TRAINING SYSTEM */}
      <section className="process-section" aria-label="Izbirni postopek">
        <div className="process-container-narrow">
          <SectionHeading
            badge="Izbirni postopek"
            title="Celovit 5-stopenjski sistem izbire in usposabljanja"
            subtitle="Zagotavljamo preverjeno, strokovno usposobljeno in motivirano osebje za hotelsko gospodinjstvo in poslovno čiščenje."
            centered={true}
          />

          <div className="process-timeline">
            {processStepsData.map((stepItem) => (
              <div key={stepItem.step} className="process-step-item">
                {/* Step Number Circle */}
                <div className="process-step-badge">
                  {stepItem.step}
                </div>

                {/* Step Content */}
                <div className="process-step-card">
                  <h3 className="process-step-title">
                    {stepItem.title}
                  </h3>
                  <p className="process-step-desc">
                    {stepItem.description}
                  </p>
                  <ul className="process-bullets">
                    {stepItem.items.map((bullet, idx) => (
                      <li key={idx} className="process-bullet-item">
                        <CheckCircle2 className="process-check-icon" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Claviro Cleaning Section */}
      <section className="py-10 sm:py-14 bg-[var(--website-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Zakaj izbrati nas"
            title="Zakaj izbrati Claviro Cleaning?"
            subtitle="Zanesljivost, strokovnost in celovita podpora za brezhibno urejene prostore."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8F4EB] p-7 sm:p-8 rounded-2xl border border-[rgba(10,84,99,0.10)] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-[#168B9F]/15 text-[#168B9F] flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0A5463] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#46545A] leading-relaxed mb-5">
                      {feature.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#46545A] pt-4 border-t border-[rgba(10,84,99,0.10)]">
                    {feature.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#168B9F] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-10 sm:py-14 bg-[var(--website-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Mnenja partnerjev"
            title="Kaj pravijo naši hotelski partnerji"
            subtitle="Zadovoljstvo naših naročnikov in njihovih gostov je naše glavno vodilo."
            centered={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonialsData.slice(0, 2).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                author={testimonial.author}
                position={testimonial.position}
                company={testimonial.company}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <CTASection
        title="Prepustite nam skrb za čistočo"
        subtitle="Pri Claviro Cleaning ne le čistimo prostorov — preoblikujemo jih v bolj zdrava, svetlejša in prijetnejša okolja. Stopite v stik z nami!"
        primaryBtnText="Pošljite povpraševanje"
        primaryBtnTo="/kontakt"
      />
    </div>
  );
}
