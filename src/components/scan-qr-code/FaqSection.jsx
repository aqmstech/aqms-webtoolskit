import Accordion from '../common/Accordion';
import { SCAN_QR_FAQS } from '../../data/scanQrFaqs';

export default function FaqSection() {
  return (
    <section className="faq-section" style={{ marginTop: 'var(--space-10)' }} aria-label="Frequently Asked Questions">
      <h2 className="section-heading" style={{ fontSize: 'var(--font-size-2xl)', color: 'var(--color-text)' }}>
        Frequently Asked Questions
      </h2>
      <Accordion items={SCAN_QR_FAQS} />
    </section>
  );
}
