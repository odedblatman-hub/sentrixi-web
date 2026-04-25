# SENTRIXI / AEGIS — SESSION HANDOVER DOCUMENT
## For continuation in a new Claude.ai or Claude Code session
**Updated:** April 24, 2026 (Session 3 — Update1 three-page architecture)
**Author:** Oded Blatman (working with Claude Code)

---

## HOW TO USE THIS DOCUMENT

**In Claude Code:** Just read this file. Memory system at `C:\Users\odedb\.claude\projects\C--Projects-sentrixi-aegis-final\memory\` has the full picture.

**In Claude.ai:** Paste below `---START CONTEXT---` as your first message, then upload the files you need.

---START CONTEXT---

## 1. WHO I AM

Oded Blatman. CIO & CISO at a NYDFS-regulated cryptocurrency custody firm (Fireblocks). 15+ years in regulated financial services security across 30+ global regions. Built a 20-agent AI behavioral detection and DFIR investigation platform (UBAD) used in active operations against organized cybercrime. Founder of Sentrixi.

---

## 2. WHAT SENTRIXI IS

Sentrixi is a pre-revenue cybersecurity startup. The core product is **AEGIS** — a database-layer behavioral security platform that detects insider threats, credential misuse, and data exfiltration at the query layer in real time (<20ms detection latency).

**Two-tier product architecture:**
- **AEGIS Shield (Tier 1):** Database-native security — real-time behavioral detection, anomaly scoring, query-level monitoring embedded directly into the database platform as an API-native sidecar. Zero production latency impact.
- **AEGIS Sentinel (Tier 2):** Full enterprise SIEM/security data lake — ingests all security logs (EDR, Cloud, Firewall, Identity) into the database, transforms it into a real-time autonomous SOC with 30+ specialist AI agents.

**Core thesis:** "The database layer is the last unprotected frontier in the enterprise security stack."

**GTM model:** OEM-first through database vendors (primarily SingleStore).

---

## 3. SINGLESTORE CONTEXT

SingleStore is a PE-backed (Vector Capital) real-time database company.
- **Raj Verma** — CEO
- **Elmer Lai** — CFO, Oded's long-standing friend, primary negotiating counterpart
- **Kiran & Amish** — Vector Capital decision-makers

Oded is simultaneously negotiating a CIO/CISO/Head of AI executive role at SingleStore AND positioning Sentrixi as a $1M investment/JV opportunity.

---

## 4. CURRENT LIVE STATE (as of Session 3)

### Infrastructure — ALL OPERATIONAL

| Component | Status | Details |
|-----------|--------|---------|
| GitHub | ✅ Live | `odedblatman-hub/sentrixi-web` (personal account) |
| Vercel | ✅ Live | Project `aegis`, aliased to `sentrixi.com` |
| Domain | ✅ Live | `sentrixi.com` via Cloudflare DNS → Vercel |
| GA4 | ✅ Live | `G-ZN2JLELHY1` — `NEXT_PUBLIC_GA4_ID` env var set |
| Email (Brevo) | ✅ Live | `BREVO_API_KEY` set — sends from `register@sentrixi.com` to `odedblatman@gmail.com` |
| Slack alerts | ✅ Live | `SLACK_WEBHOOK_URL` set — `#aegis-leads` channel |
| Videos | ✅ Live | `public/videos/AEGIS_SHIELD.mp4` (4:40, 47MB), `AEGIS_SENTINEL.mp4` (~51MB) |
| Dashboards | ✅ Live | 6 PNGs in `public/dashboards/` |

### Site Architecture — Three-Page Structure (Update1)

```
sentrixi.com/           → Homepage router (two product cards → /shield, /sentinel)
sentrixi.com/shield     → AEGIS Shield page (CISO/CTO audience)
sentrixi.com/sentinel   → AEGIS Sentinel page (vendor + enterprise toggle)
```

All forms POSTs to `/api/contact` — NO more mailto links.

---

## 5. WHAT WAS BUILT — SESSION 3 (April 24, 2026 — Update1)

### 5A. Three-Page Restructure

Replaced single-page `SentrixiApp.jsx` app with three dedicated routes:

| File | Route | Audience |
|------|-------|----------|
| `app/page.jsx` | `/` | Homepage router — links to both products |
| `app/shield/page.jsx` | `/shield` | CISO/CTO — database protection |
| `app/sentinel/page.jsx` | `/sentinel` | Database vendors + enterprise SOC |

### 5B. Shield Page Sections
- Hero with 4-stat grid (<1s latency, 0 false positives, 90-day baseline, <15min deploy)
- Blind Spot problem section (3 gap cards)
- Architecture (6 feature cards)
- Kill Chain visualization
- Threat Scenarios accordion
- 3-tier Pricing (Starter/Professional/Enterprise)
- DemoForm → POST `/api/contact` `{type: "briefing"}`

### 5C. Sentinel Page Sections
- Hero with audience toggle ("Database Vendor" / "Enterprise SOC")
- Vendor Track: embed model, 4 benefit cards
- Enterprise Track: AI agent teams grid (30+ agents)
- Integrations strip
- Competitive differentiators (4 cards)
- Consumption pricing + cost comparison vs legacy SIEM
- DualForm → POST `/api/contact` `{type: "partner"}` (vendor) or `{type: "briefing"}` (enterprise)

### 5D. Font System
- `next/font/google` replaces `<link>` tag
- `DM_Serif_Display` → CSS var `--font-serif-display`
- `IBM_Plex_Sans` → CSS var `--font-sans`
- Both injected via `className` on `<html>` in `app/layout.tsx`

