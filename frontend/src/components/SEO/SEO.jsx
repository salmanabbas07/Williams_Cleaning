import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Reusable SEO Component
 * Dynamically updates document head tags (title, description, canonical, OG, Twitter, JSON-LD)
 * for client-side route transitions without external library dependencies.
 */
export default function SEO({
  title = 'Williams Housekeeping | Hotelsko gospodinjstvo in čiščenje',
  description = 'Williams Housekeeping ponuja profesionalno hotelsko gospodinjstvo, zanesljive ekipe za čiščenje hotelov ter vrhunsko poslovno čiščenje po vsej Sloveniji.',
  canonical = null,
  ogType = 'website',
  ogImage = 'https://www.williamscleaning.si/images/bannerLP1.png',
  schemaJson = null
}) {
  const location = useLocation();
  const currentUrl = canonical || `https://www.williamscleaning.si${location.pathname === '/' ? '/' : location.pathname}`;

  useEffect(() => {
    // 1. Title
    if (title) {
      document.title = title;
    }

    // 2. Meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', currentUrl);

    // Helper functions for meta tags
    const setMetaTag = (attributeName, attributeValue, contentValue) => {
      let el = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attributeName, attributeValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentValue);
    };

    // 4. Open Graph Tags
    setMetaTag('property', 'og:site_name', 'Williams Housekeeping');
    setMetaTag('property', 'og:locale', 'sl_SI');
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', currentUrl);
    if (title) setMetaTag('property', 'og:title', title);
    if (description) setMetaTag('property', 'og:description', description);
    if (ogImage) setMetaTag('property', 'og:image', ogImage);

    // 5. Twitter / X Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    if (title) setMetaTag('name', 'twitter:title', title);
    if (description) setMetaTag('name', 'twitter:description', description);
    if (ogImage) setMetaTag('name', 'twitter:image', ogImage);

    // 6. Dynamic JSON-LD Schema (if provided for this page)
    let dynamicScript = document.getElementById('dynamic-page-schema');
    if (schemaJson) {
      if (!dynamicScript) {
        dynamicScript = document.createElement('script');
        dynamicScript.id = 'dynamic-page-schema';
        dynamicScript.type = 'application/ld+json';
        document.head.appendChild(dynamicScript);
      }
      dynamicScript.textContent = JSON.stringify(schemaJson);
    } else if (dynamicScript) {
      dynamicScript.remove();
    }
  }, [title, description, currentUrl, ogType, ogImage, schemaJson]);

  return null;
}
