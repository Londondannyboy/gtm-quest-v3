import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  // Security headers including HSTS for HTTPS enforcement
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects to preserve indexed URLs from old site structure
  async redirects() {
    return [
      // Stack Auth routes -> Neon Auth routes (leftover from development)
      {
        source: '/handler/sign-in',
        destination: '/auth/sign-in',
        permanent: true,
      },
      {
        source: '/handler/sign-up',
        destination: '/auth/sign-up',
        permanent: true,
      },
      {
        source: '/handler/:path*',
        destination: '/auth/sign-in',
        permanent: true,
      },
      // Old /directory -> New /agencies (agency directory)
      {
        source: '/directory',
        destination: '/agencies',
        permanent: true,
      },
      // Old /agency/:slug -> New /agencies/:slug
      {
        source: '/agency/:slug',
        destination: '/agencies/:slug',
        permanent: true,
      },
      // Old root-level article slugs -> New /articles/:slug
      {
        source: '/gtm-for-technical-products',
        destination: '/articles/gtm-for-technical-products',
        permanent: true,
      },
      {
        source: '/gtm-strategy-examples',
        destination: '/articles/gtm-strategy-examples',
        permanent: true,
      },
      {
        source: '/gtm-strategy',
        destination: '/articles/gtm-strategy',
        permanent: true,
      },
      {
        source: '/gtm-success-stories',
        destination: '/articles/gtm-success-stories',
        permanent: true,
      },
      {
        source: '/linkedin-sales-navigator-vs-apollo',
        destination: '/articles/linkedin-sales-navigator-vs-apollo',
        permanent: true,
      },
      {
        source: '/hubspot-vs-salesloft',
        destination: '/articles/hubspot-vs-salesloft',
        permanent: true,
      },
      {
        source: '/product-led-growth-vs-sales-led',
        destination: '/articles/product-led-growth-vs-sales-led',
        permanent: true,
      },
      {
        source: '/best-gtm-agencies-enterprise',
        destination: '/articles/best-gtm-agencies-enterprise',
        permanent: true,
      },
      {
        source: '/b2b-marketing-agency-uk',
        destination: '/articles/b2b-marketing-agency-uk',
        permanent: true,
      },
      {
        source: '/b2b-marketing-agency-barcelona',
        destination: '/articles/b2b-marketing-agency-barcelona',
        permanent: true,
      },
      {
        source: '/b2b-marketing-agency-rome',
        destination: '/articles/b2b-marketing-agency-rome',
        permanent: true,
      },
      {
        source: '/best-b2b-marketing-agency-belgium-top-b2b-marketing-agencies-belgium',
        destination: '/articles/best-b2b-marketing-agency-belgium',
        permanent: true,
      },
      {
        source: '/best-b2b-marketing-agency-poland-top-b2b-marketing-agencies-poland',
        destination: '/articles/best-b2b-marketing-agency-poland',
        permanent: true,
      },
      {
        source: '/best-b2b-marketing-agency-finland-top-b2b-marketing-agencies-finland',
        destination: '/articles/best-b2b-marketing-agency-finland',
        permanent: true,
      },
      {
        source: '/best-gtm-agency-us-top-gtm-agencies-us',
        destination: '/articles/best-gtm-agency-us',
        permanent: true,
      },
      // Renamed article: old slug -> new slug
      {
        source: '/articles/gtm-strategy-framework',
        destination: '/articles/go-to-market-strategy-guide',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
