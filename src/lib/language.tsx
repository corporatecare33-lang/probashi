import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Language = "bn" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (text: string) => string;
};

const STORAGE_KEY = "probashi-language";

const bn: Record<string, string> = {
  Home: "হোম",
  "Find Jobs": "চাকরি খুঁজুন",
  Industries: "ইন্ডাস্ট্রি",
  Countries: "দেশসমূহ",
  Companies: "কোম্পানি",
  Training: "ট্রেনিং",
  Blog: "ব্লগ",
  "Browse by industry": "ইন্ডাস্ট্রি অনুযায়ী দেখুন",
  "All industries": "সব ইন্ডাস্ট্রি",
  "Hiring countries": "নিয়োগকারী দেশ",
  "View all jobs": "সব চাকরি দেখুন",
  "View all industries": "সব ইন্ডাস্ট্রি দেখুন",
  "View all countries": "সব দেশ দেখুন",
  "Help Center": "সহায়তা কেন্দ্র",
  "Sign in": "লগইন",
  "Sign out": "লগআউট",
  "Create account": "অ্যাকাউন্ট খুলুন",
  Dashboard: "ড্যাশবোর্ড",
  "Upload CV": "সিভি আপলোড",
  "Post a Job": "চাকরি পোস্ট করুন",
  "BMET licensed · Verified overseas employers": "বিএমইটি লাইসেন্সপ্রাপ্ত · যাচাইকৃত বিদেশি নিয়োগকর্তা",
  "BMET licensed Â· Verified overseas employers": "বিএমইটি লাইসেন্সপ্রাপ্ত · যাচাইকৃত বিদেশি নিয়োগকর্তা",
  "Browse Jobs": "চাকরি দেখুন",
  "Job Alerts": "চাকরির অ্যালার্ট",
  "Career Advice": "ক্যারিয়ার পরামর্শ",
  Employers: "নিয়োগকর্তা",
  Pricing: "মূল্য তালিকা",
  "Browse CVs": "সিভি দেখুন",
  "Recruitment Solutions": "নিয়োগ সমাধান",
  Support: "সাপোর্ট",
  "Contact Us": "যোগাযোগ করুন",
  "Terms of Service": "ব্যবহারের শর্তাবলি",
  "Privacy Policy": "গোপনীয়তা নীতি",
  "Get weekly verified job alerts": "প্রতি সপ্তাহে যাচাইকৃত চাকরির খবর পান",
  "Hand-picked overseas roles delivered every Sunday. No spam.": "প্রতি রবিবার বাছাই করা বিদেশি চাকরির খবর। কোনো স্প্যাম নয়।",
  Subscribe: "সাবস্ক্রাইব",
  "Verified overseas and local jobs for skilled Bangladeshi professionals. Trusted by 1,800+ employers across the Gulf and South Asia.":
    "দক্ষ বাংলাদেশি পেশাজীবীদের জন্য যাচাইকৃত বিদেশি ও দেশীয় চাকরি। গালফ ও দক্ষিণ এশিয়ার ১,৮০০+ নিয়োগকর্তার আস্থা।",
  "Verified overseas jobs for skilled Bangladeshi professionals.": "দক্ষ বাংলাদেশি পেশাজীবীদের জন্য যাচাইকৃত বিদেশি চাকরি।",
  "ProbashiCareer Jobs": "প্রবাসী ক্যারিয়ার জবস",
  "All rights reserved.": "সর্বস্বত্ব সংরক্ষিত।",
  "Design and Developed By Digital Webars": "ডিজাইন ও ডেভেলপ করেছে Digital Webars",
  "Sign in to your account": "আপনার অ্যাকাউন্টে লগইন করুন",
  "Create your free account": "ফ্রি অ্যাকাউন্ট খুলুন",
  "Sign in to apply": "আবেদন করতে লগইন করুন",
  "Browse all jobs": "সব চাকরি দেখুন",
  "Browse more jobs": "আরও চাকরি দেখুন",
  "Apply Now": "এখনই আবেদন করুন",
  "Apply now": "এখনই আবেদন করুন",
  "Save Job": "চাকরি সেভ করুন",
  "Search jobs": "চাকরি সার্চ করুন",
  "Search by job title, company, or keyword": "চাকরির নাম, কোম্পানি বা কীওয়ার্ড লিখুন",
  Location: "লোকেশন",
  "Job Type": "চাকরির ধরন",
  Salary: "বেতন",
  Experience: "অভিজ্ঞতা",
  "No applications yet.": "এখনও কোনো আবেদন নেই।",
  "Page not found": "পৃষ্ঠা খুঁজে পাওয়া যায়নি",
  "The page you're looking for doesn't exist or has been moved.": "আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি নেই অথবা সরানো হয়েছে।",
  "Go home": "হোমে যান",
  "This page didn't load": "এই পৃষ্ঠা লোড হয়নি",
  "Something went wrong on our end. You can try refreshing or head back home.":
    "আমাদের দিকে একটি সমস্যা হয়েছে। রিফ্রেশ করুন অথবা হোমে ফিরে যান।",
  "Try again": "আবার চেষ্টা করুন",
  "Facilities Management": "ফ্যাসিলিটিজ ম্যানেজমেন্ট",
  Construction: "কনস্ট্রাকশন",
  Hospitality: "হসপিটালিটি",
  Healthcare: "হেলথকেয়ার",
  Driving: "ড্রাইভিং",
  Engineering: "ইঞ্জিনিয়ারিং",
  "IT & Software": "আইটি ও সফটওয়্যার",
  "Sales & Marketing": "সেলস ও মার্কেটিং",
  "Cleaning Services": "ক্লিনিং সার্ভিসেস",
  "Security Services": "সিকিউরিটি সার্ভিসেস",
  "facilities management": "ফ্যাসিলিটিজ ম্যানেজমেন্ট",
  construction: "কনস্ট্রাকশন",
  hospitality: "হসপিটালিটি",
  healthcare: "হেলথকেয়ার",
  driving: "ড্রাইভিং",
  engineering: "ইঞ্জিনিয়ারিং",
  "it & software": "আইটি ও সফটওয়্যার",
  "sales & marketing": "সেলস ও মার্কেটিং",
  "cleaning services": "ক্লিনিং সার্ভিসেস",
  "security services": "সিকিউরিটি সার্ভিসেস",
  "10 active sectors across overseas and local markets.": "বিদেশি ও দেশীয় বাজারে ১০টি সক্রিয় সেক্টর।",
  Bangladesh: "বাংলাদেশ",
  "Saudi Arabia": "সৌদি আরব",
  UAE: "ইউএই",
  Qatar: "কাতার",
  Kuwait: "কুয়েত",
  Oman: "ওমান",
  Bahrain: "বাহরাইন",
  Malaysia: "মালয়েশিয়া",
  jobs: "চাকরি",
  "Language": "ভাষা",
  "English": "English",
  "Bangla": "বাংলা",
  "Live Job Market": "লাইভ চাকরির বাজার",
  Live: "লাইভ",
  "Active Jobs": "সক্রিয় চাকরি",
  "Verified Employers": "যাচাইকৃত নিয়োগকর্তা",
  "Applications / Week": "সাপ্তাহিক আবেদন",
  "Countries Covered": "দেশ কাভারড",
  "Application success rate": "আবেদনের সফলতার হার",
  "Based on last 90 days of verified placements.": "গত ৯০ দিনের যাচাইকৃত নিয়োগের ভিত্তিতে।",
  "Top hiring countries": "শীর্ষ নিয়োগকারী দেশ",
  "View all": "সব দেখুন",
  "Demand letter": "ডিমান্ড লেটার",
  "Embassy attested": "দূতাবাস সত্যায়িত",
  "Salary verified": "বেতন যাচাইকৃত",
  "Contract OK": "চুক্তি ঠিক আছে",
  "Trusted Employers": "বিশ্বস্ত নিয়োগকর্তা",
  "Hiring partners across the Gulf": "গালফজুড়ে নিয়োগ পার্টনার",
  "1,800+ verified employers · Updated weekly": "১,৮০০+ যাচাইকৃত নিয়োগকর্তা · প্রতি সপ্তাহে আপডেট",
  "BMET Licensed": "বিএমইটি লাইসেন্সপ্রাপ্ত",
  "Verified Overseas Jobs": "যাচাইকৃত বিদেশি চাকরি",
  Search: "সার্চ",
  "All Countries": "সব দেশ",
  "All Industries": "সব ইন্ডাস্ট্রি",
  Popular: "জনপ্রিয়",
  Cleaner: "ক্লিনার",
  Driver: "ড্রাইভার",
  "Apply to verified jobs in Saudi Arabia, UAE, Qatar, Kuwait, Malaysia and Bangladesh with salary, benefits and employer verification details.":
    "সৌদি আরব, ইউএই, কাতার, কুয়েত, মালয়েশিয়া ও বাংলাদেশে বেতন, সুবিধা ও নিয়োগকর্তার যাচাইসহ নির্ভরযোগ্য চাকরিতে আবেদন করুন।",
  Featured: "ফিচারড",
  "Hand-picked verified jobs": "বাছাই করা যাচাইকৃত চাকরি",
  "Curated overseas roles from trusted employers and licensed agencies.": "বিশ্বস্ত নিয়োগকর্তা ও লাইসেন্সপ্রাপ্ত এজেন্সির বাছাই করা বিদেশি চাকরি।",
  "Urgent overseas hiring this week": "এই সপ্তাহে জরুরি বিদেশি নিয়োগ",
  "Employers actively interviewing in the next 7 days.": "নিয়োগকর্তারা আগামী ৭ দিনের মধ্যে সক্রিয়ভাবে ইন্টারভিউ নিচ্ছেন।",
  "View 142 urgent jobs": "১৪২টি জরুরি চাকরি দেখুন",
  "Hiring across the Gulf & beyond": "গালফ ও অন্যান্য দেশে নিয়োগ",
  "Active demand from verified employers in 18 countries.": "১৮টি দেশে যাচাইকৃত নিয়োগকর্তাদের সক্রিয় চাহিদা।",
  "All countries": "সব দেশ",
  Hot: "হট",
  Top: "শীর্ষ",
  "Avg. salary": "গড় বেতন",
  "How application works": "আবেদন যেভাবে কাজ করে",
  "Built for both job seekers and verified employers.": "চাকরিপ্রার্থী ও যাচাইকৃত নিয়োগকর্তা উভয়ের জন্য তৈরি।",
  "For Job Seekers": "চাকরিপ্রার্থীদের জন্য",
  "For Employers": "নিয়োগকর্তাদের জন্য",
  "Create profile": "প্রোফাইল তৈরি করুন",
  "Apply to verified jobs": "যাচাইকৃত চাকরিতে আবেদন করুন",
  "Get contacted by employers": "নিয়োগকর্তাদের কাছ থেকে যোগাযোগ পান",
  "Create company profile": "কোম্পানি প্রোফাইল তৈরি করুন",
  "Post job": "চাকরি পোস্ট করুন",
  "Review candidates": "প্রার্থী যাচাই করুন",
  "Hire faster": "দ্রুত নিয়োগ দিন",
  "Success Stories": "সফলতার গল্প",
  "What workers & employers say": "কর্মী ও নিয়োগকর্তারা যা বলেন",
  "Ready to find your next opportunity?": "আপনার পরবর্তী সুযোগ খুঁজতে প্রস্তুত?",
  "Join 32,000+ Bangladeshi professionals working with verified Gulf employers through ProbashiCareer.":
    "প্রবাসী ক্যারিয়ারের মাধ্যমে যাচাইকৃত গালফ নিয়োগকর্তাদের সঙ্গে কাজ করা ৩২,০০০+ বাংলাদেশি পেশাজীবীর সঙ্গে যুক্ত হন।",
  "Job Board": "চাকরির তালিকা",
  "Find your next": "আপনার পরবর্তী",
  "overseas opportunity": "বিদেশি সুযোগ খুঁজুন",
  "12,500+ verified vacancies across the Gulf and Bangladesh — updated every hour.":
    "গালফ ও বাংলাদেশে ১২,৫০০+ যাচাইকৃত পদ, প্রতি ঘণ্টায় আপডেট।",
  Showing: "দেখানো হচ্ছে",
  of: "এর মধ্যে",
  "Sort by": "সাজান",
  "Most recent": "সর্বশেষ",
  "Highest salary": "সর্বোচ্চ বেতন",
  "Most relevant": "সবচেয়ে প্রাসঙ্গিক",
  "Closing soon": "শীঘ্রই শেষ",
  "Search:": "সার্চ:",
  "Country:": "দেশ:",
  "Industry:": "ইন্ডাস্ট্রি:",
  "Type:": "ধরন:",
  "Clear all": "সব মুছুন",
  "No jobs found": "কোনো চাকরি পাওয়া যায়নি",
  "Try a different keyword, country, or industry.": "ভিন্ন কীওয়ার্ড, দেশ বা ইন্ডাস্ট্রি দিয়ে চেষ্টা করুন।",
  "Reset filters": "ফিল্টার রিসেট করুন",
  Filters: "ফিল্টার",
  "Search within results": "রেজাল্টের মধ্যে সার্চ করুন",
  "Search job title or company": "চাকরির পদ বা কোম্পানি সার্চ করুন",
  Industry: "ইন্ডাস্ট্রি",
  "Reset Filters": "ফিল্টার রিসেট করুন",
  "Clear All": "সব মুছুন",
  "Full Time": "ফুল টাইম",
  Contract: "চুক্তিভিত্তিক",
  "Part Time": "পার্ট টাইম",
  Internship: "ইন্টার্নশিপ",
  Remote: "রিমোট",
  Verified: "যাচাইকৃত",
  Urgent: "জরুরি",
  "Direct Employer": "সরাসরি নিয়োগকর্তা",
  vacancies: "টি পদ",
  "Save job": "চাকরি সেভ করুন",
  "Apply by": "আবেদনের শেষ তারিখ",
  applied: "আবেদন করেছে",
  views: "ভিউ",
  "View Details": "বিস্তারিত দেখুন",
  "Quick Apply": "দ্রুত আবেদন",
  "Employers Directory": "নিয়োগকর্তা ডিরেক্টরি",
  "verified employers": "যাচাইকৃত নিয়োগকর্তা",
  "hiring now": "এখন নিয়োগ দিচ্ছে",
  "Search by company name, industry or country": "কোম্পানি, ইন্ডাস্ট্রি বা দেশ দিয়ে সার্চ করুন",
  "Top hiring companies": "শীর্ষ নিয়োগকারী কোম্পানি",
  employees: "কর্মী",
  "open jobs": "খোলা চাকরি",
  "View jobs": "চাকরি দেখুন",
  "1,000+ employees": "১,০০০+ কর্মী",
  "5,000+ employees": "৫,০০০+ কর্মী",
  "10,000+ employees": "১০,০০০+ কর্মী",
  "500+ employees": "৫০০+ কর্মী",
  "Facility Supervisor": "ফ্যাসিলিটি সুপারভাইজার",
  "Cleaning Operations Manager": "ক্লিনিং অপারেশনস ম্যানেজার",
  "HVAC Technician": "এইচভিএসি টেকনিশিয়ান",
  "Camp Boss": "ক্যাম্প বস",
  "Electrical Maintenance Technician": "ইলেকট্রিক্যাল মেইনটেন্যান্স টেকনিশিয়ান",
  "Site Supervisor": "সাইট সুপারভাইজার",
  "Housekeeping Team Leader": "হাউসকিপিং টিম লিডার",
  "Maintenance Planner": "মেইনটেন্যান্স প্ল্যানার",
  "Facilities Manager": "ফ্যাসিলিটিজ ম্যানেজার",
  "Electrician in Dubai": "দুবাইয়ে ইলেকট্রিশিয়ান",
  "Hotel Receptionist": "হোটেল রিসেপশনিস্ট",
  "Heavy Truck Driver": "হেভি ট্রাক ড্রাইভার",
  "Construction Foreman": "কনস্ট্রাকশন ফোরম্যান",
  "AC Technician — Riyadh": "রিয়াদে এসি টেকনিশিয়ান",
  "Registered Nurse": "রেজিস্টার্ড নার্স",
  "Welder / Fabricator": "ওয়েল্ডার / ফ্যাব্রিকেটর",
  "Lead day-to-day facility operations across a 12,000 sqm commercial site. Coordinate maintenance teams, contractors, and HSE compliance.":
    "১২,০০০ বর্গমিটারের বাণিজ্যিক সাইটে দৈনন্দিন ফ্যাসিলিটি অপারেশন পরিচালনা করুন। মেইনটেন্যান্স টিম, কন্ট্রাক্টর ও এইচএসই কমপ্লায়েন্স সমন্বয় করুন।",
  "Oversee multi-site cleaning operations across hospitality and corporate accounts. Drive SLAs, audits, and workforce planning.":
    "হসপিটালিটি ও কর্পোরেট অ্যাকাউন্টে একাধিক সাইটের ক্লিনিং অপারেশন দেখভাল করুন। এসএলএ, অডিট ও কর্মী পরিকল্পনা পরিচালনা করুন।",
  "Install, service and troubleshoot HVAC systems in industrial environments. Perform preventive maintenance and emergency repairs.":
    "ইন্ডাস্ট্রিয়াল পরিবেশে এইচভিএসি সিস্টেম ইনস্টল, সার্ভিস ও ট্রাবলশুট করুন। প্রিভেন্টিভ মেইনটেন্যান্স ও জরুরি মেরামত করুন।",
  "Manage daily camp operations for 600+ workers including catering, housekeeping, inventory and welfare coordination.":
    "৬০০+ কর্মীর ক্যাটারিং, হাউসকিপিং, ইনভেন্টরি ও কল্যাণ সমন্বয়সহ দৈনিক ক্যাম্প অপারেশন পরিচালনা করুন।",
  "Maintain electrical systems across commercial properties. Conduct planned preventive maintenance and respond to breakdowns.":
    "বাণিজ্যিক প্রপার্টির ইলেকট্রিক্যাল সিস্টেম রক্ষণাবেক্ষণ করুন। পরিকল্পিত প্রিভেন্টিভ মেইনটেন্যান্স ও ব্রেকডাউন রেসপন্স করুন।",
  "Supervise on-site teams across multiple facility contracts. Maintain reporting, handover documents and client communication.":
    "একাধিক ফ্যাসিলিটি কন্ট্রাক্টে অন-সাইট টিম সুপারভাইজ করুন। রিপোর্টিং, হ্যান্ডওভার ডকুমেন্ট ও ক্লায়েন্ট যোগাযোগ বজায় রাখুন।",
  "Lead a housekeeping crew of 20+ in a premium hospitality environment. Manage shifts, training and guest-area standards.":
    "প্রিমিয়াম হসপিটালিটি পরিবেশে ২০+ সদস্যের হাউসকিপিং টিম পরিচালনা করুন। শিফট, ট্রেনিং ও গেস্ট এরিয়া স্ট্যান্ডার্ড দেখুন।",
  "Plan and schedule preventive and corrective maintenance using CMMS. Coordinate with operations and procurement.":
    "সিএমএমএস ব্যবহার করে প্রিভেন্টিভ ও কারেক্টিভ মেইনটেন্যান্স পরিকল্পনা ও শিডিউল করুন। অপারেশন ও প্রোকিউরমেন্টের সঙ্গে সমন্বয় করুন।",
  Maintenance: "মেইনটেন্যান্স",
  "Team Supervision": "টিম সুপারভিশন",
  HVAC: "এইচভিএসি",
  Safety: "সেফটি",
  Operations: "অপারেশনস",
  "Site Management": "সাইট ম্যানেজমেন্ট",
  "Quality Control": "কোয়ালিটি কন্ট্রোল",
  Troubleshooting: "ট্রাবলশুটিং",
  "Camp Management": "ক্যাম্প ম্যানেজমেন্ট",
  "Staff Coordination": "স্টাফ সমন্বয়",
  Inventory: "ইনভেন্টরি",
  Electrical: "ইলেকট্রিক্যাল",
  "Preventive Maintenance": "প্রিভেন্টিভ মেইনটেন্যান্স",
  "Site Supervision": "সাইট সুপারভিশন",
  Reporting: "রিপোর্টিং",
  "Team Handling": "টিম হ্যান্ডলিং",
  Housekeeping: "হাউসকিপিং",
  "Shift Management": "শিফট ম্যানেজমেন্ট",
  "Guest Service": "গেস্ট সার্ভিস",
  "Maintenance Planning": "মেইনটেন্যান্স প্ল্যানিং",
  CMMS: "সিএমএমএস",
  Accommodation: "আবাসন",
  Transport: "ট্রান্সপোর্ট",
  Medical: "মেডিকেল",
  "Visa Support": "ভিসা সাপোর্ট",
  Food: "খাবার",
  "Air Ticket": "এয়ার টিকিট",
  Negotiable: "আলোচনাসাপেক্ষ",
  "Got a verified job within 6 weeks. The contract matched exactly what was in the demand letter.":
    "৬ সপ্তাহের মধ্যে যাচাইকৃত চাকরি পেয়েছি। চুক্তি ডিমান্ড লেটারের সঙ্গে পুরোপুরি মিলেছিল।",
  "We hired 38 candidates in Q2. CV quality is genuinely pre-screened — saves us interview cycles.":
    "Q2-তে আমরা ৩৮ জন প্রার্থী নিয়োগ করেছি। সিভির মান সত্যিই প্রি-স্ক্রিনড, ইন্টারভিউ সময় বাঁচে।",
  "Transparent process, clear deductions, embassy paperwork tracked end-to-end.":
    "স্বচ্ছ প্রক্রিয়া, পরিষ্কার কাটতি, দূতাবাসের কাগজপত্র শুরু থেকে শেষ পর্যন্ত ট্র্যাক করা হয়েছে।",
  "HVAC Technician · Riyadh": "এইচভিএসি টেকনিশিয়ান · রিয়াদ",
  "Recruitment Partner · Jeddah": "নিয়োগ পার্টনার · জেদ্দা",
  "Camp Boss · Tabuk": "ক্যাম্প বস · তাবুক",
  "Active overseas hiring across the Gulf and South Asia — updated daily.": "গালফ ও দক্ষিণ এশিয়াজুড়ে সক্রিয় বিদেশি নিয়োগ, প্রতিদিন আপডেট।",
  "Jobs in": "চাকরি",
  "Avg salary": "গড় বেতন",
  "Visa supported": "ভিসা সাপোর্ট আছে",
  "Country not found": "দেশ পাওয়া যায়নি",
  "Back to countries": "দেশসমূহে ফিরে যান",
  "No jobs in our sample dataset for": "আমাদের নমুনা ডেটাসেটে এখনও কোনো চাকরি নেই:",
  "yet. Check back soon.": "। শীঘ্রই আবার দেখুন।",
  "Browse by sector": "সেক্টর অনুযায়ী দেখুন",
  "Industries hiring now": "যেসব ইন্ডাস্ট্রিতে এখন নিয়োগ চলছে",
  "Explore verified jobs across 10 active sectors in the Gulf and South Asia.": "গালফ ও দক্ষিণ এশিয়ার ১০টি সক্রিয় সেক্টরে যাচাইকৃত চাকরি দেখুন।",
  Hiring: "নিয়োগ চলছে",
  "Visa support available": "ভিসা সাপোর্ট আছে",
  "Updated today": "আজ আপডেট হয়েছে",
  "Verified employers only": "শুধু যাচাইকৃত নিয়োগকর্তা",
  "Create Job Alert": "জব অ্যালার্ট তৈরি করুন",
  "Active filters:": "সক্রিয় ফিল্টার:",
  "Most Relevant": "সবচেয়ে প্রাসঙ্গিক",
  "Newest First": "সর্বশেষ আগে",
  "Salary High to Low": "বেতন বেশি থেকে কম",
  "Deadline Soon": "ডেডলাইন শীঘ্রই",
  "List view": "লিস্ট ভিউ",
  "Compact view": "কমপ্যাক্ট ভিউ",
  Close: "বন্ধ করুন",
  "Set up alert": "অ্যালার্ট সেট করুন",
  "Upload your CV": "আপনার সিভি আপলোড করুন",
  "Let verified employers find you. Avg. 3 interview calls per month.": "যাচাইকৃত নিয়োগকর্তারা আপনাকে খুঁজে পাক। মাসে গড়ে ৩টি ইন্টারভিউ কল।",
  "Need help applying?": "আবেদনে সাহায্য দরকার?",
  "Talk to a ProbashiCareer advisor about your overseas application.": "আপনার বিদেশি আবেদন নিয়ে প্রবাসী ক্যারিয়ার অ্যাডভাইজারের সঙ্গে কথা বলুন।",
  "Chat now": "এখন চ্যাট করুন",
  "Top Hiring Countries": "শীর্ষ নিয়োগকারী দেশ",
  "Get emailed when new Facilities Management jobs are posted.": "নতুন ফ্যাসিলিটিজ ম্যানেজমেন্ট চাকরি পোস্ট হলে ইমেইল পান।",
  "Welcome back.": "আবার স্বাগতম।",
  "Start applying in minutes.": "কয়েক মিনিটেই আবেদন শুরু করুন।",
  "Track applications, manage your CV and get matched faster.": "আবেদন ট্র্যাক করুন, সিভি ম্যানেজ করুন এবং দ্রুত ম্যাচ পান।",
  "BMET licensed": "বিএমইটি লাইসেন্সপ্রাপ্ত",
  "Embassy attested employers": "দূতাবাস সত্যায়িত নিয়োগকর্তা",
  "Transparent contracts": "স্বচ্ছ চুক্তি",
  "Full name": "পূর্ণ নাম",
  Phone: "ফোন",
  Email: "ইমেইল",
  Password: "পাসওয়ার্ড",
  "Forgot?": "ভুলে গেছেন?",
  "Toggle password": "পাসওয়ার্ড দেখান/লুকান",
  "New here?": "নতুন এখানে?",
  "Create an account": "অ্যাকাউন্ট তৈরি করুন",
  "Already have an account?": "ইতিমধ্যে অ্যাকাউন্ট আছে?",
  "By continuing you agree to our": "চালিয়ে গেলে আপনি আমাদের",
  Terms: "শর্তাবলি",
  "Account created. Check your email to verify, then sign in.": "অ্যাকাউন্ট তৈরি হয়েছে। যাচাই করতে ইমেইল দেখুন, তারপর লগইন করুন।",
  "Welcome back!": "আবার স্বাগতম!",
  "Something went wrong": "কিছু সমস্যা হয়েছে",
};

