import { faqs } from './faqData';

// Server component - no JS needed for accordion behavior
export function FAQSection() {
  return (
    <section className="py-16 bg-zinc-950">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-lg text-emerald-400 font-medium mb-2">GTM Agency FAQ</p>
          <p className="text-white/60">
            Common questions about GTM agencies and how to find the right partner
          </p>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-white/10 px-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="border-b border-white/10 last:border-0 group"
              open={index === 0}
            >
              <summary className="w-full py-5 flex items-center justify-between text-left cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="font-semibold text-white group-hover:text-emerald-400 transition pr-4">
                  {faq.question}
                </span>
                <span className="text-emerald-400 transition-transform flex-shrink-0 group-open:rotate-180">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="pb-5">
                <p className="text-white/60 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
