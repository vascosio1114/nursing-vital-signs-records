"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Locale = "en" | "zh";

type Translation = (typeof translations)[Locale];

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const translations = {
  en: {
    nav: {
      product: "Demo",
      students: "Students",
      organizations: "Organizations",
      pilot: "Pilot",
      privacy: "Privacy",
      technology: "Technology",
      contact: "Start Pilot",
      subtitle: "AI Wellbeing Intelligence",
    },
    cta: {
      viewDemo: "View Demo",
      startPilot: "Start Pilot",
      startPilotConversation: "Start a Pilot Conversation",
      applyPilot: "Apply for Pilot",
      generateReport: "Generate AI Wellbeing Report",
    },
    footer: {
      text: "AI-powered stress awareness, burnout risk visibility, and daily wellbeing support for schools and organizations. Not a medical diagnosis product.",
    },
    home: {
      eyebrow: "Wellbeing Intelligence Layer",
      headline: "The Operating System for Human Wellbeing",
      subheadline:
        "HumanOS helps schools and organizations turn stress, sleep, focus, workload, motivation, and emotional wellbeing trends into early-support intelligence, anonymous dashboards, and a future wellbeing ecosystem.",
      market: "Macao-first pilot platform for schools, universities, resorts, service teams, and HR departments.",
      problemTitle: "Support often arrives too late.",
      problemBody:
        "Schools and organizations often rely on reactive support, low-frequency surveys, and fragmented wellbeing resources.",
      solutionTitle: "HumanOS turns wellbeing signals into intelligence.",
      solutionBody:
        "Private check-ins become early-support intelligence, daily support plans, personal dashboards, and anonymized institution dashboards.",
      privacyTitle: "Privacy-first by design.",
      privacyBody:
        "Institutions see anonymous trends. Individuals keep private reflections private.",
      businessTitle: "Pilot-ready B2B intelligence model.",
      roadmapTitle: "Roadmap from MVP to wellbeing ecosystem.",
    },
    demo: {
      headline: "A clickable wellbeing flow from check-in to early support.",
      body:
        "Choose a profile, complete a wellbeing check-in, generate a report, and watch personal and anonymous institution dashboards update.",
      steps: [
        "Choose profile",
        "Complete wellbeing check-in",
        "Generate scores",
        "AI Wellbeing Report",
        "Daily Support Plan",
        "Dashboard update",
      ],
      profiles: ["Student", "Employee", "School Admin / HR"],
      questions: [
        "How stressed do you feel today?",
        "How well did you sleep?",
        "How focused do you feel?",
        "How emotionally balanced do you feel?",
        "How heavy does your workload feel?",
        "How motivated do you feel?",
      ],
      report:
        "Your stress level appears elevated compared with your recent baseline. Your sleep recovery score is below your usual range, which may be affecting focus and motivation. Today’s plan should prioritize recovery, lighter cognitive load, hydration, and a short breathing exercise. If this pattern continues, consider speaking with a trusted support professional.",
      generated: "report generated",
      privacy:
        "Individual reflections remain private. Schools and employers only see anonymized, aggregated trends, and small groups are hidden to reduce identity inference risk.",
    },
    labels: {
      wellbeingScore: "Wellbeing Score",
      stressIndex: "Stress Index",
      sleepRecovery: "Sleep Recovery",
      focusScore: "Focus Score",
      motivation: "Motivation",
      emotionalBalance: "Emotional Balance",
      burnoutAwareness: "Burnout Risk Awareness",
      aiDailyPlan: "AI Daily Plan",
      anonymousDashboard: "Anonymous Institution Dashboard",
      participation: "Participation",
      weeklyTrend: "Weekly Trend",
      aiRecommendations: "AI Recommendations",
    },
    plan: {
      morning: "Morning",
      afternoon: "Afternoon",
      evening: "Evening",
      morningTasks: ["3-minute breathing reset", "Hydration", "Light planning"],
      afternoonTasks: ["15-minute walk", "Focus block", "Healthy meal"],
      eveningTasks: ["Reflection journal", "Reduce screen time", "Sleep preparation"],
    },
    students: {
      headline: "AI wellbeing support for students before stress becomes a crisis.",
      body:
        "HumanOS helps schools understand academic stress, sleep and focus decline, emotional check-in patterns, and support needs through personal guidance and anonymized dashboards.",
      features: [
        "Private wellbeing check-ins",
        "Stress awareness",
        "Sleep quality tracking",
        "Focus score",
        "Motivation tracking",
        "Emotional balance",
        "AI study wellbeing plan",
        "Weekly wellbeing summary",
      ],
      privacy:
        "Schools cannot see personal journals, private reflections, or private AI coach conversations. They only see anonymized group trends.",
    },
    organizations: {
      headline: "AI wellbeing intelligence for high-pressure workplaces.",
      body:
        "For hotels, resorts, casino operators, service teams, shift-based teams, and HR departments that need privacy-safe wellbeing visibility.",
      targets: ["Hotels", "Resorts", "Casino operators", "Service teams", "Shift-based teams", "HR departments"],
      features: [
        "Employee wellbeing check-ins",
        "Stress and burnout awareness",
        "Shift-work sleep impact",
        "Team energy trends",
        "AI recovery plan",
        "Anonymous HR dashboard",
        "Department comparison",
        "Wellness campaign tracking",
      ],
      privacy:
        "Employers cannot read private journals or individual mental wellbeing content. They only see anonymized and grouped trends.",
    },
    pilot: {
      headline: "Launch a 3-month wellbeing intelligence pilot.",
      months: [
        ["Month 1", ["Needs interview", "Privacy and compliance setup", "User onboarding", "Baseline measurement"]],
        ["Month 2", ["Daily check-ins", "AI daily plans", "Weekly dashboard review", "Wellbeing campaign suggestions"]],
        ["Month 3", ["Outcome evaluation", "Pilot summary report", "Renewal proposal", "Expansion plan"]],
      ],
      metrics: [
        "Activation rate ≥ 70%",
        "Weekly active rate ≥ 55%",
        "Satisfaction ≥ 80%",
        "Renewal intention ≥ 50%",
        "Campaign participation tracked",
        "Referral engagement tracked",
      ],
      pricing: [
        ["Student Pilot", "MOP 30,000–80,000 for 3-month pilot"],
        ["Team Wellness", "MOP 25–60 per user per month"],
        ["Institution Pro", "Custom annual package"],
        ["Platform Partner", "API / white-label / custom deployment"],
      ],
    },
    privacy: {
      headline: "Privacy-first wellbeing intelligence.",
      canSeeTitle: "Institutions can see",
      cannotSeeTitle: "Institutions cannot see",
      canSee: [
        "Anonymous stress trends",
        "Sleep and focus trends",
        "Participation rates",
        "Department / class / cohort comparisons",
        "Campaign progress",
        "Monthly wellbeing summaries",
        "Referral volume",
      ],
      cannotSee: [
        "Personal journals",
        "Private reflections",
        "Individual AI conversations",
        "Identifiable wellbeing reports",
        "Small-group identifiable data",
        "Private mental wellbeing content",
      ],
      responsible:
        "HumanOS provides wellbeing guidance, stress awareness, and early-support insights. It does not provide medical diagnosis, treatment, cure, or crisis-prevention services. When needed, users should be referred to licensed professionals or existing school / workplace support channels.",
    },
    technology: {
      headline: "AI workflow infrastructure for wellbeing intelligence.",
      body:
        "HumanOS is designed as workflow infrastructure, not a generic chatbot wrapper.",
      blocks: [
        ["Agentic Workflows", "Signal Understanding Agent, RAG Knowledge Agent, Planning Agent, Safety Agent, Institutional Insight Agent"],
        ["RAG Wellbeing Knowledge Base", "Reviewed wellbeing education materials, school support workflows, HR resources, sleep and focus guidance, institutional SOPs."],
        ["Time-Series Trend Detection", "Tracks stress, sleep, focus, motivation, workload, and emotional balance over time."],
        ["Privacy-First Data Governance", "Role-based access, anonymization, small-group suppression, audit logs, and sensitive data separation."],
      ],
    },
    contact: {
      headline: "Start a pilot conversation.",
      body:
        "Tell us about your school or organization pilot. This demo form shows the intended flow and does not send data to a backend.",
      fields: {
        name: "Name",
        organization: "Organization",
        role: "Role",
        email: "Email",
        pilotType: "Pilot Type",
        message: "Message",
      },
      success: "Thank you. Your pilot request has been captured in this demo.",
    },
  },
  zh: {
    nav: {
      product: "Demo",
      students: "學生方案",
      organizations: "機構方案",
      pilot: "試點計劃",
      privacy: "私隱",
      technology: "技術",
      contact: "申請試點",
      subtitle: "AI 福祉智能平台",
    },
    cta: {
      viewDemo: "查看 Demo",
      startPilot: "申請試點",
      startPilotConversation: "開始試點洽談",
      applyPilot: "申請試點",
      generateReport: "生成 AI 福祉報告",
    },
    footer: {
      text: "HumanOS 提供壓力覺察、倦怠風險 awareness 及每日福祉支援，面向學校與機構。不屬於醫療診斷產品。",
    },
    home: {
      eyebrow: "Wellbeing Intelligence Layer",
      headline: "The Operating System for Human Wellbeing",
      subheadline:
        "HumanOS 幫助學校與機構將壓力、睡眠、專注、工作量、動力及情緒福祉趨勢，轉化為早期支援智能、匿名化儀表板及未來 wellbeing ecosystem。",
      market: "以澳門為首個試點市場，面向學校、大學、酒店、度假村、服務團隊及 HR 部門。",
      problemTitle: "很多支援，都來得太遲。",
      problemBody:
        "學校與機構往往依賴被動支援、低頻問卷及分散的福祉資源，難以及早掌握趨勢。",
      solutionTitle: "HumanOS 將福祉訊號轉化為 intelligence。",
      solutionBody:
        "私密 check-in 會轉化成早期支援 intelligence、每日支援計劃、個人儀表板及匿名化機構儀表板。",
      privacyTitle: "私隱優先設計。",
      privacyBody: "機構只看到匿名趨勢；個人反思及私人內容保持私密。",
      businessTitle: "適合試點落地的 B2B intelligence 模式。",
      roadmapTitle: "由 MVP 走向 wellbeing ecosystem。",
    },
    demo: {
      headline: "由 check-in 到早期支援的互動 Demo。",
      body:
        "選擇身份、完成 wellbeing check-in、生成報告，並查看個人及匿名化機構儀表板如何更新。",
      steps: ["選擇身份", "完成 wellbeing check-in", "生成分數", "AI 福祉報告", "每日支援計劃", "儀表板更新"],
      profiles: ["學生", "員工", "學校管理員 / HR"],
      questions: [
        "你今日壓力有幾高？",
        "你昨晚睡眠質素如何？",
        "你今日專注力如何？",
        "你今日情緒平衡如何？",
        "你覺得工作量 / 學業量有幾重？",
        "你今日動力如何？",
      ],
      report:
        "你今日的壓力水平較近期基線偏高，睡眠恢復分數亦低於平常水平，可能會影響專注力與動力。今日建議優先安排恢復、降低認知負荷、補充水分，並完成一個短呼吸練習。如果這種狀態持續，建議考慮透過可信任的支援渠道或專業人士尋求協助。",
      generated: "報告已生成",
      privacy:
        "個人反思保持私密。學校與僱主只會看到匿名化、聚合趨勢，小樣本群組會被隱藏，以降低身份推斷風險。",
    },
    labels: {
      wellbeingScore: "福祉分數",
      stressIndex: "壓力指數",
      sleepRecovery: "睡眠恢復",
      focusScore: "專注分數",
      motivation: "動力",
      emotionalBalance: "情緒平衡",
      burnoutAwareness: "倦怠風險 awareness",
      aiDailyPlan: "AI 每日計劃",
      anonymousDashboard: "匿名化機構儀表板",
      participation: "參與率",
      weeklyTrend: "每週趨勢",
      aiRecommendations: "AI 建議",
    },
    plan: {
      morning: "早上",
      afternoon: "下午",
      evening: "晚上",
      morningTasks: ["3 分鐘呼吸重置", "補充水分", "輕量計劃"],
      afternoonTasks: ["15 分鐘步行", "專注工作時段", "均衡飲食"],
      eveningTasks: ["反思日記", "減少螢幕時間", "睡眠準備"],
    },
    students: {
      headline: "在壓力惡化之前，為學生提供 AI 福祉支援。",
      body:
        "HumanOS 幫助學校了解學業壓力、睡眠與專注下降、情緒 check-in 趨勢及支援需要，並透過匿名化儀表板保護學生私隱。",
      features: ["私密 wellbeing check-in", "壓力覺察", "睡眠質素追蹤", "專注分數", "動力追蹤", "情緒平衡", "AI 學習福祉計劃", "每週福祉摘要"],
      privacy:
        "學校不能查看個人日記、私人反思或私人 AI Coach 對話，只能查看匿名化群組趨勢。",
    },
    organizations: {
      headline: "面向高壓工作環境的 AI 福祉智能系統。",
      body:
        "適用於酒店、度假村、娛樂場營運商、服務團隊、輪班團隊及 HR 部門，提供私隱安全的福祉趨勢洞察。",
      targets: ["酒店", "度假村", "娛樂場營運商", "服務團隊", "輪班團隊", "HR 部門"],
      features: ["員工 wellbeing check-in", "壓力及倦怠 awareness", "輪班睡眠影響", "團隊能量趨勢", "AI 恢復計劃", "匿名 HR 儀表板", "部門比較", "福祉活動追蹤"],
      privacy:
        "企業不能查看個人日記、私人反思或個人心理福祉內容，只能查看匿名化及群組化趨勢。",
    },
    pilot: {
      headline: "啟動 3 個月福祉智能試點。",
      months: [
        ["第 1 個月", ["需求訪談", "私隱及合規設定", "用戶導入", "基線測量"]],
        ["第 2 個月", ["每日 check-in", "AI 每日計劃", "每週 dashboard 回顧", "福祉活動建議"]],
        ["第 3 個月", ["成效評估", "試點總結報告", "續約方案", "擴展建議"]],
      ],
      metrics: ["啟動率 ≥ 70%", "每週活躍率 ≥ 55%", "滿意度 ≥ 80%", "續約意向 ≥ 50%", "活動參與追蹤", "轉介互動追蹤"],
      pricing: [
        ["Student Pilot", "3 個月試點 MOP 30,000–80,000"],
        ["Team Wellness", "每位用戶每月 MOP 25–60"],
        ["Institution Pro", "年度自訂方案"],
        ["Platform Partner", "API / white-label / 自訂部署"],
      ],
    },
    privacy: {
      headline: "私隱優先的福祉智能系統。",
      canSeeTitle: "機構可以查看",
      cannotSeeTitle: "機構不能查看",
      canSee: ["匿名壓力趨勢", "睡眠及專注趨勢", "參與率", "部門 / 班級 / 群組比較", "活動進度", "月度福祉摘要", "轉介數量"],
      cannotSee: ["個人日記", "私人反思", "個人 AI 對話", "可識別個人的福祉報告", "小樣本可識別資料", "私人心理福祉內容"],
      responsible:
        "HumanOS 提供福祉指引、壓力覺察及早期支援參考，不提供醫療診斷、治療、治癒或危機干預服務。如有需要，使用者應透過合資格專業人士或既有學校 / 工作場所支援渠道尋求協助。",
    },
    technology: {
      headline: "支撐福祉智能的 AI 工作流基礎設施。",
      body: "HumanOS 被設計成工作流基礎設施，而不是一般 GPT wrapper。",
      blocks: [
        ["Agentic Workflows", "訊號理解 Agent、RAG 知識 Agent、計劃 Agent、安全 Agent、機構洞察 Agent"],
        ["RAG 福祉知識庫", "經審閱的福祉教育材料、學校支援流程、HR 資源、睡眠與專注指引、機構 SOP。"],
        ["時間序列趨勢偵測", "持續追蹤壓力、睡眠、專注、動力、工作量及情緒平衡。"],
        ["私隱優先資料治理", "角色權限、匿名化、小樣本隱藏、審計紀錄及敏感資料分離。"],
      ],
    },
    contact: {
      headline: "開始試點洽談。",
      body: "告訴我們你的學校或機構試點需要。此 demo 表單只展示流程，不會傳送資料到後端。",
      fields: {
        name: "姓名",
        organization: "機構",
        role: "職位",
        email: "電郵",
        pilotType: "試點類型",
        message: "訊息",
      },
      success: "謝謝。此 demo 已記錄你的試點申請狀態。",
    },
  },
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "en";
    }
    const saved = window.localStorage.getItem("humanos-locale");
    return saved === "zh" ? "zh" : "en";
  });

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hant" : "en";
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    function setLocale(nextLocale: Locale) {
      setLocaleState(nextLocale);
      window.localStorage.setItem("humanos-locale", nextLocale);
    }

    return {
      locale,
      setLocale,
      t: translations[locale],
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return value;
}
