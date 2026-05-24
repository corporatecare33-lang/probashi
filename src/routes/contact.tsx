import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <section className="container-page py-10">
      <h1 className="text-3xl font-bold tracking-tight">Contact us</h1>
      <p className="text-sm text-muted-foreground">We respond within 1 business day.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <form className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Full name" required />
            <Field label="Email" type="email" required />
            <Field label="Phone" />
            <Field label="Subject" required />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-foreground">Message</label>
            <textarea rows={5} className="w-full rounded-md border border-border-strong bg-white p-3 text-sm focus:border-ring focus:outline-none" />
            <p className="mt-1 text-[11px] text-muted-foreground">Please include job ID if applicable.</p>
          </div>
          <button className="rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover">
            Send Message
          </button>
        </form>
        <aside className="space-y-3">
          {[
            { icon: MapPin, t: "Dhaka HQ", v: "House 24, Road 11, Banani, Dhaka 1213" },
            { icon: Phone, t: "Phone", v: "+880 1700 000 000" },
            { icon: Mail, t: "Email", v: "hello@careerbridge.jobs" },
          ].map((c) => (
            <div key={c.t} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <c.icon className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-semibold text-muted-foreground">{c.t}</p>
                <p className="text-sm">{c.v}</p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}

function Field({ label, type = "text", required }: { label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input type={type} className="w-full rounded-md border border-border-strong bg-white px-3 py-2 text-sm focus:border-ring focus:outline-none" />
    </div>
  );
}
