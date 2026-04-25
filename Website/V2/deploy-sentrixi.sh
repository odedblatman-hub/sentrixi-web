#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  deploy-sentrixi.sh — One-command Vercel deploy from a JSX file
#  
#  Usage:
#    ./deploy-sentrixi.sh sentrixi-site.jsx
#    ./deploy-sentrixi.sh sentrixi-site.jsx --prod   (production deploy)
#
#  Prerequisites:
#    - Node.js 18+ (node -v)
#    - npm (comes with Node)
#    - Vercel CLI: npm i -g vercel  (one-time)
#    - Logged into Vercel: vercel login  (one-time)
# ═══════════════════════════════════════════════════════════════

set -e

# ── Colors ──
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

print_step() { echo -e "\n${CYAN}▸ $1${NC}"; }
print_ok()   { echo -e "${GREEN}  ✓ $1${NC}"; }
print_warn() { echo -e "${YELLOW}  ⚠ $1${NC}"; }
print_err()  { echo -e "${RED}  ✗ $1${NC}"; }

# ── Validate input ──
if [ -z "$1" ]; then
  echo -e "${RED}Usage: ./deploy-sentrixi.sh <filename.jsx> [--prod]${NC}"
  echo ""
  echo "  Examples:"
  echo "    ./deploy-sentrixi.sh sentrixi-site.jsx           # Preview deploy"
  echo "    ./deploy-sentrixi.sh sentrixi-site.jsx --prod     # Production deploy"
  echo ""
  exit 1
fi

JSX_FILE="$1"
PROD_FLAG="$2"

if [ ! -f "$JSX_FILE" ]; then
  print_err "File not found: $JSX_FILE"
  exit 1
fi

# ── Check prerequisites ──
print_step "Checking prerequisites..."

if ! command -v node &> /dev/null; then
  print_err "Node.js not found. Install from https://nodejs.org"
  exit 1
fi
print_ok "Node.js $(node -v)"

if ! command -v npm &> /dev/null; then
  print_err "npm not found."
  exit 1
fi
print_ok "npm $(npm -v)"

if ! command -v vercel &> /dev/null; then
  print_warn "Vercel CLI not found. Installing now..."
  npm i -g vercel
fi
print_ok "Vercel CLI installed"

# ── Project directory ──
PROJECT_DIR="sentrixi-site"
print_step "Setting up project in ./${PROJECT_DIR}/"

# Create directory structure
mkdir -p "${PROJECT_DIR}/components"
mkdir -p "${PROJECT_DIR}/pages"
mkdir -p "${PROJECT_DIR}/public"

# ── Copy the JSX component ──
cp "$JSX_FILE" "${PROJECT_DIR}/components/SentrixiApp.jsx"
print_ok "Copied ${JSX_FILE} → components/SentrixiApp.jsx"

# ── package.json ──
cat > "${PROJECT_DIR}/package.json" << 'PKGJSON'
{
  "name": "sentrixi-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  }
}
PKGJSON
print_ok "Created package.json"

# ── next.config.js ──
cat > "${PROJECT_DIR}/next.config.js" << 'NEXTCFG'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
}
module.exports = nextConfig
NEXTCFG
print_ok "Created next.config.js"

# ── vercel.json ──
cat > "${PROJECT_DIR}/vercel.json" << 'VERCFG'
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
VERCFG
print_ok "Created vercel.json"

# ── pages/_app.jsx (with Google Fonts) ──
cat > "${PROJECT_DIR}/pages/_app.jsx" << 'APPJSX'
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sentrixi — AEGIS: Real-Time Security for Real-Time Data</title>
        <meta name="description" content="AEGIS embeds AI-native detection and response into real-time database platforms. 3x consumption lift. 2x sales velocity. Database-layer security that doesn't exist anywhere else." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Sentrixi — AEGIS" />
        <meta property="og:description" content="Security is the largest data workload in the enterprise. The database that captures it wins." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sentrixi.com" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
          html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
          body { background: #fff; overflow-x: hidden; }
          a { color: inherit; }
          ::selection { background: #0D9373; color: #fff; }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
APPJSX
print_ok "Created pages/_app.jsx"

# ── pages/index.jsx ──
cat > "${PROJECT_DIR}/pages/index.jsx" << 'INDEXJSX'
import SentrixiApp from "../components/SentrixiApp";
export default function Home() { return <SentrixiApp />; }
INDEXJSX
print_ok "Created pages/index.jsx"

# ── public/favicon.svg ──
cat > "${PROJECT_DIR}/public/favicon.svg" << 'FAVICON'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0B1D3A"/>
  <path d="M16 6L8 10v6c0 5.5 3.4 10.6 8 12 4.6-1.4 8-6.5 8-12v-6l-8-4z" fill="#0D9373" opacity="0.9"/>
  <path d="M16 6L8 10v6c0 5.5 3.4 10.6 8 12V6z" fill="#0D9373"/>
  <path d="M14 16l-2-2 1.4-1.4L14 13.2l3.6-3.6L19 11l-5 5z" fill="#fff"/>
</svg>
FAVICON
print_ok "Created favicon.svg"

# ── public/robots.txt ──
cat > "${PROJECT_DIR}/public/robots.txt" << 'ROBOTS'
User-agent: *
Allow: /
Sitemap: https://sentrixi.com/sitemap.xml
ROBOTS
print_ok "Created robots.txt"

# ── Install dependencies ──
print_step "Installing dependencies..."
cd "${PROJECT_DIR}"
npm install --silent 2>&1 | tail -3
print_ok "Dependencies installed"

# ── Build test ──
print_step "Testing build..."
npm run build --silent 2>&1 | tail -5
if [ $? -eq 0 ]; then
  print_ok "Build succeeded"
else
  print_err "Build failed. Check errors above."
  exit 1
fi

# ── Deploy to Vercel ──
if [ "$PROD_FLAG" == "--prod" ]; then
  print_step "Deploying to PRODUCTION on Vercel..."
  vercel --prod --yes 2>&1
else
  print_step "Deploying PREVIEW to Vercel..."
  echo -e "${YELLOW}  (Use --prod flag for production deploy)${NC}"
  vercel --yes 2>&1
fi

DEPLOY_URL=$(vercel ls --json 2>/dev/null | head -1)

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ Deployment complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════${NC}"
echo ""
echo -e "  ${CYAN}Next steps:${NC}"
echo -e "  1. Check your Vercel dashboard: ${YELLOW}https://vercel.com/dashboard${NC}"
echo -e "  2. Connect your domain: Vercel → Project → Settings → Domains → Add ${YELLOW}sentrixi.com${NC}"
echo -e "  3. Update DNS at your registrar:"
echo -e "     ${CYAN}A     @     76.76.21.21${NC}"
echo -e "     ${CYAN}CNAME www   cname.vercel-dns.com${NC}"
echo ""
echo -e "  ${CYAN}To redeploy after editing:${NC}"
echo -e "  ${YELLOW}./deploy-sentrixi.sh ${JSX_FILE} --prod${NC}"
echo ""
