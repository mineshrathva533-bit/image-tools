# Technology Stack

**Analysis Date:** 2026-10-09

## Languages

**Primary:**
- HTML5 - Structure and markup for all pages in `pages-main/*.html` and root redirect in `index.html`
- JavaScript (ES6+) - Client-side processing logic in `pages-main/assets/js/app.js` and inline tool scripts in each page
- CSS3 - Custom design system tokens, responsive utilities, and animations in `pages-main/assets/css/main.css`

## Runtime

**Environment:**
- Client-side Web Browser (Chrome, Firefox, Safari, Edge)
- Zero server-side runtime; fully static client-side application

**Package Manager:**
- None (No `package.json` or local `node_modules`; all third-party dependencies loaded via CDN)
- Lockfile: missing (CDN-version pinned via URLs)

## Frameworks

**Core:**
- Bootstrap 5.3 (`https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css` and `bootstrap.bundle.min.js`) - Responsive grid, navbar, dropdowns, tooltips, layout components

**Icons & Typography:**
- Font Awesome 6.4.0 (`https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`) - Icon library for UI actions, tools, and brand elements
- Google Fonts (`https://fonts.googleapis.com`) - `Outfit` (headings) and `Plus Jakarta Sans` (body copy)

**Testing:**
- None configured

**Build/Dev:**
- None required (Static files served directly by any HTTP server or opened in browser)

## Key Dependencies

**Critical Client Libraries:**
- `browser-image-compression@2.0.0` (`pages-main/compress.html`) - Web Worker-based client-side image compression
- `cropperjs@1.5.12` (`pages-main/my_crop.html`) - Interactive image cropping and canvas coordinate extraction
- `jspdf@2.5.1` (`pages-main/image_pdf.html`) - Client-side multi-page PDF generation from image blobs
- HTML5 Canvas 2D API (Native browser API in `pages-main/resizer.html`, `pages-main/my_converter.html`, `pages-main/my_crop.html`) - Client-side bitmap manipulation, resizing, and format transcoding

## Configuration

**Environment:**
- Client-side storage: `localStorage` key `imagetools_theme` for dark/light mode preference
- Google AdSense Client ID placeholder (`ca-pub-xxxxxxxxxx`) in `<ins class="adsbygoogle">` slots

**Build:**
- No build configuration files present (pure static assets)

## Platform Requirements

**Development:**
- Any static file web server (e.g., Python `http.server`, Node `http-server`, VS Code Live Server) or direct filesystem access

**Production:**
- Any static website host (Cloudflare Pages, GitHub Pages, Vercel, Netlify, AWS S3, Nginx/Apache)

---

*Stack analysis: 2026-10-09*
