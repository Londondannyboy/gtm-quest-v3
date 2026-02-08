import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | GTM Agency Quest',
  description: 'Privacy Policy for GTM Agency Quest. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <Link
          href="/"
          className="text-emerald-400 text-sm font-medium hover:text-emerald-300 mb-6 inline-block"
        >
          &larr; Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-white/70 text-lg mb-8">
            Last updated: February 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-white/70 leading-relaxed">
              GTM Agency Quest (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website gtm.quest and use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-white mb-3">Personal Information</h3>
            <p className="text-white/70 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide when using our services, including:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2">
              <li>Name and email address</li>
              <li>Company name and job title</li>
              <li>Information you provide through our GTM planning tools</li>
              <li>Communications you send to us</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3 mt-6">Automatically Collected Information</h3>
            <p className="text-white/70 leading-relaxed">
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Personalize your experience</li>
              <li>Send you relevant communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Respond to your inquiries and provide support</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-white/70 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our website.
              You can control cookie preferences through your browser settings. We use:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
              <li>Essential cookies for website functionality</li>
              <li>Analytics cookies to understand how visitors use our site</li>
              <li>Preference cookies to remember your settings</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing and Disclosure</h2>
            <p className="text-white/70 leading-relaxed">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
              <li>Service providers who assist in operating our website</li>
              <li>Analytics partners (in aggregated, anonymized form)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
            <p className="text-white/70 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. However,
              no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">8. International Transfers</h2>
            <p className="text-white/70 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own.
              We ensure appropriate safeguards are in place for such transfers in compliance with
              applicable data protection laws.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">9. Changes to This Policy</h2>
            <p className="text-white/70 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">10. Contact Us</h2>
            <p className="text-white/70 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="text-white/70 mt-4">
              <strong className="text-white">GTM Agency Quest</strong><br />
              Email: hello@gtm.quest
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
