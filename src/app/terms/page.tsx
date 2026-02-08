import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | GTM Agency Quest',
  description: 'Terms of Service for GTM Agency Quest. Read our terms and conditions for using our go-to-market strategy services.',
};

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-white/70 text-lg mb-8">
            Last updated: February 2026
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p className="text-white/70 leading-relaxed">
              By accessing or using GTM Agency Quest (&quot;gtm.quest&quot;), you agree to be bound by these
              Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
            <p className="text-white/70 leading-relaxed">
              GTM Agency Quest provides go-to-market strategy tools, resources, and agency directory
              services. Our services include:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2 mt-4">
              <li>AI-powered GTM planning tools</li>
              <li>Agency directory and matching services</li>
              <li>Educational content and guides</li>
              <li>Consulting and advisory services</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">3. User Accounts</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Some features may require you to create an account. You are responsible for:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">4. Acceptable Use</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-white/70 space-y-2">
              <li>Use our services for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Scrape or collect data without permission</li>
              <li>Impersonate others or misrepresent your affiliation</li>
              <li>Upload malicious code or content</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
            <p className="text-white/70 leading-relaxed">
              All content, features, and functionality of our services are owned by GTM Agency Quest
              and are protected by copyright, trademark, and other intellectual property laws. You may
              not reproduce, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Services</h2>
            <p className="text-white/70 leading-relaxed">
              Our services may contain links to third-party websites or integrate with third-party
              services. We are not responsible for the content, privacy policies, or practices of
              any third-party services. Your use of such services is at your own risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-white/70 leading-relaxed">
              Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
              either express or implied. We do not guarantee that our services will be uninterrupted,
              secure, or error-free. Any reliance on our content or tools is at your own risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p className="text-white/70 leading-relaxed">
              To the maximum extent permitted by law, GTM Agency Quest shall not be liable for any
              indirect, incidental, special, consequential, or punitive damages arising from your
              use of our services. Our total liability shall not exceed the amount you paid us,
              if any, in the twelve months preceding the claim.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">9. Indemnification</h2>
            <p className="text-white/70 leading-relaxed">
              You agree to indemnify and hold harmless GTM Agency Quest and its officers, directors,
              employees, and agents from any claims, damages, losses, or expenses arising from your
              use of our services or violation of these terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">10. Termination</h2>
            <p className="text-white/70 leading-relaxed">
              We reserve the right to suspend or terminate your access to our services at any time,
              with or without cause, with or without notice. Upon termination, your right to use
              our services will immediately cease.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">11. Governing Law</h2>
            <p className="text-white/70 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the
              United Kingdom, without regard to its conflict of law provisions. Any disputes
              shall be resolved in the courts of England and Wales.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to Terms</h2>
            <p className="text-white/70 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of any
              changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date.
              Your continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
            <p className="text-white/70 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
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
