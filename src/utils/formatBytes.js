/**
 * formatBytes.js
 * Human-readable file size formatter.
 */
export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * Returns a short file extension from a MIME type.
 */
export function mimeToExt(mime) {
  const map = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
  return map[mime] || 'jpg';
}

/**
 * Derives the export MIME type from format setting.
 * 'original' falls back to the file's own type.
 */
export function resolveFormat(formatSetting, originalType) {
  if (formatSetting === 'original') return originalType || 'image/jpeg';
  const map = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
  return map[formatSetting] || originalType;
}
