import { Footer, Navbar, SectionHeader } from "@/components/humanos/layout";
import { roadmap } from "@/lib/humanos-data";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Navbar />
      <section className="bg-slate-950 py-14 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="About / Team"
            title="HumanOS by Radar AI Studio."
            body="A Macao-first startup-demo MVP for school partnerships, organization pilots, corporate wellness pitches, startup competitions, and government innovation grants."
            dark
          />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-blue-600">Mission</p>
          <h1 className="mt-3 text-3xl font-semibold">
            Make student and workplace wellbeing more visible, actionable, and privacy-safe.
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            HumanOS is not a diagnosis tool. It is an AI wellbeing operating
            system that turns stress, sleep, focus, workload, and emotional
            wellbeing signals into early support and daily plans.
          </p>
        </div>
        <div className="grid gap-4">
          {["AI-native product design", "Student wellbeing", "Organization wellness", "Macao / Greater Bay Area innovation"].map(
            (item) => (
              <div key={item} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <p className="font-semibold">{item}</p>
              </div>
            ),
          )}
        </div>
      </section>
      <section className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Roadmap" title="The path to an institutional wellbeing platform." />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {roadmap.map(([phase, title]) => (
              <div key={phase} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-blue-600">{phase}</p>
                <p className="mt-6 font-semibold">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
