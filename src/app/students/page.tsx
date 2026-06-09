"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRight,
  BellRing,
  BookOpenCheck,
  Brain,
  HeartPulse,
  LockKeyhole,
  Moon,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Footer, Navbar } from "@/components/humanos/layout";
import { RechartsTrendPanel } from "@/components/humanos/recharts-panels";
import { useI18n } from "@/lib/i18n";

const studentFlow = [
  {
    icon: BookOpenCheck,
    titleEn: "1-minute daily check-in",
    titleZh: "1 分鐘每日 check-in",
    bodyEn: "Students answer simple questions about stress, sleep, focus, workload, mood, and support needs.",
    bodyZh: "學生用簡單問題記錄壓力、睡眠、專注、學業量、心情及支援需要。",
    tone: "bg-[#eaf5ff] text-[#007aff]",
  },
  {
    icon: Sparkles,
    titleEn: "AI turns signals into guidance",
    titleZh: "AI 將訊號變成建議",
    bodyEn: "HumanOS explains what may be affecting study energy and suggests realistic next steps.",
    bodyZh: "HumanOS 會解釋可能影響學習狀態的因素，並建議可做到的下一步。",
    tone: "bg-[#f4ecff] text-[#7d35ff]",
  },
  {
    icon: UsersRound,
    titleEn: "School sees anonymous trends",
    titleZh: "學校只看匿名趨勢",
    bodyEn: "Schools can understand class or year-level patterns without reading private student content.",
    bodyZh: "學校可以了解班級或年級趨勢，但不會看到學生私人內容。",
    tone: "bg-[#eefcf3] text-[#248a3d]",
  },
] as const;

const studentBenefits = [
  ["Understand my stress", "知道自己壓力位置", HeartPulse, "#ff375f"],
  ["Improve sleep routine", "改善睡眠節奏", Moon, "#5856d6"],
  ["Protect focus time", "保護專注時間", Brain, "#007aff"],
  ["Ask for help earlier", "更早開口求助", BellRing, "#ff9f0a"],
] as const;

const riskSignals = [
  ["Academic overload", "學業量過重", "High workload, low recovery, reduced motivation."],
  ["Sleep recovery risk", "睡眠恢復風險", "Short sleep, inconsistent routine, morning tiredness."],
  ["Focus decline", "專注下降", "Hard to concentrate, distracted study sessions, lower confidence."],
  ["Stress accumulation", "壓力累積", "Several high-stress check-ins across a short period."],
  ["Low support confidence", "求助信心低", "Student feels unsure who to talk to or how to start."],
  ["Burnout awareness", "倦怠 awareness", "Long-term tiredness, low motivation, pressure without recovery."],
] as const;

const schoolMetrics = [
  ["420", "Participating students", "參與學生"],
  ["76%", "Check-in completion", "Check-in 完成率"],
  ["24%", "Sleep recovery risk group", "睡眠恢復風險群組"],
  ["18%", "Burnout awareness trend", "倦怠 awareness 趨勢"],
] as const;

