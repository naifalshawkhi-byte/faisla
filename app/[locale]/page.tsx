import { Mark } from "@/components/mark";
import { Reveal } from "@/components/reveal";
import { SystemFlow } from "@/components/system-flow";
import { copy } from "@/content/copy";
import { hrefFor, isLocale, type Locale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ar";
  const meta = copy[locale].meta.home;
  return buildMetadata(locale, {
    title: meta.title,
    description: meta.description,
    path: "",
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ar";
  const t = copy[locale];

  return (
    <>
      <section className="overflow-hidden border-b border-white/10">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-4 pb-14 pt-24 md:grid md:min-h-[100svh] md:grid-cols-12 md:items-center md:gap-8 md:px-10 md:pb-16 md:pt-28">
          <div className="relative order-1 flex items-center justify-center md:order-2 md:col-span-5">
            <div className="pointer-events-none absolute size-48 rounded-full bg-[#3d2ef0]/40 blur-3xl md:size-72" />
            <Mark className="relative w-36 sm:w-52 md:w-full md:max-w-[440px]" />
          </div>
          <div className="order-2 md:order-1 md:col-span-7">
            <Reveal>
              <p className="font-metric text-sm text-olive">LSAR* · 2026</p>
              <h1
                className={
                  locale === "ar"
                    ? "mt-6 max-w-4xl font-display text-[clamp(2.6rem,6.6vw,5.75rem)] leading-[1.5] text-charcoal"
                    : "mt-4 max-w-4xl font-display text-[clamp(2.15rem,10vw,6.25rem)] leading-[0.98] text-charcoal"
                }
              >
                {t.hero.titleLead}
                <span className="mt-1 block">{t.hero.titleRest}</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-olive sm:text-lg md:mt-8 md:text-xl">
                {t.hero.description}
              </p>
              <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-charcoal/75 md:mt-5 md:text-base">
                {t.hero.mission}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={hrefFor(locale, "/system")}
                  className="inline-flex min-h-12 w-full items-center justify-center bg-charcoal px-6 text-sm text-ivory transition-colors hover:bg-olive hover:text-white sm:w-auto"
                >
                  {t.hero.primary}
                </Link>
                <Link
                  href={hrefFor(locale, "/contact")}
                  className="inline-flex min-h-12 w-full items-center justify-center border border-charcoal/15 px-6 text-sm text-charcoal transition-colors hover:border-olive hover:text-olive sm:w-auto"
                >
                  {t.hero.secondary}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 py-16 sm:px-6 md:gap-12 md:px-10 md:py-24 lg:grid-cols-12 lg:py-32">
        <Reveal className="lg:col-span-4">
          <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.intro.index}</p>
          <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em]">{t.intro.label}</p>
        </Reveal>
        <div className="lg:col-span-8">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {t.intro.title}
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-charcoal/85">{t.intro.lead}</p>
            <p className="mt-6 max-w-3xl leading-relaxed text-charcoal/75">{t.intro.body}</p>
            <Link
              href={hrefFor(locale, "/about")}
              className="mt-8 inline-flex items-center gap-2 text-sm text-charcoal hover:text-olive"
            >
              {t.intro.link}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-charcoal/10 bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:py-32">
          <Reveal className="max-w-3xl">
            <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.challenges.index}</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {t.challenges.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal/75">{t.challenges.lead}</p>
          </Reveal>
          <div className="mt-14 grid gap-px bg-charcoal/10 sm:grid-cols-2">
            {t.challenges.items.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.05} className="bg-paper p-7 md:p-9">
                <p className="font-metric text-sm tracking-[0.16em] text-olive">{item.id}</p>
                <p className="mt-5 text-[0.72rem] uppercase tracking-[0.16em] text-charcoal/55">
                  {item.stage}
                </p>
                <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-charcoal/75">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
          <Link
            href={hrefFor(locale, "/challenges")}
            className="mt-8 inline-flex items-center gap-2 text-sm hover:text-olive"
          >
            {t.challenges.link}
            <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:py-32">
        <Reveal className="max-w-3xl">
          <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.system.index}</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
            {t.system.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-charcoal/75">{t.system.body}</p>
        </Reveal>
        <div className="mt-16">
          <SystemFlow stages={t.system.stages} />
        </div>
        <Link
          href={hrefFor(locale, "/system")}
          className="mt-12 inline-flex items-center gap-2 text-sm hover:text-olive"
        >
          {t.system.link}
          <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
        </Link>
      </section>

      <section className="border-t border-charcoal/10">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:py-32">
          <Reveal>
            <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.expertise.index}</p>
            <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {t.expertise.title}
            </h2>
          </Reveal>
          <div className="mt-12 divide-y divide-charcoal/10 border-y border-charcoal/10">
            {t.expertise.areas.map((area) => (
              <div
                key={area.id}
                className="grid gap-4 py-7 md:grid-cols-12 md:items-baseline"
              >
                <p className="font-metric text-sm tracking-[0.16em] text-olive md:col-span-1">
                  {area.id}
                </p>
                <h3 className="font-display text-2xl md:col-span-5">{area.title}</h3>
                <p className="text-sm text-charcoal/70 md:col-span-6">{area.output}</p>
              </div>
            ))}
          </div>
          <Link
            href={hrefFor(locale, "/expertise")}
            className="mt-8 inline-flex items-center gap-2 text-sm hover:text-olive"
          >
            {t.expertise.link}
            <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="bg-stone">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 md:px-10 md:py-24 lg:py-32">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-metric text-sm tracking-[0.18em] text-olive">
                {t.leadership.index}
              </p>
              <h2 className="mt-4 font-display text-[clamp(2.2rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]">
                {t.leadership.title}
              </h2>
            </div>
            <Link
              href={hrefFor(locale, "/leadership")}
              className="inline-flex items-center gap-2 text-sm hover:text-olive"
            >
              {t.leadership.link}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden />
            </Link>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.leadership.people.map((person) => (
              <li key={person.name} className="bg-paper p-6 shadow-[0_18px_40px_rgba(0,0,0,0.28)]">
                <p dir="ltr" className="font-metric text-sm font-semibold tracking-[0.14em] text-olive">
                  {person.initials}
                </p>
                <h3 className="mt-6 font-display text-2xl">{person.name}</h3>
                <p className="mt-2 text-sm text-charcoal/70">{person.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#05060a] text-[#f4f5f8]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-10 px-4 py-16 sm:px-6 md:flex-row md:px-10 md:py-24 md:items-end md:justify-between md:px-10 lg:py-28">
          <div className="max-w-2xl">
            <p className="font-metric text-sm text-olive">2026</p>
            <h2 className="mt-4 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[0.98]">
              {t.closing.title}
            </h2>
            <p className="mt-6 max-w-xl text-white/70">{t.closing.text}</p>
          </div>
          <div className="flex w-full flex-col items-start gap-6 sm:w-auto sm:flex-row sm:items-center sm:gap-8">
            <Mark className="w-24 sm:w-28" />
            <Link
              href={hrefFor(locale, "/contact")}
              className="inline-flex min-h-12 w-full items-center justify-center border border-white/25 px-6 text-sm text-white transition-colors hover:border-olive hover:text-white sm:w-auto"
            >
              {t.closing.action}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
