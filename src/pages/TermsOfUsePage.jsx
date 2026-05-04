import { Helmet } from 'react-helmet-async';
import { getBreadcrumbSchema } from '../utils/seo';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import '../styles/pages/static-page.css';

export default function TermsOfUsePage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://aqmswebtoolkit.com/' },
    { name: 'Terms of Use', url: 'https://aqmswebtoolkit.com/terms-of-use' },
  ]);

  return (
    <>
      <Helmet>
        <title>Terms of Use | AQMS Web Toolkit</title>
        <meta
          name="description"
          content="Read the Terms of Use for AQMS Web Toolkit, including acceptable use, disclaimers, and website policies."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aqmswebtoolkit.com/terms-of-use" />
        <meta property="og:title" content="Terms of Use | AQMS Web Toolkit" />
        <meta property="og:description" content="Read the Terms of Use for AQMS Web Toolkit, including acceptable use, disclaimers, and website policies." />
        <meta property="og:url" content="https://aqmswebtoolkit.com/terms-of-use" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AQMS Web Toolkit" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Use | AQMS Web Toolkit" />
        <meta name="twitter:description" content="Read the Terms of Use for AQMS Web Toolkit, including acceptable use, disclaimers, and website policies." />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="page-layout">
        <Header />

        <main className="page-main" id="main-content">
          <div className="static-page container">
            <div className="static-page__inner">

              <header className="static-page__header">
                <h1 className="static-page__h1">Terms of Use</h1>
                <p className="static-page__updated">Last updated: May 4, 2026</p>
                <p className="static-page__intro">
                  Welcome to AQMS Web Toolkit. These Terms of Use govern your use of aqmswebtoolkit.com and any tools, features, content, or services made available through the website.
                </p>
                <p className="static-page__intro">
                  By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the website.
                </p>
              </header>

              {/* Use of the Website */}
              <section className="static-section">
                <h2 className="static-section__title">Use of the Website</h2>
                <p>AQMS Web Toolkit provides free online tools and related website content for general informational and utility purposes. We may add, remove, change, suspend, or discontinue any tool, feature, or part of the website at any time without notice.</p>
                <p>You may use the website only for lawful purposes and in accordance with these Terms.</p>
              </section>

              {/* Acceptable Use */}
              <section className="static-section">
                <h2 className="static-section__title">Acceptable Use</h2>
                <p>You agree not to:</p>
                <ul>
                  <li>Use the website in any unlawful, harmful, fraudulent, or abusive way</li>
                  <li>Interfere with or disrupt the website, servers, or networks</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Upload malicious code, harmful files, or disruptive content</li>
                  <li>Use bots, scripts, scraping tools, or automated methods in a way that harms the website or its availability</li>
                  <li>Reverse engineer, exploit, or misuse the website or its functionality beyond ordinary intended use</li>
                  <li>Use the website in a way that infringes the rights of others</li>
                </ul>
              </section>

              {/* Tools and Generated Output */}
              <section className="static-section">
                <h2 className="static-section__title">Tools and Generated Output</h2>
                <p>The website may allow you to upload files, enter text, generate QR codes, resize images, or create downloadable outputs.</p>
                <p>You are responsible for:</p>
                <ul>
                  <li>The content you upload, submit, or generate through the website</li>
                  <li>Reviewing outputs before using, sharing, publishing, printing, or relying on them</li>
                  <li>Ensuring you have the rights and permission to use any uploaded content</li>
                </ul>
                <p>We do not guarantee that outputs will always be accurate, error-free, formatted exactly as expected, or suitable for every use case. Tool outputs are provided for convenience and should be reviewed by you before relying on them.</p>
              </section>

              {/* Intellectual Property */}
              <section className="static-section">
                <h2 className="static-section__title">Intellectual Property</h2>
                <p>The website, its design, branding, layout, software, content, and related materials are owned by or licensed to AQMS Web Toolkit and are protected by applicable intellectual property laws.</p>
                <p>These Terms do not give you ownership of the website or its branding. You may not copy, reproduce, republish, distribute, modify, or exploit any part of the website except as allowed by law or with prior written permission.</p>
              </section>

              {/* User Content */}
              <section className="static-section">
                <h2 className="static-section__title">User Content</h2>
                <p>You retain rights to content you upload or submit, subject to any rights necessary for us to operate the website and provide the requested functionality.</p>
                <p>By uploading or submitting content through the website, you grant us a limited, non-exclusive right to process, transmit, and use that content only as reasonably necessary to operate the tool or feature you are using, maintain the website, improve performance, prevent abuse, and protect security.</p>
              </section>

              {/* Third-Party Services, Ads, and Links */}
              <section className="static-section">
                <h2 className="static-section__title">Third-Party Services, Ads, and Links</h2>
                <p>The website may contain links to third-party websites, services, advertisements, sponsored placements, or promotional content. We do not control and are not responsible for third-party content, services, availability, or policies.</p>
                <p>Your interactions with third parties are solely between you and those third parties.</p>
              </section>

              {/* Disclaimer of Warranties */}
              <section className="static-section">
                <h2 className="static-section__title">Disclaimer of Warranties</h2>
                <p>The website and all tools, content, and features are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.</p>
                <p>To the fullest extent permitted by law, AQMS Web Toolkit disclaims all warranties of any kind, whether express, implied, or statutory, including implied warranties of merchantability, fitness for a particular purpose, non-infringement, and availability.</p>
                <p>We do not guarantee that:</p>
                <ul>
                  <li>The website will always be available</li>
                  <li>The website will be uninterrupted, secure, or error-free</li>
                  <li>Any defects will be corrected immediately</li>
                  <li>Outputs generated by the tools will meet every need or expectation</li>
                </ul>
              </section>

              {/* Limitation of Liability */}
              <section className="static-section">
                <h2 className="static-section__title">Limitation of Liability</h2>
                <p>To the fullest extent permitted by law, AQMS Web Toolkit will not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, or for any loss of data, revenue, profits, business opportunity, or goodwill arising out of or related to your use of the website or reliance on any tool output.</p>
                <p>Your use of the website is at your own risk.</p>
              </section>

              {/* Changes to These Terms */}
              <section className="static-section">
                <h2 className="static-section__title">Changes to These Terms</h2>
                <p>We may revise these Terms of Use at any time. Updated terms will be posted on this page with a revised &ldquo;Last updated&rdquo; date. Your continued use of the website after changes are posted means you accept the updated Terms.</p>
              </section>

              {/* Contact Information */}
              <section className="static-section">
                <h2 className="static-section__title">Contact Information</h2>
                <p>If you have questions about these Terms of Use, please contact us at:</p>
                <p><a href="mailto:aqmstech@gmail.com" className="static-email">aqmstech@gmail.com</a></p>
              </section>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
