PRD: Terminal-Style Developer Portfolio (using SRCL / www-sacred)

Summary

Build a fast, accessible, terminal-aesthetic portfolio for a software developer. Use SRCL (www-sacred) as the component/style foundation and Next.js for the app. SRCL supplies React components and styles designed for terminal UIs; we’ll adopt its patterns directly. ￼ ￼

Goals & KPIs
• Showcase projects, case studies, and skills with a distinctive terminal look
• Sub-1s Largest Contentful Paint on 4G emulation
• ≥95 Lighthouse Accessibility & Best Practices
• ≥2 CV downloads and ≥1 contact submission per 100 visits
• Fully keyboard navigable and screen-reader friendly

Out of Scope
• CMS authoring UI
• Multi-tenant support
• Comment system

Tech & Constraints
• Framework: Next.js (TypeScript)
• UI system: SRCL components and SCSS from www-sacred. Start from the template or copy components into a /ui folder while preserving SRCL class names and tokens. Dev bootstrap per SRCL’s README (npm install, npm run dev, default port 10000). ￼
• Hosting target: Vercel. ￼
• License: MIT for SRCL (keep LICENSE attribution). ￼

Information Architecture
• Home
• Projects
• Project Detail
• About
• Blog (optional)
• Contact
• Resume (PDF)
• 404

Terminal Aesthetic & UX Requirements
• Default dark theme: near-black background, high-contrast monospace type, thin rules, subtle scanline texture is optional
• Accent variants: neon-green, amber, or phosphor-blue; expose as a theme toggle
• Global keyboard shortcuts aligned with SRCL demo: Ctrl/Cmd+T toggles theme, Ctrl/Cmd+O cycles fonts, Ctrl/Cmd+G toggles grid overlay. ￼
• Type cursor blink on hero and input carets
• Focus rings always visible; no outline suppression
• Motion: minimal, 150–200ms ease-out; prefers-reduced-motion respected

SRCL Component Mapping

Use SRCL building blocks where possible (names reflect the SRCL demo taxonomy).
• Navigation: Action Bar for top nav and quick actions; include theme/font/grid toggles. ￼
• Home: Cards for feature panels; Buttons and Button Group for CTAs; Bar Loader for lazy content
• Projects: Cards in responsive grid; Breadcrumbs in detail views; Badges for tech tags; Accordion for “tech stack / challenges / outcomes”
• Forms: Input + Form for contact; Checkbox for consent; Alert Banner for success/error
• Content: Avatars for author; Blog Post layout for longform case studies; Empty State for no results
• Feedback: Block Loader for inline async states

Pages & Acceptance Criteria

Home
• Hero line prints with typing effect and blinking caret
• Two primary CTAs: View Projects, Download Resume
• Snapshot of 3 featured projects pulled from local data
• Uses Action Bar, Cards, Buttons

Acceptance:
• Typing effect stops after one pass, caret continues blinking
• All CTAs keyboard reachable in 5 tabs or fewer

Projects
• Filter by category/tech via Action List
• Sort by date and impact
• Grid of Cards; each card shows title, brief, tech Badges, and a “read” Button

Acceptance:
• Filtering updates URL query; page is shareable
• 12-col responsive grid; 1/2/3 cols at ≤640/≤1024/>1024 px

Project Detail
• Breadcrumbs: Projects > {Project}
• Hero Card with repo/demo links, role, timeline, stack
• Sections: Overview, Problem, Approach, Results, Gallery
• Optional code snippets styled as terminal

Acceptance:
• In-page nav reflects scroll position
• All external links show icon + open in new tab

About
• Short bio, skills matrix, timeline
• Avatar + “terminal prompt” block with contact instructions

Acceptance:
• Skills rendered as Action List items grouped alphabetically and by proficiency percentage when provided

Blog (optional)
• Index with excerpts
• Post template uses Blog Post structure

Acceptance:
• RSS at /rss.xml

Contact
• Form: name, email, message, consent checkbox
• Serverless handler sends email and returns JSON; Alert Banner renders success/error

Acceptance:
• Honeypot field; rejects submissions in <3 seconds

Resume
• Button: Download PDF
• Server route streams /public/resume.pdf

Acceptance:
• File size <1.5MB; has selectable text

404
• Big monospace “command not found” with a prompt to go home

Content Model (local JSON or TS)
• Project: id, slug, title, summary, tech[], dateStart, dateEnd, impactScore, links{repo, demo}, images[], sections{overview, problem, approach, results}
• Post: id, slug, title, excerpt, body, date, tags[]

Routing
• / Home
• /projects list with filter params
• /projects/[slug]
• /about
• /blog and /blog/[slug]
• /contact
• /resume

SEO
• Next SEO config per route: title templates, meta description, canonical
• Open Graph images generated for Projects and Posts
• Sitemap at /sitemap.xml, robots.txt allowlist
• JSON-LD for Person and Article

Accessibility
• Semantic landmarks
• 3:1 minimum contrast for non-text UI; 4.5:1 for text
• Skip-to-content link visible on focus
• Inputs have visible labels; error text uses Alert Banner
• Keyboard shortcuts do not override native browser shortcuts

Performance
• Ship only SRCL styles used by the app; tree-shake any optional modules
• Prefer static assets and SSG for all non-contact routes
• Font-loading: system monospace first, then preferred monospace with font-display: swap
• Images pre-sized, lazy-loaded, AVIF/WEBP where supported

Analytics & Telemetry
• Vercel Analytics or Plausible
• Track: CTA clicks, resume downloads, contact submissions

Security & Privacy
• No PII persisted server-side
• Rate-limit contact endpoint; CAPTCHA optional
• CSP with script/style nonces; no inline event handlers

Setup Notes for AI IDE
• Start from SRCL template or copy /components and global.scss so the terminal aesthetic stays intact; dev commands from README (npm install, npm run dev, http://localhost:10000). ￼
• Implement keyboard toggles matching SRCL demo header: fonts/theme/grid. ￼
• Deploy on Vercel, keep MIT license for SRCL in repo. ￼

Definition of Done
• All pages implemented and linked from Action Bar
• Lighthouse: PWA not required; A11y/Best Practices/SEO ≥95 on mobile
• Axe scan: zero serious/critical issues
• Works on latest Safari/Chrome/Firefox + iOS/Android browsers
• Theming and keyboard toggles function globally
• Projects data driven; adding one JSON/TS entry auto-renders card and page

If you want, I can generate the initial project structure and stub data next.
