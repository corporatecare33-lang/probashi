import { Search } from "lucide-react";

type Group = { title: string; options: { label: string; count?: number }[] };

const groups: Group[] = [
  {
    title: "Location",
    options: [
      { label: "Saudi Arabia", count: 142 },
      { label: "  Riyadh", count: 54 },
      { label: "  Jeddah", count: 38 },
      { label: "  Dammam", count: 27 },
      { label: "UAE", count: 56 },
      { label: "  Dubai", count: 41 },
      { label: "Qatar", count: 23 },
      { label: "Bangladesh", count: 27 },
    ],
  },
  {
    title: "Job Type",
    options: [
      { label: "Full Time", count: 198 },
      { label: "Contract", count: 36 },
      { label: "Part Time", count: 8 },
      { label: "Internship", count: 3 },
      { label: "Remote", count: 3 },
    ],
  },
  {
    title: "Experience Level",
    options: [
      { label: "Entry Level", count: 31 },
      { label: "1–3 Years", count: 64 },
      { label: "3–5 Years", count: 82 },
      { label: "5–10 Years", count: 51 },
      { label: "10+ Years", count: 20 },
    ],
  },
  {
    title: "Salary Range",
    options: [
      { label: "Negotiable", count: 22 },
      { label: "SAR 1,500 – 2,500", count: 45 },
      { label: "SAR 2,500 – 4,000", count: 78 },
      { label: "SAR 4,000 – 7,000", count: 64 },
      { label: "SAR 7,000+", count: 39 },
    ],
  },
  {
    title: "Date Posted",
    options: [
      { label: "Last 24 Hours", count: 14 },
      { label: "Last 7 Days", count: 62 },
      { label: "Last 30 Days", count: 178 },
      { label: "All Jobs", count: 248 },
    ],
  },
  {
    title: "Benefits",
    options: [
      { label: "Accommodation" },
      { label: "Food Allowance" },
      { label: "Transport" },
      { label: "Medical" },
      { label: "Visa Support" },
      { label: "Air Ticket" },
    ],
  },
  {
    title: "Employer Type",
    options: [
      { label: "Direct Employer", count: 112 },
      { label: "Recruitment Agency", count: 98 },
      { label: "Verified Partner", count: 38 },
    ],
  },
];

export function FilterSidebar() {
  return (
    <aside className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <h3 className="text-sm font-semibold">Filters</h3>
      </div>

      <div className="border-b border-border p-4">
        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Search within results
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            placeholder="Search job title or company"
            className="w-full rounded-md border border-border-strong bg-white py-2 pl-8 pr-3 text-sm focus:border-ring focus:outline-none"
          />
        </div>
      </div>

      <div className="divide-y divide-border">
        {groups.map((g, gi) => (
          <details key={g.title} open={gi < 5} className="group/section">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary/40">
              {g.title}
              <span className="text-xs text-muted-foreground group-open/section:rotate-180 transition">
                ▾
              </span>
            </summary>
            <ul className="px-4 pb-3">
              {g.options.map((o) => (
                <li key={o.label}>
                  <label className="flex cursor-pointer items-center justify-between gap-2 rounded px-1 py-1 text-sm text-foreground/80 hover:bg-secondary/40">
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="h-3.5 w-3.5 rounded border-border-strong text-primary focus:ring-ring"
                      />
                      <span style={{ whiteSpace: "pre" }}>{o.label}</span>
                    </span>
                    {o.count != null && (
                      <span className="text-[11px] text-muted-foreground">{o.count}</span>
                    )}
                  </label>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border bg-secondary/40 px-4 py-3">
        <button className="text-xs font-medium text-muted-foreground hover:text-foreground">
          Reset Filters
        </button>
        <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover">
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
