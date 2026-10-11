<!-- refreshed: 2026-10-09 -->
# Architecture

**Analysis Date:** 2026-10-09

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│                 Navigation & Global Shell                   │
│             `pages-main/assets/js/app.js`                   │
│             `pages-main/assets/css/main.css`                │
├──────────────────────────┬──────────────────────────────────┤
│    Tool Workspaces       │         Content Pages            │
│  `pages-main/compress.html` │  `pages-main/index.html`         │
│  `pages-main/resizer.html`  │  `pages-main/about.html`         │
│  `pages-main/my_crop.html`  │  `pages-main/contact.html`       │
│  `pages-main/my_converter.html` `pages-main/privacy.html`    │
│  `pages-main/image_pdf.html`│                                  │
└────────────┬─────────────┴───────────────────┬──────────────┘
             │                                 │
             ▼                                 ▼
┌─────────────────────────────────────────────────────────────┐
│              Client-side Engine & Processing                │
│       HTML5 Canvas API / FileReader / URL.createObjectURL   │
│       browser-image-compression / Cropper.js / jsPDF        │
└─────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│             Output Generation & File Download               │
│                Blob -> <a download="...">                   │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Root Redirect | Immediate HTTP-equiv and meta refresh entry point to main app | `index.html` |
| Portal Homepage | Landing showcase, feature directory, FAQ, and tool navigation | `pages-main/index.html` |
| Design System CSS | Theme tokens (light/dark), layout, responsive typography, UI components | `pages-main/assets/css/main.css` |
| Global Runtime JS | Theme switching (`data-theme`), sticky navbar scroll effects, tooltips | `pages-main/assets/js/app.js` |
| Image Compressor | Client-side compression using Web Workers with quality & size controls | `pages-main/compress.html` |
| Image Resizer | Pixel/percentage dimension resizing with aspect ratio preservation | `pages-main/resizer.html` |
| Image Format Converter | Format transcoding (PNG, JPG, WEBP, BMP, etc.) using Canvas API | `pages-main/my_converter.html` |
| Image Cropper | Interactive aspect ratio and freeform cropping via Cropper.js | `pages-main/my_crop.html` |
| Images to PDF | Multiple image batch ingestion and multi-page PDF compilation via jsPDF | `pages-main/image_pdf.html` |
| Legal & About | Privacy transparency, developer contact, about statements | `pages-main/about.html`, `pages-main/contact.html`, `pages-main/privacy.html` |

## Pattern Overview

**Overall:** Client-Side Multi-Page Application (MPA) with Embedded Utility Engines

**Key Characteristics:**
- **Zero-Server Processing:** 100% of image manipulation runs locally in the client browser memory.
- **Shared Design Token System:** Consistent visual identity governed by CSS custom properties in `pages-main/assets/css/main.css`.
- **Progressive Enhancement:** Dedicated pages per tool for SEO discoverability, bookmarking, and isolated tool contexts.

## Layers

**Global Shell Layer:**
- Purpose: Shared branding, navigation bars, footer, theme persistence, and responsive layout styling
- Location: `pages-main/assets/css/main.css`, `pages-main/assets/js/app.js`
- Contains: CSS variables, theme toggle handlers, scroll event listeners
- Depends on: Bootstrap 5.3 CSS, Font Awesome 6.4.0
- Used by: All HTML pages in `pages-main/`

**Tool Workspace Layer:**
- Purpose: Provides user interface for drag-and-drop file upload, parameter controls, preview panels, and download triggers
- Location: `pages-main/compress.html`, `pages-main/resizer.html`, `pages-main/my_converter.html`, `pages-main/my_crop.html`, `pages-main/image_pdf.html`
- Contains: Tool workspace layout markup, parameter inputs, action buttons, progress bars
- Depends on: Global Shell Layer, Canvas / Library APIs

