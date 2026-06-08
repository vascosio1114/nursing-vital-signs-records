export type HealthDomain = {
  slug: string;
  name: string;
  shortName: string;
  score: number;
  trend: "improving" | "stable" | "declining";
  risk: "low" | "medium" | "high";
  coordinates: {
    top: string;
    left: string;
  };
  summary: string;
  signals: string[];
  metrics: {
    label: string;
    value: string;
    score: number;
  }[];
  analysis: string;
  recommendations: string[];
};

export const healthDomains: HealthDomain[] = [
  {
    slug: "brain-health",
    name: "Brain Health",
    shortName: "Brain",
    score: 87,
    trend: "improving",
    risk: "low",
    coordinates: { top: "10%", left: "50%" },
    summary: "Cognitive readiness is strong with stable focus and learning capacity.",
    signals: ["Memory", "Focus", "Reaction Speed", "Learning Ability"],
    metrics: [
      { label: "Memory", value: "91%", score: 91 },
      { label: "Focus", value: "84%", score: 84 },
      { label: "Reaction Speed", value: "268 ms", score: 82 },
      { label: "Learning Ability", value: "88%", score: 88 },
      { label: "Cognitive Performance", value: "87/100", score: 87 },
    ],
    analysis:
      "Brain performance is one of the user's strongest domains. The main opportunity is protecting deep work windows when sleep quality drops.",
    recommendations: [
      "Schedule one 90-minute focus block before midday.",
      "Run a 5-minute memory recall drill after learning sessions.",
      "Avoid context switching during the first two work cycles.",
    ],
  },
  {
    slug: "mental-health",
    name: "Mental Health",
    shortName: "Mental",
    score: 72,
    trend: "stable",
    risk: "medium",
    coordinates: { top: "20%", left: "39%" },
    summary: "Mood is steady, but burnout and anxiety indicators need monitoring.",
    signals: ["Mood", "Stress", "Burnout Risk", "Emotional Stability"],
    metrics: [
      { label: "Mood", value: "74%", score: 74 },
      { label: "Stress", value: "62%", score: 62 },
      { label: "Burnout Risk", value: "Moderate", score: 68 },
      { label: "Anxiety Indicators", value: "Watch", score: 70 },
      { label: "Emotional Stability", value: "76%", score: 76 },
    ],
    analysis:
      "Mental health is functional but not fully resilient. Stress recovery is the biggest lever for improving the full HumanOS Score.",
    recommendations: [
      "Use a 7-minute breathing session after the highest-stress meeting.",
      "Move one nonessential task out of today's schedule.",
      "Close the day with a two-line reflection to reduce cognitive carryover.",
    ],
  },
  {
    slug: "sleep-health",
    name: "Sleep Health",
    shortName: "Sleep",
    score: 65,
    trend: "declining",
    risk: "high",
    coordinates: { top: "8%", left: "63%" },
    summary: "Sleep quality is declining and is now affecting recovery and focus.",
    signals: ["Duration", "Quality", "Consistency", "Recovery"],
    metrics: [
      { label: "Sleep Duration", value: "6h 12m", score: 62 },
      { label: "Sleep Quality", value: "58%", score: 58 },
      { label: "Sleep Consistency", value: "71%", score: 71 },
      { label: "Recovery Score", value: "66/100", score: 66 },
    ],
    analysis:
      "Sleep is the primary risk domain. The system predicts lower focus tomorrow if bedtime consistency does not improve tonight.",
    recommendations: [
      "Start a screen-light reduction window at 21:45.",
      "Set tomorrow's first task before bed to reduce rumination.",
      "Keep caffeine before 14:00 for the next three days.",
    ],
  },
  {
    slug: "physical-fitness",
    name: "Physical Fitness",
    shortName: "Fitness",
    score: 81,
    trend: "improving",
    risk: "low",
    coordinates: { top: "45%", left: "28%" },
    summary: "Activity volume and cardiovascular base are improving.",
    signals: ["Exercise", "Weight", "BMI", "Heart Rate"],
    metrics: [
      { label: "Exercise", value: "4x/week", score: 84 },
      { label: "Weight", value: "Stable", score: 80 },
      { label: "BMI", value: "22.4", score: 86 },
      { label: "Heart Rate", value: "62 bpm", score: 78 },
      { label: "Activity Score", value: "81/100", score: 81 },
    ],
    analysis:
      "Physical health is trending up. Maintaining consistency while sleep recovers will prevent fatigue accumulation.",
    recommendations: [
      "Use zone-2 cardio instead of high intensity today.",
      "Add 8 minutes of mobility after work.",
      "Keep the weekly goal at four workouts until recovery improves.",
    ],
  },
  {
    slug: "nutrition",
    name: "Nutrition",
    shortName: "Nutrition",
    score: 76,
    trend: "stable",
    risk: "medium",
    coordinates: { top: "50%", left: "61%" },
    summary: "Protein and hydration are adequate, but meal timing is inconsistent.",
    signals: ["Calories", "Protein", "Hydration", "Nutrition Quality"],
    metrics: [
      { label: "Calories", value: "2,180", score: 74 },
      { label: "Protein", value: "118 g", score: 82 },
      { label: "Hydration", value: "1.7 L", score: 68 },
      { label: "Nutrition Quality Score", value: "76/100", score: 76 },
    ],
    analysis:
      "Nutrition is generally stable. Hydration and lunch composition are the fastest paths to better energy stability.",
    recommendations: [
      "Drink 500 ml water before the first caffeine intake.",
      "Choose a high-protein lunch with slow carbohydrates.",
      "Add fruit or vegetables to the afternoon snack.",
    ],
  },
  {
    slug: "stress-management",
    name: "Stress Management",
    shortName: "Stress",
    score: 61,
    trend: "declining",
    risk: "medium",
    coordinates: { top: "31%", left: "68%" },
    summary: "Stress load is elevated and recovery breaks are insufficient.",
    signals: ["Load", "Recovery", "Breathing", "Calendar Pressure"],
    metrics: [
      { label: "Stress Load", value: "High", score: 55 },
      { label: "Recovery Breaks", value: "2/day", score: 63 },
      { label: "Breathing Consistency", value: "41%", score: 58 },
      { label: "Calendar Pressure", value: "Heavy", score: 60 },
    ],
    analysis:
      "Stress is interacting with sleep and mental health. The AI recommends immediate workload compression and planned recovery.",
    recommendations: [
      "Insert a 12-minute walk after lunch.",
      "Decline or shorten one meeting without clear output.",
      "Use a breathing reset before the afternoon work block.",
    ],
  },
  {
    slug: "lifestyle-habits",
    name: "Lifestyle Habits",
    shortName: "Habits",
    score: 79,
    trend: "improving",
    risk: "low",
    coordinates: { top: "68%", left: "52%" },
    summary: "Daily routines are becoming more consistent.",
    signals: ["Routines", "Screen Time", "Reflection", "Consistency"],
    metrics: [
      { label: "Morning Routine", value: "82%", score: 82 },
      { label: "Screen Time", value: "Managed", score: 76 },
      { label: "Reflection", value: "5x/week", score: 84 },
      { label: "Consistency", value: "79%", score: 79 },
    ],
    analysis:
      "Lifestyle habits are supporting the system. The next gain comes from making sleep preparation non-negotiable.",
    recommendations: [
      "Anchor sleep preparation to a fixed evening alarm.",
      "Move phone charging outside the bed area.",
      "Keep the morning routine below 20 minutes.",
    ],
  },
  {
    slug: "skin-appearance",
    name: "Skin & Appearance",
    shortName: "Skin",
    score: 70,
    trend: "stable",
    risk: "medium",
    coordinates: { top: "25%", left: "29%" },
    summary: "Appearance markers are stable with mild fatigue signals.",
    signals: ["Hydration", "Skin Recovery", "Inflammation", "Fatigue Markers"],
    metrics: [
      { label: "Hydration Signal", value: "68%", score: 68 },
      { label: "Skin Recovery", value: "72%", score: 72 },
      { label: "Inflammation", value: "Low", score: 78 },
      { label: "Fatigue Markers", value: "Visible", score: 63 },
    ],
    analysis:
      "Skin and appearance are reflecting sleep and hydration patterns more than isolated skin issues.",
    recommendations: [
      "Increase water intake before 16:00.",
      "Keep evening routine simple and consistent.",
      "Prioritize sleep improvement before adding new interventions.",
    ],
  },
  {
    slug: "heart-health",
    name: "Heart Health",
    shortName: "Heart",
    score: 83,
    trend: "stable",
    risk: "low",
    coordinates: { top: "35%", left: "48%" },
    summary: "Cardiovascular indicators are healthy and stable.",
    signals: ["Resting HR", "HRV", "Cardio Load", "Recovery"],
    metrics: [
      { label: "Resting Heart Rate", value: "62 bpm", score: 84 },
      { label: "HRV", value: "Good", score: 80 },
      { label: "Cardio Load", value: "Balanced", score: 86 },
      { label: "Recovery", value: "78%", score: 78 },
    ],
    analysis:
      "Heart health is not a current constraint. The system recommends steady cardio volume while stress is high.",
    recommendations: [
      "Keep cardio moderate today.",
      "Pair movement with stress recovery instead of performance chasing.",
      "Monitor HRV after sleep quality improves.",
    ],
  },
  {
    slug: "learning-focus",
    name: "Learning & Focus",
    shortName: "Learning",
    score: 76,
    trend: "declining",
    risk: "medium",
    coordinates: { top: "15%", left: "36%" },
    summary: "Learning output is good, but focus performance is decreasing.",
    signals: ["Deep Work", "Retention", "Attention", "Output Quality"],
    metrics: [
      { label: "Deep Work", value: "2h 20m", score: 75 },
      { label: "Retention", value: "79%", score: 79 },
      { label: "Attention", value: "Declining", score: 69 },
      { label: "Output Quality", value: "81%", score: 81 },
    ],
    analysis:
      "Focus is being pulled down by stress and sleep. The AI recommends protecting fewer, higher-quality work blocks.",
    recommendations: [
      "Reduce the number of active priorities to three.",
      "Use 50-minute focus cycles with 10-minute decompression.",
      "Do learning tasks before administrative tasks.",
    ],
  },
  {
    slug: "energy-level",
    name: "Energy Level",
    shortName: "Energy",
    score: 69,
    trend: "stable",
    risk: "medium",
    coordinates: { top: "55%", left: "38%" },
    summary: "Energy is usable but uneven through the afternoon.",
    signals: ["Morning Energy", "Afternoon Dip", "Recovery", "Hydration"],
    metrics: [
      { label: "Morning Energy", value: "77%", score: 77 },
      { label: "Afternoon Dip", value: "Moderate", score: 61 },
      { label: "Recovery", value: "66%", score: 66 },
      { label: "Hydration", value: "68%", score: 68 },
    ],
    analysis:
      "Energy instability is connected to hydration, lunch timing, and sleep quality. No single intervention is enough.",
    recommendations: [
      "Drink water before caffeine.",
      "Take a walk within 20 minutes after lunch.",
      "Avoid scheduling creative work during the predicted 15:00 dip.",
    ],
  },
  {
    slug: "longevity",
    name: "Longevity",
    shortName: "Longevity",
    score: 78,
    trend: "improving",
    risk: "low",
    coordinates: { top: "76%", left: "45%" },
    summary: "Long-term health behaviors are trending in the right direction.",
    signals: ["Metabolic Health", "Movement", "Sleep", "Consistency"],
    metrics: [
      { label: "Metabolic Health", value: "Good", score: 80 },
      { label: "Movement", value: "8,400 steps", score: 82 },
      { label: "Sleep Contribution", value: "Weak", score: 65 },
      { label: "Consistency", value: "78%", score: 78 },
    ],
    analysis:
      "Longevity indicators are improving, but sleep remains the weakest foundational pillar.",
    recommendations: [
      "Keep daily steps above 8,000.",
      "Protect sleep consistency before optimizing supplements.",
      "Maintain strength training twice per week.",
    ],
  },
];

