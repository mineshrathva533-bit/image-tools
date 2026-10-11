# Coding Conventions

**Analysis Date:** 2026-10-09

## Naming Patterns

**Files:**
- HTML documents use lowercase, hyphenated or snake_case naming (`compress.html`, `resizer.html`, `my_converter.html`, `my_crop.html`, `image_pdf.html`).
- Shared stylesheets and scripts use clean lowercase (`main.css`, `app.js`).

**Functions:**
- Use camelCase for functions (`getPreferredTheme()`, `applyTheme(theme)`, `handleScroll()`, `formatBytes(bytes)`).
- Event listener callback naming follows verb-noun syntax (`handleDrop`, `initPreview`, `downloadImage`).

**Variables:**
- camelCase for JavaScript variables and constants (`currentPath`, `backToTop`, `tooltipTriggerList`, `uploadContainer`).
- UPPER_SNAKE_CASE for constant identifiers (`THEME_KEY = 'imagetools_theme'`).

**CSS Selectors:**
- Classes use kebab-case (`tool-workspace`, `upload-container`, `theme-toggle-btn`, `file-info-pill`, `btn-primary-action`).
- Custom properties use `--` prefix with kebab-case categories (`--brand-primary`, `--bg-surface`, `--text-secondary`, `--shadow-md`, `--radius-lg`).
- Data attributes use kebab-case (`[data-theme="dark"]`, `data-bs-toggle="dropdown"`).

## Code Style

**Formatting:**
- Indentation: 4 spaces for HTML and JS, 4 spaces for CSS.
- Semicolons used consistently in JavaScript files.

**Linting:**
- No automated linter configured in the workspace; follows standard vanilla JavaScript and HTML5 specifications.

## Import & Resource Organization

**Order in `<head>`:**
1. Document metadata (`<meta charset>`, `<meta name="viewport">`, title, meta description, meta keywords).
2. Third-party vendor CSS (Bootstrap 5.3 CDN, Font Awesome 6 CDN).
3. Local stylesheet (`assets/css/main.css`).
4. Tool-specific third-party vendor scripts (e.g. `browser-image-compression`, `cropperjs`).
5. Tool-specific local `<style>` extensions if any.

**Order before `</body>`:**
1. Bootstrap JS bundle (`bootstrap.bundle.min.js`).
2. Global application script (`assets/js/app.js`).
3. Tool-specific inline `<script>` controller logic.

## Error Handling

**Patterns:**
- Graceful degradation: Check for feature availability before execution (`if (window.bootstrap && window.bootstrap.Tooltip) ...`).
- DOM alert feedback: Display error feedback directly in the DOM when invalid files are dragged or chosen.
- Try/catch blocks around asynchronous image loading, Canvas conversion, and Web Worker execution.

## Logging

**Framework:** Native `console` methods.

**Patterns:**
- Errors logged with `console.error(err)`.
- Production code minimizes unnecessary debug logging.

## Comments

**When to Comment:**
- Section banner headers in CSS (`/* ========================================================================== */`).
- Function docstrings and block headers explaining purpose (`/** ImageTools Shared UI & Design System Runtime */`).
- Clear annotation above third-party script tags and custom logic blocks.

## Function Design

**Size:** Focused, single-responsibility functions under 30-40 lines.

**Parameters:** Descriptive named arguments (`applyTheme(theme)`, `formatBytes(bytes, decimals)`).

**Return Values:** Explicit primitives or DOM element references.

## Module Design

**Global Script:**
- Wrapped in an Immediately Invoked Function Expression (IIFE) with `'use strict';` in `pages-main/assets/js/app.js` to avoid polluting the global namespace.

**Tool Scripts:**
- Wrapped in `document.addEventListener('DOMContentLoaded', function() { ... })` to ensure all DOM elements are mounted before query selection.

---

*Convention analysis: 2026-10-09*
