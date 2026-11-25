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
Upload the whole `ArkClinic` folder to any static host (Netlify, Vercel, GitHub Pages, cPanel hosting).

**Demo form:** it is set up for **Netlify Forms** (works as-is there; requests appear in your Netlify dashboard).
On any other host, change the form's `action` in `index.html` to a form service URL (e.g. Formspree).

## Replace before going live
- Phone / WhatsApp: search for `201000000000`, `+20 100 000 0000`, `+20 2 0000 0000`
- Email: `hello@arkclinic.com`
- Office address: "Fifth Settlement, New Cairo"
- Key numbers (150+, 40K, 35%, 4.9) and the three reviews — these are placeholders
- Prices: 450 / 950 / 1,750 EGP
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
