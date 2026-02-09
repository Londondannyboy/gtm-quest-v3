import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingBookingWidget } from "@/components/ui/FloatingBookingWidget";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GTM Agency Quest 2026 🚀 Go-To-Market Strategy & Execution",
  description: "GTM Agency Quest: go-to-market strategy and execution. UK GTM agency building revenue engines with 4-channel ABM and Clay-based outbound systems.",
  metadataBase: new URL('https://gtm.quest'),
  openGraph: {
    type: 'website',
    siteName: 'GTM Agency Quest',
    title: 'GTM Agency Quest 2026 🚀 Go-To-Market Strategy & Execution',
    description: 'GTM agency building revenue engines with 4-channel ABM. Expert go-to-market strategy and execution.',
    url: 'https://gtm.quest',
    images: [
      {
        url: '/gtm-agency-quest-logo.png',
        width: 512,
        height: 512,
        alt: 'GTM Agency Quest - Go-To-Market Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GTM Agency Quest 2026 🚀 Go-To-Market Strategy & Execution',
    description: 'GTM agency building revenue engines with 4-channel ABM.',
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
        {/* Preconnect to MUX for faster video loading */}
        <link rel="preconnect" href="https://image.mux.com" />
        <link rel="preconnect" href="https://stream.mux.com" />
        {/* Favicon - GTM branding via RealFaviconGenerator */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="GTM Agency Quest" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="pt-14 flex-1">
              {children}
            </main>
            <Footer />
            <FloatingBookingWidget />
          </div>
        </Providers>
      </body>
    </html>
  );
}
