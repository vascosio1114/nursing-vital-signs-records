"use client";

import Link from "next/link";
import { ArrowRight, BookOpenCheck, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { Footer, Navbar } from "@/components/humanos/layout";
import { useI18n } from "@/lib/i18n";

const introCards = [
  ["Private", "私密", "Your answers are used to generate your own support plan."],
  ["Student-friendly", "適合學生", "Simple questions about study pressure, sleep, focus, mood, and support."],
  ["Not a diagnosis", "不是診斷", "This is wellbeing guidance, not medical or crisis support."],
] as const;

export default function StudentCheckInIntroPage() {
  const { locale } = useI18n();

  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar />
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#eaf5ff] px-4 py-2 text-sm font-semibold text-[#007aff] ring-1 ring-black/5">
              <BookOpenCheck className="size-4" aria-hidden="true" />
              {locale === "zh" ? "學生測試說明" : "Student check-in intro"}
            </p>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6.7rem)] font-semibold leading-[0.94] tracking-normal">
              {locale === "zh" ? "先了解自己，再決定今日點行。" : "Understand yourself before planning the day."}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-[#6e6e73]">
              {locale === "zh"
                ? "呢個 demo 會問你幾條簡單問題，幫你睇壓力、睡眠、專注同支援需要。完成後會生成一個學生版福祉摘要。"
                : "This demo asks a few simple questions about stress, sleep, focus, and support needs. You will get a student wellbeing summary after completing it."}
            </p>
            <Link
              href="/students/check-in/test"
              className="mt-9 inline-flex items-center justify-center gap-2 rounded-full bg-[#007aff] px-7 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,122,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0066d6] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
            >
              {locale === "zh" ? "開始做測試" : "Start the check-in"}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
          </div>

          <div className="rounded-[2.2rem] bg-[#1d1d1f] p-5 text-white shadow-[0_30px_90px_rgba(0,0,0,0.16)]">
            <div className="rounded-[1.6rem] bg-white/[0.08] p-5 ring-1 ring-white/10">
              <Sparkles className="size-9 text-[#5ac8fa]" aria-hidden="true" />
              <p className="mt-8 text-3xl font-semibold leading-tight">
                {locale === "zh" ? "你會得到一個今日可做的微行動計劃。" : "You will get a realistic micro-action plan for today."}
              </p>
            </div>
            <div className="mt-4 grid gap-3">
              {introCards.map(([en, zh, body]) => (
                <div key={en} className="flex gap-4 rounded-[1.35rem] bg-white/[0.08] p-4 ring-1 ring-white/10">
                  {en === "Private" ? (
                    <LockKeyhole className="size-5 shrink-0 text-[#5ac8fa]" aria-hidden="true" />
                  ) : (
                    <ShieldCheck className="size-5 shrink-0 text-[#34c759]" aria-hidden="true" />
                  )}
                  <div>
                    <p className="font-semibold">{locale === "zh" ? zh : en}</p>
                    <p className="mt-1 text-sm leading-6 text-white/62">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
