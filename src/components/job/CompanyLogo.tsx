import { companyLogoUrl } from "@/lib/jobs";

type Props = {
  domain?: string;
  initials: string;
  fallbackColor: string;
  className?: string;
};

export function CompanyLogo({ domain, initials, fallbackColor, className }: Props) {
  const primary = companyLogoUrl(domain);

  if (!primary) {
    return (
      <div
        className={`flex items-center justify-center font-bold ring-1 ring-inset ring-black/5 ${fallbackColor} ${className ?? ""}`}
      >
        {initials}
      </div>
    );
  }

  const fallback = `https://icons.duckduckgo.com/ip3/${domain}.ico`;

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-white p-1.5 ring-1 ring-inset ring-black/5 ${className ?? ""}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center font-bold ${fallbackColor}`}
      >
        {initials}
      </span>
      <img
        src={primary}
        alt={`${initials} logo`}
        loading="lazy"
        className="relative h-full w-full object-contain"
        onError={(e) => {
          const el = e.currentTarget;
          if (!el.dataset.fallback) {
            el.dataset.fallback = "1";
            el.src = fallback;
          } else {
            el.style.display = "none";
          }
        }}
      />
    </div>
  );
}
