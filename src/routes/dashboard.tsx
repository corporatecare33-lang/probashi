import { createFileRoute, Link, Navigate, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileText,
  LayoutDashboard,
  Loader2,
  LogOut,
  
  Settings,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

const items = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/applications", label: "My Applications", icon: FileText },
  { to: "/dashboard/saved", label: "Saved Jobs", icon: Bookmark },
  { to: "/dashboard/cv", label: "CV Manager", icon: Sparkles },
  { to: "/dashboard/profile", label: "Profile Settings", icon: Settings },
];

function DashboardLayout() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const { user, loading, signOut } = useAuth();
  const isOverview = pathname === "/dashboard";

  if (loading) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" search={{ tab: "signin" }} />;

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "Member";

  return (
    <section className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="rounded-lg border border-border bg-card p-3">
          <div className="border-b border-border px-2 pb-3">
            <p className="text-xs text-muted-foreground">Job Seeker</p>
            <p className="text-sm font-semibold">{displayName}</p>
            <p className="truncate text-[11px] text-muted-foreground">{user.email}</p>
          </div>
          <nav className="mt-3 space-y-0.5">
            {items.map((i) => {
              const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
              return (
                <Link
                  key={i.to}
                  to={i.to}
                  className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-sm ${
                    active
                      ? "bg-secondary font-semibold text-primary"
                      : "text-foreground/75 hover:bg-secondary/60"
                  }`}
                >
                  <i.icon className="h-4 w-4" /> {i.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 rounded-md border border-border bg-secondary/40 p-3 text-xs">
            <p className="flex items-center gap-1 font-semibold text-foreground">
              <Bell className="h-3.5 w-3.5" /> Job Alerts: 3
            </p>
            <p className="mt-1 text-muted-foreground">Last sent 2 hours ago.</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="mt-3 flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm text-foreground/75 hover:bg-secondary/60"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </aside>
        <div className="min-w-0">{isOverview ? <Overview displayName={displayName} /> : <Outlet />}</div>
      </div>
    </section>
  );
}

type AppRow = {
  id: string;
  reference_code: string;
  job_slug: string;
  job_title: string;
  job_company: string;
  status: string;
  created_at: string;
};

const STATUS_STYLES: Record<string, string> = {
  submitted: "bg-amber-100 text-amber-700 ring-amber-200",
  shortlisted: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  interview: "bg-royal/10 text-royal ring-royal/20",
  hired: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-100 text-rose-700 ring-rose-200",
};

function Overview({ displayName }: { displayName: string }) {
  const [apps, setApps] = useState<AppRow[] | null>(null);

  useEffect(() => {
    let active = true;
    supabase
      .from("job_applications")
      .select("id,reference_code,job_slug,job_title,job_company,status,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (active) setApps((data as AppRow[]) ?? []);
      });
    return () => {
      active = false;
    };
  }, []);

  const appliedCount = apps?.length ?? 0;
  const interviewCount = apps?.filter((a) => a.status === "interview").length ?? 0;
  const shortlistedCount = apps?.filter((a) => a.status === "shortlisted").length ?? 0;

  const stats = [
    { label: "Applied jobs", value: appliedCount, sub: apps ? "lifetime" : "loading…", icon: Briefcase, tint: "from-royal/15 text-royal", ring: "ring-royal/20" },
    { label: "Saved jobs", value: 8, sub: "2 new matches", icon: Bookmark, tint: "from-amber-400/20 text-amber-700", ring: "ring-amber-400/30" },
    { label: "Interview calls", value: interviewCount, sub: `${shortlistedCount} shortlisted`, icon: Calendar, tint: "from-emerald-400/20 text-emerald-700", ring: "ring-emerald-400/25" },
    { label: "Profile views", value: 47, sub: "by 6 employers", icon: Eye, tint: "from-violet-400/20 text-violet-700", ring: "ring-violet-400/25" },
  ];

  const timeline = (apps ?? []).slice(0, 4).map((a) => ({
    t: timeAgo(a.created_at),
    title: `Application submitted: ${a.job_title}`,
    desc: `${a.job_company} · Ref ${a.reference_code}`,
    color: "bg-royal",
  }));

  return (
    <div className="space-y-6">
      {/* Greeting banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-royal/10 via-primary/5 to-emerald-400/10 p-6 animate-fade-up">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl animate-float" />
        <div className="absolute -left-10 -bottom-12 h-44 w-44 rounded-full bg-royal/20 blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">Welcome back</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Hello, <span className="gradient-text">{displayName}</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              You have <span className="font-semibold text-foreground">3 new matches</span> and{" "}
              <span className="font-semibold text-foreground">1 interview</span> this week.
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover"
          >
            <Sparkles className="h-4 w-4" /> Browse new jobs
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const tone = s.tint.split(" ").pop();
          return (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:card-elevated animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100 ${s.tint}`} />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="mt-1 text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-medium text-success">
                    <TrendingUp className="h-3 w-3" /> {s.sub}
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

      {/* Profile + activity chart strip */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-border bg-card p-5 animate-fade-up">
          <div className="flex items-center justify-between text-sm">
            <p className="font-semibold">Profile completeness</p>
            <p className="font-semibold text-royal">78%</p>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-royal via-primary to-emerald-500 transition-all" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Add your work experience and language skills to reach 100%.
          </p>

          {/* mini bar chart */}
          <div className="mt-5 border-t border-dashed border-border pt-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <p className="font-semibold text-foreground">Applications · last 7 days</p>
              <p className="text-muted-foreground">12 total</p>
            </div>
            <div className="flex h-24 items-end gap-1.5">
              {[2, 1, 3, 0, 2, 1, 3].map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-royal/30 to-royal animate-fade-up"
                    style={{ height: `${Math.max(v * 22, 6)}%`, animationDelay: `${i * 80}ms` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 animate-fade-up" style={{ animationDelay: "80ms" }}>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold">Recent activity</p>
            <Bell className="h-4 w-4 text-foreground/40" />
          </div>
          <ol className="relative space-y-4 border-l border-dashed border-border pl-4">
            {timeline.map((t, i) => (
              <li key={i} className="relative animate-fade-up" style={{ animationDelay: `${i * 70}ms` }}>
                <span className={`absolute -left-[21px] top-1 flex h-3 w-3 items-center justify-center rounded-full ring-4 ring-card ${t.color}`} />
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{t.t} ago</p>
                <p className="text-sm font-medium text-foreground">{t.title}</p>
                <p className="text-xs text-muted-foreground">{t.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Applications table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card animate-fade-up">
        <div className="flex items-center justify-between border-b border-border px-5 py-3">
          <div>
            <h2 className="text-sm font-semibold">Recent applications</h2>
            <p className="text-xs text-muted-foreground">Track every job you've applied to.</p>
          </div>
          <Link to="/dashboard/applications" className="text-xs font-medium text-royal hover:underline">View all →</Link>
        </div>

        {/* Desktop table */}
        <table className="hidden w-full text-sm md:table">
          <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-2.5 font-semibold">Job</th>
              <th className="px-5 py-2.5 font-semibold">Company</th>
              <th className="px-5 py-2.5 font-semibold">Location</th>
              <th className="px-5 py-2.5 font-semibold">Applied</th>
              <th className="px-5 py-2.5 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {apps === null ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-sm text-muted-foreground">Loading…</td></tr>
            ) : apps.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-sm text-muted-foreground">No applications yet. <Link to="/jobs" className="font-medium text-royal hover:underline">Browse jobs</Link></td></tr>
            ) : apps.map((r) => (
              <tr key={r.id} className="transition hover:bg-secondary/30">
                <td className="px-5 py-3 font-medium">
                  <Link to="/jobs/$slug" params={{ slug: r.job_slug }} className="hover:text-royal">{r.job_title}</Link>
                </td>
                <td className="px-5 py-3 text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-foreground/40" /> {r.job_company}
                  </span>
                </td>
                <td className="px-5 py-3 text-muted-foreground font-mono text-xs">{r.reference_code}</td>
                <td className="px-5 py-3 text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-foreground/40" /> {formatDate(r.created_at)}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset capitalize ${STATUS_STYLES[r.status] ?? STATUS_STYLES.submitted}`}>
                    <CheckCircle2 className="h-3 w-3" /> {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile card list */}
        <div className="divide-y divide-border md:hidden">
          {(apps ?? []).map((r) => (
            <div key={r.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">{r.job_title}</p>
                  <p className="text-xs text-muted-foreground">{r.job_company} · Ref {r.reference_code}</p>
                </div>
                <span className={`flex-none rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset capitalize ${STATUS_STYLES[r.status] ?? STATUS_STYLES.submitted}`}>
                  {r.status}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">Applied {formatDate(r.created_at)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return `${Math.max(1, Math.floor(diff / 60_000))}m`;
  if (h < 24) return `${h}h`;
  return `${Math.floor(h / 24)}d`;
}
