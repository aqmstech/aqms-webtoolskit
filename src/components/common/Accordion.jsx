import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Accordion.css';

/**
 * Accordion — Reusable FAQ-style expand/collapse.
 * @param {Array<{question: string, answer: string}>} items
 */
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="accordion" role="list">
      {items.map(({ question, answer }, i) => {
        const isOpen = openIndex === i;
        return (
          <div className={`accordion__item ${isOpen ? 'accordion__item--open' : ''}`} role="listitem" key={i}>
            <button
              className="accordion__trigger"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${i}`}
              id={`accordion-btn-${i}`}
            >
              <span className="accordion__question">{question}</span>
              <span className={`accordion__icon ${isOpen ? 'accordion__icon--open' : ''}`} aria-hidden="true">
                <ChevronDown size={18} />
              </span>
            </button>
            <div
              className={`accordion__panel ${isOpen ? 'accordion__panel--open' : ''}`}
              id={`accordion-panel-${i}`}
              role="region"
              aria-labelledby={`accordion-btn-${i}`}
            >
              <div className="accordion__answer">{answer}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
