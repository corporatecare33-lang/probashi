export type Job = {
  id: number;
  slug: string;
  title: string;
  company: string;
  initials: string;
  logoColor: string;
  domain?: string;
  location: string;
  country: string;
  salary: string;
  experience: string;
  type: "Full Time" | "Contract" | "Part Time" | "Internship" | "Remote";
  postedDays: number;
  deadline: string;
  summary: string;
  skills: string[];
  benefits: string[];
  verified: boolean;
  urgent?: boolean;
  featured?: boolean;
  directEmployer?: boolean;
  vacancies?: number;
};

export function companyLogoUrl(domain?: string) {
  if (!domain) return null;
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
}

export const JOBS: Job[] = [
  {
    id: 1,
    slug: "facility-supervisor-gulfcare-riyadh",
    title: "Facility Supervisor",
    company: "GulfCare Facility Services",
    domain: "emcor.com",
    initials: "GC",
    logoColor: "bg-info-soft text-info-foreground",
    location: "Riyadh, Saudi Arabia",
    country: "Saudi Arabia",
    salary: "SAR 3,500 - 4,500",
    experience: "3–5 Years",
    type: "Full Time",
    postedDays: 2,
    deadline: "30 Nov 2026",
    summary:
      "Lead day-to-day facility operations across a 12,000 sqm commercial site. Coordinate maintenance teams, contractors, and HSE compliance.",
    skills: ["Maintenance", "Team Supervision", "HVAC", "Safety"],
    benefits: ["Accommodation", "Transport", "Medical"],
    verified: true,
    featured: true,
    directEmployer: true,
    vacancies: 4,
  },
  {
    id: 2,
    slug: "cleaning-operations-manager-alnoor-jeddah",
    title: "Cleaning Operations Manager",
    company: "Al Noor Facilities",
    domain: "alnoorhc.com",
    initials: "AN",
    logoColor: "bg-success-soft text-success",
    location: "Jeddah, Saudi Arabia",
    country: "Saudi Arabia",
    salary: "SAR 5,000 - 7,000",
    experience: "5–8 Years",
    type: "Full Time",
    postedDays: 1,
    deadline: "12 Dec 2026",
    summary:
      "Oversee multi-site cleaning operations across hospitality and corporate accounts. Drive SLAs, audits, and workforce planning.",
    skills: ["Operations", "Site Management", "Quality Control"],
    benefits: ["Visa Support", "Accommodation", "Medical"],
    verified: true,
    urgent: true,
    vacancies: 1,
  },
  {
    id: 3,
    slug: "hvac-technician-desertline-dammam",
    title: "HVAC Technician",
    company: "DesertLine Technical Services",
    domain: "serco.com",
    initials: "DL",
    logoColor: "bg-warning-soft text-warning-foreground",
    location: "Dammam, Saudi Arabia",
    country: "Saudi Arabia",
    salary: "SAR 2,200 - 3,200",
    experience: "2–4 Years",
    type: "Contract",
    postedDays: 4,
    deadline: "20 Nov 2026",
    summary:
      "Install, service and troubleshoot HVAC systems in industrial environments. Perform preventive maintenance and emergency repairs.",
    skills: ["HVAC", "Maintenance", "Troubleshooting"],
    benefits: ["Food", "Transport", "Medical"],
    verified: true,
    vacancies: 12,
  },
  {
    id: 4,
    slug: "camp-boss-prime-workforce-tabuk",
    title: "Camp Boss",
    company: "Prime Workforce Solutions",
    domain: "kbr.com",
    initials: "PW",
    logoColor: "bg-info-soft text-info-foreground",
    location: "Tabuk, Saudi Arabia",
    country: "Saudi Arabia",
    salary: "Negotiable",
    experience: "5+ Years",
    type: "Full Time",
    postedDays: 6,
    deadline: "05 Dec 2026",
    summary:
      "Manage daily camp operations for 600+ workers including catering, housekeeping, inventory and welfare coordination.",
    skills: ["Camp Management", "Staff Coordination", "Inventory"],
    benefits: ["Accommodation", "Food", "Air Ticket"],
    verified: true,
    featured: true,
    vacancies: 2,
  },
  {
    id: 5,
    slug: "electrical-maintenance-technician-bluepeak-dubai",
    title: "Electrical Maintenance Technician",
    company: "BluePeak Facility Management",
    domain: "emrill.com",
    initials: "BP",
    logoColor: "bg-success-soft text-success",
    location: "Dubai, UAE",
    country: "UAE",
    salary: "AED 2,500 - 3,800",
    experience: "2–5 Years",
    type: "Full Time",
    postedDays: 3,
    deadline: "25 Nov 2026",
    summary:
      "Maintain electrical systems across commercial properties. Conduct planned preventive maintenance and respond to breakdowns.",
    skills: ["Electrical", "Preventive Maintenance", "Safety"],
    benefits: ["Visa Support", "Transport"],
    verified: true,
    directEmployer: true,
    vacancies: 6,
  },
  {
    id: 6,
    slug: "site-supervisor-metrobuild-doha",
    title: "Site Supervisor",
    company: "MetroBuild Services",
    domain: "imdaad.com",
    initials: "MB",
    logoColor: "bg-info-soft text-info-foreground",
    location: "Doha, Qatar",
    country: "Qatar",
    salary: "QAR 3,000 - 4,500",
    experience: "3–6 Years",
    type: "Full Time",
    postedDays: 7,
    deadline: "01 Dec 2026",
    summary:
      "Supervise on-site teams across multiple facility contracts. Maintain reporting, handover documents and client communication.",
    skills: ["Site Supervision", "Reporting", "Team Handling"],
    benefits: ["Accommodation", "Medical"],
    verified: true,
    vacancies: 3,
  },
  {
    id: 7,
    slug: "housekeeping-team-leader-royal-makkah",
    title: "Housekeeping Team Leader",
    company: "Royal Hospitality Services",
    domain: "rotana.com",
    initials: "RH",
    logoColor: "bg-warning-soft text-warning-foreground",
    location: "Makkah, Saudi Arabia",
    country: "Saudi Arabia",
    salary: "SAR 2,000 - 2,800",
    experience: "2–3 Years",
    type: "Full Time",
    postedDays: 1,
    deadline: "18 Nov 2026",
    summary:
      "Lead a housekeeping crew of 20+ in a premium hospitality environment. Manage shifts, training and guest-area standards.",
    skills: ["Housekeeping", "Shift Management", "Guest Service"],
    benefits: ["Food", "Accommodation", "Transport"],
    verified: true,
    urgent: true,
    vacancies: 8,
  },
  {
    id: 8,
    slug: "maintenance-planner-industrialcare-jubail",
    title: "Maintenance Planner",
    company: "IndustrialCare Group",
    domain: "aecom.com",
    initials: "IC",
    logoColor: "bg-success-soft text-success",
    location: "Jubail, Saudi Arabia",
    country: "Saudi Arabia",
    salary: "SAR 4,500 - 6,000",
    experience: "4–7 Years",
    type: "Full Time",
    postedDays: 5,
    deadline: "10 Dec 2026",
    summary:
      "Plan and schedule preventive and corrective maintenance using CMMS. Coordinate with operations and procurement.",
    skills: ["Maintenance Planning", "CMMS", "Reporting"],
    benefits: ["Medical", "Air Ticket", "Accommodation"],
    verified: true,
    directEmployer: true,
    vacancies: 1,
  },
];

