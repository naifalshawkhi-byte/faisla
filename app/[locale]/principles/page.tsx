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
  const locale: Locale = isLocale(raw) ? raw : "ar";
  const meta = copy[locale].meta.principles;
  return buildMetadata(locale, { ...meta, path: "/principles" });
}

export default async function PrinciplesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ar";
  const t = copy[locale].principles;

  return (
    <article className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pb-24 md:pt-36 lg:pb-32">
      <header className="max-w-4xl">
        <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.index}</p>
        <h1 className="mt-4 font-display text-[clamp(2.7rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          {t.title}
        </h1>
        <p className="mt-8 text-2xl leading-relaxed">{t.lead}</p>
        <p className="mt-4 text-charcoal/70">{t.leadNote}</p>
      </header>
      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {t.items.map((item) => (
          <section key={item.id} className="flex min-h-80 flex-col bg-stone p-8 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <h2 className="font-display text-3xl leading-tight">{item.title}</h2>
              <p className="font-metric text-sm tracking-[0.16em] text-olive">{item.id}</p>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-charcoal/75">{item.text}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
