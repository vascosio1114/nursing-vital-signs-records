import { MessageCircle, Send, Sparkles } from "lucide-react";
import { DailyPlanCard } from "@/components/humanos/cards";
import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { coachPrompts, dailyPlan } from "@/lib/humanos-data";

export default function CoachPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="AI Wellbeing Coach"
            title="Daily support for students and high-pressure teams."
            body="The coach analyzes stress, sleep, focus, workload, emotional balance, and motivation signals together to create practical wellbeing guidance."
            dark
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-lg bg-blue-600 text-white">
              <MessageCircle className="size-6" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold text-blue-600">Mock AI chat</p>
              <h1 className="text-2xl font-semibold">Ask HumanOS</h1>
            </div>
          </div>
          <div className="space-y-4">
            {coachPrompts.map((item) => (
              <div key={item.prompt} className="space-y-3">
                <div className="ml-auto max-w-[86%] rounded-lg bg-slate-950 px-4 py-3 text-sm leading-6 text-white">
                  {item.prompt}
                </div>
                <div className="max-w-[90%] rounded-lg bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700">
                  <span className="mb-2 flex items-center gap-2 font-semibold text-blue-700">
                    <Sparkles className="size-4" aria-hidden="true" />
                    HumanOS Wellbeing Coach
                  </span>
                  {item.response}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
            <span className="flex-1 text-sm text-slate-500">
              What should I do if I feel overwhelmed?
            </span>
            <button
              className="grid size-10 place-items-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Send mock prompt"
            >
              <Send className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Daily Plan"
            title="Generated from current stress and recovery signals."
            body="Today prioritizes recovery, lighter cognitive load, hydration, and one protected focus block."
          />
          <div className="mt-6 grid gap-4">
            {Object.entries(dailyPlan).map(([period, tasks]) => (
              <DailyPlanCard key={period} period={period} tasks={tasks} />
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
          HumanOS is a wellbeing guidance layer. If a student or employee feels
          persistently overwhelmed, the product should guide them toward trusted
          people, licensed professionals, or existing school and workplace support
          channels.
        </div>
      </section>
      <Footer />
    </main>
  );
}
