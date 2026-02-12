import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingBookingWidget } from "@/components/ui/FloatingBookingWidget";
import "./globals.css";
// CopilotKit CSS moved to dashboard/layout.tsx to reduce homepage bundle
// NOTE: This layout is a Server Component - page content is SSR'd for SEO

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GTM Agency | Go-To-Market Strategy & Execution for B2B SaaS",
  description: "GTM agency for B2B SaaS startups. Go-to-market strategy & execution with 4-channel ABM, Clay-based outbound, and GDPR-compliant revenue systems.",
  metadataBase: new URL('https://gtm.quest'),
  openGraph: {
    type: 'website',
    siteName: 'GTM Agency Quest',
    title: 'GTM Agency | Go-To-Market Strategy & Execution for B2B SaaS',
    description: 'GTM agency for B2B SaaS startups. Go-to-market strategy & execution with 4-channel ABM.',
    url: 'https://gtm.quest',
    images: [
      {
        url: '/gtm-agency-quest-logo.png',
        width: 512,
        height: 512,
        alt: 'GTM Agency - Go-To-Market Strategy & Execution',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTM Agency | Go-To-Market Strategy & Execution for B2B SaaS',
    description: 'GTM agency for B2B SaaS startups. Go-to-market strategy & execution with 4-channel ABM.',
    images: ['/gtm-agency-quest-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero image for faster LCP */}
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
        {/* Favicon - GTM branding via RealFaviconGenerator */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="GTM Agency Quest" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/*
          SSR-OPTIMIZED LAYOUT:
          - AuthProvider only wraps Header (which needs auth context for UserButton)
          - {children} (page content) is NOT wrapped by any client component
          - This ensures page content is server-rendered for SEO
        */}
        <div className="flex flex-col min-h-screen">
          <AuthProvider>
            <Header />
          </AuthProvider>
          <main className="pt-14 flex-1">
            {children}
          </main>
          <Footer />
          <FloatingBookingWidget />
        </div>
      </body>
    </html>
  );
}
