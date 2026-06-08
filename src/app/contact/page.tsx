"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { useI18n } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Contact / Start Pilot" title={t.contact.headline} body={t.contact.body} dark headingLevel="h1" />
        </div>
      </section>
      <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        {submitted ? (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
            {t.contact.success}
          </div>
        ) : (
          <form
            className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={t.contact.fields.name} />
              <Field label={t.contact.fields.email} type="email" />
              <Field label={t.contact.fields.organization} />
              <Field label={t.contact.fields.role} />
              <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
                {t.contact.fields.pilotType}
                <select className="field-input" defaultValue="school">
                  <option value="school">School Pilot</option>
                  <option value="team">Team Wellness</option>
                  <option value="institution">Institution Pro</option>
                  <option value="partner">Platform Partner</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
                {t.contact.fields.message}
                <textarea className="field-input min-h-32" />
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="size-4" aria-hidden="true" />
              {t.cta.startPilotConversation}
            </button>
          </form>
        )}
      </section>
      <Footer />
    </main>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      {label}
      <input className="field-input" type={type} />
    </label>
  );
}
