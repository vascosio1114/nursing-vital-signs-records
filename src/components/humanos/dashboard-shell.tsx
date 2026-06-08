import Link from "next/link";
import { LayoutDashboard, MessageCircle, Radar, Users } from "lucide-react";

const sidebarLinks = [
  { label: "Personal", href: "/dashboard", icon: LayoutDashboard },
  { label: "Demo", href: "/demo", icon: Radar },
  { label: "School", href: "/school-dashboard", icon: Users },
  { label: "Organization", href: "/organization-dashboard", icon: Users },
  { label: "AI Coach", href: "/coach", icon: MessageCircle },
  { label: "Pilot", href: "/pilot", icon: LayoutDashboard },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 py-5 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="rounded-lg border border-white/10 bg-white/[0.04] p-4 lg:sticky lg:top-5 lg:h-[calc(100vh-40px)]">
          <Link href="/" className="block">
            <p className="text-xl font-semibold">HumanOS</p>
            <p className="mt-1 text-xs text-slate-400">Wellbeing Command Center</p>
          </Link>
          <nav className="mt-8 grid gap-2">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-8 rounded-lg bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-100">
            Wellbeing guidance and early support awareness only. Not a medical diagnosis product.
          </div>
        </aside>
        <section>{children}</section>
      </div>
    </main>
  );
}
