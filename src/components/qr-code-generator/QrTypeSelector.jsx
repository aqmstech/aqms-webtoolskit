import { QR_TYPES } from '../../data/qrTypes';
import * as LucideIcons from 'lucide-react';
import './QrTypeSelector.css';

/**
 * QrTypeSelector — Horizontal scrollable pill buttons for choosing QR content type.
 */
export default function QrTypeSelector({ selectedType, onTypeSelect }) {
  return (
    <div className="qr-type-selector" role="radiogroup" aria-label="QR code content type">
      <div className="qr-type-selector__track">
        {QR_TYPES.map((qrType) => {
          const Icon = LucideIcons[qrType.icon];
          const isActive = selectedType === qrType.id;

          return (
            <button
              key={qrType.id}
              className={`qr-type-pill ${isActive ? 'qr-type-pill--active' : ''}`}
              role="radio"
              aria-checked={isActive}
              onClick={() => onTypeSelect(qrType.id)}
              id={`qr-type-${qrType.id}`}
            >
              {Icon && <Icon size={16} aria-hidden="true" />}
              <span>{qrType.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
