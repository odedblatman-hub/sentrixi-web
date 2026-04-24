import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Sentrixi — AEGIS: AI-Native Security for Real-Time Databases",
  description:
    "AEGIS delivers AI-powered database protection and full SIEM capabilities running natively on HTAP databases. Zero ETL. Real-time detection. Sub-second response.",
  keywords: ["database security", "AI SIEM", "insider threat detection", "HTAP security", "behavioral analytics", "DFIR", "NYDFS compliance"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sentrixi.com",
    siteName: "Sentrixi",
    title: "Sentrixi — AEGIS: AI-Native Security for Real-Time Databases",
    description: "Security that lives where your data lives.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sentrixi — AEGIS: AI-Native Database Security",
    description: "Security that lives where your data lives.",
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0a0e1a" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#0a0e1a" }}>
        {children}
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