const en = new Map(Object.entries(bn).map(([english, bangla]) => [bangla, english]));

const LanguageContext = createContext<LanguageContextValue | null>(null);
const originalText = new WeakMap<Text, string>();
const originalAttrs = new WeakMap<Element, Map<string, string>>();
const attrNames = ["placeholder", "aria-label", "title", "alt"];

function translateExact(text: string, language: Language) {
  if (language === "en") return en.get(text) ?? text;
  const normalized = text.replace(/Â·/g, "·").replace(/Ã‚Â·/g, "·").replace(/â€”/g, "—").replace(/â€“/g, "–");
  const normalizedExact = bn[normalized];
  if (normalizedExact) return normalizedExact;
  const exact = bn[text];
  if (exact) return exact;

  const openRoles = text.match(/^([\d,]+)\s+open roles(?:\s+·\s+updated today)?$/);
  if (openRoles) return `${openRoles[1]}টি খোলা পদ`;

  const activeSectors = text.match(/^([\d,]+)\s+active sectors across overseas and local markets\.$/);
  if (activeSectors) return `বিদেশি ও দেশীয় বাজারে ${activeSectors[1]}টি সক্রিয় সেক্টর।`;

  const openRolesNormalized = normalized.match(/^([\d,]+)\s+open roles(?:\s+·\s+updated today)?$/);
  if (openRolesNormalized) return `${openRolesNormalized[1]}টি খোলা পদ`;

  const activeSectorsNormalized = normalized.match(/^([\d,]+)\s+active sectors across overseas and local markets\.$/);
  if (activeSectorsNormalized) return `বিদেশি ও দেশীয় বাজারে ${activeSectorsNormalized[1]}টি সক্রিয় সেক্টর।`;

  const vacancies = normalized.match(/^([\d,]+)\s+vacancies$/);
  if (vacancies) return `${vacancies[1]}টি পদ`;

  const openJobs = normalized.match(/^([\d,]+)\s+open jobs$/);
  if (openJobs) return `${openJobs[1]}টি খোলা চাকরি`;

  const activeJobs = normalized.match(/^([\d,]+)\s+active jobs$/);
  if (activeJobs) return `${activeJobs[1]}টি সক্রিয় চাকরি`;

  const jobs = normalized.match(/^([\d,]+)\s+jobs$/);
  if (jobs) return `${jobs[1]}টি চাকরি`;

  const jobsFound = normalized.match(/^([\d,]+)\s+jobs found$/);
  if (jobsFound) return `${jobsFound[1]}টি চাকরি পাওয়া গেছে`;

  const industryJobs = normalized.match(/^(.+)\s+Jobs$/);
  if (industryJobs) return `${translateExact(industryJobs[1], language)} চাকরি`;

  const showingJobsIn = normalized.match(/^Showing\s+([\d,]+)\s+of\s+([\d,]+)\s+jobs in\s+(.+)$/);
  if (showingJobsIn) {
    return `${showingJobsIn[2]}টির মধ্যে ${showingJobsIn[1]}টি চাকরি দেখানো হচ্ছে, দেশ ${translateExact(showingJobsIn[3], language)}`;
  }

  const countryCount = normalized.match(/^(.+)\s+·\s+([\d,]+)$/);
  if (countryCount) return `${translateExact(countryCount[1], language)} · ${countryCount[2]}`;

  const searchPlaceholder = normalized.match(/^Search\s+(.+)$/);
  if (searchPlaceholder) return `সার্চ করুন ${translateExact(searchPlaceholder[1], language)}`;

  const flagAlt = normalized.match(/^(.+)\s+flag$/);
  if (flagAlt) return `${translateExact(flagAlt[1], language)} পতাকা`;

  const daysAgo = normalized.match(/^([\d,]+)d ago$/);
  if (daysAgo) return `${daysAgo[1]} দিন আগে`;

  const applied = normalized.match(/^([\d,]+)\s+applied$/);
  if (applied) return `${applied[1]} জন আবেদন করেছে`;

  const views = normalized.match(/^([\d.]+)k\s+views$/);
  if (views) return `${views[1]} হাজার ভিউ`;

  const applyBy = normalized.match(/^Apply by\s+(.+)$/);
  if (applyBy) return `আবেদনের শেষ তারিখ ${applyBy[1]}`;

  if (normalized === "Top: Facilities · Construction · Driving") {
    return "শীর্ষ: ফ্যাসিলিটিজ · কনস্ট্রাকশন · ড্রাইভিং";
  }

  const avgSalary = normalized.match(/^Avg\. salary\s+(.+)$/);
  if (avgSalary) return `গড় বেতন ${avgSalary[1]}`;

  const searchChip = normalized.match(/^Search:\s+(.+)$/);
  if (searchChip) return `সার্চ: ${searchChip[1]}`;

  const countryChip = normalized.match(/^Country:\s+(.+)$/);
  if (countryChip) return `দেশ: ${translateExact(countryChip[1], language)}`;

  const industryChip = normalized.match(/^Industry:\s+(.+)$/);
  if (industryChip) return `ইন্ডাস্ট্রি: ${translateExact(industryChip[1], language)}`;

  const typeChip = normalized.match(/^Type:\s+(.+)$/);
  if (typeChip) return `ধরন: ${translateExact(typeChip[1], language)}`;

  const industryDescription = normalized.match(/^Explore verified (.+) roles from trusted employers across Saudi Arabia, UAE, Qatar, Kuwait, and Bangladesh\.$/);
  if (industryDescription) {
    return `সৌদি আরব, ইউএই, কাতার, কুয়েত ও বাংলাদেশের বিশ্বস্ত নিয়োগকর্তাদের যাচাইকৃত ${translateExact(industryDescription[1], language)} চাকরি দেখুন।`;
  }

  return text;
}

