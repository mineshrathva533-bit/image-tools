# Codebase Structure

**Analysis Date:** 2026-10-09

## Directory Layout

```text
E:/pages-main/
├── .planning/                  # Project planning and codebase specifications
│   └── codebase/              # Codebase analysis documents
├── pages-main/                # Main application source directory
│   ├── assets/                # Static assets (styles, scripts, icons)
│   │   ├── css/
│   │   │   └── main.css       # Complete ImageTools design system and theme styles
│   │   └── js/
│   │       └── app.js         # Shared navigation, theme switcher, scroll behavior
│   ├── about.html             # About ImageTools page
│   ├── compress.html          # Image Compressor tool workspace
│   ├── contact.html           # Contact form and support details
│   ├── image_pdf.html         # Images to PDF converter tool workspace
│   ├── index.html             # Application homepage and tool directory
│   ├── my_converter.html      # Image format converter workspace
│   ├── my_crop.html           # Image cropper tool workspace
│   ├── privacy.html           # Privacy policy and security disclosure
│   └── resizer.html           # Image resizer tool workspace
└── index.html                 # Root redirect file forwarding to pages-main/index.html
```

## Directory Purposes

**`pages-main/`:**
- Purpose: Root container for the web application's HTML pages and assets
- Contains: All user-facing pages, tool views, and static assets
- Key files: `index.html`, `compress.html`, `resizer.html`, `assets/css/main.css`, `assets/js/app.js`

**`pages-main/assets/css/`:**
- Purpose: Centralized styling and design tokens
- Contains: CSS stylesheet
- Key files: `main.css` (tokens, theme variations, typography, layout, utilities)

**`pages-main/assets/js/`:**
- Purpose: Shared client-side runtime behavior
- Contains: JavaScript runtime scripts
- Key files: `app.js` (theme manager, navbar scroll monitor, back-to-top handler)

**`.planning/`:**
- Purpose: Project tracking, roadmap, and GSD planning metadata
- Contains: Codebase maps, planning contracts, requirements
- Key files: `.planning/codebase/*.md`

## Key File Locations

**Entry Points:**
- `index.html`: Web server root redirect to `pages-main/index.html`
- `pages-main/index.html`: Primary landing page and navigation hub

**Configuration:**
- `pages-main/assets/css/main.css` (lines 8-88): CSS design system tokens (colors, shadows, radiuses, dark/light theme variables)

**Core Logic:**
- `pages-main/assets/js/app.js`: Global UI interactions, dark/light mode toggle
- `pages-main/compress.html`: Client-side compression logic
- `pages-main/resizer.html`: Canvas-based resizing logic
- `pages-main/my_converter.html`: Canvas format transcoding logic
- `pages-main/my_crop.html`: Cropper.js integration logic
- `pages-main/image_pdf.html`: jsPDF integration logic

## Naming Conventions

**Files:**
- HTML tool pages: descriptive lowercase with underscores or single words (`compress.html`, `resizer.html`, `my_converter.html`, `image_pdf.html`)
- Informational pages: simple lowercase (`about.html`, `contact.html`, `privacy.html`)
- CSS/JS assets: standard kebab or concise lowercase (`main.css`, `app.js`)

**Directories:**
- Plural lowercase or categorized (`assets/`, `css/`, `js/`)

## Where to Add New Code

**New Tool Feature:**
- Create new page: `pages-main/[tool_name].html` (use template from `pages-main/resizer.html` or `pages-main/compress.html`)
- Update navbar and tool list in: `pages-main/index.html`, `pages-main/assets/js/app.js` (for active link tracking)
- Update dropdown menus in all existing tool headers to link to the new tool

**New Component/Module:**
- CSS tokens & component styling: `pages-main/assets/css/main.css`
- Shared JS helpers: extract into `pages-main/assets/js/`

**Utilities:**
- Common JS utilities (e.g., file validation, format conversions): `pages-main/assets/js/`

## Special Directories

**`.planning/`:**
- Purpose: Stores GSD architecture maps, project scope, and execution plans
- Generated: Semi-automated via GSD commands
- Committed: Yes

**`.agents/`:**
- Purpose: Workspace agent configuration and skill definitions
- Generated: Pre-configured
- Committed: Yes

---

*Structure analysis: 2026-10-09*
