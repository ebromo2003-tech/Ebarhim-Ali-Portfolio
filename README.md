# Ebrahim Ali — Portfolio

A one-page, buildless portfolio. Open `index.html` or `Ebrahim Portfolio.html` to view it locally. Keep the supplied images and PDF beside the HTML files.

Branding uses `Glossy Blue Ribbon Loop Emblem.png` in the header, footer and favicon. The logo is displayed with its original proportions and without cropping. The Document Organizer banner and Prototype button both link to the Figma PROJECT-1 prototype (`dua4YL4MAZnrSSY4bpByHo`).

## Editing

- `index.html`: accessible content, project destinations, skills and contact details. All content works without JavaScript.
- `Ebrahim Portfolio.html`: identical compatibility entry point for the original filename. After editing the HTML, copy `index.html` to this file.
- `styles.css`: palette, typography, component styles, responsive layouts and reduced-motion rules.
- `script.js`: mobile menu, section navigation state and optional entry animations.

The portrait initially shows half `Painterly Gulf Portrait with Blue Brushstrokes.png` and half `1778496923520.png`. The entire left half of the hero selects the artwork; the right half selects the photo. Leaving the hero restores the split unless a role button still has keyboard focus. Tapping either half also selects its image on touch devices. Both layers share one square crop frame and an inset border. Static crop registration aligns the faces while a reversible horizontal wipe changes the artwork. Reduced motion disables animations while retaining image alignment.

A lightweight entry animation follows first-screen readiness. A page-shaped skeleton appears only if core styling or the hero images take more than 400ms to load. It clears as soon as those resources settle, with a six-second fail-safe even if the main script fails. Project images and fonts do not gate it. Content remains available without JavaScript.

All 31 skills and six category headers use bundled library icons or recognizable tool logos from Lucide, Simple Icons, Devicon and Balsamiq's official brand assets, styled in the same blue palette. Source licenses and attribution are in `THIRD_PARTY_NOTICES.md`. No external icon runtime or CDN is required.

The eight Prototype/Presentation buttons have larger click targets (at least 64px tall), a sliding blue background, rolling labels, exchanging arrows and selection-frame corners on hover or keyboard focus. Mobile buttons stack when space is limited. Decorative section indexes and editorial micro-labels remain removed.

Let's talk, Get In Touch, View My Work and Download CV share this full-surface interaction. Primary actions use a strong navy fill; Download CV uses a distinct light blue surface. The mobile menu also includes a prominent Let's talk email button.

The five navigation links are larger controls with rolling labels, blue fills, keyboard feedback and active-section states. The footer keeps the copyright line and provides an animated Back to top button.

Project links are maintained directly in their corresponding HTML articles. They open in new tabs. The trailing `and` typo in the supplied Wajba URL has been removed.

The CV links use the native download attribute and the original `Ebrahim_Resume__UX_.pdf`. Upload this PDF alongside the site.

The degree title follows the supplied resume: B.Sc. in Computer Science. Skills, experience and certification copy also follow the resume; no project metrics or seniority claims have been added.

## Deployment

For Cloudflare Pages, deploy this directory as a static site with no build command and the project root as the output directory. No framework, server, environment variables or runtime dependencies are needed. Google Fonts is the only external styling resource; system fonts provide a fallback.

Production URL: https://ebromo2003-tech.github.io/Ebarhim-Ali-Portfolio/

The remote repository uses its existing `.github/workflows/static.yml` to publish the static root on pushes to `main`. The local `deploy.yml` is an alternative workflow; avoid installing both in the same repository. Assets and the CV must remain beside the HTML files.

## Verification

Headless Chrome checked viewport widths 1440, 1280, 1024, 768, 430, 390 and 360 (height 960): no horizontal overflow, missing images, local HTTP errors or JavaScript exceptions.

Also checked: actual CV browser download (filename and bytes match the original), eight project action destinations and new-tab protections, email/phone/LinkedIn destinations, all section navigation states, mobile menu selection and Escape behavior, body scroll restoration, skip-link keyboard focus, reduced motion, and content availability without JavaScript.

The current checks also cover pointer selection in empty space across both hero halves, intermediate wipe animation, identical portrait-layer bounds, the shared inset border, touch and keyboard portrait selection, 37 sourced SVG icons, minimum project-button heights, and hover feedback. Portrait registration and the new buttons/icons were reviewed in Chrome screenshots.

Additional checks exercise slow-loading skeleton appearance/recovery, the six-second fallback with the app script blocked, the initial 50/50 portrait on all seven viewport widths, the five animated navigation links, and the footer's return-to-top action.

External Figma/Canva destination permissions and Lighthouse scores were not measured. Local QA tools, screenshots, original-file backup and detailed results live in the ignored `.qa/` directory and are not required for deployment.
