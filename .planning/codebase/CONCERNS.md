# Codebase Concerns

**Analysis Date:** 2026-10-09

## Tech Debt

**Inline Script Duplication:**
- Issue: Tool initialization, drag-and-drop handling, format byte calculation, and error notifications are duplicated inline across multiple tool pages rather than imported as modular utilities.
- Files: `pages-main/compress.html`, `pages-main/resizer.html`, `pages-main/my_converter.html`, `pages-main/my_crop.html`, `pages-main/image_pdf.html`
- Impact: Bug fixes or UI enhancements in common upload mechanics must be manually copied across 5 different HTML files.
- Fix approach: Create a shared `pages-main/assets/js/tool-core.js` module providing unified dropzone handling, image previewing, and download triggering.

**AdSense Placeholder Hardcoding:**
- Issue: Hardcoded client publisher ID `ca-pub-xxxxxxxxxx` and placeholder `<ins>` ad containers exist across 7 pages.
- Files: `pages-main/index.html`, `pages-main/compress.html`, `pages-main/resizer.html`, `pages-main/my_converter.html`, `pages-main/my_crop.html`, `pages-main/image_pdf.html`, `pages-main/privacy.html`
- Impact: Produces 400 Bad Request console errors when browser attempts to load non-existent publisher scripts.
- Fix approach: Gate ad loader behind a configuration flag or replace with real publisher ID once approved.

**Dual-Root Directory Structure:**
- Issue: The root directory has an `index.html` file whose only purpose is a meta refresh redirecting to `pages-main/index.html`.
- Files: `index.html`, `pages-main/index.html`
- Impact: Creates confusing paths for static hosting and potential SEO redirect hops.
- Fix approach: Flatten the directory structure so all pages and assets reside at repository root, or configure build/deploy output directory properly.

## Known Bugs

**No Current Breaking Functional Bugs Detected:**
- Symptoms: Standard core features (resizing, converting, cropping, compressing, PDF building) function as intended in modern desktop browsers.
- Trigger: N/A

## Security Considerations

**Content Security Policy (CSP):**
- Risk: No CSP headers or `<meta http-equiv="Content-Security-Policy">` tags are defined. The app relies on CDNs (`jsdelivr`, `cloudflare`, `google`) and inline scripts.
- Files: All HTML files in `pages-main/`
- Current mitigation: Static pure client-side architecture; user images are never uploaded to any server.
- Recommendations: Implement a strict CSP meta tag restricting script sources to verified CDN origins and eliminating inline script evaluation where possible.

## Performance Bottlenecks

**Large Image Canvas Memory Limits:**
- Problem: Attempting to resize, convert, or crop extremely large images (>25MB or >8000x8000px) can trigger browser tab crashes or memory exhaustion due to uncompressed Canvas bitmap allocation in RAM.
- Files: `pages-main/resizer.html`, `pages-main/my_converter.html`, `pages-main/my_crop.html`
- Cause: Synchronous `drawImage` and full-canvas memory allocation.
- Improvement path: Add client-side max dimension sanity checks before loading into canvas, or process in tiled chunks.

## Fragile Areas

**CDN Dependency Availability:**
- Files: All HTML files in `pages-main/`
- Why fragile: If CDN endpoints (`cdnjs.cloudflare.com`, `cdn.jsdelivr.net`) experience downtime or are blocked by network firewalls, UI styling (Bootstrap, Font Awesome) and core utilities (Cropper, jsPDF) will fail to load.
- Safe modification: Vendor critical client libraries locally under `pages-main/assets/vendor/` with fallback logic.
- Test coverage: Zero offline/fallback tests.

## Scaling Limits

**Batch PDF Generation:**
- Current capacity: Efficient for 1-20 typical images.
- Limit: Memory exhaustion when queuing 50+ high-resolution uncompressed images into a single jsPDF document.
- Scaling path: Compress/downscale images before injecting into PDF or stream pages incrementally.

## Dependencies at Risk

**Pinned CDN Versions vs Unpinned:**
- Risk: `browser-image-compression` pinned to `2.0.0`, `cropperjs` to `1.5.12`, `jspdf` to `2.5.1`. While pinned versions provide stability, they may miss upstream bugfixes and performance improvements.
- Impact: Potential compatibility issues with future browser standards.
- Migration plan: Audit dependencies periodically and consider transitioning to standard npm package management.

## Missing Critical Features

**Batch Processing in Resizer/Converter:**
- Problem: Resizer, converter, and cropper only process one file at a time.
- Blocks: Users needing to convert or resize 20 images at once must do so one by one.

## Test Coverage Gaps

**Zero Automated Test Suite:**
- What's not tested: Canvas image manipulation, file type conversions, compression ratio accuracy, drag-and-drop file ingestion, theme persistence.
- Files: All files in `pages-main/`
- Risk: Regressions introduced during styling or feature additions could break client-side image processing unnoticed.
- Priority: Medium

---

*Concerns audit: 2026-10-09*