export const humanScore = 82;

export const riskAlerts = [
  "Sleep Quality Declining",
  "Elevated Stress Levels",
  "Focus Performance Decreasing",
];

export const dailyPlan = {
  Morning: ["10-minute meditation", "Hydration", "Light stretching"],
  Afternoon: ["20-minute walk", "Balanced lunch", "Focus work block"],
  Evening: ["Reflection journal", "Reduce screen time", "Sleep preparation"],
};

export const primaryMetrics = [
  { label: "Student Wellbeing Score", value: "82 / 100", detail: "+8 this month" },
  { label: "Team Stress Index", value: "64", detail: "Moderate awareness level" },
  { label: "Burnout Risk Awareness", value: "18%", detail: "Anonymized group signal" },
  { label: "Sleep Trend", value: "-14%", detail: "Quality declined this week" },
  { label: "Focus Score", value: "87", detail: "Focus remains strong" },
  { label: "AI Daily Plan", value: "3 blocks", detail: "Morning, afternoon, evening" },
  { label: "Participation", value: "72%", detail: "Pilot engagement" },
  { label: "Daily Streak", value: "12 days", detail: "Check-ins completed" },
];

export const aiInsights = [
  "Sleep quality has declined by 14% this week.",
  "Stress level is elevated compared with your baseline.",
  "Focus remains strong, especially during morning study or work blocks.",
  "Your daily movement has improved for 5 consecutive days.",
];

