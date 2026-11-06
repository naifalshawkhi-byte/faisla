import { SystemFlow } from "@/components/system-flow";
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
  const meta = copy[locale].meta.system;
  return buildMetadata(locale, { ...meta, path: "/system" });
}

export default async function SystemPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = copy[locale].system;

  return (
    <article>
      <header className="mx-auto grid w-full max-w-[1400px] items-end gap-10 px-4 pb-10 pt-28 sm:px-6 md:px-10 md:pt-36 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.index}</p>
          <h1 className="mt-4 font-display text-[clamp(2.7rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
            {t.title}
          </h1>
        </div>
        <p className="text-lg leading-relaxed text-charcoal/75 lg:col-span-5">{t.phrase}</p>
      </header>

      <div className="border-y border-charcoal/10 bg-paper">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
          <p className="max-w-3xl text-xl leading-relaxed text-charcoal/80">{t.lead}</p>
          <p className="mt-5 max-w-3xl leading-relaxed text-charcoal/70">{t.body}</p>
          <div className="mt-16">
            <SystemFlow stages={t.stages} />
          </div>
        </div>
      </div>

      <section className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 py-20 md:px-10 lg:grid-cols-12 lg:py-28">
        <div className="lg:col-span-5">
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-charcoal/60">
            {t.continuationLabel}
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,3.5vw,3rem)] font-medium leading-tight tracking-[-0.03em]">
            {t.continuationTitle}
          </h2>
          <p className="mt-6 leading-relaxed text-charcoal/75">{t.continuationLead}</p>
          <div className="relative mt-10 hidden min-h-72 lg:block">
            <Image
              src="/images/architecture-light.jpg"
              alt={
                locale === "ar"
                  ? "ضوء وظل على تكوين معماري هادئ"
                  : "Light and shadow across a quiet architectural interior"
              }
              fill
              sizes="36vw"
              className="object-cover"
            />
          </div>
        </div>
        <ol className="lg:col-span-7">
          {t.continuation.map((item) => (
            <li key={item.id} className="border-t border-charcoal/10 py-7">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-charcoal/50">
                  {item.stage}
                </p>
                <p className="font-metric text-sm text-olive">{item.id}</p>
              </div>
              <h3 className="mt-3 font-display text-2xl">{item.title}</h3>
              <p className="mt-3 max-w-xl leading-relaxed text-charcoal/75">{item.text}</p>
            </li>
          ))}
          <li className="border-t border-charcoal/10 py-7">
            <h3 className="font-display text-2xl">{t.consistentTitle}</h3>
            <p className="mt-3 text-charcoal/75">{t.consistentText}</p>
          </li>
        </ol>
      </section>
    </article>
  );
}
