import { createFileRoute, Link } from "@tanstack/react-router";
import img1 from "@/assets/blog-1.jpg";
import img2 from "@/assets/blog-2.jpg";
import img3 from "@/assets/blog-3.jpg";
import img4 from "@/assets/blog-4.jpg";
import img5 from "@/assets/blog-5.jpg";
import img6 from "@/assets/blog-6.jpg";

export const Route = createFileRoute("/blog")({
  component: Blog,
});

const posts = [
  { title: "Documents you need before flying to Saudi Arabia", date: "May 18, 2026", cat: "Pre-departure", img: img1 },
  { title: "Salary negotiation tips for Gulf facility roles", date: "May 12, 2026", cat: "Career advice", img: img2 },
  { title: "Understanding your Kafala contract in 2026", date: "May 03, 2026", cat: "Legal", img: img3 },
  { title: "BMET clearance: a step-by-step walkthrough", date: "Apr 28, 2026", cat: "Process", img: img4 },
  { title: "Remittance: cheapest ways to send money home", date: "Apr 19, 2026", cat: "Finance", img: img5 },
  { title: "Top 10 skills employers ask for in Dubai", date: "Apr 09, 2026", cat: "Industry", img: img6 },
];

function Blog() {
  return (
    <section className="container-page py-10">
      <h1 className="text-3xl font-bold tracking-tight">Career advice & guides</h1>
      <p className="text-sm text-muted-foreground">Practical resources for Bangladeshi professionals working abroad.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="overflow-hidden rounded-lg border border-border bg-card">
            <img src={p.img} alt={p.title} width={800} height={512} loading="lazy" className="h-44 w-full object-cover" />
            <div className="p-5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{p.cat}</p>
              <h3 className="mt-1 text-base font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 text-xs text-muted-foreground">{p.date} · 5 min read</p>
            </div>
          </article>
        ))}
      </div>
      <Link to="/" className="sr-only">Home</Link>
    </section>
  );
}
