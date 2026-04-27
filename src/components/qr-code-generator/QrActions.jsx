import { Download, RotateCcw, QrCode, Copy, AlertCircle } from 'lucide-react';
import './QrActions.css';

/**
 * QrActions — Generate / Download / Reset / Copy buttons.
 */
export default function QrActions({
  qrDataUrl,
  isGenerating,
  error,
  canGenerate,
  onGenerate,
  onDownload,
  onReset,
  encodedContent,
}) {

  const handleCopy = async () => {
    if (!encodedContent) return;
    try {
      await navigator.clipboard.writeText(encodedContent);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = encodedContent;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };

  return (
    <div className="qr-actions">
      {/* Error */}
      {error && (
        <div className="qr-actions__error" role="alert" aria-live="assertive">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Primary Actions */}
      <div className="qr-actions__primary">
        {!qrDataUrl ? (
          <button
            className="btn btn--primary btn--lg"
            onClick={onGenerate}
            disabled={!canGenerate || isGenerating}
            id="btn-generate-qr"
            aria-busy={isGenerating}
          >
            {isGenerating ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Generating…
              </>
            ) : (
              <>
                <QrCode size={18} />
                Generate QR Code
              </>
            )}
          </button>
        ) : (
          <button
            className="btn btn--accent btn--lg"
            onClick={onDownload}
            id="btn-download-qr"
          >
            <Download size={18} />
            Download QR Code
          </button>
        )}
      </div>

      {/* Secondary Actions */}
      <div className="qr-actions__secondary">
        {qrDataUrl && (
          <button className="btn btn--outline" onClick={onGenerate} id="btn-regenerate-qr">
            <QrCode size={16} />
            Regenerate
          </button>
        )}
        {encodedContent && (
          <button className="btn btn--outline" onClick={handleCopy} id="btn-copy-content">
            <Copy size={16} />
            Copy Content
          </button>
        )}
        <button className="btn btn--ghost" onClick={onReset} id="btn-reset-qr">
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Hint */}
      {!qrDataUrl && !error && (
        <p className="qr-actions__hint">
          {canGenerate
            ? 'Ready to generate. Click the button above.'
            : 'Fill in the required fields to get started.'}
        </p>
      )}
    </div>
  );
}
