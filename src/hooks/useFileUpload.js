import { useState, useCallback, useRef } from 'react';

const MAX_FILE_SIZE = 64 * 1024 * 1024; // 64 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * useFileUpload
 * Manages drag-and-drop and file input upload with validation.
 * Reusable across any file-based tool on this platform.
 */
export function useFileUpload() {
  const [file, setFile]         = useState(null);
  const [preview, setPreview]   = useState(null);
  const [error, setError]       = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const objectUrlRef = useRef(null);

  const validate = (f) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      return 'Unsupported format. Please upload a JPG, PNG, or WEBP image.';
    }
    if (f.size > MAX_FILE_SIZE) {
      return `File is too large. Maximum size is 64 MB (your file: ${(f.size / 1024 / 1024).toFixed(1)} MB).`;
    }
    return null;
  };

  const processFile = useCallback((f) => {
    const err = validate(f);
    if (err) {
      setError(err);
      return;
    }
    // Revoke previous object URL
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(f);
    objectUrlRef.current = url;
    setFile(f);
    setPreview(url);
    setError(null);
  }, []);

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

  const clear = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setFile(null);
    setPreview(null);
    setError(null);
    setIsDragging(false);
  }, []);

  return {
    file,
    preview,
    error,
    isDragging,
    handleSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    clear,
  };
}
