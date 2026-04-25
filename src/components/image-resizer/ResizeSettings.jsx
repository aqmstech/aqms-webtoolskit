import './ResizeSettings.css';

const MODES = [
  {
    id: 'fit',
    label: 'Fit',
    desc: 'Scales to fit, preserves ratio, fills background',
  },
  {
    id: 'fill',
    label: 'Fill',
    desc: 'Covers target, preserves ratio, crops overflow',
  },
  {
    id: 'stretch',
    label: 'Stretch',
    desc: 'Forces exact size, may distort',
  },
];

const FORMATS = [
  { id: 'original', label: 'Original' },
  { id: 'jpeg',    label: 'JPG' },
  { id: 'png',     label: 'PNG' },
  { id: 'webp',    label: 'WEBP' },
];

export default function ResizeSettings({ settings, onChange, disabled }) {
  const showBgColor = settings.mode === 'fit';
  const showQuality = settings.format === 'jpeg' || settings.format === 'webp';

  return (
    <div className={`resize-settings ${disabled ? 'resize-settings--disabled' : ''}`}>
      {disabled && (
        <div className="resize-settings__empty">
          <p>Upload an image first, then adjust settings here.</p>
        </div>
      )}

      {/* ── Resize Mode ── */}
      <div className="rs-group">
        <label className="rs-label">Resize Mode</label>
        <div className="rs-mode-row" role="radiogroup" aria-label="Resize mode">
          {MODES.map(({ id, label, desc }) => (
            <label
              key={id}
              className={`rs-mode-btn ${settings.mode === id ? 'rs-mode-btn--active' : ''}`}
              title={desc}
            >
              <input
                type="radio"
                name="resize-mode"
                value={id}
                checked={settings.mode === id}
                onChange={() => onChange({ mode: id })}
                className="sr-only"
              />
              <span className="rs-mode-btn__label">{label}</span>
              <span className="rs-mode-btn__desc">{desc}</span>
            </label>
          ))}
        </div>
      </div>

      {/* ── Export Format ── */}
      <div className="rs-group">
        <label className="rs-label">Export Format</label>
        <div className="rs-format-row">
          {FORMATS.map(({ id, label }) => (
            <label key={id} className={`rs-format-pill ${settings.format === id ? 'rs-format-pill--active' : ''}`}>
              <input
                type="radio"
                name="export-format"
                value={id}
                checked={settings.format === id}
                onChange={() => onChange({ format: id })}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </div>

      {/* ── Quality Slider ── */}
      {showQuality && (
        <div className="rs-group">
          <div className="rs-quality-header">
            <label className="rs-label" htmlFor="quality-slider">Quality</label>
            <span className="rs-quality-val">{settings.quality}%</span>
          </div>
          <input
            id="quality-slider"
            type="range"
            className="range-slider"
            min="10"
            max="100"
            step="5"
            value={settings.quality}
            onChange={(e) => onChange({ quality: Number(e.target.value) })}
            aria-label={`Export quality: ${settings.quality}%`}
          />
          <div className="rs-quality-hints">
            <span>Smaller file</span>
            <span>Best quality</span>
          </div>
        </div>
      )}

      {/* ── Background Color (Fit mode) ── */}
      {showBgColor && (
        <div className="rs-group">
          <label className="rs-label" htmlFor="bg-color">Background Fill</label>
          <div className="rs-color-row">
            <input
              id="bg-color"
              type="color"
              className="rs-color-swatch"
              value={settings.bgColor === 'transparent' ? '#ffffff' : settings.bgColor}
              onChange={(e) => onChange({ bgColor: e.target.value })}
              aria-label="Background fill color"
            />
            <code className="rs-color-value">{settings.bgColor}</code>
            {(settings.format === 'png' || settings.format === 'webp') && (
              <label className="rs-toggle">
                <input
                  type="checkbox"
                  checked={settings.bgColor === 'transparent'}
                  onChange={(e) => onChange({ bgColor: e.target.checked ? 'transparent' : '#ffffff' })}
                />
                <span className="rs-toggle__track" />
                <span className="rs-toggle__label">Transparent</span>
              </label>
            )}
          </div>
          <p className="rs-hint">Fills empty areas when image doesn't fill the target dimensions.</p>
        </div>
      )}

      {/* ── Circle Crop ── */}
      <div className="rs-group">
        <label className="rs-toggle rs-toggle--block">
          <input
            type="checkbox"
            checked={settings.circleCrop}
            onChange={(e) => onChange({ circleCrop: e.target.checked })}
          />
          <span className="rs-toggle__track" />
          <div className="rs-toggle__content">
            <span className="rs-toggle__label">Circle Crop</span>
            <span className="rs-hint">Output as a circular shape — great for profile pictures.</span>
          </div>
        </label>
      </div>
    </div>
  );
}
