import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { PRESETS, PRESET_CATEGORIES, CATEGORY_LABELS } from '../../data/presets';
import './PresetSelector.css';

const CATEGORIES = [
  PRESET_CATEGORIES.SOCIAL,
  PRESET_CATEGORIES.SHAPES,
  PRESET_CATEGORIES.CUSTOM,
];

// Platform icon SVGs (inline, minimal)
const PlatformIcon = ({ icon, color }) => {
  const icons = {
    facebook:  <svg viewBox="0 0 24 24" fill={color}><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>,
    instagram: <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill={color}/></svg>,
    linkedin:  <svg viewBox="0 0 24 24" fill={color}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-3a2 2 0 110-4 2 2 0 010 4z"/></svg>,
    twitter:   <svg viewBox="0 0 24 24" fill={color}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
    youtube:   <svg viewBox="0 0 24 24" fill={color}><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>,
    square:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>,
    portrait:  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="5" y="2" width="14" height="20" rx="2"/></svg>,
    landscape: <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/></svg>,
    circle:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><circle cx="12" cy="12" r="9"/></svg>,
    phone:     <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="2"/></svg>,
    banner:    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2"><rect x="2" y="7" width="20" height="10" rx="2"/></svg>,
  };
  return <span className="preset-icon" aria-hidden="true">{icons[icon] || icons.square}</span>;
};

export default function PresetSelector({ selectedPreset, dimensions, onPresetSelect, onCustomChange }) {
  const [activeTab, setActiveTab] = useState(PRESET_CATEGORIES.SOCIAL);
  const [aspectLocked, setAspectLocked] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(null);

  const handlePresetClick = (preset) => {
    onPresetSelect(preset);
    setAspectRatio(preset.width / preset.height);
  };

  const handleWidthChange = (e) => {
    const w = parseInt(e.target.value, 10) || '';
    if (aspectLocked && aspectRatio && w) {
      onCustomChange({ width: w, height: Math.round(w / aspectRatio) });
    } else {
      onCustomChange({ width: w, height: dimensions.height });
    }
  };

  const handleHeightChange = (e) => {
    const h = parseInt(e.target.value, 10) || '';
    if (aspectLocked && aspectRatio && h) {
      onCustomChange({ width: Math.round(h * aspectRatio), height: h });
    } else {
      onCustomChange({ width: dimensions.width, height: h });
    }
  };

  const toggleLock = () => {
    if (!aspectLocked && dimensions.width && dimensions.height) {
      setAspectRatio(dimensions.width / dimensions.height);
    }
    setAspectLocked((v) => !v);
  };

  return (
    <div className="preset-selector">
      {/* Category Tabs */}
      <div className="tabs preset-selector__tabs" role="tablist" aria-label="Size category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${activeTab === cat ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === cat}
            onClick={() => setActiveTab(cat)}
            id={`tab-${cat}`}
            aria-controls={`tabpanel-${cat}`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Preset Grid */}
      {activeTab !== PRESET_CATEGORIES.CUSTOM && (
        <div
          className="preset-grid"
          id={`tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
        >
          {PRESETS[activeTab].map((preset) => {
            const isSelected = selectedPreset?.id === preset.id;
            return (
              <button
                key={preset.id}
                className={`preset-card ${isSelected ? 'preset-card--selected' : ''}`}
                onClick={() => handlePresetClick(preset)}
                aria-pressed={isSelected}
                title={`${preset.label} — ${preset.width}×${preset.height}`}
              >
                <PlatformIcon icon={preset.icon} color={isSelected ? 'white' : preset.color} />
                <span className="preset-card__label">{preset.label}</span>
                <span className="preset-card__dims">{preset.width}×{preset.height}</span>
                {isSelected && <span className="preset-card__check" aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Custom Inputs */}
      {activeTab === PRESET_CATEGORIES.CUSTOM && (
        <div
          className="custom-inputs"
          id={`tabpanel-${PRESET_CATEGORIES.CUSTOM}`}
          role="tabpanel"
          aria-labelledby={`tab-${PRESET_CATEGORIES.CUSTOM}`}
        >
          <p className="custom-inputs__hint">Enter your target dimensions in pixels.</p>
          <div className="custom-inputs__row">
            <div className="form-group">
              <label className="form-label" htmlFor="custom-width">Width (px)</label>
              <input
                id="custom-width"
                type="number"
                className="form-input"
                min="1"
                max="8000"
                value={dimensions.width || ''}
                onChange={handleWidthChange}
                placeholder="e.g. 1200"
              />
            </div>

            <button
              className={`custom-inputs__lock btn btn--icon ${aspectLocked ? 'custom-inputs__lock--active' : ''}`}
              onClick={toggleLock}
              aria-label={aspectLocked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
              title={aspectLocked ? 'Aspect ratio locked' : 'Lock aspect ratio'}
              type="button"
            >
              {aspectLocked ? <Lock size={16} /> : <Unlock size={16} />}
            </button>

            <div className="form-group">
              <label className="form-label" htmlFor="custom-height">Height (px)</label>
              <input
                id="custom-height"
                type="number"
                className="form-input"
                min="1"
                max="8000"
                value={dimensions.height || ''}
                onChange={handleHeightChange}
                placeholder="e.g. 630"
              />
            </div>
          </div>
          {aspectLocked && (
            <p className="custom-inputs__lock-note">
              <Lock size={12} /> Aspect ratio locked — changing one dimension updates the other.
            </p>
          )}
        </div>
      )}

      {/* Current Selection Summary */}
      {(selectedPreset || (dimensions.width && dimensions.height)) && (
        <div className="preset-selection-summary" aria-live="polite">
          <span className="preset-selection-summary__label">Selected size:</span>
          <strong>{dimensions.width} × {dimensions.height} px</strong>
          {selectedPreset && <span className="preset-selection-summary__name">({selectedPreset.label})</span>}
        </div>
      )}
    </div>
  );
}
