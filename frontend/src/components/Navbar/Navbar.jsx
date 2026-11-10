import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Globe, Menu, X, ArrowRight } from 'lucide-react';
import Button from '../Button/Button';
import './Navbar.css';

/**
 * Navbar Component
 * Features:
 * - Top information bar with phone, email, website and social channels
 * - Brand logo linking to home
 * - Desktop nav menu with active indicator
 * - Prominent CTA button
 * - Fully accessible mobile navigation drawer
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Domov', path: '/' },
    { name: 'O nas', path: '/o-nas' },
    { name: 'Storitve', path: '/storitve' },
    { name: 'Pogosta vprašanja', path: '/pogosta-vprasanja' },
    { name: 'Blog', path: '/blog' },
    { name: 'Kontakt', path: '/kontakt' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      {/* Top Bar for Desktop/Tablet */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-contact">
            <a
              href="tel:+38669803622"
              className="top-bar-link"
              aria-label="Pokličite nas na +386 69 803 622"
            >
              <Phone className="top-bar-icon" />
              <span>Telefon: <strong>+386 69 803 622</strong></span>
            </a>
            <span className="top-bar-divider">|</span>
            <a
              href="tel:040791618"
              className="top-bar-link"
              aria-label="Pokličite nas na 040 791 618"
            >
              <Phone className="top-bar-icon" />
              <span>Telefon: <strong>040 791 618</strong></span>
            </a>
            <span className="top-bar-divider">|</span>
            <a
              href="mailto:info.willamscleaning@gmail.com"
              className="top-bar-link"
              aria-label="Pošljite nam e-pošto na info.willamscleaning@gmail.com"
            >
              <Mail className="top-bar-icon" />
              <span>E-pošta: <strong>info.willamscleaning@gmail.com</strong></span>
            </a>
            <span className="top-bar-divider">|</span>
            {/* <a
              href="https://williamshousekeeping.com"
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-link"
              aria-label="Obiščite našo spletno stran"
            >
              <Globe className="top-bar-icon" />
              <span>Splet: <strong>www.williamshousekeeping.com</strong></span>
            </a> */}
          </div>

          {/* Social Media Links */}
          <div className="top-bar-socials" aria-label="Družbena omrežja">
            <a
              href="https://www.facebook.com/Williams.Cleanings"
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-social-link"
              aria-label="Facebook Business"
              title="Facebook Business"
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/williams.cleaners.slovenia?rpxt=YnB3Zm1vcm1rOXpk"
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-social-link"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a
              href="https://wa.me/38669803622"
              target="_blank"
              rel="noopener noreferrer"
              className="top-bar-social-link"
              aria-label="WhatsApp"
              title="WhatsApp: +386 69 803 622"
            >
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.112.551 4.177 1.6 6l-1.7 6.2 6.35-1.66c1.76.96 3.75 1.46 5.752 1.46h.005c6.634 0 12.001-5.367 12.001-11.988 0-3.205-1.248-6.218-3.518-8.487C18.25 1.252 15.238 0 12.031 0zm0 21.98c-1.79 0-3.55-.48-5.09-1.39l-.36-.22-3.78.99 1.01-3.68-.24-.38a9.98 9.98 0 01-1.53-5.31c0-5.52 4.49-10.01 10.01-10.01 2.67 0 5.18 1.04 7.07 2.93 1.89 1.89 2.93 4.4 2.93 7.07 0 5.52-4.49 10-9.99 10zm5.48-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="main-navbar">
        <div className="main-navbar-container">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="nav-brand"
            aria-label="Domov - Williams Housekeeping hotelsko in poslovno čiščenje"
          >
            <img
              src="/images/main_logo.svg"
              alt="Williams Housekeeping — Vrhunske storitve čiščenja in hotelskega gospodinjstva"
              className="nav-logo-img"
              width="180"
              height="70"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Glavni meni">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === '/storitve' && location.pathname === '/services');
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`desktop-nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                  {isActive && <span className="desktop-nav-link-indicator" aria-hidden="true" />}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="nav-cta-wrapper">
            <Button
              to="/kontakt"
              variant="primary"
              size="md"
              icon={ArrowRight}
            >
              Pošljite povpraševanje
            </Button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="mobile-toggle-btn"
            aria-label={mobileMenuOpen ? 'Zapri meni' : 'Odpri navigacijski meni'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav className="mobile-nav-list" aria-label="Mobilni meni">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path === '/storitve' && location.pathname === '/services');
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="mobile-active-dot" aria-hidden="true" />}
                </NavLink>
              );
            })}
          </nav>

          <div className="mobile-drawer-bottom">
            <Button
              to="/kontakt"
              variant="primary"
              size="lg"
              className="w-full text-center"
              onClick={closeMobileMenu}
              icon={ArrowRight}
            >
              Pošljite povpraševanje
            </Button>

            <div className="mobile-drawer-contacts">
              <a
                href="tel:+38669803622"
                className="mobile-drawer-contact-item highlight"
              >
                <Phone className="w-4 h-4 text-[#EEA800]" />
                <span>+386 69 803 622</span>
              </a>
              <a
                href="tel:040791618"
                className="mobile-drawer-contact-item highlight"
              >
                <Phone className="w-4 h-4 text-[#EEA800]" />
                <span>040 791 618</span>
              </a>
              <a
                href="https://wa.me/38669803622"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-drawer-contact-item highlight"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4 text-[#EEA800]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 0C5.396 0 .029 5.367.029 11.987c0 2.112.551 4.177 1.6 6l-1.7 6.2 6.35-1.66c1.76.96 3.75 1.46 5.752 1.46h.005c6.634 0 12.001-5.367 12.001-11.988 0-3.205-1.248-6.218-3.518-8.487C18.25 1.252 15.238 0 12.031 0zm0 21.98c-1.79 0-3.55-.48-5.09-1.39l-.36-.22-3.78.99 1.01-3.68-.24-.38a9.98 9.98 0 01-1.53-5.31c0-5.52 4.49-10.01 10.01-10.01 2.67 0 5.18 1.04 7.07 2.93 1.89 1.89 2.93 4.4 2.93 7.07 0 5.52-4.49 10-9.99 10zm5.48-7.5c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.49-.89-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
                </svg>
                <span>WhatsApp: +386 69 803 622</span>
              </a>
              <a
                href="mailto:info.willamscleaning@gmail.com"
                className="mobile-drawer-contact-item"
              >
                <Mail className="w-4 h-4 text-[#EEA800]" />
                <span>info.willamscleaning@gmail.com</span>
              </a>
              <a
                href="https://williamshousekeeping.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-drawer-contact-item"
              >
                <Globe className="w-4 h-4 text-[#EEA800]" />
                <span>www.williamshousekeeping.com</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
