import { useRef } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';
import { formatBytes } from '../../utils/formatBytes';
import './FileUploader.css';

/**
 * FileUploader — Reusable drag-and-drop + button upload component.
 * Used by Image Resizer; designed for reuse in Image Compressor, Format Converter, etc.
 */
export default function FileUploader({
  file,
  preview,
  error,
  isDragging,
  onSelect,
  onDrop,
  onDragOver,
  onDragLeave,
  onClear,
}) {
  const inputRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  if (file && preview) {
    return (
      <div className="file-uploader file-uploader--preview">
        <div className="file-uploader__thumb-wrap">
          <img src={preview} alt={`Preview of ${file.name}`} className="file-uploader__thumb" />
        </div>
        <div className="file-uploader__file-info">
          <div className="file-uploader__file-name">{file.name}</div>
          <div className="file-uploader__file-meta">
            {file.type.replace('image/', '').toUpperCase()} &bull; {formatBytes(file.size)}
          </div>
        </div>
        <button
          className="btn btn--ghost btn--icon file-uploader__remove"
          onClick={onClear}
          aria-label="Remove image"
          title="Remove image"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`file-uploader file-uploader--dropzone ${isDragging ? 'file-uploader--dragging' : ''} ${error ? 'file-uploader--error' : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onClick={() => inputRef.current?.click()}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Upload image — drag and drop or click to browse"
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onSelect}
        className="sr-only"
        aria-label="Choose image file"
        id="file-input"
      />

      <div className="file-uploader__icon">
        {isDragging ? <ImageIcon size={36} /> : <Upload size={36} />}
      </div>

      <div className="file-uploader__text">
        <p className="file-uploader__primary">
          {isDragging ? 'Drop your image here' : 'Drag & drop your image here'}
        </p>
        <p className="file-uploader__secondary">or click to browse your files</p>
      </div>

      <button
        className="btn btn--outline"
        onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
        type="button"
        tabIndex={-1}
      >
        Choose File
      </button>

      <p className="file-uploader__formats">Supports JPG, PNG, WEBP &bull; Max 64 MB</p>

      {error && (
        <p className="file-uploader__error" role="alert" aria-live="assertive">
          {error}
        </p>
      )}
    </div>
  );
}
