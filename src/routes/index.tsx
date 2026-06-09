import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
import { useLanguage } from "@/lib/language";

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
  { label: "Facilities Management", slug: "facilities-management", icon: Wrench, tone: "text-royal bg-royal-soft" },
  { label: "Cleaner", slug: "cleaning-services", icon: Sparkles, tone: "text-sky bg-sky-soft" },
  { label: "Driver", slug: "driving", icon: Truck, tone: "text-warning-foreground bg-warning-soft" },
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
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void navigate({
      to: "/jobs",
      search: {
        q: query.trim() || undefined,
        country: country || undefined,
        industry: industry || undefined,
      },
    });
  };

  const features = [
    { icon: Globe2, label: "বিশ্বস্ত নিয়োগকর্তা" },
    { icon: FileCheck2, label: "সহজ আবেদন প্রক্রিয়া" },
    { icon: ShieldCheck, label: "নিরাপদ ও স্বচ্ছ সেবা" },
    { icon: Users2, label: "সার্বক্ষণিক সহযোগিতা" },
  ];

  const countries = [
    { name: "সৌদি আরব", code: "sa" },
    { name: "সংযুক্ত আরব আমিরাত", code: "ae" },
    { name: "কাতার", code: "qa" },
    { name: "ওমান", code: "om" },
    { name: "কুয়েত", code: "kw" },
    { name: "মালয়েশিয়া", code: "my" },
    { name: "সিঙ্গাপুর", code: "sg" },
    { name: "ইউরোপ", code: "eu" },
    { name: "জাপান", code: "jp" },
    { name: "দক্ষিণ কোরিয়া", code: "kr" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-50">
        {/* Background Image Container */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=2070&auto=format&fit=crop')"
          }}
        >
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent md:from-white/90" />
        </div>

        <div className="container-page relative py-16 lg:py-20">
          <div className="w-full">
            <h1 className="text-[40px] font-extrabold leading-tight text-[#0a1929] md:text-[56px]">
              আপনার স্বপ্নের<br />
              বিদেশি চাকরি এখন<br />
              <span className="text-[#0b4f9c]">হাতের নাগালে</span>
            </h1>
            <p className="mt-4 text-xl text-[#2d3748]">
              সহজ আবেদন, নিশ্চিত সুযোগ গড়ুন আপনার উজ্জ্বল ভবিষ্যৎ
            </p>

            {/* Feature Icons */}
            <div className="mt-8 flex flex-wrap gap-8 md:gap-12">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex flex-col items-start gap-2">
                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/90 shadow-sm border border-blue-100">
                      <Icon className="h-8 w-8 text-[#0b4f9c]" />
                    </div>
                    <span className="text-sm font-semibold text-[#0a1929] whitespace-nowrap">{feature.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Search Card */}
            <div className="max-w-4xl">
              <form
                onSubmit={submitSearch}
                className="mt-8 rounded-2xl bg-[#0b4f9c] p-5 shadow-xl"
              >
                <h3 className="mb-4 text-lg font-bold text-white">আপনার পছন্দের চাকরি খুঁজুন</h3>
                <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]">
                  <div className="relative flex items-center justify-center bg-white rounded-xl">
                    <Search className="absolute left-4 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="চাকরির কীওয়ার্ড"
                      className="w-full rounded-xl border-0 bg-transparent py-4 pl-10 pr-4 text-sm text-center focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    />
                  </div>
                  <div className="relative flex items-center justify-center bg-white rounded-xl">
                    <MapPin className="absolute left-4 h-4 w-4 text-gray-500" />
                    <select
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      className="w-full appearance-none rounded-xl border-0 bg-transparent py-4 pl-10 pr-10 text-sm text-center focus:ring-2 focus:ring-blue-300 focus:outline-none cursor-pointer"
                    >
                      <option value="">দেশ নির্বাচন করুন</option>
                      {COUNTRIES.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="relative flex items-center justify-center bg-white rounded-xl">
                    <Briefcase className="absolute left-4 h-4 w-4 text-gray-500" />
                    <select
                      value={industry}
                      onChange={(event) => setIndustry(event.target.value)}
                      className="w-full appearance-none rounded-xl border-0 bg-transparent py-4 pl-10 pr-10 text-sm text-center focus:ring-2 focus:ring-blue-300 focus:outline-none cursor-pointer"
                    >
                      <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                      {INDUSTRIES.map((i) => (
                        <option key={i.slug} value={i.slug}>{i.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1e6fff] px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#155bd8] active:scale-[0.98]"
                  >
                    খুঁজুন
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="mt-8 rounded-2xl bg-white/80 backdrop-blur-sm p-6 border border-gray-100 shadow-xl animate-fade-up relative z-10 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <span className="text-sm font-bold text-[#0a1929] whitespace-nowrap lg:border-r lg:border-gray-200 lg:pr-8">
                জনপ্রিয় গন্তব্য
              </span>
              
              <div className="flex flex-wrap justify-between items-center gap-4 md:gap-6 w-full">
                {/* Country Flags */}
                {countries.map((c) => (
                  <div key={c.code} className="flex flex-col items-center gap-2 group cursor-pointer min-w-[70px]">
                    <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-md transition-all duration-300 group-hover:scale-110">
                      <img
                        src={c.code === 'eu' 
                          ? 'https://flagcdn.com/w160/eu.png' 
                          : `https://flagcdn.com/w160/${c.code}.png`}
                        alt={c.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "https://flagcdn.com/w160/un.png";
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-[#2d3748] text-center leading-tight whitespace-nowrap">
                      {c.name}
                    </span>
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
            <div className="marquee-track flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
              {[...TOP_COMPANIES, ...TOP_COMPANIES].map((c, idx) => (
                <div
                  key={`${c.domain}-${idx}`}
                  className="marquee-item flex h-16 w-52 flex-none items-center gap-3 rounded-xl border bg-white px-3 transition hover:-translate-y-0.5 hover:shadow-md"
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
            <h2 className="text-2xl font-bold tracking-tight">{t("Browse by industry")}</h2>
            <p className="text-sm text-muted-foreground">
              {language === "bn"
                ? `বিদেশি ও দেশীয় বাজারে ${INDUSTRIES.length}টি সক্রিয় সেক্টর।`
                : `${INDUSTRIES.length} active sectors across overseas and local markets.`}
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
                    {t(ind.name)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {language === "bn" ? `${ind.jobs}টি খোলা পদ` : `${ind.jobs} open roles`}
                  </p>
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
