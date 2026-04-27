import { useState, useCallback, useRef } from 'react';
import QRCode from 'qrcode';

/**
 * useQrGenerator — Generates QR codes as Canvas data URLs and SVG strings.
 *
 * Returns:
 *   qrDataUrl    — PNG/JPG data URL for preview & raster download
 *   qrSvgString  — SVG markup string for SVG download
 *   isGenerating  — loading state
 *   error         — validation / generation error string
 *   generate(encodedContent, options)
 *   download(format, filename)
 *   reset()
 */
export function useQrGenerator() {
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [qrSvgString, setQrSvgString] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  /**
   * Generate a QR code.
   * @param {string} content   — The encoded string to embed in the QR code.
   * @param {object} options   — { size, margin, fgColor, bgColor, transparent, errorCorrection }
   */
  const generate = useCallback(async (content, options = {}) => {
    if (!content?.trim()) {
      setError('Please fill in the required fields.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    const {
      size = 512,
      margin = 4,
      fgColor = '#000000',
      bgColor = '#ffffff',
      transparent = false,
      errorCorrection = 'M',
    } = options;

    const qrOpts = {
      width: size,
      margin,
      color: {
        dark: fgColor,
        light: transparent ? '#00000000' : bgColor,
      },
      errorCorrectionLevel: errorCorrection,
    };

    try {
      // Generate data URL (for preview + PNG/JPG download)
      const dataUrl = await QRCode.toDataURL(content, qrOpts);
      setQrDataUrl(dataUrl);

      // Generate SVG string (for SVG download)
      const svg = await QRCode.toString(content, { ...qrOpts, type: 'svg' });
      setQrSvgString(svg);
    } catch (err) {
      setError(`QR generation failed: ${err.message}`);
      setQrDataUrl(null);
      setQrSvgString(null);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  /**
   * Download the generated QR code.
   * @param {'png'|'svg'|'jpg'} format
   * @param {string} filename — base name without extension
   */
  const download = useCallback((format = 'png', filename = 'qr-code') => {
    if (format === 'svg' && qrSvgString) {
      const blob = new Blob([qrSvgString], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      triggerDownload(url, `${filename}.svg`);
      URL.revokeObjectURL(url);
      return;
    }

    if (!qrDataUrl) return;

    if (format === 'jpg') {
      // Convert PNG data URL to JPG via canvas
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        // Fill white background for JPG (no transparency)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        const jpgUrl = canvas.toDataURL('image/jpeg', 0.95);
        triggerDownload(jpgUrl, `${filename}.jpg`);
      };
      img.src = qrDataUrl;
      return;
    }

    // Default: PNG
    triggerDownload(qrDataUrl, `${filename}.png`);
  }, [qrDataUrl, qrSvgString]);

  const reset = useCallback(() => {
    setQrDataUrl(null);
    setQrSvgString(null);
    setError(null);
  }, []);

  return {
    qrDataUrl,
    qrSvgString,
    isGenerating,
    error,
    generate,
    download,
    reset,
    canvasRef,
  };
}

function triggerDownload(url, filename) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
