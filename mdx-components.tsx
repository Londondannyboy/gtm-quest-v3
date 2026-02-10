import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom heading styles
    // Note: MDX h1 renders as h2 because page template already has the H1 title
    // This prevents duplicate H1 tags for SEO
    h1: ({ children }) => (
      <h2 className="text-3xl font-bold text-white mt-8 mb-6">{children}</h2>
    ),
    h2: ({ children }) => (
      <h3 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h3>
    ),
    h3: ({ children }) => (
      <h4 className="text-xl font-semibold text-white mt-6 mb-3">{children}</h4>
    ),
    // Paragraph styling
    p: ({ children }) => (
      <p className="text-white/70 mb-4 leading-relaxed">{children}</p>
    ),
    // List styling
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-white/70 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside text-white/70 mb-4 space-y-2">{children}</ol>
    ),
    // Link styling
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-emerald-400 hover:text-emerald-300 underline"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    // Code blocks
    pre: ({ children }) => (
      <pre className="bg-zinc-800 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-emerald-400 text-sm">
        {children}
      </code>
    ),
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-white/60 my-4">
        {children}
      </blockquote>
    ),
    // Table styling
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-left text-white/70">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-white/10 py-2 px-4 font-semibold text-white">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-white/10 py-2 px-4">{children}</td>
    ),
    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-white/80">{children}</em>
    ),
    ...components,
  };
}
