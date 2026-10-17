import { defineConfig } from 'astro/config';

/**
 * GitHub Actions sets these from the repository.
 * A user site (USERNAME.github.io) keeps base at /.
 * Any other repository name is served from /REPO.
 */
function normalizeBase(value) {
  if (!value || value === '/') return '/';
  let base = value.trim();
  if (!base.startsWith('/')) base = `/${base}`;
  if (base.length > 1 && base.endsWith('/')) base = base.slice(0, -1);
  return base;
}

const site = process.env.SITE_URL || 'https://example.github.io';
const base = normalizeBase(process.env.BASE_PATH);

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  output: 'static',
});
