/**
 * canvas.js
 * Pure image resize functions using the HTML5 Canvas API.
 * No side effects — accepts inputs, returns a Promise<Blob>.
 */

/**
 * Calculates draw parameters for Fit, Fill, or Stretch modes.
 */
function calcDrawParams(imgW, imgH, targetW, targetH, mode) {
  if (mode === 'stretch') {
    return { sx: 0, sy: 0, sw: imgW, sh: imgH, dx: 0, dy: 0, dw: targetW, dh: targetH };
  }

  const imgRatio = imgW / imgH;
  const targetRatio = targetW / targetH;

  let dw, dh, dx, dy;

  if (mode === 'fit') {
    if (imgRatio > targetRatio) {
      dw = targetW;
      dh = Math.round(targetW / imgRatio);
    } else {
      dh = targetH;
      dw = Math.round(targetH * imgRatio);
    }
    dx = Math.round((targetW - dw) / 2);
    dy = Math.round((targetH - dh) / 2);
    return { sx: 0, sy: 0, sw: imgW, sh: imgH, dx, dy, dw, dh };
  }

  // fill — cover and center-crop
  let sx = 0, sy = 0, sw = imgW, sh = imgH;
  if (imgRatio > targetRatio) {
    sw = Math.round(imgH * targetRatio);
    sx = Math.round((imgW - sw) / 2);
  } else {
    sh = Math.round(imgW / targetRatio);
    sy = Math.round((imgH - sh) / 2);
  }
  return { sx, sy, sw, sh, dx: 0, dy: 0, dw: targetW, dh: targetH };
}

/**
 * Applies a circular clip mask to the canvas context.
 */
function applyCircleClip(ctx, w, h) {
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, Math.min(w, h) / 2, 0, Math.PI * 2);
  ctx.clip();
}

/**
 * Main resize function.
 * @param {HTMLImageElement} img         - Source image element
 * @param {number}           targetW     - Output width in px
 * @param {number}           targetH     - Output height in px
 * @param {string}           mode        - 'fit' | 'fill' | 'stretch'
 * @param {string}           bgColor     - CSS color string (used for fit mode)
 * @param {boolean}          circleCrop  - Apply circular mask
 * @param {string}           format      - 'jpeg' | 'png' | 'webp'
 * @param {number}           quality     - 0–1 (for jpeg/webp)
 * @returns {Promise<Blob>}
 */
export function resizeImageToBlob(img, targetW, targetH, mode, bgColor, circleCrop, format, quality) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');

      // Background fill (needed for fit mode and non-transparent formats)
      if (format !== 'png' && format !== 'webp') {
        ctx.fillStyle = bgColor || '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
      } else if (mode === 'fit' && bgColor && bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, targetW, targetH);
      }

      // Circular clip (must be set before drawing)
      if (circleCrop) {
        applyCircleClip(ctx, targetW, targetH);
      }

      const { sx, sy, sw, sh, dx, dy, dw, dh } = calcDrawParams(
        img.naturalWidth, img.naturalHeight, targetW, targetH, mode
      );

      ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);

      const mimeType = `image/${format}`;
      const qualityArg = (format === 'jpeg' || format === 'webp') ? quality : undefined;
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Canvas toBlob returned null'));
      }, mimeType, qualityArg);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Loads a File into an HTMLImageElement.
 * @param {File} file
 * @returns {Promise<HTMLImageElement>}
 */
export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
}

/**
 * Gets image dimensions from a File without fully loading it.
 */
export function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => reject(new Error('Failed to read dimensions'));
    img.src = url;
  });
}