### 5E. Known Issues Fixed This Session
- **BOM encoding bug** — `echo "value" | vercel env add` prepends `﻿` (Windows BOM), breaking Brevo/Slack calls with `TypeError: Cannot convert argument to a ByteString (char 65279)`. Fix: always use `printf '%s' 'value' | vercel env add KEY production`
- **React 19 peer deps** — `.npmrc` has `legacy-peer-deps=true`; `vercel.json` uses `npm install --legacy-peer-deps` as installCommand
- **`metadata` export in client components** — Next.js 16 forbids `export const metadata` in `"use client"` files. Removed from shield/page.jsx and sentinel/page.jsx; global metadata lives in `layout.tsx`

---

## 6. ENVIRONMENT VARIABLES (Vercel Production)

| Variable | Value | Notes |
|----------|-------|-------|
| `AEGIS_SECURITY_CODE` | `0102` | iPhone webhook auth code |
| `BREVO_API_KEY` | `xkeysib-ab7...` | Transactional email |
| `CONTACT_NOTIFY_EMAIL` | `odedblatman@gmail.com` | Lead notification recipient |
| `GITHUB_TOKEN` | `ghp_bdle6AU0...` | PAT for webhook-triggered GitHub issues |
| `GITHUB_REPO` | `odedblatman-hub/sentrixi-web` | |
| `NEXT_PUBLIC_GA4_ID` | `G-ZN2JLELHY1` | Client-side GA4 |
| `SLACK_WEBHOOK_URL` | `hooks.slack.com/services/T06F...` | Lead alerts |

**CRITICAL:** Add env vars with `printf`, never `echo`:
```bash
printf '%s' 'YOUR_VALUE' | vercel env add KEY_NAME production
```

---

## 7. KEY FILES & PATHS

### Next.js Project
`C:\Projects\sentrixi-aegis-final\sentrixi-aegis\`

```
app/
├── layout.tsx              ← global metadata, fonts (DM Serif + IBM Plex), GA4
├── page.jsx                ← homepage router (two product cards)
├── shield/page.jsx         ← Shield product page
├── sentinel/page.jsx       ← Sentinel product page
└── api/
    ├── contact/route.ts    ← lead capture → Brevo email + Slack notification
    └── aegis-command/route.ts  ← iPhone webhook (code: "0102")
public/
├── videos/
│   ├── AEGIS_SHIELD.mp4    ← 4:40 trimmed, 47MB
│   └── AEGIS_SENTINEL.mp4  ← ~51MB
└── dashboards/
    ├── AEGIS_01_SOC_Executive_Dashboard.png
    ├── AEGIS_02_Kill_Chain_Process_Compromise.png
    ├── AEGIS_03_Guardian_Response_Console.png
    ├── AEGIS_04_Agent_Fleet_30_Agents.png
    ├── AEGIS_05_Forensic_Report.png
    └── AEGIS_06_LOTL_Attack_Simulation.png
.npmrc                      ← legacy-peer-deps=true (React 19 / three.js fix)
vercel.json                 ← installCommand: npm install --legacy-peer-deps
```

### Website Design Sources
`C:\Projects\sentrixi-aegis-final\Website\V2\`
- `Update1/` — source files for three-page restructure
- `Update1/IMPLEMENTATION.md` — instructions (already implemented)
- Dashboard HTMLs + PNGs (originals)
- This handover doc

### ffmpeg (for video editing)
`C:\Users\odedb\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1-full_build\bin\ffmpeg.exe`
- NOT in PATH — use full path in PowerShell
- Trim command: `ffmpeg -i input.mp4 -t HH:MM:SS -c copy output.mp4 -y`

---

## 8. DEPLOY WORKFLOW

```bash
# Standard deploy (from sentrixi-aegis directory):
git add <files>
git commit -m "feat: description"
git push origin main          # triggers Vercel auto-deploy
# OR force manual:
vercel --prod --yes
```

**Check deployment:**
```bash
vercel inspect <deployment-url> --logs
```

---

## 9. WHAT STILL NEEDS TO BE DONE (Phase 2)

### High Priority
1. **Calendly embed** on Shield page — below demo form
2. **Analytics toggle tracking** on Sentinel — track which audience (vendor/enterprise) is selected (Posthog or Mixpanel)
3. **LinkedIn Insight Tag** — enterprise buyers come via LinkedIn
4. **iOS Shortcut** — "AEGIS Update" → Siri → webhook → GitHub issue → Claude Code implements

### Medium Priority
5. **`/partner` dedicated landing page** — for outbound vendor outreach campaigns
6. **OG images** — `og-shield.png` and `og-sentinel.png` to `public/` (referenced in metadata but missing)
7. **Dashboard images wired into pages** — the 6 PNGs are in `public/dashboards/` but not rendered anywhere on the site yet

### iOS Shortcut Setup (when ready)
```
Name: AEGIS Update
1. Ask for Input → "What update?" → Dictate
2. POST to https://sentrixi.com/api/aegis-command
   Body: { "code": "0102", "command": [input], "priority": "normal" }
3. Show Alert → confirmation
```

---

## 10. DESIGN SYSTEM

- **Background:** `#04080f` (homepage/shield), `#050810` (sentinel)
- **Accent Shield:** `#00d4ff` (cyan)
- **Accent Sentinel:** `#f59e0b` (amber)
- **Body font:** `IBM Plex Sans` via `--font-sans`
- **Display font:** `DM Serif Display` via `--font-serif-display`
- **Grid overlay:** `rgba(0,210,255,0.03)` at 60px, `pointer-events: none`, `z-index: 0`
- **Tone:** CISO credibility — every claim needs architectural proof; minimal text per section

---END CONTEXT---
