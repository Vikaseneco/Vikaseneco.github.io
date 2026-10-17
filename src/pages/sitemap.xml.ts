import type { APIRoute } from 'astro';
import { url } from '../lib/url';

const routes = [
  '',
  'blog',
  'blog/what-ai-changes-in-automation',
  'blog/write-the-case-then-run-it',
  'blog/repair-the-locator-not-the-rule',
  'blog/start-with-one-job',
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
