import { createFileRoute, Link } from "@tanstack/react-router";
import { BookmarkCheck, Building2, MapPin, Wallet } from "lucide-react";
import { JOBS } from "@/lib/jobs";

export const Route = createFileRoute("/dashboard/saved")({
  component: DashboardSavedJobsPage,
});

function DashboardSavedJobsPage() {
  const savedJobs = JOBS.slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Saved Jobs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep shortlisted roles in one place and come back when you are ready to apply.
        </p>
      </div>

      <div className="grid gap-4">
        {savedJobs.map((job) => (
          <article key={job.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-royal">
                  <BookmarkCheck className="h-4 w-4" /> Saved for later
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">{job.title}</h2>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" /> {job.company}</span>
                    <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                    <span className="inline-flex items-center gap-1.5"><Wallet className="h-4 w-4" /> {job.salary}</span>
                  </div>
                </div>
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{job.summary}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link
                  to="/jobs/$slug"
                  params={{ slug: job.slug }}
                  className="inline-flex items-center rounded-md border border-border-strong px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  View details
                </Link>
                <Link
                  to="/jobs/$slug/apply"
                  params={{ slug: job.slug }}
                  className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
                >
                  Apply now
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}