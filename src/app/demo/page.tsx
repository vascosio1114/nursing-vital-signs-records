"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BellRing,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  HeartPulse,
  LockKeyhole,
  Moon,
  School,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";
import { Footer, Navbar } from "@/components/humanos/layout";
import { RechartsBarPanel, RechartsRadarPanel, RechartsTrendPanel } from "@/components/humanos/recharts-panels";
import { useI18n } from "@/lib/i18n";

const scenarios = [
  {
    icon: School,
    en: "School cohort",
    zh: "學校班級",
    bodyEn: "A class shows rising stress and declining sleep recovery over two weeks.",
    bodyZh: "某班級連續兩星期壓力上升、睡眠恢復下降。",
  },
  {
    icon: BriefcaseBusiness,
    en: "Macao resort team",
    zh: "澳門博企團隊",
    bodyEn: "A shift-based service team shows fatigue signals after peak operating weeks.",
    bodyZh: "輪班服務團隊喺高峰營運後出現疲勞訊號。",
  },
  {
    icon: UsersRound,
    en: "HR wellbeing campaign",
    zh: "HR Wellbeing Campaign",
    bodyEn: "HR wants to know whether a wellbeing campaign is actually improving trends.",
    bodyZh: "HR 想知道 wellbeing campaign 係咪真係改善趨勢。",
  },
] as const;

const questions = [
  { key: "stress", icon: HeartPulse, en: "Stress level", zh: "壓力水平", dangerHigh: true },
  { key: "sleep", icon: Moon, en: "Sleep recovery", zh: "睡眠恢復", dangerHigh: false },
  { key: "focus", icon: Brain, en: "Focus quality", zh: "專注質素", dangerHigh: false },
  { key: "energy", icon: Zap, en: "Energy level", zh: "能量水平", dangerHigh: false },
  { key: "workload", icon: BriefcaseBusiness, en: "Workload pressure", zh: "工作 / 學業壓力", dangerHigh: true },
  { key: "support", icon: BellRing, en: "Support confidence", zh: "求助信心", dangerHigh: false },
] as const;

type QuestionKey = (typeof questions)[number]["key"];

const startingAnswers: Record<QuestionKey, number> = {
  stress: 76,
  sleep: 54,
  focus: 62,
  energy: 58,
  workload: 78,
  support: 46,
};

