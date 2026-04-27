/**
 * qrTypes.js
 * Defines all supported QR code content types.
 * Each type specifies its label, icon name (lucide-react), input fields, and encoder key.
 * To add a new type: just append an entry here and add its encoder in qrEncoders.js.
 */

export const QR_TYPES = [
  {
    id: 'url',
    label: 'URL',
    icon: 'Link',
    encoder: 'encodeUrl',
    fields: [
      { name: 'url', label: 'Website URL', type: 'url', placeholder: 'https://example.com', required: true },
    ],
  },
  {
    id: 'text',
    label: 'Text',
    icon: 'Type',
    encoder: 'encodeText',
    fields: [
      { name: 'text', label: 'Text Content', type: 'textarea', placeholder: 'Enter any text...', required: true },
    ],
  },
  {
    id: 'phone',
    label: 'Phone',
    icon: 'Phone',
    encoder: 'encodePhone',
    fields: [
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 555 123 4567', required: true },
    ],
  },
  {
    id: 'email',
    label: 'Email',
    icon: 'Mail',
    encoder: 'encodeEmail',
    fields: [
      { name: 'to', label: 'Email Address', type: 'email', placeholder: 'hello@example.com', required: true },
      { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Optional subject line', required: false },
      { name: 'body', label: 'Message Body', type: 'textarea', placeholder: 'Optional message...', required: false },
    ],
  },
  {
    id: 'sms',
    label: 'SMS',
    icon: 'MessageSquare',
    encoder: 'encodeSms',
    fields: [
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 555 123 4567', required: true },
      { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Optional message...', required: false },
    ],
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: 'MessageCircle',
    encoder: 'encodeWhatsApp',
    fields: [
      { name: 'phone', label: 'Phone Number (with country code)', type: 'tel', placeholder: '+1 555 123 4567', required: true },
      { name: 'message', label: 'Pre-filled Message', type: 'textarea', placeholder: 'Optional message...', required: false },
    ],
  },
  {
    id: 'wifi',
    label: 'WiFi',
    icon: 'Wifi',
    encoder: 'encodeWifi',
    fields: [
      { name: 'ssid', label: 'Network Name (SSID)', type: 'text', placeholder: 'My WiFi Network', required: true },
      { name: 'password', label: 'Password', type: 'password', placeholder: 'WiFi password', required: false },
      {
        name: 'encryption',
        label: 'Encryption',
        type: 'select',
        options: [
          { value: 'WPA', label: 'WPA / WPA2 / WPA3' },
          { value: 'WEP', label: 'WEP' },
          { value: 'nopass', label: 'None (Open)' },
        ],
        required: false,
      },
      { name: 'hidden', label: 'Hidden Network', type: 'checkbox', required: false },
    ],
  },
  {
    id: 'vcard',
    label: 'Contact',
    icon: 'Contact',
    encoder: 'encodeVCard',
    fields: [
      { name: 'firstName', label: 'First Name', type: 'text', placeholder: 'John', required: true },
      { name: 'lastName', label: 'Last Name', type: 'text', placeholder: 'Doe', required: false },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+1 555 123 4567', required: false },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com', required: false },
      { name: 'organization', label: 'Company / Organization', type: 'text', placeholder: 'Acme Inc.', required: false },
      { name: 'title', label: 'Job Title', type: 'text', placeholder: 'Marketing Manager', required: false },
      { name: 'url', label: 'Website', type: 'url', placeholder: 'https://example.com', required: false },
      { name: 'note', label: 'Note', type: 'textarea', placeholder: 'Additional notes...', required: false },
    ],
  },
];

/** Quick lookup by type id */
export const QR_TYPE_MAP = Object.fromEntries(QR_TYPES.map((t) => [t.id, t]));
