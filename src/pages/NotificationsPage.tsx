import React, { useState, useEffect } from "react";
import {
  Bell, ThumbsUp, MessageCircle, UserPlus, Briefcase,
  Heart, Gift, Star, AtSign, Repeat2, Settings, CheckCheck,
  MoreHorizontal, X, Check
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

interface NotificationsPageProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
}

interface Notification {
  id: string;
  type: "like" | "comment" | "connection" | "job" | "mention" | "repost" | "birthday" | "anniversary";
  actor: { name: string; avatar: string; headline: string };
  content: string;
  time: string;
  isRead: boolean;
  meta?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "connection",
    actor: {
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
      headline: "Senior Frontend Developer at Amazon",
    },
    content: "accepted your connection request",
    time: "2m ago",
    isRead: false,
  },
  {
    id: "n2",
    type: "like",
    actor: {
      name: "Rahul Gupta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      headline: "Full Stack Developer at Flipkart",
    },
    content: "liked your post about React performance tips",
    time: "15m ago",
    isRead: false,
    meta: "React performance tips",
  },
  {
    id: "n3",
    type: "comment",
    actor: {
      name: "Ananya Verma",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      headline: "React Developer at Swiggy",
    },
    content: 'commented: "This is an amazing project! Love the attention to detail 🔥"',
    time: "1h ago",
    isRead: false,
  },
  {
    id: "n4",
    type: "job",
    actor: {
      name: "LinkedIn Jobs",
      avatar: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&h=80&fit=crop",
      headline: "Job Recommendations",
    },
    content: "New job match: Frontend Developer at Google — 95% match with your profile",
    time: "2h ago",
    isRead: false,
    meta: "Frontend Developer at Google",
  },
  {
    id: "n5",
    type: "mention",
    actor: {
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      headline: "Software Engineer at Google",
    },
    content: "mentioned you in a post: \"Great work by @Suraj Rawat on the LinkedIn Clone!\"",
    time: "3h ago",
    isRead: false,
  },
  {
    id: "n6",
    type: "repost",
    actor: {
      name: "Sneha Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
      headline: "UI/UX Designer at CRED",
    },
    content: "reposted your article on Tailwind CSS best practices",
    time: "5h ago",
    isRead: true,
  },
  {
    id: "n7",
    type: "birthday",
    actor: {
      name: "Arjun Mehta",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      headline: "Backend Developer at Razorpay",
    },
    content: "has a work anniversary today — 2 years at Razorpay 🎉",
    time: "6h ago",
    isRead: true,
  },
  {
    id: "n8",
    type: "like",
    actor: {
      name: "Meera Nair",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face",
      headline: "Data Scientist at Microsoft",
    },
    content: "and 24 others liked your post",
    time: "8h ago",
    isRead: true,
    meta: "24 others",
  },
  {
    id: "n9",
    type: "connection",
    actor: {
      name: "Dev Patel",
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&h=80&fit=crop&crop=face",
      headline: "Mobile Developer at Zomato",
    },
    content: "wants to connect with you",
    time: "1d ago",
    isRead: true,
  },
  {
    id: "n10",
    type: "job",
    actor: {
      name: "LinkedIn Jobs",
      avatar: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&h=80&fit=crop",
      headline: "Job Recommendations",
    },
    content: "5 new jobs match your profile: React Developer, Frontend Engineer...",
    time: "1d ago",
    isRead: true,
  },
];

const NotificationSkeleton = () => (
  <div className="flex items-start gap-3 p-4 border-b border-gray-100 dark:border-gray-700 animate-pulse">
    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
    </div>
  </div>
);

const typeIcon = (type: Notification["type"]) => {
  const base = "w-4 h-4";
  switch (type) {
    case "like": return <ThumbsUp className={`${base} text-[#0A66C2]`} />;
    case "comment": return <MessageCircle className={`${base} text-green-500`} />;
    case "connection": return <UserPlus className={`${base} text-[#0A66C2]`} />;
    case "job": return <Briefcase className={`${base} text-purple-500`} />;
    case "mention": return <AtSign className={`${base} text-orange-500`} />;
    case "repost": return <Repeat2 className={`${base} text-green-500`} />;
    case "birthday": return <Gift className={`${base} text-pink-500`} />;
    case "anniversary": return <Star className={`${base} text-yellow-500`} />;
    default: return <Bell className={`${base} text-gray-400`} />;
  }
};

