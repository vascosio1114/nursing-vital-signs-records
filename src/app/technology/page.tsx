"use client";

import { Cpu, Database, GitBranch, ShieldCheck } from "lucide-react";
import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { useI18n } from "@/lib/i18n";

const icons = [GitBranch, Database, Cpu, ShieldCheck];

export default function TechnologyPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Technology" title={t.technology.headline} body={t.technology.body} dark headingLevel="h1" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          {(t.technology.blocks as [string, string][]).map(([title, body], index) => {
            const Icon = icons[index];
            return (
              <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <Icon className="size-7 text-blue-600" aria-hidden="true" />
                <h2 className="mt-5 text-2xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
