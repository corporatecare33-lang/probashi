import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  CheckCircle2,
  Eye,
  FileEdit,
  LayoutDashboard,
  Plus,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/employer")({
  component: EmployerLayout,
});

const items = [
  { to: "/employer", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/employer/post", label: "Post a Job", icon: FileEdit },
  { to: "/employer/jobs", label: "Manage Jobs", icon: Briefcase },
  { to: "/employer/applications", label: "Applications", icon: Users },
];

function EmployerLayout() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isOverview = pathname === "/employer";
  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border border-border bg-card p-3">
          <div className="border-b border-border px-2 pb-3">
            <p className="text-[11px] uppercase tracking-wide text-emerald-700">Employer</p>
            <p className="text-sm font-semibold">Al Noor Facilities</p>
            <p className="text-[11px] text-muted-foreground">Verified · Jeddah, KSA</p>
          </div>
          <nav className="mt-3 space-y-0.5">
            {items.map((i) => {
              const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
              return (
                <Link
                  key={i.to}
                  to={i.to}
                  className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-sm ${
                    active ? "bg-secondary font-semibold text-primary" : "text-foreground/75 hover:bg-secondary/60"
                  }`}
                >
                  <i.icon className="h-4 w-4" /> {i.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3 text-xs">
            <p className="flex items-center gap-1 font-semibold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5" /> Plan: Pro
            </p>
            <p className="mt-1 text-emerald-700/80">14 / 25 active jobs used.</p>
          </div>
        </aside>
        <div className="min-w-0">{isOverview ? <Overview /> : <Outlet />}</div>
      </div>
    </section>
  );
}

function Overview() {
  const stats = [
    { l: "Active jobs", v: 14, s: "3 expiring soon", icon: Briefcase, tint: "from-royal/15 text-royal", ring: "ring-royal/20" },
    { l: "Applications", v: 286, s: "+42 this week", icon: Users, tint: "from-emerald-400/20 text-emerald-700", ring: "ring-emerald-400/25" },
    { l: "Shortlisted", v: 38, s: "12 awaiting interview", icon: CheckCircle2, tint: "from-amber-400/20 text-amber-700", ring: "ring-amber-400/30" },
    { l: "Profile views", v: "1.2k", s: "by 318 candidates", icon: Eye, tint: "from-violet-400/20 text-violet-700", ring: "ring-violet-400/25" },
  ];
  const pipeline = [
    { k: "Applied", v: 286, color: "bg-royal" },
    { k: "Screened", v: 142, color: "bg-sky-500" },
    { k: "Shortlisted", v: 38, color: "bg-amber-500" },
    { k: "Interview", v: 21, color: "bg-violet-500" },
    { k: "Hired", v: 8, color: "bg-emerald-500" },
  ];
  const max = Math.max(...pipeline.map((p) => p.v));
  const jobs = [
    { t: "Cleaning Operations Manager", c: "Saudi Arabia", a: 64, d: "12 Dec", s: "Published", color: "bg-emerald-100 text-emerald-700 ring-emerald-200" },
    { t: "Facility Supervisor", c: "Saudi Arabia", a: 42, d: "30 Nov", s: "Published", color: "bg-emerald-100 text-emerald-700 ring-emerald-200" },
    { t: "Housekeeping Team Leader", c: "Saudi Arabia", a: 28, d: "18 Nov", s: "Closing", color: "bg-amber-100 text-amber-700 ring-amber-200" },
    { t: "HR Assistant", c: "UAE", a: 0, d: "—", s: "Draft", color: "bg-slate-100 text-slate-700 ring-slate-200" },
  ];

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-emerald-500/10 via-royal/5 to-primary/10 p-6 animate-fade-up">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-emerald-400/25 blur-3xl animate-float" />
        <div className="absolute -left-10 -bottom-12 h-44 w-44 rounded-full bg-royal/25 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Employer dashboard</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Manage jobs, candidates & <span className="gradient-text">hiring pipeline</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              42 new applications in the last 7 days · 21 interviews scheduled.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover">
            <Plus className="h-4 w-4" /> Post a Job
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const tone = s.tint.split(" ").pop();
          return (
            <div
              key={s.l}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:card-elevated animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100 ${s.tint}`} />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.l}</p>
                  <p className="mt-1 text-2xl font-bold tracking-tight">{s.v}</p>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-success">
                    <TrendingUp className="h-3 w-3" /> {s.s}
                  </p>
                </div>
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg bg-white ring-1 ring-inset ${s.ring} ${tone}`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hiring pipeline */}
      <div className="rounded-xl border border-border bg-card p-5 animate-fade-up">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Hiring pipeline</h2>
            <p className="text-xs text-muted-foreground">Conversion across all active jobs</p>
          </div>
          <Link to="/employer" className="text-xs font-medium text-royal hover:underline">View funnel →</Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-5">
          {pipeline.map((p, i) => (
            <div key={p.k} className="animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-medium text-foreground/80">{p.k}</span>
                <span className="font-semibold text-foreground">{p.v}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                <div className={`h-full rounded-full ${p.color}`} style={{ width: `${(p.v / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card animate-fade-up">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold">Manage jobs</h2>
            <p className="text-xs text-muted-foreground">14 active · 2 draft · 3 closing this week</p>
          </div>
          <button className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover">
            <Plus className="h-3 w-3" /> Post a Job
          </button>
        </div>

        <table className="hidden w-full text-sm md:table">
          <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-2.5 font-semibold">Title</th>
              <th className="px-5 py-2.5 font-semibold">Country</th>
              <th className="px-5 py-2.5 font-semibold">Applicants</th>
              <th className="px-5 py-2.5 font-semibold">Deadline</th>
              <th className="px-5 py-2.5 font-semibold">Status</th>
              <th className="px-5 py-2.5 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {jobs.map((r) => (
              <tr key={r.t} className="transition hover:bg-secondary/30">
                <td className="px-5 py-3 font-medium">{r.t}</td>
                <td className="px-5 py-3 text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-foreground/40" />
                    {r.c}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="inline-flex items-center gap-1 rounded-md bg-royal/10 px-2 py-0.5 text-[11px] font-semibold text-royal">
                    {r.a} <ArrowUpRight className="h-3 w-3" />
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground">{r.d}</td>
                <td className="px-5 py-3">
                  <span className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${r.color}`}>{r.s}</span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-1.5 text-xs">
                    <button className="rounded border border-border-strong px-2 py-1 hover:bg-secondary">Edit</button>
                    <button className="rounded border border-border-strong px-2 py-1 hover:bg-secondary">View</button>
                    <button className="rounded border border-border-strong px-2 py-1 text-destructive hover:bg-secondary">Close</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="divide-y divide-border md:hidden">
          {jobs.map((r) => (
            <div key={r.t} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">{r.t}</p>
                  <p className="text-xs text-muted-foreground">{r.c} · Deadline {r.d}</p>
                </div>
                <span className={`flex-none rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${r.color}`}>{r.s}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">{r.a} applicants</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
