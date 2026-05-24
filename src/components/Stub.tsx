import { createFileRoute, Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";

export function Stub({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="container-page py-16">
      <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Construction className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}

export const _CreateFileRoute = createFileRoute;
