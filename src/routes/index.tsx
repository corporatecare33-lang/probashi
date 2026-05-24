import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CheckCircle2,
  FileCheck2,
  Globe2,
  HardHat,
  Hotel,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  Truck,
  Upload,
  Users2,
  Wrench,
  Zap,
} from "lucide-react";
import { JobCard } from "@/components/job/JobCard";
import { COUNTRIES, INDUSTRIES, JOBS, TOP_COMPANIES } from "@/lib/jobs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ProbashiCareer Jobs — Verified Overseas & Local Jobs for Bangladeshi Professionals" },
      {
        name: "description",
        content:
          "Find verified jobs in Saudi Arabia, UAE, Qatar, Kuwait, Oman, Malaysia and Bangladesh. Trusted by 1,800+ employers and recruitment partners.",
      },
    ],
  }),
  component: Home,
});

const popularSearches = [
  { label: "Facilities Management", icon: Wrench, tone: "text-royal bg-royal-soft" },
  { label: "Cleaner", icon: Sparkles, tone: "text-sky bg-sky-soft" },
  { label: "Driver", icon: Truck, tone: "text-warning-foreground bg-warning-soft" },
  { label: "Electrician", icon: Zap, tone: "text-indigo bg-indigo-soft" },
  { label: "Technician", icon: Wrench, tone: "text-success bg-success-soft" },
  { label: "Construction", icon: HardHat, tone: "text-warning-foreground bg-warning-soft" },
  { label: "Hospitality", icon: Hotel, tone: "text-rose bg-rose-soft" },
];

const industryIcons: Record<string, { icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  "facilities-management": { icon: Wrench, tone: "bg-royal-soft text-royal" },
  construction: { icon: HardHat, tone: "bg-warning-soft text-warning-foreground" },
  hospitality: { icon: Hotel, tone: "bg-rose-soft text-rose" },
  healthcare: { icon: Stethoscope, tone: "bg-success-soft text-success" },
  driving: { icon: Truck, tone: "bg-sky-soft text-sky" },
  engineering: { icon: Wrench, tone: "bg-indigo-soft text-indigo" },
  cleaning: { icon: Sparkles, tone: "bg-sky-soft text-sky" },
  security: { icon: ShieldCheck, tone: "bg-primary/10 text-primary" },
  it: { icon: Briefcase, tone: "bg-indigo-soft text-indigo" },
  sales: { icon: TrendingUp, tone: "bg-success-soft text-success" },
};

const topCountries = COUNTRIES.slice(0, 5);

const TYPING_JOBS = [
  "Facilities Manager",
  "Electrician in Dubai",
  "Hotel Receptionist",
  "Heavy Truck Driver",
  "Construction Foreman",
  "AC Technician — Riyadh",
  "Registered Nurse",
  "Welder / Fabricator",
];