export default function DemoPage() {
  const { locale } = useI18n();
  const [scenario, setScenario] = useState(0);
  const [answers, setAnswers] = useState(startingAnswers);
  const [generated, setGenerated] = useState(false);

  const intelligence = useMemo(() => {
    const positiveAverage = Math.round((answers.sleep + answers.focus + answers.energy + answers.support) / 4);
    const pressureAverage = Math.round((answers.stress + answers.workload) / 2);
    const wellbeing = Math.round((positiveAverage + (100 - pressureAverage)) / 2);
    const earlyRisk = Math.round((pressureAverage + (100 - answers.sleep) + (100 - answers.support)) / 3);
    const trend: "low" | "medium" | "high" = earlyRisk >= 70 ? "high" : earlyRisk >= 56 ? "medium" : "low";

    return {
      wellbeing,
      pressureAverage,
      earlyRisk,
      trend,
      sleepDrop: Math.max(0, 78 - answers.sleep),
      focusDrop: Math.max(0, 80 - answers.focus),
      stressRise: Math.max(0, answers.stress - 52),
    };
  }, [answers]);

  function updateAnswer(key: QuestionKey, value: number) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setGenerated(false);
  }

  const activeScenario = scenarios[scenario];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar />

      <section className="relative isolate bg-white">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_24%_12%,rgba(0,122,255,0.16),transparent_32%),radial-gradient(circle_at_76%_12%,rgba(52,199,89,0.16),transparent_30%),radial-gradient(circle_at_52%_0%,rgba(255,55,95,0.12),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#eaf5ff] px-4 py-2 text-sm font-semibold text-[#007aff] shadow-sm ring-1 ring-black/5">
              <Sparkles className="size-4" aria-hidden="true" />
              {locale === "zh" ? "互動 Demo" : "Interactive Demo"}
            </p>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[0.94] tracking-normal">
              {locale === "zh" ? "由 wellbeing 訊號，變成早期支援 intelligence。" : "From wellbeing signals to early-support intelligence."}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-[#6e6e73]">
              {locale === "zh"
                ? "呢個 demo 展示 HumanOS 點樣將學生或員工嘅私密 check-in，轉化成個人支援計劃，同時只向學校 / HR 顯示匿名化趨勢。"
                : "This demo shows how HumanOS turns private student or employee check-ins into personal support plans while giving schools and HR only anonymized trend intelligence."}
            </p>
          </div>

          <div className="rounded-[2.2rem] bg-[#1d1d1f] p-4 text-white shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
            <div className="rounded-[1.8rem] bg-white/[0.08] p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white/58">HumanOS Intelligence Layer</p>
              <div className="mt-6 grid gap-3">
                {[
                  [locale === "zh" ? "私密訊號" : "Private signals", "01"],
                  [locale === "zh" ? "趨勢偵測" : "Trend detection", "02"],
                  [locale === "zh" ? "早期支援" : "Early support", "03"],
                  [locale === "zh" ? "匿名機構洞察" : "Anonymous institution intelligence", "04"],
                ].map(([label, step]) => (
                  <div key={step} className="flex items-center gap-4 rounded-[1.3rem] bg-white/[0.08] p-4 ring-1 ring-white/10">
                    <span className="grid size-9 place-items-center rounded-full bg-white text-sm font-semibold text-[#1d1d1f]">{step}</span>
                    <p className="text-sm font-semibold text-white/84">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div className="grid gap-5">
          <DemoPanel step="1" title={locale === "zh" ? "選擇場景" : "Choose a scenario"}>
            <div className="grid gap-3">
              {scenarios.map(({ icon: Icon, en, zh, bodyEn, bodyZh }, index) => (
                <button
                  key={en}
                  type="button"
                  onClick={() => {
                    setScenario(index);
                    setGenerated(false);
                  }}
                  className={`rounded-[1.3rem] p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-[#007aff] ${
                    scenario === index
                      ? "bg-[#eaf5ff] text-[#1d1d1f] ring-2 ring-[#007aff]"
                      : "bg-white text-[#1d1d1f] ring-1 ring-black/5 hover:bg-[#f5f5f7]"
                  }`}
                >
                  <div className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-[#007aff] shadow-sm ring-1 ring-black/5">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block font-semibold">{locale === "zh" ? zh : en}</span>
                      <span className="mt-1 block text-sm leading-6 text-[#6e6e73]">{locale === "zh" ? bodyZh : bodyEn}</span>
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </DemoPanel>

          <DemoPanel step="2" title={locale === "zh" ? "輸入私密 check-in 訊號" : "Enter private check-in signals"}>
            <div className="grid gap-5">
              {questions.map(({ key, icon: Icon, en, zh, dangerHigh }) => (
                <label key={key} className="grid gap-2">
                  <span className="flex items-center justify-between gap-3 text-sm font-semibold text-[#1d1d1f]">
                    <span className="inline-flex items-center gap-2">
                      <Icon className={`size-4 ${dangerHigh ? "text-[#ff375f]" : "text-[#007aff]"}`} aria-hidden="true" />
                      {locale === "zh" ? zh : en}
                    </span>
                    <span className="rounded-full bg-[#f5f5f7] px-3 py-1 text-[#1d1d1f] ring-1 ring-black/5">
                      {answers[key]}
                    </span>
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={answers[key]}
                    onChange={(event) => updateAnswer(key, Number(event.target.value))}
                    className="h-2 w-full cursor-pointer accent-[#007aff]"
                  />
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#007aff] px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,122,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0066d6] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2 sm:w-auto"
            >
              {locale === "zh" ? "生成 HumanOS Intelligence" : "Generate HumanOS Intelligence"}
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </DemoPanel>
        </div>

        <div className="grid gap-5">
          <DemoPanel step="3" title={locale === "zh" ? "即時 intelligence 摘要" : "Live intelligence summary"}>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <ScoreCard label={locale === "zh" ? "Wellbeing Score" : "Wellbeing Score"} value={`${intelligence.wellbeing}`} tone="blue" />
              <ScoreCard label={locale === "zh" ? "壓力 / 工作量" : "Pressure Index"} value={`${intelligence.pressureAverage}`} tone="pink" />
              <ScoreCard label={locale === "zh" ? "早期風險" : "Early Risk"} value={riskLabel(intelligence.trend, locale)} tone="amber" />
              <ScoreCard label={locale === "zh" ? "匿名趨勢" : "Anonymous Trend"} value={generated ? "Live" : "Ready"} tone="green" />
            </div>
          </DemoPanel>

          <DemoPanel step="4" title={locale === "zh" ? "HumanOS AI 解讀" : "HumanOS AI analysis"}>
            <div className="rounded-[1.5rem] bg-[#eaf5ff] p-5 text-sm leading-7 text-[#1d1d1f]">
              <p className="mb-3 flex items-center gap-2 font-semibold text-[#007aff]">
                <Sparkles className="size-4" aria-hidden="true" />
                {generated
                  ? locale === "zh"
                    ? `${activeScenario.zh} intelligence 已生成`
                    : `${activeScenario.en} intelligence generated`
                  : locale === "zh"
                    ? "等待生成"
                    : "Ready to generate"}
              </p>
              {locale === "zh"
                ? `HumanOS 偵測到睡眠恢復下降 ${intelligence.sleepDrop} 點、專注下降 ${intelligence.focusDrop} 點、壓力上升 ${intelligence.stressRise} 點。若類似趨勢連續兩星期出現，系統會建議早期支援，而唔係等問題爆發先處理。`
                : `HumanOS detects sleep recovery down ${intelligence.sleepDrop} points, focus down ${intelligence.focusDrop} points, and stress up ${intelligence.stressRise} points. If similar trends continue for two weeks, the system recommends early support before the issue becomes an incident.`}
            </div>
          </DemoPanel>

          <div className="grid gap-5 xl:grid-cols-2">
            <DemoPanel step="5" title={locale === "zh" ? "個人支援計劃" : "Personal support plan"}>
              <div className="grid gap-3">
                {(locale === "zh"
                  ? ["今晚提早 30 分鐘睡眠準備", "明日安排 25 分鐘專注 block", "如果壓力持續，搵可信任人士傾一傾"]
                  : ["Prepare for sleep 30 minutes earlier tonight", "Plan one 25-minute focus block tomorrow", "If pressure continues, speak with a trusted support person"]
                ).map((item) => (
                  <div key={item} className="flex gap-3 rounded-[1.2rem] bg-[#f5f5f7] p-4 text-sm font-semibold leading-6">
                    <CheckCircle2 className="size-5 shrink-0 text-[#34c759]" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </DemoPanel>

            <DemoPanel step="6" title={locale === "zh" ? "匿名機構 dashboard" : "Anonymous institution dashboard"}>
              <div className="rounded-[1.4rem] bg-[#1d1d1f] p-4 text-white">
                <p className="flex items-center gap-2 text-sm font-semibold text-white/72">
                  <LockKeyhole className="size-4 text-[#5ac8fa]" aria-hidden="true" />
                  {locale === "zh" ? "私人答案不會顯示" : "Private answers are not shown"}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {[
                    [locale === "zh" ? "壓力上升" : "Stress rising", "+12%"],
                    [locale === "zh" ? "睡眠下降" : "Sleep declining", "-18%"],
                    [locale === "zh" ? "Campaign 建議" : "Campaign suggestion", "Shift sleep"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[1.1rem] bg-white/[0.08] p-4 ring-1 ring-white/10">
                      <p className="text-2xl font-semibold">{value}</p>
                      <p className="mt-2 text-xs font-semibold text-white/58">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </DemoPanel>
          </div>

          <DemoPanel step="7" title={locale === "zh" ? "趨勢圖：由 signal 到 intelligence" : "Trend view: signal to intelligence"}>
            <div className="grid gap-5 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <RechartsTrendPanel title={locale === "zh" ? "連續週期趨勢" : "Consecutive-week trend"} />
              </div>
              <RechartsRadarPanel />
            </div>
          </DemoPanel>

          <DemoPanel step="8" title={locale === "zh" ? "Campaign ROI / 參與率" : "Campaign ROI / participation"}>
            <RechartsBarPanel title={locale === "zh" ? "匿名 campaign impact" : "Anonymous campaign impact"} />
          </DemoPanel>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <div className="flex gap-3 rounded-[1.5rem] bg-white p-5 text-sm leading-7 text-[#1d1d1f] ring-1 ring-black/5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#34c759]" aria-hidden="true" />
          {locale === "zh"
            ? "Demo 只展示產品流程。HumanOS 提供 wellbeing awareness、早期支援參考及匿名趨勢，不提供醫療診斷、治療或危機干預服務。"
            : "This demo shows the product flow. HumanOS provides wellbeing awareness, early-support guidance, and anonymous trends. It does not provide medical diagnosis, treatment, or crisis intervention."}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function DemoPanel({ step, title, children }: { step: string; title: string; children: ReactNode }) {
  return (
    <section className="rounded-[1.8rem] bg-white p-5 shadow-sm ring-1 ring-black/5">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-full bg-[#1d1d1f] text-sm font-semibold text-white">{step}</span>
        <h2 className="text-xl font-semibold text-[#1d1d1f]">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function ScoreCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "blue" | "pink" | "amber" | "green";
}) {
  const toneClass = {
    blue: "text-[#007aff] bg-[#eaf5ff]",
    pink: "text-[#ff375f] bg-[#fff0f3]",
    amber: "text-[#b25000] bg-[#fff4df]",
    green: "text-[#248a3d] bg-[#eefcf3]",
  }[tone];

  return (
    <div className={`rounded-[1.35rem] p-5 ${toneClass}`}>
      <p className="text-sm font-semibold opacity-75">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-normal">{value}</p>
    </div>
  );
}

function riskLabel(risk: "low" | "medium" | "high", locale: "en" | "zh") {
  if (risk === "high") return locale === "zh" ? "偏高" : "Elevated";
  if (risk === "medium") return locale === "zh" ? "中等" : "Moderate";
  return locale === "zh" ? "較低" : "Low";
}
