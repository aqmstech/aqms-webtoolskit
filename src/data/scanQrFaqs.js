export const SCAN_QR_FAQS = [
  {
    question: 'How do I scan a QR code from a screenshot on my own phone?',
    answer: 'First, take a screenshot of the screen displaying the QR code. Next, open this page in your mobile browser, upload the screenshot file, and the tool will automatically scan and show the results.',
  },
  {
    question: 'Is it safe to upload my screenshots here?',
    answer: 'Yes, it is completely secure. We use client-side JavaScript (jsQR) to decode the image locally on your device. The image file is never uploaded to any remote server.',
  },
  {
    question: 'Can this tool read multiple QR codes from a single image?',
    answer: 'Yes, it can. Our tool uses an advanced masking loop that detects a QR code, captures its details, erases it from the image data, and runs the scanner again until all QR codes are found.',
  },
  {
    question: 'What types of QR codes can this reader decode?',
    answer: 'It decodes all standard QR code content, including website URLs, email addresses, phone numbers, WiFi settings, and plain text formats.',
  },
  {
    question: 'What should I do if my QR code is not detected?',
    answer: 'Make sure the image is clear and not blurry. If the QR code is very small or surrounded by lots of busy content, try cropping the screenshot around the QR code before uploading.',
  }
];
