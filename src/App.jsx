import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ImageResizerPage from './pages/ImageResizerPage';
import QrCodeGeneratorPage from './pages/QrCodeGeneratorPage';

/**
 * App — Root component.
 * Add new tool routes here as the platform expands.
 */
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Primary tool — redirect root to image resizer for now */}
          <Route path="/" element={<Navigate to="/image-resizer" replace />} />
          <Route path="/image-resizer" element={<ImageResizerPage />} />
          <Route path="/qr-code-generator" element={<QrCodeGeneratorPage />} />

          {/* Future tool routes:
          <Route path="/image-compressor" element={<ImageCompressorPage />} />
          <Route path="/format-converter" element={<FormatConverterPage />} />
          <Route path="/accessibility-checker" element={<AccessibilityCheckerPage />} />
          */}

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/image-resizer" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
