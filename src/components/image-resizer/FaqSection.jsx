import Accordion from '../common/Accordion';
import { getFaqSchema } from '../../utils/seo';
import { Helmet } from 'react-helmet-async';
import './FaqSection.css';

const FAQS = [
  {
    question: 'What is the best image size for a Facebook post?',
    answer:
      'The recommended size for a Facebook post image is 1200×630 pixels (roughly 1.91:1 aspect ratio). This size displays well on both desktop and mobile feeds. Our tool includes this as a one-click preset under Social Media.',
  },
  {
    question: 'How do I resize an image for Instagram?',
    answer:
      'Instagram supports several formats: Square posts at 1080×1080px, Portrait posts at 1080×1350px, and Stories at 1080×1920px. Select the preset that matches your post type, upload your image, and download the resized version.',
  },
  {
    question: 'What is the correct image size for a LinkedIn post?',
    answer:
      'LinkedIn recommends 1200×627px for shared post images, and 1584×396px for your profile banner/cover photo. Both are available as one-click presets in this tool.',
  },
  {
    question: 'How do I resize a YouTube thumbnail?',
    answer:
      'YouTube thumbnails should be 1280×720 pixels (16:9 aspect ratio). Select the "YouTube Thumbnail" preset, upload your image, choose your resize mode, and download.',
  },
  {
    question: 'Can I resize an image without losing quality?',
    answer:
      'Enlarging an image beyond its original resolution will always reduce sharpness — this is a fundamental limitation of raster images. However, scaling down or resizing to similar dimensions preserves quality well. Use the quality slider to control JPG/WEBP compression, and choose PNG for lossless output.',
  },
  {
    question: 'Is my image uploaded to a server?',
    answer:
      'No. All image processing happens entirely within your browser using the HTML5 Canvas API. Your images are never sent to any server. This makes the tool completely private and works even without an internet connection after the page has loaded.',
  },
  {
    question: 'What image formats are supported?',
    answer:
      'You can upload JPG, PNG, and WEBP images up to 64 MB. You can export in any of those three formats, or choose "Original" to keep the same format as your upload.',
  },
  {
    question: 'What is the difference between Fit, Fill, and Stretch?',
    answer:
      'Fit scales your image to fit within the target dimensions while keeping the aspect ratio — empty areas are filled with your chosen background color. Fill scales the image to cover the full target area (cropping overflow) while keeping the aspect ratio. Stretch forces the image to exactly match the target dimensions, which may distort the image.',
  },
];

export default function FaqSection() {
  const schema = getFaqSchema(FAQS);

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      <h2 className="section-heading" id="faq-heading">
        Frequently Asked Questions
      </h2>
      <p className="section-subheading" style={{ marginBottom: 'var(--space-8)' }}>
        Everything you need to know about resizing images online.
      </p>

      <Accordion items={FAQS} />
    </section>
  );
}
