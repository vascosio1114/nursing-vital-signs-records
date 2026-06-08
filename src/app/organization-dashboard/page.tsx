import { MetricCard, OrganizationMetricCard } from "@/components/humanos/cards";
import { TrendChart } from "@/components/humanos/charts";
import { DashboardShell } from "@/components/humanos/dashboard-shell";
import { employeeMetrics, organizationMetrics, trustMessages } from "@/lib/humanos-data";

export default function OrganizationDashboardPage() {
  return (
    <DashboardShell>
      <div className="grid gap-5">
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
            Organization Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold">Workplace wellbeing intelligence</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            For high-pressure, shift-based, and customer-facing teams that need
            aggregate stress, sleep, energy, and campaign visibility.
          </p>
        </section>
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {organizationMetrics.map((metric) => (
            <OrganizationMetricCard key={metric.label} {...metric} />
          ))}
        </section>
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-white p-5 text-slate-950">
            <p className="text-sm font-semibold text-blue-600">Employee Dashboard Metrics</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {employeeMetrics.map((metric) => (
                <MetricCard key={metric.label} label={metric.label} value={metric.value} />
              ))}
            </div>
          </div>
          <div className="rounded-lg bg-white p-5 text-slate-950">
            <p className="text-sm font-semibold text-blue-600">Campaign and engagement trend</p>
            <TrendChart values={[54, 58, 63, 66, 69, 72]} />
          </div>
        </section>
        <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <p className="text-sm font-semibold text-cyan-300">Employer privacy boundary</p>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {trustMessages.slice(2).map((message) => (
              <p key={message} className="rounded-lg bg-white/7 p-3 text-sm leading-6 text-slate-200">
                {message}
              </p>
            ))}
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
