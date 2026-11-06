import { hrefFor, type Locale } from "@/lib/locale";
import Link from "next/link";

type LogoProps = {
  locale: Locale;
  tone?: "dark" | "light";
  compact?: boolean;
};

export function Logo({ locale, tone = "dark", compact = false }: LogoProps) {
  const color = tone === "light" ? "text-ivory" : "text-charcoal";

  return (
    <Link
      href={hrefFor(locale)}
      className={`wordmark inline-flex flex-col leading-none ${color}`}
      aria-label="LSAR* Works Group"
    >
      <span className="font-display text-[1.35rem] font-semibold tracking-[-0.05em]">
        LSAR<span className="text-olive">*</span>
      </span>
      <span
        className={`wordmark-sub mt-1 text-[0.52rem] font-medium uppercase ${
          compact ? "hidden" : "hidden sm:block"
        }`}
      >
        Works Group
      </span>
    </Link>
  );
}
