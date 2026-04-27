import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './QrCustomization.css';

const SIZE_OPTIONS = [
  { value: 128, label: '128 × 128' },
  { value: 256, label: '256 × 256' },
  { value: 512, label: '512 × 512' },
  { value: 1024, label: '1024 × 1024' },
];

const EC_OPTIONS = [
  { value: 'L', label: 'Low (7%)' },
  { value: 'M', label: 'Medium (15%)' },
  { value: 'Q', label: 'Quartile (25%)' },
  { value: 'H', label: 'High (30%)' },
];

const FORMAT_OPTIONS = ['png', 'svg', 'jpg'];

/**
 * QrCustomization — Collapsible panel for QR code appearance settings.
 */
export default function QrCustomization({ options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const patch = (key, value) => onChange({ ...options, [key]: value });

  return (
    <div className="qr-customization">
      <button
        className="qr-customization__toggle"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        id="qr-customization-toggle"
      >
        <span>Customize Appearance</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="qr-customization__body">
          {/* Size */}
          <div className="qr-opt">
            <label className="qr-opt__label" htmlFor="qr-opt-size">Size</label>
            <select
              id="qr-opt-size"
              className="qr-opt__select"
              value={options.size}
              onChange={(e) => patch('size', Number(e.target.value))}
            >
              {SIZE_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Margin */}
          <div className="qr-opt">
            <label className="qr-opt__label" htmlFor="qr-opt-margin">
              Margin <span className="qr-opt__value">{options.margin}</span>
            </label>
            <input
              id="qr-opt-margin"
              type="range"
              className="qr-opt__range"
              min="0"
              max="8"
              value={options.margin}
              onChange={(e) => patch('margin', Number(e.target.value))}
            />
          </div>

          {/* Foreground Color */}
          <div className="qr-opt">
            <label className="qr-opt__label" htmlFor="qr-opt-fg">Foreground Color</label>
            <div className="qr-opt__color-wrap">
              <input
                id="qr-opt-fg"
                type="color"
                className="qr-opt__color"
                value={options.fgColor}
                onChange={(e) => patch('fgColor', e.target.value)}
              />
              <span className="qr-opt__color-hex">{options.fgColor}</span>
            </div>
          </div>

          {/* Background Color */}
          <div className="qr-opt">
            <label className="qr-opt__label" htmlFor="qr-opt-bg">Background Color</label>
            <div className="qr-opt__color-wrap">
              <input
                id="qr-opt-bg"
                type="color"
                className="qr-opt__color"
                value={options.bgColor}
                onChange={(e) => patch('bgColor', e.target.value)}
                disabled={options.transparent}
              />
              <span className="qr-opt__color-hex">{options.transparent ? 'Transparent' : options.bgColor}</span>
            </div>
          </div>

          {/* Transparent Background */}
          <div className="qr-opt qr-opt--checkbox">
            <label className="qr-opt__checkbox-label">
              <input
                type="checkbox"
                checked={options.transparent}
                onChange={(e) => patch('transparent', e.target.checked)}
                id="qr-opt-transparent"
              />
              <span>Transparent Background</span>
            </label>
          </div>

          {/* Error Correction */}
          <div className="qr-opt">
            <label className="qr-opt__label" htmlFor="qr-opt-ec">Error Correction</label>
            <select
              id="qr-opt-ec"
              className="qr-opt__select"
              value={options.errorCorrection}
              onChange={(e) => patch('errorCorrection', e.target.value)}
            >
              {EC_OPTIONS.map((ec) => (
                <option key={ec.value} value={ec.value}>{ec.label}</option>
              ))}
            </select>
          </div>

          {/* Download Format */}
          <div className="qr-opt">
            <span className="qr-opt__label">Download Format</span>
            <div className="qr-opt__pills" role="radiogroup" aria-label="Download format">
              {FORMAT_OPTIONS.map((fmt) => (
                <button
                  key={fmt}
                  className={`qr-opt__pill ${options.format === fmt ? 'qr-opt__pill--active' : ''}`}
                  role="radio"
                  aria-checked={options.format === fmt}
                  onClick={() => patch('format', fmt)}
                  id={`qr-opt-format-${fmt}`}
                >
                  {fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