export default function StudentsPage() {
  const { locale, t } = useI18n();

  useRevealOnScroll();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar />

      <section className="relative isolate bg-white">
        <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_22%_10%,rgba(0,122,255,0.16),transparent_32%),radial-gradient(circle_at_78%_12%,rgba(52,199,89,0.16),transparent_30%),radial-gradient(circle_at_50%_0%,rgba(255,159,10,0.13),transparent_36%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#eaf5ff] px-4 py-2 text-sm font-semibold text-[#007aff] shadow-sm ring-1 ring-black/5">
              <BookOpenCheck className="size-4" aria-hidden="true" />
              HumanOS for Students
            </p>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[0.94] tracking-normal">
              {locale === "zh" ? "學生唔係等到崩先支援。" : "Support students before they break down."}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-[#6e6e73]">
              {locale === "zh"
                ? "HumanOS 幫學生每日用一分鐘理解自己狀態，將壓力、睡眠、專注同學業量變成清晰建議；同時令學校以匿名方式及早看見風險。"
                : "HumanOS gives students a one-minute way to understand stress, sleep, focus, and workload while helping schools see anonymous risk patterns early."}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/students/check-in"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#007aff] px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,122,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0066d6] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
              >
                {locale === "zh" ? "開始學生測試" : "Start Student Check-in"}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <Link
                href="#how-it-helps"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5f5f7] px-6 py-3.5 text-base font-semibold text-[#1d1d1f] ring-1 ring-black/5 transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
              >
                {locale === "zh" ? "睇點樣幫到學生" : "How it helps"}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2.2rem] bg-[#f5f5f7] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.13)] ring-1 ring-black/5">
              <div className="rounded-[1.8rem] bg-white p-5 ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#6e6e73]">Today</p>
                    <p className="mt-2 text-5xl font-semibold">72</p>
                    <p className="mt-2 text-sm font-semibold text-[#248a3d]">
                      {locale === "zh" ? "可改善，未到高風險" : "Actionable, not high risk"}
                    </p>
                  </div>
                  <div className="grid size-24 place-items-center rounded-full bg-[conic-gradient(#34c759_0_38%,#007aff_38%_70%,#ff9f0a_70%_88%,#e5e5ea_88%_100%)] p-2">
                    <div className="grid size-full place-items-center rounded-full bg-white text-xs font-semibold">
                      Student
                    </div>
                  </div>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {studentBenefits.map(([en, zh, Icon, color]) => (
                    <div key={en} className="rounded-[1.4rem] bg-[#f5f5f7] p-4 ring-1 ring-black/5">
                      <Icon className="size-6" style={{ color }} aria-hidden="true" />
                      <p className="mt-5 text-sm font-semibold text-[#6e6e73]">{locale === "zh" ? zh : en}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pop-chip pop-chip-one">
              <LockKeyhole className="size-4 text-[#007aff]" aria-hidden="true" />
              <span>{locale === "zh" ? "私人反思不會俾學校睇到" : "Private reflections stay private"}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-helps" className="bg-[#f5f5f7] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-4xl text-center" data-reveal>
            <p className="text-sm font-semibold text-[#007aff]">{locale === "zh" ? "點樣操作" : "How it works"}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,6vw,5.8rem)] font-semibold leading-[0.98] tracking-normal">
              {locale === "zh" ? "由學生感受，變成可行支援。" : "From student feelings to practical support."}
            </h2>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {studentFlow.map(({ icon: Icon, titleEn, titleZh, bodyEn, bodyZh, tone }, index) => (
              <div
                key={titleEn}
                data-reveal={index === 1 ? "slow" : index === 0 ? "slide-left" : "slide-right"}
                className="rounded-[1.8rem] bg-white p-7 shadow-sm ring-1 ring-black/5"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={`grid size-14 place-items-center rounded-3xl ${tone}`}>
                  <Icon className="size-7" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-3xl font-semibold leading-none tracking-normal">{locale === "zh" ? titleZh : titleEn}</h3>
                <p className="mt-5 text-base leading-7 text-[#6e6e73]">{locale === "zh" ? bodyZh : bodyEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:px-8">
          <div data-reveal="slide-left">
            <p className="text-sm font-semibold text-[#ff375f]">{locale === "zh" ? "可以開到咩風險" : "Risk signals HumanOS can surface"}</p>
            <h2 className="mt-4 text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-none tracking-normal">
              {locale === "zh" ? "唔係標籤學生，係及早知道邊度要支援。" : "Not labelling students. Finding where support is needed."}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#6e6e73]">
              {locale === "zh"
                ? "HumanOS 只提供福祉 awareness 及早期支援參考，不做醫療診斷。學校看到的是匿名化趨勢，學生私人內容保持私密。"
                : "HumanOS provides wellbeing awareness and early-support signals, not medical diagnosis. Schools see anonymous patterns, while private student content stays private."}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {riskSignals.map(([en, zh, detail], index) => (
              <div
                key={en}
                data-reveal={index % 2 === 0 ? "slide-left" : "slide-right"}
                className="rounded-[1.5rem] bg-[#f5f5f7] p-5 ring-1 ring-black/5"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <p className="text-lg font-semibold">{locale === "zh" ? zh : en}</p>
                <p className="mt-3 text-sm leading-6 text-[#6e6e73]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1d1d1f] py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div data-reveal="slide-left">
            <p className="text-sm font-semibold text-[#5ac8fa]">{locale === "zh" ? "學校視角" : "School view"}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,5.3rem)] font-semibold leading-none tracking-normal">
              {locale === "zh" ? "學校睇到趨勢，唔係偷睇學生。" : "Schools see trends, not private lives."}
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {schoolMetrics.map(([value, en, zh]) => (
                <div key={en} className="rounded-[1.4rem] bg-white/[0.08] p-5 ring-1 ring-white/10">
                  <p className="text-3xl font-semibold">{value}</p>
                  <p className="mt-3 text-sm font-semibold text-white/58">{locale === "zh" ? zh : en}</p>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal="slide-right" className="rounded-[1.8rem] bg-white p-5 text-[#1d1d1f]">
            <RechartsTrendPanel title={t.labels.weeklyTrend} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8" data-reveal="slow">
          <p className="text-sm font-semibold text-[#007aff]">{locale === "zh" ? "學生測試" : "Student check-in"}</p>
          <h2 className="mt-4 text-[clamp(2.6rem,6vw,5.5rem)] font-semibold leading-none tracking-normal">
            {locale === "zh" ? "試一次學生會見到咩。" : "Try what a student would see."}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6e6e73]">
            {locale === "zh"
              ? "測試會先講清楚私隱同用途，之後進入學生友善 check-in，最後生成一個 demo 結果頁。"
              : "The flow explains privacy first, then opens a student-friendly check-in and ends with a demo result page."}
          </p>
          <Link
            href="/students/check-in"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#007aff] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,122,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0066d6] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
          >
            {locale === "zh" ? "進入測試說明頁" : "Open check-in intro"}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="border-t border-black/5 bg-[#f5f5f7] py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex gap-3 rounded-[1.5rem] bg-white p-5 text-sm leading-7 text-[#1d1d1f] ring-1 ring-black/5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#34c759]" aria-hidden="true" />
            {t.students.privacy}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function useRevealOnScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}
