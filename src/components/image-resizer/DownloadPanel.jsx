import { Download, RotateCcw, RefreshCw, AlertCircle, Move } from 'lucide-react';
import './DownloadPanel.css';

export default function DownloadPanel({
  resizedUrl,
  isProcessing,
  error,
  onDownload,
  onResizeAgain,
  onReset,
  canResize,
  onResize,
  isFillMode,
  onAdjustCrop,
  isCropMode,
}) {
  return (
    <div className="download-panel">
      {/* Error */}
      {error && (
        <div className="download-panel__error" role="alert" aria-live="assertive">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Actions */}
      <div className="download-panel__actions">
        {/* Primary: Resize or Download */}
        {!resizedUrl ? (
          <button
            className="btn btn--primary btn--lg"
            onClick={onResize}
            disabled={!canResize || isProcessing}
            id="btn-resize"
            aria-busy={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Resizing…
              </>
            ) : (
              <>
                <RefreshCw size={18} />
                Resize Image
              </>
            )}
          </button>
        ) : (
          <button
            className="btn btn--accent btn--lg"
            onClick={onDownload}
            id="btn-download"
          >
            <Download size={18} />
            Download Resized Image
          </button>
        )}

        {/* Secondary Actions */}
        <div className="download-panel__secondary">
          {resizedUrl && isFillMode && !isCropMode && (
            <button className="btn btn--outline" onClick={onAdjustCrop} id="btn-adjust-crop">
              <Move size={16} />
              Adjust Crop
            </button>
          )}
          {resizedUrl && (
            <button className="btn btn--outline" onClick={onResizeAgain} id="btn-resize-again">
              <RefreshCw size={16} />
              Resize Again
            </button>
          )}
          <button className="btn btn--ghost" onClick={onReset} id="btn-reset">
            <RotateCcw size={16} />
            Start Over
          </button>
        </div>
      </div>

      {/* Hint */}
      {!resizedUrl && !error && (
        <p className="download-panel__hint">
          {canResize
            ? 'Ready to resize. Click the button above when you\'re happy with your settings.'
            : 'Upload an image and choose a size to get started.'}
        </p>
      )}
    </div>
  );
}
