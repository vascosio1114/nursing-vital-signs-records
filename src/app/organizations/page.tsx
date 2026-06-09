"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BriefcaseBusiness,
  CalendarDays,
  HeartPulse,
  Hotel,
  LineChart,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Footer, Navbar } from "@/components/humanos/layout";
import { RechartsTrendPanel } from "@/components/humanos/recharts-panels";
import { useI18n } from "@/lib/i18n";

const casinoUseCases = [
  {
    icon: Hotel,
    en: "Integrated resorts and hotels",
    zh: "綜合度假村及酒店",
    bodyEn: "Understand wellbeing trends across front desk, hotel operations, F&B, security, and guest-facing teams.",
    bodyZh: "掌握前線接待、酒店營運、餐飲、保安及面向客戶團隊嘅 wellbeing 趨勢。",
  },
  {
    icon: CalendarDays,
    en: "Shift-based operations",
    zh: "輪班營運團隊",
    bodyEn: "Track how shift patterns affect sleep recovery, energy, focus, and stress accumulation.",
    bodyZh: "追蹤輪班模式點樣影響睡眠恢復、精神、專注同壓力累積。",
  },
  {
    icon: UsersRound,
    en: "HR and wellness teams",
    zh: "HR 及員工關顧團隊",
    bodyEn: "Turn anonymous signals into support campaigns, manager conversations, and wellbeing resource planning.",
    bodyZh: "將匿名訊號變成支援活動、管理層對話及員工關顧資源規劃。",
  },
] as const;

const needReasons = [
  ["Reactive support is too late", "被動支援太遲", "Stress, sleep, and burnout signals often appear weeks before performance or absence issues."],
  ["Surveys are too slow", "傳統問卷太慢", "Annual or quarterly surveys cannot show what is changing inside shift teams this week."],
  ["Managers lack anonymous visibility", "管理層缺少匿名視野", "Leaders may know turnover and sick leave, but not the wellbeing trends behind them."],
  ["Campaign ROI is unclear", "Wellbeing 活動成效唔清楚", "Organizations spend on wellness activities but rarely know which campaign actually helps."],
] as const;

const implementationSteps = [
  {
    en: "Month 1 · Baseline",
    zh: "第 1 個月 · 建立基線",
    bodyEn: "Launch private check-ins, define departments, set privacy thresholds, and establish stress, sleep, focus, and energy baselines.",
    bodyZh: "啟動私密 check-in、設定部門及小樣本私隱門檻，建立壓力、睡眠、專注及能量基線。",
  },
  {
    en: "Month 2 · Intervention",
    zh: "第 2 個月 · 支援介入",
    bodyEn: "Run targeted wellbeing campaigns for shift sleep, stress recovery, hydration, focus breaks, and manager awareness.",
    bodyZh: "針對輪班睡眠、壓力恢復、補水、專注休息及主管 awareness 推出 wellbeing campaign。",
  },
  {
    en: "Month 3 · Intelligence report",
    zh: "第 3 個月 · 智能報告",
    bodyEn: "Measure participation, trend changes, campaign impact, and recommendations for a wider enterprise rollout.",
    bodyZh: "量度參與率、趨勢變化、活動影響，並提供擴展至更大企業範圍嘅建議。",
  },
] as const;

const improvementMetrics = [
  ["Earlier", "Risk visibility", "更早", "見到風險"],
  ["Higher", "Campaign participation", "更高", "活動參與"],
  ["Clearer", "HR wellbeing ROI", "更清晰", "HR wellbeing ROI"],
  ["Lower", "Anonymous stress trend", "更低", "匿名壓力趨勢"],
] as const;

const servicePackages = [
  {
    icon: BarChart3,
    en: "Anonymous Workforce Dashboard",
    zh: "匿名員工福祉儀表板",
    bodyEn: "Department, shift, and cohort-level wellbeing intelligence with small-group suppression.",
    bodyZh: "按部門、輪班及群組顯示 wellbeing intelligence，並加入小樣本隱藏。",
  },
  {
    icon: Sparkles,
    en: "AI Daily Support Plans",
    zh: "AI 每日支援計劃",
    bodyEn: "Private employee-facing suggestions for stress reset, sleep recovery, energy, and focus.",
    bodyZh: "面向員工嘅私密建議，包括壓力重置、睡眠恢復、能量及專注支援。",
  },
  {
    icon: LineChart,
    en: "Campaign Impact Reports",
    zh: "Wellbeing Campaign 成效報告",
    bodyEn: "Measure whether wellness campaigns improve participation, stress trends, sleep recovery, and engagement.",
    bodyZh: "量度 wellbeing campaign 係咪改善參與率、壓力趨勢、睡眠恢復同投入度。",
  },
  {
    icon: BellRing,
    en: "Early Support Alerts",
    zh: "早期支援提示",
    bodyEn: "Privacy-safe alerts when anonymous stress, sleep, or focus signals decline over consecutive weeks.",
    bodyZh: "當匿名壓力、睡眠或專注訊號連續數週轉差時，提供私隱安全嘅早期提示。",
  },
] as const;

