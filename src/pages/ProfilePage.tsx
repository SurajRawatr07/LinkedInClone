import React, { useState } from "react";
import {
  MapPin, Link2, Mail, Edit3, Plus, ChevronDown, ChevronUp,
  Star, Award, Briefcase, GraduationCap, ExternalLink, Share2,
  UserPlus, MessageSquare, MoreHorizontal, Check, Eye, Download,
  Github, Globe, Code2, Layers, BookOpen, Trophy, Flame
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import PostCard from "@/components/features/PostCard";
import {
  currentUser, mockExperiences, mockEducation,
  mockSkills, mockCertifications, mockPosts
} from "@/constants/mockData";
import { formatNumber, formatConnectionCount } from "@/lib/utils";
import coverBanner from "@/assets/cover-banner.jpg";

interface ProfilePageProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
}

const projects = [
  {
    id: "proj1",
    title: "ONE IDE — Online Code Runner",
    description: "A browser-based multi-language code editor and runner with real-time output, syntax highlighting, and shareable snippets.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=220&fit=crop",
    tech: ["React", "TypeScript", "Monaco Editor", "Node.js"],
    live: "#",
    github: "#",
  },
  {
    id: "proj2",
    title: "README Design Kit",
    description: "A toolkit for developers to create beautiful, professional GitHub README files with drag-and-drop components and live preview.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=220&fit=crop",
    tech: ["React", "Tailwind CSS", "Markdown"],
    live: "#",
    github: "#",
  },
  {
    id: "proj3",
    title: "LinkedIn Clone",
    description: "A pixel-perfect LinkedIn frontend clone with full responsive design, dark mode, messaging, notifications, and feed.",
    image: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&h=220&fit=crop",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    live: "#",
    github: "#",
  },
  {
    id: "proj4",
    title: "NS Technology Coaching Website",
    description: "Professional coaching institute website with course listings, faculty profiles, admission forms, and student portal.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=220&fit=crop",
    tech: ["HTML", "CSS", "JavaScript"],
    live: "#",
    github: "#",
  },
  {
    id: "proj5",
    title: "Educational Resource Website",
    description: "A centralized platform for students to access study materials, video lectures, notes, and practice tests.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=220&fit=crop",
    tech: ["React", "Tailwind CSS", "REST APIs"],
    live: "#",
    github: "#",
  },
  {
    id: "proj6",
    title: "Developer Community Platform",
    description: "A community-driven platform for developers to share resources, connect, post opportunities, and collaborate.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=220&fit=crop",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    live: "#",
    github: "#",
  },
];

