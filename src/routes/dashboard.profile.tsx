import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/profile")({
  component: DashboardProfilePage,
});

function DashboardProfilePage() {
  const { user } = useAuth();
  const name = (user?.user_metadata?.full_name as string | undefined) || user?.email?.split("@")[0] || "Probashi member";

  const fields = [
    { label: "Full name", value: name, icon: ShieldCheck },
    { label: "Email", value: user?.email ?? "user@example.com", icon: Mail },
    { label: "Phone", value: "+880 17XX-XXX-XXX", icon: Phone },
    { label: "Preferred destination", value: "Saudi Arabia, UAE", icon: MapPin },
    { label: "Experience", value: "4+ years in facilities & technical services", icon: BriefcaseBusiness },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">Dashboard</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">Profile Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review the contact details and career preferences employers see during screening.
        </p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label} className="rounded-lg border border-border bg-secondary/20 p-4">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-royal ring-1 ring-border">
                  <field.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{field.label}</p>
                  <p className="mt-1 text-sm font-medium text-foreground">{field.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}