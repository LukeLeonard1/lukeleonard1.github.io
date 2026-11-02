# Luke Leonard — Animated Data Workshop Portfolio

A standalone static portfolio for GitHub Pages. Résumé-based experience appears in compact paper panels over a full-page data animation. All displayed records, people, group names, numbers, and nudges are fictional illustrations; no company datasets or application code are bundled.

## Preview

Open `index.html`, or serve this directory locally:

    python -m http.server 4173 --bind 127.0.0.1

Visit http://127.0.0.1:4173. No build step or runtime dependencies are required.

## Structure

- `index.html`: opening achievements, Outside Agents experience, two associated animation strips, education/projects, and contact links.
- `styles.css`: responsive layout, dashboard charts, output controls, and readable foreground panels.
- `workshop.js`: canvas sprites, randomized data rain, three dashboard cycles, and interactive nudge examples.
- `assets/luke-leonard-resume.pdf`: original résumé with phone number permanently redacted and document metadata removed; source PDF unchanged.

The typing/funnel scene accompanies personalized feedback. The sculpting/switch scene follows the dashboard description. HTML outputs are children of their corresponding scene anchors so scrolling cannot detach them. Both scene strips extend across the page rather than sitting in a separate split-screen panel.

## Animation and controls

- Rain uses the browser's cryptographic random source. Numeric streams contain exactly 8 digits. Other streams show 30 invented field names and fictional JSON snippets. Changes are staggered, brightness fades smoothly, and only 25% of streams route toward the funnel.
- Four sliding, inspectable conveyor boxes represent Top Performers, Advanced users, Intermediate users, and New users. Three fictional people per group provide 12 nudge examples.
- Hover or keyboard focus reveals feedback; click/tap pins or closes it. The close button and Escape dismiss it. Packet travel and output assignments remain stable while the visitor inspects them. Nudge text appears in one fixed, centered panel above the conveyor; its position does not follow the box.
- A second ME approaches during seconds 0–6 of an 18-second cycle, checks feedback during seconds 6–13 (automatically revealing a nudge), and returns during seconds 13–18.
- Dashboard cycles remain 20 seconds: sculpt 0–7, walk 7–9, flip 9–10, inspect 10–17, switch off 17–18, return 18–20. Three examples cover seasonal history, group performance, and cohort membership.
- Pause freezes time. Reduced motion starts still. Hidden tabs suspend animation. Scrolling and resizing update scene alignment without advancing paused time.

## Fictional data checks

Seasonal totals: $202k in 2024 and $244k in 2025, up 20.8%. Aug 11 to Sep 1 is 21 days. Jan–Mar sales: $100k to $135k, up 35%; group totals reconcile. Cohort membership: 120 + 360 + 480 + 240 = 1,200. Gloria's $24k versus the Advanced users average of $20k is +20%. Comparisons do not establish causation; historical patterns do not guarantee future results.

## Verification

Microsoft Edge desktop and mobile layouts were inspected. Automated browser checks cover all dashboard stages, pause/resume, hidden-tab suspension, reduced motion, keyboard navigation, hover and tap controls, twelve rotating names, random string lengths/ASCII characters, scrolling alignment, phone overflow, local assets and PDF download, and GitHub Pages project-subpath support. Dashboard content was checked for footer overlap at 320, 390, 600, 768, 1024, and 1440 pixels. No external runtime requests or browser errors were observed.

## Hosting

This is a standalone static site for GitHub Pages. Publish the main branch root; relative asset paths also support project URLs. `.nojekyll` avoids unnecessary processing.

There is no backend, tracking, API key, contact-form service, or live company connection. The repository contains only the portfolio source, original graphics, fictional examples, and a public resume copy.
