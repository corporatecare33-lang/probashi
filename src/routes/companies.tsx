import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Search, ShieldCheck, Users } from "lucide-react";
import { TOP_COMPANIES } from "@/lib/jobs";

export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title: "Verified Employers — ProbashiCareer" },
      { name: "description", content: "Browse 1,800+ verified employers hiring overseas." },
    ],
  }),
  component: Companies,
});

const SIZES = ["1,000+ employees", "5,000+ employees", "10,000+ employees", "500+ employees"];

function Companies() {
  return (
    <>
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-br from-emerald-500/10 via-royal/5 to-primary/10">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl animate-float" />
        <div className="container-page relative py-12 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">Employers Directory</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            1,800+ <span className="gradient-text">verified employers</span> hiring now
          </h1>
          <div className="mt-5 flex max-w-xl items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm">
            <Search className="ml-2 h-4 w-4 text-foreground/40" />
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-foreground/40"
              placeholder="Search by company name, industry or country"
            />
            <button className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover">
              Search
            </button>
          </div>
        </div>
      </div>

      <section className="container-page py-10">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Top hiring companies</h2>
          <Link to="/jobs" className="text-xs font-medium text-royal hover:underline">View all jobs →</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOP_COMPANIES.map((c, idx) => {
            const size = SIZES[idx % SIZES.length];
            const openings = 6 + ((idx * 13) % 40);
            return (
              <article
                key={c.name}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-royal/30 hover:card-elevated animate-fade-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-2">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=128`}
                      alt={c.name}
                      className="h-full w-full object-contain transition group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        if (!el.dataset.fallback) {
                          el.dataset.fallback = "1";
                          el.src = `https://icons.duckduckgo.com/ip3/${c.domain}.ico`;
                        }
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate font-semibold leading-tight group-hover:text-royal">{c.name}</p>
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {c.country}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" /> {size}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-dashed border-border pt-3">
                  <span className="rounded-md bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success">
                    {openings} open jobs
                  </span>
                  <Link
                    to="/jobs"
                    className="inline-flex items-center gap-1 text-xs font-medium text-royal hover:underline"
                  >
                    View jobs <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
