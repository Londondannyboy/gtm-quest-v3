import { Metadata } from 'next';
import { Suspense } from 'react';

// Force dynamic rendering to prevent sharing chunks with homepage
export const dynamic = 'force-dynamic';

// Loading component
function DashboardLoading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white/60 animate-pulse">Loading dashboard...</div>
    </div>
  );
}

// Lazy import the client components
const DashboardClientWrapper = async () => {
  const { DashboardClient } = await import('./DashboardClient');
  const { DashboardProvider } = await import('./DashboardProvider');

  return (
    <DashboardProvider>
      <DashboardClient />
    </DashboardProvider>
  );
};

export const metadata: Metadata = {
  title: 'GTM Dashboard | Build Your Go-To-Market Strategy | GTM Quest',
  description: 'Build your GTM strategy with AI. Free go-to-market planning tool with industry data and agency matching.',
  alternates: {
    canonical: 'https://gtm.quest/dashboard',
  },
  openGraph: {
    title: 'GTM Dashboard | Build Your Go-To-Market Strategy',
    description: 'Build your GTM strategy with AI. Free go-to-market planning tool.',
    url: 'https://gtm.quest/dashboard',
    images: [
      {
        url: 'https://gtm.quest/gtm-agency-quest-logo.png',
        width: 512,
        height: 512,
        alt: 'GTM Agency Quest Dashboard',
      },
    ],
  },
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardClientWrapper />
    </Suspense>
  );
}
