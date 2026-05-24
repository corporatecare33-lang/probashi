import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  validateSearch: (s) => ({
    tab: (s.tab as "signin" | "signup") ?? "signin",
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  component: Login,
});

function Login() {
  const { tab, redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(tab);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      if (redirect) window.location.replace(redirect);
      else navigate({ to: "/dashboard" });
    }
  }, [user, authLoading, navigate, redirect]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
            data: { full_name: fullName, phone },
          },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to verify, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        if (redirect) window.location.replace(redirect);
        else navigate({ to: "/dashboard" });
      }
    } catch (err) {
      const m = err instanceof Error ? err.message : "Something went wrong";
      toast.error(m);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container-page py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-xl border border-border bg-card shadow-sm md:grid-cols-2">
        <div className="relative hidden flex-col justify-between bg-primary p-8 text-primary-foreground md:flex">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                <span className="font-bold">CB</span>
              </div>
              <p className="font-semibold">ProbashiCareer Jobs</p>
            </div>
            <h2 className="mt-10 text-2xl font-bold leading-tight">
              Verified overseas jobs for skilled Bangladeshi professionals.
            </h2>
            <p className="mt-3 text-sm text-primary-foreground/80">
              Track applications, manage your CV and get matched faster.
            </p>
          </div>
          <ul className="space-y-2 text-sm text-primary-foreground/85">
            {["BMET licensed", "Embassy attested employers", "Transparent contracts"].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" /> {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-8">
          <div className="inline-flex rounded-md border border-border bg-secondary p-0.5 text-sm">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-[6px] px-4 py-1.5 font-medium transition ${
                  mode === m ? "bg-white text-foreground shadow-sm" : "text-muted-foreground"
                }`}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <h1 className="mt-5 text-xl font-bold tracking-tight">
            {mode === "signin" ? "Sign in to your account" : "Create your free account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? "Welcome back." : "Start applying in minutes."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold">Full name</label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm focus:border-ring focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880…"
                    className="w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm focus:border-ring focus:outline-none"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs font-semibold">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm focus:border-ring focus:outline-none"
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-xs font-semibold">Password</label>
                {mode === "signin" && (
                  <a href="#" className="text-xs font-medium text-primary hover:underline">
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-border-strong bg-white px-3 py-2 pr-10 text-sm focus:border-ring focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password"
                >
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover disabled:opacity-60"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {mode === "signin" ? (
              <>
                New here?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="font-semibold text-primary hover:underline"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("signin")}
                  className="font-semibold text-primary hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            By continuing you agree to our <Link to="/" className="underline">Terms</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
