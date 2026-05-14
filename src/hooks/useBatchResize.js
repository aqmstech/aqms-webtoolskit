import { useState, useCallback, useRef } from 'react';
import JSZip from 'jszip';
import { resizeImageToBlob, loadImage } from '../utils/canvas';
import { resolveFormat, mimeToExt } from '../utils/formatBytes';

const MAX_FILES = 20;
const MAX_FILE_SIZE = 64 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

let nextId = 0;

function validateFile(f) {
  if (!ACCEPTED_TYPES.includes(f.type)) {
    return 'Unsupported format. Only JPG, PNG, or WEBP.';
  }
  if (f.size > MAX_FILE_SIZE) {
    return `File too large (${(f.size / 1024 / 1024).toFixed(1)} MB). Max 64 MB.`;
  }
  return null;
}

/**
 * useBatchResize
 * Manages multi-file upload, sequential resize, and ZIP download.
 */
export function useBatchResize() {
  const [files, setFiles]             = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress]       = useState({ done: 0, total: 0 });
  const [error, setError]             = useState(null);
  const urlsRef = useRef([]);
  const abortRef = useRef(false);

  /* ── Add files ── */
  const addFiles = useCallback((fileList) => {
    setError(null);
    const incoming = Array.from(fileList);

    setFiles((prev) => {
      const remaining = MAX_FILES - prev.length;
      if (remaining <= 0) {
        setError(`Maximum ${MAX_FILES} images allowed.`);
        return prev;
      }

      const toAdd = incoming.slice(0, remaining);
      if (incoming.length > remaining) {
        setError(`Only ${remaining} more image${remaining === 1 ? '' : 's'} can be added (limit: ${MAX_FILES}).`);
      }

      const newEntries = [];
      for (const f of toAdd) {
        const validErr = validateFile(f);
        if (validErr) {
          // Skip invalid files but don't block valid ones
          continue;
        }
        const url = URL.createObjectURL(f);
        urlsRef.current.push(url);
        newEntries.push({
          id: ++nextId,
          file: f,
          preview: url,
          status: 'pending',  // pending | processing | done | error
          blob: null,
          blobUrl: null,
          size: null,
          error: null,
        });
      }

      if (newEntries.length === 0 && toAdd.length > 0) {
        setError('No valid images found. Supported formats: JPG, PNG, WEBP.');
      }

      return [...prev, ...newEntries];
    });
  }, []);

  /* ── Remove a file ── */
  const removeFile = useCallback((id) => {
    setFiles((prev) => {
      const item = prev.find((f) => f.id === id);
      if (item) {
        if (item.preview) URL.revokeObjectURL(item.preview);
        if (item.blobUrl) URL.revokeObjectURL(item.blobUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
    setError(null);
  }, []);

  /* ── Clear all ── */
  const clearAll = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((item) => {
        if (item.preview) URL.revokeObjectURL(item.preview);
        if (item.blobUrl) URL.revokeObjectURL(item.blobUrl);
      });
      return [];
    });
    urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    urlsRef.current = [];
    setProgress({ done: 0, total: 0 });
    setError(null);
    setIsProcessing(false);
    abortRef.current = false;
  }, []);

  /* ── Resize all ── */
  const resizeAll = useCallback(async (settings) => {
    setIsProcessing(true);
    setError(null);
    abortRef.current = false;

    // Mark all pending
    setFiles((prev) =>
      prev.map((f) => (f.status !== 'done' ? { ...f, status: 'pending', error: null } : f))
    );

    const total = files.filter((f) => f.status !== 'done').length;
    setProgress({ done: 0, total });

    let doneCount = 0;

    for (const item of files) {
      if (abortRef.current) break;
      if (item.status === 'done') continue;

      // Mark processing
      setFiles((prev) =>
        prev.map((f) => (f.id === item.id ? { ...f, status: 'processing' } : f))
      );

      try {
        const img = await loadImage(item.file);
        const format = resolveFormat(settings.format, item.file.type).replace('image/', '');
        const blob = await resizeImageToBlob(
          img,
          settings.width,
          settings.height,
          settings.mode,
          settings.bgColor,
          settings.circleCrop,
          format,
          settings.quality / 100
        );

        const blobUrl = URL.createObjectURL(blob);
        urlsRef.current.push(blobUrl);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: 'done', blob, blobUrl, size: blob.size, error: null }
              : f
          )
        );
      } catch (err) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === item.id
              ? { ...f, status: 'error', error: err.message || 'Resize failed' }
              : f
          )
        );
      }

      doneCount++;
      setProgress({ done: doneCount, total });
    }

    setIsProcessing(false);
  }, [files]);

  /* ── Download one ── */
  const downloadOne = useCallback((id, settings) => {
    const item = files.find((f) => f.id === id);
    if (!item?.blob || !item.blobUrl) return;

    const format = resolveFormat(settings.format, item.file.type).replace('image/', '');
    const ext = mimeToExt(`image/${format}`);
    const baseName = item.file.name.replace(/\.[^.]+$/, '');
    const fileName = `${baseName}-${settings.width}x${settings.height}.${ext}`;

    const a = document.createElement('a');
    a.href = item.blobUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [files]);

  /* ── Download all as ZIP ── */
  const downloadAll = useCallback(async (settings) => {
    const doneFiles = files.filter((f) => f.status === 'done' && f.blob);
    if (doneFiles.length === 0) return;

    const zip = new JSZip();
    const nameCount = {};

    for (const item of doneFiles) {
      const format = resolveFormat(settings.format, item.file.type).replace('image/', '');
      const ext = mimeToExt(`image/${format}`);
      const baseName = item.file.name.replace(/\.[^.]+$/, '');
      let fileName = `${baseName}-${settings.width}x${settings.height}.${ext}`;

      // Avoid duplicate names
      if (nameCount[fileName]) {
        nameCount[fileName]++;
        fileName = `${baseName}-${settings.width}x${settings.height}-(${nameCount[fileName]}).${ext}`;
      } else {
        nameCount[fileName] = 1;
      }

      zip.file(fileName, item.blob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(zipBlob);
    a.download = `resized-images-${settings.width}x${settings.height}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  }, [files]);

  /* ── Reset results (keep files) ── */
  const resetResults = useCallback(() => {
    setFiles((prev) =>
      prev.map((f) => {
        if (f.blobUrl) URL.revokeObjectURL(f.blobUrl);
        return { ...f, status: 'pending', blob: null, blobUrl: null, size: null, error: null };
      })
    );
    setProgress({ done: 0, total: 0 });
    setError(null);
    setIsProcessing(false);
  }, []);

  const doneCount = files.filter((f) => f.status === 'done').length;
  const hasResults = doneCount > 0;
  const allDone = files.length > 0 && doneCount === files.length;

  return {
    files,
    isProcessing,
    progress,
    error,
    doneCount,
    hasResults,
    allDone,
    addFiles,
    removeFile,
    clearAll,
    resizeAll,
    downloadOne,
    downloadAll,
    resetResults,
    MAX_FILES,
  };
}
