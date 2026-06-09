import { AIInsightCard, DailyPlanCard, HealthDomainCard, MetricCard } from "@/components/humanos/cards";
import { HealthRadarChart, TrendChart } from "@/components/humanos/charts";
import { DashboardShell } from "@/components/humanos/dashboard-shell";
import { HumanBodyOverview } from "@/components/humanos/human-body-overview";
import { aiInsights, dailyPlan, healthDomains, primaryMetrics } from "@/lib/humanos-data";

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="grid gap-5">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            Personal Wellbeing Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold">
            Personal wellbeing command center
          </h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            A calm daily view across stress, sleep, focus, workload, emotional
            balance, motivation, and AI support planning.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {primaryMetrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <HumanBodyOverview />
          <div className="grid gap-5">
            <div className="rounded-lg bg-white p-5 text-slate-950">
              <p className="text-sm font-semibold text-blue-600">Health Radar Chart</p>
              <HealthRadarChart />
            </div>
            <div className="rounded-lg bg-white p-5 text-slate-950">
              <p className="text-sm font-semibold text-blue-600">Weekly Trend Chart</p>
              <TrendChart />
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-semibold text-cyan-300">AI Recommendations</p>
            <div className="mt-4 grid gap-3">
              {aiInsights.map((insight) => (
                <AIInsightCard key={insight} insight={insight} />
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {Object.entries(dailyPlan).map(([period, tasks]) => (
              <DailyPlanCard key={period} period={period} tasks={tasks} />
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {healthDomains.slice(0, 8).map((domain) => (
            <HealthDomainCard key={domain.slug} domain={domain} />
          ))}
        </section>
      </div>
    </DashboardShell>
  );
}
