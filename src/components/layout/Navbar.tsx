import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home, Users, Briefcase, MessageSquare, Bell, Grid3X3,
  Search, Sun, Moon, ChevronDown, LogOut, Settings,
  User, Linkedin, X, TrendingUp
} from "lucide-react";
import { currentUser } from "@/constants/mockData";
import { formatConnectionCount } from "@/lib/utils";

interface NavbarProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
  notificationCount?: number;
  messageCount?: number;
}

const searchSuggestions = [
  { id: "1", text: "Software Engineer at Google", type: "job" },
  { id: "2", text: "Sarah Williams — UX Designer", type: "person" },
  { id: "3", text: "React Developer jobs", type: "job" },
  { id: "4", text: "Distributed Systems", type: "skill" },
  { id: "5", text: "Stripe — Company", type: "company" },
];

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleDark, onLogout, notificationCount = 3, messageCount = 3 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Network", path: "/network", badge: 12 },
    { icon: Briefcase, label: "Jobs", path: "/jobs" },
    { icon: MessageSquare, label: "Messaging", path: "/messaging", badge: messageCount },
    { icon: Bell, label: "Notifications", path: "/notifications", badge: notificationCount },
  ];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSearch(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#1D2226] shadow-nav h-14">
        <div className="max-w-[1128px] mx-auto px-2 sm:px-4 h-full flex items-center gap-1 sm:gap-2">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="shrink-0 mr-1">
            <div className="w-9 h-9 bg-[#0A66C2] rounded-md flex items-center justify-center hover:bg-[#0958A8] transition-colors">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
          </button>

          {/* Search Bar */}
          <div ref={searchRef} className="hidden sm:block relative w-64">
            <div className="flex items-center gap-2 bg-[#EEF3F8] dark:bg-[#38434F] rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-[#0A66C2]/40 transition-all">
              <Search className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE] shrink-0" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowSearch(e.target.value.length > 0); }}
                onFocus={() => setShowSearch(searchQuery.length > 0 || true)}
                className="bg-transparent text-sm text-[#000000E6] dark:text-white placeholder-[#666666] dark:placeholder-[#B0B7BE] outline-none w-full"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(""); setShowSearch(false); }}>
                  <X className="w-4 h-4 text-[#666666]" />
                </button>
              )}
            </div>

            {/* Suggestions Dropdown */}
            {showSearch && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-[#1D2226] rounded-xl shadow-card-hover border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-down z-50">
                {searchSuggestions
                  .filter(s => !searchQuery || s.text.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((s) => (
                    <button
                      key={s.id}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-[#38434F] transition-colors text-left"
                      onClick={() => { setSearchQuery(s.text); setShowSearch(false); }}
                    >
                      <Search className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE] shrink-0" />
                      <span className="text-sm text-[#000000E6] dark:text-white truncate">{s.text}</span>
                      <span className="ml-auto text-xs text-[#666666] dark:text-[#B0B7BE] capitalize shrink-0">{s.type}</span>
                    </button>
                  ))}
                <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-2">
                  <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">Try searching for people, jobs, or posts</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile search button */}
          <button
            className="sm:hidden p-2 text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Nav Items */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`nav-item ${isActive(item.path) ? "active" : ""}`}
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" />
                  {item.badge && item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-medium">{item.label}</span>
              </button>
            ))}

            {/* Work / More */}
            <button className="nav-item">
              <Grid3X3 className="w-6 h-6" />
              <span className="text-[11px] font-medium flex items-center gap-0.5">
                More <ChevronDown className="w-3 h-3" />
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-12 w-px bg-gray-200 dark:bg-gray-600 mx-1" />

          {/* Dark Mode + Profile */}
          <div className="flex items-center gap-1">
            <button
              onClick={toggleDark}
              className="p-2 text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Profile Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <div className="relative">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border-2 border-transparent group-hover:border-[#0A66C2] transition-colors"
                  />
                  <div className="online-dot" />
                </div>
                <span className="hidden md:flex items-center gap-0.5 text-[11px] font-medium text-[#666666] dark:text-[#B0B7BE]">
                  Me <ChevronDown className="w-3 h-3" />
                </span>
              </button>

              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-[#1D2226] rounded-xl shadow-card-hover border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-down z-50">
                  {/* Profile Summary */}
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-14 h-14 rounded-full object-cover" />
                        <div className="online-dot scale-125" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#000000E6] dark:text-white truncate">{currentUser.name}</p>
                        <p className="text-xs text-[#666666] dark:text-[#B0B7BE] line-clamp-2 mt-0.5 leading-relaxed">{currentUser.headline}</p>
                      </div>
                    </div>
                    {currentUser.isPremium && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="premium-badge">Premium</span>
                        <span className="text-xs text-[#915907]">1 month free trial</span>
                      </div>
                    )}
                    <button
                      onClick={() => { navigate("/profile"); setShowDropdown(false); }}
                      className="mt-3 w-full border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10 font-semibold py-1.5 rounded-full text-sm transition-colors"
                    >
                      View Profile
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-around">
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#000000E6] dark:text-white">{formatConnectionCount(currentUser.connectionCount)}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">Connections</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#000000E6] dark:text-white">{currentUser.profileViews}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">Profile views</p>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    {[
                      { icon: User, label: "View Profile", action: () => { navigate("/profile"); setShowDropdown(false); } },
                      { icon: Settings, label: "Settings & Privacy", action: () => setShowDropdown(false) },
                      { icon: TrendingUp, label: "Premium Features", action: () => setShowDropdown(false) },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-[#38434F] transition-colors text-left"
                      >
                        <item.icon className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                        <span className="text-sm text-[#000000E6] dark:text-white">{item.label}</span>
                      </button>
                    ))}
                    <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left group"
                      >
                        <LogOut className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE] group-hover:text-red-500 transition-colors" />
                        <span className="text-sm text-[#000000E6] dark:text-white group-hover:text-red-500 transition-colors">Sign out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        {showMobileSearch && (
          <div className="sm:hidden absolute top-14 left-0 right-0 bg-white dark:bg-[#1D2226] border-b border-gray-200 dark:border-gray-700 px-4 py-3 animate-slide-down">
            <div className="flex items-center gap-2 bg-[#EEF3F8] dark:bg-[#38434F] rounded-md px-3 py-2">
              <Search className="w-4 h-4 text-[#666666]" />
              <input
                autoFocus
                type="text"
                placeholder="Search LinkedIn"
                className="bg-transparent text-sm outline-none flex-1 text-[#000000E6] dark:text-white placeholder-[#666666]"
              />
              <button onClick={() => setShowMobileSearch(false)}>
                <X className="w-4 h-4 text-[#666666]" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1D2226] border-t border-gray-200 dark:border-gray-700 flex items-center justify-around px-2 py-1 safe-area-pb">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${isActive(item.path) ? "text-[#000000E6] dark:text-white" : "text-[#666666] dark:text-[#B0B7BE]"}`}
          >
            <div className="relative">
              <item.icon className="w-6 h-6" />
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge > 9 ? "9+" : item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
        <button
          onClick={() => navigate("/profile")}
          className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${isActive("/profile") ? "text-[#000000E6] dark:text-white" : "text-[#666666] dark:text-[#B0B7BE]"}`}
        >
          <img src={currentUser.avatar} alt="Me" className="w-6 h-6 rounded-full object-cover" />
          <span className="text-[10px] font-medium">Me</span>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
