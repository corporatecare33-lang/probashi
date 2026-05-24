import { createFileRoute, Link } from "@tanstack/react-router";
import { JobCard } from "@/components/job/JobCard";
import { FilterSidebar } from "@/components/job/FilterSidebar";
import { Pagination } from "@/components/job/Pagination";
import { JOBS } from "@/lib/jobs";

export const Route = createFileRoute("/jobs/")({
  head: () => ({
    meta: [
      { title: "All Jobs — ProbashiCareer" },
      { name: "description", content: "Browse all verified overseas and local jobs." },
    ],
  }),
  component: AllJobs,
});

function AllJobs() {
  return (
    <>
      {/* Colorful banner */}
      <div className="relative overflow-hidden border-b border-border bg-gradient-to-r from-royal/10 via-primary/5 to-emerald-500/10">
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-royal/20 blur-3xl animate-float" />
        <div className="absolute -right-10 -bottom-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl animate-float" style={{ animationDelay: "1.2s" }} />
        <div className="container-page relative py-10 animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">Job Board</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            Find your next <span className="gradient-text">overseas opportunity</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            12,500+ verified vacancies across the Gulf and Bangladesh — updated every hour.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            {["Saudi Arabia · 1,248", "UAE · 962", "Qatar · 431", "Kuwait · 287", "Bahrain · 142"].map((c) => (
              <Link key={c} to="/jobs" className="rounded-full border border-border bg-white/70 px-3 py-1 font-medium text-foreground/75 backdrop-blur hover:border-royal/40 hover:text-royal">
                {c}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <section className="container-page py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="hidden lg:block">
            <div className="sticky top-20 animate-fade-up">
              <FilterSidebar />
            </div>
          </div>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{JOBS.length}</span> of <span className="font-semibold text-foreground">12,500+</span> jobs
              </p>
              <div className="flex items-center gap-2">
                <label className="text-xs text-muted-foreground">Sort by</label>
                <select className="rounded-md border border-border-strong bg-white px-2 py-1 text-xs font-medium focus:border-ring focus:outline-none">
                  <option>Most recent</option>
                  <option>Highest salary</option>
                  <option>Most relevant</option>
                  <option>Closing soon</option>
                </select>
              </div>
            </div>
            <div className="grid gap-3">
              {JOBS.map((j, i) => (
                <div key={j.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <JobCard job={j} />
                </div>
              ))}
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
