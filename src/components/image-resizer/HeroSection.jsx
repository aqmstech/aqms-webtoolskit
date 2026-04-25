import './HeroSection.css';

export default function HeroSection() {
  const scrollToTool = (e) => {
    e.preventDefault();
    document.getElementById('resize-tool')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" aria-label="Page introduction">
      <div className="container hero-inner">
        <div className="hero-eyebrow">
          <span className="badge badge--primary">Free Online Tool</span>
          <span className="hero-eyebrow__sep" aria-hidden="true">·</span>
          <span className="hero-eyebrow__note">🔒 No upload to server</span>
        </div>

        <h1 className="hero-h1">
          Resize Images Online for Social Media,<br className="hero-br" />
          Banners, Profiles, and More
        </h1>

        <p className="hero-sub">
          Choose from ready-made sizes for Facebook, LinkedIn, Instagram, YouTube, and more —
          or enter custom dimensions and resize your image in seconds. Fast, free, and completely private.
        </p>

        <div className="hero-actions">
          <a
            href="#resize-tool"
            className="btn btn--primary btn--lg"
            onClick={scrollToTool}
            id="hero-cta"
          >
            Resize Your Image
            <span aria-hidden="true">↓</span>
          </a>
          <ul className="hero-trust" aria-label="Key features" role="list">
            <li>✓ 20+ presets</li>
            <li>✓ Custom dimensions</li>
            <li>✓ JPG, PNG, WEBP</li>
          </ul>
        </div>
      </div>

      {/* Decorative gradient blobs */}
      <div className="hero-blob hero-blob--1" aria-hidden="true" />
      <div className="hero-blob hero-blob--2" aria-hidden="true" />
    </section>
  );
}
