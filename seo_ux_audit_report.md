# Comprehensive SEO & UX Audit + Agent Implementation Sheet
**Target Website:** `https://www.marstersdigital.com`  
**Business Location:** Otley, West Yorkshire (LS21) — Serving Wharfedale, Ilkley, Harrogate & Yorkshire  
**Document Purpose:** Direct Execution Specification for Web Developer / AI Coding Agent  
**Audit Date:** October 2026  

---

## 1. Executive Summary & Core Diagnosis

Marsters Digital has a strong visual identity, clear positioning against bloated template agencies, and fast-loading static/bespoke architecture. However, our live crawl and Google index inspection revealed **two critical bottlenecks** holding back both conversions and local rankings:

1. **Homepage Redundancy & Scroll Fatigue (Your Intuition Confirmed):**  
   Your instinct that there are too many sections on the homepage is **100% accurate**. Specifically, the core value proposition (*100% Bespoke Builds*, *Dedicated Account Manager*, *Zero Hidden Fees*) is repeated **four separate times** on the homepage (in the Hero badges, the Elliot Marsters feature block, the "Why Marsters Digital" text block, and the numeric stat counters). This creates unnecessary vertical bloat, dilutes impact, and forces prospective clients to scroll past repetitive text before seeing your portfolio or inquiring.
2. **Severe URL & Protocol Fragmentation in Google's Index:**  
   A live check of Google's index (`site:marstersdigital.com`) shows Google indexing **four conflicting variations** of your site simultaneously:
   * `https://www.marstersdigital.com/` (`https` + `www`)
   * `https://marstersdigital.com/web-design` (`https` + `non-www`)
   * `http://www.marstersdigital.com/brand-identity` (`http` insecure + `www`)
   * `https://marstersdigital.com/portfolio.html` (`.html` suffix exposed alongside extensionless slugs)

### Audit Health Scorecard

| Audit Pillar | Score | Status | Priority Action for Agent |
| :--- | :--- | :--- | :--- |
| **Homepage UX & Section Flow** | **6.2 / 10** | Cluttered / Repetitive | Consolidate 7 sections into 5; remove 3x duplicate value-prop blocks. |
| **Technical SEO & Indexing** | **5.8 / 10** | Critical Split Equity | Force single canonical domain (`https://www.`) and strip `.html` extensions. |
| **On-Page SEO & Headings** | **6.8 / 10** | Needs Keyword Alignment | Include primary service + location keywords inside the semantic `<h1>`. |
| **Local SEO & Schema Markup** | **6.0 / 10** | Incomplete Signals | Inject `ProfessionalService` JSON-LD schema; add clickable phone number. |
| **Conversion Rate Optimization** | **7.2 / 10** | Solid Foundation | Add client quotes to portfolio cards; verify "Jagwar" spelling; tighten CTAs. |

---

## 2. Homepage UX Overhaul: Fixing the "Too Many Sections" Problem

### 2.1. Current Homepage Map (What Causes the Bloat)

Right now, a visitor scrolling down `www.marstersdigital.com` encounters **7 sections**, with massive message duplication across Sections 1, 2, and 5:

1. **Section 1 — Hero Banner:**  
   H1 (*"Websites built around your business, not a template."*), subcopy, CTA, plus **3 Trust Pills**: `100% Bespoke Builds` | `Dedicated Account Manager` | `Zero Hidden Fees`.
2. **Section 2 — Founder Card + Feature List (REDUNDANT):**  
   Shows `Elliot Marsters — Marsters Digital` alongside the **exact same 3 points**: `Bespoke Code & Design`, `Dedicated Account Manager`, `Zero Hidden Fees`.
3. **Section 3 — What We Do (Services Grid):**  
   4 cards: *Web Design & Development*, *Brand & Logo Identity*, *Managed Hosting & Care*, *IT & Technical Consulting*.
4. **Section 4 — Recent Work (Portfolio Preview):**  
   2 case study cards: *Harrogate Jagwar Specialists* and *Ellavate Dogs*.
