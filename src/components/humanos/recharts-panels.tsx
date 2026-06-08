"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const trendData = [
  { week: "W1", wellbeing: 68, stress: 72 },
  { week: "W2", wellbeing: 70, stress: 69 },
  { week: "W3", wellbeing: 67, stress: 74 },
  { week: "W4", wellbeing: 73, stress: 66 },
  { week: "W5", wellbeing: 76, stress: 63 },
  { week: "W6", wellbeing: 78, stress: 60 },
];

const radarData = [
  { domain: "Stress", value: 64 },
  { domain: "Sleep", value: 64 },
  { domain: "Focus", value: 72 },
  { domain: "Motivation", value: 68 },
  { domain: "Balance", value: 74 },
  { domain: "Workload", value: 62 },
];

const barData = [
  { label: "Check-in", value: 76 },
  { label: "Campaign", value: 58 },
  { label: "Plan", value: 55 },
  { label: "Referral", value: 24 },
];

export function RechartsTrendPanel({ title }: { title: string }) {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartPlaceholder title={title} />;
  }

  return (
    <div className="h-64 w-full">
      <p className="mb-4 text-sm font-semibold text-blue-600">{title}</p>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={trendData} margin={{ left: -18, right: 8, top: 8, bottom: 8 }}>
          <defs>
            <linearGradient id="wellbeing" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.36} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
          <Tooltip />
          <Area dataKey="wellbeing" fill="url(#wellbeing)" stroke="#0284c7" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RechartsRadarPanel() {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartPlaceholder title="Radar" />;
  }

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="domain" tick={{ fill: "#64748b", fontSize: 12 }} />
          <Radar dataKey="value" stroke="#2563eb" fill="#38bdf8" fillOpacity={0.22} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RechartsBarPanel({ title }: { title: string }) {
  const mounted = useMounted();

  if (!mounted) {
    return <ChartPlaceholder title={title} />;
  }

  return (
    <div className="h-64 w-full">
      <p className="mb-4 text-sm font-semibold text-blue-600">{title}</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData} margin={{ left: -18, right: 8, top: 8, bottom: 8 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 12 }} />
          <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return mounted;
}

function ChartPlaceholder({ title }: { title: string }) {
  return (
    <div className="flex h-64 w-full items-center justify-center rounded-lg bg-slate-50 text-sm font-semibold text-slate-400">
      {title}
    </div>
  );
}
