import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  FileText,
  Loader2,
  Lock,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { JOBS, type Job } from "@/lib/jobs";
import { CompanyLogo } from "@/components/job/CompanyLogo";
import { Badge } from "@/components/job/Badge";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/jobs/$slug_/apply")({
  head: ({ params }) => {
    const job = JOBS.find((j) => j.slug === params.slug);
    return {
      meta: [
        { title: job ? `Apply for ${job.title} — ProbashiCareer` : "Apply — ProbashiCareer" },
        { name: "description", content: `Apply for ${job?.title ?? "this role"} in 4 simple steps.` },
      ],
    };
  },
  loader: ({ params }) => {
    const job = JOBS.find((j) => j.slug === params.slug);
    if (!job) throw notFound();
    return { job };
  },
  component: ApplyPage,
  notFoundComponent: () => (
    <div className="container-page py-20 text-center">
      <h1 className="text-2xl font-bold">Job not found</h1>
      <Link to="/jobs" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
        Browse all jobs
      </Link>
    </div>
  ),
});

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  passport: string;
  nationality: string;
  city: string;
  experience: string;
  currentPosition: string;
  skills: string;
  cv: File | null;
  photo: File | null;
  coverNote: string;
  agreed: boolean;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  passport: "",
  nationality: "Bangladesh",
  city: "",
  experience: "",
  currentPosition: "",
  skills: "",
  cv: null,
  photo: null,
  coverNote: "",
  agreed: false,
};

const STEPS = [
  { id: 1, title: "Personal", icon: UserRound },
  { id: 2, title: "Experience", icon: Building2 },
  { id: 3, title: "Documents", icon: FileText },
  { id: 4, title: "Review", icon: Check },
];

const MAX_FILE = 5 * 1024 * 1024; // 5 MB