export default function OrganizationsPage() {
  const { locale, t } = useI18n();

  useRevealOnScroll();

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar />

      <section className="relative isolate bg-white">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_20%_12%,rgba(52,199,89,0.18),transparent_32%),radial-gradient(circle_at_80%_18%,rgba(0,122,255,0.16),transparent_30%),radial-gradient(circle_at_52%_0%,rgba(255,159,10,0.12),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-[#eefcf3] px-4 py-2 text-sm font-semibold text-[#248a3d] shadow-sm ring-1 ring-black/5">
              <BriefcaseBusiness className="size-4" aria-hidden="true" />
              HumanOS for Organizations
            </p>
            <h1 className="mt-6 text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[0.94] tracking-normal">
              {locale === "zh" ? "幫澳門博企，睇見員工 Wellbeing 趨勢。" : "Workforce wellbeing intelligence for Macao integrated resorts."}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-9 text-[#6e6e73]">
              {locale === "zh"
                ? "HumanOS 幫博企、酒店、度假村及大型服務團隊，將員工壓力、睡眠、專注、輪班疲勞同 wellbeing campaign 成效，變成匿名化、可行動嘅管理洞察。"
                : "HumanOS helps gaming operators, hotels, resorts, and large service teams turn stress, sleep, focus, shift fatigue, and campaign impact into anonymous, actionable workforce intelligence."}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#007aff] px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,122,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0066d6] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
              >
                {locale === "zh" ? "申請企業試點" : "Start enterprise pilot"}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <Link
                href="#implementation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5f5f7] px-6 py-3.5 text-base font-semibold text-[#1d1d1f] ring-1 ring-black/5 transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
              >
                {locale === "zh" ? "睇點樣實行" : "See implementation"}
              </Link>
            </div>
          </div>

          <div className="rounded-[2.2rem] bg-[#1d1d1f] p-4 text-white shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
            <div className="rounded-[1.8rem] bg-white/[0.08] p-5 ring-1 ring-white/10">
              <p className="text-sm font-semibold text-white/58">{locale === "zh" ? "匿名 Workforce Intelligence" : "Anonymous Workforce Intelligence"}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  ["1,240", locale === "zh" ? "活躍員工" : "Active employees"],
                  ["31%", locale === "zh" ? "睡眠受影響群組" : "Sleep disruption group"],
                  ["16%", locale === "zh" ? "倦怠 awareness 群組" : "Burnout awareness group"],
                  ["58%", locale === "zh" ? "活動完成率" : "Campaign completion"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-[1.35rem] bg-white/[0.08] p-5 ring-1 ring-white/10">
                    <p className="text-4xl font-semibold">{value}</p>
                    <p className="mt-3 text-sm font-semibold text-white/58">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-[1.8rem] bg-white p-5 text-[#1d1d1f]">
              <RechartsTrendPanel title={t.labels.weeklyTrend} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-4xl text-center" data-reveal>
            <p className="text-sm font-semibold text-[#248a3d]">{locale === "zh" ? "點樣幫機構做到嘢" : "How HumanOS helps organizations operate"}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,6vw,5.6rem)] font-semibold leading-[0.98] tracking-normal">
              {locale === "zh" ? "唔係做福利宣傳。" : "Not wellness marketing."}
              <span className="block text-[#6e6e73]">
                {locale === "zh" ? "係營運 intelligence。" : "Operational intelligence."}
              </span>
            </h2>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {casinoUseCases.map(({ icon: Icon, en, zh, bodyEn, bodyZh }, index) => (
              <div
                key={en}
                data-reveal={index === 0 ? "slide-left" : index === 2 ? "slide-right" : "slow"}
                className="rounded-[1.8rem] bg-white p-7 shadow-sm ring-1 ring-black/5"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="grid size-14 place-items-center rounded-3xl bg-[#eefcf3] text-[#248a3d]">
                  <Icon className="size-7" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-3xl font-semibold leading-none tracking-normal">{locale === "zh" ? zh : en}</h3>
                <p className="mt-5 text-base leading-7 text-[#6e6e73]">{locale === "zh" ? bodyZh : bodyEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:px-8">
          <div data-reveal="slide-left">
            <p className="text-sm font-semibold text-[#ff375f]">{locale === "zh" ? "點解機構需要 HumanOS" : "Why organizations need HumanOS"}</p>
            <h2 className="mt-4 text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-none tracking-normal">
              {locale === "zh" ? "大型團隊最大問題，係風險出現時已經太遲。" : "In large teams, risk becomes visible too late."}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#6e6e73]">
              {locale === "zh"
                ? "尤其係博企、酒店同輪班服務業，壓力、睡眠不足同情緒疲勞通常先喺匿名趨勢出現，之後先變成請假、流失、服務質素或安全問題。"
                : "In gaming, hospitality, and shift-based service teams, stress, poor sleep, and emotional fatigue often appear in anonymous trends before becoming absence, turnover, service-quality, or safety issues."}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {needReasons.map(([en, zh, body], index) => (
              <div
                key={en}
                data-reveal={index % 2 === 0 ? "slide-left" : "slide-right"}
                className="rounded-[1.5rem] bg-[#f5f5f7] p-5 ring-1 ring-black/5"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <HeartPulse className="size-6 text-[#ff375f]" aria-hidden="true" />
                <h3 className="mt-8 text-xl font-semibold">{locale === "zh" ? zh : en}</h3>
                <p className="mt-3 text-sm leading-6 text-[#6e6e73]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="implementation" className="bg-[#1d1d1f] py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div data-reveal="slide-left">
              <p className="text-sm font-semibold text-[#5ac8fa]">{locale === "zh" ? "點樣實行" : "Implementation"}</p>
              <h2 className="mt-4 text-[clamp(2.6rem,6vw,5.8rem)] font-semibold leading-none tracking-normal">
                {locale === "zh" ? "三個月，由 awareness 變成管理決策。" : "Three months from awareness to management intelligence."}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
                {locale === "zh"
                  ? "HumanOS 可以用試點方式落地：先建立匿名 baseline，再推出 targeted campaign，最後交付成效報告同擴展建議。"
                  : "HumanOS can launch as a pilot: build an anonymous baseline, run targeted campaigns, then deliver impact reporting and rollout recommendations."}
              </p>
            </div>
            <div className="space-y-3">
              {implementationSteps.map(({ en, zh, bodyEn, bodyZh }, index) => (
                <div
                  key={en}
                  data-reveal="slide-right"
                  className="rounded-[1.5rem] bg-white/[0.08] p-5 ring-1 ring-white/10"
                  style={{ transitionDelay: `${index * 140}ms` }}
                >
                  <p className="text-xl font-semibold">{locale === "zh" ? zh : en}</p>
                  <p className="mt-3 text-sm leading-7 text-white/62">{locale === "zh" ? bodyZh : bodyEn}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {improvementMetrics.map(([enValue, enLabel, zhValue, zhLabel], index) => (
              <div
                key={enLabel}
                data-reveal="slow"
                className="rounded-[1.5rem] bg-white/[0.08] p-5 ring-1 ring-white/10"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <p className="text-3xl font-semibold">{locale === "zh" ? zhValue : enValue}</p>
                <p className="mt-3 text-sm font-semibold text-white/58">{locale === "zh" ? zhLabel : enLabel}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-4xl text-center" data-reveal>
            <p className="text-sm font-semibold text-[#007aff]">{locale === "zh" ? "賣咩服務" : "What HumanOS sells"}</p>
            <h2 className="mt-4 text-[clamp(2.5rem,6vw,5.6rem)] font-semibold leading-[0.98] tracking-normal">
              {locale === "zh" ? "一套企業 Wellbeing Intelligence 服務。" : "An enterprise wellbeing intelligence service."}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#6e6e73]">
              {locale === "zh"
                ? "可由三個月 MOP 30,000-80,000 試點開始，再擴展至每月 per-user 或年度企業方案。"
                : "Start with a 3-month MOP 30,000-80,000 pilot, then expand into monthly per-user or annual enterprise packages."}
            </p>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {servicePackages.map(({ icon: Icon, en, zh, bodyEn, bodyZh }, index) => (
              <div
                key={en}
                data-reveal={index % 2 === 0 ? "slide-left" : "slide-right"}
                className="rounded-[1.8rem] bg-[#f5f5f7] p-7 ring-1 ring-black/5"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <Icon className="size-8 text-[#007aff]" aria-hidden="true" />
                <h3 className="mt-8 text-3xl font-semibold leading-none tracking-normal">{locale === "zh" ? zh : en}</h3>
                <p className="mt-5 text-base leading-7 text-[#6e6e73]">{locale === "zh" ? bodyZh : bodyEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/5 bg-[#f5f5f7] py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex gap-3 rounded-[1.5rem] bg-white p-5 text-sm leading-7 text-[#1d1d1f] ring-1 ring-black/5">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#34c759]" aria-hidden="true" />
            {t.organizations.privacy}
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
