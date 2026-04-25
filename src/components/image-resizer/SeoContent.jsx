import './SeoContent.css';

const PLATFORM_SIZES = [
  {
    platform: 'Facebook',
    sizes: [
      { use: 'Post Image',    w: 1200, h: 630,  ratio: '1.91:1' },
      { use: 'Cover Photo',   w: 820,  h: 312,  ratio: '2.63:1' },
      { use: 'Profile Photo', w: 180,  h: 180,  ratio: '1:1' },
    ],
  },
  {
    platform: 'Instagram',
    sizes: [
      { use: 'Square Post',   w: 1080, h: 1080, ratio: '1:1' },
      { use: 'Portrait Post', w: 1080, h: 1350, ratio: '4:5' },
      { use: 'Story / Reel', w: 1080, h: 1920, ratio: '9:16' },
    ],
  },
  {
    platform: 'LinkedIn',
    sizes: [
      { use: 'Post Image',    w: 1200, h: 627,  ratio: '1.91:1' },
      { use: 'Banner Photo',  w: 1584, h: 396,  ratio: '4:1' },
      { use: 'Profile Photo', w: 400,  h: 400,  ratio: '1:1' },
    ],
  },
  {
    platform: 'YouTube',
    sizes: [
      { use: 'Thumbnail',     w: 1280, h: 720,  ratio: '16:9' },
      { use: 'Channel Banner',w: 2560, h: 1440, ratio: '16:9' },
    ],
  },
  {
    platform: 'X / Twitter',
    sizes: [
      { use: 'Post Image',    w: 1600, h: 900,  ratio: '16:9' },
      { use: 'Header Photo',  w: 1500, h: 500,  ratio: '3:1' },
      { use: 'Profile Photo', w: 400,  h: 400,  ratio: '1:1' },
    ],
  },
];

const STEPS = [
  { num: '01', title: 'Choose a Size',       desc: 'Pick a preset for your platform or enter custom dimensions.' },
  { num: '02', title: 'Upload Your Image',   desc: 'Drag & drop or click to browse. Supports JPG, PNG, WEBP up to 64 MB.' },
  { num: '03', title: 'Adjust Settings',     desc: 'Select Fit, Fill, or Stretch. Optionally set export format and quality.' },
  { num: '04', title: 'Download',            desc: 'Click Resize Image, preview the result, and download.' },
];

export default function SeoContent() {
  return (
    <div className="seo-content">

      {/* What This Tool Does */}
      <section className="seo-section" aria-labelledby="what-heading">
        <h2 className="section-heading" id="what-heading">What This Tool Does</h2>
        <div className="seo-section__body">
          <p>
            This free online image resizer lets you quickly resize any image to the exact pixel dimensions
            you need — without installing software, creating an account, or uploading your files to a server.
            Everything happens directly in your browser, keeping your images completely private.
          </p>
          <p>
            Whether you need to resize an image for a Facebook post, create a LinkedIn banner, fit a YouTube
            thumbnail, or prepare a profile picture for any platform, this tool has a ready-made preset for
            you. You can also enter completely custom width and height values, lock the aspect ratio, and
            choose between three resize behaviors: Fit, Fill, or Stretch.
          </p>
          <p>
            Supported export formats include JPG, PNG, and WEBP. For JPG and WEBP exports, you control the
            output quality with a slider so you can balance file size and image sharpness.
          </p>
        </div>
      </section>

      {/* How To */}
      <section className="seo-section" aria-labelledby="howto-heading">
        <h2 className="section-heading" id="howto-heading">How to Resize Images for Social Media</h2>
        <div className="steps-grid">
          {STEPS.map(({ num, title, desc }) => (
            <div className="step-card" key={num}>
              <span className="step-card__num" aria-hidden="true">{num}</span>
              <h3 className="step-card__title">{title}</h3>
              <p className="step-card__desc">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Size Tables */}
      <section className="seo-section" aria-labelledby="sizes-heading">
        <h2 className="section-heading" id="sizes-heading">Common Image Sizes for Social Media</h2>
        <p className="section-subheading" style={{ marginBottom: 'var(--space-8)' }}>
          Use these as a quick reference, or select any preset directly in the tool above.
        </p>
        <div className="size-tables">
          {PLATFORM_SIZES.map(({ platform, sizes }) => (
            <div className="size-table-wrap" key={platform}>
              <h3 className="size-table__platform">{platform} Image Sizes</h3>
              <table className="size-table" aria-label={`${platform} image sizes`}>
                <thead>
                  <tr>
                    <th scope="col">Use</th>
                    <th scope="col">Width</th>
                    <th scope="col">Height</th>
                    <th scope="col">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map(({ use, w, h, ratio }) => (
                    <tr key={use}>
                      <td>{use}</td>
                      <td>{w}px</td>
                      <td>{h}px</td>
                      <td>{ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      {/* Why It Matters */}
      <section className="seo-section" aria-labelledby="why-heading">
        <h2 className="section-heading" id="why-heading">Why Correct Image Sizing Matters</h2>
        <div className="seo-section__body">
          <p>
            Using the wrong image size on social media leads to automatic cropping, blurry previews, and
            wasted file size. Each platform has its own display rules — an image that looks great on your
            desktop might appear awkwardly cropped in a mobile news feed.
          </p>
          <p>
            Oversized images also slow down web pages. Large images increase page load times, which
            directly hurts SEO rankings and user experience. Resizing images to the correct dimensions
            before uploading reduces file size, speeds up your site, and ensures your visuals look sharp
            on every device.
          </p>
          <p>
            For profile pictures, using the exact recommended dimensions avoids pixelation and ensures
            your image renders crisply at all zoom levels. For banners and cover photos, matching the
            recommended aspect ratio prevents content from being clipped on different screen sizes.
          </p>
        </div>
      </section>

    </div>
  );
}
