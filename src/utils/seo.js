/**
 * seo.js
 * Generates JSON-LD structured data objects.
 */

const SITE_URL = 'https://aqmswebtoolkit.com';
const SITE_NAME = 'AQMS Web Toolkit';

/* ── WebSite Schema (homepage) ── */
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      'Free online tools including an Image Resizer and QR Code Generator. Fast, simple, and mobile-friendly utilities for everyday web tasks.',
  };
}

/* ── Organization Schema (homepage) ── */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: [],
  };
}

/* ── WebApplication Schema (Image Resizer) ── */
export function getWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image Resizer Online',
    url: `${SITE_URL}/image-resizer`,
    description:
      'Resize images online for Facebook, LinkedIn, Instagram, YouTube, banners, profile pictures, and custom dimensions. Fast, free, and private — your images never leave your browser.',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern browser with JavaScript enabled',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Social media image presets',
      'Custom width and height resize',
      'Fit, Fill, and Stretch modes',
      'Circle crop',
      'Export as JPG, PNG, or WEBP',
      'Quality control slider',
      'Client-side processing — no upload to server',
    ],
  };
}

/* ── FAQPage Schema ── */
export function getFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

/* ── BreadcrumbList Schema ── */
export function getBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