function useTypewriter(words: string[], typeMs = 80, holdMs = 1400, eraseMs = 40) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState<"type" | "hold" | "erase">("type");

  useEffect(() => {
    const word = words[i % words.length];
    let t: ReturnType<typeof setTimeout>;
    if (phase === "type") {
      if (text.length < word.length) {
        t = setTimeout(() => setText(word.slice(0, text.length + 1)), typeMs);
      } else {
        t = setTimeout(() => setPhase("erase"), holdMs);
      }
    } else if (phase === "erase") {
      if (text.length > 0) {
        t = setTimeout(() => setText(word.slice(0, text.length - 1)), eraseMs);
      } else {
        setI((v) => v + 1);
        setPhase("type");
        return;
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, i, words, typeMs, holdMs, eraseMs]);

  return text;
}

function Home() {
  const typed = useTypewriter(TYPING_JOBS);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border hero-grid-bg">
        {/* Decorative floating blobs */}
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-royal/15 blur-3xl animate-float" />
        <div className="pointer-events-none absolute right-0 top-32 h-80 w-80 rounded-full bg-indigo/15 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-success/10 blur-3xl animate-float" />

        <div className="container-page relative grid gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:py-16">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-success/25 bg-white px-3 py-1 text-xs font-semibold text-success shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              BMET Licensed
              <span className="mx-1 h-3 w-px bg-success/30" />
              <span className="text-foreground/70">Verified Overseas Jobs</span>
            </div>
            <h1 className="mt-4 text-[34px] font-bold leading-[1.05] tracking-tight text-foreground md:text-[48px]">
              Find verified overseas jobs <br className="hidden sm:block" />
              from <span className="gradient-text">trusted employers</span>.
            </h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Apply to verified jobs in Saudi Arabia, UAE, Qatar, Kuwait, Malaysia and Bangladesh
              with salary, benefits and employer verification details.
            </p>

            {/* Search card */}
            <div className="group relative mt-6 rounded-2xl border border-border bg-white p-2.5 card-elevated transition focus-within:border-royal/40 focus-within:shadow-[0_10px_40px_-12px_oklch(0.52_0.18_258_/_0.35)]">
              <div className="pointer-events-none absolute inset-x-2 -top-px h-px bg-gradient-to-r from-transparent via-royal/40 to-transparent opacity-0 transition group-focus-within:opacity-100" />
              <div className="grid gap-2 md:grid-cols-[1.4fr_1fr_1fr_auto]">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                  <input
                    type="text"
                    placeholder={'Search ' + typed + '\u258F'}
                    className="w-full rounded-lg border border-transparent bg-secondary/70 py-3 pl-9 pr-3 text-sm focus:border-ring focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                  <select className="w-full appearance-none rounded-lg border border-transparent bg-secondary/70 py-3 pl-9 pr-3 text-sm focus:border-ring focus:bg-white focus:outline-none">
                    <option>All Countries</option>
                    {COUNTRIES.map((c) => (
                      <option key={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
                  <select className="w-full appearance-none rounded-lg border border-transparent bg-secondary/70 py-3 pl-9 pr-3 text-sm focus:border-ring focus:bg-white focus:outline-none">
                    <option>All Industries</option>
                    {INDUSTRIES.map((i) => (
                      <option key={i.slug}>{i.name}</option>
                    ))}
                  </select>
                </div>
                <button className="group/btn inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover hover:shadow-[0_8px_24px_-8px_oklch(0.28_0.09_264_/_0.5)] active:scale-[0.98]">
                  <Search className="h-4 w-4 transition group-hover/btn:scale-110" /> Search
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-muted-foreground">Popular:</span>
              {popularSearches.map((p) => (
                <Link
                  key={p.label}
                  to="/job-board/industry/$slug"
                  params={{ slug: "facilities-management" }}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-medium ring-1 ring-inset ring-black/5 hover:ring-black/15 ${p.tone}`}
                >
                  <p.icon className="h-3 w-3" />
                  {p.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Embassy attested</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Salary verified</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-success" /> Contract reviewed</span>
            </div>
          </div>

          {/* Insight card */}
          <div className="relative animate-fade-up delay-200">
            <div className="absolute -left-3 -top-3 hidden h-24 w-24 rounded-full bg-indigo/15 blur-2xl md:block" />
            <div className="absolute -bottom-4 -right-2 hidden h-32 w-32 rounded-full bg-royal/15 blur-3xl md:block" />
            <div className="relative rounded-2xl border border-border bg-white p-5 card-elevated">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-royal-soft text-royal">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <h3 className="text-sm font-semibold">Live Job Market</h3>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-semibold text-success">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" /> Live
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <StatTile color="royal" icon={Briefcase} value="12,500+" label="Active Jobs" />
                <StatTile color="emerald" icon={Building2} value="1,800+" label="Verified Employers" />
                <StatTile color="indigo" icon={FileCheck2} value="4,280+" label="Applications / Week" />
                <StatTile color="amber" icon={Globe2} value="18" label="Countries Covered" />
              </div>

              {/* Success rate */}
              <div className="mt-4 rounded-lg border border-border bg-secondary/40 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">Application success rate</span>
                  <span className="font-bold text-success">86%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-success to-success/70"
                    style={{ width: "86%" }}
                  />
                </div>
                <p className="mt-1.5 text-[11px] text-muted-foreground">
                  Based on last 90 days of verified placements.
                </p>
              </div>

              {/* Top countries */}
              <div className="mt-3 rounded-lg border border-border p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold">Top hiring countries</p>
                  <Link to="/countries" className="text-[11px] font-medium text-royal hover:underline">
                    View all
                  </Link>
                </div>
                <ul className="space-y-1.5">
                  {topCountries.map((c) => (
                    <li key={c.slug} className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-2">
                        <img
                          src={`https://flagcdn.com/w40/${c.code}.png`}
                          srcSet={`https://flagcdn.com/w80/${c.code}.png 2x`}
                          width={20}
                          height={14}
                          alt={c.name}
                          loading="lazy"
                          className="h-3.5 w-5 rounded-sm object-cover ring-1 ring-inset ring-black/10"
                        />
                        <span className="text-foreground/80">{c.name}</span>
                      </span>
                      <span className="font-semibold text-foreground/70">
                        {c.jobs.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified process */}
              <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px]">
                {[
                  { label: "Demand letter", tone: "text-success", bg: "bg-success-soft" },
                  { label: "Embassy attested", tone: "text-royal", bg: "bg-royal-soft" },
                  { label: "Salary verified", tone: "text-indigo", bg: "bg-indigo-soft" },
                  { label: "Contract OK", tone: "text-warning-foreground", bg: "bg-warning-soft" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 font-medium ${s.tone} ${s.bg}`}
                  >
                    <CheckCircle2 className="h-3 w-3" />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by — company logos marquee */}
      <section className="border-b border-border bg-white">
        <div className="container-page py-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-royal">
                <Building2 className="h-3 w-3" /> Trusted Employers
              </div>
              <h2 className="mt-1 text-xl font-bold tracking-tight md:text-2xl">
                Hiring partners across the Gulf
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              1,800+ verified employers · Updated weekly
            </p>
          </div>

          <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
              {[...TOP_COMPANIES, ...TOP_COMPANIES].map((c, idx) => (
                <div
                  key={`${c.domain}-${idx}`}
                  className="flex h-16 w-52 flex-none items-center gap-3 rounded-xl border bg-white px-3 transition hover:-translate-y-0.5 hover:shadow-md"
                  style={{ borderColor: `${c.color}33` }}
                >
                  <span
                    className="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-lg p-1"
                    style={{ backgroundColor: c.bg, boxShadow: `inset 0 0 0 1px ${c.color}22` }}
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${c.domain}&sz=128`}
                      alt={c.name}
                      width={32}
                      height={32}
                      loading="lazy"
                      className="h-8 w-8 object-contain"
                      onError={(e) => {
                        const el = e.currentTarget as HTMLImageElement;
                        if (!el.dataset.fallback) {
                          el.dataset.fallback = "1";
                          el.src = `https://icons.duckduckgo.com/ip3/${c.domain}.ico`;
                        }
                      }}
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold" style={{ color: c.color }}>{c.name}</p>
                    <p className="truncate text-[10px] text-muted-foreground">{c.country}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured jobs */}
      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-indigo">
              <Sparkles className="h-3 w-3" /> Featured
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Hand-picked verified jobs</h2>
            <p className="text-sm text-muted-foreground">
              Curated overseas roles from trusted employers and licensed agencies.
            </p>
          </div>
          <Link
            to="/jobs"
            className="hidden items-center gap-1 text-sm font-medium text-royal hover:underline md:inline-flex"
          >
            View all jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {JOBS.slice(0, 4).map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </div>
      </section>

      {/* Urgent jobs strip */}
      <section className="border-y border-warning/20 bg-warning-soft/40">
        <div className="container-page flex flex-wrap items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-warning text-warning-foreground">
              <Zap className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">Urgent overseas hiring this week</p>
              <p className="text-xs text-muted-foreground">
                Employers actively interviewing in the next 7 days.
              </p>
            </div>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center gap-1.5 rounded-md border border-warning/40 bg-white px-3 py-1.5 text-xs font-semibold text-warning-foreground hover:bg-warning-soft"
          >
            View 142 urgent jobs <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* Industries */}
      <section className="border-b border-border bg-white">
        <div className="container-page py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Browse by industry</h2>
            <p className="text-sm text-muted-foreground">
              {INDUSTRIES.length} active sectors across overseas and local markets.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {INDUSTRIES.map((ind, idx) => {
              const meta = industryIcons[ind.slug] ?? { icon: Briefcase, tone: "bg-secondary text-foreground" };
              const Icon = meta.icon;
              return (
                <Link
                  key={ind.slug}
                  to="/job-board/industry/$slug"
                  params={{ slug: ind.slug }}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-royal/30 hover:card-elevated animate-fade-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg ${meta.tone} transition group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-royal">
                    {ind.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{ind.jobs} open roles</p>
                  <ArrowRight className="absolute right-3 top-3 h-3.5 w-3.5 text-foreground/20 transition group-hover:translate-x-0.5 group-hover:text-royal" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Hiring across the Gulf & beyond</h2>
            <p className="text-sm text-muted-foreground">Active demand from verified employers in 18 countries.</p>
          </div>
          <Link to="/countries" className="hidden items-center gap-1 text-sm font-medium text-royal hover:underline md:inline-flex">
            All countries <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {COUNTRIES.map((c, idx) => (
            <Link
              key={c.slug}
              to="/countries"
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition hover:-translate-y-1 hover:border-royal/30 hover:card-elevated animate-fade-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {/* Flag wash background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
                style={{
                  backgroundImage: `url(https://flagcdn.com/w160/${c.code}.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(28px) saturate(1.4)",
                  transform: "scale(1.4)",
                }}
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-0 bg-white/85 opacity-0 transition group-hover:opacity-100" />

              {idx < 3 && (
                <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-rose-soft px-2 py-0.5 text-[10px] font-semibold text-rose ring-1 ring-inset ring-rose/20">
                  <Zap className="h-2.5 w-2.5" /> Hot
                </span>
              )}
              <div className="relative flex items-center gap-3">
                <span className="flex h-11 w-16 items-center justify-center overflow-hidden rounded-md bg-secondary ring-1 ring-inset ring-black/10">
                  <img
                    src={`https://flagcdn.com/w160/${c.code}.png`}
                    srcSet={`https://flagcdn.com/w320/${c.code}.png 2x`}
                    alt={`${c.name} flag`}
                    width={64}
                    height={44}
                    loading="lazy"
                    className="h-full w-full object-cover transition group-hover:scale-110"
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.jobs.toLocaleString()} active jobs
                  </p>
                </div>
              </div>
              <div className="relative mt-3 border-t border-dashed border-border pt-3 text-[11px] text-muted-foreground">
                <p>Top: Facilities · Construction · Driving</p>
                <p className="mt-0.5 font-medium text-foreground/70">Avg. salary {c.avgSalary}</p>
              </div>
              <ArrowRight className="absolute bottom-3 right-3 h-3.5 w-3.5 -translate-x-1 text-foreground/20 opacity-0 transition group-hover:translate-x-0 group-hover:text-royal group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-white">
        <div className="container-page py-12">
          <h2 className="text-2xl font-bold tracking-tight">How application works</h2>
          <p className="text-sm text-muted-foreground">Built for both job seekers and verified employers.</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "For Job Seekers",
                steps: ["Create profile", "Upload CV", "Apply to verified jobs", "Get contacted by employers"],
                icon: Users2,
                tone: "bg-royal-soft text-royal",
              },
              {
                title: "For Employers",
                steps: ["Create company profile", "Post job", "Review candidates", "Hire faster"],
                icon: Building2,
                tone: "bg-indigo-soft text-indigo",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-card p-6">
                <div className="flex items-center gap-2">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-md ${b.tone}`}>
                    <b.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{b.title}</h3>
                </div>
                <ol className="mt-4 space-y-3">
                  {b.steps.map((s, i) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-md bg-secondary text-xs font-semibold text-foreground">
                        {i + 1}
                      </span>
                      <span className="text-sm text-foreground/80">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-12">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-success">
              <Award className="h-3 w-3" /> Success Stories
            </div>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">What workers & employers say</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Mohammed Rahman", role: "HVAC Technician · Riyadh", quote: "Got a verified job within 6 weeks. The contract matched exactly what was in the demand letter.", tone: "stripe-emerald" },
            { name: "Al Noor Facilities", role: "Recruitment Partner · Jeddah", quote: "We hired 38 candidates in Q2. CV quality is genuinely pre-screened — saves us interview cycles.", tone: "stripe-royal" },
            { name: "Shahidul Islam", role: "Camp Boss · Tabuk", quote: "Transparent process, clear deductions, embassy paperwork tracked end-to-end.", tone: "stripe-indigo" },
          ].map((t) => (
            <div key={t.name} className="relative overflow-hidden rounded-xl border border-border bg-card p-5">
              <div className={`absolute inset-x-0 top-0 h-1 ${t.tone}`} />
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">"{t.quote}"</p>
              <div className="mt-4 border-t border-border pt-3">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-16">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary p-8 text-primary-foreground md:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-royal/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-indigo/20 blur-3xl" />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                Ready to find your next opportunity?
              </h3>
              <p className="mt-2 max-w-lg text-sm text-primary-foreground/80">
                Join 32,000+ Bangladeshi professionals working with verified Gulf employers through
                ProbashiCareer.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-secondary"
              >
                <Search className="h-4 w-4" /> Find Jobs
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
              >
                <Upload className="h-4 w-4" /> Upload CV
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatTile({
  color,
  icon: Icon,
  value,
  label,
}: {
  color: "royal" | "emerald" | "indigo" | "amber";
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  const tones: Record<string, string> = {
    royal: "bg-royal-soft text-royal",
    emerald: "bg-success-soft text-success",
    indigo: "bg-indigo-soft text-indigo",
    amber: "bg-warning-soft text-warning-foreground",
  };
  return (
    <div className="rounded-lg border border-border bg-white p-3">
      <div className={`mb-2 inline-flex h-7 w-7 items-center justify-center rounded-md ${tones[color]}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <p className="text-[18px] font-bold leading-tight tracking-tight">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
