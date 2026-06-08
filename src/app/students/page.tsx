"use client";

import { GraduationCap, ShieldCheck } from "lucide-react";
import { DailyPlanCard, MetricCard } from "@/components/humanos/cards";
import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { RechartsTrendPanel } from "@/components/humanos/recharts-panels";
import { useI18n } from "@/lib/i18n";

const studentMetricKeys = [
  "wellbeingScore",
  "stressIndex",
  "focusScore",
  "sleepRecovery",
  "motivation",
  "emotionalBalance",
  "weeklyTrend",
  "aiRecommendations",
] as const;

const schoolMetrics = [
  ["Participating Students", "420"],
  ["Check-in Completion", "76%"],
  ["Anonymous Stress Trend", "+8%"],
  ["Sleep Risk Group", "24%"],
  ["Academic Burnout Awareness", "18%"],
  ["Engagement Rate", "69%"],
] as const;

export default function StudentsPage() {
  const { t, locale } = useI18n();
  const translatedSchoolMetrics =
    locale === "zh"
      ? [
          ["參與學生", "420"],
          ["Check-in 完成率", "76%"],
          ["匿名壓力趨勢", "+8%"],
          ["睡眠風險群組", "24%"],
          ["學業倦怠 awareness", "18%"],
          ["參與度", "69%"],
        ]
      : schoolMetrics;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
              HumanOS for Students
            </p>
            <h1 className="mt-3 text-5xl font-semibold leading-tight">{t.students.headline}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-300">{t.students.body}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {studentMetricKeys.map((key, index) => (
              <MetricCard key={key} label={t.labels[key]} value={["78", "Moderate", "72", "64", "68", "74", "+6%", "4"][index]} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeader eyebrow="Student Features" title={locale === "zh" ? "為學生提供日常福祉支援。" : "Daily wellbeing support for study life."} />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {t.students.features.map((feature) => (
            <div key={feature} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <GraduationCap className="size-6 text-blue-600" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-slate-700">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[1fr_0.9fr] lg:px-8">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
            <SectionHeader eyebrow="School Dashboard" title={locale === "zh" ? "匿名學生支援趨勢。" : "Anonymous student support trends."} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {translatedSchoolMetrics.map(([label, value]) => (
                <MetricCard key={label} label={label} value={value} />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <RechartsTrendPanel title={t.labels.weeklyTrend} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <SectionHeader eyebrow="AI Study Plan" title={locale === "zh" ? "學生今日可以執行的支援計劃。" : "Guidance students can act on today."} />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <DailyPlanCard period={t.plan.morning} tasks={[...t.plan.morningTasks]} />
          <DailyPlanCard period={t.plan.afternoon} tasks={[...t.plan.afternoonTasks]} />
          <DailyPlanCard period={t.plan.evening} tasks={[...t.plan.eveningTasks]} />
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex gap-3 rounded-lg bg-blue-50 p-5 text-sm leading-7 text-blue-950">
            <ShieldCheck className="size-5 shrink-0" aria-hidden="true" />
            {t.students.privacy}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
