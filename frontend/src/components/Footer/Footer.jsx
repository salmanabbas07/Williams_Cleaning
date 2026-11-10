import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Globe, ArrowUpRight } from 'lucide-react';
import Button from '../Button/Button';
import './Footer.css';

/**
 * Footer Component
 * Matches the official Williams Housekeeping branding and contact details
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-columns-grid">
          {/* Column 1: Brand & Logo */}
          <div>
            <Link to="/" className="footer-brand-logo-card" aria-label="Domov - Williams Housekeeping hotelsko in poslovno čiščenje">
              <img
                src="/images/main_logo.svg"
                alt="Williams Housekeeping — Vrhunske storitve čiščenja in hotelskega gospodinjstva"
                className="footer-logo-img"
              />
            </Link>

            <p className="footer-brand-desc">
              Williams Housekeeping zagotavlja zanesljive, strokovne in usposobljene ekipe za hotelsko ter poslovno čiščenje po najvišjih evropskih standardih.
            </p>

            {/* Social Media Buttons */}
            <div className="footer-social-row" aria-label="Družbena omrežja">
              <a
                href="https://www.facebook.com/Williams.Cleanings"
                aria-label="Facebook Business"
                title="Facebook Business"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/williams.cleaners.slovenia?rpxt=YnB3Zm1vcm1rOXpk"
                aria-label="Instagram"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://wa.me/38669803622"
                aria-label="WhatsApp"
                title="WhatsApp: +386 69 803 622"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.112.551 4.177 1.6 6l-1.7 6.2 6.35-1.66c1.76.96 3.75 1.46 5.752 1.46h.005c6.634 0 12.001-5.367 12.001-11.988 0-3.205-1.248-6.218-3.518-8.487C18.25 1.252 15.238 0 12.031 0zm0 21.98c-1.79 0-3.55-.48-5.09-1.39l-.36-.22-3.78.99 1.01-3.68-.24-.38a9.98 9.98 0 01-1.53-5.31c0-5.52 4.49-10.01 10.01-10.01 2.67 0 5.18 1.04 7.07 2.93 1.89 1.89 2.93 4.4 2.93 7.07 0 5.52-4.49 10-9.99 10zm5.48-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-heading">
              <span className="footer-heading-dot" />
              Hitre povezave
            </h4>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EEA800]" />
                  <span>Domov</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/o-nas">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EEA800]" />
                  <span>O nas</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/storitve">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EEA800]" />
                  <span>Storitve</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/pogosta-vprasanja">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EEA800]" />
                  <span>Pogosta vprašanja</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/blog">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EEA800]" />
                  <span>Blog</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/kontakt">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EEA800]" />
                  <span>Kontakt</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h4 className="footer-heading">
              <span className="footer-heading-dot" />
              Naše storitve
            </h4>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/service/hotel-housekeeping">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7BB6D0]" />
                  <span>Hotelsko gospodinjstvo</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/service/seasonal-housekeeping-teams">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7BB6D0]" />
                  <span>Sezonske ekipe za čiščenje</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/service/temporary-housekeeping-support">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7BB6D0]" />
                  <span>Začasna podpora gospodinjstvu</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/service/flexible-subcontracting">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7BB6D0]" />
                  <span>Prilagodljivo podizvajanje</span>
                </Link>
              </li>
              <li className="footer-link-item">
                <Link to="/service/business-and-office-cleaning">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7BB6D0]" />
                  <span>Poslovno in pisarniško čiščenje</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us & Quick Call Widget */}
          <div>
            <h4 className="footer-heading">
              <span className="footer-heading-dot" />
              Kontakt
            </h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <div className="footer-contact-icon-box">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="footer-contact-label">Naslov</div>
                  <span className="footer-contact-val">
                    Kotnikova ulica 28, 1000 Ljubljana, Slovenija
                  </span>
                </div>
              </div>

              <div className="footer-contact-item">
                <div className="footer-contact-icon-box">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="footer-contact-label">Pokličite nas</div>
                  <a
                    href="tel:+38669803622"
                    className="footer-contact-val"
                    style={{ color: '#ffffff', fontWeight: 700 }}
                  >
                    +386 69 803 622
                  </a>
                  <a
                    href="tel:040791618"
                    className="footer-contact-val"
                    style={{ color: '#ffffff', fontWeight: 700 }}
                  >
                    040 791 618
                  </a>
                </div>
              </div>

              <div className="footer-contact-item">
                <div className="footer-contact-icon-box">
                  <svg className="w-4 h-4 text-[#EEA800]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.112.551 4.177 1.6 6l-1.7 6.2 6.35-1.66c1.76.96 3.75 1.46 5.752 1.46h.005c6.634 0 12.001-5.367 12.001-11.988 0-3.205-1.248-6.218-3.518-8.487C18.25 1.252 15.238 0 12.031 0zm0 21.98c-1.79 0-3.55-.48-5.09-1.39l-.36-.22-3.78.99 1.01-3.68-.24-.38a9.98 9.98 0 01-1.53-5.31c0-5.52 4.49-10.01 10.01-10.01 2.67 0 5.18 1.04 7.07 2.93 1.89 1.89 2.93 4.4 2.93 7.07 0 5.52-4.49 10-9.99 10zm5.48-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
                  </svg>
                </div>
                <div>
                  <div className="footer-contact-label">WhatsApp</div>
                  <a
                    href="https://wa.me/38669803622"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-val"
                  >
                    +386 69 803 622
                  </a>
                </div>
              </div>

              <div className="footer-contact-item">
                <div className="footer-contact-icon-box">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="footer-contact-label">E-pošta</div>
                  <a
                    href="mailto:info.willamscleaning@gmail.com"
                    className="footer-contact-val"
                  >
                    info.willamscleaning@gmail.com
                  </a>
                </div>
              </div>

              <div className="footer-contact-item">
                <div className="footer-contact-icon-box">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="footer-contact-label">Spletna stran</div>
                  <a
                    href="https://williamshousekeeping.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-contact-val"
                  >
                    www.williamshousekeeping.com
                  </a>
                </div>
              </div>

              {/* Quick Call Widget */}
              <div style={{ paddingTop: '0.5rem' }}>
                <Button
                  href="tel:+38669803622"
                  variant="primary"
                  size="sm"
                  className="w-full"
                >
                  Pokličite zdaj
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>
            &copy; {currentYear} Williams Housekeeping &bull; Čiščenje storitve. Vse pravice pridržane.
          </p>
          <p>
            Uradna stran:{' '}
            <a
              href="https://williamshousekeeping.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#cbd5e1', fontWeight: 600, textDecoration: 'none' }}
            >
              williamshousekeeping.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
