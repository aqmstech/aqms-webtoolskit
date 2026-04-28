import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import './Footer.css';

const TOOL_LINKS = [
  { to: '/image-resizer', label: 'Image Resizer' },
  { to: '/qr-code-generator', label: 'QR Code Generator' },
  // { to: '/image-compressor', label: 'Image Compressor' },
  // { to: '/format-converter', label: 'Format Converter' },
];

const LEGAL_LINKS = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Use' },
  { href: '#', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="site-logo" aria-label="ToolKit Home">
            <span className="site-logo__icon" aria-hidden="true">
              <Zap size={16} />
            </span>
            <span className="site-logo__text">ToolKit</span>
          </Link>
          <p className="footer-tagline">
            Free, fast, and private online tools.<br />
            Your files never leave your browser.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer tools">
          <h3 className="footer-nav__heading">Tools</h3>
          <ul role="list">
            {TOOL_LINKS.map(({ to, label }) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className="footer-nav" aria-label="Legal links">
          <h3 className="footer-nav__heading">Legal</h3>
          <ul role="list">
            {LEGAL_LINKS.map(({ href, label }) => (
              <li key={label}><a href={href}>{label}</a></li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ToolKit. All rights reserved.</p>
          <p className="footer-privacy-note">
            🔒 All image processing happens in your browser. We never store your files.
          </p>
        </div>
      </div>
    </footer>
  );
}
