import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Banknote,
  BookmarkPlus,
  Briefcase,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
  Clock,
  GraduationCap,
  MapPin,
  Share2,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { JobCard } from "@/components/job/JobCard";
import { Badge } from "@/components/job/Badge";
import { CompanyLogo } from "@/components/job/CompanyLogo";
import { JOBS, type Job } from "@/lib/jobs";

export const Route = createFileRoute("/jobs/$slug")({
  head: ({ params }) => {
    const job = JOBS.find((j) => j.slug === params.slug);
    return {
      meta: [
        { title: job ? `${job.title} at ${job.company} — ProbashiCareer` : "Job — ProbashiCareer" },
        { name: "description", content: job?.summary ?? "Verified overseas job listing." },
      ],
    };
  },
  loader: ({ params }) => {
    const job = JOBS.find((j) => j.slug === params.slug);
    if (!job) throw notFound();
    return { job };
  },
  component: JobDetails,
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-2xl font-bold">Job not found</h1>
      <Link to="/jobs" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
        Browse all jobs
      </Link>
    </div>
  ),
});

const overviewRows = (job: Job) => [
  { icon: Users, label: "Vacancies", value: String(job.vacancies ?? 1) },
  { icon: Briefcase, label: "Job Type", value: job.type },
  { icon: Clock, label: "Experience", value: job.experience },
  { icon: UserRound, label: "Gender", value: "Any" },
  { icon: CalendarClock, label: "Age", value: "22 – 45 years" },
  { icon: Building2, label: "Workplace", value: "On-site" },
  { icon: GraduationCap, label: "Education", value: "Diploma / Trade certificate" },
  { icon: Banknote, label: "Salary", value: job.salary },
];

function useJob(): Job {
  return Route.useLoaderData().job;
}

