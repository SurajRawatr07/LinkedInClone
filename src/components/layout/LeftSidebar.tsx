import React from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, Users, Star, ChevronRight, TrendingUp, Plus } from "lucide-react";
import { currentUser } from "@/constants/mockData";
import { formatNumber, formatConnectionCount } from "@/lib/utils";
import coverBanner from "@/assets/cover-banner.jpg";

const LeftSidebar: React.FC = () => {
  const navigate = useNavigate();

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
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              onClick={() => navigate("/profile")}
              className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-[#1D2226] cursor-pointer hover:opacity-90 transition-opacity shadow-md"
            />
            <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />
          </div>

          <button onClick={() => navigate("/profile")} className="block group">
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-[#000000E6] dark:text-white text-[15px] hover:text-[#0A66C2] dark:hover:text-[#5B9DD9] transition-colors leading-tight">
                {currentUser.name}
              </h3>
              {currentUser.isVerified && (
                <span className="verified-badge">✓</span>
              )}
              {currentUser.isPremium && (
                <span className="premium-badge">In</span>
              )}
            </div>
            <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5 line-clamp-2 leading-relaxed">
              {currentUser.headline}
            </p>
          </button>

          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
            <button className="w-full flex items-center justify-between group py-0.5">
              <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">Profile viewers</span>
              <span className="text-xs font-bold text-[#0A66C2] group-hover:underline">{currentUser.profileViews}</span>
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
          { icon: Users, label: "Groups", count: null },
          { icon: Star, label: "Following & Hashtags", count: null },
        ].map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <item.icon className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
            <span className="text-sm font-medium text-[#000000E6] dark:text-white flex-1 text-left">{item.label}</span>
            {item.count !== null && (
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

      {/* Recent Activity */}
      <div className="card p-4">
        <h4 className="text-xs font-semibold text-[#666666] dark:text-[#B0B7BE] uppercase tracking-wide mb-3">
          Recent
        </h4>
        {["#DistributedSystems", "#SystemDesign", "#SoftwareEngineering", "#TechLeadership"].map((tag) => (
          <button
            key={tag}
            className="w-full text-left px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          >
            <span className="text-sm text-[#666666] dark:text-[#B0B7BE] hover:text-[#0A66C2] dark:hover:text-[#5B9DD9] transition-colors">
              {tag}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;
