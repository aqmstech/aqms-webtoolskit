import { Helmet } from 'react-helmet-async';
import { getBreadcrumbSchema } from '../utils/seo';

import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

import '../styles/pages/static-page.css';

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://aqmswebtoolkit.com/' },
    { name: 'Privacy Policy', url: 'https://aqmswebtoolkit.com/privacy-policy' },
  ]);

  return (
    <>
      <Helmet>
        <title>Privacy Policy | AQMS Web Toolkit</title>
        <meta
          name="description"
          content="Learn how AQMS Web Toolkit collects, uses, and protects information, including cookies, analytics, and tool-related data."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aqmswebtoolkit.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | AQMS Web Toolkit" />
        <meta property="og:description" content="Learn how AQMS Web Toolkit collects, uses, and protects information, including cookies, analytics, and tool-related data." />
        <meta property="og:url" content="https://aqmswebtoolkit.com/privacy-policy" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AQMS Web Toolkit" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy | AQMS Web Toolkit" />
        <meta name="twitter:description" content="Learn how AQMS Web Toolkit collects, uses, and protects information." />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="page-layout">
        <Header />

        <main className="page-main" id="main-content">
          <div className="static-page container">
            <div className="static-page__inner">

              <header className="static-page__header">
                <h1 className="static-page__h1">Privacy Policy</h1>
                <p className="static-page__updated">Last updated: May 4, 2026</p>
                <p className="static-page__intro">
                  AQMS Web Toolkit (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates aqmswebtoolkit.com and provides online tools such as image resizing, QR code generation, and other web-based utilities.
                </p>
                <p className="static-page__intro">
                  This Privacy Policy explains what information we may collect, how we use it, and the choices available to you when you use our website.
                </p>
              </header>

              {/* Information We Collect */}
              <section className="static-section">
                <h2 className="static-section__title">Information We Collect</h2>

                <h3 className="static-section__subtitle">Information you provide directly</h3>
                <p>When you contact us through our website or by email, we may collect information such as your name, email address, subject line, and any message or details you choose to send.</p>

                <h3 className="static-section__subtitle">Tool inputs and uploaded files</h3>
                <p>Some tools on our website may require you to upload files or enter content in order to generate a result. For example, you may upload an image for resizing or provide text to generate a QR code. We may process this information as needed to provide the requested tool functionality.</p>

                <h3 className="static-section__subtitle">Automatically collected information</h3>
                <p>When you visit our website, we may automatically collect certain technical and usage information, such as:</p>
                <ul>
                  <li>IP address</li>
                  <li>Browser type</li>
                  <li>Device type</li>
                  <li>Operating system</li>
                  <li>Referring pages</li>
                  <li>Pages visited</li>
                  <li>Approximate location based on IP</li>
                  <li>Date and time of visits</li>
                  <li>Basic site interaction data</li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section className="static-section">
                <h2 className="static-section__title">How We Use Information</h2>
                <p>We may use information we collect to:</p>
                <ul>
                  <li>Operate, maintain, and improve our website and tools</li>
                  <li>Provide requested tool functionality</li>
                  <li>Respond to your messages, questions, and support requests</li>
                  <li>Monitor usage, performance, and reliability</li>
                  <li>Detect, prevent, or address abuse, security issues, or technical problems</li>
                  <li>Improve user experience and develop new features</li>
                  <li>Display advertising or sponsored content where applicable</li>
                </ul>
              </section>

              {/* Uploaded Files and Tool Inputs */}
              <section className="static-section">
                <h2 className="static-section__title">Uploaded Files and Tool Inputs</h2>
                <p>Files, images, text, and other inputs submitted through our tools are used to provide the requested functionality of the tool you are using.</p>
                <p>Depending on how the website is configured, these inputs may be processed temporarily for functionality, troubleshooting, security, analytics, or service improvement purposes. Please do not upload or submit sensitive, confidential, or regulated personal information unless you are comfortable doing so.</p>
              </section>

              {/* Cookies and Similar Technologies */}
              <section className="static-section">
                <h2 className="static-section__title">Cookies and Similar Technologies</h2>
                <p>We may use cookies, local storage, pixels, and similar technologies to:</p>
                <ul>
                  <li>Keep the website functioning properly</li>
                  <li>Remember preferences</li>
                  <li>Understand traffic and usage patterns</li>
                  <li>Improve performance</li>
                  <li>Support advertising, analytics, and sponsored content features</li>
                </ul>
                <p>You can usually control cookies through your browser settings. Disabling cookies may affect how some parts of the website function.</p>
              </section>

              {/* Advertising and Analytics */}
              <section className="static-section">
                <h2 className="static-section__title">Advertising and Analytics</h2>
                <p>Our website may display advertisements, sponsored placements, or promotional content. We may also use third-party analytics or advertising partners to help us understand website usage and support monetization.</p>
                <p>These third parties may use cookies, web beacons, pixels, IP addresses, or similar technologies to collect information about your use of this website and other websites over time, subject to their own policies.</p>
                <p>Where required by applicable law, we may request your consent for certain cookies or data processing activities.</p>
              </section>

              {/* Third-Party Links and Services */}
              <section className="static-section">
                <h2 className="static-section__title">Third-Party Links and Services</h2>
                <p>Our website may contain links to third-party websites, services, or tools. We are not responsible for the privacy practices, content, or policies of those third parties. We encourage you to review their privacy policies before interacting with them.</p>
              </section>

              {/* Data Retention */}
              <section className="static-section">
                <h2 className="static-section__title">Data Retention</h2>
                <p>We retain information for as long as reasonably necessary for the purposes described in this Privacy Policy, including operating the website, providing requested functionality, maintaining security, resolving issues, complying with legal obligations, and improving our services.</p>
                <p>Retention periods may vary depending on the type of information and how it is used.</p>
              </section>

              {/* Data Security */}
              <section className="static-section">
                <h2 className="static-section__title">Data Security</h2>
                <p>We take reasonable administrative, technical, and organizational measures to help protect information processed through our website. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
              </section>

              {/* Children's Privacy */}
              <section className="static-section">
                <h2 className="static-section__title">Children&rsquo;s Privacy</h2>
                <p>Our website is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13 through the website. If you believe that a child has provided personal information through our website, please contact us and we will review the situation.</p>
              </section>

              {/* Changes to This Privacy Policy */}
              <section className="static-section">
                <h2 className="static-section__title">Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last updated&rdquo; date above. Your continued use of the website after changes are posted means you accept the updated policy.</p>
              </section>

              {/* Contact Us */}
              <section className="static-section">
                <h2 className="static-section__title">Contact Us</h2>
                <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
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
