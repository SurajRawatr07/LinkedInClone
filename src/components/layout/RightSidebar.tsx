import React, { useState } from "react";
import {
  TrendingUp, X, UserPlus, ChevronDown, ChevronUp, Info,
  Zap, Calendar, Code2, Coffee, ExternalLink, Flame, Trophy,
  BookOpen, Globe, Star
} from "lucide-react";
import { mockNewsItems, suggestedConnections } from "@/constants/mockData";
import { formatNumber } from "@/lib/utils";

const trendingTech = [
  { name: "React 19", change: "+24%", tag: "hot" },
  { name: "TypeScript 5.5", change: "+18%", tag: "trending" },
  { name: "Bun.js", change: "+31%", tag: "rising" },
  { name: "Next.js 15", change: "+15%", tag: "trending" },
  { name: "Tailwind v4", change: "+22%", tag: "hot" },
];

const hackathons = [
  { title: "DevHack 2026", date: "Jun 20–22", prize: "$10,000", participants: 1200, tag: "Registration Open" },
  { title: "AI Builders Sprint", date: "Jul 5", prize: "$5,000", participants: 680, tag: "Applications Open" },
];

const internships = [
  { company: "Vercel", role: "Frontend Intern", location: "Remote", logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=32&h=32&fit=crop" },
  { company: "Prisma", role: "Dev Tools Intern", location: "Berlin · Remote", logo: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=32&h=32&fit=crop" },
];

const spotlightDev = {
  name: "Suraj Rawat",
  role: "Frontend Developer",
  badge: "#OpenToWork",
  stat: "500+ connections",
  avatar: null,
};

const RightSidebar: React.FC = () => {
  const [showMoreNews, setShowMoreNews] = useState(false);
  const [showMoreTech, setShowMoreTech] = useState(false);
  const [connections, setConnections] = useState(
    suggestedConnections.map(u => ({ ...u, requested: false, dismissed: false }))
  );

  const visibleNews = showMoreNews ? mockNewsItems : mockNewsItems.slice(0, 3);
  const visibleTech = showMoreTech ? trendingTech : trendingTech.slice(0, 3);

  return (
    <aside className="w-full space-y-2">
      {/* Developer Spotlight */}
      <div className="card p-4 bg-gradient-to-br from-[#0A66C2]/5 to-transparent border border-[#0A66C2]/10 dark:border-[#0A66C2]/20">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-4 h-4 text-[#915907]" />
          <h3 className="font-bold text-[#000000E6] dark:text-white text-sm">Developer Spotlight</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0A66C2] to-[#5B9DD9] flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">SR</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-[#000000E6] dark:text-white">{spotlightDev.name}</p>
              <span className="verified-badge text-[8px] w-4 h-4">✓</span>
            </div>
            <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{spotlightDev.role}</p>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 px-1.5 py-0.5 rounded-full mt-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              {spotlightDev.badge}
            </span>
          </div>
        </div>
        <div className="flex gap-2 mt-3">
          <button className="flex-1 bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold text-xs py-1.5 rounded-full transition-all active:scale-95">
            View Profile
          </button>
          <button className="flex-1 border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10 font-bold text-xs py-1.5 rounded-full transition-colors">
            Connect
          </button>
        </div>
      </div>

      {/* LinkedIn News */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-[#000000E6] dark:text-white" />
          <h3 className="font-bold text-[#000000E6] dark:text-white text-sm">LinkedIn News</h3>
          <button className="ml-auto text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white">
            <Info className="w-4 h-4" />
          </button>
        </div>
        <ul className="space-y-3">
          {visibleNews.map((item) => (
            <li key={item.id}>
              <button className="w-full text-left group">
                <p className="text-[13px] font-semibold text-[#000000E6] dark:text-white group-hover:text-[#0A66C2] dark:group-hover:text-[#5B9DD9] transition-colors leading-tight line-clamp-2">
                  {item.title}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{item.timeAgo}</span>
                  <span className="text-[#666666] dark:text-[#B0B7BE] text-[11px]">·</span>
                  <span className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{formatNumber(item.readers)} readers</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowMoreNews(!showMoreNews)}
          className="flex items-center gap-1 mt-3 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors"
        >
          {showMoreNews ? <><ChevronUp className="w-4 h-4" />Show less</> : <><ChevronDown className="w-4 h-4" />Show more</>}
        </button>
      </div>

      {/* Trending Technologies */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="w-4 h-4 text-[#0A66C2]" />
          <h3 className="font-bold text-[#000000E6] dark:text-white text-sm">Trending Technologies</h3>
        </div>
        <ul className="space-y-2">
          {visibleTech.map((tech, i) => (
            <li key={tech.name}>
              <button className="w-full flex items-center justify-between group hover:bg-gray-50 dark:hover:bg-[#2D3741] rounded-lg px-2 py-1.5 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#666666] dark:text-[#B0B7BE] w-4">{i + 1}</span>
                  <span className="text-[13px] font-semibold text-[#000000E6] dark:text-white group-hover:text-[#0A66C2] dark:group-hover:text-[#5B9DD9] transition-colors">
                    {tech.name}
                  </span>
                  {tech.tag === "hot" && (
                    <span className="flex items-center gap-0.5 text-[9px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-1.5 py-0.5 rounded-full">
                      <Flame className="w-2.5 h-2.5" /> HOT
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-bold text-green-500">{tech.change}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setShowMoreTech(!showMoreTech)}
          className="flex items-center gap-1 mt-2 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors"
        >
          {showMoreTech ? <><ChevronUp className="w-4 h-4" />Show less</> : <><ChevronDown className="w-4 h-4" />Show all {trendingTech.length}</>}
        </button>
      </div>

      {/* Hackathons */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-[#915907]" />
          <h3 className="font-bold text-[#000000E6] dark:text-white text-sm">Upcoming Hackathons</h3>
        </div>
        <div className="space-y-3">
          {hackathons.map((h) => (
            <div key={h.title} className="group cursor-pointer">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#0A66C2] to-[#5B9DD9] rounded-lg flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-[#000000E6] dark:text-white group-hover:text-[#0A66C2] transition-colors">
                    {h.title}
                  </p>
                  <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{h.date} · Prize: <span className="font-bold text-green-600 dark:text-green-400">{h.prize}</span></p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-[#0A66C2] dark:text-[#5B9DD9] bg-[#EAF4FF] dark:bg-[#0A66C2]/20 px-2 py-0.5 rounded-full">
                      {h.tag}
                    </span>
                    <span className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{formatNumber(h.participants)} participants</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-3 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors flex items-center gap-1">
          See all hackathons <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Internships */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-[#0A66C2]" />
          <h3 className="font-bold text-[#000000E6] dark:text-white text-sm">Internship Opportunities</h3>
        </div>
        <div className="space-y-3">
          {internships.map((intern) => (
            <div key={intern.company} className="flex items-center gap-3 group cursor-pointer">
              <img src={intern.logo} alt={intern.company} className="w-9 h-9 rounded-lg object-cover border border-gray-200 dark:border-gray-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-[#000000E6] dark:text-white group-hover:text-[#0A66C2] transition-colors">{intern.role}</p>
                <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{intern.company} · {intern.location}</p>
              </div>
              <button className="text-xs font-bold text-[#0A66C2] border border-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10 px-2.5 py-1 rounded-full transition-colors shrink-0">
                Apply
              </button>
            </div>
          ))}
        </div>
        <button className="mt-3 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors">
          Browse all internships →
        </button>
      </div>

      {/* People You May Know */}
      <div className="card p-4">
        <h3 className="font-bold text-[#000000E6] dark:text-white text-sm mb-1">People you may know</h3>
        <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE] mb-3">From your industry</p>
        <div className="space-y-4">
          {connections.filter(u => !u.dismissed).map((user) => (
            <div key={user.id} className="flex items-start gap-3 group">
              <div className="relative shrink-0">
                <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                {user.isOnline && <div className="online-dot" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-[#000000E6] dark:text-white leading-tight hover:text-[#0A66C2] dark:hover:text-[#5B9DD9] cursor-pointer transition-colors truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE] leading-tight mt-0.5 line-clamp-2">{user.headline}</p>
                  </div>
                  <button
                    onClick={() => setConnections(prev => prev.map(u => u.id === user.id ? { ...u, dismissed: true } : u))}
                    className="text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white opacity-0 group-hover:opacity-100 transition-all ml-1 mt-0.5 shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => setConnections(prev => prev.map(u => u.id === user.id ? { ...u, requested: !u.requested } : u))}
                  className={`mt-2 flex items-center gap-1.5 border font-semibold px-4 py-1 rounded-full text-[13px] transition-all duration-200 ${
                    user.requested
                      ? "border-[#0A66C2] bg-[#EAF4FF] dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-[#5B9DD9]"
                      : "border-[#666666] dark:border-[#B0B7BE] text-[#666666] dark:text-[#B0B7BE] hover:border-[#0A66C2] hover:text-[#0A66C2] dark:hover:border-[#5B9DD9] dark:hover:text-[#5B9DD9] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  {user.requested ? "Pending" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors flex items-center gap-1">
          Show all recommendations <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-[#0A66C2]" />
          <h3 className="font-bold text-[#000000E6] dark:text-white text-sm">Upcoming Events</h3>
        </div>
        {[
          { title: "AI Summit 2026", date: "Jun 15", attendees: 2400, type: "Conference" },
          { title: "React Conf 2026", date: "Jun 22", attendees: 1800, type: "Tech Talk" },
          { title: "Open Source Day", date: "Jul 1", attendees: 950, type: "Workshop" },
        ].map((event) => (
          <div key={event.title} className="flex items-center gap-3 mb-3 last:mb-0 group cursor-pointer">
            <div className="w-10 h-10 bg-[#EAF4FF] dark:bg-[#0A66C2]/20 rounded-lg flex flex-col items-center justify-center shrink-0">
              <span className="text-[8px] font-bold text-[#0A66C2] uppercase">{event.date.split(" ")[0]}</span>
              <span className="text-sm font-bold text-[#0A66C2]">{event.date.split(" ")[1]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-[#000000E6] dark:text-white group-hover:text-[#0A66C2] transition-colors truncate">{event.title}</p>
              <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{event.type} · {formatNumber(event.attendees)} attending</p>
            </div>
          </div>
        ))}
        <button className="mt-2 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors flex items-center gap-1">
          <Globe className="w-3.5 h-3.5" /> Discover more events
        </button>
      </div>

      {/* Coffee Chat */}
      <div className="card p-4 border border-[#0A66C2]/20 bg-gradient-to-br from-[#EAF4FF] to-white dark:from-[#0A66C2]/10 dark:to-[#1D2226]">
        <div className="flex items-center gap-2 mb-2">
          <Coffee className="w-4 h-4 text-[#0A66C2]" />
          <h3 className="font-bold text-[#000000E6] dark:text-white text-sm">Open to Coffee Chats?</h3>
        </div>
        <p className="text-[12px] text-[#666666] dark:text-[#B0B7BE] leading-relaxed mb-3">
          Connect with developers for quick virtual chats about tech, projects, and opportunities.
        </p>
        <button className="w-full bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold text-xs py-2 rounded-full transition-all active:scale-95">
          Set availability
        </button>
      </div>

      {/* Footer */}
      <div className="px-2 pb-4">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {["About", "Accessibility", "Help Center", "Privacy", "Ad Choices", "Advertising", "Business"].map(link => (
            <button key={link} className="text-[11px] text-[#666666] dark:text-[#B0B7BE] hover:text-[#0A66C2] transition-colors">
              {link}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE] mt-2">LinkedIn Corporation © 2026</p>
      </div>
    </aside>
  );
};

export default RightSidebar;
