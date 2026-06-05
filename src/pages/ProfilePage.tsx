import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin, Link2, Mail, Edit3, Plus, ChevronDown, ChevronUp,
  Star, Award, Briefcase, GraduationCap, ExternalLink, Share2,
  UserPlus, MessageSquare, MoreHorizontal, Check, Eye
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

const ProfilePage: React.FC<ProfilePageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "about" | "activity">("posts");
  const [skills, setSkills] = useState(mockSkills);
  const [isFollowing, setIsFollowing] = useState(false);
  const visibleSkills = skillsExpanded ? skills : skills.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} />

      <main className="max-w-[860px] mx-auto px-4 pt-16 pb-20 md:pb-4">
        <div className="mt-4 space-y-2">

          {/* === PROFILE CARD === */}
          <div className="card overflow-hidden">
            {/* Cover */}
            <div className="h-36 md:h-48 relative">
              <img src={coverBanner} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
              <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-black/40 hover:bg-white dark:hover:bg-black/60 rounded-full transition-all backdrop-blur-sm">
                <Edit3 className="w-4 h-4 text-[#000000E6] dark:text-white" />
              </button>
            </div>

            <div className="px-4 md:px-6 pb-5 relative">
              {/* Avatar */}
              <div className="flex items-end justify-between -mt-10 mb-4">
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-[#1D2226] shadow-lg"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-3 border-white dark:border-[#1D2226] rounded-full border-[3px]" />
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-white dark:bg-[#1D2226] border-2 border-gray-200 dark:border-gray-600 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <Edit3 className="w-3 h-3 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap justify-end">
                  <button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`flex items-center gap-1.5 font-bold px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                      isFollowing
                        ? "border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10"
                        : "bg-[#0A66C2] hover:bg-[#0958A8] text-white"
                    }`}
                  >
                    {isFollowing ? <><Check className="w-4 h-4" />Following</> : <><UserPlus className="w-4 h-4" />Follow</>}
                  </button>
                  <button className="flex items-center gap-1.5 border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10 font-bold px-4 py-1.5 rounded-full text-sm transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Message
                  </button>
                  <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors">
                    <Share2 className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                  <button className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                  </button>
                </div>
              </div>

              {/* Name & Info */}
              <div>
                <div className="flex items-center flex-wrap gap-2">
                  <h1 className="text-2xl font-bold text-[#000000E6] dark:text-white">{currentUser.name}</h1>
                  {currentUser.isVerified && <span className="verified-badge text-sm w-5 h-5">✓</span>}
                  {currentUser.isPremium && (
                    <span className="premium-badge">Premium</span>
                  )}
                </div>
                <p className="text-base text-[#000000E6] dark:text-[#E7E9EA] mt-1">{currentUser.headline}</p>

                <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-2">
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
                    {currentUser.profileViews} profile views
                  </button>
                </div>

                {/* Contact */}
                <div className="flex items-center gap-3 mt-3">
                  <a href={`mailto:${currentUser.email}`} className="flex items-center gap-1.5 text-sm text-[#0A66C2] hover:underline">
                    <Mail className="w-4 h-4" />{currentUser.email}
                  </a>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <button className="flex items-center gap-1.5 text-sm text-[#0A66C2] hover:underline">
                    <Link2 className="w-4 h-4" />Contact info
                  </button>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex gap-6 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                {[
                  { label: "Profile views", value: currentUser.profileViews, sublabel: "Past 90 days" },
                  { label: "Post impressions", value: formatNumber(currentUser.postImpressions), sublabel: "Past 90 days" },
                  { label: "Followers", value: formatNumber(currentUser.followerCount), sublabel: "" },
                ].map((stat) => (
                  <div key={stat.label} className="cursor-pointer group">
                    <p className="text-base font-bold text-[#0A66C2] dark:text-[#5B9DD9] group-hover:underline">{stat.value}</p>
                    <p className="text-xs font-semibold text-[#000000E6] dark:text-white">{stat.label}</p>
                    {stat.sublabel && <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{stat.sublabel}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="card px-4">
            <div className="flex border-b border-gray-100 dark:border-gray-700">
              {(["posts", "about", "activity"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-3 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${
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

          {/* About */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white">About</h2>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Edit3 className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
              <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA] leading-relaxed whitespace-pre-line">{currentUser.about}</p>
            </div>
          )}

          {/* Featured */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#915907]" />
                  Featured
                </h2>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Plus className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
                {[
                  { title: "Building for Scale: Lessons from 10B Requests/Day", type: "Article", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=120&fit=crop" },
                  { title: "Google I/O 2026 — Infrastructure Talk", type: "Post", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=120&fit=crop" },
                ].map((item) => (
                  <div key={item.title} className="shrink-0 w-52 border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden hover:shadow-card-hover transition-shadow cursor-pointer group">
                    <img src={item.image} alt={item.title} className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-3">
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] uppercase font-medium">{item.type}</p>
                      <p className="text-sm font-semibold text-[#000000E6] dark:text-white mt-0.5 line-clamp-2">{item.title}</p>
                      <button className="mt-2 flex items-center gap-1 text-xs text-[#0A66C2] font-semibold hover:underline">
                        <ExternalLink className="w-3 h-3" /> View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
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
                    <img src={exp.companyLogo} alt={exp.company} className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#000000E6] dark:text-white text-[15px]">{exp.title}</h3>
                      <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA]">{exp.company}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">
                        {exp.startDate} – {exp.current ? "Present" : exp.endDate} · {exp.current ? `${new Date().getFullYear() - parseInt(exp.startDate.split(" ")[1])} yrs` : ""}
                      </p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{exp.location}</p>
                      {exp.description && (
                        <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA] mt-2 leading-relaxed">{exp.description}</p>
                      )}
                      {exp.skills && (
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

          {/* Education */}
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
                    <img src={edu.schoolLogo} alt={edu.school} className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-[#000000E6] dark:text-white text-[15px]">{edu.school}</h3>
                      <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA]">{edu.degree}, {edu.field}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">{edu.startYear} – {edu.endYear}</p>
                      {edu.grade && <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{edu.grade}</p>}
                      {edu.activities && <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA] mt-1 text-xs">{edu.activities}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white">Skills</h2>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Plus className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
              <div className="space-y-4">
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
                      onClick={() => setSkills(prev => prev.map(s => s.id === skill.id ? { ...s, endorsed: !s.endorsed, endorsements: s.endorsed ? s.endorsements - 1 : s.endorsements + 1 } : s))}
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
                {skillsExpanded ? <><ChevronUp className="w-4 h-4" />Show less</> : <><ChevronDown className="w-4 h-4" />Show all {skills.length} skills</>}
              </button>
            </div>
          )}

          {/* Certifications */}
          {(activeTab === "about" || activeTab === "posts") && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#915907]" />
                  Licenses & Certifications
                </h2>
                <button className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Plus className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
              <div className="space-y-5">
                {mockCertifications.map((cert) => (
                  <div key={cert.id} className="flex gap-4">
                    <img src={cert.issuerLogo} alt={cert.issuer} className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shrink-0" />
                    <div>
                      <h3 className="font-bold text-[#000000E6] dark:text-white text-[15px]">{cert.name}</h3>
                      <p className="text-sm text-[#000000E6] dark:text-[#E7E9EA]">{cert.issuer}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">
                        Issued {cert.issueDate}{cert.expiryDate ? ` · Expires ${cert.expiryDate}` : ""}
                      </p>
                      {cert.credentialId && (
                        <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">Credential ID: {cert.credentialId}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Posts Tab */}
          {activeTab === "activity" && (
            <div className="space-y-2">
              <div className="card p-4">
                <h2 className="text-lg font-bold text-[#000000E6] dark:text-white mb-1">Activity</h2>
                <p className="text-sm text-[#666666] dark:text-[#B0B7BE]">{formatNumber(currentUser.followerCount)} followers</p>
              </div>
              {mockPosts.filter(p => p.author.id === "u1").map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
