import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  HelpCircle,
  LogOut,
  Menu,
  Phone,
  ShieldCheck,
  Upload,
  UserCircle2,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLanguage } from "@/lib/language";
import { COUNTRIES, INDUSTRIES } from "@/lib/jobs";
import logoImg from "@/assets/logo.png";

type MenuItem = { to: string; label: string; sub?: string };
type NavLink =
  | { to: string; label: string; menu?: undefined }
  | { to: string; label: string; menu: { title: string; items: MenuItem[]; viewAll?: { to: string; label: string } } };

const findJobsMenu: MenuItem[] = INDUSTRIES.slice(0, 6).map((i) => ({
  to: `/job-board/industry/${i.slug}`,
  label: i.name,
  sub: `${i.jobs} jobs`,
}));

const industriesMenu: MenuItem[] = INDUSTRIES.map((i) => ({
  to: `/job-board/industry/${i.slug}`,
  label: i.name,
  sub: `${i.jobs} jobs`,
}));

const countriesMenu: MenuItem[] = COUNTRIES.map((c) => ({
  to: `/countries/${c.slug}`,
  label: `${c.flag} ${c.name}`,
  sub: `${c.jobs.toLocaleString()} jobs`,
}));

const navLinks: NavLink[] = [
  { to: "/", label: "Home" },
  {
    to: "/jobs",
    label: "Find Jobs",
    menu: { title: "Browse by industry", items: findJobsMenu, viewAll: { to: "/jobs", label: "View all jobs" } },
  },
  {
    to: "/industries",
    label: "Industries",
    menu: { title: "All industries", items: industriesMenu, viewAll: { to: "/industries", label: "View all industries" } },
  },
  {
    to: "/countries",
    label: "Countries",
    menu: { title: "Hiring countries", items: countriesMenu, viewAll: { to: "/countries", label: "View all countries" } },
  },
  { to: "/companies", label: "Companies" },
  { to: "/training", label: "Training" },
  { to: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const { user, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ||
    user?.email?.split("@")[0] ||
    "";

  return (
    <header className="sticky top-0 z-40 bg-white leading-none">
      {/* Announcement bar */}
      <div className="hidden border-b border-primary/30 bg-primary text-primary-foreground md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1.5 opacity-90">
              <ShieldCheck className="h-3.5 w-3.5 text-success-soft" />
              BMET licensed · Verified overseas employers
            </p>
            <span className="hidden h-3 w-px bg-white/20 lg:block" />
            <p className="hidden items-center gap-1.5 opacity-80 lg:flex">
              <Phone className="h-3.5 w-3.5" /> Hotline: +880 9610-123-456
            </p>
          </div>
          <div className="flex items-center gap-5">
            <div className="inline-flex items-center rounded-md bg-white/10 p-0.5">
              <button
                type="button"
                onClick={() => setLanguage("bn")}
                className={`rounded px-2 py-0.5 text-xs font-semibold transition ${
                  language === "bn" ? "bg-white text-primary" : "text-primary-foreground/80 hover:text-white"
                }`}
              >
                {language === "bn" ? "বাংলা" : "BN"}
              </button>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`rounded px-2 py-0.5 text-xs font-semibold transition ${
                  language === "en" ? "bg-white text-primary" : "text-primary-foreground/80 hover:text-white"
                }`}
              >
                EN
              </button>
            </div>
            <Link to="/" className="flex items-center gap-1.5 opacity-80 hover:opacity-100">
              <HelpCircle className="h-3.5 w-3.5" /> Help Center
            </Link>
            {user ? (
              <button
                onClick={signOut}
                className="rounded-sm bg-white/10 px-2.5 py-1 hover:bg-white/15"
              >
                Sign out
              </button>
            ) : (
              <>
                <Link to="/login" search={{ tab: "signin" }} className="opacity-80 hover:opacity-100">
                  Sign in
                </Link>
                <Link
                  to="/login"
                  search={{ tab: "signup" }}
                  className="rounded-sm bg-white/10 px-2.5 py-1 hover:bg-white/15"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-border bg-white/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Link to="/" className="flex items-center">
            <img
              src={logoImg}
              alt="ProbashiCareer.com"
              className="h-11 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-0 lg:flex">
            {navLinks.map((l) => (
              <div key={l.to} className="group relative">
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-sm font-medium leading-none text-foreground/75 hover:bg-royal-soft hover:text-royal data-[status=active]:bg-royal-soft data-[status=active]:text-royal"
                >
                  {l.label}
                  {l.menu && (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60 transition group-hover:rotate-180 group-hover:opacity-100" />
                  )}
                </Link>
                {l.menu && (
                  <div className="invisible absolute left-0 top-full z-50 w-[460px] -translate-y-1 pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-xl ring-1 ring-black/5">
                      <div className="border-b border-border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {l.menu.title}
                      </div>
                      <div className="grid grid-cols-2 gap-0.5 p-2">
                        {l.menu.items.map((it) => (
                          <Link
                            key={it.to}
                            to={it.to}
                            className="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-royal-soft hover:text-royal"
                          >
                            <span className="truncate font-medium">{it.label}</span>
                            {it.sub && (
                              <span className="shrink-0 text-[11px] text-muted-foreground">{it.sub}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                      {l.menu.viewAll && (
                        <Link
                          to={l.menu.viewAll.to}
                          className="block border-t border-border bg-secondary/40 px-4 py-2.5 text-center text-xs font-semibold text-royal hover:bg-royal-soft"
                        >
                          {l.menu.viewAll.label} →
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>


          <div className="hidden items-center gap-1.5 md:flex">
            <Link
              to="/dashboard"
              className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-md border border-border-strong bg-white px-2.5 text-sm font-medium leading-none text-foreground hover:border-royal/40 hover:bg-royal-soft hover:text-royal"
            >
              <Upload className="h-4 w-4 shrink-0" /> Upload CV
            </Link>
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenu((v) => !v)}
                  className="ml-1 inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2 py-1.5 text-sm text-foreground/80 hover:bg-secondary"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-royal-soft text-xs font-bold text-royal">
                    {displayName.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="hidden max-w-[120px] truncate xl:inline">{displayName}</span>
                  <ChevronDown className="h-3.5 w-3.5" />
                </button>
                {menu && (
                  <div className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-md border border-border bg-white shadow-lg">
                    <div className="border-b border-border px-3 py-2">
                      <p className="text-sm font-semibold">{displayName}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenu(false)}
                      className="block px-3 py-2 text-sm hover:bg-secondary"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMenu(false);
                        signOut();
                      }}
                      className="flex w-full items-center gap-2 border-t border-border px-3 py-2 text-left text-sm text-foreground/80 hover:bg-secondary"
                    >
                      <LogOut className="h-4 w-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                search={{ tab: "signin" }}
                className="ml-1 inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-md border border-border bg-white px-2.5 text-sm font-medium leading-none text-foreground/80 hover:bg-secondary"
              >
                <UserCircle2 className="h-4 w-4 shrink-0" /> Sign in
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong text-foreground/70 lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-white lg:hidden">
            <nav className="container-page flex flex-col gap-0.5 py-3">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-border pt-3">
                <Link to="/dashboard" className="flex-1 rounded-md border border-border-strong px-3 py-2 text-center text-sm font-medium">
                  Upload CV
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
