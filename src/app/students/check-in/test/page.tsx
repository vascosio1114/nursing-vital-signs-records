"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Brain, HeartPulse, Moon, ShieldCheck, SmilePlus } from "lucide-react";
import { Footer, Navbar } from "@/components/humanos/layout";
import { useI18n } from "@/lib/i18n";

const questions = [
  {
    key: "stress",
    icon: HeartPulse,
    en: "How heavy does your stress feel today?",
    zh: "你今日壓力感覺有幾重？",
    lowEn: "Light",
    lowZh: "輕",
    highEn: "Very heavy",
    highZh: "好重",
    inverted: true,
  },
  {
    key: "sleep",
    icon: Moon,
    en: "How rested did you feel when you woke up?",
    zh: "你起身時覺得恢復得幾好？",
    lowEn: "Tired",
    lowZh: "好攰",
    highEn: "Rested",
    highZh: "精神",
    inverted: false,
  },
  {
    key: "focus",
    icon: Brain,
    en: "How easy is it to focus on study today?",
    zh: "你今日有幾容易專注溫書 / 上堂？",
    lowEn: "Hard",
    lowZh: "好難",
    highEn: "Easy",
    highZh: "容易",
    inverted: false,
  },
  {
    key: "workload",
    icon: ShieldCheck,
    en: "How manageable does your school workload feel?",
    zh: "你覺得今日學業量有幾可控？",
    lowEn: "Too much",
    lowZh: "太多",
    highEn: "Manageable",
    highZh: "可控",
    inverted: false,
  },
  {
    key: "mood",
    icon: SmilePlus,
    en: "How emotionally okay do you feel right now?",
    zh: "你而家情緒狀態有幾 OK？",
    lowEn: "Not okay",
    lowZh: "唔太 OK",
    highEn: "Okay",
    highZh: "OK",
    inverted: false,
  },
] as const;

type QuestionKey = (typeof questions)[number]["key"];

export default function StudentCheckInTestPage() {
  const { locale } = useI18n();
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<QuestionKey, number>>({
    stress: 3,
    sleep: 3,
    focus: 3,
    workload: 3,
    mood: 3,
  });

  const score = useMemo(() => {
    const total = questions.reduce((sum, question) => {
      const value = answers[question.key];
      const normalized = question.inverted ? 6 - value : value;
      return sum + normalized;
    }, 0);
    return Math.round((total / (questions.length * 5)) * 100);
  }, [answers]);

  function updateAnswer(key: QuestionKey, value: number) {
    setAnswers((current) => ({ ...current, [key]: value }));
  }

  function submitCheckIn() {
    const riskLevel = score >= 76 ? "low" : score >= 58 ? "medium" : "high";
    window.localStorage.setItem(
      "humanos-student-checkin",
      JSON.stringify({ answers, score, riskLevel, createdAt: new Date().toISOString() }),
    );
    router.push(`/students/check-in/results?score=${score}&risk=${riskLevel}`);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-5 py-10 lg:px-8 lg:py-16">
        <div className="rounded-[2.2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[#007aff]">{locale === "zh" ? "學生 Check-in" : "Student Check-in"}</p>
              <h1 className="mt-3 text-[clamp(2.5rem,6vw,5.2rem)] font-semibold leading-none tracking-normal">
                {locale === "zh" ? "今日你狀態點？" : "How are you doing today?"}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#6e6e73]">
                {locale === "zh"
                  ? "用 1 到 5 分回答。冇標準答案，重點係幫你了解自己今日需要咩支援。"
                  : "Answer from 1 to 5. There is no perfect answer; the goal is to understand what support you may need today."}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5 text-center ring-1 ring-black/5">
              <p className="text-sm font-semibold text-[#6e6e73]">{locale === "zh" ? "即時分數" : "Live score"}</p>
              <p className="mt-1 text-5xl font-semibold">{score}</p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {questions.map(({ key, icon: Icon, en, zh, lowEn, lowZh, highEn, highZh }) => (
              <div key={key} className="rounded-[1.5rem] bg-[#f5f5f7] p-5 ring-1 ring-black/5">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-[#007aff] shadow-sm ring-1 ring-black/5">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="w-full">
                    <label htmlFor={key} className="block text-lg font-semibold">
                      {locale === "zh" ? zh : en}
                    </label>
                    <input
                      id={key}
                      type="range"
                      min="1"
                      max="5"
                      value={answers[key]}
                      onChange={(event) => updateAnswer(key, Number(event.target.value))}
                      className="mt-5 h-2 w-full cursor-pointer accent-[#007aff]"
                    />
                    <div className="mt-3 flex items-center justify-between text-sm font-semibold text-[#6e6e73]">
                      <span>{locale === "zh" ? lowZh : lowEn}</span>
                      <span className="rounded-full bg-white px-3 py-1 text-[#1d1d1f] ring-1 ring-black/5">{answers[key]}/5</span>
                      <span>{locale === "zh" ? highZh : highEn}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-[#eaf5ff] p-5 text-sm leading-7 text-[#1d1d1f]">
            <ShieldCheck className="mb-3 size-5 text-[#007aff]" aria-hidden="true" />
            {locale === "zh"
              ? "Demo 入面，答案只會用嚟生成你個人嘅福祉摘要。學校視角只應顯示匿名化群組趨勢。"
              : "In this demo, answers are used to generate your personal wellbeing summary. School views should only show anonymized group trends."}
          </div>

          <button
            type="button"
            onClick={submitCheckIn}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#007aff] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,122,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0066d6] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2 sm:w-auto"
          >
            {locale === "zh" ? "生成學生福祉摘要" : "Generate student wellbeing summary"}
            <ArrowRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </section>
      <Footer />
    </main>
  );
}
