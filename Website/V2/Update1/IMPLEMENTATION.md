# Sentrixi Website Upgrade — Implementation Guide

## Files Delivered
- `homepage.jsx` → `app/page.jsx`
- `shield.jsx`   → `app/shield/page.jsx`
- `sentinel.jsx` → `app/sentinel/page.jsx`

---

## 1. Folder Structure

```
app/
├── page.jsx              ← homepage.jsx (rename)
├── shield/
│   └── page.jsx          ← shield.jsx (rename)
└── sentinel/
    └── page.jsx          ← sentinel.jsx (rename)
```

---

## 2. Fonts — Add to app/layout.jsx

```jsx
import { DM_Serif_Display, IBM_Plex_Sans } from "next/font/google";

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif-display",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${ibmPlex.variable}`}>
      <body style={{ margin: 0, padding: 0, background: "#04080f" }}>
        {children}
      </body>
    </html>
  );
}
```

---

## 3. Add "use client" at top of all three files
All three pages use `useState` and `useEffect`, so they must be Client Components.
Each file already has `"use client";` at the top — keep this.

---

## 4. Email Routing
All forms currently open `mailto:register@sentrixi.com` via `window.open`.

**Upgrade path (recommended):**
- Add a `/api/contact` route using Next.js API routes
- Send via Resend, SendGrid, or Postmark
- Use `register@sentrixi.com` as the recipient
- This removes the dependency on the user's email client

**Quick placeholder API route:**
```js
// app/api/contact/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  // Add your email send logic here (Resend, SendGrid, etc.)
  console.log("New lead:", body);
  return NextResponse.json({ ok: true });
}
```

---

## 5. Critical Fixes from Audit

| Fix | Location | Notes |
|-----|----------|-------|
| Broken `0%` hero stats | Old homepage | Replaced with real, static values |
| `odedblatman@gmail.com` exposed | Old homepage | Replaced with `register@sentrixi.com` throughout |
| "Early Access" framing | Old homepage | Replaced with "Now in limited deployment" |
| No og:image | layout.jsx | Add in metadata export |

---

## 6. Add OG Metadata (app/layout.jsx or per-page)

```js
// In each page file, add:
export const metadata = {
  title: "AEGIS Shield — AI-Native Database Security | Sentrixi",
  description: "Real-time behavioral detection inside your database engine. Built for CISOs and CTOs in regulated environments.",
  openGraph: {
    title: "AEGIS Shield — Sentrixi",
    description: "Detect threats at the query layer. Zero ETL. Sub-second latency.",
    url: "https://sentrixi.com/shield",
    siteName: "Sentrixi",
    images: [{ url: "https://sentrixi.com/og-shield.png", width: 1200, height: 630 }],
  },
};
```

---

## 7. Routing Verification

After deploying, test:
- `sentrixi.com` → Homepage router (two product cards)
- `sentrixi.com/shield` → Shield page (CISO/CTO audience)
- `sentrixi.com/sentinel` → Sentinel page (vendor + enterprise)

---

## 8. Next Upgrades (Phase 2)

1. **Replace mailto with API route** — highest priority for lead tracking
2. **Add Calendly embed** on Shield page below the form
3. **Add analytics** (Posthog or Mixpanel) to track which audience toggle is selected on Sentinel
4. **Add LinkedIn Insight Tag** — most enterprise buyers come via LinkedIn
5. **Create `/partner` dedicated landing page** — for outbound vendor outreach campaigns
