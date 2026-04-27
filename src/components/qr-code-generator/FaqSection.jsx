import Accordion from '../common/Accordion';
import { getFaqSchema } from '../../utils/seo';
import { Helmet } from 'react-helmet-async';
import './FaqSection.css';

const FAQS = [
  {
    question: 'What types of QR codes can I create?',
    answer:
      'This tool supports 8 content types: Website URL, Plain Text, Phone Number, Email, SMS, WhatsApp, WiFi Credentials, and Contact Card (vCard). Each type formats the data so scanning devices handle it correctly — for example, a phone number QR code will prompt the scanner to dial, and a WiFi code will connect automatically.',
  },
  {
    question: 'How do I create a QR code for a website URL?',
    answer:
      'Select "URL" as your content type, paste your full website address (including https://), and click Generate QR Code. The resulting code can be scanned by any smartphone camera to open the link directly in a browser.',
  },
  {
    question: 'Can I generate a WiFi QR code?',
    answer:
      'Yes. Select "WiFi" as the content type, enter your network name (SSID), password, and encryption type (WPA/WPA2 is most common). The generated QR code lets anyone scan and connect to your WiFi instantly without typing the password.',
  },
  {
    question: 'What download formats are available?',
    answer:
      'You can download your QR code as PNG (best for digital use and web), SVG (best for print — scales to any size without quality loss), or JPG (best for maximum compatibility). Choose your preferred format in the customization panel.',
  },
  {
    question: 'Can I customize the colors of my QR code?',
    answer:
      'Yes. Open the "Customize Appearance" panel to change the foreground color (the dark squares), background color, or set a transparent background. You can also adjust the size, margin, error correction level, and download format.',
  },
  {
    question: 'Is my data sent to a server?',
    answer:
      'No. All QR code generation happens entirely in your browser using JavaScript. Your data — URLs, phone numbers, WiFi passwords, contact details — is never transmitted to any server. This makes the tool completely private.',
  },
  {
    question: 'What is QR code error correction?',
    answer:
      'Error correction adds redundant data to the QR code so it can still be read even if part of it is damaged or obscured. There are four levels: Low (7%), Medium (15%), Quartile (25%), and High (30%). Higher levels make the QR code denser but more resilient. Medium is the default and works well for most uses.',
  },
  {
    question: 'Can I use these QR codes commercially?',
    answer:
      'Yes. The QR codes you generate are yours to use however you like — on business cards, product packaging, marketing materials, menus, or any other purpose. There are no usage restrictions, watermarks, or expiration dates.',
  },
];

export default function FaqSection() {
  const schema = getFaqSchema(FAQS);

  return (
    <section className="faq-section" aria-labelledby="qr-faq-heading">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <h2 className="section-heading" id="qr-faq-heading">
        Frequently Asked Questions
      </h2>
      <p className="section-subheading" style={{ marginBottom: 'var(--space-8)' }}>
        Everything you need to know about creating QR codes online.
      </p>

      <Accordion items={FAQS} />
    </section>
  );
}