5. **Section 5 — Why Marsters Digital + Stat Counters (REDUNDANT x2):**  
   Repeats the **exact same 3 points a third time** (*Transparent pricing, agreed upfront*, *Your account manager answers*, *We're here after launch*) and then repeats them a **fourth time** as big numbers (`<2h` response time, `100%` bespoke builds, `0` hidden fees).
6. **Section 6 — Bottom CTA Banner:**  
   *"Ready to build something bespoke?"* with two buttons (*Start Your Project*, *Explore Services*).
7. **Section 7 — Footer:**  
   Navigation links, email, and location details.

### 2.2. Target 5-Section Blueprint (Handover Instructions for Agent)

**Instruction to Agent:** Refactor `index.html` from 7 sections down to **5 focused, zero-repetition sections** in the exact order below:

```
┌──────────────────────────────────────────────────────────────────────────┐
│ SECTION 1: High-Impact Hero (Discovery & Immediate Clarity)              │
│ - Semantic H1 combining Service + Location + Hook                        │
│ - Primary CTA ("Start Your Project") + Secondary ("View Our Work" anchor)│
│ - Keep the 3 compact trust badges beneath the CTA                        │
│ - ACTION: Remove the standalone Section 2 feature list right below this! │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ SECTION 2: Recent Work / Portfolio Proof (Moved UP Above Services!)      │
│ - Move "Recent Work" directly under the Hero so visitors immediately see │
│   visual proof of what "bespoke" looks like                              │
│ - Display Harrogate Jaguar Specialists & Ellavate Dogs                   │
│ - Add a 1-sentence client testimonial/outcome metric to each card        │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ SECTION 3: What We Do (Core Services Grid)                               │
│ - Keep the 4 clean service cards linking to:                             │
│   /web-design, /brand-identity, /managed-hosting, /it-consulting         │
│ - Remove generic "Explore" link text; use descriptive anchor text        │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ SECTION 4: Meet Your Partner (Merged Founder + "Why Us" + 3 Stat Numbers)│
│ - Merge the Elliot Marsters founder visual (from old Section 2) with     │
│   the <2h / 100% / £0 stat counters (from old Section 5)                 │
│ - DELETE the duplicate 3-bullet feature lists from old Sections 2 & 5    │
│ - Position this around personal accountability: working 1-on-1 with      │
│   Elliot in Otley & Yorkshire                                            │
└──────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
┌──────────────────────────────────────────────────────────────────────────┐
│ SECTION 5: High-Conversion CTA Banner & Footer                           │
│ - Single primary action: "Start Your Project" (remove competing          │
│   "Explore Services" button at the very bottom of the page)              │
│ - Include direct click-to-call phone number and email                    │
└──────────────────────────────────────────────────────────────────────────┘
```

### 2.3. Specific Homepage Cleanup Tasks for Agent

* **Task UX-1 (Delete Duplicate Section 2 Feature List):** Remove the 3-bullet feature list (*Bespoke Code & Design*, *Dedicated Account Manager*, *Zero Hidden Fees*) that sits immediately below the Hero. Relocate the `Elliot Marsters — Marsters Digital` founder photo/card into Section 4 ("Why Marsters Digital").
* **Task UX-2 (Promote Portfolio to Section 2):** Swap the order of `What We Do` and `Recent Work`. Business owners visiting a web design studio want to judge the visual quality of your websites immediately after reading the hero statement.
* **Task UX-3 (Condense Section 5 "Why Marsters Digital"):** Inside `Why Marsters Digital`, keep the section headline, integrate the Elliot Marsters founder profile, and keep the 3 stat counters (`<2h`, `100%`, `0`), **or** the 3 short cards—**not both** on top of the hero badges.
* **Task UX-4 (Fix Generic "Explore" Anchor Links):** In the `What We Do` cards, change the four identical `Explore` links to descriptive, SEO-friendly anchor text (or keep `Explore` visually while adding descriptive text):
  * `Explore Web Design →`
  * `Explore Brand Identity →`
  * `Explore Hosting & Care →`
  * `Explore IT Consulting →`
* **Task UX-5 (Remove Secondary Exit Link in Final CTA):** In the bottom banner (*"Ready to build something bespoke?"*), remove the secondary `Explore Services` button. When a user reaches the bottom of the page, they have already scrolled past the services—give them one clear action: `Start Your Project`.

---

## 3. Technical SEO Fixes (Critical Priority)

### 3.1. Fix Protocol, Subdomain, and `.html` URL Fragmentation

**Finding:** Google currently indexes `http://`, `https://`, `www.`, `non-www`, and `.html` file extensions across the domain:
* `http://www.marstersdigital.com/brand-identity` (Indexed as insecure HTTP)
* `https://marstersdigital.com/web-design` (Indexed without `www`)
* `https://marstersdigital.com/portfolio.html` (Indexed without `www` and with `.html`)
* `https://www.marstersdigital.com/` (Indexed with `https` and `www`)

**Agent Execution Steps:**
1. **Enforce Single Canonical Host (`https://www.marstersdigital.com`):**  
   Configure Cloudflare Page Rules / Redirect Rules, Netlify/Vercel `_redirects`, or `.htaccess` so that all `http://` and `https://marstersdigital.com` requests 301 redirect in a single hop to `https://www.marstersdigital.com`.
2. **Strip `.html` Extensions Globally:**  
   * Audit every `<a href="...">` tag across all HTML templates and replace `/portfolio.html`, `/contact.html`, `/about.html`, `/services.html`, or `/index.html` with clean extensionless paths (`/portfolio`, `/contact`, `/about`, `/services`, `/`).
   * Add a 301 redirect rule stripping `.html` from any incoming request so `https://marstersdigital.com/portfolio.html` permanently redirects to `https://www.marstersdigital.com/portfolio`.
3. **Add Self-Referencing Canonical Tags on Every Page:**  
   Ensure every page has an exact, clean `<link rel="canonical">` tag in the `<head>`:
   ```html
   <!-- Homepage -->
   <link rel="canonical" href="https://www.marstersdigital.com/" />
   <!-- Portfolio -->
   <link rel="canonical" href="https://www.marstersdigital.com/portfolio" />
   <!-- Web Design -->
   <link rel="canonical" href="https://www.marstersdigital.com/web-design" />
   <!-- Brand Identity -->
   <link rel="canonical" href="https://www.marstersdigital.com/brand-identity" />
   <!-- Managed Hosting -->
   <link rel="canonical" href="https://www.marstersdigital.com/managed-hosting" />
   <!-- IT Consulting -->
   <link rel="canonical" href="https://www.marstersdigital.com/it-consulting" />
   <!-- About -->
   <link rel="canonical" href="https://www.marstersdigital.com/about" />
   <!-- Contact -->
   <link rel="canonical" href="https://www.marstersdigital.com/contact" />
   ```

### 3.2. XML Sitemap & `robots.txt` Hygiene

**Agent Execution Steps:**
1. Generate or update `/sitemap.xml` so it lists **only** the canonical `https://www.marstersdigital.com/...` URLs without `.html` extensions.
2. Verify `/robots.txt` contains:
   ```text
   User-agent: *
   Allow: /

   Sitemap: https://www.marstersdigital.com/sitemap.xml
   ```

---

## 4. On-Page SEO, Copy & Keyword Optimization

### 4.1. Homepage Heading (`<h1>`) & Eyebrow Optimization

* **Current Setup:**
  * Eyebrow text: `Bespoke Digital Solutions`
  * `<h1>`: `Websites built around your business, not a template.`
* **SEO Issue:** Your `<h1>` has great persuasive rhythm, but contains zero target geographic keywords (`Otley`, `Wharfedale`, `Yorkshire`) and doesn't include the high-volume search phrase `Web Design`. Meanwhile, the eyebrow uses the vague term `Digital Solutions`.
* **Agent Fix (Semantic `<h1>` Wrapper):**  
  Wrap the eyebrow inside the `<h1>` tag with a specific local keyword phrase so search engines read the full semantic heading while preserving your visual design:
  ```html
  <h1>
    <span class="hero-eyebrow">Bespoke Web Design in Otley, Wharfedale &amp; Yorkshire</span>
    Websites built around your business, not a template.
  </h1>
  ```

### 4.2. Meta Title & Meta Description Specifications

**Instruction to Agent:** Update the `<title>` and `<meta name="description">` tags across core pages to prevent brand-name duplication in Google SERPs and maximize local click-through rates (CTR):

| Page URL | Recommended `<title>` (50–60 chars) | Recommended `<meta name="description">` (140–155 chars) |
| :--- | :--- | :--- |
| `/` (Home) | `Bespoke Web Design Otley, Harrogate & Yorkshire \| Marsters Digital` | `Bespoke web design, Shopify stores, branding & managed hosting in Otley, Wharfedale & Yorkshire. 1-on-1 account management and fixed transparent pricing.` |
| `/web-design` | `Bespoke Web Design & Shopify Development \| Marsters Digital` | `Custom-coded websites and high-converting Shopify stores built from scratch in Otley & Yorkshire. Fast mobile performance, SEO-ready, zero templates.` |
| `/brand-identity` | `Brand Identity & Logo Design in Yorkshire \| Marsters Digital` | `Complete logo suites, master vector files, colour palettes and brand guidelines for independent businesses across Otley, Harrogate and Yorkshire.` |
| `/managed-hosting` | `Managed Website Hosting & Care Plans \| Marsters Digital` | `Fast cloud hosting, SSL security, daily backups and 30 minutes of monthly website updates included. Hassle-free website care in Yorkshire.` |
| `/it-consulting` | `Small Business IT & Technical Consulting Otley \| Marsters Digital` | `Business email setup, domain & DNS management, software migrations and jargon-free IT support for independent businesses across Wharfedale & Yorkshire.` |
| `/portfolio` | `Web Design Portfolio & Yorkshire Case Studies \| Marsters Digital` | `See recent bespoke websites designed and built by Marsters Digital for independent businesses across Harrogate, Otley, Yorkshire and the UK.` |
| `/contact` | `Contact Marsters Digital \| Web Design Studio in Otley (LS21)` | `Start your project with Marsters Digital in Otley, West Yorkshire. Speak directly with your dedicated account manager and receive a fixed quote within 24h.` |

### 4.3. Content & Proof Check: "Harrogate Jagwar Specialists"

* **Finding on Live Homepage:**  
  In the Recent Work section, the category tag reads: `Jaguar Specialist • Harrogate`, while the project title immediately below it is spelled: **`Harrogate Jagwar Specialists`**.
* **Action Required:**  
  Verify whether the client's trading name is intentionally spelled `"Jagwar"` or if this is a typo for **`Harrogate Jaguar Specialists`**. If it is a typo, correct it across the homepage, `/portfolio`, and image `alt` attributes immediately, as prospective clients scrutinize agency portfolios for attention to detail.

---

## 5. Local SEO & Structured Data (JSON-LD)

### 5.1. Inject `ProfessionalService` / `LocalBusiness` Schema

**Instruction to Agent:** Place the following complete, validated JSON-LD structured data script inside the `<head>` of the homepage (`/`). *(Replace the placeholder phone number and verify the logo path before deployment).*

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.marstersdigital.com/#organization",
  "name": "Marsters Digital",
  "url": "https://www.marstersdigital.com/",
  "logo": "https://www.marstersdigital.com/assets/logo.png",
  "image": "https://www.marstersdigital.com/assets/og-image.jpg",
  "description": "Bespoke web design, brand identity, managed hosting and IT consulting for independent businesses across Otley, Ilkley, Harrogate, Wharfedale, and North & West Yorkshire.",
  "email": "info@marstersdigital.com",
  "telephone": "+44-XXXXXXXXXX",
  "priceRange": "££",
  "founder": {
    "@type": "Person",
    "name": "Elliot Marsters",
    "jobTitle": "Founder & Account Manager"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Otley",
    "addressRegion": "West Yorkshire",
    "postalCode": "LS21",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.9056,
    "longitude": -1.6934
  },
  "areaServed": [
    { "@type": "City", "name": "Otley" },
    { "@type": "City", "name": "Ilkley" },
    { "@type": "City", "name": "Harrogate" },
    { "@type": "City", "name": "Leeds" },
    { "@type": "AdministrativeArea", "name": "Wharfedale" },
    { "@type": "AdministrativeArea", "name": "West Yorkshire" },
    { "@type": "AdministrativeArea", "name": "North Yorkshire" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital & Web Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bespoke Web Design & Development",
          "url": "https://www.marstersdigital.com/web-design"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Brand & Logo Identity",
          "url": "https://www.marstersdigital.com/brand-identity"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Managed Hosting & Care",
          "url": "https://www.marstersdigital.com/managed-hosting"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "IT & Technical Consulting",
          "url": "https://www.marstersdigital.com/it-consulting"
        }
      }
    ]
  }
}
</script>
```

### 5.2. NAP (Name, Address, Phone) & Trust Signals

* **Finding:** Currently, the footer lists `info@marstersdigital.com` and `Otley, West Yorkshire (LS21)`, but there is **no phone number** visible on the site.
* **Why It Matters:** Since a core selling point of Marsters Digital is *"Your account manager answers — No ticket queues, no call centres"*, displaying a direct phone number (or WhatsApp business click-to-chat link) reinforces that promise and strengthens Google Business Profile local pack rankings.
* **Agent Fix:** Add a clickable `<a href="tel:+44...">` link in the footer under `Get In Touch` and on the `/contact` page.

---

## 6. Master Execution Checklist for Agent

Hand this checklist directly to your agent and have them check off each item in order:

- [ ] **Step 1 (Homepage Consolidation):** Remove the duplicate 3-feature list in Section 2 of `index.html`. Merge the `Elliot Marsters` founder card with the `Why Marsters Digital` section and stat counters (`<2h`, `100%`, `0`) so the core value propositions are only stated clearly once in the hero pills and once in the "Why Us" section.
- [ ] **Step 2 (Section Reordering):** Move the `Recent Work` portfolio section directly above `What We Do` so visitors see live website designs immediately after the hero section.
- [ ] **Step 3 (URL & Protocol Canonicalization):** Configure 301 redirects forcing `http://` -> `https://`, `non-www` -> `www.marstersdigital.com`, and stripping `.html` extensions (e.g., `/portfolio.html` -> `/portfolio`).
- [ ] **Step 4 (Internal Link Cleanup):** Replace all internal `<a href="*.html">` links across all navigation menus, buttons, and footers with clean extensionless URLs.
- [ ] **Step 5 (Canonical Tags):** Add `<link rel="canonical" href="https://www.marstersdigital.com/...">` to the `<head>` of every page.
- [ ] **Step 6 (Semantic H1 & Meta Titles):** Update the homepage `<h1>` to include `Bespoke Web Design in Otley, Wharfedale & Yorkshire` as the eyebrow inside the `<h1>`, and apply the updated `<title>` and `<meta name="description">` tags from Section 4.2.
- [ ] **Step 7 (Schema & NAP):** Inject the `ProfessionalService` JSON-LD script into the homepage `<head>` and add a clickable telephone link to the footer and contact page.
- [ ] **Step 8 (Portfolio Copy & CTA Polish):** Verify/fix the `"Harrogate Jagwar Specialists"` spelling, replace generic `"Explore"` anchor text on service cards with specific labels, and remove the secondary `"Explore Services"` button from the final CTA banner.