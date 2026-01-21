import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { SWUpdateBanner } from "@/components/SWUpdateBanner";
import { registerSW } from "@/lib/sw-registration";

// ============================================
// PWA Metadata
// ============================================
export const metadata: Metadata = {
  title: "DramaBox - Streaming Drama Pendek",
  description: "Nonton drama pendek gratis dan tanpa iklan. Temukan ribuan drama menarik dari berbagai genre.",
  applicationName: "DramaBox",
  authors: [{ name: "DramaBox" }],
  generator: "Next.js",
  keywords: ["drama pendek", "streaming drama", "nonton drama gratis", "DramaBox", "drama"],
  referrer: "origin-when-cross-origin",
  creator: "DramaBox",
  publisher: "DramaBox",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DramaBox",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// ============================================
// Register Service Worker (Client Component)
// ============================================
function SWRegistration() {
  if (typeof window !== 'undefined') {
    registerSW();
  }
  return null;
}

// ============================================
// Root Layout
// ============================================
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

        {/* PWA Theme Color */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Preconnect for fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />

        {/* PWA Mobile Web App Capable */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DramaBox" />
      </head>
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <Toaster />
          <Sonner />
          <SWUpdateBanner />
        </Providers>
        <SWRegistration />
      </body>
    </html>
  );
}
