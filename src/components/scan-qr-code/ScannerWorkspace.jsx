import { useRef, useEffect, useState, useCallback } from 'react';
import FileUploader from '../common/FileUploader';
import { detectAndDecodeQrs } from '../../utils/qrReader';
import { RefreshCw, X, AlertTriangle, ShieldCheck } from 'lucide-react';

/**
 * ScannerWorkspace — The main tool interactive area.
 * Handles drag-and-drop file upload, displays image preview,
 * highlights detected QR codes on canvas, and displays status alerts.
 */
export default function ScannerWorkspace({ onResultsChange }) {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const [isScanning, setIsScanning] = useState(false);
  const [scanAttempted, setScanAttempted] = useState(false);
  const [results, setResults] = useState([]);

  // Process the uploaded file
  const processFile = useCallback((f) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(f.type)) {
      setUploadError('Unsupported format. Please upload a JPG, PNG, or WEBP image.');
      return;
    }
    if (f.size > 64 * 1024 * 1024) {
      setUploadError(`File is too large. Maximum size is 64 MB (your file: ${(f.size / 1024 / 1024).toFixed(1)} MB).`);
      return;
    }

    setUploadError(null);
    setFile(f);

    const url = URL.createObjectURL(f);
    setPreview(url);

    setIsScanning(true);
    setScanAttempted(true);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = async () => {
      imageRef.current = img;
      const decodedResults = await detectAndDecodeQrs(img);
      setResults(decodedResults);
      onResultsChange(decodedResults);
      setIsScanning(false);
    };
    img.onerror = () => {
      setIsScanning(false);
    };
    img.src = url;
  }, [onResultsChange]);

  // Run QR detection manually
  const handleScanAgain = useCallback(async () => {
    if (!imageRef.current) return;
    setIsScanning(true);
    setScanAttempted(true);

    const decodedResults = await detectAndDecodeQrs(imageRef.current);
    setResults(decodedResults);
    onResultsChange(decodedResults);
    setIsScanning(false);
  }, [onResultsChange]);

  // Event handlers
  const handleSelect = useCallback((e) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  }, [processFile]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  }, [processFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleReset = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    imageRef.current = null;
    setFile(null);
    setPreview(null);
    setUploadError(null);
    setIsDragging(false);
    setResults([]);
    onResultsChange([]);
    setScanAttempted(false);
    setIsScanning(false);
  }, [preview, onResultsChange]);

  // Draw bounding boxes on canvas when image and results are ready
  useEffect(() => {
    if (!preview || !imageRef.current) return;

    const img = imageRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;

    canvas.width = width;
    canvas.height = height;

    // 1. Draw original image
    ctx.drawImage(img, 0, 0, width, height);

    // 2. Draw overlays if results are present
    if (results && results.length > 0) {
      results.forEach((qr, index) => {
        const { topLeftCorner, topRightCorner, bottomRightCorner, bottomLeftCorner } = qr.location;

        // Draw outline path
        ctx.strokeStyle = 'hsl(228, 70%, 55%)'; // Primary brand color
        ctx.lineWidth = Math.max(3, Math.min(width, height) * 0.008); // Responsive line thickness
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(topLeftCorner.x, topLeftCorner.y);
        ctx.lineTo(topRightCorner.x, topRightCorner.y);
        ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y);
        ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y);
        ctx.closePath();
        ctx.stroke();

        // Draw translucent blue fill
        ctx.fillStyle = 'hsla(228, 70%, 55%, 0.18)';
        ctx.fill();

        // Draw number badge
        const badgeRadius = Math.max(14, Math.min(width, height) * 0.02);
        const x = topLeftCorner.x;
        const y = topLeftCorner.y;

        ctx.beginPath();
        ctx.arc(x, y, badgeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'hsl(228, 70%, 55%)';
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${badgeRadius * 1.1}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(index + 1), x, y);
      });
    }
  }, [preview, results]);

  return (
    <div className="qr-scanner-workspace">
      {/* Step 1: Upload Zone */}
      {!preview && (
        <div className="tool-step">
          <div className="tool-step__label">
            <span className="tool-step__num" aria-hidden="true">1</span>
            <span>Upload Screenshot or Image</span>
          </div>
          <FileUploader
            file={file}
            preview={preview}
            error={uploadError}
            isDragging={isDragging}
            onSelect={handleSelect}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClear={handleReset}
          />
        </div>
      )}

      {/* Step 2: Image Preview Canvas & Actions */}
      {preview && (
        <div className="tool-step">
          <div className="tool-step__label">
            <span className="tool-step__num" aria-hidden="true">2</span>
            <span>Image Preview & Scanning</span>
          </div>

          <div className="scanner-preview-card scanner-preview-card--has-image">
            <div className="scanner-canvas-container">
              <canvas ref={canvasRef} className="scanner-canvas" />
            </div>

            {/* Scanning Indicator overlay */}
            {isScanning && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(255, 255, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: 'var(--space-3)',
                }}
              >
                <RefreshCw className="animate-spin" size={32} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>Scanning Image...</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="scanner-actions">
            <button
              onClick={handleScanAgain}
              disabled={isScanning}
              className="btn btn--outline"
            >
              <RefreshCw size={16} />
              <span>Scan Again</span>
            </button>
            <button
              onClick={handleReset}
              disabled={isScanning}
              className="btn btn--ghost"
            >
              <X size={16} />
              <span>Remove Image</span>
            </button>
          </div>

          {/* Alert if no QR code found */}
          {scanAttempted && !isScanning && results.length === 0 && (
            <div className="scanner-alert" role="alert">
              <div className="scanner-alert__title" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <AlertTriangle size={18} />
                <span>No QR Code Detected</span>
              </div>
              <p>We couldn't detect any QR codes in the uploaded image. Please try the following suggestions:</p>
              <ul className="scanner-alert__list">
                <li>Make sure the QR code is fully visible and not cut off.</li>
                <li>Verify the image is sharp and not blurry. Good lighting and focus help.</li>
                <li>Ensure the QR code has sufficient contrast from its background.</li>
                <li>Try cropping the image closer to the QR code before uploading.</li>
              </ul>
            </div>
          )}

          {/* Privacy Note */}
          <p className="scanner-privacy-note">
            <ShieldCheck size={16} style={{ color: 'var(--color-accent)' }} />
            <span>100% Client-Side Processing — Your image never leaves your device.</span>
          </p>
        </div>
      )}
    </div>
  );
}
