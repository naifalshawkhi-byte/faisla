import { copy } from "@/content/copy";
import { isLocale, type Locale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const meta = copy[locale].meta.about;
  return buildMetadata(locale, { ...meta, path: "/about" });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = copy[locale];

  return (
    <article>
      <header className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 pb-10 pt-28 sm:px-6 md:px-10 md:pt-36 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.intro.index}</p>
          <h1 className="mt-4 max-w-4xl font-display text-[clamp(2.7rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
            {t.intro.title}
          </h1>
        </div>
      </header>
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-4 pb-16 sm:px-6 md:px-10 md:pb-24 lg:grid-cols-12 lg:pb-32">
        <div className="lg:col-span-7">
          <p className="text-2xl leading-relaxed text-charcoal/85">{t.intro.lead}</p>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-charcoal/75">{t.intro.body}</p>
          <p className="mt-10 max-w-2xl border-s-2 border-bronze ps-5 text-lg leading-relaxed">
            {t.hero.mission}
          </p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-charcoal/70">
            {t.hero.description}
          </p>
        </div>
        <div className="relative min-h-[420px] lg:col-span-5">
          <Image
            src="/images/architecture-stone.jpg"
            alt={
              locale === "ar"
                ? "سطح معماري من الحجر والخرسانة"
                : "Architectural surface of stone and concrete"
            }
            fill
            sizes="(min-width: 1024px) 38vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </article>
  );
}
