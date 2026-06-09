"use client";

import Link from "next/link";
import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BookOpenCheck, Brain, HeartPulse, Moon, ShieldCheck, Sparkles } from "lucide-react";
import { Footer, Navbar } from "@/components/humanos/layout";
import { useI18n } from "@/lib/i18n";

type RiskLevel = "low" | "medium" | "high";

const planByRisk = {
  low: {
    en: ["Keep your routine stable", "Protect one focused study block", "Do a short evening reflection"],
    zh: ["保持今日節奏穩定", "保護一段專注溫習時間", "夜晚做一個短反思"],
  },
  medium: {
    en: ["Break homework into smaller blocks", "Take a 10-minute reset before studying", "Message a trusted person if pressure keeps rising"],
    zh: ["將功課拆細做", "溫習前做 10 分鐘重置", "如果壓力繼續升，搵可信任嘅人傾一傾"],
  },
  high: {
    en: ["Reduce non-essential tasks today", "Tell a trusted adult you are having a hard day", "Use school support channels if this continues"],
    zh: ["今日減少非必要任務", "同可信任成人講今日狀態比較辛苦", "如果持續，使用學校支援渠道"],
  },
} as const;

export default function StudentCheckInResultsPage() {
  return (
    <Suspense fallback={<ResultsShellFallback />}>
      <ResultsContent />
    </Suspense>
  );
}

function ResultsContent() {
  const { locale } = useI18n();
  const searchParams = useSearchParams();
  const queryScore = Number(searchParams.get("score"));
  const queryRisk = searchParams.get("risk");
  const storedScore = Number.isFinite(queryScore) && queryScore > 0 ? queryScore : 72;
  const storedRisk: RiskLevel =
    queryRisk === "low" || queryRisk === "medium" || queryRisk === "high" ? queryRisk : "medium";

  const result = useMemo(() => {
    if (storedRisk === "low") {
      return {
        tone: "text-[#248a3d]",
        bg: "bg-[#eefcf3]",
        titleEn: "Stable today",
        titleZh: "今日狀態穩定",
        bodyEn: "Your check-in suggests your current routine is mostly working. Keep recovery and focus protected.",
        bodyZh: "你今日整體狀態較穩定。繼續保護休息同專注時間。",
      };
    }

    if (storedRisk === "high") {
      return {
        tone: "text-[#ff375f]",
        bg: "bg-[#fff0f3]",
        titleEn: "Support recommended",
        titleZh: "建議及早支援",
        bodyEn: "Your check-in shows pressure may be affecting recovery, focus, or mood. Consider speaking with a trusted support person.",
        bodyZh: "你嘅 check-in 顯示壓力可能影響恢復、專注或情緒。建議同可信任嘅支援人士傾一傾。",
      };
    }

    return {
      tone: "text-[#b25000]",
      bg: "bg-[#fff4df]",
      titleEn: "Watch and adjust",
      titleZh: "需要留意同調整",
      bodyEn: "Your check-in shows a few areas may need attention today. Small changes can help before pressure builds.",
      bodyZh: "你今日有幾個位置需要留意。做少少調整，可以避免壓力繼續累積。",
    };
  }, [storedRisk]);

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar />
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div className="rounded-[2.2rem] bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <p className="inline-flex items-center gap-2 rounded-full bg-[#eaf5ff] px-4 py-2 text-sm font-semibold text-[#007aff]">
              <Sparkles className="size-4" aria-hidden="true" />
              {locale === "zh" ? "學生福祉摘要" : "Student wellbeing summary"}
            </p>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[0.94] tracking-normal">
              {storedScore}
              <span className="block text-[#6e6e73]">/ 100</span>
            </h1>
            <div className={`mt-8 rounded-[1.6rem] ${result.bg} p-5`}>
              <p className={`text-2xl font-semibold ${result.tone}`}>{locale === "zh" ? result.titleZh : result.titleEn}</p>
              <p className="mt-3 text-base leading-7 text-[#6e6e73]">{locale === "zh" ? result.bodyZh : result.bodyEn}</p>
            </div>
            <p className="mt-6 text-sm leading-6 text-[#6e6e73]">
              {locale === "zh"
                ? "呢個結果只係福祉 awareness demo，不屬於醫療診斷或危機處理。如果你覺得自己有即時危險，請立即聯絡身邊可信任成人、學校支援渠道或本地緊急服務。"
                : "This result is a wellbeing awareness demo, not medical diagnosis or crisis support. If you feel in immediate danger, contact a trusted adult, school support channel, or local emergency service now."}
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] bg-[#1d1d1f] p-5 text-white shadow-[0_30px_90px_rgba(0,0,0,0.16)]">
              <p className="text-sm font-semibold text-[#5ac8fa]">{locale === "zh" ? "今日行動計劃" : "Today action plan"}</p>
              <div className="mt-5 grid gap-3">
                {planByRisk[storedRisk][locale === "zh" ? "zh" : "en"].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-[1.35rem] bg-white/[0.08] p-4 ring-1 ring-white/10">
                    <span className="grid size-9 place-items-center rounded-full bg-white text-sm font-semibold text-[#1d1d1f]">
                      {index + 1}
                    </span>
                    <p className="text-sm font-semibold leading-6 text-white/86">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: Moon, en: "Sleep", zh: "睡眠" },
                { icon: Brain, en: "Focus", zh: "專注" },
                { icon: HeartPulse, en: "Stress", zh: "壓力" },
              ].map(({ icon: Icon, en, zh }) => (
                <div key={en} className="rounded-[1.5rem] bg-white p-5 ring-1 ring-black/5">
                  <Icon className="size-6 text-[#007aff]" aria-hidden="true" />
                  <p className="mt-8 text-lg font-semibold">{locale === "zh" ? zh : en}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[1.6rem] bg-white p-5 ring-1 ring-black/5">
              <ShieldCheck className="size-6 text-[#34c759]" aria-hidden="true" />
              <p className="mt-4 text-lg font-semibold">{locale === "zh" ? "學校會見到咩？" : "What would the school see?"}</p>
              <p className="mt-3 text-sm leading-7 text-[#6e6e73]">
                {locale === "zh"
                  ? "學校只應看到匿名化群組趨勢，例如某年級睡眠恢復下降或壓力趨勢上升，不會看到你個人答案、日記或 AI 對話。"
                  : "Schools should only see anonymized group trends, such as sleep recovery decreasing or stress rising in a cohort. They do not see your individual answers, journals, or AI conversations."}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/students/check-in/test"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#007aff] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#0066d6] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
              >
                {locale === "zh" ? "再做一次" : "Try again"}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <Link
                href="/students"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-base font-semibold text-[#1d1d1f] ring-1 ring-black/5 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
              >
                <BookOpenCheck className="size-5" aria-hidden="true" />
                {locale === "zh" ? "返回學生方案" : "Back to student page"}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function ResultsShellFallback() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar />
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8 lg:py-20">
        <div className="rounded-[2.2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
          <p className="text-sm font-semibold text-[#007aff]">HumanOS</p>
          <p className="mt-4 text-3xl font-semibold">Loading summary...</p>
        </div>
      </section>
    </main>
  );
}