export const roadmap = [
  ["Phase 1", "Student and employee wellbeing MVP"],
  ["Phase 2", "School and organization dashboards"],
  ["Phase 3", "Professional support network"],
  ["Phase 4", "HumanOS wellbeing platform"],
];

export const pricingPlans = [
  {
    name: "Student Pilot",
    price: "Pilot",
    features: [
      "Student app",
      "Wellbeing assessments",
      "School dashboard",
      "Monthly reports",
    ],
  },
  {
    name: "Team Wellness",
    price: "Custom",
    features: [
      "Employee app",
      "Anonymous HR dashboard",
      "Wellbeing campaigns",
      "Department-level insights",
    ],
  },
  {
    name: "Institution Pro",
    price: "Custom",
    features: [
      "Role-based access",
      "Custom reports",
      "Workshops",
      "Support workflow",
      "Privacy controls",
    ],
  },
  {
    name: "Platform Partner",
    price: "Partner",
    features: [
      "API",
      "White label",
      "Custom deployment",
      "Research collaboration",
    ],
  },
];

export const useCases = [
  {
    title: "Universities and schools",
    body: "Support student wellbeing with stress, sleep, focus, and engagement trend awareness.",
  },
  {
    title: "Hotels and resorts",
    body: "Help shift-based, customer-facing teams understand energy, recovery, and workload pressure.",
  },
  {
    title: "Corporate HR teams",
    body: "View anonymous wellbeing trends, campaign progress, and department-level support needs.",
  },
  {
    title: "Macao first market",
    body: "Designed for education, service teams, corporate wellness, and public-sector innovation pilots.",
  },
];

