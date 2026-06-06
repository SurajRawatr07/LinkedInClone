import React, { useState } from "react";
import {
  Search, MapPin, Filter, Bookmark, BookmarkCheck,
  Briefcase, Clock, Users, Zap, X, ChevronDown, Star, ExternalLink,
  Building2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { JobCardSkeleton } from "@/components/features/SkeletonLoader";

interface JobsPageProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
}

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: string;
  salary?: string;
  postedDate: string;
  applicants: number;
  description: string;
  skills: string[];
  isNew?: boolean;
  isEasyApply?: boolean;
  isSaved?: boolean;
  matchScore?: number;
}

const FILTERS = ["Easy Apply", "Remote", "Full-time", "Part-time", "Contract", "Internship"];

const formatNumber = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
};

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Google",
    companyLogo: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=80&h=80&fit=crop",
    location: "Bangalore, India (Remote)",
    type: "Full-time",
    salary: "₹18L – ₹28L/yr",
    postedDate: "2 days ago",
    applicants: 847,
    isNew: true,
    isEasyApply: true,
    matchScore: 94,
    description:
      "We are looking for a talented Frontend Developer to join our team. You will be responsible for building and maintaining high-quality web applications using modern technologies like React, TypeScript, and Tailwind CSS.",
    skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript", "HTML", "CSS", "Git"],
  },
  {
    id: "2",
    title: "React Developer",
    company: "Microsoft",
    companyLogo: "https://images.unsplash.com/photo-1642132652806-8aa9e542a332?w=80&h=80&fit=crop",
    location: "Hyderabad, India",
    type: "Full-time",
    salary: "₹22L – ₹35L/yr",
    postedDate: "1 week ago",
    applicants: 1200,
    isEasyApply: true,
    matchScore: 88,
    description:
      "Join Microsoft's world-class engineering team to build next-generation cloud products. You will work closely with designers and backend engineers to deliver exceptional user experiences.",
    skills: ["React", "Redux", "TypeScript", "Azure", "REST APIs", "Node.js"],
  },
  {
    id: "3",
    title: "UI/UX Engineer",
    company: "Flipkart",
    companyLogo: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=80&h=80&fit=crop",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹14L – ₹20L/yr",
    postedDate: "3 days ago",
    applicants: 562,
    isNew: true,
    matchScore: 82,
    description:
      "Flipkart is looking for a skilled UI/UX Engineer to craft beautiful and functional interfaces. You will collaborate with product managers and backend teams to ship features that delight millions of users.",
    skills: ["Figma", "React", "CSS", "Tailwind CSS", "User Research", "Prototyping"],
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "Razorpay",
    companyLogo: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=80&h=80&fit=crop",
    location: "Pune, India (Hybrid)",
    type: "Full-time",
    salary: "₹20L – ₹32L/yr",
    postedDate: "5 days ago",
    applicants: 934,
    isEasyApply: true,
    matchScore: 79,
    description:
      "Razorpay is hiring a Full Stack Developer to help power India's leading payment gateway. You will own features end-to-end from frontend to API design and database optimisation.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
  },
  {
    id: "5",
    title: "Frontend Intern",
    company: "Zomato",
    companyLogo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&h=80&fit=crop",
    location: "Delhi, India",
    type: "Internship",
    salary: "₹25,000/month",
    postedDate: "1 day ago",
    applicants: 2100,
    isNew: true,
    isEasyApply: true,
    matchScore: 91,
    description:
      "Exciting internship opportunity at Zomato to work on real production features. Learn from senior engineers, ship code in your first week, and gain hands-on experience with a large-scale consumer app.",
    skills: ["React", "JavaScript", "HTML", "CSS", "Git"],
  },
  {
    id: "6",
    title: "JavaScript Developer",
    company: "Swiggy",
    companyLogo: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&h=80&fit=crop",
    location: "Remote",
    type: "Remote",
    salary: "₹12L – ₹18L/yr",
    postedDate: "2 weeks ago",
    applicants: 675,
    description:
      "Swiggy's frontend team is looking for a JavaScript Developer to improve performance and build new features for our web platform serving millions of daily active users.",
    skills: ["JavaScript", "React", "Webpack", "Performance", "REST APIs"],
  },
  {
    id: "7",
    title: "React Native Developer",
    company: "CRED",
    companyLogo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=80&h=80&fit=crop",
    location: "Bangalore, India",
    type: "Full-time",
    salary: "₹25L – ₹40L/yr",
    postedDate: "4 days ago",
    applicants: 420,
    isNew: true,
    matchScore: 75,
    description:
      "CRED is building premium financial products for responsible credit card users. Join our mobile team to craft pixel-perfect, silky-smooth React Native experiences.",
    skills: ["React Native", "TypeScript", "iOS", "Android", "Redux", "Animations"],
  },
  {
    id: "8",
    title: "Angular Developer",
    company: "Infosys",
    companyLogo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=80&h=80&fit=crop",
    location: "Chennai, India",
    type: "Contract",
    salary: "₹10L – ₹16L/yr",
    postedDate: "1 week ago",
    applicants: 310,
    isEasyApply: true,
    description:
      "Infosys Digital is seeking an Angular Developer for a 12-month contract engagement with a leading financial services client. Strong RxJS and NgRx knowledge preferred.",
    skills: ["Angular", "TypeScript", "RxJS", "NgRx", "HTML", "CSS"],
  },
];

