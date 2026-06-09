"use client";

import Link from "next/link";
import { ArrowRight, ScanHeart, Sparkles } from "lucide-react";
import { useI18n, type Locale } from "@/lib/i18n";

export function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const navItems = [
    [t.nav.product, "/demo"],
    [t.nav.students, "/students"],
    [t.nav.organizations, "/organizations"],
    [t.nav.pilot, "/pilot"],
    [t.nav.privacy, "/privacy"],
    [t.nav.technology, "/technology"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/82 text-[#1d1d1f] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="HumanOS home">
          <span className="grid size-10 place-items-center rounded-2xl bg-[#f5f5f7] text-[#007aff] ring-1 ring-black/5">
              <ScanHeart className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-semibold leading-5">HumanOS</span>
            <span className="block text-xs font-medium text-[#6e6e73]">
              {t.nav.subtitle}
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-[#6e6e73] md:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-[#007aff]">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} setLocale={setLocale} />
          <Link
            href="/contact"
            className="hidden items-center justify-center gap-2 rounded-full bg-[#007aff] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0066d6] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2 sm:inline-flex"
          >
            <Sparkles className="size-4" aria-hidden="true" />
            {t.nav.contact}
          </Link>
        </div>
      </nav>
    </header>
  );
}

function LanguageSwitcher({
  locale,
  setLocale,
}: {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}) {
  return (
    <div className="flex rounded-full border border-black/5 bg-[#f5f5f7] p-1 text-xs font-semibold">
      {(["en", "zh"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={`rounded-full px-2.5 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-[#007aff] ${
            locale === item
              ? "bg-white text-[#1d1d1f] shadow-sm"
              : "text-[#6e6e73] hover:text-[#007aff]"
          }`}
          aria-pressed={locale === item}
        >
          {item === "en" ? "EN" : "繁中"}
        </button>
      ))}
    </div>
  );
}

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-black/5 bg-[#f5f5f7] py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 text-sm text-[#6e6e73] md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div>
          <p className="text-lg font-semibold text-[#1d1d1f]">HumanOS</p>
          <p className="mt-2 max-w-2xl leading-6">
            {t.footer.text}
          </p>
        </div>
        <Link
          href="/waitlist"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-5 py-3 font-semibold text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
        >
          {t.cta.startPilot}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  dark = false,
  headingLevel = "h2",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  dark?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const headingClass = `mt-3 text-3xl font-semibold leading-tight sm:text-4xl ${dark ? "text-white" : "text-slate-950"}`;

  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-500">
        {eyebrow}
      </p>
      {headingLevel === "h1" ? (
        <h1 className={headingClass}>{title}</h1>
      ) : (
        <h2 className={headingClass}>{title}</h2>
      )}
      {body ? (
        <p className={`mt-4 text-base leading-7 ${dark ? "text-slate-300" : "text-slate-600"}`}>
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function CTASection() {
  const { t } = useI18n();

  return (
    <section className="bg-slate-950 py-16 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            HumanOS
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight">
            {t.home.eyebrow}
          </h2>
        </div>
        <Link
          href="/waitlist"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {t.cta.startPilot}
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
