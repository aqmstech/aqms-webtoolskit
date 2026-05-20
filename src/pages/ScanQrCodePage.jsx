import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getFaqSchema, getBreadcrumbSchema, getQrCodeReaderSchema } from '../utils/seo';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AdSlot from '../components/layout/AdSlot';

import HeroSection from '../components/scan-qr-code/HeroSection';
import ScannerWorkspace from '../components/scan-qr-code/ScannerWorkspace';
import ResultList from '../components/scan-qr-code/ResultList';
import SeoContent from '../components/scan-qr-code/SeoContent';
import FaqSection from '../components/scan-qr-code/FaqSection';
import { SCAN_QR_FAQS } from '../data/scanQrFaqs';

// Styles
import '../styles/pages/image-resizer.css'; // reuse shared tool workspace layout styles
import '../styles/pages/scan-qr-code.css';

/**
 * ScanQrCodePage — Page component for scanning QR codes from images or screenshots.
 */
export default function ScanQrCodePage() {
  const [results, setResults] = useState([]);

  // Schema generation
  const appSchema = getQrCodeReaderSchema();
  const faqSchema = getFaqSchema(SCAN_QR_FAQS);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://aqmswebtoolkit.com/' },
    { name: 'QR Code Reader', url: 'https://aqmswebtoolkit.com/scan-qr-code-from-image' },
  ]);

  return (
    <>
      <Helmet>
        <title>Scan QR Code from Screenshot & Image Online | ToolKit</title>
        <meta
          name="description"
          content="Free online tool to scan QR codes from uploaded images and screenshots. Detect multiple QR codes client-side, and extract links, text, and details instantly."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aqmswebtoolkit.com/scan-qr-code-from-image" />

        {/* Open Graph */}
        <meta property="og:title" content="Scan QR Code from Screenshot & Image Online | ToolKit" />
        <meta
          property="og:description"
          content="Upload any image or screenshot to scan QR codes instantly. Fast, 100% private, client-side decoding with one-click actions."
        />
        <meta property="og:url" content="https://aqmswebtoolkit.com/scan-qr-code-from-image" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AQMS Web Toolkit" />
        <meta property="og:image" content="https://aqmswebtoolkit.com/favicon.svg" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Scan QR Code from Screenshot & Image Online | ToolKit" />
        <meta name="twitter:description" content="Scan QR codes from screenshots and images online. Private, local browser scanning." />
        <meta name="twitter:image" content="https://aqmswebtoolkit.com/favicon.svg" />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="page-layout">
        <Header />

        <main className="page-main" id="main-content">
          {/* Hero Intro */}
          <HeroSection />

          {/* Ad Slot: Above Tool Workspace */}
          <div className="container" style={{ paddingBlock: 'var(--space-6)' }}>
            <AdSlot variant="leaderboard" />
          </div>

          {/* Main Interactive Tool Workspace */}
          <section
            id="qr-scanner-tool"
            className="tool-section section"
            aria-label="QR Code Scanner Tool"
          >
            <div className="container">
              <div className="tool-section__header">
                <h2 className="section-heading">Scan QR Codes</h2>
                <p className="section-subheading" style={{ marginInline: 'auto' }}>
                  Drag and drop your screenshot or choose an image file to begin. Any QR codes will be identified, highlighted, and listed below.
                </p>
              </div>

              <div className="tool-workspace card card--elevated">
                <div className="tool-workspace__body card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                  {/* Scanner File Upload / Canvas Preview */}
                  <ScannerWorkspace onResultsChange={setResults} />

                  {/* Scanned QR Results list */}
                  <ResultList results={results} />
                </div>
              </div>
            </div>
          </section>

          {/* Ad Slot: In-Content below tool */}
          <div className="container" style={{ paddingBottom: 'var(--space-6)' }}>
            <AdSlot variant="in-content" label="Sponsored content" />
          </div>

          {/* SEO Content & FAQs with Sidebar Ad */}
          <section className="seo-content-section section--sm" aria-label="Helpful information">
            <div className="container">
              <div className="content-with-sidebar">
                <div>
                  <SeoContent />
                  <FaqSection />
                </div>
                {/* Sidebar Ad (visible >=1280px screen widths) */}
                <aside className="seo-sidebar" aria-label="Sidebar advertisement">
                  <AdSlot variant="sidebar" />
                </aside>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
