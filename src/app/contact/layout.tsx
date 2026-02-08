import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact GTM Quest | Get Go-To-Market Strategy Help',
  description: 'Contact GTM Quest for expert go-to-market strategy help. Free consultation, 24hr response. Get hands-on GTM execution support.',
  alternates: {
    canonical: 'https://gtm.quest/contact',
  },
  openGraph: {
    title: 'Contact GTM Quest | Get Go-To-Market Strategy Help',
    description: 'Contact GTM Quest for expert go-to-market strategy help. Free consultation, 24hr response.',
    url: 'https://gtm.quest/contact',
    images: [
      {
        url: 'https://gtm.quest/gtm-agency-quest-logo.png',
        width: 512,
        height: 512,
        alt: 'Contact GTM Quest',
      },
    ],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
