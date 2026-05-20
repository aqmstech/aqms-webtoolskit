import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { getBreadcrumbSchema } from '../utils/seo';
import { BLOG_POSTS } from '../data/blogPosts';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Calendar, Clock } from 'lucide-react';
import '../styles/pages/blog.css';

export default function BlogListPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', url: 'https://aqmswebtoolkit.com/' },
    { name: 'Blog', url: 'https://aqmswebtoolkit.com/blog' },
  ]);

  return (
    <>
      <Helmet>
        <title>AQMS Web Toolkit Blog | Helpful Guides & Tutorials</title>
        <meta
          name="description"
          content="Read the latest articles, guides, and tutorials from the AQMS Web Toolkit team. Learn about image editing, QR codes, privacy, and web tools."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://aqmswebtoolkit.com/blog" />
        <meta property="og:title" content="AQMS Web Toolkit Blog | Helpful Guides & Tutorials" />
        <meta property="og:description" content="Read the latest articles, guides, and tutorials from the AQMS Web Toolkit team. Learn about image editing, QR codes, privacy, and web tools." />
        <meta property="og:url" content="https://aqmswebtoolkit.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AQMS Web Toolkit" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AQMS Web Toolkit Blog | Helpful Guides & Tutorials" />
        <meta name="twitter:description" content="Read the latest articles, guides, and tutorials from the AQMS Web Toolkit team. Learn about image editing, QR codes, privacy, and web tools." />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="page-layout">
        <Header />

        <main className="page-main" id="main-content">
          <div className="blog-list container">
            <div className="static-page__inner">
              <header className="static-page__header">
                <h1 className="static-page__h1">AQMS Web Toolkit Blog</h1>
                <p className="static-page__intro">
                  Helpful guides, tips, and tutorials about image editing, QR codes, privacy, and online productivity.
                </p>
              </header>

              <div className="blog-list__grid">
                {BLOG_POSTS.map((post) => (
                  <article key={post.slug} className="blog-card">
                    <div className="blog-card__body">
                      <div className="blog-card__meta">
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={12} /> {post.publishedDate}
                        </span>
                        <span className="blog-post__bullet">•</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                      
                      <h2 className="blog-card__title">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>
                      
                      <p className="blog-card__excerpt">{post.excerpt}</p>
                      
                      <div className="blog-card__footer">
                        <Link to={`/blog/${post.slug}`} className="btn btn--secondary btn--sm">
                          Read Full Article
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
