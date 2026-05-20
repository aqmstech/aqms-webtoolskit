import { Link, NavLink } from 'react-router-dom';
import { useScrollHeader } from '../../hooks/useScrollHeader';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import './Header.css';

const NAV_LINKS = [
  { to: '/image-resizer', label: 'Image Resizer' },
  { to: '/qr-code-generator', label: 'QR Generator' },
  { to: '/scan-qr-code-from-image', label: 'QR Reader' },
  // Future tools added here:
  // { to: '/image-compressor', label: 'Image Compressor' },
  // { to: '/format-converter', label: 'Format Converter' },
];

export default function Header() {
  const scrolled = useScrollHeader(8);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`} role="banner">
      <div className="container header-inner">
        {/* Logo */}
        <Link to="/" className="site-logo" aria-label="ToolKit Home">
          <span className="site-logo__icon" aria-hidden="true">
            <Zap size={20} />
          </span>
          <span className="site-logo__text">ToolKit</span>
          <span className="badge badge--primary site-logo__badge">Free</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav" aria-label="Main navigation">
          <ul role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `header-nav__link ${isActive ? 'header-nav__link--active' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="header-mobile-btn btn btn--ghost btn--icon"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="header-mobile-nav" aria-label="Mobile navigation">
          <ul role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className="header-mobile-nav__link"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
