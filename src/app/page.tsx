"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2, GraduationCap, Hotel, ShieldCheck, Sparkles } from "lucide-react";
import { MetricCard } from "@/components/humanos/cards";
import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { RechartsRadarPanel, RechartsTrendPanel } from "@/components/humanos/recharts-panels";
import { useI18n } from "@/lib/i18n";

const heroMetrics = [
  ["wellbeingScore", "78"],
  ["stressIndex", "Moderate"],
  ["sleepRecovery", "64"],
  ["focusScore", "72"],
  ["aiDailyPlan", "3"],
  ["anonymousDashboard", "Live"],
] as const;

export default function HomePage() {
  const { locale, t } = useI18n();
  const flow = [
    "Private Check-in",
    "AI Wellbeing Report",
    "Daily Support Plan",
    "Personal Dashboard",
    "Anonymous Institution Dashboard",
  ];
  const flowZh = ["私密 Check-in", "AI 福祉報告", "每日支援計劃", "個人儀表板", "匿名化機構儀表板"];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />

      <section className="bg-slate-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm font-semibold text-cyan-200">
              <Sparkles className="size-4" aria-hidden="true" />
              {t.home.eyebrow}
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.03] sm:text-6xl">
              {t.home.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {t.home.subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/demo"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-white"
              >
                {t.cta.viewDemo}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <Link
                href="/pilot"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                {t.cta.startPilot}
              </Link>
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-400">{t.home.market}</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4 shadow-2xl shadow-cyan-950/20">
            <div className="grid gap-4 md:grid-cols-2">
              {heroMetrics.map(([key, value]) => (
                <MetricCard key={key} label={t.labels[key]} value={value} />
              ))}
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg bg-white p-5 text-slate-950">
                <RechartsTrendPanel title={t.labels.weeklyTrend} />
              </div>
              <div className="rounded-lg bg-white p-5">
                <RechartsRadarPanel />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <SectionHeader eyebrow="Problem" title={t.home.problemTitle} body={t.home.problemBody} />
          <div className="grid gap-3">
            {[
              t.labels.stressIndex,
              t.labels.sleepRecovery,
              t.labels.focusScore,
              t.labels.motivation,
              t.labels.emotionalBalance,
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-lg bg-slate-50 p-4 text-sm text-slate-700">
                <CheckCircle2 className="size-5 shrink-0 text-blue-600" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Solution" title={t.home.solutionTitle} body={t.home.solutionBody} />
          <div className="mt-8 grid gap-3 md:grid-cols-5">
            {(locale === "zh" ? flowZh : flow).map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-white p-5 text-center shadow-sm">
                <span className="mx-auto grid size-9 place-items-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="mt-4 text-sm font-semibold text-slate-950">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 lg:grid-cols-2 lg:px-8">
          <UseCaseCard icon={<GraduationCap className="size-8" />} title="HumanOS for Students" href="/students" body={t.students.headline} />
          <UseCaseCard icon={<Hotel className="size-8" />} title="HumanOS for Organizations" href="/organizations" body={t.organizations.headline} />
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.75fr_1.25fr] lg:px-8">
          <SectionHeader eyebrow="Privacy" title={t.home.privacyTitle} body={t.home.privacyBody} dark />
          <div className="grid gap-3 md:grid-cols-2">
            {t.privacy.canSee.slice(0, 4).map((item) => (
              <div key={item} className="flex gap-3 rounded-lg bg-white/7 p-4 text-sm text-slate-200">
                <ShieldCheck className="size-5 shrink-0 text-cyan-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Business Model" title={t.home.businessTitle} />
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(t.pilot.pricing as [string, string][]).map((entry) => (
              <div key={entry[0]} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-blue-600">{entry[1]}</p>
                <h3 className="mt-3 text-xl font-semibold">{entry[0]}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Roadmap" title={t.home.roadmapTitle} />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {(t.pilot.months as [string, string[]][]).map((entry, index) => (
              <div key={entry[0]} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-blue-600">Phase {index + 1}</p>
                <p className="mt-4 font-semibold">{entry[1][0]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function UseCaseCard({
  icon,
  title,
  body,
  href,
}: {
  icon: ReactNode;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link href={href} className="group rounded-lg border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg">
      <div className="text-blue-600">{icon}</div>
      <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
        <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}
