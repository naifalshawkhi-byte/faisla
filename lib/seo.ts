import type { Metadata } from "next";
import type { Locale } from "@/lib/locale";

export const siteUrl = "https://www.lsarworks.com";

export function buildMetadata(
  locale: Locale,
  opts: { title: string; description: string; path: string },
): Metadata {
  const en = `${siteUrl}/en${opts.path}`;
  const ar = `${siteUrl}/ar${opts.path}`;
  const canonical = locale === "ar" ? ar : en;

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical,
      languages: {
        en,
        ar,
        "x-default": ar,
      },
    },
    openGraph: {
      title: `${opts.title} — LSAR* Works Group`,
      description: opts.description,
      url: canonical,
      siteName: "LSAR* Works Group",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "ar" ? ["en_US"] : ["ar_SA"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} — LSAR* Works Group`,
      description: opts.description,
    },
  };
}
