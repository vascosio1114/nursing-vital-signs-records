import Link from "next/link";
import { healthDomains, humanScore } from "@/lib/humanos-data";

export function HumanBodyOverview() {
  return (
    <div className="relative min-h-[640px] overflow-hidden rounded-lg border border-slate-200 bg-[radial-gradient(circle_at_50%_14%,rgba(56,189,248,0.2),transparent_24%),linear-gradient(180deg,#ffffff,#eef6ff)] p-5 shadow-sm">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <div className="absolute left-1/2 top-10 h-[560px] w-[230px] -translate-x-1/2">
        <div className="absolute left-1/2 top-0 size-24 -translate-x-1/2 rounded-full border border-blue-200 bg-white/95 shadow-inner" />
        <div className="absolute left-1/2 top-[96px] h-[210px] w-[150px] -translate-x-1/2 rounded-[48%_48%_34%_34%] border border-blue-200 bg-white/95 shadow-inner" />
        <div className="absolute left-[21px] top-[122px] h-[230px] w-12 rotate-6 rounded-full border border-blue-200 bg-white/95 shadow-inner" />
        <div className="absolute right-[21px] top-[122px] h-[230px] w-12 -rotate-6 rounded-full border border-blue-200 bg-white/95 shadow-inner" />
        <div className="absolute left-[67px] top-[285px] h-[255px] w-12 rounded-full border border-blue-200 bg-white/95 shadow-inner" />
        <div className="absolute right-[67px] top-[285px] h-[255px] w-12 rounded-full border border-blue-200 bg-white/95 shadow-inner" />
        <div className="absolute left-1/2 top-[170px] size-16 -translate-x-1/2 rounded-full bg-blue-500/10 ring-1 ring-blue-200" />
        <div className="absolute left-1/2 top-[312px] h-28 w-24 -translate-x-1/2 rounded-full bg-cyan-400/10 ring-1 ring-cyan-200" />
      </div>
      <div className="absolute left-1/2 top-[265px] z-10 -translate-x-1/2 rounded-full border border-slate-200 bg-white px-5 py-4 text-center shadow-lg">
        <p className="text-xs font-semibold uppercase text-slate-500">HumanOS</p>
        <p className="mt-1 text-4xl font-semibold text-slate-950">{humanScore}</p>
      </div>
      {healthDomains.map((domain) => (
        <Link
          key={domain.slug}
          href={`/domain/${domain.slug}`}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white bg-white/95 px-3 py-2 text-xs font-semibold text-slate-800 shadow-md ring-1 ring-slate-200 transition hover:-translate-y-[55%] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ top: domain.coordinates.top, left: domain.coordinates.left }}
        >
          <span className="flex items-center gap-2">
            <span
              className={`size-2 rounded-full ${
                domain.risk === "high"
                  ? "bg-rose-500"
                  : domain.risk === "medium"
                    ? "bg-amber-500"
                    : "bg-emerald-500"
              }`}
            />
            {domain.shortName} {domain.score}
          </span>
        </Link>
      ))}
      <div className="absolute bottom-4 left-4 right-4 z-10 rounded-lg border border-slate-200 bg-white/90 p-4 backdrop-blur">
        <p className="text-sm font-semibold text-slate-950">AI monitoring summary</p>
        <p className="mt-1 text-sm leading-6 text-slate-600">
          Different parts of the human wellbeing system are being monitored as one
          connected operating system.
        </p>
      </div>
    </div>
  );
}
