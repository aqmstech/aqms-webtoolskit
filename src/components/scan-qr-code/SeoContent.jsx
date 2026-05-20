export default function SeoContent() {
  return (
    <article className="seo-copy-container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-secondary)' }}>
      <h2 className="section-heading" style={{ color: 'var(--color-text)', marginBottom: '0' }}>
        How to Scan a QR Code Already on Your Screen
      </h2>
      
      <p>
        Have you ever received a QR code in an email, text message, social media post, or payment request on your phone? When a QR code is displayed on your screen, you cannot easily point your phone's camera at it to scan it. 
      </p>

      <p>
        Our free online <strong>QR Code Reader from Image</strong> solves this exact problem. Simply take a screenshot of your screen, upload it here, and our tool will automatically read, decode, and extract all the QR codes in the image. You can copy the links or text immediately with a single click.
      </p>

      <h3 style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
        Key Benefits of Client-Side Scanning
      </h3>
      
      <ul style={{ paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <li>
          <strong>100% Secure & Private:</strong> All QR code decoding is performed locally inside your web browser. The image is never sent to our servers, keeping your screenshots and personal information completely private.
        </li>
        <li>
          <strong>Detect Multiple QR Codes:</strong> Unlike basic scanners that only read the first QR code they find, our advanced detection loop identifies, highlights, and decodes every single QR code in your uploaded image.
        </li>
        <li>
          <strong>Smart Action Buttons:</strong> Based on the scanned payload, the tool displays matching actions. Open website links directly, send emails, make phone calls, or copy text with a single tap.
        </li>
        <li>
          <strong>Cross-Device Compatibility:</strong> Works flawlessly on iPhone, iPad, Android, Windows, Mac, and Linux. No apps or browser extensions to install.
        </li>
      </ul>

      <h3 style={{ color: 'var(--color-text)', fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-semibold)' }}>
        Common Scenarios for Scanning Screenshots
      </h3>
      
      <p>
        Here are some typical cases where scanning a QR code from a saved photo or screenshot is extremely helpful:
      </p>

      <ul style={{ paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        <li><strong>WiFi Configuration:</strong> Scan a screenshot of a friend's WiFi sharing QR code to copy the network name and password details.</li>
        <li><strong>Payment & Invoices:</strong> Scan QR codes on digital invoices, invoices in PDFs, or payment apps received via chat.</li>
        <li><strong>Event Tickets & Boarding Passes:</strong> Scan a ticket QR code from your gallery to view flight numbers or gate information.</li>
        <li><strong>Social Media Links:</strong> Scan business cards, WhatsApp contact codes, or Instagram tags shared as images.</li>
      </ul>
    </article>
  );
}