const ProfilePage: React.FC<ProfilePageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "about" | "activity">("posts");
  const [skills, setSkills] = useState(mockSkills);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const visibleSkills = skillsExpanded ? skills : skills.slice(0, 6);

  const toggleEndorse = (skillId: string) => {
    setSkills(prev =>
      prev.map(s =>
        s.id === skillId
          ? { ...s, endorsed: !s.endorsed, endorsements: s.endorsed ? s.endorsements - 1 : s.endorsements + 1 }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} />

      <main className="max-w-[860px] mx-auto px-4 pt-16 pb-20 md:pb-6">
        <div className="mt-4 space-y-3">

          {/* ===== PROFILE CARD ===== */}
          <div className="card overflow-hidden">
            {/* Cover Banner */}
            <div className="h-36 md:h-52 relative">
              <img src={coverBanner} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
              {/* Edit cover */}
              <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 rounded-full transition-all backdrop-blur-sm shadow-sm">
                <Edit3 className="w-4 h-4 text-[#000000E6] dark:text-white" />
              </button>
            </div>

            <div className="px-4 md:px-6 pb-5 relative">
              {/* Avatar Row */}
              <div className="flex items-end justify-between -mt-12 md:-mt-16 mb-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white dark:border-[#1D2226] shadow-xl overflow-hidden bg-gradient-to-br from-[#0A66C2] to-[#5B9DD9] flex items-center justify-center">
                    <span className="text-3xl md:text-5xl font-bold text-white select-none">SR</span>
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 w-4 h-4 md:w-5 md:h-5 bg-green-500 border-[3px] border-white dark:border-[#1D2226] rounded-full shadow-sm" />
                  {/* Edit avatar */}
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-white dark:bg-[#1D2226] border-2 border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Edit3 className="w-3 h-3 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap justify-end mt-14 md:mt-0">
                  <button
                    onClick={() => setIsConnected(!isConnected)}
                    className={`flex items-center gap-1.5 font-bold px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                      isConnected
                        ? "border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10"
                        : "bg-[#0A66C2] hover:bg-[#0958A8] text-white shadow-sm"
                    }`}
                  >
                    {isConnected ? <><Check className="w-4 h-4" />Connected</> : <><UserPlus className="w-4 h-4" />Connect</>}
                  </button>
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`flex items-center gap-1.5 font-bold px-4 py-1.5 rounded-full text-sm border transition-all duration-200 ${
                      isFollowing
                        ? "border-gray-400 text-[#666666] dark:text-[#B0B7BE] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                        : "border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10"
                    }`}
                  >
                    {isFollowing ? <><Check className="w-4 h-4" />Following</> : "Follow"}
                  </button>
                  <button className="flex items-center gap-1.5 border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10 font-bold px-4 py-1.5 rounded-full text-sm transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </button>
                  <button className="hidden sm:flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE] hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-4 py-1.5 rounded-full text-sm transition-colors">
                    <Download className="w-4 h-4" />
                    Resume
                  </button>
                  <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors">
                    <Share2 className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                  <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                </div>
              </div>

              {/* Name, badges, headline */}
              <div>
                <div className="flex items-center flex-wrap gap-2 mt-1">
                  <h1 className="text-xl md:text-2xl font-bold text-[#000000E6] dark:text-white">{currentUser.name}</h1>
                  {/* Verified badge */}
                  <span className="verified-badge text-[10px] w-5 h-5">✓</span>
                  {/* Open To Work */}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                    #OpenToWork
                  </span>
                </div>

                <p className="text-[15px] text-[#000000E6] dark:text-[#E7E9EA] mt-1.5 leading-snug">
                  {currentUser.headline}
                </p>

                {/* Location & connections */}
                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2.5">
                  <div className="flex items-center gap-1 text-[#666666] dark:text-[#B0B7BE] text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{currentUser.location}</span>
                  </div>
                  <span className="text-[#666666] dark:text-[#B0B7BE] text-sm">·</span>
                  <button className="text-[#0A66C2] dark:text-[#5B9DD9] font-semibold text-sm hover:underline">
                    {formatConnectionCount(currentUser.connectionCount)} connections
                  </button>
                  <span className="text-[#666666] dark:text-[#B0B7BE] text-sm">·</span>
                  <button className="text-[#0A66C2] dark:text-[#5B9DD9] font-semibold text-sm hover:underline flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {formatNumber(currentUser.profileViews)} views
                  </button>
                </div>

                {/* Links row */}
                <div className="flex items-center flex-wrap gap-3 mt-3">
                  <a href={`mailto:${currentUser.email}`} className="flex items-center gap-1.5 text-sm text-[#0A66C2] dark:text-[#5B9DD9] hover:underline">
                    <Mail className="w-4 h-4" />{currentUser.email}
                  </a>
                  <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">|</span>
                  <button className="hidden sm:flex items-center gap-1.5 text-sm text-[#0A66C2] dark:text-[#5B9DD9] hover:underline">
                    <Globe className="w-4 h-4" />Portfolio
                  </button>
                  <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">|</span>
                  <button className="hidden sm:flex items-center gap-1.5 text-sm text-[#0A66C2] dark:text-[#5B9DD9] hover:underline">
                    <Github className="w-4 h-4" />GitHub
                  </button>
                  <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">|</span>
                  <button className="flex items-center gap-1.5 text-sm text-[#0A66C2] dark:text-[#5B9DD9] hover:underline">
                    <Link2 className="w-4 h-4" />Contact info
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                {[
                  { label: "Connections", value: "500+", icon: <UserPlus className="w-4 h-4" />, sublabel: "Grow your network" },
                  { label: "Followers", value: formatNumber(currentUser.followerCount), icon: <Flame className="w-4 h-4" />, sublabel: "People following you" },
                  { label: "Profile views", value: formatNumber(currentUser.profileViews), icon: <Eye className="w-4 h-4" />, sublabel: "Past 90 days" },
                  { label: "Post impressions", value: formatNumber(currentUser.postImpressions), icon: <Trophy className="w-4 h-4" />, sublabel: "Past 90 days" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-start p-3 rounded-xl bg-[#F3F2EF] dark:bg-[#2D3741] hover:bg-[#E9E5DF] dark:hover:bg-[#38434F] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-1.5 text-[#0A66C2] dark:text-[#5B9DD9] mb-1">
                      {stat.icon}
                      <span className="text-lg font-bold group-hover:underline">{stat.value}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#000000E6] dark:text-white">{stat.label}</p>
                    <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE] mt-0.5">{stat.sublabel}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ===== PROFILE TABS ===== */}
          <div className="card px-4">
            <div className="flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto hide-scrollbar">
              {(["posts", "about", "activity"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold capitalize transition-all border-b-2 -mb-px whitespace-nowrap ${
                    activeTab === tab
                      ? "border-[#0A66C2] text-[#0A66C2] dark:text-[#5B9DD9]"
                      : "border-transparent text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white hover:border-gray-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* ===== ABOUT ===== */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white">About</h2>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Edit3 className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
              <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA] leading-relaxed">{currentUser.about}</p>
              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["React", "TypeScript", "JavaScript", "Tailwind CSS", "Open Source", "Hackathons", "DSA"].map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-xs font-semibold bg-[#EEF3F8] dark:bg-[#38434F] text-[#0A66C2] dark:text-[#5B9DD9] px-3 py-1 rounded-full">
                    <Code2 className="w-3 h-3" />{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ===== FEATURED PROJECTS ===== */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#915907]" />
                  Featured Projects
                </h2>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Plus className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden hover:shadow-md transition-all duration-200 group bg-white dark:bg-[#1D2226]"
                  >
                    <div className="relative overflow-hidden h-36">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-bold text-[#000000E6] dark:text-white line-clamp-1">{proj.title}</h3>
                      <p className="text-[12px] text-[#666666] dark:text-[#B0B7BE] mt-1 line-clamp-2 leading-relaxed">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {proj.tech.slice(0, 3).map(t => (
                          <span key={t} className="text-[10px] font-semibold bg-[#EEF3F8] dark:bg-[#38434F] text-[#0A66C2] dark:text-[#5B9DD9] px-2 py-0.5 rounded-full">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-3">
                        <a
                          href={proj.live}
                          className="flex items-center gap-1 text-xs font-semibold text-white bg-[#0A66C2] hover:bg-[#0958A8] px-3 py-1.5 rounded-full transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" /> View
                        </a>
                        <a
                          href={proj.github}
                          className="flex items-center gap-1 text-xs font-semibold text-[#000000E6] dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1.5 rounded-full transition-colors"
                        >
                          <Github className="w-3 h-3" /> GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== EXPERIENCE ===== */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Experience
                </h2>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Plus className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Edit3 className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                </div>
              </div>
              <div className="space-y-6">
                {mockExperiences.map((exp) => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <img src={exp.companyLogo} alt={exp.company} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#000000E6] dark:text-white text-[15px]">{exp.title}</h3>
                      <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA]">{exp.company}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate}
                        {exp.current && <span className="ml-1 text-green-600 dark:text-green-400 font-semibold">· Current</span>}
                      </p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{exp.location}</p>
                      {exp.description && (
                        <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA] mt-2 leading-relaxed">{exp.description}</p>
                      )}
                      {exp.skills && exp.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exp.skills.map(s => (
                            <span key={s} className="text-xs bg-[#EEF3F8] dark:bg-[#38434F] text-[#000000E6] dark:text-white px-2 py-0.5 rounded-full">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== EDUCATION ===== */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </h2>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Plus className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
              <div className="space-y-5">
                {mockEducation.map((edu) => (
                  <div key={edu.id} className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <img src={edu.schoolLogo} alt={edu.school} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#000000E6] dark:text-white text-[15px]">{edu.degree}</h3>
                      <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA]">{edu.field}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">
                        {edu.startYear} – {edu.endYear}
                        {edu.grade && (
                          <span className="ml-2 font-semibold text-[#0A66C2] dark:text-[#5B9DD9]">{edu.grade}</span>
                        )}
                      </p>
                      {edu.activities && (
                        <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-1.5 leading-relaxed">{edu.activities}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== SKILLS ===== */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Skills
                </h2>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Plus className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
              <div className="space-y-3.5">
                {visibleSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between group">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#000000E6] dark:text-white">{skill.name}</span>
                        {skill.category === "Top" && (
                          <span className="text-[10px] font-bold bg-[#EAF4FF] dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-[#5B9DD9] px-1.5 py-0.5 rounded">
                            Top
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">
                        {skill.endorsements} endorsement{skill.endorsements !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleEndorse(skill.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                        skill.endorsed
                          ? "border-[#0A66C2] text-[#0A66C2] bg-[#EAF4FF] dark:bg-[#0A66C2]/20 dark:text-[#5B9DD9]"
                          : "border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE] hover:border-[#0A66C2] hover:text-[#0A66C2] dark:hover:text-[#5B9DD9]"
                      }`}
                    >
                      {skill.endorsed ? <><Check className="w-3 h-3" /> Endorsed</> : "Endorse"}
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSkillsExpanded(!skillsExpanded)}
                className="flex items-center gap-1 mt-4 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors"
              >
                {skillsExpanded
                  ? <><ChevronUp className="w-4 h-4" />Show less</>
                  : <><ChevronDown className="w-4 h-4" />Show all {skills.length} skills</>
                }
              </button>
            </div>
          )}

          {/* ===== CERTIFICATIONS ===== */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#915907]" />
                  Licenses &amp; Certifications
                </h2>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Plus className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
              <div className="space-y-5">
                {mockCertifications.map((cert) => (
                  <div key={cert.id} className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                      <img src={cert.issuerLogo} alt={cert.issuer} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#000000E6] dark:text-white text-[15px]">{cert.name}</h3>
                      <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA]">{cert.issuer}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">
                        Issued {cert.issueDate}
                        {cert.expiryDate ? ` · Expires ${cert.expiryDate}` : ""}
                      </p>
                      {cert.credentialId && (
                        <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">Credential ID: {cert.credentialId}</p>
                      )}
                      <button className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-[#0A66C2] dark:text-[#5B9DD9] hover:underline">
                        <BookOpen className="w-3 h-3" /> Show credential
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== ACTIVITY TAB ===== */}
          {activeTab === "activity" && (
            <div className="space-y-3">
              <div className="card p-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white mb-1">Activity</h2>
                <p className="text-sm text-[#666666] dark:text-[#B0B7BE]">{formatNumber(currentUser.followerCount)} followers</p>
              </div>
              {mockPosts.filter(p => p.author.id === "u1").map(post => (
                <PostCard key={post.id} post={post} />
              ))}
              {mockPosts.filter(p => p.author.id === "u1").length === 0 && (
                <div className="card p-8 text-center">
                  <Flame className="w-10 h-10 mx-auto text-[#0A66C2] mb-3" />
                  <p className="text-sm font-semibold text-[#000000E6] dark:text-white">No posts yet</p>
                  <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-1">Start sharing your thoughts and projects.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
