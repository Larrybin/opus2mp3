import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

// 2025 Viewport configuration - Mobile experience optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover', // iOS safe area adaptation
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1f2937' },
  ],
};

// 2025 SEO Metadata Configuration
export const metadata: Metadata = {
  metadataBase: new URL('https://opus2mp3.pages.dev'),

  // Title optimized for zero-click search (60 characters optimal)
  title: {
    default: 'OPUS to MP3 Converter Free - Instant Browser Conversion',
    template: '%s | QuickOpus2MP3',
  },

  // 2025 Description optimization: 155-160 characters with key features and unique value
  description: 'Convert OPUS to MP3 instantly in browser. Transform OPUS, OGG, WebM audio files with zero upload, 100% privacy. Adjustable 128-320kbps bitrate. Works offline after first load. Free forever.',

  // Extended keyword coverage (including long-tail and voice search)
  keywords: [
    // Core keywords
    'opus to mp3',
    'convert opus to mp3',
    'opus mp3 converter',
    // 2025 Voice search optimization
    'how to convert opus to mp3',
    'best opus to mp3 converter',
    'free opus converter online',
    // Competitive comparison terms
    'opus to mp3 no upload',
    'browser based audio converter',
    'offline audio converter',
    // Technical terms
    'webassembly audio converter',
    'ffmpeg online converter',
    'client side audio conversion',
  ],

  // E-E-A-T signal enhancement
  authors: [
    {
      name: 'QuickOpus2MP3 Team',
      url: 'https://github.com/Larrybin/opus2mp3',
    }
  ],
  creator: 'QuickOpus2MP3',
  publisher: 'QuickOpus2MP3',

  // 2025 Security and privacy signals
  applicationName: 'QuickOpus2MP3',
  generator: 'Next.js 15.5',
  referrer: 'origin-when-cross-origin',

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Canonical URL
  alternates: {
    canonical: 'https://opus2mp3.pages.dev',
    languages: {
      'en-US': 'https://opus2mp3.pages.dev',
      'x-default': 'https://opus2mp3.pages.dev',
    },
  },

  // Enhanced Open Graph (for AI Overview)
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://opus2mp3.pages.dev',
    siteName: 'QuickOpus2MP3',
    title: 'OPUS to MP3 Converter - Instant Browser Conversion',
    description: 'Convert OPUS files to MP3 instantly. No uploads, 100% private, works offline.',
    images: [
      {
        url: '/og-image-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'QuickOpus2MP3 - Browser-based OPUS to MP3 Converter',
        type: 'image/png',
      },
      {
        url: '/og-image-1200x1200.png', // Instagram/WhatsApp
        width: 1200,
        height: 1200,
        alt: 'QuickOpus2MP3 Audio Converter',
      }
    ],
  },

  // Twitter Card optimization
  twitter: {
    card: 'summary_large_image',
    site: '@quickopus2mp3',
    creator: '@quickopus2mp3',
    title: 'OPUS to MP3 - Instant Browser Conversion',
    description: 'Convert audio files instantly. No uploads, 100% private.',
    images: {
      url: '/twitter-card.png',
      alt: 'QuickOpus2MP3 Converter',
    },
  },

  // 2025 Robots configuration (supporting AI crawlers)
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification codes placeholder
  verification: {
    // google: process.env.GOOGLE_VERIFICATION_CODE,
    // bing: process.env.BING_VERIFICATION_CODE,
  },

  category: 'technology',

  // PWA and mobile optimization
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'QuickOpus2MP3',
  },
  other: {
    'msapplication-TileColor': '#2563eb',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'QuickOpus2MP3',
    'mobile-web-app-capable': 'yes',
    // 2025 additions: AI Overview optimization markers
    'content-language': 'en-US',
    'audience': 'all',
    'rating': 'general',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
