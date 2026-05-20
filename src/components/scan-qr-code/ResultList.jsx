import { useState } from 'react';
import { ExternalLink, Copy, Check, Mail, Phone, Wifi, FileText } from 'lucide-react';

/**
 * ResultList — Renders the cards of all detected QR code contents.
 * Provides helper actions depending on the content type.
 */
export default function ResultList({ results }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(index);
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    });
  };

  const getCleanUrl = (url) => {
    if (/^https?:\/\//i.test(url)) {
      return url;
    }
    return `https://${url}`;
  };

  const getCleanEmail = (email) => {
    if (/^mailto:/i.test(email)) {
      return email;
    }
    return `mailto:${email}`;
  };

  const getCleanPhone = (phone) => {
    if (/^tel:/i.test(phone)) {
      return phone;
    }
    // Remove formatting spaces, parens, hyphens
    const num = phone.replace(/[\s\-()]/g, '');
    return `tel:${num}`;
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'URL':
        return <ExternalLink size={16} />;
      case 'Email':
        return <Mail size={16} />;
      case 'Phone':
        return <Phone size={16} />;
      case 'WiFi':
        return <Wifi size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const getTypeBadgeClass = (type) => {
    switch (type) {
      case 'URL':
        return 'badge--primary';
      case 'Email':
      case 'Phone':
        return 'badge--accent';
      default:
        return 'badge--primary';
    }
  };

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="scanner-results">
      <h3 className="scanner-results__title">
        <span>Detected QR Codes</span>
        <span className="badge badge--primary">{results.length} found</span>
      </h3>

      <div className="scanner-results__grid">
        {results.map((result, idx) => {
          const type = result.type;
          const content = result.data;
          const isCopied = copiedId === idx;

          return (
            <div key={idx} className="result-card">
              <div className="result-card__header">
                <div className="result-card__badge-num" title={`QR Code #${idx + 1}`}>
                  {idx + 1}
                </div>
                <span className={`badge ${getTypeBadgeClass(type)}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {getTypeIcon(type)}
                  <span>{type}</span>
                </span>
              </div>

              <div className="result-card__content-wrap">
                <div className="result-card__label">Decoded Content</div>
                <pre className="result-card__text">{content}</pre>
              </div>

              <div className="result-card__actions">
                {/* Contextual Primary Action */}
                {type === 'URL' && (
                  <a
                    href={getCleanUrl(content)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary btn--sm"
                  >
                    <ExternalLink size={14} />
                    <span>Open Link</span>
                  </a>
                )}

                {type === 'Email' && (
                  <a href={getCleanEmail(content)} className="btn btn--accent btn--sm">
                    <Mail size={14} />
                    <span>Send Email</span>
                  </a>
                )}

                {type === 'Phone' && (
                  <a href={getCleanPhone(content)} className="btn btn--accent btn--sm">
                    <Phone size={14} />
                    <span>Call Phone</span>
                  </a>
                )}

                {/* Secondary Copy Action */}
                <button
                  className={`btn ${type === 'URL' || type === 'Email' || type === 'Phone' ? 'btn--outline' : 'btn--primary'} btn--sm`}
                  onClick={() => handleCopy(content, idx)}
                >
                  {isCopied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{isCopied ? 'Copied!' : `Copy ${type === 'URL' ? 'Link' : 'Text'}`}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
