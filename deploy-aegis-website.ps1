# ============================================================
# Sentrixi / AEGIS — Website Build & Deploy Script
# Run: Open PowerShell, cd to your desired folder, paste this
# Prerequisites: Node.js 18+, npm, git, Vercel CLI (npm i -g vercel)
# ============================================================

# ---------- CONFIG (edit these) ----------
$PROJECT_NAME = "aegis-website"
$REPO_URL     = "https://github.com/odedblatman-hub/AEGIS.git"  # set to "" to skip git push
$VERCEL_TEAM  = ""                                                # leave empty for personal account
$DOMAIN       = "sentrixi.com"                                    # configured in GoDaddy + Cloudflare
# -----------------------------------------

Write-Host "`n=== Sentrixi AEGIS Website Builder ===" -ForegroundColor Cyan

# 1. Check prerequisites
Write-Host "`n[1/6] Checking prerequisites..." -ForegroundColor Yellow
$nodeVer = & node -v 2>$null
if (-not $nodeVer) { Write-Host "ERROR: Node.js not found. Install from https://nodejs.org" -ForegroundColor Red; exit 1 }
Write-Host "  Node: $nodeVer"

$vercelVer = & vercel --version 2>$null
if (-not $vercelVer) {
    Write-Host "  Vercel CLI not found — installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# 2. Create Next.js project
Write-Host "`n[2/6] Creating Next.js project..." -ForegroundColor Yellow
if (Test-Path $PROJECT_NAME) { Remove-Item -Recurse -Force $PROJECT_NAME }
npx create-next-app@latest $PROJECT_NAME --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --no-turbopack
Set-Location $PROJECT_NAME

# 3. Write the website content
Write-Host "`n[3/6] Writing website content..." -ForegroundColor Yellow

# ---- globals.css ----
@"
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --navy: #0B1A2F;
  --navy-deep: #050F1E;
  --navy-soft: #14294A;
  --teal: #00C2A8;
  --teal-dim: #00806E;
  --ice: #E8EEF5;
  --grey-txt: #8FA3BF;
  --grey-deep: #3B4B63;
}

html { scroll-behavior: smooth; }
body { background: var(--navy-deep); color: var(--ice); font-family: 'Inter', system-ui, sans-serif; }

.gradient-teal { background: linear-gradient(135deg, var(--teal) 0%, var(--teal-dim) 100%); }
"@ | Set-Content -Path "src/app/globals.css" -Encoding UTF8

# ---- layout.tsx ----
@"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sentrixi — Real-Time Security for Real-Time Data',
  description: 'AEGIS: Behavioral security at database speed. Combat-proven methodology meets multi-agent AI on the only data substrate fast enough to run it.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
"@ | Set-Content -Path "src/app/layout.tsx" -Encoding UTF8

