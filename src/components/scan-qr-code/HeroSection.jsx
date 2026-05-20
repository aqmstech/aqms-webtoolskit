
/**
 * HeroSection — Header introduction for the Scan QR Code tool.
 */
export default function HeroSection() {
  const handleScrollToTool = () => {
    const element = document.getElementById('qr-scanner-tool');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="tool-hero" aria-label="Introduction">
      <div className="container">
        <div className="tool-hero__inner" style={{ maxWidth: '800px', marginInline: 'auto', textAlign: 'center', paddingBlock: 'var(--space-12)' }}>
          <h1 className="home-hero__title" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 'var(--space-4)' }}>
            Scan QR Codes from an Image or Screenshot
          </h1>
          <p className="home-hero__subtitle" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
            Upload a screenshot or image containing one or more QR codes and instantly extract clickable links, text, and other QR content. Perfect for QR codes already displayed on your phone screen.
          </p>
          <button className="btn btn--primary btn--lg" onClick={handleScrollToTool}>
            Upload Image
          </button>
        </div>
      </div>
    </section>
  );
}