function translateNodeText(node: Text, language: Language) {
  const current = node.nodeValue ?? "";
  const original = originalText.get(node) ?? (language === "en" ? translateExact(current.trim(), "en") || current : current);
  if (!originalText.has(node)) originalText.set(node, original);

  if (language === "en") {
    const leading = current.match(/^\s*/)?.[0] ?? "";
    const trailing = current.match(/\s*$/)?.[0] ?? "";
    const restored = translateExact(original.trim(), "en");
    const nextValue = `${leading}${restored}${trailing}`;
    if (current !== nextValue) node.nodeValue = nextValue;
    return;
  }

  const leading = original.match(/^\s*/)?.[0] ?? "";
  const trailing = original.match(/\s*$/)?.[0] ?? "";
  const trimmed = original.trim();
  if (!trimmed) return;

  const translated = translateExact(trimmed, language);
  const nextValue = `${leading}${translated}${trailing}`;
  if (current !== nextValue) node.nodeValue = nextValue;
}

function translateElementAttrs(element: Element, language: Language) {
  for (const attr of attrNames) {
    const current = element.getAttribute(attr);
    if (!current) continue;

    let originals = originalAttrs.get(element);
    if (!originals) {
      originals = new Map();
      originalAttrs.set(element, originals);
    }

    if (!originals.has(attr)) originals.set(attr, language === "en" ? translateExact(current, "en") : current);
    const original = originals.get(attr) ?? current;
    const translated = translateExact(original, language);
    if (current !== translated) element.setAttribute(attr, translated);
  }
}

