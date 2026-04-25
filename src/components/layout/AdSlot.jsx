import './AdSlot.css';

/**
 * AdSlot — monetization-ready placeholder.
 * @param {'leaderboard'|'in-content'|'sidebar'} variant
 * @param {string} label  Optional custom label
 */
export default function AdSlot({ variant = 'leaderboard', label = 'Advertisement' }) {
  return (
    <aside
      className={`ad-slot ad-slot--${variant}`}
      aria-label={label}
      role="complementary"
    >
      <div className="ad-slot__inner">
        <span className="ad-slot__label">Ad</span>
        {/* Replace with actual ad tag, e.g. <ins className="adsbygoogle" ... /> */}
      </div>
    </aside>
  );
}