function ApplyPage() {
  const { job } = Route.useLoaderData() as { job: Job };
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  // Auth gate
  if (authLoading) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <section className="container-page py-12">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-xl font-bold">Sign in to apply</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Create a free ProbashiCareer account or sign in to apply for <span className="font-semibold text-foreground">{job.title}</span>.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <Link
              to="/login"
              search={{ tab: "signin", redirect: `/jobs/${job.slug}/apply` }}
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              Sign in
            </Link>
            <Link
              to="/login"
              search={{ tab: "signup", redirect: `/jobs/${job.slug}/apply` }}
              className="rounded-md border border-border-strong bg-white px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const canNext = () => {
    if (step === 1) return form.fullName && form.email && form.phone && form.passport;
    if (step === 2) return form.experience && form.currentPosition;
    if (step === 3) return !!form.cv;
    if (step === 4) return form.agreed;
    return false;
  };

  const submit = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      const ref = `CB-${Date.now().toString(36).toUpperCase().slice(-6)}`;
      const folder = `${user.id}/${ref}`;

      let cvPath: string | null = null;
      let photoPath: string | null = null;

      if (form.cv) {
        if (form.cv.size > MAX_FILE) throw new Error("CV file is larger than 5 MB");
        const safe = form.cv.name.replace(/[^\w.\-]+/g, "_");
        const p = `${folder}/cv-${safe}`;
        const { error } = await supabase.storage
          .from("application-documents")
          .upload(p, form.cv, { upsert: false, contentType: form.cv.type });
        if (error) throw error;
        cvPath = p;
      }

      if (form.photo) {
        if (form.photo.size > MAX_FILE) throw new Error("Photo file is larger than 5 MB");
        const safe = form.photo.name.replace(/[^\w.\-]+/g, "_");
        const p = `${folder}/photo-${safe}`;
        const { error } = await supabase.storage
          .from("application-documents")
          .upload(p, form.photo, { upsert: false, contentType: form.photo.type });
        if (error) throw error;
        photoPath = p;
      }

      const { error: insertErr } = await supabase.from("job_applications").insert({
        user_id: user.id,
        reference_code: ref,
        job_slug: job.slug,
        job_title: job.title,
        job_company: job.company,
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        passport: form.passport,
        nationality: form.nationality || null,
        city: form.city || null,
        experience: form.experience,
        current_position: form.currentPosition,
        skills: form.skills || null,
        cover_note: form.coverNote || null,
        cv_path: cvPath,
        photo_path: photoPath,
      });

      if (insertErr) throw insertErr;

      setSubmittedRef(ref);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to submit application";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (step < 4) setStep(step + 1);
    else submit();
  };

  if (submittedRef) {
    return (
      <section className="container-page py-12">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-10 text-center shadow-sm animate-fade-up">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success ring-4 ring-success/15">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight">Application submitted!</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We've forwarded your profile to <span className="font-semibold text-foreground">{job.company}</span>.
            You'll receive an SMS & email update within <span className="font-semibold text-foreground">5–7 working days</span>.
          </p>

          <div className="mt-6 rounded-xl border border-border bg-secondary/40 p-4 text-left">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Reference ID</p>
            <p className="mt-1 font-mono text-lg font-semibold">{submittedRef}</p>
            <p className="mt-2 text-xs text-muted-foreground">Track this application from your dashboard.</p>
          </div>

          <ol className="mt-6 space-y-3 text-left text-sm">
            {[
              "Employer shortlisting (5–7 days)",
              "Interview call from ProbashiCareer counselor",
              "Medical, embassy attestation & BMET clearance",
              "Visa stamping and departure arrangements",
            ].map((s, i) => (
              <li key={s} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-foreground/80">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <Link
              to="/dashboard"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              Go to dashboard
            </Link>
            <Link
              to="/jobs"
              className="rounded-md border border-border-strong bg-white px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              Browse more jobs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-gradient-to-br from-royal/5 via-primary/5 to-emerald-400/5">
        <div className="container-page py-6">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link to="/jobs" className="hover:text-foreground">Jobs</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/jobs/$slug" params={{ slug: job.slug }} className="hover:text-foreground">
              {job.title}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">Apply</span>
          </nav>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div className="flex gap-3">
              <CompanyLogo
                domain={job.domain}
                initials={job.initials}
                fallbackColor={job.logoColor}
                className="h-12 w-12 flex-none rounded-lg text-sm"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Apply for</p>
                <h1 className="text-xl font-bold tracking-tight md:text-2xl">{job.title}</h1>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {job.company} · <MapPin className="inline h-3 w-3" /> {job.location}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {job.verified && (
                <Badge variant="verified">
                  <ShieldCheck className="h-3 w-3" /> Verified employer
                </Badge>
              )}
              <Badge variant="neutral">{job.salary}</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <ol className="grid grid-cols-4 gap-2 rounded-xl border border-border bg-card p-3">
              {STEPS.map((s) => {
                const Icon = s.icon;
                const active = step === s.id;
                const done = step > s.id;
                return (
                  <li key={s.id} className="flex flex-col items-center gap-1.5 text-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold transition ${
                        done
                          ? "bg-success text-white"
                          : active
                            ? "bg-primary text-primary-foreground ring-4 ring-primary/15"
                            : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {done ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                    </div>
                    <div className="hidden sm:block">
                      <p className={`text-[11px] font-semibold ${active ? "text-foreground" : "text-muted-foreground"}`}>
                        Step {s.id}
                      </p>
                      <p className={`text-[11px] ${active ? "text-foreground" : "text-muted-foreground"}`}>{s.title}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="rounded-xl border border-border bg-card p-6 animate-fade-up">
              {step === 1 && <StepPersonal form={form} update={update} />}
              {step === 2 && <StepExperience form={form} update={update} job={job} />}
              {step === 3 && <StepDocuments form={form} update={update} />}
              {step === 4 && <StepReview form={form} update={update} job={job} />}

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => (step === 1 ? navigate({ to: "/jobs/$slug", params: { slug: job.slug } }) : setStep(step - 1))}
                  className="inline-flex items-center gap-1 rounded-md border border-border-strong bg-white px-4 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" /> {step === 1 ? "Back to job" : "Previous"}
                </button>
                <button
                  type="button"
                  disabled={!canNext() || submitting}
                  onClick={next}
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                    </>
                  ) : step === 4 ? (
                    <>
                      <Send className="h-4 w-4" /> Submit application
                    </>
                  ) : (
                    <>
                      Continue <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-primary" /> Quick tips
              </h3>
              <ul className="mt-3 space-y-2 text-xs text-foreground/75">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />Use the same name as your passport</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />Passport must have 18+ months validity</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />PDF / JPG up to 5 MB per file</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-none text-success" />Your data is encrypted end-to-end</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-success-soft/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-success">No upfront fees</p>
              <p className="mt-1 text-sm text-foreground/80">
                ProbashiCareer never charges candidates to apply. Government processing fees are disclosed transparently before signing.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ---------- Steps ---------- */

type StepProps = {
  form: FormState;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
};

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-foreground/80">
        {label} {required && <span className="text-rose-600">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15";

function StepPersonal({ form, update }: StepProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Personal information</h2>
      <p className="mt-1 text-sm text-muted-foreground">Use details exactly as written on your passport.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Full name" required><input className={inputCls} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Md. Rakibul Islam" maxLength={120} /></Field>
        <Field label="Passport number" required><input className={inputCls} value={form.passport} onChange={(e) => update("passport", e.target.value.toUpperCase())} placeholder="A01234567" maxLength={20} /></Field>
        <Field label="Email address" required><input type="email" className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" maxLength={150} /></Field>
        <Field label="Mobile (with country code)" required><input className={inputCls} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+8801XXXXXXXXX" maxLength={20} /></Field>
        <Field label="Nationality"><input className={inputCls} value={form.nationality} onChange={(e) => update("nationality", e.target.value)} maxLength={80} /></Field>
        <Field label="Current city"><input className={inputCls} value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Dhaka" maxLength={80} /></Field>
      </div>
    </div>
  );
}

function StepExperience({ form, update, job }: StepProps & { job: Job }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Experience & skills</h2>
      <p className="mt-1 text-sm text-muted-foreground">Tell us about your background relevant to <span className="font-medium text-foreground">{job.title}</span>.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Total experience (years)" required>
          <select className={inputCls} value={form.experience} onChange={(e) => update("experience", e.target.value)}>
            <option value="">Select…</option>
            <option>0–1 year</option>
            <option>1–3 years</option>
            <option>3–5 years</option>
            <option>5–8 years</option>
            <option>8+ years</option>
          </select>
        </Field>
        <Field label="Current / last role" required>
          <input className={inputCls} value={form.currentPosition} onChange={(e) => update("currentPosition", e.target.value)} placeholder="Maintenance Supervisor" maxLength={120} />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Key skills (comma separated)">
            <input className={inputCls} value={form.skills} onChange={(e) => update("skills", e.target.value)} placeholder={job.skills.join(", ")} maxLength={300} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Why are you a good fit? (optional)">
            <textarea rows={4} maxLength={1000} className={inputCls} value={form.coverNote} onChange={(e) => update("coverNote", e.target.value)} placeholder="Share a short pitch — your strongest experience, languages, and availability." />
          </Field>
        </div>
      </div>
    </div>
  );
}

function FileDrop({
  label,
  required,
  value,
  onChange,
  hint,
  accept,
}: {
  label: string;
  required?: boolean;
  value: File | null;
  onChange: (f: File | null) => void;
  hint: string;
  accept: string;
}) {
  return (
    <Field label={label} required={required}>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-secondary/30 px-4 py-6 text-center transition hover:border-primary/40 hover:bg-primary/5">
        <Upload className="h-5 w-5 text-foreground/50" />
        <p className="text-sm font-medium">{value ? value.name : "Click to upload"}</p>
        <p className="text-[11px] text-muted-foreground">
          {value ? `${(value.size / 1024).toFixed(0)} KB` : hint}
        </p>
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0] ?? null;
            if (f && f.size > MAX_FILE) {
              toast.error(`${f.name} is larger than 5 MB`);
              return;
            }
            onChange(f);
          }}
        />
      </label>
    </Field>
  );
}

function StepDocuments({ form, update }: StepProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold">Documents</h2>
      <p className="mt-1 text-sm text-muted-foreground">Upload your CV and a passport-style photo.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <FileDrop label="CV / Resume" required value={form.cv} onChange={(f) => update("cv", f)} hint="PDF or DOC, up to 5 MB" accept=".pdf,.doc,.docx" />
        <FileDrop label="Passport-size photo" value={form.photo} onChange={(f) => update("photo", f)} hint="JPG or PNG, up to 5 MB" accept="image/*" />
      </div>
      <div className="mt-4 rounded-md border border-border bg-secondary/40 p-3 text-xs text-foreground/70">
        Don't have a CV ready? You can still submit now — our counselor will help you build one before the interview.
      </div>
    </div>
  );
}

function StepReview({ form, update, job }: StepProps & { job: Job }) {
  const rows: [string, string][] = [
    ["Position", `${job.title} at ${job.company}`],
    ["Location", job.location],
    ["Name", form.fullName || "—"],
    ["Passport", form.passport || "—"],
    ["Email", form.email || "—"],
    ["Phone", form.phone || "—"],
    ["Experience", form.experience || "—"],
    ["Current role", form.currentPosition || "—"],
    ["CV", form.cv?.name || "Not uploaded"],
    ["Photo", form.photo?.name || "Not uploaded"],
  ];
  return (
    <div>
      <h2 className="text-lg font-semibold">Review your application</h2>
      <p className="mt-1 text-sm text-muted-foreground">Please confirm the details below before submitting.</p>
      <dl className="mt-5 divide-y divide-border rounded-lg border border-border">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-3 gap-3 px-4 py-2.5 text-sm">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="col-span-2 font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-md border border-border bg-secondary/30 p-3">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 accent-primary"
          checked={form.agreed}
          onChange={(e) => update("agreed", e.target.checked)}
        />
        <span className="text-xs text-foreground/80">
          I confirm the information is accurate and agree to ProbashiCareer's <span className="font-semibold text-foreground">Terms</span> and <span className="font-semibold text-foreground">Privacy Policy</span>. I understand my application will be shared with the employer.
        </span>
      </label>
    </div>
  );
}
