import './SeoContent.css';

const STEPS = [
  { num: '01', title: 'Choose a Type', desc: 'Select what kind of QR code you need — URL, text, phone, email, WiFi, contact, and more.' },
  { num: '02', title: 'Enter Your Content', desc: 'Fill in the required fields. The form adjusts automatically based on the type you choose.' },
  { num: '03', title: 'Customize (Optional)', desc: 'Adjust colors, size, margin, and download format. Or use the defaults — they work great.' },
  { num: '04', title: 'Generate & Download', desc: 'Click Generate, preview your QR code, and download it as PNG, SVG, or JPG.' },
];

const USE_CASES = [
  { title: 'Business Cards', desc: 'Add a QR code to your business card that opens your website, email, or saves your full contact as a vCard.' },
  { title: 'Restaurant Menus', desc: 'Place a QR code on tables that links directly to your digital menu — no app download required.' },
  { title: 'WiFi Sharing', desc: 'Generate a WiFi QR code for your office, store, or home. Guests scan it and connect instantly — no typing passwords.' },
  { title: 'Marketing Materials', desc: 'Link flyers, brochures, posters, and packaging directly to your website, landing page, or social profile.' },
  { title: 'Event Invitations', desc: 'Embed event details, RSVP links, or location maps in a scannable QR code on your invitations.' },
  { title: 'Product Packaging', desc: 'Link physical products to manuals, support pages, registration forms, or warranty information.' },
];

export default function SeoContent() {
  return (
    <div className="seo-content">
      {/* What This Tool Does */}
      <section className="seo-section" aria-labelledby="qr-what-heading">
        <h2 className="section-heading" id="qr-what-heading">What Is a QR Code Generator?</h2>
        <div className="seo-section__body">
          <p>
            A QR code generator creates scannable two-dimensional barcodes that store information like
            website URLs, phone numbers, email addresses, WiFi credentials, and contact details. When
            someone scans the code with their smartphone camera, the encoded content opens automatically.
          </p>
          <p>
            This free online QR code generator works entirely in your browser — your data is never sent
            to any server. You can create QR codes for 8 different content types, customize the appearance
            with custom colors and sizes, and download in PNG, SVG, or JPG format.
          </p>
        </div>
      </section>

      {/* How To */}
      <section className="seo-section" aria-labelledby="qr-howto-heading">
        <h2 className="section-heading" id="qr-howto-heading">How to Create a QR Code</h2>
        <div className="steps-grid">
          {STEPS.map(({ num, title, desc }) => (
            <div className="step-card" key={num}>
              <span className="step-card__num" aria-hidden="true">{num}</span>
              <h3 className="step-card__title">{title}</h3>
              <p className="step-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Common Uses */}
      <section className="seo-section" aria-labelledby="qr-uses-heading">
        <h2 className="section-heading" id="qr-uses-heading">Common Uses of QR Codes</h2>
        <p className="section-subheading" style={{ marginBottom: 'var(--space-8)' }}>
          QR codes bridge the gap between physical and digital. Here are the most popular use cases.
        </p>
        <div className="steps-grid">
          {USE_CASES.map(({ title, desc }) => (
            <div className="step-card" key={title}>
              <h3 className="step-card__title">{title}</h3>
              <p className="step-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Downloadable QR Codes Are Useful */}
      <section className="seo-section" aria-labelledby="qr-why-heading">
        <h2 className="section-heading" id="qr-why-heading">Why Downloadable QR Codes Matter</h2>
        <div className="seo-section__body">
          <p>
            Unlike QR codes generated on platforms that track scans or expire after a trial period,
            downloadable QR codes give you full ownership. You can print them, embed them in documents,
            add them to product packaging, or use them in any design tool without restrictions.
          </p>
          <p>
            SVG downloads are ideal for print materials because they scale to any size without losing
            quality. PNG files work well for digital use — websites, emails, and social media. JPG is
            useful when you need maximum compatibility with older systems.
          </p>
          <p>
            Since this tool generates static QR codes, they never expire, don't require an account,
            and work offline once scanned. The encoded content is baked directly into the QR pattern.
          </p>
        </div>
      </section>
    </div>
  );
}
