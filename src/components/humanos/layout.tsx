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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/88 text-white backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="HumanOS home">
          <span className="grid size-10 place-items-center rounded-lg bg-white text-slate-950">
              <ScanHeart className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-base font-semibold leading-5">HumanOS</span>
            <span className="block text-xs font-medium text-slate-400">
              {t.nav.subtitle}
            </span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 text-sm font-medium text-slate-300 md:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-white">
              {label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} setLocale={setLocale} />
          <Link
            href="/contact"
            className="hidden items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-300 sm:inline-flex"
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
    <div className="flex rounded-lg border border-white/15 bg-white/5 p-1 text-xs font-semibold">
      {(["en", "zh"] as const).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLocale(item)}
          className={`rounded-md px-2.5 py-1.5 transition focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
            locale === item
              ? "bg-white text-slate-950"
              : "text-slate-300 hover:text-white"
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
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 text-sm text-slate-500 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-950">HumanOS</p>
          <p className="mt-2 max-w-2xl leading-6">
            {t.footer.text}
          </p>
        </div>
        <Link
          href="/waitlist"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
