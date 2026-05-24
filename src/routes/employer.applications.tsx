import { createFileRoute } from "@tanstack/react-router";
import { CircleCheckBig, Clock3, Users } from "lucide-react";

export const Route = createFileRoute("/employer/applications")({
  component: EmployerApplicationsPage,
});

function EmployerApplicationsPage() {
  const candidates = [
    { name: "Md. Rakib Hasan", role: "Cleaning Operations Manager", stage: "Interview", updated: "Today" },
    { name: "Abu Sayed", role: "Facility Supervisor", stage: "Shortlisted", updated: "Yesterday" },
    { name: "Shamim Reza", role: "Housekeeping Team Leader", stage: "Applied", updated: "2 days ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Employer</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Applications</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review candidate progress, shortlist faster and keep the hiring queue moving.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {[
          { label: "New applicants", value: 42, icon: Users },
          { label: "Shortlisted", value: 18, icon: CircleCheckBig },
          { label: "Awaiting review", value: 9, icon: Clock3 },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">{item.value}</p>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-emerald-700">
                <item.icon className="h-4 w-4" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Candidate</th>
              <th className="px-5 py-3 font-semibold">Role</th>
              <th className="px-5 py-3 font-semibold">Stage</th>
              <th className="px-5 py-3 font-semibold">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {candidates.map((candidate) => (
              <tr key={`${candidate.name}-${candidate.role}`}>
                <td className="px-5 py-3 font-medium text-foreground">{candidate.name}</td>
                <td className="px-5 py-3 text-muted-foreground">{candidate.role}</td>
                <td className="px-5 py-3 text-muted-foreground">{candidate.stage}</td>
                <td className="px-5 py-3 text-muted-foreground">{candidate.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}