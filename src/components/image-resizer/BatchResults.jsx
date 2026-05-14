import { Download, Archive, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { formatBytes } from '../../utils/formatBytes';
import './BatchResults.css';

const STATUS_CONFIG = {
  pending:     { label: 'Pending',     icon: null,          className: '' },
  processing:  { label: 'Resizing…',   icon: Loader,        className: 'batch-result--processing' },
  done:        { label: 'Done',        icon: CheckCircle,   className: 'batch-result--done' },
  error:       { label: 'Failed',      icon: AlertCircle,   className: 'batch-result--error' },
};

/**
 * BatchResults — Shows per-file resize results with download controls.
 */
export default function BatchResults({
  files,
  isProcessing,
  progress,
  doneCount,
  allDone,
  onDownloadOne,
  onDownloadAll,
  onResizeAll,
  onResetResults,
  onClearAll,
  canResize,
}) {
  const hasAnyResults = files.some((f) => f.status === 'done' || f.status === 'error');

  return (
    <div className="batch-results">

      {/* Progress bar (during processing) */}
      {isProcessing && (
        <div className="batch-results__progress" aria-live="polite">
          <div className="batch-results__progress-text">
            Resizing {progress.done + 1} of {progress.total}…
          </div>
          <div className="batch-results__progress-bar">
            <div
              className="batch-results__progress-fill"
              style={{ width: `${progress.total ? (progress.done / progress.total) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Action bar */}
      <div className="batch-results__actions">
        {!hasAnyResults ? (
          <button
            className="btn btn--primary btn--lg"
            onClick={onResizeAll}
            disabled={!canResize || isProcessing}
            id="btn-resize-all"
            aria-busy={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="btn-spinner" aria-hidden="true" />
                Resizing…
              </>
            ) : (
              <>
                <Download size={18} />
                Resize All ({files.length} image{files.length !== 1 ? 's' : ''})
              </>
            )}
          </button>
        ) : (
          <>
            {doneCount > 0 && (
              <button
                className="btn btn--accent btn--lg"
                onClick={onDownloadAll}
                id="btn-download-all"
              >
                <Archive size={18} />
                Download All as ZIP ({doneCount})
              </button>
            )}
          </>
        )}

        <div className="batch-results__secondary">
          {hasAnyResults && (
            <button className="btn btn--outline" onClick={onResetResults} id="btn-batch-resize-again">
              Resize Again
            </button>
          )}
          <button className="btn btn--ghost" onClick={onClearAll} id="btn-batch-clear">
            Start Over
          </button>
        </div>
      </div>

      {/* Results grid */}
      {hasAnyResults && (
        <ul className="batch-results__grid" role="list">
          {files.map((item) => {
            const cfg = STATUS_CONFIG[item.status] || STATUS_CONFIG.pending;
            const StatusIcon = cfg.icon;

            return (
              <li key={item.id} className={`batch-result ${cfg.className}`}>
                <div className="batch-result__thumb-wrap">
                  <img
                    src={item.blobUrl || item.preview}
                    alt=""
                    className="batch-result__thumb"
                  />
                  {/* Status overlay */}
                  <div className="batch-result__status-badge">
                    {StatusIcon && <StatusIcon size={12} />}
                    <span>{cfg.label}</span>
                  </div>
                </div>

                <div className="batch-result__info">
                  <span className="batch-result__name" title={item.file.name}>
                    {item.file.name}
                  </span>
                  <span className="batch-result__meta">
                    {item.status === 'done' && item.size
                      ? formatBytes(item.size)
                      : item.status === 'error'
                        ? item.error || 'Failed'
                        : formatBytes(item.file.size)}
                  </span>
                </div>

                {item.status === 'done' && (
                  <button
                    className="btn btn--ghost btn--sm batch-result__download"
                    onClick={() => onDownloadOne(item.id)}
                    aria-label={`Download ${item.file.name}`}
                    type="button"
                  >
                    <Download size={14} />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {/* Hint when no results yet */}
      {!hasAnyResults && !isProcessing && files.length > 0 && (
        <p className="batch-results__hint">
          {canResize
            ? `Ready to resize ${files.length} image${files.length !== 1 ? 's' : ''}. Click the button above to start.`
            : 'Choose a target size to get started.'}
        </p>
      )}
    </div>
  );
}
