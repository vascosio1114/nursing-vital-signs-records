"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ArrowRight,
  BellRing,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  HeartPulse,
  Layers3,
  LockKeyhole,
  Moon,
  Plug,
  Rocket,
  School,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Zap,
} from "lucide-react";
import { Footer, Navbar } from "@/components/humanos/layout";
import { RechartsRadarPanel, RechartsTrendPanel } from "@/components/humanos/recharts-panels";
import { useI18n } from "@/lib/i18n";

const healthSignals = [
  { key: "stressIndex", value: "Moderate", color: "from-[#ff375f] to-[#ff9f0a]", icon: HeartPulse },
  { key: "sleepRecovery", value: "64", color: "from-[#5856d6] to-[#5ac8fa]", icon: Moon },
  { key: "focusScore", value: "72", color: "from-[#007aff] to-[#64d2ff]", icon: Brain },
  { key: "motivation", value: "68", color: "from-[#34c759] to-[#a2f06e]", icon: Zap },
] as const;

const supportCards = [
  { icon: School, href: "/students", label: "Students", tone: "bg-[#eaf5ff] text-[#007aff]" },
  { icon: BriefcaseBusiness, href: "/organizations", label: "Organizations", tone: "bg-[#eefcf3] text-[#248a3d]" },
  { icon: LockKeyhole, href: "/privacy", label: "Privacy", tone: "bg-[#fff4df] text-[#b25000]" },
] as const;

const intelligenceComparisons = [
  ["CRM", "Customers", "管客戶"],
  ["ERP", "Operations", "管公司"],
  ["HumanOS", "Wellbeing", "管 Wellbeing"],
] as const;

const startupValue = [
  {
    icon: BellRing,
    titleEn: "Early Support Intelligence",
    titleZh: "早期支援智能",
    bodyEn: "HumanOS does not wait until problems become incidents. It detects patterns when sleep drops, focus declines, and stress rises over consecutive weeks.",
    bodyZh: "HumanOS 唔係等問題發生先介入，而係當睡眠下降、專注下降、壓力上升連續出現時，提早提醒。",
  },
  {
    icon: School,
    titleEn: "School Intelligence",
    titleZh: "學校智能",
    bodyEn: "Schools can finally see which classes are under pressure, which anonymous groups sleep poorly, and which wellbeing activities help.",
    bodyZh: "學校第一次可以匿名知道邊啲班級壓力高、邊啲學生群組睡眠差、邊啲活動真係有幫助。",
  },
  {
    icon: BriefcaseBusiness,
    titleEn: "Workforce Intelligence",
    titleZh: "企業員工智能",
    bodyEn: "Organizations can understand department stress, shift-work sleep disruption, and which wellbeing campaigns actually move the needle.",
    bodyZh: "企業第一次可以匿名知道邊個部門壓力高、邊個輪班組睡眠差、邊啲 wellbeing campaign 有效。",
  },
] as const;

const ecosystemBlocks = [
  {
    icon: Layers3,
    titleEn: "HumanOS Ecosystem",
    titleZh: "HumanOS 生態系",
    bodyEn: "The platform can expand from wellbeing into brain health, sleep health, nutrition, fitness, meditation, and coaching.",
    bodyZh: "未來唔止 wellbeing，可以接 Brain Health、Sleep Health、Nutrition、Fitness、Meditation、Coaching。",
  },
  {
    icon: Plug,
    titleEn: "Plugin Platform",
    titleZh: "Plugin Platform",
    bodyEn: "Third parties such as coaches, nutritionists, wellness providers, and vertical products can plug into the HumanOS layer.",
    bodyZh: "第三方例如 coach、nutritionist、wellness provider 或 MindLubella 類產品，都可以接入 HumanOS。",
  },
  {
    icon: ShoppingBag,
    titleEn: "Marketplace",
    titleZh: "Marketplace",
    bodyEn: "HumanOS can connect schools, HR teams, coaches, consultants, courses, and wellbeing services through one operating layer.",
    bodyZh: "HumanOS 可以連接學校、HR、教練、顧問、課程同 wellbeing services，形成 marketplace。",
  },
] as const;

const schoolPilotStats = [
  ["3 months", "Pilot runway", "三個月試點"],
  ["300+", "Student cohort", "學生群組"],
  ["6", "Wellbeing signals", "六個福祉訊號"],
  ["Weekly", "Anonymous report", "每週匿名報告"],
] as const;

