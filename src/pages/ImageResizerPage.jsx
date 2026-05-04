import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { getWebApplicationSchema, getBreadcrumbSchema } from '../utils/seo';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import AdSlot from '../components/layout/AdSlot';

import HeroSection from '../components/image-resizer/HeroSection';
import PresetSelector from '../components/image-resizer/PresetSelector';
import ResizeSettings from '../components/image-resizer/ResizeSettings';
import ImagePreview from '../components/image-resizer/ImagePreview';
import DownloadPanel from '../components/image-resizer/DownloadPanel';
import CropAdjuster from '../components/image-resizer/CropAdjuster';
import SeoContent from '../components/image-resizer/SeoContent';
import FaqSection from '../components/image-resizer/FaqSection';
import FileUploader from '../components/common/FileUploader';

import { useFileUpload } from '../hooks/useFileUpload';
import { useImageResize } from '../hooks/useImageResize';

import '../styles/pages/image-resizer.css';

const DEFAULT_SETTINGS = {
  mode:       'fit',
  bgColor:    '#ffffff',
  format:     'original',
  quality:    90,
  circleCrop: false,
};

const DEFAULT_DIMS = { width: '', height: '' };

export default function ImageResizerPage() {
  const [selectedPreset,  setSelectedPreset]  = useState(null);
  const [dimensions,      setDimensions]      = useState(DEFAULT_DIMS);
  const [settings,        setSettings]        = useState(DEFAULT_SETTINGS);

  const upload  = useFileUpload();
  const resizer = useImageResize();

  /* ── Preset selected ── */
  const handlePresetSelect = useCallback((preset) => {
    setSelectedPreset(preset);
    setDimensions({ width: preset.width, height: preset.height });
    resizer.reset();
  }, [resizer]);

  /* ── Custom dims changed ── */
  const handleCustomChange = useCallback((dims) => {
    setSelectedPreset(null);
    setDimensions((prev) => ({ ...prev, ...dims }));
    resizer.reset();
  }, [resizer]);

  /* ── Settings changed ── */
  const handleSettingsChange = useCallback((patch) => {
    setSettings((prev) => ({ ...prev, ...patch }));
    resizer.reset();
  }, [resizer]);

  /* ── File removed ── */
  const handleClear = useCallback(() => {
    upload.clear();
    resizer.reset();
  }, [upload, resizer]);

  /* ── Resize ── */
  const handleResize = useCallback(() => {
    if (!upload.file || !dimensions.width || !dimensions.height) return;
    resizer.resize(upload.file, {
      width:      Number(dimensions.width),
      height:     Number(dimensions.height),
      mode:       settings.mode,
      bgColor:    settings.bgColor,
      circleCrop: settings.circleCrop,
      format:     settings.format,
      quality:    settings.quality,
    });
  }, [upload.file, dimensions, settings, resizer]);

  /* ── Download ── */
  const handleDownload = useCallback(() => {
    resizer.download(upload.file, {
      width:  Number(dimensions.width),
      height: Number(dimensions.height),
      format: settings.format,
    });
  }, [resizer, upload.file, dimensions, settings.format]);

  /* ── Resize Again (keep image, keep settings) ── */
  const handleResizeAgain = useCallback(() => {
    setCropAdjustMode(false);
    resizer.reset();
  }, [resizer]);

  /* ── Full Reset ── */
  const handleReset = useCallback(() => {
    upload.clear();
    resizer.reset();
    setCropAdjustMode(false);
    setSelectedPreset(null);
    setDimensions(DEFAULT_DIMS);
    setSettings(DEFAULT_SETTINGS);
  }, [upload, resizer]);

  /* ── Crop Adjustment (Fill mode) ── */
  const [cropAdjustMode, setCropAdjustMode] = useState(false);

  const handleAdjustCrop = useCallback(() => {
    setCropAdjustMode(true);
  }, []);

  const handleCropApply = useCallback((offsetX, offsetY) => {
    setCropAdjustMode(false);
    resizer.reRenderFill(upload.file, {
      width:      Number(dimensions.width),
      height:     Number(dimensions.height),
      format:     settings.format,
      quality:    settings.quality,
      bgColor:    settings.bgColor,
      circleCrop: settings.circleCrop,
    }, offsetX, offsetY);
  }, [resizer, upload.file, dimensions, settings]);

  const handleCropCancel = useCallback(() => {
    setCropAdjustMode(false);
  }, []);

  const canResize = !!upload.file && !!dimensions.width && !!dimensions.height;
  const isFillMode = settings.mode === 'fill';
  const schema = getWebApplicationSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://aqmswebtoolkit.com/' },
    { name: 'Image Resizer', url: 'https://aqmswebtoolkit.com/image-resizer' },
  ]);

  return (
    <>
      <Helmet>
        <title>Image Resizer Online for Social Media, Banners, and Custom Sizes | ToolKit</title>
        <meta
          name="description"
          content="Resize images online for Facebook, LinkedIn, Instagram, YouTube, banners, profile pictures, and custom dimensions. Fast, simple, and easy to use."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aqmswebtoolkit.com/image-resizer" />

        {/* Open Graph */}
        <meta property="og:title" content="Image Resizer Online — Social Media, Banners, Custom Sizes | ToolKit" />
        <meta
          property="og:description"
          content="Resize images for Facebook, Instagram, LinkedIn, YouTube, and more. Free, fast, and private — images never leave your browser."
        />
        <meta property="og:url" content="https://aqmswebtoolkit.com/image-resizer" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AQMS Web Toolkit" />
        <meta property="og:image" content="https://aqmswebtoolkit.com/favicon.svg" />

        {/* Twitter / X */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Image Resizer Online — Social Media, Banners, Custom Sizes | ToolKit" />
        <meta name="twitter:description" content="Resize images for Facebook, Instagram, LinkedIn, YouTube, and more. Free, fast, and private." />
        <meta name="twitter:image" content="https://aqmswebtoolkit.com/favicon.svg" />

        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
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
            id="resize-tool"
            className="tool-section section"
            aria-label="Image Resizer Tool"
          >
            <div className="container">
              <div className="tool-section__header">
                <h2 className="section-heading">Resize Your Image</h2>
                <p className="section-subheading">
                  Choose a size preset or enter custom dimensions, upload your image, and download.
                </p>
              </div>

              <div className="tool-workspace card card--elevated">
                <div className="tool-workspace__body card-body">

                  {/* Step 1: Presets */}
                  <div className="tool-step">
                    <div className="tool-step__label">
                      <span className="tool-step__num" aria-hidden="true">1</span>
                      <span>Choose a Size</span>
                    </div>
                    <PresetSelector
                      selectedPreset={selectedPreset}
                      dimensions={dimensions}
                      onPresetSelect={handlePresetSelect}
                      onCustomChange={handleCustomChange}
                    />
                  </div>

                  <div className="tool-divider" aria-hidden="true" />

                  {/* Step 2 + 3: Upload & Settings side by side */}
                  <div className="tool-upload-settings">
                    <div className="tool-step">
                      <div className="tool-step__label">
                        <span className="tool-step__num" aria-hidden="true">2</span>
                        <span>Upload Your Image</span>
                      </div>
                      <FileUploader
                        file={upload.file}
                        preview={upload.preview}
                        error={upload.error}
                        isDragging={upload.isDragging}
                        onSelect={upload.handleSelect}
                        onDrop={upload.handleDrop}
                        onDragOver={upload.handleDragOver}
                        onDragLeave={upload.handleDragLeave}
                        onClear={handleClear}
                      />
                    </div>

                    <div className="tool-step">
                      <div className="tool-step__label">
                        <span className="tool-step__num" aria-hidden="true">3</span>
                        <span>Resize Settings</span>
                      </div>
                      <ResizeSettings
                        settings={settings}
                        onChange={handleSettingsChange}
                        disabled={!upload.file}
                      />
                    </div>
                  </div>

                  <div className="tool-divider" aria-hidden="true" />

                  {/* Step 4: Preview */}
                  <ImagePreview
                    originalFile={upload.file}
                    originalPreview={upload.preview}
                    resizedUrl={resizer.resizedUrl}
                    resizedSize={resizer.resizedSize}
                    resizedDims={resizer.resizedDims}
                    isProcessing={resizer.isProcessing}
                  />

                  {/* Crop Adjuster (Fill mode only) */}
                  {cropAdjustMode && resizer.sourceImage?.current && (
                    <CropAdjuster
                      sourceImage={resizer.sourceImage.current}
                      targetWidth={Number(dimensions.width)}
                      targetHeight={Number(dimensions.height)}
                      onApply={handleCropApply}
                      onCancel={handleCropCancel}
                    />
                  )}

                  {/* Actions */}
                  <DownloadPanel
                    resizedUrl={resizer.resizedUrl}
                    isProcessing={resizer.isProcessing}
                    error={resizer.error}
                    canResize={canResize}
                    onResize={handleResize}
                    onDownload={handleDownload}
                    onResizeAgain={handleResizeAgain}
                    onReset={handleReset}
                    isFillMode={isFillMode}
                    onAdjustCrop={handleAdjustCrop}
                    isCropMode={cropAdjustMode}
                  />

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
