"use client";

import { ShieldCheck, XCircle } from "lucide-react";
import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { useI18n } from "@/lib/i18n";

export default function PrivacyPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Privacy & Responsible Use" title={t.privacy.headline} dark headingLevel="h1" />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-16 lg:grid-cols-2 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">{t.privacy.canSeeTitle}</h2>
          <div className="mt-6 space-y-3">
            {t.privacy.canSee.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <ShieldCheck className="size-5 shrink-0 text-emerald-600" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">{t.privacy.cannotSeeTitle}</h2>
          <div className="mt-6 space-y-3">
            {t.privacy.cannotSee.map((item) => (
              <div key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                <XCircle className="size-5 shrink-0 text-slate-500" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-sm leading-7 text-blue-950">
          {t.privacy.responsible}
        </div>
      </section>
      <Footer />
    </main>
  );
}
