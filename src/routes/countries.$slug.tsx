import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, TrendingUp, Wallet } from "lucide-react";
import { JobCard } from "@/components/job/JobCard";
import { FilterSidebar } from "@/components/job/FilterSidebar";
import { Pagination } from "@/components/job/Pagination";
import { COUNTRIES, JOBS } from "@/lib/jobs";

export const Route = createFileRoute("/countries/$slug")({
  head: ({ params }) => {
    const c = COUNTRIES.find((x) => x.slug === params.slug);
    const name = c?.name ?? "Country";
    return {
      meta: [
        { title: `Jobs in ${name} — ProbashiCareer` },
        {
          name: "description",
          content: `Verified overseas jobs in ${name}. Updated daily with salary, visa, and accommodation details.`,
        },
      ],
    };
  },
  component: CountryPage,
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-2xl font-bold">Country not found</h1>
      <Link to="/countries" className="mt-4 inline-block text-royal underline">
        Back to countries
      </Link>
    </div>
  ),
});

function CountryPage() {
  const { slug } = Route.useParams();
  const country = COUNTRIES.find((c) => c.slug === slug) ?? COUNTRIES[0];
  const jobs = JOBS.filter((j) => j.country === country.name);

  return (
    <>
      <section className="border-b border-border bg-gradient-to-r from-royal/10 via-primary/5 to-emerald-500/10">
        <div className="container-page py-8">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/countries" className="hover:text-foreground">Countries</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{country.name}</span>
          </nav>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-14 w-20 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-black/10">
              <img
                src={`https://flagcdn.com/w160/${country.code}.png`}
                alt={`${country.name} flag`}
                className="h-full w-full object-cover"
              />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
                Jobs in
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {country.name}
              </h1>
              <p className="mt-1 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {country.jobs.toLocaleString()} active jobs
                </span>
                <span className="inline-flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5" />
                  Avg salary {country.avgSalary}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  Visa supported
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <FilterSidebar />
            </div>
          </div>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{jobs.length}</span> of{" "}
                <span className="font-semibold text-foreground">{country.jobs.toLocaleString()}</span> jobs in {country.name}
              </p>
            </div>
            {jobs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No jobs in our sample dataset for {country.name} yet. Check back soon.
                </p>
                <Link
                  to="/jobs"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Browse all jobs
                </Link>
              </div>
            ) : (
              <div className="grid gap-3">
                {jobs.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
              </div>
            )}
            <div className="mt-6 border-t border-border pt-4">
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
