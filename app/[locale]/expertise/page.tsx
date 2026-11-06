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
  const meta = copy[locale].meta.expertise;
  return buildMetadata(locale, { ...meta, path: "/expertise" });
}

export default async function ExpertisePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const t = copy[locale].expertise;

  return (
    <article className="mx-auto w-full max-w-[1400px] px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pb-24 md:pt-36 lg:pb-32">
      <header className="max-w-4xl">
        <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.index}</p>
        <h1 className="mt-4 font-display text-[clamp(2.7rem,5.5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          {t.title}
        </h1>
        <p className="mt-8 max-w-2xl text-xl leading-relaxed text-charcoal/75">{t.lead}</p>
      </header>
      <div className="mt-16 space-y-8">
        {t.areas.map((area) => (
          <section key={area.id} className="border border-charcoal/10 bg-paper">
            <div className="grid gap-8 p-7 md:p-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="font-metric text-sm tracking-[0.18em] text-olive">{area.id}</p>
                <h2 className="mt-4 font-display text-[clamp(2rem,3vw,3rem)] leading-tight">
                  {area.title}
                </h2>
                <ul className="mt-8 space-y-3">
                  {area.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-baseline gap-4 border-t border-charcoal/10 pt-3 text-lg"
                    >
                      <span aria-hidden className="font-metric text-xs text-bronze">
                        —
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-end bg-stone p-6 lg:col-span-5">
                <p className="text-[0.72rem] uppercase tracking-[0.16em] text-charcoal/55">
                  {t.outputLabel}
                </p>
                <p className="mt-4 font-display text-2xl leading-snug">{area.output}</p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
