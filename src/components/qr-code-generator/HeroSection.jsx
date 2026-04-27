import './HeroSection.css';

export default function HeroSection() {
  const scrollToTool = (e) => {
    e.preventDefault();
    document.getElementById('qr-tool')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" aria-label="Page introduction">
      <div className="container hero-inner">
        <div className="hero-eyebrow">
          <span className="badge badge--primary">Free Online Tool</span>
          <span className="hero-eyebrow__sep" aria-hidden="true">·</span>
          <span className="hero-eyebrow__note">🔒 100% Client-Side</span>
        </div>

        <h1 className="hero-h1">
          QR Code Generator Online for<br className="hero-br" />
          Links, Text, WiFi, and More
        </h1>

        <p className="hero-sub">
          Create downloadable QR codes in seconds for websites, phone numbers, email,
          WiFi, contacts, and more. Fast, free, and completely private — nothing leaves your browser.
        </p>

        <div className="hero-actions">
          <a
            href="#qr-tool"
            className="btn btn--primary btn--lg"
            onClick={scrollToTool}
            id="hero-cta-qr"
          >
            Generate QR Code
            <span aria-hidden="true">↓</span>
          </a>
          <ul className="hero-trust" aria-label="Key features" role="list">
            <li>✓ 8 content types</li>
            <li>✓ Custom colors</li>
            <li>✓ PNG, SVG, JPG</li>
          </ul>
        </div>
      </div>

      {/* Decorative gradient blobs */}
      <div className="hero-blob hero-blob--1" aria-hidden="true" />
      <div className="hero-blob hero-blob--2" aria-hidden="true" />
    </section>
  );
}
