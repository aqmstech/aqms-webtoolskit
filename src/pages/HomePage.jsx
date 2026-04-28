import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Image, QrCode, Zap, Smartphone, DollarSign } from 'lucide-react';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Accordion from '../components/common/Accordion';

import { getWebSiteSchema, getOrganizationSchema, getFaqSchema, getBreadcrumbSchema } from '../utils/seo';
import HOMEPAGE_FAQS from '../data/homepageFaqs';

import '../styles/pages/homepage.css';

/**
 * HomePage — Root landing page for AQMS Web Toolkit.
 * Guides users to the two live tools with minimal friction.
 */
export default function HomePage() {
  const siteSchema = getWebSiteSchema();
  const orgSchema = getOrganizationSchema();
  const faqSchema = getFaqSchema(HOMEPAGE_FAQS);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://aqmswebtoolkit.com/' },
  ]);

  return (
    <>
      <Helmet>
        <title>AQMS Web Toolkit – Free Online Image Resizer and QR Code Generator</title>
        <meta
          name="description"
          content="AQMS Web Toolkit offers free online tools including an Image Resizer and QR Code Generator. Fast, simple, mobile-friendly tools for everyday use."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aqmswebtoolkit.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="AQMS Web Toolkit – Free Online Image Resizer and QR Code Generator" />
        <meta
          property="og:description"
          content="Use free online tools to resize images and generate QR codes. Fast, simple, and mobile-friendly."
        />
        <meta property="og:url" content="https://aqmswebtoolkit.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AQMS Web Toolkit" />
        <meta property="og:image" content="https://aqmswebtoolkit.com/favicon.svg" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AQMS Web Toolkit – Free Online Image Resizer and QR Code Generator" />
        <meta name="twitter:description" content="Free online tools to resize images and generate QR codes. Fast, private, and mobile-friendly." />
        <meta name="twitter:image" content="https://aqmswebtoolkit.com/favicon.svg" />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(siteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="page-layout">
        <Header />

        <main className="page-main" id="main-content">
          {/* ═══════════════════════════════════════
              Hero Section
          ════════════════════════════════════════ */}
          <section className="home-hero" aria-label="Welcome">
            <div className="container">
              <h1 className="home-hero__title">
                Free Online Web Tools for Images, QR&nbsp;Codes, and&nbsp;More
              </h1>
              <p className="home-hero__subtitle">
                Use simple online tools to resize images, generate QR codes, and get
                everyday web tasks done quickly. Fast, easy, and beginner-friendly.
              </p>

              {/* Tool Cards */}
              <div className="home-tools-grid">
                {/* Image Resizer */}
                <div className="home-tool-card" id="tool-card-image-resizer">
                  <div className="home-tool-card__icon home-tool-card__icon--primary" aria-hidden="true">
                    <Image size={28} />
                  </div>
                  <h3 className="home-tool-card__name">Image Resizer</h3>
                  <p className="home-tool-card__desc">
                    Resize images for social media, banners, profile pictures, and custom
                    dimensions in seconds.
                  </p>
                  <Link to="/image-resizer" className="btn btn--primary">
                    Use Tool
                  </Link>
                </div>

                {/* QR Code Generator */}
                <div className="home-tool-card" id="tool-card-qr-generator">
                  <div className="home-tool-card__icon home-tool-card__icon--accent" aria-hidden="true">
                    <QrCode size={28} />
                  </div>
                  <h3 className="home-tool-card__name">QR Code Generator</h3>
                  <p className="home-tool-card__desc">
                    Create QR codes for links, text, email, phone numbers, WiFi,
                    and&nbsp;more.
                  </p>
                  <Link to="/qr-code-generator" className="btn btn--accent">
                    Use Tool
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              Trust Bar
          ════════════════════════════════════════ */}
          <section className="home-trust-bar container" aria-label="Key benefits">
            <div className="home-trust-item">
              <span className="home-trust-item__icon" aria-hidden="true">
                <Zap size={18} />
              </span>
              <span>Fast &amp; Easy to Use</span>
            </div>
            <div className="home-trust-item">
              <span className="home-trust-item__icon" aria-hidden="true">
                <Smartphone size={18} />
              </span>
              <span>Mobile Friendly</span>
            </div>
            <div className="home-trust-item">
              <span className="home-trust-item__icon" aria-hidden="true">
                <DollarSign size={18} />
              </span>
              <span>Free Online Tools</span>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              SEO / AEO Content
          ════════════════════════════════════════ */}
          <section className="home-seo" aria-label="About AQMS Web Toolkit">
            <div className="container">
              <div className="home-seo__inner">
                <h2 className="home-seo__title">What Is AQMS Web Toolkit?</h2>
                <p className="home-seo__text">
                  AQMS Web Toolkit is a free online utility platform that helps individuals,
                  students, marketers, and small business owners handle common web tasks
                  without installing any software. Every tool runs directly in your browser,
                  so your files stay private and nothing is uploaded to a server.
                </p>
                <p className="home-seo__text">
                  The platform currently offers two tools: an <strong>Image Resizer</strong>{' '}
                  that lets you resize images for social media platforms, banners, profile
                  pictures, and custom dimensions, and a <strong>QR Code Generator</strong>{' '}
                  that creates QR codes for URLs, plain text, email addresses, phone numbers,
                  WiFi credentials, and more.
                </p>
                <p className="home-seo__text">
                  Whether you need to quickly prepare a Facebook cover photo, create a QR
                  code for a business card, or resize a batch of product images, AQMS Web
                  Toolkit gives you a fast, simple way to get it done — on any device,
                  completely free.
                </p>
                <p className="home-seo__text">
                  We are actively building new utilities and plan to expand the toolkit over
                  time. Bookmark this page to stay updated as new tools become available.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════
              FAQ Section (schema-ready)
          ════════════════════════════════════════ */}
          <section className="home-faq" aria-label="Frequently Asked Questions">
            <div className="container">
              <div className="home-faq__inner">
                <h2 className="home-faq__title">Frequently Asked Questions</h2>
                <Accordion items={HOMEPAGE_FAQS} />
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
