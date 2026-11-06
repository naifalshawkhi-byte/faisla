import { copy } from "@/content/copy";
import { hrefFor, isLocale, type Locale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const meta = copy[locale].meta.challenges;
  return buildMetadata(locale, { ...meta, path: "/challenges" });
}

export default async function ChallengesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = copy[locale].challenges;

  return (
    <article className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pb-24 md:pt-36 lg:pb-32">
      <header className="max-w-4xl">
        <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.index}</p>
        <h1 className="mt-4 font-display text-[clamp(2.7rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          {t.title}
        </h1>
        <p className="mt-8 text-xl leading-relaxed text-charcoal/80">{t.lead}</p>
        <p className="mt-5 max-w-3xl leading-relaxed text-charcoal/70">{t.body}</p>
        <p className="mt-5 max-w-3xl leading-relaxed text-charcoal/70">{t.risk}</p>
      </header>

      <ol className="mt-20 border-t border-charcoal/10">
        {t.items.map((item) => (
          <li
            key={item.id}
            className="grid gap-6 border-b border-charcoal/10 py-12 md:grid-cols-12"
          >
            <p className="font-metric text-4xl text-olive md:col-span-2">{item.id}</p>
            <div className="md:col-span-4">
              <p className="text-[0.72rem] uppercase tracking-[0.16em] text-charcoal/50">
                {item.stage}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight md:text-4xl">{item.title}</h2>
            </div>
            <p className="text-lg leading-relaxed text-charcoal/75 md:col-span-6">{item.text}</p>
          </li>
        ))}
      </ol>

      <aside className="mt-16 grid gap-8 bg-stone p-8 md:grid-cols-12 md:p-12">
        <div className="md:col-span-7">
          <h2 className="font-display text-3xl">{t.outcomeTitle}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-charcoal/75">{t.outcomeText}</p>
          <ul className="mt-6 space-y-2 text-sm text-charcoal/75">
            {t.notes.map((note) => (
              <li key={note} className="flex gap-3">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-bronze" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="font-display text-2xl leading-snug text-charcoal md:col-span-5">
          {t.callout}
        </p>
      </aside>

      <p className="mt-12 max-w-2xl text-charcoal/75">
        {t.bridge}{" "}
        <Link href={hrefFor(locale, "/system")} className="text-charcoal underline decoration-bronze underline-offset-4">
          {t.bridgeLink}
        </Link>
      </p>
    </article>
  );
}
