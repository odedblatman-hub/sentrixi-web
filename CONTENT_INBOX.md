# AEGIS Content Inbox
## How Oded sends updates from iPhone → Production

This file is the handoff layer between Claude.ai (iPhone) and Claude Code (desktop).

---

## HOW IT WORKS

1. **You speak to Claude.ai on iPhone** — describe the change you want
2. **Claude.ai generates** the change (copy, design direction, or updated JSX section)
3. **Two paths to deploy:**
   - **Path A (via Claude Code):** Paste the Claude.ai output here under `## PENDING CHANGES` → save → open Claude Code session → say "process inbox"
   - **Path B (via webhook):** Oded sends a POST to `/api/aegis-command` with security code `0102` → GitHub issue is created → Claude Code picks it up

---

## SECURITY CODE

**Voice deploy authentication: `0102`**

Use this in the webhook call:
```json
POST https://sentrixi.com/api/aegis-command
{
  "code": "0102",
  "command": "Update the hero headline to: X. Change the subtitle to: Y.",
  "priority": "normal"
}
```

---

## PENDING CHANGES

<!-- Paste Claude.ai output here. Claude Code reads this and implements. -->
<!-- Format: each change as a numbered item with type and description -->

_(empty — no pending changes)_

---

## CHANGE LOG

| Date | Change | Status |
|------|--------|--------|
| 2026-04-24 | Initial setup | ✅ |

---

## QUICK REFERENCE — WHAT CLAUDE CODE CAN DO

When you say "process inbox" in a new Claude Code session:
- Update text, headlines, stats, CTAs
- Add/remove sections
- Swap video src when files arrive in `public/videos/`
- Update pricing
- Add new use case cards
- Modify the design (colors, layout, animations)
- Deploy to production (git push → Vercel auto-deploys)

---

## VIDEO INSTRUCTIONS

When you drop video files into `public/videos/`:
- Shield product video → name it `shield-overview.mp4`
- Sentinel product video → name it `sentinel-overview.mp4`

Then tell Claude Code: "wire up the videos" and it will update the VideoPlayer `src` props automatically.

---

## CLAUDE.AI PROMPT TEMPLATE (for iPhone voice)

Tell Claude.ai:
> "I'm updating the Sentrixi website. Security code 0102. I want to [describe change]. Format the output as a AEGIS Content Inbox entry."

Claude.ai will produce a structured entry you can paste here.