// ─── Job Card Skeleton ────────────────────────────────────────────────────────
// (re-exported from SkeletonLoader but also usable inline)
const LocalJobCardSkeleton: React.FC = () => (
  <div className="card p-4 animate-pulse">
    <div className="flex items-start gap-3">
      <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  </div>
);

// ─── Job Detail Panel ─────────────────────────────────────────────────────────
const JobDetailPanel: React.FC<{ job: Job | null; onClose: () => void }> = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="card h-full overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-[#1E2A35] z-10 flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-semibold text-[#0A66C2]">Job Details</span>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
        </button>
      </div>

      <div className="p-5">
        {/* Company */}
        <div className="flex items-start gap-4 mb-4">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-gray-600 shadow-sm"
          />
          <div>
            <h2 className="text-xl font-bold text-[#000000E6] dark:text-white">{job.title}</h2>
            <p className="text-base text-[#000000E6] dark:text-[#E7E9EA] font-medium">{job.company}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#666666] dark:text-[#B0B7BE]" />
              <span className="text-sm text-[#666666] dark:text-[#B0B7BE]">{job.location}</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.isNew && (
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold px-2.5 py-1 rounded-full">
              New
            </span>
          )}
          {job.isEasyApply && (
            <span className="bg-[#EAF4FF] dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-[#5B9DD9] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3" />Easy Apply
            </span>
          )}
          {job.matchScore && (
            <span className="bg-[#EAF4FF] dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-[#5B9DD9] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />{job.matchScore}% match
            </span>
          )}
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-3 mb-4 p-4 bg-[#F3F2EF] dark:bg-[#2D3741] rounded-xl">
          {[
            { icon: Briefcase, label: "Job type", value: job.type },
            { icon: Clock, label: "Posted", value: job.postedDate },
            { icon: Users, label: "Applicants", value: `${formatNumber(job.applicants)}+` },
            { icon: Star, label: "Salary", value: job.salary || "Competitive" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-2">
              <item.icon className="w-4 h-4 text-[#0A66C2] mt-0.5 shrink-0" />
              <div>
                <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{item.label}</p>
                <p className="text-sm font-semibold text-[#000000E6] dark:text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="font-bold text-[#000000E6] dark:text-white mb-2">About the role</h3>
          <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA] leading-relaxed">{job.description}</p>
        </div>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="font-bold text-[#000000E6] dark:text-white mb-2">Skills required</h3>
          <div className="flex flex-wrap gap-2">
            {job.skills.map(skill => (
              <span
                key={skill}
                className="bg-[#EEF3F8] dark:bg-[#38434F] text-[#000000E6] dark:text-white px-3 py-1.5 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex gap-3">
          {job.isEasyApply ? (
            <button className="flex-1 bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold py-3 rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" />
              Easy Apply
            </button>
          ) : (
            <button className="flex-1 bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold py-3 rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Apply on company site
            </button>
          )}
          <button className="border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10 font-bold px-4 py-3 rounded-full transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const JobsPage: React.FC<JobsPageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(mockJobs[0]);
  const [jobs, setJobs] = useState(mockJobs);
  const [loading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (f: string) => {
    setActiveFilters(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    );
  };

  const toggleSave = (id: string) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, isSaved: !j.isSaved } : j));
  };

  const filteredJobs = jobs.filter(j => {
    const q = search.toLowerCase();
    const matches = !q || j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q);
    const loc = !location || j.location.toLowerCase().includes(location.toLowerCase());
    const filters =
      activeFilters.length === 0 ||
      activeFilters.some(f => {
        if (f === "Easy Apply") return j.isEasyApply;
        if (f === "Remote") return j.type === "Remote";
        return j.type === f;
      });
    return matches && loc && filters;
  });

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} />

      <main className="max-w-[1128px] mx-auto px-4 pt-16 pb-20 md:pb-4">
        <div className="mt-4 space-y-3">
          {/* Search Bar */}
          <div className="card p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2 flex-1 bg-[#EEF3F8] dark:bg-[#38434F] rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#0A66C2]/30 transition-all">
                <Search className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE] shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search jobs by title or company"
                  className="bg-transparent text-sm text-[#000000E6] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none flex-1"
                />
              </div>
              <div className="flex items-center gap-2 flex-1 bg-[#EEF3F8] dark:bg-[#38434F] rounded-lg px-3 py-2.5 focus-within:ring-2 focus-within:ring-[#0A66C2]/30 transition-all">
                <MapPin className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE] shrink-0" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, state, or remote"
                  className="bg-transparent text-sm text-[#000000E6] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none flex-1"
                />
              </div>
              <button className="bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold px-6 py-2.5 rounded-lg transition-all duration-200 active:scale-95 shrink-0">
                Search
              </button>
            </div>

            {/* Filter chips */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 hover:border-[#0A66C2] text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] px-3 py-1.5 rounded-full transition-colors"
              >
                <Filter className="w-4 h-4" />
                All filters
                <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>

              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => toggleFilter(f)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-150 ${
                    activeFilters.includes(f)
                      ? "bg-[#EAF4FF] dark:bg-[#0A66C2]/20 border-[#0A66C2] text-[#0A66C2] dark:text-[#5B9DD9]"
                      : "border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                  }`}
                >
                  {f}
                  {activeFilters.includes(f) && <span className="ml-1">×</span>}
                </button>
              ))}

              {activeFilters.length > 0 && (
                <button
                  onClick={() => setActiveFilters([])}
                  className="text-xs font-semibold text-red-500 hover:underline ml-1"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="flex gap-3">
            {/* Job List */}
            <div className={`flex-1 space-y-2 ${selectedJob ? "lg:max-w-[380px] lg:shrink-0" : ""}`}>
              <p className="text-sm text-[#666666] dark:text-[#B0B7BE] px-1">
                {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
                {activeFilters.length > 0 ? " · Filtered" : ""}
              </p>

              {loading ? (
                <>
                  <LocalJobCardSkeleton />
                  <LocalJobCardSkeleton />
                  <LocalJobCardSkeleton />
                </>
              ) : (
                filteredJobs.map(job => (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className={`card p-4 cursor-pointer transition-all duration-150 hover:shadow-card-hover ${
                      selectedJob?.id === job.id
                        ? "border-2 border-[#0A66C2] bg-[#EAF4FF]/30 dark:bg-[#0A66C2]/5"
                        : "border-2 border-transparent"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={job.companyLogo}
                        alt={job.company}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-bold text-[#000000E6] dark:text-white text-sm hover:text-[#0A66C2] transition-colors line-clamp-1">
                              {job.title}
                            </h3>
                            <p className="text-xs text-[#000000E6] dark:text-[#E7E9EA] mt-0.5">{job.company}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-[#666666] dark:text-[#B0B7BE]" />
                              <p className="text-xs text-[#666666] dark:text-[#B0B7BE] truncate">{job.location}</p>
                            </div>
                          </div>
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleSave(job.id); }}
                            className="shrink-0 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            {job.isSaved
                              ? <BookmarkCheck className="w-5 h-5 text-[#0A66C2]" />
                              : <Bookmark className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />}
                          </button>
                        </div>

                        {job.salary && (
                          <p className="text-xs font-semibold text-[#057642] dark:text-green-400 mt-1.5">
                            {job.salary}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {job.isNew && (
                            <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded-full">
                              New
                            </span>
                          )}
                          {job.isEasyApply && (
                            <span className="text-[10px] font-bold bg-[#EAF4FF] dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-[#5B9DD9] px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                              <Zap className="w-2.5 h-2.5" />Easy Apply
                            </span>
                          )}
                          {job.matchScore && (
                            <span className="text-[10px] font-bold bg-[#EAF4FF] dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-[#5B9DD9] px-1.5 py-0.5 rounded-full">
                              {job.matchScore}% match
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-[#666666] dark:text-[#B0B7BE]" />
                          <span className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{job.postedDate}</span>
                          <span className="text-[#666666] dark:text-[#B0B7BE] text-[11px]">·</span>
                          <Users className="w-3 h-3 text-[#666666] dark:text-[#B0B7BE]" />
                          <span className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">
                            {formatNumber(job.applicants)} applicants
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {filteredJobs.length === 0 && (
                <div className="card p-8 text-center">
                  <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                  <p className="font-semibold text-[#000000E6] dark:text-white">No jobs found</p>
                  <p className="text-sm text-[#666666] dark:text-[#B0B7BE] mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>

            {/* Detail Panel */}
            {selectedJob && (
              <div className="hidden lg:block flex-1 sticky top-16 h-[calc(100vh-80px)] overflow-hidden">
                <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;