# ---- page.tsx (the full single-page site) ----
@"
export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[var(--navy-deep)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-lg font-bold tracking-[0.3em] text-[var(--teal)]">SENTRIXI</span>
          <div className="flex gap-8 text-sm text-[var(--grey-txt)]">
            <a href="#product" className="hover:text-white transition">Product</a>
            <a href="#why" className="hover:text-white transition">Why Now</a>
            <a href="#team" className="hover:text-white transition">Team</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="absolute left-0 top-0 w-1 h-full bg-[var(--teal)]" />
        <div className="max-w-5xl mx-auto">
          <p className="text-[var(--teal)] font-bold tracking-[0.3em] text-sm mb-6">AEGIS BY SENTRIXI</p>
          <h1 className="text-6xl md:text-7xl font-bold leading-[1.1] mb-6">
            <span className="text-white">Real-Time Security</span><br/>
            <span className="text-[var(--teal)]">for Real-Time Data</span>
          </h1>
          <p className="text-xl text-[var(--grey-txt)] max-w-2xl mb-10">
            Combat-proven security methodology meets multi-agent AI — on the only data
            substrate fast enough to run behavioral detection in under 20 milliseconds.
          </p>
          <a href="#contact" className="inline-block px-8 py-4 gradient-teal text-[var(--navy-deep)] font-bold rounded-lg hover:opacity-90 transition">
            Schedule a Briefing
          </a>
        </div>
      </section>

      {/* Product — 3 Phases */}
      <section id="product" className="py-24 px-6 bg-[var(--navy)]">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--teal)] font-bold tracking-[0.3em] text-sm mb-4">THE PRODUCT</p>
          <h2 className="text-4xl font-bold text-white mb-4">AEGIS: behavioral security at database speed.</h2>
          <p className="text-[var(--grey-txt)] mb-16 max-w-3xl">
            Three phases. Each one deepens the security posture and increases the value to the platform.
            Designed for OEM embedding into real-time database platforms serving security-conscious enterprises.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01", when: "Phase 1 · Live", title: "Protect the database itself",
                body: "Behavioral anomaly detection on database access patterns, privileged user activity, query anomalies, and credential misuse. Sub-second detection via API-first integration.",
                accent: true,
              },
              {
                num: "02", when: "Phase 2 · Q4 2026", title: "Protect the customer",
                body: "Customers inject their security logs into their database instance. AEGIS detects, triages, and contains sophisticated cyber threats 24/7 using multi-agent AI and battle-tested forensics.",
                accent: false,
              },
              {
                num: "03", when: "Year 2+", title: "Deeper integration paths",
                body: "Embedded SDK for application-layer telemetry. eBPF agents for OS-level behavioral signals. Managed-service wrapper for Fortune 500 security operations teams.",
                accent: false,
              },
            ].map((p, i) => (
              <div key={i} className={\`rounded-xl p-8 border-l-4 border-[var(--teal)] \${p.accent ? 'bg-[var(--navy-deep)]' : 'bg-[var(--ice)]/5'}\`}>
                <span className="text-4xl font-bold text-[var(--teal)]">{p.num}</span>
                <p className="text-[var(--teal-dim)] text-xs font-bold tracking-[0.2em] mt-3 mb-2">{p.when.toUpperCase()}</p>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-[var(--grey-txt)] text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Now */}
      <section id="why" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[var(--teal)] font-bold tracking-[0.3em] text-sm mb-4">WHY NOW</p>
          <h2 className="text-4xl font-bold text-white mb-4">Real-time databases need purpose-built security.</h2>
          <p className="text-[var(--grey-txt)] mb-16 max-w-3xl">
            Existing security tools operate at the endpoint, network, and cloud layers.
            Nobody operates at the database layer — because until now, no database was fast
            enough to run behavioral detection in real time.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "The database layer is unprotected", body: "CrowdStrike covers endpoints. Wiz covers cloud posture. Palo Alto covers the network. But the data layer — where the actual records live — has no behavioral detection. AEGIS fills that gap." },
              { title: "Real-time means real-time", body: "SIEM tools ingest logs in batch and alert in minutes. AEGIS detects anomalies in under 20 milliseconds on an HTAP substrate — the same speed as the applications it protects." },
              { title: "AI-native from day one", body: "Multi-agent AI system using combat-proven DFIR (Digital Forensics & Incident Response) methodology. Not a rule engine with an AI label — a genuine autonomous detection and containment platform." },
              { title: "Built for database vendors", body: "API-first architecture designed for OEM embedding. Zero infrastructure changes for the database vendor's customers. Sandbox-testable. Phase 2 drives consumption on the host database." },
            ].map((item, i) => (
              <div key={i} className="bg-[var(--navy)] rounded-xl p-8 border-l-4 border-[var(--teal)]">
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-[var(--grey-txt)] text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-16 px-6 bg-[var(--navy)]">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[
            { stat: "<20ms", label: "Detection latency" },
            { stat: "24/7", label: "Autonomous containment" },
            { stat: "API-first", label: "Zero-friction deployment" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-bold text-[var(--teal)]">{s.stat}</p>
              <p className="text-sm text-[var(--grey-txt)] mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-[var(--teal)] font-bold tracking-[0.3em] text-sm mb-4">LEADERSHIP</p>
          <h2 className="text-4xl font-bold text-white mb-12">Built by practitioners, not just engineers.</h2>
          <div className="bg-[var(--navy)] rounded-xl p-10 border-l-4 border-[var(--teal)]">
            <h3 className="text-2xl font-bold text-white mb-2">Oded Blatman</h3>
            <p className="text-[var(--teal)] font-bold text-sm mb-4">Founder & CEO</p>
            <p className="text-[var(--grey-txt)] leading-relaxed max-w-3xl">
              CIO & CISO with 15+ years leading cybersecurity, technology operations, and AI
              governance at scale in regulated financial services. Architect of enterprise-grade
              behavioral detection platforms protecting critical infrastructure across 30+ global
              regions. AEGIS is built on combat-proven methodology developed through real-world
              incident response against nation-state and organized cybercrime actors.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--teal)] font-bold tracking-[0.3em] text-sm mb-4">GET IN TOUCH</p>
          <h2 className="text-4xl font-bold text-white mb-6">Schedule a briefing.</h2>
          <p className="text-[var(--grey-txt)] mb-10">
            We are selectively partnering with database vendors who serve security-conscious
            verticals. If your platform handles real-time data for financial services, cybersecurity,
            or critical infrastructure — let's talk.
          </p>
          <a href="mailto:oded@sentrixi.com" className="inline-block px-8 py-4 gradient-teal text-[var(--navy-deep)] font-bold rounded-lg hover:opacity-90 transition">
            Schedule a Briefing &rarr;
          </a>
          <p className="text-[var(--grey-txt)] text-sm mt-4">oded@sentrixi.com</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-[var(--grey-txt)]">
          <span className="font-bold tracking-[0.2em] text-[var(--teal)]">SENTRIXI</span>
          <span>&copy; 2026 Sentrixi. All rights reserved.</span>
        </div>
      </footer>
    </main>
  )
}
"@ | Set-Content -Path "src/app/page.tsx" -Encoding UTF8

Write-Host "  Content written." -ForegroundColor Green

# 4. Build
Write-Host "`n[4/6] Building..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "ERROR: Build failed." -ForegroundColor Red; exit 1 }
Write-Host "  Build succeeded." -ForegroundColor Green

# 5. Git push (optional)
if ($REPO_URL -ne "") {
    Write-Host "`n[5/6] Pushing to git..." -ForegroundColor Yellow
    git init
    git remote add origin $REPO_URL 2>$null
    git add -A
    git commit -m "AEGIS website — deploy $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
    git branch -M main
    git push -f origin main
    Write-Host "  Pushed to $REPO_URL" -ForegroundColor Green
} else {
    Write-Host "`n[5/6] Skipping git push (no REPO_URL configured)." -ForegroundColor Yellow
}

# 6. Deploy to Vercel
Write-Host "`n[6/6] Deploying to Vercel..." -ForegroundColor Yellow
if ($VERCEL_TEAM -ne "") {
    vercel --prod --yes --team $VERCEL_TEAM
} else {
    vercel --prod --yes
}

Write-Host "`n=== DONE ===" -ForegroundColor Cyan
Write-Host "Site is live on Vercel. Now connect sentrixi.com:" -ForegroundColor Green
Write-Host ""
Write-Host "  STEP 1: Vercel Dashboard > your project > Settings > Domains"
Write-Host "          Add: sentrixi.com"
Write-Host "          Add: www.sentrixi.com (redirect to apex)"
Write-Host ""
Write-Host "  STEP 2: In Cloudflare DNS (sentrixi.com zone):"
Write-Host "          Type: CNAME  Name: @     Target: cname.vercel-dns.com  Proxy: DNS only"
Write-Host "          Type: CNAME  Name: www   Target: cname.vercel-dns.com  Proxy: DNS only"
Write-Host "          (Set Cloudflare proxy to DNS-only / grey cloud for Vercel SSL to work)"
Write-Host ""
Write-Host "  STEP 3: SSL auto-provisions via Vercel within ~60 seconds"
Write-Host ""
Write-Host "  Verify: https://sentrixi.com" -ForegroundColor Cyan
