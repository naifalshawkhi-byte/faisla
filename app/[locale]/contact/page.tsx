import { ContactForm } from "@/components/contact-form";
import { copy } from "@/content/copy";
import { email, phones, websiteHref, websiteLabel } from "@/lib/contact";
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
  const meta = copy[locale].meta.contact;
  return buildMetadata(locale, { ...meta, path: "/contact" });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "ar";
  const t = copy[locale].contact;

  return (
    <article className="mx-auto grid w-full max-w-[1400px] gap-14 px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pb-24 md:pt-36 lg:grid-cols-12 lg:pb-32">
      <header className="lg:col-span-5">
        <p className="font-metric text-sm tracking-[0.18em] text-olive">{t.index}</p>
        <h1 className="mt-4 font-display text-[clamp(2.7rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.035em]">
          {t.title}
        </h1>
        <p className="mt-6 text-lg text-charcoal/75">{t.lead}</p>
        <dl className="mt-12 space-y-7 text-sm">
          <div>
            <dt className="uppercase tracking-[0.16em] text-charcoal/50">{t.addressLabel}</dt>
            <dd className="mt-2 text-lg text-charcoal">{t.address}</dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-charcoal/50">{t.phoneLabel}</dt>
            <dd className="mt-2 space-y-1 text-lg">
              {phones.map((phone) => (
                <a key={phone.href} href={phone.href} className="block hover:text-olive">
                  {phone.display}
                </a>
              ))}
            </dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-charcoal/50">{t.emailLabel}</dt>
            <dd className="mt-2 text-lg">
              <a href={`mailto:${email}`} className="hover:text-olive">
                {email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="uppercase tracking-[0.16em] text-charcoal/50">{t.webLabel}</dt>
            <dd className="mt-2 text-lg">
              <a href={websiteHref} className="hover:text-olive">
                {websiteLabel}
              </a>
            </dd>
          </div>
        </dl>
      </header>
      <div className="lg:col-span-7">
        <ContactForm labels={t} />
      </div>
    </article>
  );
}
