import { Helmet } from 'react-helmet-async';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getBreadcrumbSchema } from '../utils/seo';
import { BLOG_POSTS } from '../data/blogPosts';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import '../styles/pages/blog.css';

export default function BlogPostPage() {
  const { postSlug } = useParams();

  // Find post in the database
  const post = BLOG_POSTS.find((p) => p.slug === postSlug);

  // If post not found, redirect to main blog listing
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Related posts (exclude current post, max 2)
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  // Generate schemas
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://aqmswebtoolkit.com/' },
    { name: 'Blog', url: 'https://aqmswebtoolkit.com/blog' },
    { name: post.title, url: `https://aqmswebtoolkit.com/blog/${post.slug}` },
  ]);

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.metaDescription,
    'datePublished': post.isoDate,
    'author': {
      '@type': 'Organization',
      'name': post.author,
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'AQMS Web Toolkit',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://aqmswebtoolkit.com/logo.png',
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://aqmswebtoolkit.com/blog/${post.slug}`,
    },
  };

  // Render context-specific Call-to-Action block
  const renderCtaBlock = () => {
    switch (post.ctaType) {
      case 'qr-generator':
        return (
          <div className="blog-post__cta">
            <h3 className="blog-post__cta-heading">Need to Generate a QR Code?</h3>
            <p className="blog-post__cta-text">
              Turn any website link, contact detail, or text message into a clean, custom QR code instantly. No signup required, completely free, and generated secure client-side in your browser.
            </p>
            <Link to="/qr-code-generator" className="btn btn--primary">
              Generate QR Code Now
            </Link>
          </div>
        );
      case 'qr-reader':
        return (
          <div className="blog-post__cta">
            <h3 className="blog-post__cta-heading">Have a QR Code in a Screenshot?</h3>
            <p className="blog-post__cta-text">
              Easily read and decode QR codes from screenshots, messages, or graphics directly on your own device. Upload your image to extract links securely using our browser tool.
            </p>
            <Link to="/scan-qr-code-from-image" className="btn btn--primary">
              Scan QR Code from Screenshot
            </Link>
          </div>
        );
      case 'resizer':
      default:
        return (
          <div className="blog-post__cta">
            <h3 className="blog-post__cta-heading">Need to Resize or Crop an Image?</h3>
            <p className="blog-post__cta-text">
              Perform high-quality bulk resizing, cropping, and compression of your images. 100% private, fast, and handled fully in your browser.
            </p>
            <Link to="/image-resizer" className="btn btn--primary">
              Open Image Resizer
            </Link>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.metaTitle} | AQMS Web Toolkit</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://aqmswebtoolkit.com/blog/${post.slug}`} />
        
        {/* OpenGraph */}
        <meta property="og:title" content={`${post.metaTitle} | AQMS Web Toolkit`} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={`https://aqmswebtoolkit.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="AQMS Web Toolkit" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${post.metaTitle} | AQMS Web Toolkit`} />
        <meta name="twitter:description" content={post.metaDescription} />
        
        {/* Structured Schemas */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
      </Helmet>

      <div className="page-layout">
        <Header />

        <main className="page-main" id="main-content">
          <article className="blog-post container">
            <div className="blog-post__inner">
              
              {/* Back to Blog */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <Link to="/blog" className="btn btn--text btn--sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 0 }}>
                  <ArrowLeft size={14} /> Back to Blog Listing
                </Link>
              </div>

              {/* Post Header */}
              <header className="blog-post__header">
                <div className="blog-post__meta">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {post.publishedDate}
                  </span>
                  <span className="blog-post__bullet">•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {post.readTime}
                  </span>
                  <span className="blog-post__bullet">•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <User size={14} /> {post.author}
                  </span>
                </div>
                <h1 className="blog-post__h1">{post.title}</h1>
              </header>

              {/* Excerpt Summary Intro Box */}
              <div className="alert alert--info" style={{ marginBottom: 'var(--space-8)' }}>
                <strong>Key Takeaway:</strong> {post.excerpt}
              </div>

              {/* Content Body */}
              <div 
                className="blog-post__content"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* Call to Action Banner */}
              {renderCtaBlock()}

              {/* Related Posts Section */}
              {relatedPosts.length > 0 && (
                <section className="blog-post__related">
                  <h2 className="blog-post__related-title">Related Articles</h2>
                  <div className="blog-post__related-grid">
                    {relatedPosts.map((rPost) => (
                      <article key={rPost.slug} className="blog-card">
                        <div className="blog-card__body">
                          <div className="blog-card__meta">
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Calendar size={12} /> {rPost.publishedDate}
                            </span>
                          </div>
                          <h3 className="blog-card__title" style={{ fontSize: 'var(--font-size-base)', marginBottom: 'var(--space-2)' }}>
                            <Link to={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                          </h3>
                          <p className="blog-card__excerpt" style={{ fontSize: 'var(--font-size-xs)', marginBottom: 'var(--space-4)' }}>
                            {rPost.excerpt}
                          </p>
                          <Link to={`/blog/${rPost.slug}`} className="btn btn--secondary btn--sm" style={{ padding: 'var(--space-1-5) var(--space-3)', fontSize: 'var(--font-size-xs)' }}>
                            Read Post
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              )}

            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
