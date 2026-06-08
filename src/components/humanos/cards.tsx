import Link from "next/link";
import { AlertTriangle, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { type HealthDomain } from "@/lib/humanos-data";

const riskTone = {
  low: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  medium: "bg-amber-50 text-amber-700 ring-amber-100",
  high: "bg-rose-50 text-rose-700 ring-rose-100",
};

export function HealthDomainCard({ domain }: { domain: HealthDomain }) {
  return (
    <Link
      href={`/domain/${domain.slug}`}
      className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-slate-950">{domain.name}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{domain.summary}</p>
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-slate-400 transition group-hover:text-blue-600" />
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-3xl font-semibold text-slate-950">{domain.score}</p>
          <p className="text-xs font-medium text-slate-500">/100</p>
        </div>
        <span className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ring-1 ${riskTone[domain.risk]}`}>
          {domain.risk} risk
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-blue-600" style={{ width: `${domain.score}%` }} />
      </div>
    </Link>
  );
}

export function MetricCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-slate-950">{value}</p>
      {detail ? <p className="mt-2 text-sm text-slate-500">{detail}</p> : null}
    </div>
  );
}

export function AIInsightCard({ insight }: { insight: string }) {
  return (
    <div className="flex gap-3 rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-slate-700">
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-blue-600" aria-hidden="true" />
      <span>{insight}</span>
    </div>
  );
}

export function DailyPlanCard({ period, tasks }: { period: string; tasks: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="font-semibold text-slate-950">{period}</h3>
      <div className="mt-4 space-y-3">
        {tasks.map((task) => (
          <label key={task} className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
            <input
              type="checkbox"
              className="size-4 rounded border-slate-300 accent-blue-600 focus:ring-blue-500"
              aria-label={`${period}: ${task}`}
            />
            <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />
            <span>{task}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function OrganizationMetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.06] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
