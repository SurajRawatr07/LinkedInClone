import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import {
  Users, UserPlus, Check, MessageSquare, Globe, MapPin,
  TrendingUp, Star, Award, Search, X, ChevronRight,
  Bell, Calendar, Zap, Filter, Hash
} from "lucide-react";
import { mockUsers, currentUser } from "@/constants/mockData";
import { formatConnectionCount, formatNumber } from "@/lib/utils";

interface CommunityPageProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
}

const communityStats = [
  { label: "Members", value: "12.4K", icon: <Users className="w-5 h-5" />, color: "text-[#0A66C2]" },
  { label: "Daily Active", value: "2.1K", icon: <Zap className="w-5 h-5" />, color: "text-green-500" },
  { label: "Posts Today", value: "847", icon: <Globe className="w-5 h-5" />, color: "text-purple-500" },
  { label: "Events This Month", value: "23", icon: <Calendar className="w-5 h-5" />, color: "text-orange-500" },
];

const upcomingEvents = [
  {
    id: "e1",
    title: "Frontend Dev Meetup 2026",
    date: "Jan 15, 2026",
    time: "6:00 PM IST",
    type: "Virtual",
    attendees: 342,
    tag: "React",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "e2",
    title: "Open Source Hackathon",
    date: "Jan 22-23, 2026",
    time: "9:00 AM IST",
    type: "In-person",
    attendees: 156,
    tag: "Hackathon",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "e3",
    title: "DSA Interview Masterclass",
    date: "Feb 1, 2026",
    time: "7:00 PM IST",
    type: "Virtual",
    attendees: 890,
    tag: "DSA",
    color: "from-green-500 to-green-600",
  },
  {
    id: "e4",
    title: "TypeScript Deep Dive Workshop",
    date: "Feb 8, 2026",
    time: "3:00 PM IST",
    type: "Virtual",
    attendees: 234,
    tag: "TypeScript",
    color: "from-teal-500 to-teal-600",
  },
];

const announcements = [
  {
    id: "a1",
    title: "🚀 Community hits 12,000 members!",
    content: "We're thrilled to announce our community has grown to over 12,000 developers! Thank you for your incredible support and contribution.",
    time: "2h ago",
    pinned: true,
  },
  {
    id: "a2",
    title: "📢 New Resource Hub launched",
    content: "We've launched a curated resource hub with 500+ tutorials, articles, and tools for developers at every level.",
    time: "1d ago",
    pinned: false,
  },
  {
    id: "a3",
    title: "🏆 Hackathon winners announced",
    content: "Congratulations to Team TechNova for winning CodeHack 2025 with their AI-powered accessibility tool!",
    time: "3d ago",
    pinned: false,
  },
];

const featuredMembers = [
  {
    user: mockUsers[0],
    role: "Community Lead",
    badge: "🏆",
    contributions: 142,
  },
  {
    user: mockUsers[2],
    role: "Design Expert",
    badge: "⭐",
    contributions: 98,
  },
  {
    user: mockUsers[3],
    role: "ML Mentor",
    badge: "🔥",
    contributions: 213,
  },
  {
    user: mockUsers[4],
    role: "Startup Mentor",
    badge: "💡",
    contributions: 76,
  },
];