export const organizationMetrics = [
  { label: "Active Employees", value: "842" },
  { label: "Average Wellbeing Score", value: "78" },
  { label: "Stress Index", value: "64" },
  { label: "Burnout Risk Group", value: "18%" },
  { label: "Sleep Disruption Group", value: "31%" },
  { label: "Participation Rate", value: "72%" },
  { label: "Department Comparison", value: "5 teams" },
  { label: "Weekly Engagement", value: "4.2x" },
  { label: "Campaign Completion", value: "67%" },
];

export const trustMessages = [
  "HumanOS provides wellbeing guidance, not medical diagnosis.",
  "Users control their data and decide what to share.",
  "Organizations only see anonymized and aggregated trends.",
  "Small groups are hidden to reduce identity inference risk.",
  "Individual reflections are never shown to employers or schools.",
  "High-risk cases should be referred to licensed professionals or existing support channels.",
];

export const coachPrompts = [
  {
    prompt: "Why is my stress score high?",
    response:
      "Your workload pressure, sleep recovery, and reduced recovery breaks are combining into a higher stress signal today.",
  },
  {
    prompt: "How can I recover after a difficult shift?",
    response:
      "Prioritize hydration, a short walk, a lower cognitive-load evening, and sleep preparation. If this pattern continues, consider speaking with a trusted support professional.",
  },
  {
    prompt: "How can I improve my focus before exams?",
    response:
      "Use one 50-minute study block, remove phone notifications, hydrate first, and schedule a 10-minute reset before the next block.",
  },
  {
    prompt: "Create a 1-day recovery plan.",
    response:
      "Morning: breathing reset and light planning. Afternoon: walk and focused work block. Evening: reflection journal and screen reduction.",
  },
  {
    prompt: "What should I do if I feel overwhelmed?",
    response:
      "Pause, reduce immediate demands, use a grounding exercise, and reach out to a trusted person or support channel if the feeling continues.",
  },
];

