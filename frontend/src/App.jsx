import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Button from './components/Button/Button';
import Home from './pages/Home/Home';

// Route-level code splitting for secondary pages to minimize initial bundle size
const About = lazy(() => import('./pages/About/About'));
const Services = lazy(() => import('./pages/Services/Services'));
const Contact = lazy(() => import('./pages/Contact/Contact'));
const FAQ = lazy(() => import('./pages/FAQ/FAQ'));
const Blog = lazy(() => import('./pages/Blog/Blog'));
import './App.css';

/**
 * ScrollToTop helper component
 * Ensures that whenever a user navigates to any route across the entire website
 * (via buttons, links, navigation items, service cards, or browser history),
 * the new page always starts cleanly from the top (0, 0).
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstMount = React.useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

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
        <h1 className="text-6xl font-black text-[#0A5463] mb-4">404</h1>
        <h2 className="text-2xl font-bold text-[#0A5463] mb-3">
          Stran ni bila najdena
        </h2>
        <p className="text-[#46545A] text-sm mb-6 leading-relaxed">
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
      <div className="flex flex-col min-h-screen bg-transparent text-[#46545A]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-[#FFFFFF] focus:text-[#0A5463] focus:font-bold focus:px-4 focus:py-2 focus:rounded-md focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#168B9F]"
        >
          Preskoči na glavno vsebino
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 page-container">
          <Suspense fallback={<div className="min-h-[60vh] bg-transparent" aria-hidden="true" />}>
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
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
