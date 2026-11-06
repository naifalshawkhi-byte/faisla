import { copy } from "@/content/copy";
import { isLocale, type Locale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const meta = copy[locale].meta.leadership;
  return buildMetadata(locale, { ...meta, path: "/leadership" });
}

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = copy[locale].leadership;

  return (
    <article className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pb-24 md:pt-36 lg:pb-32">
      <header className="max-w-3xl">
        <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.index}</p>
        <h1 className="mt-4 font-display text-[clamp(2.7rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          {t.title}
        </h1>
        <p className="mt-8 text-xl text-charcoal/75">{t.lead}</p>
      </header>
      <ul className="mt-16 grid gap-5 md:grid-cols-2">
        {t.people.map((person) => (
          <li key={person.name} className="border border-charcoal/10 bg-paper p-7 md:p-9">
            <div
              dir="ltr"
              className="flex size-14 items-center justify-center bg-stone font-metric text-sm font-semibold tracking-[0.14em] text-olive"
              aria-hidden
            >
              {person.initials}
            </div>
            <h2 className="mt-8 font-display text-3xl">{person.name}</h2>
            <p className="mt-2 text-sm uppercase tracking-[0.14em] text-olive">{person.role}</p>
            <p className="mt-5 max-w-md leading-relaxed text-charcoal/75">{person.text}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
