import { Logo } from "@/components/logo";
import { email, phones, websiteHref, websiteLabel } from "@/lib/contact";
import { footerPaths, hrefFor, type Locale } from "@/lib/locale";
import Link from "next/link";

type FooterProps = {
  locale: Locale;
  labels: {
    about: string;
    system: string;
    expertise: string;
    leadership: string;
    contact: string;
  };
  footer: {
    challenges: string;
    principles: string;
    navigate: string;
    contact: string;
    rights: string;
  };
  address: string;
};

const footerKey = {
  "/about": "about",
  "/challenges": "challenges",
  "/system": "system",
  "/principles": "principles",
  "/expertise": "expertise",
  "/leadership": "leadership",
  "/contact": "contact",
} as const;

export function Footer({ locale, labels, footer, address }: FooterProps) {
  const names = { ...labels, ...footer };

  return (
    <footer className="border-t border-charcoal/10 bg-ivory">
      <div className="mx-auto grid w-full max-w-[1400px] gap-10 px-4 py-14 sm:px-6 md:px-10 md:py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo locale={locale} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-charcoal/75">
            {locale === "ar"
              ? "تحالف متكامل لقيادة التحولات المؤسسية وإدارة عمليات العلامة التجارية."
              : "An Integrated Alliance for Institutional Transformation & Brand Operations Management."}
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-charcoal">
            {footer.navigate}
          </p>
          <ul className="mt-4 space-y-2">
            {footerPaths.map((item) => (
              <li key={item.path}>
                <Link
                  href={hrefFor(locale, item.path)}
                  className="text-sm text-charcoal/75 transition-colors hover:text-charcoal"
                >
                  {names[footerKey[item.path]]}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4">
          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-charcoal">
            {footer.contact}
          </p>
          <address className="mt-4 space-y-2 text-sm not-italic text-charcoal/75">
            <p>{address}</p>
            {phones.map((phone) => (
              <p key={phone.href}>
                <a className="hover:text-charcoal" href={phone.href}>
                  {phone.display}
                </a>
              </p>
            ))}
            <p>
              <a className="hover:text-charcoal" href={`mailto:${email}`}>
                {email}
              </a>
            </p>
            <p>
              <a className="hover:text-charcoal" href={websiteHref}>
                {websiteLabel}
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="border-t border-charcoal/10">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2 px-4 py-5 text-xs text-charcoal/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 md:px-10">
          <p>© 2026 {footer.rights}</p>
          <p className="font-metric tracking-[0.14em]">LSAR*</p>
        </div>
      </div>
    </footer>
  );
}
