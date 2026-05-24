import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp } from "lucide-react";
import { COUNTRIES } from "@/lib/jobs";

export const Route = createFileRoute("/countries/")({
  component: Countries,
});

function Countries() {
  return (
    <section className="container-page py-10">
      <div className="animate-fade-up">
        <h1 className="text-3xl font-bold tracking-tight">Hiring countries</h1>
        <p className="text-sm text-muted-foreground">
          Active overseas hiring across the Gulf and South Asia — updated daily.
        </p>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {COUNTRIES.map((c, idx) => (
          <Link
            key={c.slug}
            to="/jobs"
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-royal/30 hover:card-elevated animate-fade-up"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-md bg-secondary ring-1 ring-inset ring-black/10">
                <img
                  src={`https://flagcdn.com/w160/${c.code}.png`}
                  srcSet={`https://flagcdn.com/w320/${c.code}.png 2x`}
                  alt={`${c.name} flag`}
                  width={64}
                  height={48}
                  loading="lazy"
                  className="h-full w-full object-cover transition group-hover:scale-110"
                />
              </span>
              <div>
                <p className="text-base font-semibold">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.jobs.toLocaleString()} jobs</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-3 text-[11px]">
              <span className="inline-flex items-center gap-1 text-success">
                <TrendingUp className="h-3 w-3" /> {c.avgSalary}
              </span>
              <ArrowRight className="h-3.5 w-3.5 text-foreground/30 transition group-hover:translate-x-0.5 group-hover:text-royal" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