function JobDetails() {
  const job = useJob();
  const similar = JOBS.filter((j) => j.id !== job.id).slice(0, 4);

  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-royal/8 via-primary/4 to-emerald-400/8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-royal/15 blur-3xl animate-float" />
        <div className="absolute -left-16 -bottom-20 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl animate-float" style={{ animationDelay: "1.2s" }} />
        <div className="container-page relative py-6 animate-fade-up">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/jobs" className="hover:text-foreground">Jobs</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{job.title}</span>
          </nav>

          <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
            <div className="flex gap-4">
              <CompanyLogo
                domain={job.domain}
                initials={job.initials}
                fallbackColor={job.logoColor}
                className="h-16 w-16 flex-none rounded-xl text-base"
              />
              <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{job.title}</h1>
                <p className="mt-1 text-sm">
                  <span className="font-semibold text-foreground/90">{job.company}</span>
                  <span className="mx-2 text-muted-foreground">·</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {job.location}
                  </span>
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {job.verified && (
                    <Badge variant="verified">
                      <ShieldCheck className="h-3 w-3" /> Verified employer
                    </Badge>
                  )}
                  {job.featured && (
                    <Badge variant="featured">
                      <Sparkles className="h-3 w-3" /> Featured
                    </Badge>
                  )}
                  {job.directEmployer && <Badge variant="direct">Direct Employer</Badge>}
                  <Badge variant="neutral">
                    <Clock className="h-3 w-3" /> Posted {job.postedDays}d ago
                  </Badge>
                  <Badge variant="neutral">
                    <CalendarClock className="h-3 w-3" /> Deadline {job.deadline}
                  </Badge>
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-success-soft px-2.5 py-1 text-sm font-semibold text-success ring-1 ring-inset ring-success/20">
                  <Banknote className="h-4 w-4" /> {job.salary} <span className="text-[11px] font-medium text-success/80">· monthly</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-white px-3 py-2 text-sm font-medium hover:bg-secondary">
                <BookmarkPlus className="h-4 w-4" /> Save Job
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-white px-3 py-2 text-sm font-medium hover:bg-secondary">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <Link
                to="/jobs/$slug/apply"
                params={{ slug: job.slug }}
                className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover"
              >
                <Sparkles className="h-4 w-4" /> Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main */}
          <div className="space-y-6">
            {/* Overview */}
            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-5 py-3">
                <h2 className="text-sm font-semibold">Job Overview</h2>
              </div>
              <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="grid grid-cols-2 sm:grid-cols-1">
                  {overviewRows(job).slice(0, 4).map((r) => (
                    <Row key={r.label} {...r} />
                  ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-1">
                  {overviewRows(job).slice(4).map((r) => (
                    <Row key={r.label} {...r} />
                  ))}
                </div>
              </dl>
              <div className="border-t border-border px-5 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Benefits
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {job.benefits.map((b) => (
                    <Badge key={b} variant="verified">
                      <CheckCircle2 className="h-3 w-3" /> {b}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-base font-semibold">Job Description</h2>

              <Section title="Responsibilities">
                <ul className="space-y-1.5">
                  {[
                    `Lead day-to-day operations for ${job.title.toLowerCase()} across assigned sites.`,
                    "Coordinate with technical teams, vendors and client representatives.",
                    "Ensure compliance with HSE policies and SLAs at all times.",
                    "Maintain accurate reporting through CMMS and weekly handover notes.",
                  ].map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary/70" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Requirements">
                <ul className="space-y-1.5">
                  {[
                    `${job.experience} of relevant Gulf experience preferred.`,
                    "Diploma in mechanical, electrical or facilities discipline.",
                    "Strong communication in English; Arabic is a plus.",
                    "Valid passport with at least 18 months validity.",
                  ].map((p) => (
                    <li key={p} className="flex gap-2 text-sm text-foreground/80">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-primary/70" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Skills">
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-border bg-secondary/60 px-2 py-1 text-xs font-medium text-foreground/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Section>

              <Section title="Application Process">
                <ol className="space-y-2 text-sm text-foreground/80">
                  <li>1. Submit application with updated CV via ProbashiCareer.</li>
                  <li>2. Initial shortlisting by the employer within 5–7 working days.</li>
                  <li>3. Telephonic or video interview with the hiring manager.</li>
                  <li>4. Medical, embassy attestation and BMET clearance.</li>
                  <li>5. Departure & arrival support handled by ProbashiCareer.</li>
                </ol>
              </Section>
            </div>

            {/* Company */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-base font-semibold">About the company</h2>
              <div className="flex gap-4">
                <CompanyLogo
                  domain={job.domain}
                  initials={job.initials}
                  fallbackColor={job.logoColor}
                  className="h-12 w-12 flex-none rounded-md text-sm"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{job.company}</p>
                    {job.verified && (
                      <Badge variant="verified">
                        <ShieldCheck className="h-3 w-3" /> Verified Employer
                      </Badge>
                    )}
                  </div>
                  <dl className="mt-3 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
                    <div>
                      <dt className="text-xs text-muted-foreground">Industry</dt>
                      <dd className="font-medium">Facilities Management</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Company size</dt>
                      <dd className="font-medium">500–1,000</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Location</dt>
                      <dd className="font-medium">{job.country}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Active jobs</dt>
                      <dd className="font-medium">14 open</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Salary
              </p>
              <p className="mt-1 text-xl font-bold tracking-tight">{job.salary}</p>
              <p className="text-xs text-muted-foreground">Monthly · plus benefits</p>
              <Link
                to="/jobs/$slug/apply"
                params={{ slug: job.slug }}
                className="mt-4 block w-full rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
              >
                Apply Now
              </Link>
              <p className="mt-2 flex items-center justify-center gap-1 text-[11px] text-muted-foreground">
                <MapPin className="h-3 w-3" /> {job.location}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-5 text-sm">
              <h4 className="mb-2 font-semibold">Why this employer is trusted</h4>
              <ul className="space-y-2 text-xs text-foreground/75">
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />
                  Demand letter & contract verified
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />
                  Embassy attested · BMET cleared
                </li>
                <li className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />
                  Transparent processing fees
                </li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Similar */}
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold tracking-tight">Similar jobs</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {similar.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-foreground/70">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 px-5 py-3">
      <Icon className="h-4 w-4 text-foreground/40" />
      <div>
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
