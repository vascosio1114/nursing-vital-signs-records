"use client";

import Link from "next/link";
import { ArrowRight, CalendarCheck, CheckCircle2 } from "lucide-react";
import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { useI18n } from "@/lib/i18n";

export default function PilotPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Pilot Program" title={t.pilot.headline} dark headingLevel="h1" />
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            {t.cta.startPilotConversation}
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {(t.pilot.months as [string, string[]][]).map((entry) => (
            <div key={entry[0]} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <CalendarCheck className="size-7 text-blue-600" aria-hidden="true" />
              <h2 className="mt-5 text-2xl font-semibold">{entry[0]}</h2>
              <div className="mt-5 space-y-3">
                {entry[1].map((item) => (
                  <div key={item} className="flex gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader eyebrow="Success Metrics" title="Pilot KPIs" />
            <div className="mt-6 grid gap-3">
              {t.pilot.metrics.map((metric) => (
                <div key={metric} className="rounded-lg bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                  {metric}
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Packages" title="Commercial options" />
            <div className="mt-6 grid gap-3">
              {(t.pilot.pricing as [string, string][]).map((entry) => (
                <div key={entry[0]} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-slate-950">{entry[0]}</p>
                  <p className="mt-1 text-sm text-blue-700">{entry[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
