import { MetricCard } from "@/components/humanos/cards";
import { TrendChart } from "@/components/humanos/charts";
import { DashboardShell } from "@/components/humanos/dashboard-shell";
import { schoolMetrics, trustMessages } from "@/lib/humanos-data";

export default function SchoolDashboardPage() {
  return (
    <DashboardShell>
      <div className="grid gap-5">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            School Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Anonymous student wellbeing trends</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Built for school support teams to understand stress, sleep, engagement,
            and referral volume without exposing individual reflections.
          </p>
        </section>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {schoolMetrics.map((metric) => (
            <MetricCard key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </section>
        <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg bg-white p-5 text-slate-950">
            <p className="text-sm font-semibold text-blue-600">Weekly Wellbeing Summary</p>
            <TrendChart values={[62, 64, 66, 65, 69, 72]} />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            <p className="text-sm font-semibold text-cyan-300">Privacy Controls</p>
            <div className="mt-4 grid gap-3">
              {trustMessages.slice(1).map((message) => (
                <p key={message} className="rounded-lg bg-white/7 p-3 text-sm leading-6 text-slate-200">
                  {message}
                </p>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
