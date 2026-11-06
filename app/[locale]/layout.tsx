import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { copy } from "@/content/copy";
import { isLocale, type Locale } from "@/lib/locale";
import { siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import { Alexandria, IBM_Plex_Sans_Arabic, Inter, Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  variable: "--font-alexandria",
  display: "swap",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

export function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ar";
  const description = copy[locale].meta.home.description;

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "LSAR* Works Group",
      template: "%s — LSAR* Works Group",
    },
    description,
    applicationName: "LSAR* Works Group",
    authors: [{ name: "LSAR* Works Group" }],
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ar";
  const content = copy[locale];

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${manrope.variable} ${inter.variable} ${alexandria.variable} ${plex.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ivory text-charcoal">
        <JsonLd />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory"
        >
          {locale === "ar" ? "تخطي إلى المحتوى" : "Skip to content"}
        </a>
        <Header locale={locale} labels={content.nav} />
        <main id="content">{children}</main>
        <Footer
          locale={locale}
          labels={content.nav}
          footer={content.footer}
          address={content.contact.address}
        />
      </body>
    </html>
  );
}
