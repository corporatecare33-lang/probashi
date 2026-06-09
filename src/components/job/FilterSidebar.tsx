import { Search } from "lucide-react";
import { COUNTRIES, INDUSTRIES } from "@/lib/jobs";

type JobsFilters = {
  q?: string;
  country?: string;
  industry?: string;
  type?: string;
};

type FilterSidebarProps = {
  filters: JobsFilters;
  onChange: (filters: JobsFilters) => void;
  onReset: () => void;
};

const jobTypes = ["Full Time", "Contract", "Part Time", "Internship", "Remote"];

export function FilterSidebar({ filters, onChange, onReset }: FilterSidebarProps) {
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
            value={filters.q ?? ""}
            onChange={(event) => onChange({ q: event.target.value || undefined })}
            placeholder="Search job title or company"
            className="w-full rounded-md border border-border-strong bg-white py-2 pl-8 pr-3 text-sm focus:border-ring focus:outline-none"
          />
        </div>
      </div>

      <div className="divide-y divide-border">
        <details open className="group/section">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary/40">
            Location
            <span className="text-xs text-muted-foreground transition group-open/section:rotate-180">▾</span>
          </summary>
          <ul className="px-4 pb-3">
            {COUNTRIES.map((country) => (
              <li key={country.slug}>
                <label className="flex cursor-pointer items-center justify-between gap-2 rounded px-1 py-1 text-sm text-foreground/80 hover:bg-secondary/40">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.country === country.slug}
                      onChange={() => onChange({ country: filters.country === country.slug ? undefined : country.slug })}
                      className="h-3.5 w-3.5 rounded border-border-strong text-primary focus:ring-ring"
                    />
                    <span>{country.name}</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground">{country.jobs}</span>
                </label>
              </li>
            ))}
          </ul>
        </details>

        <details open className="group/section">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary/40">
            Industry
            <span className="text-xs text-muted-foreground transition group-open/section:rotate-180">▾</span>
          </summary>
          <ul className="px-4 pb-3">
            {INDUSTRIES.map((industry) => (
              <li key={industry.slug}>
                <label className="flex cursor-pointer items-center justify-between gap-2 rounded px-1 py-1 text-sm text-foreground/80 hover:bg-secondary/40">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.industry === industry.slug}
                      onChange={() => onChange({ industry: filters.industry === industry.slug ? undefined : industry.slug })}
                      className="h-3.5 w-3.5 rounded border-border-strong text-primary focus:ring-ring"
                    />
                    <span>{industry.name}</span>
                  </span>
                  <span className="text-[11px] text-muted-foreground">{industry.jobs}</span>
                </label>
              </li>
            ))}
          </ul>
        </details>

        <details open className="group/section">
          <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-secondary/40">
            Job Type
            <span className="text-xs text-muted-foreground transition group-open/section:rotate-180">▾</span>
          </summary>
          <ul className="px-4 pb-3">
            {jobTypes.map((type) => (
              <li key={type}>
                <label className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm text-foreground/80 hover:bg-secondary/40">
                  <input
                    type="checkbox"
                    checked={filters.type === type}
                    onChange={() => onChange({ type: filters.type === type ? undefined : type })}
                    className="h-3.5 w-3.5 rounded border-border-strong text-primary focus:ring-ring"
                  />
                  <span>{type}</span>
                </label>
              </li>
            ))}
          </ul>
        </details>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border bg-secondary/40 px-4 py-3">
        <button onClick={onReset} className="text-xs font-medium text-muted-foreground hover:text-foreground">
          Reset Filters
        </button>
        <button onClick={onReset} className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary-hover">
          Clear All
        </button>
      </div>
    </aside>
  );
}
