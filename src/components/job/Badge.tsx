import type { ReactNode } from "react";

type Variant = "verified" | "urgent" | "featured" | "direct" | "neutral" | "info";

const styles: Record<Variant, string> = {
  verified: "bg-success-soft text-success ring-1 ring-inset ring-success/20 border-transparent",
  urgent: "bg-warning-soft text-warning-foreground ring-1 ring-inset ring-warning/30 border-transparent",
  featured: "bg-indigo-soft text-indigo ring-1 ring-inset ring-indigo/25 border-transparent",
  direct: "bg-royal-soft text-royal ring-1 ring-inset ring-royal/20 border-transparent",
  neutral: "bg-secondary text-muted-foreground border-border",
  info: "bg-sky-soft text-info-foreground ring-1 ring-inset ring-sky/20 border-transparent",
};

export function Badge({
  variant = "neutral",
  children,
  className = "",
}: {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-none ${styles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
