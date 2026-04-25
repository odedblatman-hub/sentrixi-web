# ═══════════════════════════════════════════════════════════════
#  deploy.ps1 — One-command deploy from JSX to Vercel + GitHub
#
#  Usage (run from C:\Users\odedb\aegis-website\aegis-site):
#    .\deploy.ps1 sentrixi-site.jsx                # Preview deploy
#    .\deploy.ps1 sentrixi-site.jsx -Prod           # Production deploy
#    .\deploy.ps1 sentrixi-site.jsx -Prod -Message "Updated hero"
#
#  Prerequisites (one-time):
#    npm i -g vercel
#    vercel login
#    git remote add origin https://github.com/YOUR_USERNAME/aegis-site.git
# ═══════════════════════════════════════════════════════════════

param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$JsxFile,

    [switch]$Prod,

    [string]$Message = "Site update $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
)

$ErrorActionPreference = "Stop"

# ── Colors ──
function Write-Step($msg)  { Write-Host "`n▸ $msg" -ForegroundColor Cyan }
function Write-Ok($msg)    { Write-Host "  ✓ $msg" -ForegroundColor Green }
function Write-Warn($msg)  { Write-Host "  ⚠ $msg" -ForegroundColor Yellow }
function Write-Fail($msg)  { Write-Host "  ✗ $msg" -ForegroundColor Red }

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  Sentrixi Deploy Script" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan

# ── Validate input file ──
if (-not (Test-Path $JsxFile)) {
    Write-Fail "File not found: $JsxFile"
    exit 1
}

# ── Check prerequisites ──
Write-Step "Checking prerequisites..."

try { $nodeVer = node -v; Write-Ok "Node.js $nodeVer" }
catch { Write-Fail "Node.js not found. Install from https://nodejs.org"; exit 1 }

try { $npmVer = npm -v; Write-Ok "npm $npmVer" }
catch { Write-Fail "npm not found"; exit 1 }

$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Warn "Vercel CLI not found. Installing..."
    npm i -g vercel
}
Write-Ok "Vercel CLI ready"

$gitInstalled = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitInstalled) {
    Write-Fail "Git not found. Install from https://git-scm.com"
    exit 1
}
Write-Ok "Git ready"

# ── Copy JSX into the project ──
Write-Step "Updating site component..."

# Your project uses src/ directory with Next.js app router or pages router
# Check which structure exists
if (Test-Path "src/app") {
    # App Router — put component in src/components/ and update page.tsx
    $componentDir = "src/components"
    $pageFile = "src/app/page.tsx"
} elseif (Test-Path "src/pages") {
    # Pages Router with src/
    $componentDir = "src/components"
    $pageFile = "src/pages/index.tsx"
} elseif (Test-Path "src") {
    # src exists, create components dir
    $componentDir = "src/components"
} else {
    $componentDir = "components"
}

# Ensure directories exist
New-Item -ItemType Directory -Force -Path $componentDir | Out-Null

# Copy the JSX file
Copy-Item $JsxFile "$componentDir/SentrixiApp.jsx" -Force
Write-Ok "Copied $JsxFile → $componentDir/SentrixiApp.jsx"

# ── Ensure page entry point exists ──
Write-Step "Ensuring page entry point..."

if (Test-Path "src/app/page.tsx") {
    # App Router — update page.tsx to import the component
    $pageContent = @'
import SentrixiApp from "../components/SentrixiApp";
export default function Home() { return <SentrixiApp />; }
'@
    Set-Content -Path "src/app/page.tsx" -Value $pageContent -Encoding UTF8
    Write-Ok "Updated src/app/page.tsx"
}
elseif (Test-Path "src/app") {
    # App dir exists but no page.tsx
    $pageContent = @'
import SentrixiApp from "../components/SentrixiApp";
export default function Home() { return <SentrixiApp />; }
'@
    Set-Content -Path "src/app/page.tsx" -Value $pageContent -Encoding UTF8
    Write-Ok "Created src/app/page.tsx"
}
elseif (Test-Path "src/pages/index.tsx") {
    $pageContent = @'
import SentrixiApp from "../components/SentrixiApp";
export default function Home() { return <SentrixiApp />; }
'@
    Set-Content -Path "src/pages/index.tsx" -Value $pageContent -Encoding UTF8
    Write-Ok "Updated src/pages/index.tsx"
}
elseif (Test-Path "src/pages") {
    $pageContent = @'
import SentrixiApp from "../components/SentrixiApp";
export default function Home() { return <SentrixiApp />; }
'@
    Set-Content -Path "src/pages/index.tsx" -Value $pageContent -Encoding UTF8
    Write-Ok "Created src/pages/index.tsx"
}
else {
    Write-Warn "Could not detect page router. You may need to manually import SentrixiApp."
}

