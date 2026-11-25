# ArkClinic — static website

Plain HTML + CSS (plus one tiny script for the English/Arabic switch). No build step.

## Pages
| File | What it is |
|---|---|
| `index.html` | Welcome page: hero, features, how it works, key numbers, reviews, pricing, demo form, contact |
| `login.html` / `signup.html` | Log in and sign up (mockups: they open the dashboard) |
| `dashboard.html` | Today's schedule, WhatsApp link beside each patient, today's money, clinic setup menu |
| `finance.html` | Income vs expenses, cash / transfer / POS split, latest entries |
| `setup.html` | Clinic details, doctors, hours, services and prices, payment methods, WhatsApp templates |
| `thanks.html` | Shown after a demo request |

## Publish
Live on GitHub Pages: https://daliaroshdyarkdev-alt.github.io/arkclinic/
To publish a change: `git add .` → `git commit -m "what changed"` → `git push` (live about a minute later).

**Demo form:** sends requests to **Formspree**, which emails them to you. The form address is the
`action` of the demo form in `index.html` (`https://formspree.io/f/...`). Works on any static host.
If the stylesheet or script changes, bump the `?v=` number on their links so visitors get the new version.

## Replace before going live
- Contact (Talk to us) uses Arkdev details from arkdev.net: egypt@arkdev.net and the Heliopolis office. Arkdev's site lists no phone or WhatsApp number — add one to the Talk to us panel when you have it
- Support WhatsApp buttons inside the app pages still use the placeholder `201000000000`
- The three reviews (moving strip on the home page) — these are placeholders; use real quotes with permission
- Prices: 599 / 1,299 / 2,499 EGP a month (yearly 5,990 / 12,990 / 24,990); add-ons 199 per extra doctor, 599 per extra branch. Also in `signup.html`
- Promises in the **Privacy** section (encryption, daily backup, doctor-only notes, staff roles) and the
  **Switching is free** section (free data move, ready in 48 hours, training) — only keep what you really offer

## Arabic
Every text element has a `data-ar="..."` attribute with its Arabic version. Edit both when you change text.
The switch remembers the visitor's choice.

## Adding your photos later
Hero and login graphics are built from HTML cards (`.hero-art`). You can replace a `.hero-art` block with
`<img src="assets/img/your-photo.jpg" alt="...">`.

## Brand
- Logo: "Pulse swoosh" in the Arkdev ember gradient — `assets/img/logo.svg` (full, with "by Arkdev") and `assets/img/logo-mark.svg` (icon / favicon)
- Logo colors: `#7A140E` → `#C8281A` → `#E8571E` → `#F5A623`; wordmark in Poppins, "Clinic" in `#C8281A`
- Colors (in `assets/css/style.css`): warm white `#FAF8F4`, charcoal `#1F2228`, light royal blue `#EEF2FF`, royal blue `#3B5BDB`
- Fonts: Fraunces (headlines), Inter (text), IBM Plex Sans Arabic (Arabic)