const typeBg = (type: Notification["type"]) => {
  switch (type) {
    case "like": return "bg-[#EAF4FF]";
    case "comment": return "bg-green-50";
    case "connection": return "bg-[#EAF4FF]";
    case "job": return "bg-purple-50";
    case "mention": return "bg-orange-50";
    case "repost": return "bg-green-50";
    case "birthday":
    case "anniversary": return "bg-pink-50";
    default: return "bg-gray-100";
  }
};

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification: n, onRead }) => (
  <div
    onClick={() => onRead(n.id)}
    className={`flex items-start gap-3 px-4 py-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2D3741] transition-colors group ${
      !n.isRead ? "bg-[#EAF4FF]/40 dark:bg-[#0A66C2]/5" : ""
    }`}
  >
    <div className="relative shrink-0">
      <img src={n.actor.avatar} alt={n.actor.name} className="w-12 h-12 rounded-full object-cover" />
      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white dark:border-[#1D2226] ${typeBg(n.type)}`}>
        {typeIcon(n.type)}
      </div>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm text-[#000000E6] dark:text-white leading-snug">
        <span className="font-bold">{n.actor.name}</span>{" "}
        <span className={n.isRead ? "text-[#666666] dark:text-[#B0B7BE]" : ""}>{n.content}</span>
      </p>
      <p className={`text-xs mt-1 font-semibold ${n.isRead ? "text-[#666666] dark:text-[#B0B7BE]" : "text-[#0A66C2]"}`}>
        {n.time}
      </p>
      {n.type === "connection" && !n.isRead && (
        <div className="flex gap-2 mt-2.5">
          <button
            onClick={e => { e.stopPropagation(); onRead(n.id); }}
            className="flex items-center gap-1.5 bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold px-4 py-1.5 rounded-full text-xs transition-all active:scale-95"
          >
            <Check className="w-3 h-3" /> Accept
          </button>
          <button
            onClick={e => { e.stopPropagation(); onRead(n.id); }}
            className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE] hover:border-red-400 hover:text-red-500 font-bold px-4 py-1.5 rounded-full text-xs transition-all"
          >
            <X className="w-3 h-3" /> Ignore
          </button>
        </div>
      )}
    </div>
    <div className="flex items-center gap-2 shrink-0 ml-1">
      {!n.isRead && <div className="w-2.5 h-2.5 bg-[#0A66C2] rounded-full" />}
      <button
        onClick={e => e.stopPropagation()}
        className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 opacity-0 group-hover:opacity-100 transition-all"
      >
        <MoreHorizontal className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
      </button>
    </div>
  </div>
);

const NotificationsPage: React.FC<NotificationsPageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "mentions" | "jobs">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const handleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === "unread") return !n.isRead;
    if (activeFilter === "mentions") return n.type === "mention" || n.type === "comment";
    if (activeFilter === "jobs") return n.type === "job";
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filters: { id: typeof activeFilter; label: string }[] = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "mentions", label: "Mentions" },
    { id: "jobs", label: "Jobs" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} notificationCount={unreadCount} />

      <main className="max-w-[700px] mx-auto px-4 pt-16 pb-20 md:pb-6 mt-4">
        <div className="card overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
            <div>
              <h1 className="text-xl font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#0A66C2]" />
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">Stay updated on your network</p>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0A66C2] hover:text-[#0958A8] transition-colors"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark all read
                </button>
              )}
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <Settings className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 px-4 py-3 overflow-x-auto hide-scrollbar border-b border-gray-100 dark:border-gray-700">
            {filters.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveFilter(id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                  activeFilter === id
                    ? "bg-[#000000E6] dark:bg-white text-white dark:text-[#000000E6]"
                    : "text-[#666666] dark:text-[#B0B7BE] hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {label}
                {id === "unread" && unreadCount > 0 && (
                  <span className="ml-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          <div className="border-t border-gray-100 dark:border-gray-700">
            {loading ? (
              <>
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
              </>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
                <div className="w-20 h-20 bg-[#EEF3F8] dark:bg-[#2D3741] rounded-full flex items-center justify-center mb-4">
                  <Bell className="w-10 h-10 text-[#666666] dark:text-[#B0B7BE]" />
                </div>
                <h3 className="text-lg font-bold text-[#000000E6] dark:text-white">No notifications</h3>
                <p className="text-sm text-[#666666] dark:text-[#B0B7BE] mt-1">
                  {activeFilter === "unread" ? "You're all caught up!" : "Nothing here yet"}
                </p>
              </div>
            ) : (
              <>
                {/* New */}
                {filtered.some(n => !n.isRead) && (
                  <>
                    <div className="px-5 py-2 bg-gray-50 dark:bg-[#2D3741]/50">
                      <h3 className="text-xs font-bold text-[#000000E6] dark:text-white uppercase tracking-wide">New</h3>
                    </div>
                    {filtered.filter(n => !n.isRead).map(n => (
                      <NotificationItem key={n.id} notification={n} onRead={handleRead} />
                    ))}
                  </>
                )}

                {/* Earlier */}
                {filtered.some(n => n.isRead) && (
                  <>
                    <div className="px-5 py-2 bg-gray-50 dark:bg-[#2D3741]/50">
                      <h3 className="text-xs font-bold text-[#000000E6] dark:text-white uppercase tracking-wide">Earlier</h3>
                    </div>
                    {filtered.filter(n => n.isRead).map(n => (
                      <NotificationItem key={n.id} notification={n} onRead={handleRead} />
                    ))}
                  </>
                )}

                <div className="p-4 text-center border-t border-gray-100 dark:border-gray-700">
                  <button className="text-sm font-semibold text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white transition-colors">
                    View older notifications
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Notification Settings Card */}
        <div className="card p-5 mt-3">
          <h3 className="font-bold text-[#000000E6] dark:text-white mb-3 flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notification preferences
          </h3>
          <div className="space-y-3">
            {[
              { label: "Job alerts", sublabel: "Get notified about relevant opportunities", enabled: true },
              { label: "Connection requests", sublabel: "When someone wants to connect", enabled: true },
              { label: "Post likes & comments", sublabel: "Reactions to your content", enabled: true },
              { label: "Mentions", sublabel: "When someone mentions you", enabled: false },
            ].map((pref) => (
              <div key={pref.label} className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-[#000000E6] dark:text-white">{pref.label}</p>
                  <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{pref.sublabel}</p>
                </div>
                <button
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0 ${pref.enabled ? "bg-[#0A66C2]" : "bg-gray-300 dark:bg-gray-600"}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${pref.enabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
