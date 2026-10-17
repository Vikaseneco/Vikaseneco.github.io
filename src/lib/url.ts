/** Prefix an internal path with Astro's base, always with a trailing slash. */
export function url(path = ''): string {
  const raw = import.meta.env.BASE_URL || '/';
  const base = raw.endsWith('/') ? raw : `${raw}/`;
  const [pathname, hash] = path.split('#');
  const clean = (pathname ?? '').replace(/^\/+|\/+$/g, '');
  const href = clean ? `${base}${clean}/` : base;
  return hash ? `${href}#${hash}` : href;
}

export function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
