import React, { useState } from "react";
import {
  UserPlus, MessageSquare, Users, Globe, Search, Check,
  X, TrendingUp, Filter, Star, MapPin
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { mockUsers, currentUser } from "@/constants/mockData";
import type { User } from "@/types";

interface NetworkPageProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
}

const invitations = mockUsers.slice(2, 4);

const NetworkPage: React.FC<NetworkPageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [activeTab, setActiveTab] = useState<"connections" | "requests" | "discover">("discover");
  const [searchQuery, setSearchQuery] = useState("");
  const [connections, setConnections] = useState(
    mockUsers.map(u => ({ ...u, status: u.isConnected ? "connected" : "none" as "connected" | "pending" | "none" | "dismissed" }))
  );
  const [invites, setInvites] = useState(
    invitations.map(u => ({ ...u, accepted: false, dismissed: false }))
  );
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({});

  const handleConnect = (userId: string) => {
    setConnections(prev => prev.map(u =>
      u.id === userId
        ? { ...u, status: u.status === "pending" ? "none" : u.status === "connected" ? "connected" : "pending" }
        : u
    ));
  };

  const handleFollow = (userId: string) => {
    setFollowingMap(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const filtered = connections
    .filter(u => u.id !== currentUser.id && u.status !== "dismissed")
    .filter(u => !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.headline.toLowerCase().includes(searchQuery.toLowerCase()));

  const tabs = [
    { id: "discover", label: "Discover", count: null },
    { id: "requests", label: "Invitations", count: invites.filter(i => !i.dismissed && !i.accepted).length },
    { id: "connections", label: "Connections", count: connections.filter(u => u.status === "connected").length },
  ] as const;

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} notificationCount={3} />

      <main className="max-w-[900px] mx-auto px-4 pt-16 pb-20 md:pb-6 mt-4">
        {/* Header */}
        <div className="card p-5 mb-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#0A66C2]" />
                My Network
              </h1>
              <p className="text-sm text-[#666666] dark:text-[#B0B7BE] mt-0.5">
                Manage your connections and grow your network
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#EEF3F8] dark:bg-[#38434F] rounded-lg px-3 py-2 w-full sm:w-64">
              <Search className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search people..."
                className="bg-transparent text-sm text-[#000000E6] dark:text-white placeholder-gray-400 outline-none flex-1"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
            {[
              { icon: <Users className="w-4 h-4" />, value: "500+", label: "Connections" },
              { icon: <Globe className="w-4 h-4" />, value: "2K", label: "Followers" },
              { icon: <TrendingUp className="w-4 h-4" />, value: "148", label: "Following" },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center p-3 bg-[#F3F2EF] dark:bg-[#2D3741] rounded-xl">
                <div className="text-[#0A66C2] mb-1">{stat.icon}</div>
                <p className="text-base font-bold text-[#000000E6] dark:text-white">{stat.value}</p>
                <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="card mb-3 overflow-hidden">
          <div className="flex border-b border-gray-100 dark:border-gray-700 overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all -mb-px ${
                  activeTab === tab.id
                    ? "border-[#0A66C2] text-[#0A66C2] dark:text-[#5B9DD9]"
                    : "border-transparent text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white"
                }`}
              >
                {tab.label}
                {tab.count !== null && tab.count > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Invitations Tab */}
        {activeTab === "requests" && (
          <div className="card overflow-hidden">
            {invites.filter(i => !i.dismissed).length === 0 ? (
              <div className="p-12 text-center">
                <UserPlus className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="font-semibold text-[#000000E6] dark:text-white">No pending invitations</p>
                <p className="text-sm text-[#666666] dark:text-[#B0B7BE] mt-1">You're all caught up!</p>
              </div>
            ) : (
              invites.filter(i => !i.dismissed).map(invite => (
                <div key={invite.id} className="flex items-start gap-4 p-5 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-[#2D3741] transition-colors">
                  <div className="relative shrink-0">
                    <img src={invite.avatar} alt={invite.name} className="w-14 h-14 rounded-full object-cover" />
                    {invite.isOnline && <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-[#000000E6] dark:text-white">{invite.name}</p>
                        <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5 line-clamp-2">{invite.headline}</p>
                        <p className="text-xs text-[#666666] dark:text-[#B0B7BE] flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />{invite.location}
                        </p>
                      </div>
                    </div>
                    {!invite.accepted ? (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => setInvites(prev => prev.map(i => i.id === invite.id ? { ...i, accepted: true } : i))}
                          className="flex items-center gap-1.5 bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold px-4 py-1.5 rounded-full text-sm transition-all active:scale-95"
                        >
                          <Check className="w-3.5 h-3.5" /> Accept
                        </button>
                        <button
                          onClick={() => setInvites(prev => prev.map(i => i.id === invite.id ? { ...i, dismissed: true } : i))}
                          className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE] hover:border-red-400 hover:text-red-500 font-bold px-4 py-1.5 rounded-full text-sm transition-all"
                        >
                          <X className="w-3.5 h-3.5" /> Ignore
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-3">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600 dark:text-green-400 font-semibold">Connected!</span>
                        <button className="flex items-center gap-1.5 ml-2 border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] font-semibold px-3 py-1 rounded-full text-xs transition-colors">
                          <MessageSquare className="w-3 h-3" /> Message
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Connections Tab */}
        {activeTab === "connections" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {connections.filter(u => u.status === "connected" && u.id !== currentUser.id).map(user => (
              <div key={user.id} className="card p-4 hover:shadow-card-hover transition-shadow duration-200">
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
                    {user.isOnline && <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-[#000000E6] dark:text-white text-sm">{user.name}</p>
                        <p className="text-xs text-[#666666] dark:text-[#B0B7BE] line-clamp-2 mt-0.5">{user.headline}</p>
                      </div>
                      {user.isPremium && (
                        <span className="text-[9px] font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-1.5 py-0.5 rounded shrink-0 ml-1">In</span>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2.5">
                      <button className="flex items-center gap-1 border border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10 font-semibold px-3 py-1 rounded-full text-xs transition-colors">
                        <MessageSquare className="w-3 h-3" /> Message
                      </button>
                      <button
                        onClick={() => handleFollow(user.id)}
                        className={`flex items-center gap-1 font-semibold px-3 py-1 rounded-full text-xs border transition-colors ${
                          followingMap[user.id]
                            ? "border-gray-300 text-[#666666] dark:text-[#B0B7BE]"
                            : "border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                        }`}
                      >
                        {followingMap[user.id] ? <><Check className="w-3 h-3" /> Following</> : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Discover Tab */}
        {activeTab === "discover" && (
          <div className="space-y-3">
            {/* Filter row */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
              <button className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 hover:border-[#0A66C2] text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] px-3 py-1.5 rounded-full transition-colors shrink-0">
                <Filter className="w-3.5 h-3.5" /> Filter
              </button>
              {["All", "Developers", "Designers", "Product", "Recent"].map(f => (
                <button key={f} className="text-xs font-semibold border border-gray-300 dark:border-gray-600 hover:border-[#0A66C2] hover:text-[#0A66C2] text-[#666666] dark:text-[#B0B7BE] px-3 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0">
                  {f}
                </button>
              ))}
            </div>

            {/* People you may know */}
            <div className="card overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h2 className="font-bold text-[#000000E6] dark:text-white">People you may know</h2>
                <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">Based on your profile</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-gray-700">
                {filtered.map(user => (
                  <div key={user.id} className="p-4 hover:bg-gray-50 dark:hover:bg-[#2D3741] transition-colors group">
                    <div className="flex flex-col items-center text-center relative">
                      <button
                        onClick={() => setConnections(prev => prev.map(u => u.id === user.id ? { ...u, status: "dismissed" } : u))}
                        className="absolute top-0 right-0 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
                      </button>
                      <div className="relative">
                        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 dark:border-gray-600" />
                        {user.isOnline && <div className="absolute bottom-0.5 right-0.5 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />}
                      </div>
                      <p className="font-bold text-[#000000E6] dark:text-white text-sm mt-2">{user.name}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5 line-clamp-2 leading-relaxed">{user.headline}</p>
                      {user.isPremium && <span className="text-[9px] font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-0.5 rounded mt-1">Premium</span>}
                      <div className="flex items-center gap-1 mt-1 text-xs text-[#666666] dark:text-[#B0B7BE]">
                        <Star className="w-3 h-3 text-[#0A66C2]" />
                        <span>{user.connectionCount} connections</span>
                      </div>
                      <button
                        onClick={() => handleConnect(user.id)}
                        className={`mt-3 flex items-center gap-1.5 font-bold px-5 py-1.5 rounded-full text-sm border transition-all duration-200 active:scale-95 ${
                          user.status === "pending"
                            ? "border-[#0A66C2] bg-[#EAF4FF] dark:bg-[#0A66C2]/20 text-[#0A66C2] dark:text-[#5B9DD9]"
                            : user.status === "connected"
                            ? "border-gray-300 text-[#666666] dark:text-[#B0B7BE]"
                            : "border-[#666666] dark:border-[#B0B7BE] text-[#666666] dark:text-[#B0B7BE] hover:border-[#0A66C2] hover:text-[#0A66C2]"
                        }`}
                      >
                        {user.status === "pending" ? (
                          <><Check className="w-3.5 h-3.5" /> Pending</>
                        ) : user.status === "connected" ? (
                          <><Check className="w-3.5 h-3.5" /> Connected</>
                        ) : (
                          <><UserPlus className="w-3.5 h-3.5" /> Connect</>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending developers */}
            <div className="card p-5">
              <h2 className="font-bold text-[#000000E6] dark:text-white mb-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0A66C2]" />
                Trending in Tech
              </h2>
              <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mb-4">Developers gaining followers this week</p>
              <div className="space-y-4">
                {mockUsers.slice(0, 3).map((user, i) => (
                  <div key={user.id} className="flex items-center gap-3">
                    <span className="text-lg font-bold text-[#666666] dark:text-[#B0B7BE] w-5 text-center shrink-0">{i + 1}</span>
                    <div className="relative shrink-0">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      {user.isOnline && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#1D2226] rounded-full" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#000000E6] dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] truncate">{user.headline}</p>
                    </div>
                    <button
                      onClick={() => handleFollow(user.id)}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all shrink-0 ${
                        followingMap[user.id]
                          ? "border-[#0A66C2] text-[#0A66C2] bg-[#EAF4FF] dark:bg-[#0A66C2]/20"
                          : "border-[#0A66C2] text-[#0A66C2] hover:bg-[#EAF4FF] dark:hover:bg-[#0A66C2]/10"
                      }`}
           e;
