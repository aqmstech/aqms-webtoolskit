import { QrCode } from 'lucide-react';
import './QrPreview.css';

/**
 * QrPreview — Shows the generated QR code or an empty-state placeholder.
 */
export default function QrPreview({ qrDataUrl, isGenerating }) {
  return (
    <div className="qr-preview" aria-label="QR code preview">
      <div className="qr-preview__canvas-wrap">
        {isGenerating ? (
          <div className="qr-preview__loading">
            <span className="btn-spinner btn-spinner--lg" aria-hidden="true" />
            <span>Generating…</span>
          </div>
        ) : qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="Generated QR code"
            className="qr-preview__image"
            id="qr-preview-image"
          />
        ) : (
          <div className="qr-preview__empty">
            <QrCode size={48} strokeWidth={1.2} aria-hidden="true" />
            <span>Your QR code will appear here</span>
          </div>
        )}
      </div>
    </div>
  );
}
