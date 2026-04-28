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

export function writeupUrl(slug: string) {
  return isProd
    ? `${absoluteUrls.writeups}/${slug}`
    : `/writeups/${slug}`;
}

export function absoluteWriteupUrl(slug: string) {
  return `${absoluteUrls.writeups}/${slug}`;
}
