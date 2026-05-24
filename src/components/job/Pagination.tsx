import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ current = 1, total = 21 }: { current?: number; total?: number }) {
  const pages: (number | "...")[] = [1, 2, 3, "...", total];
  return (
    <nav className="flex flex-wrap items-center justify-center gap-1.5 py-2">
      <button className="inline-flex h-9 items-center gap-1 rounded-md border border-border-strong bg-white px-3 text-xs font-medium text-foreground/80 hover:bg-secondary">
        <ChevronLeft className="h-3.5 w-3.5" /> Previous
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="px-1.5 text-sm text-muted-foreground">
            …
          </span>
        ) : (
          <button
            key={i}
            className={`h-9 w-9 rounded-md border text-xs font-medium ${
              p === current
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border-strong bg-white text-foreground/80 hover:bg-secondary"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button className="inline-flex h-9 items-center gap-1 rounded-md border border-border-strong bg-white px-3 text-xs font-medium text-foreground/80 hover:bg-secondary">
        Next <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}
