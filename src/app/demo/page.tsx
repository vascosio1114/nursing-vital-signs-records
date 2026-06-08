"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { DailyPlanCard, MetricCard } from "@/components/humanos/cards";
import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { RechartsBarPanel, RechartsTrendPanel } from "@/components/humanos/recharts-panels";
import { useI18n } from "@/lib/i18n";

export default function DemoPage() {
  const { t } = useI18n();
  const [profile, setProfile] = useState(0);
  const [answers, setAnswers] = useState([68, 55, 74, 70, 72, 66]);
  const [generated, setGenerated] = useState(false);

  const scores = useMemo(() => {
    const [stress, sleep, focus, balance, workload, motivation] = answers;
    const wellbeing = Math.round((sleep + focus + balance + motivation + (100 - stress) + (100 - workload)) / 6);
    return {
      wellbeing,
      stressIndex: Math.round((stress + workload) / 2),
      burnout: Math.round((stress + workload + (100 - sleep)) / 3),
      focus,
      sleep,
    };
  }, [answers]);

  function updateAnswer(index: number, value: number) {
    setAnswers((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
    setGenerated(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Product Demo" title={t.demo.headline} body={t.demo.body} dark headingLevel="h1" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="grid gap-5">
          <DemoPanel step="1" title={t.demo.steps[0]}>
            <div className="grid gap-3">
              {t.demo.profiles.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setProfile(index)}
                  className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    profile === index
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </DemoPanel>

          <DemoPanel step="2" title={t.demo.steps[1]}>
            <div className="grid gap-5">
              {t.demo.questions.map((question, index) => (
                <label key={question} className="grid gap-2">
                  <span className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-700">
                    {question}
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-slate-950">{answers[index]}</span>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={answers[index]}
                    onChange={(event) => updateAnswer(index, Number(event.target.value))}
                    className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-blue-600"
                  />
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t.cta.generateReport}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </DemoPanel>
        </div>

        <div className="grid gap-5">
          <DemoPanel step="3" title={t.demo.steps[2]}>
            <div className="grid gap-3 sm:grid-cols-2">
              <MetricCard label={t.labels.wellbeingScore} value={`${scores.wellbeing} / 100`} />
              <MetricCard label={t.labels.stressIndex} value={`${scores.stressIndex}`} />
              <MetricCard label={t.labels.burnoutAwareness} value={scores.burnout > 66 ? "Elevated" : "Moderate"} />
              <MetricCard label={t.labels.focusScore} value={`${scores.focus}`} />
              <MetricCard label={t.labels.sleepRecovery} value={`${scores.sleep}`} />
            </div>
          </DemoPanel>

          <DemoPanel step="4" title={t.demo.steps[3]}>
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-7 text-slate-700">
              <p className="mb-2 flex items-center gap-2 font-semibold text-blue-700">
                <Sparkles className="size-4" aria-hidden="true" />
                {generated ? `${t.demo.profiles[profile]} ${t.demo.generated}` : t.demo.steps[3]}
              </p>
              {t.demo.report}
            </div>
          </DemoPanel>

          <DemoPanel step="5" title={t.demo.steps[4]}>
            <div className="grid gap-3 md:grid-cols-3">
              <DailyPlanCard period={t.plan.morning} tasks={[...t.plan.morningTasks]} />
              <DailyPlanCard period={t.plan.afternoon} tasks={[...t.plan.afternoonTasks]} />
              <DailyPlanCard period={t.plan.evening} tasks={[...t.plan.eveningTasks]} />
            </div>
          </DemoPanel>

          <DemoPanel step="6" title={t.demo.steps[5]}>
            <div className="grid gap-5 lg:grid-cols-2">
              <RechartsTrendPanel title={t.labels.weeklyTrend} />
              <RechartsBarPanel title={t.labels.anonymousDashboard} />
            </div>
          </DemoPanel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
          {t.demo.privacy}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function DemoPanel({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-slate-950 text-sm font-semibold text-white">{step}</span>
        <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      </div>
      {children}
    </section>
  );
}
