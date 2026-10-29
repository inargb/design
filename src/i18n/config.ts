// Locale + routing helpers. Pages are thin wrappers around views, and every
// view receives `locale`; nothing is duplicated per language.

export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** A string that exists in both languages. */
export type L10n = Record<Locale, string>;

export const htmlLang: Record<Locale, string> = { en: 'en', pt: 'pt-BR' };

/** Route ids → path per locale (without base, without trailing slash). */
export const routes = {
  home: { en: '/', pt: '/pt-br' },
  about: { en: '/about', pt: '/pt-br/sobre' },
  playground: { en: '/playground', pt: '/pt-br/playground' },
} as const;
export type RouteId = keyof typeof routes;

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix a site-absolute path with the deploy base (e.g. /portfolio). */
export function withBase(path: string): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean === '/' ? '/' : clean}`;
}

export function href(route: RouteId, locale: Locale): string {
  return withBase(routes[route][locale]);
}

export function caseHref(slug: string, locale: Locale): string {
  return withBase(locale === 'en' ? `/works/${slug}` : `/pt-br/works/${slug}`);
}

export function t(value: L10n, locale: Locale): string {
  return value[locale];
}