# ── Ensure layout.tsx has Google Fonts (App Router) ──
if (Test-Path "src/app/layout.tsx") {
    $layoutContent = @'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sentrixi — AEGIS: Real-Time Security for Real-Time Data",
  description: "AEGIS embeds AI-native detection and response into real-time database platforms. 3x consumption lift. 2x sales velocity.",
  openGraph: {
    title: "Sentrixi — AEGIS",
    description: "Security is the largest data workload in the enterprise. The database that captures it wins.",
    url: "https://sentrixi.com",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
          body { background: #fff; overflow-x: hidden; }
          a { color: inherit; }
          ::selection { background: #0D9373; color: #fff; }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
'@
    Set-Content -Path "src/app/layout.tsx" -Value $layoutContent -Encoding UTF8
    Write-Ok "Updated src/app/layout.tsx with fonts + metadata"
}

# ── Ensure globals.css doesn't conflict ──
if (Test-Path "src/app/globals.css") {
    $cssContent = @'
@tailwind base;
@tailwind components;
@tailwind utilities;

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { background: #fff; overflow-x: hidden; }
::selection { background: #0D9373; color: #fff; }
'@
    Set-Content -Path "src/app/globals.css" -Value $cssContent -Encoding UTF8
    Write-Ok "Cleaned up globals.css"
}

# ── Install dependencies if needed ──
if (-not (Test-Path "node_modules")) {
    Write-Step "Installing dependencies..."
    npm install
    Write-Ok "Dependencies installed"
} else {
    Write-Ok "Dependencies already installed"
}

# ── Build test ──
Write-Step "Testing build..."
try {
    npm run build 2>&1 | Select-Object -Last 5
    Write-Ok "Build succeeded"
}
catch {
    Write-Fail "Build failed. Check errors above."
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Yellow
    Write-Host "  - TypeScript errors: rename SentrixiApp.jsx to .tsx and fix types" -ForegroundColor Yellow
    Write-Host "  - Missing deps: npm install" -ForegroundColor Yellow
    Write-Host "  - Tailwind conflicts: check globals.css" -ForegroundColor Yellow
    exit 1
}

# ── Git commit and push ──
Write-Step "Pushing to GitHub..."

$hasGitRemote = git remote -v 2>$null
if (-not $hasGitRemote) {
    Write-Warn "No git remote found."
    Write-Host "  Run this once to connect GitHub:" -ForegroundColor Yellow
    Write-Host "    git init" -ForegroundColor White
    Write-Host "    git remote add origin https://github.com/YOUR_USERNAME/aegis-site.git" -ForegroundColor White
    Write-Host ""
    Write-Host "  Skipping git push. Continuing to Vercel deploy..." -ForegroundColor Yellow
} else {
    git add -A
    git commit -m $Message 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Ok "Committed: $Message"
    } else {
        Write-Ok "No changes to commit (already up to date)"
    }

    try {
        git push origin main 2>&1
        Write-Ok "Pushed to GitHub"
    }
    catch {
        Write-Warn "Git push failed. Continuing to Vercel deploy..."
    }
}

# ── Deploy to Vercel ──
if ($Prod) {
    Write-Step "Deploying to PRODUCTION..."
    vercel --prod --yes
} else {
    Write-Step "Deploying PREVIEW (use -Prod for production)..."
    vercel --yes
}

# ── Done ──
Write-Host ""
Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
Write-Host "  ✓ Deployment complete!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "  Dashboard:  " -NoNewline; Write-Host "https://vercel.com/dashboard" -ForegroundColor Yellow
Write-Host "  Domain:     " -NoNewline; Write-Host "Vercel → Project → Settings → Domains → sentrixi.com" -ForegroundColor Yellow
Write-Host ""
Write-Host "  To redeploy:" -ForegroundColor Cyan
Write-Host ('    .\deploy.ps1 ' + $JsxFile + ' -Prod') -ForegroundColor White
Write-Host ""
