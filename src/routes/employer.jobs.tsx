import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/jobs")({
  component: EmployerJobsPage,
});

function EmployerJobsPage() {
  const jobs = [
    { title: "Cleaning Operations Manager", status: "Published", applicants: 64, deadline: "12 Dec 2026" },
    { title: "Facility Supervisor", status: "Published", applicants: 42, deadline: "30 Nov 2026" },
    { title: "Housekeeping Team Leader", status: "Closing", applicants: 28, deadline: "18 Nov 2026" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Employer</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Manage Jobs</h1>
        <p className="mt-1 text-sm text-muted-foreground">Monitor active vacancies and review which openings need attention first.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Job title</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">Applicants</th>
              <th className="px-5 py-3 font-semibold">Deadline</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {jobs.map((job) => (
              <tr key={job.title}>
                <td className="px-5 py-3 font-medium text-foreground">{job.title}</td>
                <td className="px-5 py-3 text-muted-foreground">{job.status}</td>
                <td className="px-5 py-3 text-muted-foreground">{job.applicants}</td>
                <td className="px-5 py-3 text-muted-foreground">{job.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}