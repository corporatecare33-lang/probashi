import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employer/post")({
  component: EmployerPostPage,
});

function EmployerPostPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">Employer</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Post a Job</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Draft a new overseas role with salary, benefits, hiring timeline and required documents.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["Job title", "Cleaning Operations Manager"],
          ["Country", "Saudi Arabia"],
          ["Salary range", "SAR 5,000 - 7,000"],
          ["Vacancies", "1 position"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}