import { Link } from "@tanstack/react-router";
import {
  Banknote,
  BookmarkPlus,
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle2,
  Clock,
  Eye,
  Flame,
  MapPin,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import type { Job } from "@/lib/jobs";
import { Badge } from "./Badge";
import { CompanyLogo } from "./CompanyLogo";

function accentClass(job: Job) {
  if (job.urgent) return "stripe-amber";
  if (job.featured) return "stripe-indigo";
  if (job.directEmployer) return "stripe-emerald";
  return "stripe-royal";
}

export function JobCard({ job }: { job: Job }) {
  const applicants = 20 + ((job.id * 17) % 180);
  const views = (0.4 + ((job.id * 13) % 30) / 10).toFixed(1);

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-border-strong hover:card-elevated">
      <div className={`absolute inset-y-0 left-0 w-1 ${accentClass(job)}`} />

      <div className="p-5 pl-6">
        <div className="flex gap-4">
          <CompanyLogo
            domain={job.domain}
            initials={job.initials}
            fallbackColor={job.logoColor}
            className={`h-12 w-12 flex-none rounded-lg text-sm`}
          />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Link
                    to="/jobs/$slug"
                    params={{ slug: job.slug }}
                    className="text-[15px] font-semibold leading-tight text-foreground hover:text-royal"
                  >
                    {job.title}
                  </Link>
                  {job.verified && (
                    <Badge variant="verified">
                      <ShieldCheck className="h-3 w-3" /> Verified
                    </Badge>
                  )}
                  {job.urgent && (
                    <Badge variant="urgent">
                      <Flame className="h-3 w-3" /> Urgent
                    </Badge>
                  )}
                  {job.featured && (
                    <Badge variant="featured">
                      <Sparkles className="h-3 w-3" /> Featured
                    </Badge>
                  )}
                  {job.directEmployer && <Badge variant="direct">Direct Employer</Badge>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/85">{job.company}</span>
                  {job.vacancies ? (
                    <span className="ml-2 text-xs text-muted-foreground">
                      · {job.vacancies} vacancies
                    </span>
                  ) : null}
                </p>
              </div>

              <button
                type="button"
                className="rounded-md border border-border p-1.5 text-foreground/50 hover:bg-secondary hover:text-foreground"
                aria-label="Save job"
              >
                <BookmarkPlus className="h-4 w-4" />
              </button>
            </div>

            {/* Salary pill + meta */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-success-soft px-2 py-1 text-[12px] font-semibold text-success ring-1 ring-inset ring-success/20">
                <Banknote className="h-3.5 w-3.5" /> {job.salary}
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[12px] font-medium text-foreground/75">
                <MapPin className="h-3.5 w-3.5 text-foreground/45" /> {job.location}
              </span>
              <span className="hidden items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[12px] font-medium text-foreground/75 sm:inline-flex">
                <BriefcaseBusiness className="h-3.5 w-3.5 text-foreground/45" /> {job.experience}
              </span>
              <span className="hidden items-center gap-1 rounded-md bg-secondary px-2 py-1 text-[12px] font-medium text-foreground/75 sm:inline-flex">
                <Clock className="h-3.5 w-3.5 text-foreground/45" /> {job.type}
              </span>
            </div>

            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-foreground/75">
              {job.summary}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {job.skills.slice(0, 4).map((s) => (
                <span
                  key={s}
                  className="rounded border border-border bg-white px-2 py-0.5 text-[11px] font-medium text-foreground/75"
                >
                  {s}
                </span>
              ))}
              {job.benefits.slice(0, 2).map((b) => (
                <span
                  key={b}
                  className="flex items-center gap-1 rounded border border-success/20 bg-success-soft px-2 py-0.5 text-[11px] font-medium text-success"
                >
                  <CheckCircle2 className="h-2.5 w-2.5" /> {b}
                </span>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border pt-3 text-xs text-muted-foreground">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {job.postedDays}d ago
                </span>
                <span className="flex items-center gap-1">
                  <CalendarClock className="h-3.5 w-3.5 text-rose" /> Apply by {job.deadline}
                </span>
                <span className="hidden items-center gap-1 sm:inline-flex">
                  <Users className="h-3.5 w-3.5" /> {applicants} applied
                </span>
                <span className="hidden items-center gap-1 md:inline-flex">
                  <Eye className="h-3.5 w-3.5" /> {views}k views
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/jobs/$slug"
                  params={{ slug: job.slug }}
                  className="rounded-md border border-border-strong bg-white px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary"
                >
                  View Details
                </Link>
                <Link
                  to="/jobs/$slug"
                  params={{ slug: job.slug }}
                  className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover"
                >
                  <Zap className="h-3 w-3" /> Quick Apply
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
