import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  BellPlus,
  CheckCircle2,
  ChevronRight,
  FileText,
  Globe2,
  HelpCircle,
  LayoutGrid,
  List,
  ShieldCheck,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { FilterSidebar } from "@/components/job/FilterSidebar";
import { JobCard } from "@/components/job/JobCard";
import { Pagination } from "@/components/job/Pagination";
import { COUNTRIES, INDUSTRIES, JOBS } from "@/lib/jobs";

export const Route = createFileRoute("/job-board/industry/$slug")({
  head: ({ params }) => {
    const ind = INDUSTRIES.find((i) => i.slug === params.slug);
    const name = ind?.name ?? "Industry";
    return {
      meta: [
        { title: `${name} Jobs — ProbashiCareer` },
        {
          name: "description",
          content: `Explore verified ${name.toLowerCase()} roles from trusted employers across Saudi Arabia, UAE, Qatar, Kuwait, and Bangladesh.`,
        },
      ],
    };
  },
  component: IndustryBoard,
});

const activeChips = ["Saudi Arabia", "Full Time", "3–5 Years", "Accommodation"];

function IndustryBoard() {
  const { slug } = Route.useParams();
  const industry = INDUSTRIES.find((i) => i.slug === slug) ?? INDUSTRIES[0];
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Page header */}
      <section className="border-b border-border bg-white">
        <div className="container-page py-6">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/jobs" className="hover:text-foreground">Job Board</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Industry</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{industry.name}</span>
          </nav>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight md:text-[34px]">
                {industry.name} Jobs
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Explore verified {industry.name.toLowerCase()} roles from trusted employers across
                Saudi Arabia, UAE, Qatar, Kuwait, and Bangladesh.
              </p>
              <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
                <li className="flex items-center gap-1.5 font-medium text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {industry.jobs} jobs found
                </li>
                <li className="flex items-center gap-1.5 text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" /> Updated today
                </li>
                <li className="flex items-center gap-1.5 text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" /> Verified employers only
                </li>
              </ul>
            </div>
            <button className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-white px-3.5 py-2 text-sm font-medium hover:bg-secondary">
              <BellPlus className="h-4 w-4" /> Create Job Alert
            </button>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-page py-6">
        {/* Active filter chips */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Active filters:</span>
          {activeChips.map((c) => (
            <button
              key={c}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-medium text-foreground hover:bg-secondary"
            >
              {c}
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          ))}
          <button className="text-xs font-medium text-primary hover:underline">Clear all</button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr_280px]">
          {/* Desktop filter sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <FilterSidebar />
            </div>
          </div>

          {/* Main content */}
          <div className="min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">1–{JOBS.length}</span> of{" "}
                <span className="font-semibold text-foreground">{industry.jobs}</span> jobs
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-white px-2.5 py-1.5 text-xs font-medium lg:hidden"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
                </button>
                <select className="rounded-md border border-border-strong bg-white px-2.5 py-1.5 text-xs font-medium focus:border-ring focus:outline-none">
                  <option>Most Relevant</option>
                  <option>Newest First</option>
                  <option>Salary High to Low</option>
                  <option>Deadline Soon</option>
                </select>
                <div className="flex overflow-hidden rounded-md border border-border-strong">
                  <button className="bg-secondary px-2 py-1.5 text-foreground" aria-label="List view">
                    <List className="h-3.5 w-3.5" />
                  </button>
                  <button className="bg-white px-2 py-1.5 text-muted-foreground" aria-label="Compact view">
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Job list */}
            <div className="mt-4 grid gap-3">
              {JOBS.map((j) => (
                <JobCard key={j.id} job={j} />
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <Pagination current={1} total={21} />
            </div>
          </div>

          {/* Right rail */}
          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-3">
              <SidePanel
                icon={BellPlus}
                title="Create Job Alert"
                desc="Get emailed when new Facilities Management jobs are posted."
                cta="Set up alert"
                accent
              />
              <SidePanel
                icon={FileText}
                title="Upload your CV"
                desc="Let verified employers find you. Avg. 3 interview calls per month."
                cta="Upload CV"
              />
              <SidePanel
                icon={HelpCircle}
                title="Need help applying?"
                desc="Talk to a ProbashiCareer advisor about your overseas application."
                cta="Chat now"
              />
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <Globe2 className="h-4 w-4 text-primary" /> Top Hiring Countries
                </div>
                <ul className="space-y-2">
                  {COUNTRIES.slice(0, 5).map((c) => (
                    <li key={c.slug} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span className="text-foreground/80">{c.name}</span>
                      </span>
                      <span className="text-xs text-muted-foreground">{c.jobs.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/countries"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  View all countries <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto bg-background">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 py-3">
              <h3 className="text-sm font-semibold">Filters</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-md p-1.5 hover:bg-secondary"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SidePanel({
  icon: Icon,
  title,
  desc,
  cta,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  cta: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        accent ? "border-primary/20 bg-info-soft/40" : "border-border bg-card"
      }`}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      <button className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
        {cta} <ArrowRight className="h-3 w-3" />
      </button>
    </div>
  );
}

// Suppress unused import lint
void CheckCircle2;