**Processing Engine Layer:**
- Purpose: Performs byte-level and pixel-level image transformation
- Location: Embedded `<script>` blocks within each tool page
- Contains: File reading, canvas drawing, coordinate cropping, compression workers, PDF compilation
- Depends on: Native browser APIs (Canvas 2D, FileReader, Blob, URL) and CDNs (`browser-image-compression`, `cropperjs`, `jspdf`)

## Data Flow

### Primary Request Path (Tool Execution)

1. User selects or drops image file into `.upload-container` (`pages-main/[tool].html`)
2. FileReader / `URL.createObjectURL(file)` creates local preview blob (`pages-main/[tool].html`)
3. User adjusts transformation settings (quality slider, width/height inputs, crop box, format selector)
4. Processing engine executes transformation:
   - Resizer & Converter: Draw to `<canvas>`, invoke `canvas.toBlob(...)`
   - Compressor: Dispatch to Web Worker via `imageCompression(file, options)`
   - Cropper: Invoke `cropper.getCroppedCanvas().toBlob(...)`
   - PDF: Ingest image dimensions and invoke `doc.addImage(...)` then `doc.save(...)`
5. Processed blob converted to Object URL and downloaded via programmatic `<a download="...">` click

**State Management:**
- Application state is localized to the active page's DOM elements and closures.
- Theme preference (`'dark'` / `'light'`) is stored globally in `localStorage.getItem('imagetools_theme')`.

## Key Abstractions

**Upload Dropzone:**
- Purpose: Unified drag-and-drop file target supporting both drag events and file dialog clicks
- Examples: `uploadContainer` in `pages-main/compress.html`, `pages-main/resizer.html`, `pages-main/my_converter.html`
- Pattern: Event delegation (`dragover`, `dragleave`, `drop`, `click`)

**Format Bytes Utility:**
- Purpose: Format raw byte numbers into human-readable strings (KB, MB)
- Examples: Inline function `formatBytes(bytes)` across tool scripts
- Pattern: Functional helper

## Entry Points

**Root Entry:**
- Location: `index.html`
- Triggers: Browser request to root URL
- Responsibilities: Redirects immediately to `pages-main/index.html`

**Home Portal:**
- Location: `pages-main/index.html`
- Triggers: User landing on main web application
- Responsibilities: Displays tool directory, marketing copy, quick access cards, FAQs

## Architectural Constraints

- **Threading:** Image processing runs on main JavaScript thread for Canvas/Cropper operations; Web Workers are utilized only in Image Compressor (`browser-image-compression`).
- **Memory Consumption:** Large high-resolution images (e.g. 50MB RAW/JPEG) occupy significant browser memory when decompressed into Canvas bitmaps, limited by client device RAM.
- **Offline Capability:** Core tool logic relies on CDNs for initial script and CSS fetching unless cached by the browser.

## Anti-Patterns

### Inline Script Duplication

**What happens:** Common utilities like drag-and-drop binding and byte formatting are duplicated across multiple tool HTML files.
**Why it's wrong:** Increases maintenance overhead; bug fixes in one tool must be copied to four others.
**Do this instead:** Extract shared tool controller logic into a reusable `pages-main/assets/js/tool-utils.js` module.

### Hardcoded AdSense Placeholders

**What happens:** Dummy publisher ID `ca-pub-xxxxxxxxxx` is hardcoded across 7 HTML files.
**Why it's wrong:** Clutters production markup and console with AdSense warnings.
**Do this instead:** Consolidate ad injection into a configuration-aware script or centralized partial.

## Error Handling

**Strategy:** DOM alert notices and fallback resets.

**Patterns:**
- Try-catch blocks wrapped around canvas exports and compression jobs.
- Visual error notices rendered into tool workspace containers if unsupported file types are provided.

## Cross-Cutting Concerns

**Logging:** Standard `console.error` and `console.log`.
**Theme Switching:** Dynamic attribute switching via `document.documentElement.setAttribute('data-theme', theme)` in `pages-main/assets/js/app.js`.
**Privacy Guarantee:** Zero server network calls for user file data.

---

*Architecture analysis: 2026-10-09*
