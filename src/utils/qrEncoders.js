/**
 * qrEncoders.js
 * Pure functions that convert user input into QR-compatible encoded strings.
 * Each encoder accepts a flat object of field values and returns a string.
 */

/** URL — pass through (validated upstream) */
export function encodeUrl({ url }) {
  return url?.trim() || '';
}

/** Plain text */
export function encodeText({ text }) {
  return text?.trim() || '';
}

/** Phone — tel: URI */
export function encodePhone({ phone }) {
  const cleaned = phone?.trim() || '';
  return cleaned ? `tel:${cleaned}` : '';
}

/** Email — mailto: URI with optional subject & body */
export function encodeEmail({ to, subject, body }) {
  const addr = to?.trim() || '';
  if (!addr) return '';
  const params = [];
  if (subject?.trim()) params.push(`subject=${encodeURIComponent(subject.trim())}`);
  if (body?.trim()) params.push(`body=${encodeURIComponent(body.trim())}`);
  return params.length ? `mailto:${addr}?${params.join('&')}` : `mailto:${addr}`;
}

/** SMS — smsto: URI */
export function encodeSms({ phone, message }) {
  const num = phone?.trim() || '';
  if (!num) return '';
  const msg = message?.trim() || '';
  return msg ? `smsto:${num}:${msg}` : `smsto:${num}`;
}

/** WhatsApp — wa.me deep link */
export function encodeWhatsApp({ phone, message }) {
  const num = (phone?.trim() || '').replace(/[^0-9]/g, '');
  if (!num) return '';
  const msg = message?.trim() || '';
  return msg
    ? `https://wa.me/${num}?text=${encodeURIComponent(msg)}`
    : `https://wa.me/${num}`;
}

/**
 * WiFi — WIFI: mecard format
 * Spec: WIFI:T:<auth>;S:<ssid>;P:<password>;H:<hidden>;;
 */
export function encodeWifi({ ssid, password, encryption, hidden }) {
  const s = ssid?.trim() || '';
  if (!s) return '';
  const t = encryption || 'WPA';
  const p = password?.trim() || '';
  const h = hidden ? 'true' : 'false';
  // Escape special chars in SSID and password
  const esc = (v) => v.replace(/([\\;,:"'])/g, '\\$1');
  return `WIFI:T:${t};S:${esc(s)};P:${esc(p)};H:${h};;`;
}

/**
 * vCard 3.0 — standard contact card
 */
export function encodeVCard({ firstName, lastName, phone, email, organization, title, url, note }) {
  const fn = [firstName?.trim(), lastName?.trim()].filter(Boolean).join(' ');
  if (!fn) return '';

  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${fn}`,
    `N:${lastName?.trim() || ''};${firstName?.trim() || ''};;;`,
  ];

  if (phone?.trim()) lines.push(`TEL:${phone.trim()}`);
  if (email?.trim()) lines.push(`EMAIL:${email.trim()}`);
  if (organization?.trim()) lines.push(`ORG:${organization.trim()}`);
  if (title?.trim()) lines.push(`TITLE:${title.trim()}`);
  if (url?.trim()) lines.push(`URL:${url.trim()}`);
  if (note?.trim()) lines.push(`NOTE:${note.trim()}`);

  lines.push('END:VCARD');
  return lines.join('\n');
}
