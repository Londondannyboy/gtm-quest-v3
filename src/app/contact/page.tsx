'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <main className="min-h-screen bg-black pt-20">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <Link
            href="/"
            className="text-blue-400 text-sm font-medium hover:text-blue-300 mb-4 inline-block transition-colors duration-200"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-white">Work with </span>
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">GTM Quest</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get hands-on help with your go-to-market strategy and execution from the UK's leading <Link href="/" className="text-blue-400 hover:text-blue-300 underline">GTM agency</Link>
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-fadeIn animation-delay-100">
          {[
            {
              icon: '🎯',
              title: 'Strategy & Planning',
              description: 'Custom GTM strategies tailored to your market and goals',
            },
            {
              icon: '🛠️',
              title: 'Execution Support',
              description: 'Hands-on help implementing your go-to-market motion',
            },
            {
              icon: '📊',
              title: 'Ongoing Optimization',
              description: 'Continuous improvement based on data and results',
            },
          ].map((benefit) => (
            <div
              key={benefit.title}
              className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 text-center hover:border-blue-500/30 hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{benefit.icon}</div>
              <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/60 text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 animate-fadeIn animation-delay-200">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
              <p className="text-white/70 mb-6">
                We&apos;ve received your message and will get back to you within 24 hours.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                ← Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200"
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200"
                  placeholder="Acme Inc."
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Tell us about your GTM challenges *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all duration-200 resize-none"
                  placeholder="What GTM challenges are you facing? What are your growth goals? What have you tried so far?"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                <p className="text-white/50 text-sm">
                  We typically respond within 24 hours
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-500/50 disabled:to-blue-600/50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Trust signals */}
        <div className="mt-8 text-center animate-fadeIn animation-delay-300">
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/50 text-sm">
            <span className="flex items-center gap-2">
              <span className="text-blue-400">✓</span>
              No obligation
            </span>
            <span className="flex items-center gap-2">
              <span className="text-blue-400">✓</span>
              Free consultation
            </span>
            <span className="flex items-center gap-2">
              <span className="text-blue-400">✓</span>
              24hr response time
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
