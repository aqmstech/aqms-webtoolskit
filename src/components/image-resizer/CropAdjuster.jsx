import { useRef, useState, useCallback, useEffect } from 'react';
import { calcDrawParams } from '../../utils/canvas';
import { Move, Check, RotateCcw } from 'lucide-react';
import './CropAdjuster.css';

/**
 * CropAdjuster
 * Post-output crop repositioning for Fill mode.
 * Shows the full source image with a draggable crop window overlay.
 *
 * Props:
 *   sourceImage   – HTMLImageElement (the loaded original)
 *   targetWidth   – output width in px
 *   targetHeight  – output height in px
 *   onApply       – (offsetX, offsetY) => void
 *   onCancel      – () => void
 */
export default function CropAdjuster({ sourceImage, targetWidth, targetHeight, onApply, onCancel }) {
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const imgW = sourceImage.naturalWidth;
  const imgH = sourceImage.naturalHeight;
  const imgRatio = imgW / imgH;
  const targetRatio = targetWidth / targetHeight;

  // Crop region size in source image pixels
  let cropW, cropH;
  if (imgRatio > targetRatio) {
    cropW = Math.round(imgH * targetRatio);
    cropH = imgH;
  } else {
    cropW = imgW;
    cropH = Math.round(imgW / targetRatio);
  }

  const maxOffsetX = imgW - cropW;
  const maxOffsetY = imgH - cropH;

  // Default = centered (same as the auto fill behavior)
  const defaultOffsetX = Math.round(maxOffsetX / 2);
  const defaultOffsetY = Math.round(maxOffsetY / 2);

  const [offsetX, setOffsetX] = useState(defaultOffsetX);
  const [offsetY, setOffsetY] = useState(defaultOffsetY);

  // Scale the source image to fit the container for display
  const MAX_DISPLAY_W = 560;
  const MAX_DISPLAY_H = 400;
  const displayScale = Math.min(MAX_DISPLAY_W / imgW, MAX_DISPLAY_H / imgH, 1);
  const displayW = Math.round(imgW * displayScale);
  const displayH = Math.round(imgH * displayScale);

  // Crop rect in display coordinates
  const cropDisplayX = offsetX * displayScale;
  const cropDisplayY = offsetY * displayScale;
  const cropDisplayW = cropW * displayScale;
  const cropDisplayH = cropH * displayScale;

  /* ── Pointer helpers ── */
  const getPointerPos = (e) => {
    if (e.touches && e.touches.length > 0) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const handlePointerDown = useCallback((e) => {
    e.preventDefault();
    isDragging.current = true;
    const pos = getPointerPos(e);
    dragStart.current = { x: pos.x, y: pos.y, startOffsetX: offsetX, startOffsetY: offsetY };
  }, [offsetX, offsetY]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const pos = getPointerPos(e);
    const dx = pos.x - dragStart.current.x;
    const dy = pos.y - dragStart.current.y;

    // Convert display-space delta to source-image-space delta
    const srcDx = dx / displayScale;
    const srcDy = dy / displayScale;

    const newX = Math.round(Math.max(0, Math.min(maxOffsetX, dragStart.current.startOffsetX + srcDx)));
    const newY = Math.round(Math.max(0, Math.min(maxOffsetY, dragStart.current.startOffsetY + srcDy)));

    setOffsetX(newX);
    setOffsetY(newY);
  }, [displayScale, maxOffsetX, maxOffsetY]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  /* ── Attach global listeners for drag ── */
  useEffect(() => {
    const onMove = (e) => handlePointerMove(e);
    const onUp = () => handlePointerUp();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  const handleReset = () => {
    setOffsetX(defaultOffsetX);
    setOffsetY(defaultOffsetY);
  };

  const handleApply = () => {
    onApply(offsetX, offsetY);
  };

  // Only allow dragging on the axis that has room
  const canDragX = maxOffsetX > 0;
  const canDragY = maxOffsetY > 0;
  const cursorClass = canDragX && canDragY ? 'crop-adjuster--grab-all'
    : canDragX ? 'crop-adjuster--grab-x'
    : 'crop-adjuster--grab-y';

  return (
    <div className="crop-adjuster" ref={containerRef}>
      <div className="crop-adjuster__header">
        <div className="crop-adjuster__title">
          <Move size={16} aria-hidden="true" />
          <span>Reposition Image</span>
        </div>
        <p className="crop-adjuster__hint">
          Drag to choose which area stays visible in the final output.
        </p>
      </div>

      {/* Canvas area */}
      <div
        className={`crop-adjuster__canvas ${cursorClass}`}
        style={{ width: displayW, height: displayH }}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        role="application"
        aria-label="Drag to reposition crop area"
        tabIndex={0}
      >
        {/* Source image (dimmed) */}
        <img
          src={sourceImage.src}
          alt=""
          className="crop-adjuster__source"
          style={{ width: displayW, height: displayH }}
          draggable={false}
        />

        {/* Dim overlay — 4 rectangles around the crop area */}
        <div className="crop-adjuster__dim crop-adjuster__dim--top"
          style={{ width: displayW, height: cropDisplayY }} />
        <div className="crop-adjuster__dim crop-adjuster__dim--bottom"
          style={{ width: displayW, height: displayH - cropDisplayY - cropDisplayH, top: cropDisplayY + cropDisplayH }} />
        <div className="crop-adjuster__dim crop-adjuster__dim--left"
          style={{ width: cropDisplayX, height: cropDisplayH, top: cropDisplayY }} />
        <div className="crop-adjuster__dim crop-adjuster__dim--right"
          style={{ width: displayW - cropDisplayX - cropDisplayW, height: cropDisplayH, top: cropDisplayY, left: cropDisplayX + cropDisplayW }} />

        {/* Crop window border */}
        <div
          className="crop-adjuster__crop-rect"
          style={{
            left: cropDisplayX,
            top: cropDisplayY,
            width: cropDisplayW,
            height: cropDisplayH,
          }}
        >
          {/* Corner handles */}
          <span className="crop-adjuster__corner crop-adjuster__corner--tl" />
          <span className="crop-adjuster__corner crop-adjuster__corner--tr" />
          <span className="crop-adjuster__corner crop-adjuster__corner--bl" />
          <span className="crop-adjuster__corner crop-adjuster__corner--br" />
        </div>
      </div>

      {/* Actions */}
      <div className="crop-adjuster__actions">
        <button className="btn btn--primary" onClick={handleApply} id="btn-apply-crop">
          <Check size={16} />
          Apply
        </button>
        <button className="btn btn--outline" onClick={handleReset} id="btn-reset-crop">
          <RotateCcw size={16} />
          Reset Position
        </button>
        <button className="btn btn--ghost" onClick={onCancel} id="btn-cancel-crop">
          Cancel
        </button>
      </div>
    </div>
  );
}
