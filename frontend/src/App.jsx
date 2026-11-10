import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Button from './components/Button/Button';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';
import FAQ from './pages/FAQ/FAQ';
import Blog from './pages/Blog/Blog';
import './App.css';

/**
 * ScrollToTop helper component
 * Ensures that whenever a user navigates to any route across the entire website
 * (via buttons, links, navigation items, service cards, or browser history),
 * the new page always starts cleanly from the top (0, 0).
 */
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // 1. Disable browser default automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Helper to immediately snap scroll position to the top (0, 0)
    const resetScrollToTop = () => {
      // Temporarily bypass smooth scrolling during route transitions
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';

      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Restore default scroll behavior for normal in-page scrolling
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = originalScrollBehavior;
      });
    };

    // Execute immediately on route change
    resetScrollToTop();

    // Secondary execution right after DOM commit to catch any asynchronously rendered elements
    const timerId = setTimeout(resetScrollToTop, 15);
    return () => clearTimeout(timerId);
  }, [pathname, search, hash]);

  return null;
}

/**
 * Redirect /service/:slug to /services#slug on the main services route
 */
function ServiceRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/services#${slug}`} replace />;
}

/**
 * PageNotFound fallback component in Slovenian
 */
function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-6xl font-black text-brand-green mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Stran ni bila najdena
        </h2>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Stran, ki jo iščete, ne obstaja ali pa je bila premaknjena na drug naslov.
        </p>
        <Button to="/" variant="primary" size="md">
          Nazaj na prvo stran
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter

      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}

    >
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white text-gray-800">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:text-[#0B4D26] focus:font-bold focus:px-4 focus:py-2 focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#EEA800]"
        >
          Preskoči na glavno vsebino
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 page-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/o-nas" element={<About />} />
            <Route path="/storitve" element={<Services />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:slug" element={<ServiceRedirect />} />
            <Route path="/storitve/:slug" element={<ServiceRedirect />} />
            <Route path="/pogosta-vprasanja" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
