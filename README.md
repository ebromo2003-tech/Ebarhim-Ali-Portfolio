# Ebrahim Ali — Portfolio

A one-page, buildless portfolio. Open `index.html` or `Ebrahim Portfolio.html` to view it locally. Keep the supplied images and PDF beside the HTML files.

## Editing

- `index.html`: accessible content, project destinations, skills and contact details. All content works without JavaScript.
- `Ebrahim Portfolio.html`: identical compatibility entry point for the original filename. After editing the HTML, copy `index.html` to this file.
- `styles.css`: palette, typography, component styles, responsive layouts and reduced-motion rules.
- `script.js`: mobile menu, section navigation state and optional entry animations.

The entire left half of the hero selects `Painterly Gulf Portrait with Blue Brushstrokes.png`; the right half selects `1778496923520.png`. Both layers share one square crop frame and an inset border. Static crop registration aligns the faces while a reversible horizontal wipe changes the artwork. Headings also work as keyboard and touch buttons. Reduced motion disables the wipe animation while retaining the static image alignment.

All 31 skills and six category headers use bundled library icons or recognizable tool logos from Lucide, Simple Icons, Devicon and Balsamiq's official brand assets, styled in the same blue palette. Source licenses and attribution are in `THIRD_PARTY_NOTICES.md`. No external icon runtime or CDN is required.

The eight Prototype/Presentation buttons have larger click targets (at least 64px tall), a sliding blue background, rolling labels, exchanging arrows and selection-frame corners on hover or keyboard focus. Mobile buttons stack when space is limited. Decorative section indexes and editorial micro-labels remain removed.

Project links are maintained directly in their corresponding HTML articles. They open in new tabs. The trailing `and` typo in the supplied Wajba URL has been removed.

The CV links use the native download attribute and the original `Ebrahim_Resume__UX_.pdf`. Upload this PDF alongside the site.

The degree title follows the supplied resume: B.Sc. in Computer Science. Skills, experience and certification copy also follow the resume; no project metrics or seniority claims have been added.

## Deployment

For Cloudflare Pages, deploy this directory as a static site with no build command and the project root as the output directory. No framework, server, environment variables or runtime dependencies are needed. Google Fonts is the only external styling resource; system fonts provide a fallback.

The existing GitHub Pages workflow copies `index.html`, `styles.css`, `script.js`, `THIRD_PARTY_NOTICES.md`, the PNGs and the CV. No deployment was triggered during this local redesign.

## Verification

Headless Chrome checked viewport widths 1440, 1280, 1024, 768, 430, 390 and 360 (height 960): no horizontal overflow, missing images, local HTTP errors or JavaScript exceptions.

Also checked: actual CV browser download (filename and bytes match the original), eight project action destinations and new-tab protections, email/phone/LinkedIn destinations, all section navigation states, mobile menu selection and Escape behavior, body scroll restoration, skip-link keyboard focus, reduced motion, and content availability without JavaScript.

The current checks also cover pointer selection in empty space across both hero halves, intermediate wipe animation, identical portrait-layer bounds, the shared inset border, touch and keyboard portrait selection, 37 sourced SVG icons, minimum project-button heights, and hover feedback. Portrait registration and the new buttons/icons were reviewed in Chrome screenshots.

External Figma/Canva destination permissions and Lighthouse scores were not measured. Local QA tools, screenshots, original-file backup and detailed results live in the ignored `.qa/` directory and are not required for deployment.
