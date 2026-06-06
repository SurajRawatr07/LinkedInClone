import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark, Users, Star, ChevronRight, TrendingUp, Plus,
  Hash, Code2, Zap, Award
} from "lucide-react";
import { currentUser } from "@/constants/mockData";
import { formatNumber, formatConnectionCount } from "@/lib/utils";
import coverBanner from "@/assets/cover-banner.jpg";

const LeftSidebar: React.FC = () => {
  const navigate = useNavigate();
  const [profileCompletion] = useState(78);

  return (
    <aside className="w-full space-y-2">
      {/* Profile Card */}
      <div className="card overflow-hidden">
        {/* Cover */}
        <div className="h-16 relative cursor-pointer" onClick={() => navigate("/profile")}>
          <img src={coverBanner} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </div>

        {/* Avatar */}
        <div className="px-4 pb-4 relative">
          <div className="relative -mt-8 mb-2 w-fit">
            <div
              onClick={() => navigate("/profile")}
              className="w-16 h-16 rounded-full border-4 border-white dark:border-[#1D2226] cursor-pointer shadow-md bg-gradient-to-br from-[#0A66C2] to-[#5B9DD9] flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="text-xl font-bold text-white select-none">SR</span>
            </div>
            <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />
          </div>

          <button onClick={() => navigate("/profile")} className="block group w-full text-left">
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-[#000000E6] dark:text-white text-[15px] hover:text-[#0A66C2] dark:hover:text-[#5B9DD9] transition-colors leading-tight">
                {currentUser.name}
              </h3>
              {currentUser.isVerified && (
                <span className="verified-badge">✓</span>
              )}
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 px-1.5 py-0.5 rounded-full mt-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
              #OpenToWork
            </span>
            <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-1.5 line-clamp-2 leading-relaxed">
              {currentUser.headline}
            </p>
          </button>

          {/* Profile Completion */}
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">Profile strength</span>
              <span className="text-xs font-bold text-[#0A66C2]">{profileCompletion}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#0A66C2] to-[#5B9DD9] rounded-full transition-all duration-700"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>

          <div className="mt-3 space-y-2">
            <button className="w-full flex items-center justify-between group py-0.5">
              <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">Profile viewers</span>
              <span className="text-xs font-bold text-[#0A66C2] group-hover:underline">{formatNumber(currentUser.profileViews)}</span>
            </button>
            <button className="w-full flex items-center justify-between group py-0.5">
              <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">Post impressions</span>
              <span className="text-xs font-bold text-[#0A66C2] group-hover:underline">{formatNumber(currentUser.postImpressions)}</span>
            </button>
            <button className="w-full flex items-center justify-between group py-0.5">
              <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">Connections</span>
              <span className="text-xs font-bold text-[#0A66C2] group-hover:underline">{formatConnectionCount(currentUser.connectionCount)}</span>
            </button>
          </div>
        </div>

        {/* Premium CTA */}
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#915907]" />
            <div>
              <p className="text-xs font-semibold text-[#000000E6] dark:text-white">Try Premium for free</p>
              <p className="text-[11px] text-[#915907]">Get discovered faster</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="card p-3">
        {[
          { icon: Bookmark, label: "Saved items", count: 8 },
          { icon: Users, label: "My Network", count: null, path: "/network" },
          { icon: Star, label: "Following & Hashtags", count: null },
          { icon: Award, label: "Certifications", count: 4 },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => "path" in item && item.path ? navigate(item.path) : undefined}
            className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <item.icon className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
            <span className="text-sm font-medium text-[#000000E6] dark:text-white flex-1 text-left">{item.label}</span>
            {item.count !== null && item.count !== undefined && (
              <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">{item.count}</span>
            )}
            <ChevronRight className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}

        <div className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2">
          <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
            <Plus className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
            <span className="text-sm font-medium text-[#000000E6] dark:text-white">Discover more</span>
          </button>
        </div>
      </div>

      {/* Tech Skills */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Code2 className="w-4 h-4 text-[#0A66C2]" />
          <h4 className="text-xs font-bold text-[#000000E6] dark:text-white uppercase tracking-wide">Top Skills</h4>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {["React", "TypeScript", "Tailwind CSS", "JavaScript", "Git"].map(skill => (
            <span
              key={skill}
              className="text-[11px] font-semibold bg-[#EEF3F8] dark:bg-[#38434F] text-[#0A66C2] dark:text-[#5B9DD9] px-2.5 py-1 rounded-full cursor-pointer hover:bg-[#EAF4FF] transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Hash className="w-4 h-4 text-[#0A66C2]" />
          <h4 className="text-xs font-semibold text-[#666666] dark:text-[#B0B7BE] uppercase tracking-wide">
            Recent Hashtags
          </h4>
        </div>
        {["#ReactDeveloper", "#OpenSource", "#Frontend", "#DSA", "#Tailwind"].map((tag) => (
          <button
            key={tag}
            className="w-full text-left px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group flex items-center gap-2"
          >
            <Zap className="w-3 h-3 text-[#0A66C2] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm text-[#666666] dark:text-[#B0B7BE] group-hover:text-[#0A66C2] dark:group-hover:text-[#5B9DD9] transition-colors">
              {tag}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
