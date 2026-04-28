const isProd = process.env.NODE_ENV === 'production';

export const ROOT_DOMAIN = 'cybersparky.in';

// Always-absolute URLs (used for sitemaps, RSS, OG metadata).
export const absoluteUrls = {
  home: `https://${ROOT_DOMAIN}`,
  resume: `https://resume.${ROOT_DOMAIN}`,
  writeups: `https://blog.${ROOT_DOMAIN}`,
};

// Environment-aware URLs (full URLs in prod, relative paths in dev).
export const domains = {
  home: isProd ? absoluteUrls.home : '',
  resume: isProd ? absoluteUrls.resume : '/resume',
  writeups: isProd ? absoluteUrls.writeups : '/writeups',
};

/**
 * Strict allowlist for blog post slugs. All real slugs are lowercase
 * letters / digits / hyphens, generated at build time from the static
 * data file. Rejecting anything else is defense-in-depth against any
 * untrusted slug ever flowing into a URL builder.
 */
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,99}$/;

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === 'string' && SLUG_PATTERN.test(slug);
}

function safeSlug(slug: string): string {
  if (!isValidSlug(slug)) {
    // Should never happen with our static data; fail closed if it does.
    throw new Error('Invalid writeup slug');
  }
  return slug;
}

export function writeupUrl(slug: string) {
  const s = safeSlug(slug);
  return isProd ? `${absoluteUrls.writeups}/${s}` : `/writeups/${s}`;
}

export function absoluteWriteupUrl(slug: string) {
  return `${absoluteUrls.writeups}/${safeSlug(slug)}`;
}
