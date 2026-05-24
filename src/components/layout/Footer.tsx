import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import logoImg from "@/assets/logo.png";

const cols: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: "Job Seekers",
    links: [
      { label: "Browse Jobs", to: "/jobs" },
      { label: "Job Alerts", to: "/dashboard" },
      { label: "Upload CV", to: "/dashboard" },
      { label: "Career Advice", to: "/blog" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Post a Job", to: "/employer" },
      { label: "Pricing", to: "/employer" },
      { label: "Browse CVs", to: "/employer" },
      { label: "Recruitment Solutions", to: "/employer" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Facilities Management", to: "/job-board/industry/facilities-management" },
      { label: "Construction", to: "/jobs" },
      { label: "Hospitality", to: "/jobs" },
      { label: "Healthcare", to: "/jobs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", to: "/contact" },
      { label: "Contact Us", to: "/contact" },
      { label: "Terms of Service", to: "/contact" },
      { label: "Privacy Policy", to: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-white">
      <div className="container-page py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2">
            <div className="flex items-center">
              <img
                src={logoImg}
                alt="ProbashiCareer.com"
                className="h-11 w-auto object-contain"
              />
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Verified overseas and local jobs for skilled Bangladeshi professionals. Trusted by
              1,800+ employers across the Gulf and South Asia.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[Facebook, Twitter, Linkedin, Youtube, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-foreground/60 hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="mb-3 text-sm font-semibold text-foreground">{c.title}</h4>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-secondary/50 p-5 md:flex md:items-center md:justify-between">
          <div>
            <h5 className="text-sm font-semibold">Get weekly verified job alerts</h5>
            <p className="text-xs text-muted-foreground">
              Hand-picked overseas roles delivered every Sunday. No spam.
            </p>
          </div>
          <form className="mt-3 flex gap-2 md:mt-0">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm focus:border-ring focus:outline-none md:w-72"
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} ProbashiCareer Jobs. All rights reserved.</p>
          <a href="https://digitalwebars.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Design and Developed By Digital Webars
          </a>
        </div>
      </div>
    </footer>
  );
}
