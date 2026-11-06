"use client";

import { Logo } from "@/components/logo";
import { hrefFor, navPaths, type Locale } from "@/lib/locale";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type HeaderProps = {
  locale: Locale;
  labels: {
    about: string;
    system: string;
    expertise: string;
    leadership: string;
    contact: string;
    contactCta: string;
    menu: string;
    close: string;
    language: string;
  };
};

export function Header({ locale, labels }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const other: Locale = locale === "ar" ? "en" : "ar";
  const rest = pathname.replace(/^\/(en|ar)/, "") || "";
  const switchHref = hrefFor(other, rest);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? "border-b border-charcoal/10 bg-ivory" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 md:h-20 md:px-10">
        <Logo locale={locale} />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {navPaths.map((item) => {
            const href = hrefFor(locale, item.path);
            const active = pathname === href;
            return (
              <Link
                key={item.path}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`text-[0.92rem] tracking-wide transition-colors hover:text-olive ${
                  active ? "text-charcoal" : "text-charcoal/75"
                }`}
              >
                {labels[item.key]}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.16em]">
            <span className="sr-only">{labels.language}</span>
            <Link
              href={hrefFor("en", rest)}
              hrefLang="en"
              className={locale === "en" ? "text-charcoal" : "text-charcoal/45"}
              aria-current={locale === "en" ? "true" : undefined}
            >
              EN
            </Link>
            <span aria-hidden className="text-bronze">
              /
            </span>
            <Link
              href={hrefFor("ar", rest)}
              hrefLang="ar"
              className={locale === "ar" ? "text-charcoal" : "text-charcoal/45"}
              aria-current={locale === "ar" ? "true" : undefined}
            >
              AR
            </Link>
          </div>
          <Link
            href={hrefFor(locale, "/contact")}
            className="hidden min-h-10 items-center bg-charcoal px-4 text-[0.82rem] text-ivory transition-colors hover:bg-olive hover:text-white sm:inline-flex"
          >
            {labels.contactCta}
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden size={20} /> : <Menu aria-hidden size={20} />}
            <span className="sr-only">{open ? labels.close : labels.menu}</span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="fixed inset-x-0 bottom-0 top-16 z-30 overflow-y-auto bg-ivory px-5 py-6 md:top-20 lg:hidden"
        >
          <ul className="flex flex-col">
            {navPaths.map((item) => (
              <li key={item.path} className="border-b border-white/10">
                <Link
                  href={hrefFor(locale, item.path)}
                  className="flex min-h-14 items-center font-display text-[1.65rem] text-charcoal"
                >
                  {labels[item.key]}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={hrefFor(locale, "/contact")}
            className="mt-6 flex min-h-12 items-center justify-center bg-charcoal text-sm text-ivory"
          >
            {labels.contactCta}
          </Link>
          <Link
            href={switchHref}
            className="mt-4 flex min-h-12 items-center text-sm text-charcoal/70"
          >
            {other === "ar" ? "العربية" : "English"}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
