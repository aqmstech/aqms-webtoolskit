/**
 * seo.js
 * Generates JSON-LD structured data objects.
 */

export function getWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Image Resizer Online',
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
