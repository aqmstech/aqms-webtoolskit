import { QR_TYPE_MAP } from '../../data/qrTypes';
import './QrInputForm.css';

/**
 * QrInputForm — Dynamic form fields based on the selected QR type.
 */
export default function QrInputForm({ selectedType, fieldValues, onChange, error }) {
  const typeConfig = QR_TYPE_MAP[selectedType];
  if (!typeConfig) return null;

  const handleFieldChange = (fieldName, value) => {
    onChange({ ...fieldValues, [fieldName]: value });
  };

  return (
    <div className="qr-input-form">
      <div className="qr-input-form__fields">
        {typeConfig.fields.map((field) => (
          <div
            className={`qr-field ${field.type === 'checkbox' ? 'qr-field--checkbox' : ''}`}
            key={field.name}
          >
            {field.type === 'checkbox' ? (
              <label className="qr-field__checkbox-label">
                <input
                  type="checkbox"
                  checked={!!fieldValues[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.checked)}
                  id={`qr-field-${field.name}`}
                />
                <span>{field.label}</span>
              </label>
            ) : (
              <>
                <label className="qr-field__label" htmlFor={`qr-field-${field.name}`}>
                  {field.label}
                  {field.required && <span className="qr-field__req" aria-label="required">*</span>}
                </label>

                {field.type === 'textarea' ? (
                  <textarea
                    id={`qr-field-${field.name}`}
                    className="qr-field__input qr-field__textarea"
                    placeholder={field.placeholder}
                    value={fieldValues[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    rows={3}
                    required={field.required}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={`qr-field-${field.name}`}
                    className="qr-field__input qr-field__select"
                    value={fieldValues[field.name] || field.options?.[0]?.value || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`qr-field-${field.name}`}
                    className="qr-field__input"
                    type={field.type}
                    placeholder={field.placeholder}
                    value={fieldValues[field.name] || ''}
                    onChange={(e) => handleFieldChange(field.name, e.target.value)}
                    required={field.required}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="qr-input-form__error" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
    </div>
  );
}
