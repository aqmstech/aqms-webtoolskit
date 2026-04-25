import { formatBytes } from '../../utils/formatBytes';
import './ImagePreview.css';

export default function ImagePreview({
  originalFile,
  originalPreview,
  resizedUrl,
  resizedSize,
  resizedDims,
  isProcessing,
}) {
  if (!originalPreview) return null;

  return (
    <section className="image-preview" aria-label="Image preview">
      <h2 className="image-preview__heading">Preview</h2>

      <div className="image-preview__grid">
        {/* Original */}
        <div className="preview-panel">
          <div className="preview-panel__header">
            <span className="preview-panel__badge">Original</span>
          </div>
          <div className="preview-panel__image-wrap checkerboard">
            <img
              src={originalPreview}
              alt="Original uploaded image"
              className="preview-panel__image"
            />
          </div>
          {originalFile && (
            <div className="preview-panel__meta">
              <span>{originalFile.type.replace('image/', '').toUpperCase()}</span>
              <span>·</span>
              <span>{formatBytes(originalFile.size)}</span>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="preview-separator" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>

        {/* Resized */}
        <div className="preview-panel">
          <div className="preview-panel__header">
            <span className={`preview-panel__badge preview-panel__badge--resized ${resizedUrl ? 'preview-panel__badge--ready' : ''}`}>
              {isProcessing ? 'Processing…' : resizedUrl ? 'Resized' : 'Resized output'}
            </span>
          </div>
          <div className="preview-panel__image-wrap checkerboard">
            {isProcessing && (
              <div className="preview-processing" aria-live="assertive" aria-label="Processing image">
                <div className="preview-spinner" aria-hidden="true" />
                <span>Resizing…</span>
              </div>
            )}
            {!isProcessing && resizedUrl && (
              <img
                src={resizedUrl}
                alt={`Resized image — ${resizedDims?.width}×${resizedDims?.height}px`}
                className="preview-panel__image"
              />
            )}
            {!isProcessing && !resizedUrl && (
              <div className="preview-placeholder">
                <p>Your resized image will appear here</p>
              </div>
            )}
          </div>
          {resizedDims && resizedUrl && (
            <div className="preview-panel__meta">
              <span>{resizedDims.width}×{resizedDims.height}px</span>
              {resizedSize && (
                <>
                  <span>·</span>
                  <span>{formatBytes(resizedSize)}</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
