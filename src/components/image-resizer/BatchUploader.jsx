import { useRef, useCallback, useState } from 'react';
import { Upload, ImageIcon, X, Images } from 'lucide-react';
import { formatBytes } from '../../utils/formatBytes';
import './BatchUploader.css';

/**
 * BatchUploader — Multi-file upload zone for batch resizing.
 */
export default function BatchUploader({
  files,
  maxFiles,
  error,
  onAddFiles,
  onRemoveFile,
  onClearAll,
  disabled,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSelect = useCallback((e) => {
    if (e.target.files?.length) {
      onAddFiles(e.target.files);
      e.target.value = '';
    }
  }, [onAddFiles]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.length) {
      onAddFiles(e.dataTransfer.files);
    }
  }, [onAddFiles]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="batch-uploader">
      {/* Drop zone */}
      <div
        className={`batch-uploader__dropzone ${isDragging ? 'batch-uploader__dropzone--dragging' : ''} ${disabled ? 'batch-uploader__dropzone--disabled' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload images — drag and drop or click to browse"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={handleSelect}
          className="sr-only"
          aria-label="Choose image files"
          id="batch-file-input"
          disabled={disabled}
        />

        <div className="batch-uploader__icon">
          {isDragging ? <ImageIcon size={32} /> : <Upload size={32} />}
        </div>

        <div className="batch-uploader__text">
          <p className="batch-uploader__primary">
            {files.length > 0 ? 'Add more images' : 'Drag & drop images here'}
          </p>
          <p className="batch-uploader__secondary">
            or click to browse • up to {maxFiles} images
          </p>
        </div>

        <p className="batch-uploader__formats">JPG, PNG, WEBP • Max 64 MB each</p>
      </div>

      {/* Error */}
      {error && (
        <p className="batch-uploader__error" role="alert">{error}</p>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="batch-uploader__list">
          <div className="batch-uploader__list-header">
            <span className="batch-uploader__count">
              <Images size={14} />
              {files.length} image{files.length !== 1 ? 's' : ''} selected
            </span>
            <button
              className="btn btn--ghost btn--sm"
              onClick={onClearAll}
              type="button"
              aria-label="Remove all images"
            >
              Clear All
            </button>
          </div>

          <ul className="batch-uploader__files" role="list">
            {files.map((item) => (
              <li key={item.id} className="batch-file-item">
                <div className="batch-file-item__thumb-wrap">
                  <img src={item.preview} alt="" className="batch-file-item__thumb" />
                </div>
                <div className="batch-file-item__info">
                  <span className="batch-file-item__name">{item.file.name}</span>
                  <span className="batch-file-item__meta">
                    {item.file.type.replace('image/', '').toUpperCase()} • {formatBytes(item.file.size)}
                  </span>
                </div>
                <button
                  className="btn btn--ghost btn--icon batch-file-item__remove"
                  onClick={() => onRemoveFile(item.id)}
                  aria-label={`Remove ${item.file.name}`}
                  type="button"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