function shouldSkipElement(element: Element) {
  return ["SCRIPT", "STYLE", "NOSCRIPT", "SVG"].includes(element.tagName);
}

function applyLanguage(root: Node, language: Language) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateNodeText(root as Text, language);
    return;
  }

  if (root.nodeType === Node.ELEMENT_NODE) {
    const element = root as Element;
    if (shouldSkipElement(element)) return;
    translateElementAttrs(element, language);
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      if (node.nodeType === Node.ELEMENT_NODE && shouldSkipElement(node as Element)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node = walker.nextNode();
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) translateNodeText(node as Text, language);
    if (node.nodeType === Node.ELEMENT_NODE) translateElementAttrs(node as Element, language);
    node = walker.nextNode();
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === "undefined") return "bn";
    return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "bn";
  });

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language === "bn" ? "bn" : "en";
    document.documentElement.classList.toggle("font-bangla", language === "bn");
    applyLanguage(document.body, language);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") applyLanguage(mutation.target, language);
        if (mutation.type === "characterData") {
          originalText.delete(mutation.target as Text);
          applyLanguage(mutation.target, language);
        }
        for (const node of Array.from(mutation.addedNodes)) {
          if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
            applyLanguage(node, language);
          }
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: attrNames,
      characterData: true,
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === "bn" ? "en" : "bn"),
      t: (text) => translateExact(text, language),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
