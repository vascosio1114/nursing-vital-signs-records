"use client";

import { Building2, ShieldCheck } from "lucide-react";
import { MetricCard } from "@/components/humanos/cards";
import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { RechartsBarPanel, RechartsTrendPanel } from "@/components/humanos/recharts-panels";
import { useI18n } from "@/lib/i18n";

const orgMetricsEn = [
  ["Active Employees", "1,240"],
  ["Average Wellbeing Score", "74"],
  ["Stress Index", "Moderate"],
  ["Burnout Awareness Group", "16%"],
  ["Sleep Disruption Group", "31%"],
  ["Participation Rate", "72%"],
  ["Campaign Completion", "58%"],
] as const;

const orgMetricsZh = [
  ["活躍員工", "1,240"],
  ["平均福祉分數", "74"],
  ["壓力指數", "中等"],
  ["倦怠 awareness 群組", "16%"],
  ["睡眠受影響群組", "31%"],
  ["參與率", "72%"],
  ["活動完成率", "58%"],
] as const;

export default function OrganizationsPage() {
  const { t, locale } = useI18n();
  const metrics = locale === "zh" ? orgMetricsZh : orgMetricsEn;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
              HumanOS for Organizations
            </p>
            <h1 className="mt-3 text-5xl font-semibold leading-tight">{t.organizations.headline}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{t.organizations.body}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.slice(0, 6).map(([label, value]) => (
              <MetricCard key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeader eyebrow="Target Organizations" title={locale === "zh" ? "專業、輪班及面向客戶的高壓團隊。" : "High-pressure, customer-facing, and shift-based teams."} />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {t.organizations.targets.map((target) => (
            <div key={target} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <Building2 className="size-6 text-blue-600" aria-hidden="true" />
              <p className="mt-4 font-semibold">{target}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <SectionHeader eyebrow="Organization Features" title={locale === "zh" ? "匿名 HR 儀表板與福祉活動追蹤。" : "Anonymous HR dashboard and campaign tracking."} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {t.organizations.features.map((feature) => (
                <div key={feature} className="rounded-lg bg-white p-4 text-sm font-semibold text-slate-700">
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <RechartsTrendPanel title={t.labels.weeklyTrend} />
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <RechartsBarPanel title={t.labels.participation} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex gap-3 rounded-lg bg-blue-50 p-5 text-sm leading-7 text-blue-950">
          <ShieldCheck className="size-5 shrink-0" aria-hidden="true" />
          {t.organizations.privacy}
        </div>
      </section>
      <Footer />
    </main>
  );
}
