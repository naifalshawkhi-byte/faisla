"use client";

import { copy } from "@/content/copy";
import { hrefFor, isLocale } from "@/lib/locale";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotFound() {
  const params = useParams<{ locale: string }>();
  const locale = params?.locale && isLocale(params.locale) ? params.locale : "ar";
  const t = copy[locale].notFound;

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-6 py-36">
      <p className="font-metric text-sm tracking-[0.18em] text-olive">404</p>
      <h1 className="mt-4 font-display text-5xl font-medium tracking-[-0.03em]">{t.title}</h1>
      <p className="mt-5 text-charcoal/70">{t.text}</p>
      <Link
        href={hrefFor(locale)}
        className="mt-8 inline-flex min-h-12 w-fit items-center bg-charcoal px-6 text-sm text-ivory"
      >
        {t.action}
      </Link>
    </section>
  );
}
