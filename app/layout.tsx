import type { Metadata } from "next";
import Script from "next/script";
import { DM_Serif_Display, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Sentrixi — AI-Native Security for Real-Time Databases",
  description:
    "AEGIS delivers AI-powered database protection and full SIEM capabilities running natively on HTAP databases. Zero ETL. Real-time detection. Sub-second response.",
  keywords: ["database security", "AI SIEM", "insider threat detection", "HTAP security", "behavioral analytics", "DFIR", "NYDFS compliance"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sentrixi.com",
    siteName: "Sentrixi",
    title: "Sentrixi — AI-Native Security for Real-Time Databases",
    description: "Security that lives where your data lives.",
    images: [{ url: "https://sentrixi.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentrixi — AI-Native Database Security",
    description: "Security that lives where your data lives.",
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

// Bump this manually on each deploy so the version is always visible on the live site
export const SITE_VERSION = "v2.4 — Hybrid Demo (cinematic → SOC → compare)";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${ibmPlex.variable}`}>
      <body style={{ margin: 0, padding: 0, background: "#04080f" }}>
        {children}
        <div style={{
          position: "fixed", bottom: "12px", right: "14px", zIndex: 9999,
          fontSize: "10px", fontFamily: "monospace", letterSpacing: "0.05em",
          color: "rgba(255,255,255,0.18)", pointerEvents: "none", userSelect: "none",
        }}>
          {SITE_VERSION}
        </div>
        {GA4_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { page_path: window.location.pathname });
            `}</Script>
          </>
        )}
      </body>
    </html>
  );
}