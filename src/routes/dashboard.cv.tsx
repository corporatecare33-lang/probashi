import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, FileText, Globe2, Languages, UploadCloud } from "lucide-react";

export const Route = createFileRoute("/dashboard/cv")({
  component: DashboardCvPage,
});

function DashboardCvPage() {
  const checklist = [
    { label: "CV uploaded", value: "probashi-cv-2026.pdf", icon: FileText },
    { label: "Primary language", value: "Bangla · English", icon: Languages },
    { label: "Passport status", value: "Valid until 2029", icon: BadgeCheck },
    { label: "Preferred region", value: "Saudi Arabia · UAE", icon: Globe2 },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">CV Manager</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep your resume updated so verified employers can review the latest version.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Current resume</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Uploaded 3 days ago · ATS-friendly format · Shared with employers on each application.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover">
              <UploadCloud className="h-4 w-4" /> Replace CV
            </button>
          </div>

          <div className="mt-5 rounded-lg border border-dashed border-border-strong bg-secondary/30 p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-royal shadow-sm ring-1 ring-border">
                <FileText className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium text-foreground">probashi-cv-2026.pdf</p>
                <p className="text-xs text-muted-foreground">248 KB · Optimized for recruiters</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Profile checklist</h2>
          <div className="mt-4 space-y-3">
            {checklist.map((item) => (
              <div key={item.label} className="flex items-center gap-3 rounded-lg border border-border bg-secondary/20 px-3 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-royal ring-1 ring-border">
                  <item.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}