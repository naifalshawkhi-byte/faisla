import { siteUrl } from "@/lib/seo";
import type { MetadataRoute } from "next";

const paths = [
  "",
  "/about",
  "/challenges",
  "/system",
  "/principles",
  "/expertise",
  "/leadership",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => [
    {
      url: `${siteUrl}/en${path}`,
      lastModified: new Date("2026-11-05"),
      alternates: {
        languages: {
          en: `${siteUrl}/en${path}`,
          ar: `${siteUrl}/ar${path}`,
        },
      },
    },
    {
      url: `${siteUrl}/ar${path}`,
      lastModified: new Date("2026-11-05"),
      alternates: {
        languages: {
          en: `${siteUrl}/en${path}`,
          ar: `${siteUrl}/ar${path}`,
        },
      },
    },
  ]);
}
