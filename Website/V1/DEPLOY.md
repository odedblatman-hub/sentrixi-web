# Sentrixi Deployment Guide
## sentrixi.com — Step-by-step from zero to live

---

## Prerequisites

- Node.js 18+ installed ([nodejs.org](https://nodejs.org))
- Git installed ([git-scm.com](https://git-scm.com))
- A GitHub account
- Your domain: `sentrixi.com` registered (Namecheap, Cloudflare, GoDaddy, etc.)

---

## Step 1 — Set up the project folder

Open Terminal (Mac) or Command Prompt (Windows) and run:

```bash
# Create project folder
mkdir sentrixi-site
cd sentrixi-site

# Copy these files into this folder:
# - package.json
# - next.config.js
# - vercel.json
# - pages/_app.jsx
# - pages/index.jsx
# - components/SentrixiApp.jsx   ← rename sentrixi_full.jsx to this
# - public/favicon.svg
# - public/robots.txt
```

Your folder structure should look like this:

```
sentrixi-site/
├── components/
│   └── SentrixiApp.jsx       ← the main website file
├── pages/
│   ├── _app.jsx
│   └── index.jsx
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── next.config.js
├── package.json
└── vercel.json
```

---

## Step 2 — Add your GA4 Measurement ID

1. Go to [analytics.google.com](https://analytics.google.com)
2. Create a new property → Web → enter `sentrixi.com`
3. Copy your Measurement ID (looks like `G-XXXXXXXXXX`)
4. Open `pages/_app.jsx` and replace:
   ```js
   const GA4_ID = "G-XXXXXXXXXX";
   ```
   with your real ID.
5. Open `components/SentrixiApp.jsx` and do the same on line ~282:
   ```js
   const GA4_ID = "G-XXXXXXXXXX";
   ```

---

## Step 3 — Install dependencies & test locally

```bash
# Install packages
npm install

# Run locally to confirm everything works
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see the Sentrixi site.

Test all 4 pages (Home, Platform, About, Contact) and confirm:
- ✅ Logo renders correctly
- ✅ Incident timeline animates
- ✅ Constellation canvas draws
- ✅ Audience tabs switch
- ✅ Email capture shows success state
- ✅ Contact form submits

Press `Ctrl+C` to stop when done.

---

## Step 4 — Push to GitHub

```bash
# Initialize git
git init
git add .
git commit -m "Initial Sentrixi site"

# Create a new repo on github.com (name it: sentrixi-site)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/sentrixi-site.git
git branch -M main
git push -u origin main
```

---

## OPTION A — Deploy on Vercel (Recommended)

Vercel is the easiest, fastest option. Free tier is more than enough for a marketing site.

### A1 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. Click **"Add New Project"**
3. Select your `sentrixi-site` repository
4. Vercel auto-detects Next.js — click **Deploy**

Your site is now live on `https://sentrixi-site.vercel.app` ✅

### A2 — Connect sentrixi.com domain

1. In Vercel dashboard → your project → **Settings** → **Domains**
2. Click **Add Domain** → type `sentrixi.com` → click **Add**
3. Also add `www.sentrixi.com` (Vercel will auto-redirect www → root)
4. Vercel will show you DNS records to add. Keep this tab open.

### A3 — Update DNS at your domain registrar

Go to wherever you registered `sentrixi.com` (Namecheap, GoDaddy, etc.) → DNS settings:

**If your registrar supports CNAME flattening (Cloudflare, Namecheap):**
```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

**If not (GoDaddy, basic registrars):**
```
Type    Name    Value
A       @       76.76.21.21
A       www     76.76.21.21
```

DNS propagates in 5–30 minutes. Vercel provisions SSL automatically.

### A4 — Verify

Go to [https://sentrixi.com](https://sentrixi.com) — site is live with HTTPS ✅

---

## OPTION B — Deploy on Cloudflare Pages

Use this if your domain is already on Cloudflare, or if you want Cloudflare's global CDN + DDoS protection.

### B1 — Build the site

```bash
npm run build
```

This creates a `.next` folder.

### B2 — Set up Cloudflare Pages

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create application** → **Pages**
2. Click **Connect to Git** → select your `sentrixi-site` repo
3. Set build settings:
   ```
   Framework preset:   Next.js
   Build command:      npm run build
   Build output dir:   .next
   Node version:       18
   ```
4. Click **Save and Deploy**

> **Note:** Cloudflare Pages uses Next.js's edge runtime. Add this to `next.config.js` if you see errors:
> ```js
> const nextConfig = {
>   reactStrictMode: true,
>   output: 'standalone',   // add this line
>   // ... rest of config
> }
> ```

### B3 — Connect sentrixi.com domain

1. In Cloudflare Pages → your project → **Custom domains** → **Set up a custom domain**
2. Type `sentrixi.com` → click **Continue**
3. If your domain is already on Cloudflare DNS, it auto-configures ✅
4. If not, Cloudflare will show you nameservers to set at your registrar:
   ```
   NS   aria.ns.cloudflare.com
   NS   tom.ns.cloudflare.com
   ```
   (actual names will differ — use what Cloudflare shows you)

SSL is automatic with Cloudflare ✅

---

## Step 5 — Post-launch checklist

### Analytics
- [ ] Open GA4 → Real-time view → visit sentrixi.com → confirm pageview fires
- [ ] Submit a test email capture → check GA4 Events for `email_capture`
- [ ] Submit contact form → check GA4 Events for `demo_request`

### SEO
- [ ] Submit sitemap: [Google Search Console](https://search.google.com/search-console) → Add property `sentrixi.com` → Submit `https://sentrixi.com/sitemap.xml`
- [ ] Test Open Graph at [opengraph.xyz](https://www.opengraph.xyz) — paste your URL
- [ ] Test page speed at [pagespeed.web.dev](https://pagespeed.web.dev)

### Email capture → where does it go?
Right now, `trackEvent("email_capture")` fires to GA4 but doesn't store the email address.

To actually collect emails, add one of these (takes ~15 minutes):

**Option 1 — Mailchimp (free up to 500 contacts):**
1. Create a Mailchimp account → Audience → Signup forms → Embedded forms
2. Note your List ID and API Key
3. In `SentrixiApp.jsx`, in the `EmailCapture` submit handler, add:
   ```js
   await fetch("/api/subscribe", {
     method: "POST",
     body: JSON.stringify({ email }),
     headers: { "Content-Type": "application/json" },
   });
   ```
4. Create `pages/api/subscribe.js`:
   ```js
   export default async function handler(req, res) {
     const { email } = JSON.parse(req.body);
     await fetch(`https://us1.api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members`, {
       method: "POST",
       headers: {
         Authorization: `Bearer YOUR_API_KEY`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ email_address: email, status: "subscribed" }),
     });
     res.status(200).json({ ok: true });
   }
   ```

**Option 2 — Resend + simple database (easiest for a founder):**
1. Sign up at [resend.com](https://resend.com) — free tier sends you an email for every capture
2. In `pages/api/subscribe.js`:
   ```js
   import { Resend } from "resend";
   const resend = new Resend(process.env.RESEND_API_KEY);
   export default async function handler(req, res) {
     const { email } = JSON.parse(req.body);
     await resend.emails.send({
       from: "noreply@sentrixi.com",
       to: "oded@sentrixi.com",
       subject: "New demo request",
       text: `Email: ${email}`,
     });
     res.status(200).json({ ok: true });
   }
   ```
3. Add `RESEND_API_KEY=your_key` to Vercel → Settings → Environment Variables

---

## Ongoing updates

Every time you edit `SentrixiApp.jsx` and push to GitHub:
```bash
git add .
git commit -m "Updated hero copy"
git push
```
Vercel / Cloudflare auto-deploys within 60 seconds. No manual steps needed.

---

## Support contacts

| Service      | Link                                    |
|--------------|-----------------------------------------|
| Vercel docs  | vercel.com/docs                         |
| Cloudflare   | developers.cloudflare.com/pages         |
| GA4 setup    | support.google.com/analytics            |
| Next.js      | nextjs.org/docs                         |

---

*Generated for Sentrixi · sentrixi.com · April 2026*