export const studentMetrics = [
  { label: "Wellbeing Score", value: "82" },
  { label: "Stress Level", value: "Moderate" },
  { label: "Focus Score", value: "87" },
  { label: "Sleep Quality", value: "65" },
  { label: "Motivation", value: "74" },
  { label: "Emotional Balance", value: "72" },
  { label: "Weekly Trend", value: "+6%" },
  { label: "AI Recommendations", value: "4" },
];

export const schoolMetrics = [
  { label: "Participating Students", value: "1,248" },
  { label: "Anonymous Stress Trend", value: "+7%" },
  { label: "Sleep Risk Group", value: "31%" },
  { label: "Academic Burnout Risk", value: "16%" },
  { label: "Engagement Rate", value: "74%" },
  { label: "Check-in Completion", value: "81%" },
  { label: "Support Referral Volume", value: "24" },
  { label: "Weekly Wellbeing Summary", value: "Ready" },
];

export const employeeMetrics = [
  { label: "Wellbeing Score", value: "78" },
  { label: "Stress Level", value: "Moderate" },
  { label: "Sleep Recovery", value: "66" },
  { label: "Energy Level", value: "69" },
  { label: "Workload Pressure", value: "High" },
  { label: "Burnout Risk Awareness", value: "Watch" },
  { label: "AI Recovery Plan", value: "Generated" },
];

export const demoQuestions = [
  "How stressed do you feel today?",
  "How well did you sleep?",
  "How focused do you feel?",
  "How emotionally balanced do you feel?",
  "How heavy does your workload feel?",
  "How motivated do you feel?",
];

export const demoProfiles = ["Student", "Employee", "HR / School Admin"];

export const macaoMarketSignals = [
  {
    title: "Student pressure",
    body: "Universities, high schools, and training institutions need earlier visibility into stress, sleep, focus, and engagement patterns.",
  },
  {
    title: "Service economy teams",
    body: "Hotels, resorts, casino operators, and customer-facing teams often operate in high-pressure, shift-based environments.",
  },
  {
    title: "Privacy-safe institutions",
    body: "Schools and employers need aggregated wellbeing trends without accessing private individual reflections.",
  },
  {
    title: "Greater Bay Area expansion",
    body: "Macao is a focused pilot market before expanding to education, enterprise, and public-sector partners across the region.",
  },
];

export const pilotValidationMetrics = [
  { label: "Weekly check-in rate", value: "70%+" },
  { label: "AI plan completion", value: "55%+" },
  { label: "Support referral engagement", value: "Track" },
  { label: "Campaign participation", value: "Track" },
  { label: "Anonymous stress trend", value: "Monthly" },
  { label: "Retention / engagement signal", value: "Pilot KPI" },
];

export const institutionCanSee = [
  "Anonymous stress, sleep, focus, and engagement trends",
  "Participation and check-in completion rates",
  "Department, class, or cohort-level comparisons when group size is safe",
  "Campaign progress and monthly wellbeing summaries",
  "Referral volume through existing support workflows",
];

export const institutionCannotSee = [
  "Personal journals or private reflections",
  "Individual mental wellbeing content",
  "Identifiable high-risk details",
  "Small-group data that could reveal identity",
  "Private AI coach conversations",
];

export const organizationROI = [
  "Earlier awareness of workload pressure trends",
  "Better targeting for HR wellbeing campaigns",
  "Privacy-safe department comparison",
  "Support for retention and engagement conversations",
  "Scalable wellbeing support without reading private content",
];

export function getDomain(slug: string) {
  return healthDomains.find((domain) => domain.slug === slug);
}
