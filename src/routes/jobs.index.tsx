import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { JobCard } from "@/components/job/JobCard";
import { FilterSidebar } from "@/components/job/FilterSidebar";
import { Pagination } from "@/components/job/Pagination";
import { COUNTRIES, INDUSTRIES, JOBS, type Job } from "@/lib/jobs";

type JobsSearch = {
  q?: string;
  country?: string;
  industry?: string;
  type?: string;
};

export const Route = createFileRoute("/jobs/")({
  validateSearch: (search: Record<string, unknown>): JobsSearch => ({
    q: typeof search.q === "string" ? search.q : undefined,
    country: typeof search.country === "string" ? search.country : undefined,
    industry: typeof search.industry === "string" ? search.industry : undefined,
    type: typeof search.type === "string" ? search.type : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All Jobs — ProbashiCareer" },
      { name: "description", content: "Browse all verified overseas and local jobs." },
    ],
  }),
  component: AllJobs,
});

const industryKeywords: Record<string, string[]> = {
  "facilities-management": ["facility", "facilities", "maintenance", "hvac", "cleaning", "housekeeping", "camp", "planner"],
  construction: ["construction", "site", "supervisor", "foreman", "camp"],
  hospitality: ["hospitality", "housekeeping", "hotel", "guest"],
  healthcare: ["healthcare", "medical", "nurse"],
  driving: ["driver", "driving", "truck"],
  engineering: ["engineer", "engineering", "electrical", "technician", "maintenance"],
  "it-software": ["it", "software", "developer", "system"],
  "sales-marketing": ["sales", "marketing"],
  "cleaning-services": ["cleaning", "housekeeping", "cleaner"],
  "security-services": ["security", "guard"],
};

function normalize(value: string) {
  return value.toLowerCase().replace(/[–—]/g, "-");
}

function jobHaystack(job: Job) {
  return normalize(
    [
      job.title,
      job.company,
      job.location,
      job.country,
      job.salary,
      job.experience,
      job.type,
      job.summary,
      ...job.skills,
      ...job.benefits,
    ].join(" "),
  );
}

function filterJobs(search: JobsSearch) {
  const q = normalize(search.q?.trim() ?? "");
  const countryName = search.country
    ? COUNTRIES.find((country) => country.slug === search.country)?.name
    : undefined;
  const industryTerms = search.industry ? industryKeywords[search.industry] ?? [] : [];
  const type = search.type?.trim();

  return JOBS.filter((job) => {
    const haystack = jobHaystack(job);
    const matchesQuery = !q || haystack.includes(q);
    const matchesCountry = !countryName || job.country === countryName;
    const matchesIndustry =
      !search.industry || industryTerms.length === 0 || industryTerms.some((term) => haystack.includes(term));
    const matchesType = !type || job.type === type;

    return matchesQuery && matchesCountry && matchesIndustry && matchesType;
  });
}

function AllJobs() {
  const search = Route.useSearch();
  const navigate = useNavigate();
  const filteredJobs = filterJobs(search);
  const selectedIndustry = search.industry
    ? INDUSTRIES.find((industry) => industry.slug === search.industry)?.name
    : undefined;
  const selectedCountry = search.country
    ? COUNTRIES.find((country) => country.slug === search.country)?.name
    : undefined;

  const updateSearch = (next: JobsSearch) => {
    void navigate({
      to: "/jobs",
      search: {
        ...search,
        ...next,
      },
    });
  };

  const resetFilters = () => {
    void navigate({ to: "/jobs", search: {} });
  };

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
              <FilterSidebar filters={search} onChange={updateSearch} onReset={resetFilters} />
            </div>
          </div>
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredJobs.length}</span> of <span className="font-semibold text-foreground">{JOBS.length}</span> jobs
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
            {(search.q || selectedCountry || selectedIndustry || search.type) && (
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                {search.q && <span className="rounded-full bg-secondary px-3 py-1">Search: {search.q}</span>}
                {selectedCountry && <span className="rounded-full bg-secondary px-3 py-1">Country: {selectedCountry}</span>}
                {selectedIndustry && <span className="rounded-full bg-secondary px-3 py-1">Industry: {selectedIndustry}</span>}
                {search.type && <span className="rounded-full bg-secondary px-3 py-1">Type: {search.type}</span>}
                <button onClick={resetFilters} className="font-medium text-royal hover:underline">
                  Clear all
                </button>
              </div>
            )}
            <div className="grid gap-3">
              {filteredJobs.map((j, i) => (
                <div key={j.id} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                  <JobCard job={j} />
                </div>
              ))}
              {filteredJobs.length === 0 && (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <h2 className="text-lg font-semibold">No jobs found</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Try a different keyword, country, or industry.</p>
                  <button onClick={resetFilters} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                    Reset filters
                  </button>
                </div>
              )}
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