export const INDUSTRIES = [
  { slug: "facilities-management", name: "Facilities Management", jobs: 248 },
  { slug: "construction", name: "Construction", jobs: 412 },
  { slug: "hospitality", name: "Hospitality", jobs: 186 },
  { slug: "healthcare", name: "Healthcare", jobs: 94 },
  { slug: "driving", name: "Driving", jobs: 173 },
  { slug: "engineering", name: "Engineering", jobs: 221 },
  { slug: "it-software", name: "IT & Software", jobs: 67 },
  { slug: "sales-marketing", name: "Sales & Marketing", jobs: 45 },
  { slug: "cleaning-services", name: "Cleaning Services", jobs: 309 },
  { slug: "security-services", name: "Security Services", jobs: 152 },
];

export const COUNTRIES = [
  { slug: "saudi-arabia", name: "Saudi Arabia", flag: "🇸🇦", code: "sa", jobs: 1248, avgSalary: "BDT 65k–110k" },
  { slug: "uae", name: "UAE", flag: "🇦🇪", code: "ae", jobs: 962, avgSalary: "BDT 60k–125k" },
  { slug: "qatar", name: "Qatar", flag: "🇶🇦", code: "qa", jobs: 431, avgSalary: "BDT 70k–115k" },
  { slug: "kuwait", name: "Kuwait", flag: "🇰🇼", code: "kw", jobs: 287, avgSalary: "BDT 55k–90k" },
  { slug: "oman", name: "Oman", flag: "🇴🇲", code: "om", jobs: 198, avgSalary: "BDT 50k–85k" },
  { slug: "bahrain", name: "Bahrain", flag: "🇧🇭", code: "bh", jobs: 142, avgSalary: "BDT 55k–95k" },
  { slug: "malaysia", name: "Malaysia", flag: "🇲🇾", code: "my", jobs: 211, avgSalary: "BDT 45k–80k" },
  { slug: "bangladesh", name: "Bangladesh", flag: "🇧🇩", code: "bd", jobs: 1620, avgSalary: "BDT 30k–80k" },
];

export const TOP_COMPANIES = [
  { name: "Saudi Aramco", domain: "aramco.com", country: "Saudi Arabia", color: "#00843D", bg: "#E6F4EC" },
  { name: "Emaar", domain: "emaar.com", country: "UAE", color: "#0A2E5C", bg: "#E5ECF5" },
  { name: "Qatar Airways", domain: "qatarairways.com", country: "Qatar", color: "#5C0A3A", bg: "#F7E6EF" },
  { name: "Etihad Airways", domain: "etihad.com", country: "UAE", color: "#BD8B13", bg: "#FAF1DA" },
  { name: "ADNOC", domain: "adnoc.ae", country: "UAE", color: "#0085CA", bg: "#E0F2FB" },
  { name: "Almarai", domain: "almarai.com", country: "Saudi Arabia", color: "#E30613", bg: "#FDE5E7" },
  { name: "Mashreq", domain: "mashreqbank.com", country: "UAE", color: "#FF6B00", bg: "#FFEDDC" },
  { name: "Ooredoo", domain: "ooredoo.com", country: "Qatar", color: "#ED1C24", bg: "#FDE3E4" },
  { name: "Petronas", domain: "petronas.com", country: "Malaysia", color: "#00A19A", bg: "#DDF4F2" },
  { name: "Majid Al Futtaim", domain: "majidalfuttaim.com", country: "UAE", color: "#7B2D8E", bg: "#F1E4F5" },
  { name: "Jumeirah", domain: "jumeirah.com", country: "UAE", color: "#A8842D", bg: "#F8F0DC" },
  { name: "STC", domain: "stc.com.sa", country: "Saudi Arabia", color: "#4F2683", bg: "#EBE3F5" },
];

