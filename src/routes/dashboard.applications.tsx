import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, CalendarClock, CircleCheckBig, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type ApplicationRow = {
  id: string;
  reference_code: string;
  job_slug: string;
  job_title: string;
  job_company: string;
  status: string;
  created_at: string;
};

const statusTone: Record<string, string> = {
  submitted: "bg-amber-100 text-amber-700 ring-amber-200",
  shortlisted: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  interview: "bg-royal/10 text-royal ring-royal/20",
  hired: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  rejected: "bg-rose-100 text-rose-700 ring-rose-200",
};

export const Route = createFileRoute("/dashboard/applications")({
  component: DashboardApplicationsPage,
});

function DashboardApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationRow[] | null>(null);

  useEffect(() => {
    let active = true;

    supabase
      .from("job_applications")
      .select("id,reference_code,job_slug,job_title,job_company,status,created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (active) setApplications((data as ApplicationRow[]) ?? []);
      });

    return () => {
      active = false;
    };
  }, []);

  const total = applications?.length ?? 0;
  const interviews = applications?.filter((item) => item.status === "interview").length ?? 0;
  const shortlisted = applications?.filter((item) => item.status === "shortlisted").length ?? 0;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">Dashboard</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">My Applications</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              See all submitted jobs, track status changes and continue where needed.
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
          >
            <ExternalLink className="h-4 w-4" /> Browse jobs
          </Link>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {[
          { label: "Total applications", value: total, icon: Briefcase },
          { label: "Shortlisted", value: shortlisted, icon: CircleCheckBig },
          { label: "Interviews", value: interviews, icon: CalendarClock },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{item.value}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-royal">
                <item.icon className="h-4 w-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border px-5 py-3">
          <h2 className="text-sm font-semibold text-foreground">Application history</h2>
          <p className="text-xs text-muted-foreground">Every submitted application appears here.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-secondary/50 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Job</th>
                <th className="px-5 py-3 font-semibold">Company</th>
                <th className="px-5 py-3 font-semibold">Reference</th>
                <th className="px-5 py-3 font-semibold">Applied</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {applications === null ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                    Loading your applications…
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground">
                    No applications yet. <Link to="/jobs" className="font-medium text-royal hover:underline">Apply now</Link>
                  </td>
                </tr>
              ) : (
                applications.map((item) => (
                  <tr key={item.id} className="hover:bg-secondary/30">
                    <td className="px-5 py-3 font-medium text-foreground">
                      <Link to="/jobs/$slug" params={{ slug: item.job_slug }} className="hover:text-royal">
                        {item.job_title}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{item.job_company}</td>
                    <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{item.reference_code}</td>
                    <td className="px-5 py-3 text-muted-foreground">{formatDate(item.created_at)}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold capitalize ring-1 ring-inset ${statusTone[item.status] ?? statusTone.submitted}`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}