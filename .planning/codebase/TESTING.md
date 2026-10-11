# Testing Patterns

**Analysis Date:** 2026-10-09

## Test Framework

**Runner:**
- None currently configured in repository (Zero test runners, npm scripts, or test configuration files present)

**Assertion Library:**
- None

**Run Commands:**
```bash
# No automated test runner configured
```

## Test File Organization

**Location:**
- No test directories or files currently exist (`*.test.*`, `*.spec.*` absent)

**Naming:**
- Recommended convention for future tests: `tests/e2e/*.spec.js` or `tests/unit/*.test.js`

## Test Structure

**Current Verification Strategy:**
- Manual browser verification:
  1. Open page in browser (`pages-main/index.html` or tool page)
  2. Test light/dark theme toggle button and persistence across reloads
  3. Drag and drop sample JPEG, PNG, WEBP files
  4. Verify preview rendering, dimension controls, and output download blob integrity
  5. Test mobile viewport responsiveness

**Recommended Automated Testing Pattern:**
- Playwright or Cypress for End-to-End (E2E) workflow testing:
```javascript
// Recommended Playwright pattern for Image Compressor
import { test, expect } from '@playwright/test';

test('compresses image and produces downloadable blob', async ({ page }) => {
    await page.goto('http://localhost:3000/compress.html');
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.click('#uploadContainer');
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('tests/fixtures/sample.jpg');
    
    await expect(page.locator('#previewContainer')).toBeVisible();
    await page.click('#compressBtn');
    await expect(page.locator('#downloadBtn')).toBeEnabled();
});
```

## Mocking

**Guidelines:**
- If testing Canvas or Web Worker operations in Node-based environments (Vitest/Jest), `jest-canvas-mock` or browser runner (Playwright) is required to simulate HTML5 Canvas 2D contexts.

## Fixtures and Factories

**Test Data:**
- Recommended fixture location: `tests/fixtures/` containing sample images (`sample.jpg`, `sample.png`, `sample.webp`, `sample-large.jpg`).

## Coverage

**Requirements:** None enforced.

## Test Types

**Unit Tests:**
- Recommended: Pure utility functions (`formatBytes`, aspect ratio math, file size validations).

**Integration Tests:**
- Recommended: Canvas rendering, format conversions, Web Worker compression responses.

**E2E Tests:**
- Recommended: Browser navigation, theme toggling, drag-and-drop file upload, and download triggers.

---

*Testing analysis: 2026-10-09*
