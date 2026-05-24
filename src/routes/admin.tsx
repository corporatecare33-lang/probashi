import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Banknote,
  Briefcase,
  Building2,
  CheckCircle2,
  FileText,
  Globe2,
  LayoutDashboard,
  Newspaper,
  Settings,
  ShieldAlert,
  Users,
  XCircle,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin", label: "Jobs", icon: Briefcase },
  { to: "/admin", label: "Applications", icon: FileText },
  { to: "/admin", label: "Candidates", icon: Users },
  { to: "/admin", label: "Employers", icon: Building2 },
  { to: "/admin", label: "Industries", icon: Briefcase },
  { to: "/admin", label: "Countries", icon: Globe2 },
  { to: "/admin", label: "Blog", icon: Newspaper },
  { to: "/admin", label: "Payments", icon: Banknote },
  { to: "/admin", label: "Reports", icon: FileText },
  { to: "/admin", label: "Settings", icon: Settings },
];

function AdminDashboard() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const stats = [
    { l: "Total Jobs", v: "12,548", s: "+148 this week", icon: Briefcase, tint: "from-royal/15 text-royal", ring: "ring-royal/20" },
    { l: "Pending Jobs", v: "84", s: "Needs review", icon: ShieldAlert, tint: "from-amber-400/20 text-amber-700", ring: "ring-amber-400/30", warn: true },
    { l: "Active Employers", v: "1,812", s: "+24 verified", icon: Building2, tint: "from-emerald-400/20 text-emerald-700", ring: "ring-emerald-400/25" },
    { l: "Total Candidates", v: "32,418", s: "+612 today", icon: Users, tint: "from-violet-400/20 text-violet-700", ring: "ring-violet-400/25" },
    { l: "Applications Today", v: "412", s: "Live", icon: Activity, tint: "from-sky-400/20 text-sky-700", ring: "ring-sky-400/25" },
    { l: "Revenue This Month", v: "BDT 18.2L", s: "+12% MoM", icon: Banknote, tint: "from-pink-400/20 text-pink-700", ring: "ring-pink-400/25" },
  ];

  const queue = [
    { j: "Plumber", e: "GulfCare Facility Services", co: "Saudi Arabia", d: "1h ago" },
    { j: "Driver (Light)", e: "Royal Hospitality", co: "UAE", d: "3h ago" },
    { j: "Security Guard", e: "MetroBuild", co: "Qatar", d: "5h ago" },
    { j: "Welder", e: "IndustrialCare", co: "Saudi Arabia", d: "Today" },
  ];

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-xl border border-border bg-card p-3">
          <div className="border-b border-border px-2 pb-3">
            <p className="text-[11px] uppercase tracking-wide text-violet-700">Admin Panel</p>
            <p className="text-sm font-semibold">ProbashiCareer Ops</p>
            <p className="text-[11px] text-muted-foreground">Super-admin · 11 sections</p>
          </div>
          <nav className="mt-3 space-y-0.5">
            {items.map((i, idx) => (
              <Link
                key={idx}
                to={i.to}
                className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm ${
                  idx === 0 && pathname === "/admin"
                    ? "bg-secondary font-semibold text-primary"
                    : "text-foreground/75 hover:bg-secondary/60"
                }`}
              >
                <i.icon className="h-4 w-4" /> {i.label}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="space-y-6">
          {/* Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-violet-500/10 via-royal/5 to-emerald-400/10 p-6 animate-fade-up">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-violet-400/25 blur-3xl animate-float" />
            <div className="absolute -left-10 -bottom-12 h-44 w-44 rounded-full bg-emerald-400/20 blur-3xl animate-float" style={{ animationDelay: "1.1s" }} />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Admin overview</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Platform metrics & <span className="gradient-text">moderation queue</span>
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                84 jobs awaiting approval · 24 new employers verified today.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((s, i) => {
              const Icon = s.icon;
              const tone = s.tint.split(" ").pop();
              return (
                <div
                  key={s.l}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:card-elevated animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100 ${s.tint}`} />
                  <div className="relative flex items-start justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">{s.l}</p>
                      <p className={`mt-1 text-2xl font-bold tracking-tight ${s.warn ? "text-amber-700" : ""}`}>{s.v}</p>
                      <p className="mt-0.5 text-[11px] font-medium text-foreground/60">{s.s}</p>
                    </div>
                    <span className={`flex h-10 w-10 items-center justify-center rounded-lg bg-white ring-1 ring-inset ${s.ring} ${tone}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Moderation queue */}
          <div className="overflow-hidden rounded-xl border border-border bg-card animate-fade-up">
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <div>
                <h2 className="text-sm font-semibold">Pending job approvals</h2>
                <p className="text-xs text-muted-foreground">Review and publish within 24h SLA</p>
              </div>
              <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-inset ring-amber-200">
                84 awaiting
              </span>
            </div>
            <table className="hidden w-full text-sm md:table">
              <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-2.5 font-semibold">Job</th>
                  <th className="px-5 py-2.5 font-semibold">Employer</th>
                  <th className="px-5 py-2.5 font-semibold">Country</th>
                  <th className="px-5 py-2.5 font-semibold">Posted</th>
                  <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {queue.map((r) => (
                  <tr key={r.j} className="transition hover:bg-secondary/30">
                    <td className="px-5 py-3 font-medium">{r.j}</td>
                    <td className="px-5 py-3 text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-foreground/40" /> {r.e}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{r.co}</td>
                    <td className="px-5 py-3 text-muted-foreground">{r.d}</td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex justify-end gap-1.5 text-xs">
                        <button className="inline-flex items-center gap-1 rounded bg-emerald-600 px-2 py-1 font-semibold text-white hover:bg-emerald-700">
                          <CheckCircle2 className="h-3 w-3" /> Approve
                        </button>
                        <button className="rounded border border-border-strong px-2 py-1 hover:bg-secondary">Feature</button>
                        <button className="inline-flex items-center gap-1 rounded border border-rose-300 px-2 py-1 text-rose-700 hover:bg-rose-50">
                          <XCircle className="h-3 w-3" /> Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="divide-y divide-border md:hidden">
              {queue.map((r) => (
                <div key={r.j} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium">{r.j}</p>
                      <p className="text-xs text-muted-foreground">{r.e} · {r.co}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground">{r.d}</p>
                  </div>
                  <div className="mt-2 flex gap-1.5 text-xs">
                    <button className="flex-1 rounded bg-emerald-600 px-2 py-1.5 font-semibold text-white">Approve</button>
                    <button className="flex-1 rounded border border-border-strong px-2 py-1.5">Feature</button>
                    <button className="flex-1 rounded border border-rose-300 px-2 py-1.5 text-rose-700">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