export default function HomePage() {
  const { locale, t } = useI18n();

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
      { threshold: 0.18 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const heroLine =
    locale === "zh"
      ? "CRM 管客戶，ERP 管公司，HumanOS 管人嘅 Wellbeing。"
      : "CRM manages customers. ERP manages operations. HumanOS manages wellbeing.";
  const insightCopy =
    locale === "zh"
      ? ["睡眠恢復下降", "壓力訊號上升", "建議今日降低認知負荷"]
      : ["Sleep recovery declined", "Stress signals rising", "Reduce cognitive load today"];

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f5f7] text-[#1d1d1f]">
      <Navbar />

      <section className="relative isolate bg-white">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_25%_20%,rgba(255,55,95,0.16),transparent_30%),radial-gradient(circle_at_74%_18%,rgba(52,199,89,0.18),transparent_28%),radial-gradient(circle_at_52%_0%,rgba(0,122,255,0.16),transparent_34%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="home-kicker inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-4 py-2 text-sm font-semibold text-[#007aff] shadow-sm ring-1 ring-black/5">
              <Sparkles className="size-4" aria-hidden="true" />
              {t.home.eyebrow}
            </p>
            <h1 className="hero-title mt-7 text-[clamp(3.4rem,8.4vw,7.6rem)] font-semibold leading-[0.94] tracking-normal text-[#1d1d1f]">
              <span>{locale === "zh" ? "HumanOS" : "HumanOS"}</span>
              <span>{locale === "zh" ? "唔係 App。" : "is not an app."}</span>
            </h1>
            <p className="hero-copy mt-7 max-w-2xl text-xl font-medium leading-8 text-[#6e6e73] sm:text-2xl sm:leading-9">
              {heroLine}
            </p>
            <p className="hero-copy mt-5 max-w-2xl text-base leading-7 text-[#6e6e73]">
              {locale === "zh"
                ? "HumanOS 係 Wellbeing Intelligence Layer：將學生同員工嘅壓力、睡眠、專注、動力及情緒趨勢，轉化成早期支援、匿名學校/企業洞察，並逐步成為 The Operating System for Human Wellbeing。"
                : "HumanOS is a Wellbeing Intelligence Layer: turning stress, sleep, focus, motivation, and emotional trends into early support, anonymous school and workforce intelligence, and eventually the Operating System for Human Wellbeing."}
            </p>
            <div className="hero-actions mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#007aff] px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_40px_rgba(0,122,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0066d6] focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
              >
                {t.cta.startPilot}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Link>
              <Link
                href="#intro"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5f5f7] px-6 py-3.5 text-base font-semibold text-[#1d1d1f] ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
              >
                {locale === "zh" ? "了解產品" : "Explore"}
                <ChevronDown className="size-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[650px]">
            <div className="health-orbit" aria-hidden="true">
              <span className="ring ring-one" />
              <span className="ring ring-two" />
              <span className="ring ring-three" />
            </div>
            <div className="hero-device relative rounded-[2rem] bg-[#f5f5f7] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.16)] ring-1 ring-black/8">
              <div className="rounded-[1.5rem] bg-white p-5 ring-1 ring-black/5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#6e6e73]">HumanOS Score</p>
                    <p className="mt-1 text-6xl font-semibold tracking-normal text-[#1d1d1f]">78</p>
                  </div>
                  <div className="relative grid size-28 place-items-center rounded-full bg-[conic-gradient(#34c759_0_42%,#007aff_42%_72%,#ff9f0a_72%_86%,#ff375f_86%_100%)] p-2">
                    <div className="grid size-full place-items-center rounded-full bg-white text-sm font-semibold text-[#1d1d1f]">
                      Live
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {healthSignals.map(({ key, value, color, icon: Icon }, index) => (
                    <div
                      key={key}
                      className="signal-card rounded-[1.35rem] bg-[#f5f5f7] p-4 ring-1 ring-black/5"
                      style={{ animationDelay: `${240 + index * 90}ms` }}
                    >
                      <div className={`grid size-11 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
                        <Icon className="size-5" aria-hidden="true" />
                      </div>
                      <p className="mt-5 text-sm font-semibold text-[#6e6e73]">{t.labels[key]}</p>
                      <p className="mt-1 text-3xl font-semibold text-[#1d1d1f]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pop-chip pop-chip-one">
              <BellRing className="size-4 text-[#ff375f]" aria-hidden="true" />
              <span>{insightCopy[0]}</span>
            </div>
            <div className="pop-chip pop-chip-two">
              <Sparkles className="size-4 text-[#007aff]" aria-hidden="true" />
              <span>{insightCopy[1]}</span>
            </div>
            <div className="pop-chip pop-chip-three">
              <ShieldCheck className="size-4 text-[#34c759]" aria-hidden="true" />
              <span>{insightCopy[2]}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="intro" className="bg-[#f5f5f7] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-4xl text-center" data-reveal>
            <p className="text-sm font-semibold text-[#007aff]">Level 3 · Startup Value</p>
            <h2 className="mt-4 text-[clamp(2.5rem,6vw,5.8rem)] font-semibold leading-[0.98] tracking-normal">
              {locale === "zh" ? "Wellbeing Intelligence Layer。" : "Wellbeing Intelligence Layer."}
              <span className="block text-[#6e6e73]">
                {locale === "zh" ? "開始似一間公司。" : "Now it starts to look like a company."}
              </span>
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#6e6e73]">
              {locale === "zh"
                ? "HumanOS 不是單一健康工具，而是一層跨學校與企業的 wellbeing intelligence：收集私密訊號、偵測趨勢、輸出早期支援。"
                : "HumanOS is not a single health tool. It is a wellbeing intelligence layer across schools and organizations: private signals in, trend detection and early support out."}
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {intelligenceComparisons.map(([system, en, zh], index) => (
              <div
                key={system}
                data-reveal="slow"
                className="rounded-[1.8rem] bg-white p-7 text-center shadow-sm ring-1 ring-black/5"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <p className="text-4xl font-semibold tracking-normal text-[#1d1d1f]">{system}</p>
                <p className="mt-4 text-base font-semibold text-[#6e6e73]">
                  {locale === "zh" ? zh : en}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {supportCards.map(({ icon: Icon, href, label, tone }, index) => (
              <Link
                key={href}
                href={href}
                data-reveal
                className="group rounded-[1.8rem] bg-white p-7 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(0,0,0,0.10)]"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className={`grid size-14 place-items-center rounded-3xl ${tone}`}>
                  <Icon className="size-7" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-3xl font-semibold tracking-normal text-[#1d1d1f]">{label}</h3>
                <p className="mt-4 min-h-24 text-base leading-7 text-[#6e6e73]">
                  {href === "/students"
                    ? t.students.headline
                    : href === "/organizations"
                      ? t.organizations.headline
                      : t.home.privacyBody}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#007aff]">
                  {locale === "zh" ? "進一步了解" : "Learn more"}
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-20 space-y-6">
            {startupValue.map(({ icon: Icon, titleEn, titleZh, bodyEn, bodyZh }, index) => (
              <div
                key={titleEn}
                data-reveal={index % 2 === 0 ? "slide-left" : "slide-right"}
                className="slide-panel grid gap-6 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 md:grid-cols-[0.8fr_1.2fr] md:items-center md:p-7"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className={`min-h-52 rounded-[1.5rem] bg-gradient-to-br ${
                  index === 0 ? "from-[#ff375f] to-[#ff9f0a]" : index === 1 ? "from-[#007aff] to-[#64d2ff]" : "from-[#34c759] to-[#a2f06e]"
                } p-6 text-white shadow-[0_24px_70px_rgba(0,0,0,0.12)]`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white/76">0{index + 1}</span>
                    <Icon className="size-9" aria-hidden="true" />
                  </div>
                  <div className="mt-20 h-2 overflow-hidden rounded-full bg-white/24">
                    <div className="animated-bar h-full rounded-full bg-white" />
                  </div>
                </div>
                <div className="px-1 md:px-4">
                  <h3 className="text-[clamp(2rem,4vw,4.1rem)] font-semibold leading-none tracking-normal">
                    {locale === "zh" ? titleZh : titleEn}
                  </h3>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6e6e73]">
                    {locale === "zh" ? bodyZh : bodyEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate bg-white py-20 sm:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f7_100%)]" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div data-reveal="slide-left">
              <p className="inline-flex items-center gap-2 rounded-full bg-[#eaf5ff] px-4 py-2 text-sm font-semibold text-[#007aff]">
                <School className="size-4" aria-hidden="true" />
                School Pilot
              </p>
              <h2 className="mt-5 text-[clamp(3.8rem,9vw,8.6rem)] font-semibold leading-[0.9] tracking-normal">
                MOP
                <span className="block text-[#007aff]">60,000</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[#6e6e73]">
                {locale === "zh"
                  ? "一個適合學校即刻落地嘅三個月試點：私密 check-in、AI 每日支援、匿名化學校趨勢報告。"
                  : "A three-month school pilot package built for fast rollout: private check-ins, AI daily support, and anonymous school trend reports."}
              </p>
            </div>

            <div className="school-stack rounded-[2.2rem] bg-[#1d1d1f] p-5 text-white shadow-[0_30px_90px_rgba(0,0,0,0.18)] ring-1 ring-black/10" data-reveal="slide-right">
              <div className="flex items-center justify-between rounded-[1.5rem] bg-white/[0.08] p-5 ring-1 ring-white/10">
                <div>
                  <p className="text-sm font-semibold text-white/58">Launch sequence</p>
                  <p className="mt-2 text-2xl font-semibold">{locale === "zh" ? "由第 1 日開始有數據" : "Signal from day one"}</p>
                </div>
                <CalendarDays className="size-10 text-[#5ac8fa]" aria-hidden="true" />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {schoolPilotStats.map(([value, labelEn, labelZh], index) => (
                  <div
                    key={value}
                    className="slow-card rounded-[1.35rem] bg-white/[0.08] p-5 ring-1 ring-white/10"
                    style={{ animationDelay: `${index * 220}ms` }}
                  >
                    <p className="text-3xl font-semibold tracking-normal">{value}</p>
                    <p className="mt-3 text-sm font-semibold text-white/58">
                      {locale === "zh" ? labelZh : labelEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              locale === "zh" ? "第 1 週：建立 baseline" : "Week 1: Baseline setup",
              locale === "zh" ? "第 2-8 週：每日 AI 支援" : "Week 2-8: Daily AI support",
              locale === "zh" ? "第 9-12 週：匿名成效報告" : "Week 9-12: Anonymous outcome report",
            ].map((item, index) => (
              <div
                key={item}
                data-reveal="slow"
                className="rounded-[1.6rem] bg-white p-6 shadow-sm ring-1 ring-black/5"
                style={{ transitionDelay: `${index * 180}ms` }}
              >
                <p className="text-sm font-semibold text-[#007aff]">0{index + 1}</p>
                <p className="mt-8 text-xl font-semibold leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-4xl text-center" data-reveal="slow">
            <p className="text-sm font-semibold text-[#7d35ff]">Level 4 · VC Value</p>
            <h2 className="mt-4 text-[clamp(2.6rem,6vw,5.8rem)] font-semibold leading-[0.98] tracking-normal">
              {locale === "zh" ? "由產品，變成平台。" : "From product to platform."}
              <span className="block text-[#6e6e73]">
                {locale === "zh" ? "呢個開始有 scale。" : "This is where it starts to scale."}
              </span>
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-[#6e6e73]">
              {locale === "zh"
                ? "HumanOS 的投資價值不止於一個 wellbeing dashboard，而是未來可以承載健康、教練、課程及服務供應商的生態平台。"
                : "The investment value is not just a wellbeing dashboard. HumanOS can become the platform layer for health modules, coaches, courses, and service providers."}
            </p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {ecosystemBlocks.map(({ icon: Icon, titleEn, titleZh, bodyEn, bodyZh }, index) => (
              <div
                key={titleEn}
                data-reveal={index === 0 ? "slide-left" : index === 2 ? "slide-right" : "slow"}
                className="rounded-[1.8rem] bg-[#f5f5f7] p-7 ring-1 ring-black/5"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="grid size-14 place-items-center rounded-3xl bg-white text-[#7d35ff] shadow-sm ring-1 ring-black/5">
                  <Icon className="size-7" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-3xl font-semibold leading-none tracking-normal">
                  {locale === "zh" ? titleZh : titleEn}
                </h3>
                <p className="mt-5 text-base leading-7 text-[#6e6e73]">
                  {locale === "zh" ? bodyZh : bodyEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f5f5f7] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:px-8">
          <div data-reveal="slide-left">
            <p className="text-sm font-semibold text-[#ff375f]">Level 5 · Big Vision</p>
            <h2 className="mt-4 text-[clamp(2.8rem,7vw,7rem)] font-semibold leading-[0.92] tracking-normal">
              {locale === "zh" ? "The Operating System for Human Wellbeing." : "The Operating System for Human Wellbeing."}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6e6e73]">
              {locale === "zh"
                ? "終局故事係：HumanOS 成為學校、企業、教練、顧問、課程同健康服務之間的核心 wellbeing layer。每個人有自己嘅 wellbeing profile；每個機構有匿名 intelligence；每個 provider 可以接入同提供支援。"
                : "The endgame: HumanOS becomes the core wellbeing layer between schools, employers, coaches, consultants, courses, and health services. Individuals have a wellbeing profile, institutions get anonymous intelligence, and providers plug into the support network."}
            </p>
          </div>
          <div data-reveal="slide-right" className="rounded-[2.2rem] bg-[#1d1d1f] p-5 text-white shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
            <div className="rounded-[1.6rem] bg-white/[0.08] p-5 ring-1 ring-white/10">
              <Rocket className="size-10 text-[#5ac8fa]" aria-hidden="true" />
              <p className="mt-12 text-4xl font-semibold leading-tight">
                {locale === "zh" ? "一層連接所有 wellbeing 服務的操作系統。" : "One operating layer connecting every wellbeing service."}
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["Schools", "學校"],
                ["HR", "HR"],
                ["Coaches", "教練"],
                ["Courses", "課程"],
                ["Consultants", "顧問"],
                ["Wellness Providers", "Wellness Providers"],
              ].map(([en, zh], index) => (
                <div
                  key={en}
                  className="slow-card rounded-[1.25rem] bg-white/[0.08] p-4 text-sm font-semibold text-white/82 ring-1 ring-white/10"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  {locale === "zh" ? zh : en}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div data-reveal>
            <p className="text-sm font-semibold text-[#ff375f]">Proof of Intelligence</p>
            <h2 className="mt-4 text-[clamp(2.4rem,5vw,5rem)] font-semibold leading-none tracking-normal">
              {locale === "zh" ? "由趨勢，變成早期支援。" : "From trends to early support."}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#6e6e73]">
              {locale === "zh"
                ? "當睡眠下降、專注下降、壓力上升連續兩星期，HumanOS 可以提醒學生、HR 或學校採取支援行動。"
                : "When sleep declines, focus drops, and stress rises for consecutive weeks, HumanOS can trigger early support for students, HR, or schools."}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div data-reveal className="rounded-[1.75rem] bg-[#f5f5f7] p-5 ring-1 ring-black/5">
              <RechartsTrendPanel title={t.labels.weeklyTrend} />
            </div>
            <div data-reveal className="rounded-[1.75rem] bg-[#f5f5f7] p-5 ring-1 ring-black/5">
              <RechartsRadarPanel />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1d1d1f] py-20 text-white sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
          <div data-reveal>
            <p className="text-sm font-semibold text-[#5ac8fa]">Privacy</p>
            <h2 className="mt-4 text-[clamp(2.6rem,5vw,5.5rem)] font-semibold leading-none tracking-normal">
              {locale === "zh" ? "數據可以有用，亦可以保持私密。" : "Useful insight. Private by design."}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">{t.privacy.responsible}</p>
          </div>
          <div className="space-y-3" data-reveal>
            {t.privacy.canSee.slice(0, 4).map((item, index) => (
              <div
                key={item}
                className="privacy-row flex items-center gap-4 rounded-3xl bg-white/[0.08] p-4 text-sm font-semibold text-white/88 ring-1 ring-white/10"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <span className="grid size-10 place-items-center rounded-full bg-[#34c759]/18 text-[#34c759]">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8" data-reveal>
          <p className="text-sm font-semibold text-[#6e6e73]">
            {locale === "zh" ? "Demo 已收埋，想試先打開。" : "Demo is tucked away until you want to try it."}
          </p>
          <Link
            href="/demo"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#f5f5f7] px-6 py-3.5 text-base font-semibold text-[#1d1d1f] ring-1 ring-black/5 transition hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#007aff] focus:ring-offset-2"
          >
            {t.cta.viewDemo}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
