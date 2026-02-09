'use client';

interface WhyUsReason {
  title: string;
  description: string;
  icon?: string;
}

interface WhyUsProps {
  title?: string;
  subtitle?: string;
  reasons: WhyUsReason[];
  columns?: 2 | 3;
}

/**
 * Why Us section showing key differentiators.
 */
export function WhyUs({
  title = 'Why Us',
  subtitle = 'Why GTM Quest',
  reasons,
  columns = 3,
}: WhyUsProps) {
  const gridCols = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';

  return (
    <section className="py-16 md:py-20 bg-black">
      <div className="max-w-5xl mx-auto px-4">
        <div
          className="text-center mb-12 animate-fadeIn"
        >
          <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">
            {title}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
            {subtitle}
          </h2>
        </div>

        <div className={`grid ${gridCols} gap-6`}>
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="bg-zinc-900 border border-white/10 rounded-xl p-6 hover:border-blue-500/30 hover:scale-105 transition-all duration-200 text-center animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {reason.icon && (
                <div className="text-3xl mb-3">{reason.icon}</div>
              )}
              <h3 className="font-bold text-white mb-2">{reason.title}</h3>
              <p className="text-white/60 text-sm">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
