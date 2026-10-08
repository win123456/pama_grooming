import type { NextConfig } from 'next';

const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    const pages = ['services', 'branches', 'gallery', 'reviews', 'journal', 'contact'];
    return [
      { source: '/index.html', destination: '/', permanent: true },
      ...pages.map(page => ({ source: `/${page}.html`, destination: `/${page}`, permanent: true })),
      ...['prepare-grooming', 'coat-routine', 'boarding-checklist'].map(slug => ({source: `/${slug}.html`, destination: `/journal/${slug}`, permanent: true})),
    ];
  },
};
export default config;
