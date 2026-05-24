import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  HardHat,
  UtensilsCrossed,
  Stethoscope,
  Car,
  Wrench,
  Code2,
  Megaphone,
  Sparkles,
  Shield,
} from "lucide-react";
import { INDUSTRIES } from "@/lib/jobs";

export const Route = createFileRoute("/industries")({
  component: Industries,
});

const META: Record<string, { icon: typeof Building2; tint: string; ring: string }> = {
  "facilities-management": { icon: Building2, tint: "from-royal/15 to-royal/0 text-royal", ring: "ring-royal/20" },
  construction: { icon: HardHat, tint: "from-amber-400/20 to-amber-400/0 text-amber-700", ring: "ring-amber-400/30" },
  hospitality: { icon: UtensilsCrossed, tint: "from-rose-400/15 to-rose-400/0 text-rose-600", ring: "ring-rose-400/25" },
  healthcare: { icon: Stethoscope, tint: "from-emerald-400/15 to-emerald-400/0 text-emerald-700", ring: "ring-emerald-400/25" },
  driving: { icon: Car, tint: "from-sky-400/15 to-sky-400/0 text-sky-700", ring: "ring-sky-400/25" },
  engineering: { icon: Wrench, tint: "from-indigo-400/15 to-indigo-400/0 text-indigo-700", ring: "ring-indigo-400/25" },
  "it-software": { icon: Code2, tint: "from-violet-400/15 to-violet-400/0 text-violet-700", ring: "ring-violet-400/25" },
  "sales-marketing": { icon: Megaphone, tint: "from-pink-400/15 to-pink-400/0 text-pink-700", ring: "ring-pink-400/25" },
  "cleaning-services": { icon: Sparkles, tint: "from-cyan-400/15 to-cyan-400/0 text-cyan-700", ring: "ring-cyan-400/25" },
  "security-services": { icon: Shield, tint: "from-slate-400/15 to-slate-400/0 text-slate-700", ring: "ring-slate-400/30" },
};

function Industries() {
  return (
    <section className="container-page py-10">
      <div className="animate-fade-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">Browse by sector</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Industries hiring now</h1>
        <p className="text-sm text-muted-foreground">Explore verified jobs across 10 active sectors in the Gulf and South Asia.</p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((i, idx) => {
          const m = META[i.slug] ?? META["facilities-management"];
          const Icon = m.icon;
          return (
            <Link
              key={i.slug}
              to="/job-board/industry/$slug"
              params={{ slug: i.slug }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-royal/30 hover:card-elevated animate-fade-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100 ${m.tint}`} />
              <div className="relative flex items-start gap-4">
                <span className={`flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-white ring-1 ring-inset ${m.ring} ${m.tint.split(" ").pop()}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold leading-tight group-hover:text-royal">{i.name}</p>
                    <ArrowRight className="h-4 w-4 flex-none text-foreground/30 transition group-hover:translate-x-0.5 group-hover:text-royal" />
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{i.jobs} open roles · updated today</p>
                  <div className="mt-3 flex items-center gap-2 text-[11px]">
                    <span className="rounded-md bg-success-soft px-1.5 py-0.5 font-medium text-success">Hiring</span>
                    <span className="text-muted-foreground">Visa support available</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
