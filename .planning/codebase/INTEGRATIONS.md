# External Integrations

**Analysis Date:** 2026-10-09

## APIs & External Services

**Advertising:**
- Google AdSense - Monetization ad slots across all tool pages (`pages-main/index.html`, `pages-main/compress.html`, `pages-main/resizer.html`, `pages-main/my_converter.html`, `pages-main/my_crop.html`, `pages-main/image_pdf.html`, `pages-main/privacy.html`)
  - Script: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxx`
  - Auth / Client ID: Currently configured with placeholder `ca-pub-xxxxxxxxxx`

**CDNs & Asset Delivery:**
- Cloudflare CDNJS (`cdnjs.cloudflare.com`):
  - Font Awesome 6.4.0 (`all.min.css`)
  - Cropper.js 1.5.12 (`cropper.min.js`, `cropper.min.css`)
  - jsPDF 2.5.1 (`jspdf.umd.min.js`)
- jsDelivr CDN (`cdn.jsdelivr.net`):
  - Bootstrap 5.3 (`bootstrap.min.css`, `bootstrap.bundle.min.js`)
  - browser-image-compression 2.0.0 (`browser-image-compression.min.js`)
- Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`):
  - Plus Jakarta Sans & Outfit font families

## Data Storage

**Databases:**
- None (Serverless, backendless static application architecture)

**File Storage:**
- Local browser memory only:
  - In-memory `Blob` and `File` object lifecycle via `URL.createObjectURL()` and `URL.revokeObjectURL()`
  - Images never leave the user's browser device; 0 server uploads

**Caching & State:**
- LocalStorage:
  - Key `imagetools_theme` in `pages-main/assets/js/app.js` to persist `'light'` or `'dark'` theme preference

## Authentication & Identity

**Auth Provider:**
- None (Open, public, client-side utility suite with no user accounts or authentication requirements)

## Monitoring & Observability

**Error Tracking:**
- None (Standard browser developer console `console.error` and UI error alerts rendered into DOM containers)

**Logs:**
- Browser console output only

## CI/CD & Deployment

**Hosting:**
- Static web hosting compatible (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3/CloudFront)

**CI Pipeline:**
- None configured in repository

## Environment Configuration

**Required env vars:**
- None required for local runtime
- Production deployment may substitute real AdSense Client ID for `ca-pub-xxxxxxxxxx`

**Secrets location:**
- No secrets or private credentials used or stored in codebase

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

---

*Integration audit: 2026-10-09*
