export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function hrefFor(locale: Locale, path = "") {
  return path ? `/${locale}${path}` : `/${locale}`;
}

export const navPaths = [
  { path: "/about", key: "about" },
  { path: "/system", key: "system" },
  { path: "/expertise", key: "expertise" },
  { path: "/leadership", key: "leadership" },
  { path: "/contact", key: "contact" },
] as const;

export const footerPaths = [
  { path: "/about", key: "about" },
  { path: "/challenges", key: "challenges" },
  { path: "/system", key: "system" },
  { path: "/principles", key: "principles" },
  { path: "/expertise", key: "expertise" },
  { path: "/leadership", key: "leadership" },
  { path: "/contact", key: "contact" },
] as const;
