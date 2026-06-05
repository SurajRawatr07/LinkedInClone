import React, { useState } from "react";
import { TrendingUp, X, UserPlus, ChevronDown, ChevronUp, Info } from "lucide-react";
import { mockNewsItems, suggestedConnections } from "@/constants/mockData";
import { formatNumber } from "@/lib/utils";

const RightSidebar: React.FC = () => {
  const [showMoreNews, setShowMoreNews] = useState(false);
  const [connections, setConnections] = useState(
    suggestedConnections.map(u => ({ ...u, requested: false, dismissed: false }))
  );

  const visibleNews = showMoreNews ? mockNewsItems : mockNewsItems.slice(0, 3);

  return (
    <aside className="w-full space-y-2">
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
          {showMoreNews ? (
            <><ChevronUp className="w-4 h-4" /> Show less</>
          ) : (
            <><ChevronDown className="w-4 h-4" /> Show more</>
          )}
        </button>
      </div>

      {/* People You May Know */}
      <div className="card p-4">
        <h3 className="font-bold text-[#000000E6] dark:text-white text-sm mb-3">
          People you may know
        </h3>
        <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE] mb-3">From your industry</p>

        <div className="space-y-4">
          {connections
            .filter(u => !u.dismissed)
            .map((user) => (
              <div key={user.id} className="flex items-start gap-3 group">
                <div className="relative shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {user.isOnline && <div className="online-dot" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-[#000000E6] dark:text-white leading-tight hover:text-[#0A66C2] dark:hover:text-[#5B9DD9] cursor-pointer transition-colors">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE] leading-tight mt-0.5 line-clamp-2">
                        {user.headline}
                      </p>
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
          Show all recommendations
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Events */}
      <div className="card p-4">
        <h3 className="font-bold text-[#000000E6] dark:text-white text-sm mb-3">Upcoming events</h3>
        {[
          { title: "AI Summit 2026", date: "Jun 15", attendees: 2400 },
          { title: "React Conf 2026", date: "Jun 22", attendees: 1800 },
        ].map((event) => (
          <div key={event.title} className="flex items-center gap-3 mb-3 last:mb-0 group cursor-pointer">
            <div className="w-10 h-10 bg-[#EAF4FF] dark:bg-[#0A66C2]/20 rounded-lg flex flex-col items-center justify-center shrink-0">
              <span className="text-[8px] font-bold text-[#0A66C2] uppercase">{event.date.split(" ")[0]}</span>
              <span className="text-sm font-bold text-[#0A66C2]">{event.date.split(" ")[1]}</span>
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#000000E6] dark:text-white group-hover:text-[#0A66C2] transition-colors">
                {event.title}
              </p>
              <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{formatNumber(event.attendees)} attending</p>
            </div>
          </div>
        ))}
        <button className="mt-2 text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors">
          See all events →
        </button>
      </div>

      {/* Footer */}
      <div className="px-2 pb-4">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {["About", "Accessibility", "Help Center", "Privacy", "Ad Choices", "Advertising", "Business", "Sales", "Safety"].map((link) => (
            <button key={link} className="text-[11px] text-[#666666] dark:text-[#B0B7BE] hover:text-[#0A66C2] transition-colors">
              {link}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-[#666666] dark:text-[#B0B7BE] mt-2">
          LinkedIn Corporation © 2026
        </p>
      </div>
    </aside>
  );
};

export default RightSidebar;
