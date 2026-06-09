import { healthDomains } from "@/lib/humanos-data";

export function ScoreRing({
  score,
  label,
  size = "lg",
}: {
  score: number;
  label?: string;
  size?: "md" | "lg";
}) {
  const outer = size === "lg" ? "size-28" : "size-20";
  const inner = size === "lg" ? "size-20" : "size-14";
  const text = size === "lg" ? "text-3xl" : "text-lg";

  return (
    <div className="flex items-center gap-4">
      <div
        className={`grid ${outer} place-items-center rounded-full`}
        style={{
          background: `conic-gradient(#38bdf8 ${score * 3.6}deg, rgba(226,232,240,0.9) 0deg)`,
        }}
      >
        <div className={`grid ${inner} place-items-center rounded-full bg-white ${text} font-semibold text-slate-950`}>
          {score}
        </div>
      </div>
      {label ? (
        <div>
          <p className="text-sm font-semibold text-slate-500">{label}</p>
          <p className="mt-1 text-sm text-slate-600">Overall wellness status</p>
        </div>
      ) : null}
    </div>
  );
}

export function HealthRadarChart() {
  const size = 320;
  const center = size / 2;
  const maxRadius = 118;
  const points = healthDomains.map((domain, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / healthDomains.length;
    const radius = (domain.score / 100) * maxRadius;
    return {
      x: center + Math.cos(angle) * radius,
      y: center + Math.sin(angle) * radius,
      labelX: center + Math.cos(angle) * (maxRadius + 24),
      labelY: center + Math.sin(angle) * (maxRadius + 24),
      domain,
    };
  });

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="HumanOS health radar chart"
      className="h-auto w-full"
    >
      {[0.25, 0.5, 0.75, 1].map((ring) => (
        <circle
          key={ring}
          cx={center}
          cy={center}
          r={maxRadius * ring}
          fill="none"
          stroke="#e2e8f0"
        />
      ))}
      {points.map((point) => (
        <line
          key={point.domain.slug}
          x1={center}
          y1={center}
          x2={point.labelX}
          y2={point.labelY}
          stroke="#e2e8f0"
        />
      ))}
      <polygon
        points={points.map((point) => `${point.x},${point.y}`).join(" ")}
        fill="rgba(56,189,248,0.18)"
        stroke="#2563eb"
        strokeWidth="2"
      />
      {points.map((point) => (
        <g key={point.domain.slug}>
          <circle cx={point.x} cy={point.y} r="4" fill="#0f172a" />
          <text
            x={point.labelX}
            y={point.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-500 text-[9px] font-semibold"
          >
            {point.domain.shortName}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function TrendChart({ values = [72, 74, 73, 77, 79, 82] }: { values?: number[] }) {
  return (
    <div className="flex h-44 items-end gap-3">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-36 w-full items-end rounded-md bg-slate-100">
            <div
              className="w-full rounded-md bg-gradient-to-t from-blue-600 to-cyan-300"
              style={{ height: `${value}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-slate-400">W{index + 1}</span>
        </div>
      ))}
    </div>
  );
}
