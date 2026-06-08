# СПЕКТР

Mobile-first landing page for a waste-removal service in Sochi.

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

## What's inside

| Section | Highlights |
|---|---|
| **Hero** | Cinematic photo + Aurora drift, scramble headline, shimmer-spark CTA, pulsing phone button, floating glass stat cards, scroll cue |
| **Containers** | Scroll-driven 500vh sticky stack (8 → 36 м³), pointer-following spotlight, animated progress dots |
| **How it works** | Editorial light-cream spread, oversized "03" watermark, dashed line draws on scroll |
| **Stats** | Bloomberg-style rows, count-up via `useSpring`, slide-in dividers |
| **Reviews** | 3 cards, subtle always-on border beam, slide-in from the right |
| **Contact form** | Phone `+7 (XXX) XXX-XX-XX` mask, honeypot, in-memory rate-limit (3 req/min/IP), Telegram delivery, animated ✓ success |
| **Guarantee strip** | Forest-green band, 3 trust items |
| **Contacts** | WhatsApp / Telegram / Phone / Email cards with per-channel coloured border beam, footer |
| **Global** | Sticky bottom "Позвонить" bar, security headers, `prefers-reduced-motion` everywhere |

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Environment

The contact form posts to `/api/contact`, which forwards to a Telegram chat. Copy `.env.example` → `.env.local` and fill in:

```
TELEGRAM_BOT_TOKEN=   # from @BotFather
TELEGRAM_CHAT_ID=     # your chat id (e.g. via @userinfobot)
```

Without these the route returns 503 — by design, no secrets are hardcoded.

## Project layout

```
app/
  layout.tsx           # Manrope (variable, cyrillic), security viewport
  page.tsx             # composes the 8 sections
  api/contact/route.ts # rate-limit + honeypot + Telegram delivery
  globals.css          # design tokens (Tailwind v4 @theme), 21st-style keyframes
components/
  Hero, ContainersStack, HowItWorks, WhyUs,
  Reviews, ContactForm, Guarantee, Contacts,
  Header, StickyCallBar
  ui/  Aurora, ScrambleText, ShimmerButton, ScrollIndicator
lib/
  site.ts              # phone, address, channels — single source of truth
  images.ts            # Unsplash photo ids
next.config.ts         # remotePatterns (Unsplash), security headers
```

## Security headers (applied in `next.config.ts`)

`X-Frame-Options: DENY` · `X-Content-Type-Options: nosniff` · `Referrer-Policy: strict-origin-when-cross-origin` · `Permissions-Policy: camera=(), microphone=(), geolocation=()` · `poweredByHeader: false`
