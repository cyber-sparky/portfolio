const isProd = process.env.NODE_ENV === 'production';

const ROOT_DOMAIN = 'cybersparky.in';

export const domains = {
  home: isProd ? `https://${ROOT_DOMAIN}` : '',
  resume: isProd ? `https://resume.${ROOT_DOMAIN}` : '/resume',
  writeups: isProd ? `https://blog.${ROOT_DOMAIN}` : '/writeups',
};

export function writeupUrl(slug: string) {
  return isProd
    ? `https://blog.${ROOT_DOMAIN}/${slug}`
    : `/writeups/${slug}`;
}
