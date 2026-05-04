import { useState, useCallback, useRef } from 'react';
import { resizeImageToBlob, resizeImageToBlobWithOffset, loadImage } from '../utils/canvas';
import { resolveFormat, mimeToExt } from '../utils/formatBytes';

/**
 * useImageResize
 * Manages the full resize pipeline: load → process → preview → download.
 */
export function useImageResize() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [resizedBlob, setResizedBlob]   = useState(null);
  const [resizedUrl, setResizedUrl]     = useState(null);
  const [resizedSize, setResizedSize]   = useState(null);
  const [resizedDims, setResizedDims]   = useState(null);
  const [error, setError]               = useState(null);
  const urlRef = useRef(null);
  const sourceImageRef = useRef(null);

  const resize = useCallback(async (file, settings) => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setResizedBlob(null);
    setResizedUrl(null);

    try {
      const img    = await loadImage(file);
      sourceImageRef.current = img;
      const format = resolveFormat(settings.format, file.type).replace('image/', '');
      const blob   = await resizeImageToBlob(
        img,
        settings.width,
        settings.height,
        settings.mode,
        settings.bgColor,
        settings.circleCrop,
        format,
        settings.quality / 100
      );

      // Revoke previous URL
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      const url = URL.createObjectURL(blob);
      urlRef.current = url;

      setResizedBlob(blob);
      setResizedUrl(url);
      setResizedSize(blob.size);
      setResizedDims({ width: settings.width, height: settings.height });
    } catch (err) {
      setError(err.message || 'Resize failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  /**
   * Re-render a Fill-mode resize with a custom crop offset.
   * Uses the already-loaded source image to avoid reloading.
   */
  const reRenderFill = useCallback(async (file, settings, offsetX, offsetY) => {
    const img = sourceImageRef.current;
    if (!img || !file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const format = resolveFormat(settings.format, file.type).replace('image/', '');
      const blob = await resizeImageToBlobWithOffset(
        img,
        settings.width,
        settings.height,
        offsetX,
        offsetY,
        settings.circleCrop,
        format,
        settings.quality / 100,
        settings.bgColor
      );

      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      const url = URL.createObjectURL(blob);
      urlRef.current = url;

      setResizedBlob(blob);
      setResizedUrl(url);
      setResizedSize(blob.size);
      setResizedDims({ width: settings.width, height: settings.height });
    } catch (err) {
      setError(err.message || 'Crop adjustment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const download = useCallback((file, settings) => {
    if (!resizedBlob) return;
    const format   = resolveFormat(settings.format, file?.type).replace('image/', '');
    const ext      = mimeToExt(`image/${format}`);
    const baseName = file?.name.replace(/\.[^.]+$/, '') || 'resized';
    const fileName = `${baseName}-${settings.width}x${settings.height}.${ext}`;
    const a        = document.createElement('a');
    a.href         = urlRef.current;
    a.download     = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [resizedBlob]);

  const reset = useCallback(() => {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    sourceImageRef.current = null;
    setResizedBlob(null);
    setResizedUrl(null);
    setResizedSize(null);
    setResizedDims(null);
    setError(null);
    setIsProcessing(false);
  }, []);

  return {
    isProcessing,
    resizedBlob,
    resizedUrl,
    resizedSize,
    resizedDims,
    error,
    resize,
    reRenderFill,
    download,
    reset,
    sourceImage: sourceImageRef,
  };
}
