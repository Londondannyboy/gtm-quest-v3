import { DashboardClient } from './DashboardClient';
import { Metadata } from 'next';

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
  return <DashboardClient />;
}
