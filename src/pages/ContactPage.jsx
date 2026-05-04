import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send } from 'lucide-react';
import { getBreadcrumbSchema } from '../utils/seo';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import '../styles/pages/static-page.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://aqmswebtoolkit.com/' },
    { name: 'Contact Us', url: 'https://aqmswebtoolkit.com/contact' },
  ]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setStatusMessage('Thank you for reaching out. Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.message || 'Something went wrong while sending your message. Please try again or email us at aqmstech@gmail.com.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Something went wrong while sending your message. Please try again or email us at aqmstech@gmail.com.');
    }
  }, [formData]);

  return (
    <>
      <Helmet>
        <title>Contact Us | AQMS Web Toolkit</title>
        <meta
          name="description"
          content="Contact AQMS Web Toolkit for support, feedback, business inquiries, or questions about our online tools."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aqmswebtoolkit.com/contact" />
        <meta property="og:title" content="Contact Us | AQMS Web Toolkit" />
        <meta property="og:description" content="Contact AQMS Web Toolkit for support, feedback, business inquiries, or questions about our online tools." />
        <meta property="og:url" content="https://aqmswebtoolkit.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AQMS Web Toolkit" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us | AQMS Web Toolkit" />
        <meta name="twitter:description" content="Contact AQMS Web Toolkit for support, feedback, or questions about our online tools." />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="page-layout">
        <Header />

        <main className="page-main" id="main-content">
          <div className="static-page container">
            <div className="static-page__inner">

              <header className="static-page__header">
                <h1 className="static-page__h1">Contact Us</h1>
                <p className="contact-intro">
                  Have a question, found an issue, or want to suggest a new tool? We&rsquo;d love to hear from you.
                </p>
                <p className="contact-email-block">
                  For support, feedback, or business inquiries, email us at:
                </p>
                <p>
                  <a href="mailto:aqmstech@gmail.com" className="static-email">aqmstech@gmail.com</a>
                </p>
                <p className="contact-or">
                  Or use the contact form below and we&rsquo;ll get back to you as soon as possible.
                </p>
              </header>

              {/* Contact Form */}
              <div className="contact-form-wrap">
                <form className="contact-form" onSubmit={handleSubmit} noValidate>

                  {/* Honeypot field — hidden from real users */}
                  <div className="form-hp" aria-hidden="true">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-field__label" htmlFor="contact-name">Name</label>
                    <input
                      className="form-field__input"
                      type="text"
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-field__label" htmlFor="contact-email">Email</label>
                    <input
                      className="form-field__input"
                      type="email"
                      id="contact-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-field__label" htmlFor="contact-subject">Subject</label>
                    <input
                      className="form-field__input"
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this about?"
                    />
                  </div>

                  <div className="form-field">
                    <label className="form-field__label" htmlFor="contact-message">Message</label>
                    <textarea
                      className="form-field__textarea"
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us more..."
                    />
                  </div>

                  <p className="contact-form__hint">
                    Please provide as much detail as possible so we can respond more effectively.
                  </p>

                  {/* Status messages */}
                  {status === 'success' && (
                    <div className="contact-form__status contact-form__status--success" role="alert">
                      {statusMessage}
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="contact-form__status contact-form__status--error" role="alert">
                      {statusMessage}
                    </div>
                  )}

                  <div className="contact-form__submit">
                    <button
                      type="submit"
                      className="btn btn--primary btn--lg"
                      disabled={status === 'sending'}
                      id="btn-send-message"
                    >
                      {status === 'sending' ? (
                        <>
                          <span className="btn-spinner" aria-hidden="true" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
