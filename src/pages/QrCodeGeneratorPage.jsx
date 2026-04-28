import { useState, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { getFaqSchema, getBreadcrumbSchema } from '../utils/seo';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AdSlot from '../components/layout/AdSlot';

import HeroSection from '../components/qr-code-generator/HeroSection';
import QrTypeSelector from '../components/qr-code-generator/QrTypeSelector';
import QrInputForm from '../components/qr-code-generator/QrInputForm';
import QrPreview from '../components/qr-code-generator/QrPreview';
import QrCustomization from '../components/qr-code-generator/QrCustomization';
import QrActions from '../components/qr-code-generator/QrActions';
import SeoContent from '../components/qr-code-generator/SeoContent';
import FaqSection from '../components/qr-code-generator/FaqSection';

import { QR_TYPE_MAP } from '../data/qrTypes';
import * as encoders from '../utils/qrEncoders';
import { useQrGenerator } from '../hooks/useQrGenerator';

import '../styles/pages/image-resizer.css';  /* reuse shared tool layout styles */
import '../styles/pages/qr-code-generator.css';

const DEFAULT_OPTIONS = {
  size: 512,
  margin: 4,
  fgColor: '#000000',
  bgColor: '#ffffff',
  transparent: false,
  errorCorrection: 'M',
  format: 'png',
};

export default function QrCodeGeneratorPage() {
  const [selectedType, setSelectedType] = useState('url');
  const [fieldValues, setFieldValues] = useState({});
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [encodedContent, setEncodedContent] = useState('');

  const qr = useQrGenerator();

  /* ── Encode content from fields ── */
  const encodeCurrentContent = useCallback(() => {
    const typeConfig = QR_TYPE_MAP[selectedType];
    if (!typeConfig) return '';
    const encoderFn = encoders[typeConfig.encoder];
    if (!encoderFn) return '';
    return encoderFn(fieldValues);
  }, [selectedType, fieldValues]);

  /* ── Check if required fields are filled ── */
  const canGenerate = useMemo(() => {
    const typeConfig = QR_TYPE_MAP[selectedType];
    if (!typeConfig) return false;
    return typeConfig.fields
      .filter((f) => f.required)
      .every((f) => {
        const val = fieldValues[f.name];
        return val !== undefined && val !== '' && val !== null;
      });
  }, [selectedType, fieldValues]);

  /* ── Generate ── */
  const handleGenerate = useCallback(() => {
    const content = encodeCurrentContent();
    if (!content) {
      return;
    }
    setEncodedContent(content);
    qr.generate(content, options);
  }, [encodeCurrentContent, options, qr]);

  /* ── Download ── */
  const handleDownload = useCallback(() => {
    qr.download(options.format, `qr-${selectedType}`);
  }, [qr, options.format, selectedType]);

  /* ── Type changed ── */
  const handleTypeSelect = useCallback((typeId) => {
    setSelectedType(typeId);
    setFieldValues({});
    setEncodedContent('');
    qr.reset();
  }, [qr]);

  /* ── Full reset ── */
  const handleReset = useCallback(() => {
    setFieldValues({});
    setEncodedContent('');
    setOptions(DEFAULT_OPTIONS);
    qr.reset();
  }, [qr]);

  /* ── Schema ── */
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'QR Code Generator Online',
    url: 'https://aqmswebtoolkit.com/qr-code-generator',
    description:
      'Create QR codes online for websites, text, phone numbers, email, SMS, WhatsApp, WiFi, and contacts. Generate, preview, and download QR codes instantly.',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern browser with JavaScript enabled',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      '8 QR code content types',
      'Custom colors and sizes',
      'PNG, SVG, and JPG download',
      'Adjustable error correction',
      'Transparent background support',
      'Client-side processing — no upload to server',
    ],
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://aqmswebtoolkit.com/' },
    { name: 'QR Code Generator', url: 'https://aqmswebtoolkit.com/qr-code-generator' },
  ]);

  return (
    <>
      <Helmet>
        <title>Free QR Code Generator Online for Links, Text, WiFi, and More | ToolKit</title>
        <meta
          name="description"
          content="Create QR codes online for websites, text, phone numbers, email, and WiFi. Generate, preview, and download QR codes instantly with an easy-to-use free tool."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aqmswebtoolkit.com/qr-code-generator" />

        {/* Open Graph */}
        <meta property="og:title" content="Free QR Code Generator Online — Links, Text, WiFi, and More | ToolKit" />
        <meta
          property="og:description"
          content="Create QR codes for websites, phone numbers, email, WiFi, contacts, and more. Free, fast, and private — data never leaves your browser."
        />
        <meta property="og:url" content="https://aqmswebtoolkit.com/qr-code-generator" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AQMS Web Toolkit" />
        <meta property="og:image" content="https://aqmswebtoolkit.com/favicon.svg" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Free QR Code Generator Online — Links, Text, WiFi, and More | ToolKit" />
        <meta name="twitter:description" content="Create QR codes for websites, phone numbers, email, WiFi, and more. Free, fast, and private." />
        <meta name="twitter:image" content="https://aqmswebtoolkit.com/favicon.svg" />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(appSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="page-layout">
        <Header />

        <main className="page-main" id="main-content">
          {/* Hero */}
          <HeroSection />

          {/* Ad: Leaderboard above tool */}
          <div className="container" style={{ paddingBlock: 'var(--space-6)' }}>
            <AdSlot variant="leaderboard" />
          </div>

          {/* ═══════════════════════════════════════
              Main Tool Section
          ════════════════════════════════════════ */}
          <section
            id="qr-tool"
            className="tool-section section"
            aria-label="QR Code Generator Tool"
          >
            <div className="container">
              <div className="tool-section__header">
                <h2 className="section-heading">Create Your QR Code</h2>
                <p className="section-subheading">
                  Choose a content type, enter your information, and generate a downloadable QR code.
                </p>
              </div>

              <div className="tool-workspace card card--elevated">
                <div className="tool-workspace__body card-body">

                  {/* Step 1: Type Selector */}
                  <div className="tool-step">
                    <div className="tool-step__label">
                      <span className="tool-step__num" aria-hidden="true">1</span>
                      <span>Choose Content Type</span>
                    </div>
                    <QrTypeSelector
                      selectedType={selectedType}
                      onTypeSelect={handleTypeSelect}
                    />
                  </div>

                  <div className="tool-divider" aria-hidden="true" />

                  {/* Step 2: Input Form */}
                  <div className="tool-step">
                    <div className="tool-step__label">
                      <span className="tool-step__num" aria-hidden="true">2</span>
                      <span>Enter Your Content</span>
                    </div>
                    <QrInputForm
                      selectedType={selectedType}
                      fieldValues={fieldValues}
                      onChange={setFieldValues}
                    />
                  </div>

                  <div className="tool-divider" aria-hidden="true" />

                  {/* Step 3: Customization (collapsible) */}
                  <div className="tool-step">
                    <div className="tool-step__label">
                      <span className="tool-step__num" aria-hidden="true">3</span>
                      <span>Customize (Optional)</span>
                    </div>
                    <QrCustomization
                      options={options}
                      onChange={setOptions}
                    />
                  </div>

                  <div className="tool-divider" aria-hidden="true" />

                  {/* Preview + Actions */}
                  <div className="qr-preview-actions">
                    <QrPreview
                      qrDataUrl={qr.qrDataUrl}
                      isGenerating={qr.isGenerating}
                    />
                    <QrActions
                      qrDataUrl={qr.qrDataUrl}
                      isGenerating={qr.isGenerating}
                      error={qr.error}
                      canGenerate={canGenerate}
                      onGenerate={handleGenerate}
                      onDownload={handleDownload}
                      onReset={handleReset}
                      encodedContent={encodedContent}
                    />
                  </div>

                </div>
              </div>
            </div>
          </section>

          {/* Ad: In-Content between tool and SEO copy */}
          <div className="container" style={{ paddingBottom: 'var(--space-6)' }}>
            <AdSlot variant="in-content" label="Sponsored content" />
          </div>

          {/* SEO Content + Optional Sidebar Ad */}
          <section className="seo-content-section section--sm" aria-label="Helpful information">
            <div className="container">
              <div className="content-with-sidebar">
                <div>
                  <SeoContent />
                  <FaqSection />
                </div>
                {/* Sidebar Ad (only visible ≥1280px via CSS) */}
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
