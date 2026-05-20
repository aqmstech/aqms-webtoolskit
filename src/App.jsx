import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import ImageResizerPage from './pages/ImageResizerPage';
import QrCodeGeneratorPage from './pages/QrCodeGeneratorPage';
import ScanQrCodePage from './pages/ScanQrCodePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfUsePage from './pages/TermsOfUsePage';
import ContactPage from './pages/ContactPage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';

/**
 * App — Root component.
 * Add new tool routes here as the platform expands.
 */
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<HomePage />} />
          <Route path="/image-resizer" element={<ImageResizerPage />} />
          <Route path="/qr-code-generator" element={<QrCodeGeneratorPage />} />
          <Route path="/scan-qr-code-from-image" element={<ScanQrCodePage />} />

          {/* Static pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Blog pages */}
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:postSlug" element={<BlogPostPage />} />

          {/* Future tool routes:
          <Route path="/image-compressor" element={<ImageCompressorPage />} />
          <Route path="/format-converter" element={<FormatConverterPage />} />
          <Route path="/accessibility-checker" element={<AccessibilityCheckerPage />} />
          */}

          {/* 404 fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
