import React, { useState, useRef } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from '../Button/Button';
import './ContactForm.css';

/**
 * ContactForm Component
 * Fully validated client-side in Slovenian
 * Handles: Ime in priimek, E-poštni naslov, Telefonska številka, Zadeva, Sporočilo
 * Shows transparent demo success notification with no fake backend delivery claims.
 */
export default function ContactForm({ className = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Prosimo, vnesite vaše ime in priimek.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Prosimo, vnesite vaš e-poštni naslov.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Vnesite veljaven e-poštni naslov (npr. ime@podjetje.si).';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Prosimo, izberite ali vnesite zadevo sporočila.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Prosimo, vnesite vsebino vašega sporočila.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Sporočilo mora vsebovati vsaj 10 znakov.';
    }
    if (!captchaToken) {
      errs.captcha = 'Prosimo, potrdite, da niste robot.';
    }
    return errs;
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
    if (errors.captcha) {
      setErrors(prev => ({ ...prev, captcha: null }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaToken(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate accidental clicks while submitting
    if (isSubmitting) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      // Connect to the backend API endpoint
      const apiUrl = import.meta.env.VITE_BACKEND_URL 
        ? `${import.meta.env.VITE_BACKEND_URL}/api/inquiry/send`
        : 'http://localhost:5000/api/inquiry/send';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Napaka pri pošiljanju povpraševanja. Prosimo, poskusite znova.');
      }

      // Success: show confirmation and reset form
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
      setErrors({});
      setServerError(null);
    } catch (err) {
      setIsSubmitting(false);
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
      setServerError(
        err.message || 'Prišlo je do napake pri povezavi s strežnikom. Prosimo, preverite internetno povezavo ali poskusite znova.'
      );
    }
  };

  return (
    <div className={`contact-form-wrapper bg-[#FFFFFF] p-6 sm:p-8 md:p-10 rounded-2xl border border-[#D8ECEE] shadow-md ${className}`}>
      {submitted ? (
        <div className="py-10 text-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#168B9F]/15 text-[#168B9F] mx-auto flex items-center justify-center mb-5">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h3 className="text-2xl font-bold text-[#0A5463] mb-3">
            Sporočilo je bilo uspešno poslano!
          </h3>
          <p className="text-[#252525] text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Hvala za vaše povpraševanje! Vaše sporočilo smo uspešno prejeli. Naša strokovna ekipa vam bo odgovorila v najkrajšem možnem času.
          </p>
          <Button
            onClick={() => {
              setSubmitted(false);
              setServerError(null);
              setCaptchaToken(null);
              recaptchaRef.current?.reset();
            }}
            variant="primary"
            size="md"
          >
            Pošljite novo sporočilo
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Ime in priimek */}
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Ime in priimek <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Npr. Janez Novak"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                    : 'border-[#D8ECEE] focus:border-[#249FAF] focus:ring-2 focus:ring-[rgba(36,159,175,0.18)]'
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* E-pošta */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                E-poštni naslov <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ime@primer.si"
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                    : 'border-[#D8ECEE] focus:border-[#249FAF] focus:ring-2 focus:ring-[rgba(36,159,175,0.18)]'
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Telefon */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Telefonska številka <span className="text-gray-500 font-normal text-[11px]">(neobvezno)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+386 69 803 622"
                className="w-full px-4 py-3 rounded-xl border border-[#D8ECEE] text-sm focus:border-[#249FAF] focus:ring-2 focus:ring-[rgba(36,159,175,0.18)] transition-all focus:outline-none"
              />
            </div>

            {/* Zadeva */}
            <div>
              <label htmlFor="subject" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Zadeva povpraševanja <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all bg-white focus:outline-none focus:ring-2 ${
                  errors.subject
                    ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                    : 'border-[#D8ECEE] focus:border-[#249FAF] focus:ring-2 focus:ring-[rgba(36,159,175,0.18)]'
                }`}
                aria-invalid={!!errors.subject}
              >
                <option value="">Izberite vrsto storitve...</option>
                <option value="hotel-housekeeping">Hotelsko gospodinjstvo</option>
                <option value="seasonal-teams">Sezonske ekipe za čiščenje</option>
                <option value="temporary-support">Začasna podpora gospodinjstvu</option>
                <option value="subcontracting">Prilagodljivo podizvajanje</option>
                <option value="commercial-cleaning">Poslovno in pisarniško čiščenje</option>
                <option value="specialized-cleaning">Specialno in globinsko čiščenje</option>
                <option value="other">Drugo splošno vprašanje</option>
              </select>
              {errors.subject && (
                <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.subject}</span>
                </p>
              )}
            </div>
          </div>

          {/* Sporočilo */}
          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Vaše sporočilo / Podrobnosti povpraševanja <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Opišite vaše zahteve, lokacijo objekta, pričakovan obseg dela ali vprašanje..."
              className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-y ${
                errors.message
                  ? 'border-red-400 bg-red-50/20 focus:ring-red-400'
                  : 'border-[#D8ECEE] focus:border-[#249FAF] focus:ring-2 focus:ring-[rgba(36,159,175,0.18)]'
              }`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.message}</span>
              </p>
            )}
          </div>

          {/* reCAPTCHA "I'm not a robot" Checkbox */}
          <div className="pt-1">
            <div className="overflow-x-auto py-1">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''}
                onChange={handleCaptchaChange}
                onExpired={handleCaptchaExpired}
              />
            </div>
            {errors.captcha && (
              <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.captcha}</span>
              </p>
            )}
          </div>

          {/* Server Error Message */}
          {serverError && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs sm:text-sm text-red-700 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              icon={Send}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? 'Pošiljanje...' : 'Pošljite povpraševanje'}
            </Button>

            <span className="text-xs text-gray-500 text-center sm:text-right">
              Polja z zvezdico (<span className="text-red-500">*</span>) so obvezna.
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
