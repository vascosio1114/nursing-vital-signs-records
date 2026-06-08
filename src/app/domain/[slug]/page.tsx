"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  Brain,
  CalendarCheck,
  CheckCircle2,
  LineChart,
  MessageCircle,
  Radar,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { getDomain, healthDomains, type HealthDomain } from "@/lib/humanos-data";

const trendIcons = {
  improving: TrendingUp,
  stable: Activity,
  declining: TrendingDown,
};

const riskTone = {
  low: "border-emerald-200 bg-emerald-50 text-emerald-700",
  medium: "border-amber-200 bg-amber-50 text-amber-700",
  high: "border-rose-200 bg-rose-50 text-rose-700",
};

export default function DomainPage() {
  const params = useParams<{ slug: string }>();
  const domain = getDomain(params.slug);

  if (!domain) {
    notFound();
  }

  const TrendIcon = trendIcons[domain.trend];
  const relatedDomains = healthDomains
    .filter((item) => item.slug !== domain.slug)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-950"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
              Wellbeing OS
          </Link>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-slate-950 text-white">
              <Brain className="size-5" aria-hidden="true" />
            </span>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-950">HumanOS</p>
              <p className="text-xs text-slate-500">Wellbeing Intelligence</p>
            </div>
          </div>
        </nav>
      </header>

      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_25%_18%,rgba(59,130,246,0.16),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Wellbeing Domain Dashboard
            </p>
            <h1 className="mt-3 text-5xl font-semibold leading-tight text-slate-950">
              {domain.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              {domain.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold ${riskTone[domain.risk]}`}>
                <ShieldAlert className="size-4" />
                {domain.risk} risk
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold capitalize text-slate-700">
                <TrendIcon className="size-4" />
                {domain.trend}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/8">
            <div className="grid gap-5 sm:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-lg bg-slate-950 p-5 text-white">
                <p className="text-sm font-semibold text-cyan-300">
                  {domain.name} Score
                </p>
                <div className="mt-6 flex items-end gap-2">
                  <span className="text-7xl font-semibold">{domain.score}</span>
                  <span className="pb-3 text-sm text-slate-400">/100</span>
                </div>
                <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-cyan-300"
                    style={{ width: `${domain.score}%` }}
                  />
                </div>
                <p className="mt-5 text-sm leading-6 text-slate-300">
                  AI confidence: high. Data sources include self-check-in,
                  behavior signals, and trend history.
                </p>
              </div>

              <TrendChart domain={domain} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-5 py-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div className="grid gap-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">Wellbeing Signals</p>
                <h2 className="text-2xl font-semibold">Live metric panel</h2>
              </div>
              <Radar className="size-6 text-blue-600" aria-hidden="true" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {domain.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-slate-500">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-950">
                    {metric.value}
                  </p>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <MessageCircle className="size-6 text-blue-600" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-blue-600">AI Wellbeing Analysis</p>
                <h2 className="text-2xl font-semibold">System interpretation</h2>
              </div>
            </div>
            <p className="max-w-4xl text-base leading-8 text-slate-700">
              {domain.analysis}
            </p>
          </section>
        </div>

        <aside className="grid gap-5">
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-600">
                  Recommendations
                </p>
                <h2 className="text-xl font-semibold">Next best actions</h2>
              </div>
              <Sparkles className="size-6 text-blue-600" aria-hidden="true" />
            </div>
            <div className="space-y-4">
              {domain.recommendations.map((recommendation) => (
                <div key={recommendation} className="flex gap-3 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                  <span>{recommendation}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-cyan-300">
                  Adaptive Daily Plan
                </p>
                <h2 className="text-xl font-semibold">Domain response</h2>
              </div>
              <CalendarCheck className="size-6 text-cyan-300" aria-hidden="true" />
            </div>
            <p className="text-sm leading-6 text-slate-300">
              HumanOS will adjust today&apos;s plan based on this domain&apos;s
              risk level, trend direction, and relationship to stress, sleep,
              focus, workload, and recovery signals.
            </p>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-blue-600">Connected Domains</p>
            <div className="mt-4 grid gap-3">
              {relatedDomains.map((item) => (
                <Link
                  key={item.slug}
                  href={`/domain/${item.slug}`}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {item.name}
                  <span>{item.score}</span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}

function TrendChart({ domain }: { domain: HealthDomain }) {
  const values =
    domain.trend === "declining"
      ? [82, 79, 76, 72, 68, domain.score]
      : domain.trend === "improving"
        ? [domain.score - 14, domain.score - 10, domain.score - 8, domain.score - 4, domain.score - 2, domain.score]
        : [domain.score - 3, domain.score - 1, domain.score, domain.score - 2, domain.score + 1, domain.score];

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">Trend Chart</p>
          <p className="text-lg font-semibold text-slate-950">6-week trajectory</p>
        </div>
        <LineChart className="size-5 text-blue-600" aria-hidden="true" />
      </div>
      <div className="mt-8 flex h-40 items-end gap-3">
        {values.map((value, index) => (
          <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end rounded-md bg-white">
              <div
                className="w-full rounded-md bg-gradient-to-t from-blue-600 to-cyan-300"
                style={{ height: `${Math.max(value, 12)}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-400">W{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
