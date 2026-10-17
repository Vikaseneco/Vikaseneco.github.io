import type { APIRoute } from 'astro';
import { url } from '../lib/url';

const routes = [
  '',
  'blog',
  'blog/a-chain-is-a-loop',
  'blog/a-correct-sentence-can-hide-a-wrong-path',
  'blog/freeze-the-brain-watch-the-hands',
  'blog/the-notebook-before-the-suite',
  'blog/fluency-is-not-coverage',
  'prompts',
  'skills',
  'projects',
  'desk',
];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://example.github.io');
  const body = routes
    .map((route) => {
      const loc = new URL(url(route), origin).href;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