const subCommunities = [
  { name: "React Developers", members: "4.2K", icon: "⚛️", joined: true, color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700/50" },
  { name: "TypeScript Club", members: "2.8K", icon: "📘", joined: false, color: "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-700/50" },
  { name: "Open Source Hub", members: "3.1K", icon: "🌍", joined: true, color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700/50" },
  { name: "DSA & Interviews", members: "5.6K", icon: "🎯", joined: false, color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700/50" },
  { name: "Startup Founders", members: "1.9K", icon: "🚀", joined: false, color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-700/50" },
  { name: "DevOps & Cloud", members: "2.3K", icon: "☁️", joined: false, color: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-700/50" },
];

const CommunityPage: React.FC<CommunityPageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [joined, setJoined] = useState(true);
  const [followStates, setFollowStates] = useState<Record<string, boolean>>({});
  const [subJoined, setSubJoined] = useState<Record<string, boolean>>({
    "React Developers": true,
    "Open Source Hub": true,
  });
  const [search, setSearch] = useState("");

  const toggleFollow = (userId: string) => setFollowStates(p => ({ ...p, [userId]: !p[userId] }));
  const toggleSub = (name: string) => setSubJoined(p => ({ ...p, [name]: !p[name] }));

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} />

      <main className="max-w-[1128px] mx-auto px-4 pt-16 pb-20 md:pb-6">
        <div className="mt-4 space-y-4">
          {/* Community Banner */}
          <div className="card overflow-hidden">
            <div className="h-40 md:h-56 bg-gradient-to-br from-[#0A66C2] via-[#004182] to-[#001B4B] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="absolute rounded-full bg-white"
                    style={{
                      width: Math.random() * 80 + 20,
                      height: Math.random() * 80 + 20,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      opacity: Math.random() * 0.5 + 0.1,
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center text-white px-4">
                  <div className="text-4xl mb-2">👨‍💻</div>
                  <h1 className="text-2xl md:text-3xl font-bold">Tech Circle Community</h1>
                  <p className="text-white/80 mt-1 text-sm md:text-base">Where developers connect, learn, and grow together</p>
                </div>
              </div>
              <button
                onClick={() => setJoined(!joined)}
                className={`absolute bottom-4 right-4 flex items-center gap-2 font-bold px-5 py-2 rounded-full text-sm transition-all ${
                  joined
                    ? "bg-white text-[#0A66C2] hover:bg-white/90"
                    : "bg-[#0A66C2] text-white hover:bg-[#0958A8] border-2 border-white"
                }`}
              >
                {joined ? <><Check className="w-4 h-4" />Joined</> : <><UserPlus className="w-4 h-4" />Join Community</>}
              </button>
            </div>

            {/* Community Stats */}
            <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {communityStats.map(stat => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className={`${stat.color}`}>{stat.icon}</div>
                    <div>
                      <p className="text-lg font-bold text-[#000000E6] dark:text-white">{stat.value}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left: Main Content */}
            <div className="flex-1 min-w-0 space-y-4">
              {/* Announcements */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#0A66C2]" />
                    Announcements
                  </h2>
                </div>
                <div className="space-y-3">
                  {announcements.map(ann => (
                    <div key={ann.id} className={`p-4 rounded-xl border transition-all hover:shadow-sm cursor-pointer ${
                      ann.pinned
                        ? "border-[#0A66C2]/30 bg-[#EAF4FF]/50 dark:bg-[#0A66C2]/10"
                        : "border-gray-100 dark:border-gray-700 hover:border-gray-200"
                    }`}>
                      {ann.pinned && (
                        <span className="text-[10px] font-bold text-[#0A66C2] bg-[#EAF4FF] dark:bg-[#0A66C2]/20 px-2 py-0.5 rounded-full mb-2 inline-block">
                          📌 Pinned
                        </span>
                      )}
                      <h3 className="text-sm font-bold text-[#000000E6] dark:text-white mb-1">{ann.title}</h3>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] leading-relaxed">{ann.content}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-2">{ann.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#0A66C2]" />
                    Upcoming Events
                  </h2>
                  <button className="text-xs font-semibold text-[#0A66C2] hover:underline flex items-center gap-1">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden hover:shadow-md transition-all group cursor-pointer">
                      <div className={`h-2 bg-gradient-to-r ${event.color}`} />
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-sm font-bold text-[#000000E6] dark:text-white leading-tight flex-1">{event.title}</h3>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-2 shrink-0 ${
                            event.type === "Virtual"
                              ? "text-green-600 bg-green-50 dark:bg-green-900/30"
                              : "text-orange-600 bg-orange-50 dark:bg-orange-900/30"
                          }`}>
                            {event.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#666666] dark:text-[#B0B7BE] mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{event.date}</span>
                          <span>·</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-[#666666] dark:text-[#B0B7BE]">
                            <Users className="w-3.5 h-3.5" />
                            <span>{event.attendees} attending</span>
                          </div>
                          <button className="text-xs font-bold text-white bg-[#0A66C2] hover:bg-[#0958A8] px-3 py-1.5 rounded-full transition-colors">
                            RSVP
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-communities */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                    <Hash className="w-5 h-5 text-[#0A66C2]" />
                    Sub-Communities
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {subCommunities.map(sub => (
                    <div key={sub.name} className={`flex items-center gap-3 p-4 rounded-xl border ${sub.color} hover:shadow-sm transition-all`}>
                      <span className="text-2xl">{sub.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#000000E6] dark:text-white">{sub.name}</p>
                        <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{sub.members} members</p>
                      </div>
                      <button
                        onClick={() => toggleSub(sub.name)}
                        className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                          subJoined[sub.name]
                            ? "border border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE]"
                            : "bg-[#0A66C2] text-white hover:bg-[#0958A8]"
                        }`}
                      >
                        {subJoined[sub.name] ? "Joined ✓" : "Join"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Members & Activity */}
            <div className="lg:w-72 shrink-0 space-y-4">
              {/* Search Members */}
              <div className="card p-4">
                <div className="flex items-center gap-2 bg-[#EEF3F8] dark:bg-[#38434F] rounded-lg px-3 py-2 mb-3">
                  <Search className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="bg-transparent text-sm outline-none flex-1 text-[#000000E6] dark:text-white placeholder-[#666666]"
                  />
                  {search && <button onClick={() => setSearch("")}><X className="w-4 h-4 text-[#666666]" /></button>}
                </div>
              </div>

              {/* Featured Members */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-[#915907]" />
                  <h3 className="text-sm font-bold text-[#000000E6] dark:text-white">Featured Members</h3>
                </div>
                <div className="space-y-3">
                  {featuredMembers.map(member => (
                    <div key={member.user.id} className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img src={member.user.avatar} alt={member.user.name} className="w-10 h-10 rounded-full object-cover" />
                        <span className="absolute -bottom-0.5 -right-0.5 text-sm">{member.badge}</span>
                        {member.user.isOnline && (
                          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#000000E6] dark:text-white truncate">{member.user.name}</p>
                        <p className="text-xs text-[#0A66C2] dark:text-[#5B9DD9] truncate">{member.role}</p>
                        <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{member.contributions} contributions</p>
                      </div>
                      <button
                        onClick={() => toggleFollow(member.user.id)}
                        className={`shrink-0 text-xs font-bold px-3 py-1 rounded-full border transition-all ${
                          followStates[member.user.id]
                            ? "border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE]"
                            : "border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10"
                        }`}
                      >
                        {followStates[member.user.id] ? "Following" : "Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Stats */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#0A66C2]" />
                  <h3 className="text-sm font-bold text-[#000000E6] dark:text-white">Community Stats</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { label: "New members this week", value: "+142" },
                    { label: "Posts this week", value: "3.2K" },
                    { label: "Comments this week", value: "8.7K" },
                    { label: "Active threads", value: "234" },
                    { label: "Resources shared", value: "512" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 dark:border-gray-700 last:border-0">
                      <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">{item.label}</span>
                      <span className="text-sm font-bold text-[#0A66C2]">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Tags */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Hash className="w-4 h-4 text-[#0A66C2]" />
                  <h3 className="text-sm font-bold text-[#000000E6] dark:text-white">Trending Tags</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["#React", "#TypeScript", "#DSA", "#OpenSource", "#Frontend", "#Hackathon", "#JavaScript", "#NextJS", "#TailwindCSS"].map(tag => (
                    <button
                      key={tag}
                      className="text-xs font-semibold bg-[#EEF3F8] dark:bg-[#38434F] text-[#0A66C2] dark:text-[#5B9DD9] px-2.5 py-1 rounded-full hover:bg-[#EAF4FF] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CommunityPage;
