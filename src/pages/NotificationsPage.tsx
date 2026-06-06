import React, { useState } from "react";
import {
  Bell, ThumbsUp, MessageCircle, UserPlus, Briefcase,
  Heart, Gift, Star, AtSign, Repeat2, Settings, CheckCheck
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";

interface NotificationsPageProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
}

interface NotificationActor {
  id: string;
  name: string;
  avatar: string;
  headline: string;
}

interface Notification {
  id: string;
  type: "like" | "comment" | "connection" | "job" | "message" | "birthday" | "anniversary" | "mention" | "repost";
  actor: NotificationActor;
  content: string;
  postPreview?: string;
  timestamp: string;
  isRead: boolean;
}

const NOTIF_ICONS: Record<string, { icon: React.FC<{ className?: string }>, bg: string, color: string }> = {
  like: { icon: ThumbsUp, bg: "bg-blue-100 dark:bg-blue-900/30", color: "text-blue-500" },
  comment: { icon: MessageCircle, bg: "bg-green-100 dark:bg-green-900/30", color: "text-green-500" },
  connection: { icon: UserPlus, bg: "bg-[#EAF4FF] dark:bg-[#0A66C2]/20", color: "text-[#0A66C2] dark:text-[#5B9DD9]" },
  job: { icon: Briefcase, bg: "bg-purple-100 dark:bg-purple-900/30", color: "text-purple-500" },
  message: { icon: MessageCircle, bg: "bg-blue-100 dark:bg-blue-900/30", color: "text-blue-500" },
  birthday: { icon: Gift, bg: "bg-pink-100 dark:bg-pink-900/30", color: "text-pink-500" },
  anniversary: { icon: Star, bg: "bg-yellow-100 dark:bg-yellow-900/30", color: "text-yellow-500" },
  mention: { icon: AtSign, bg: "bg-orange-100 dark:bg-orange-900/30", color: "text-orange-500" },
  repost: { icon: Repeat2, bg: "bg-green-100 dark:bg-green-900/30", color: "text-green-500" },
};

const mockNotifications: Notification[] = [
  {
    id: "n1",
    type: "like",
    actor: {
      id: "u2",
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
      headline: "Senior Frontend Developer at Amazon",
    },
    content: "Priya Sharma and 47 others liked your post about the LinkedIn Clone project.",
    postPreview: "Just shipped my LinkedIn Clone built with React, TypeScript, and Tailwind CSS...",
    timestamp: "2 minutes ago",
    isRead: false,
  },
  {
    id: "n2",
    type: "connection",
    actor: {
      id: "u3",
      name: "Rahul Gupta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      headline: "Full Stack Developer at Flipkart",
    },
    content: "Rahul Gupta accepted your connection request. Start a conversation!",
    timestamp: "15 minutes ago",
    isRead: false,
  },
  {
    id: "n3",
    type: "comment",
    actor: {
      id: "u4",
      name: "Ananya Verma",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      headline: "React Developer at Swiggy",
    },
    content: "Ananya Verma commented on your post: \"This is incredibly well-built! The dark mode is 🔥\"",
    postPreview: "Just shipped my LinkedIn Clone built with React, TypeScript, and Tailwind CSS...",
    timestamp: "1 hour ago",
    isRead: false,
  },
  {
    id: "n4",
    type: "job",
    actor: {
      id: "sys1",
      name: "LinkedIn Jobs",
      avatar: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=80&h=80&fit=crop",
      headline: "Job Recommendations",
    },
    content: "New job alert: Frontend Developer at Google · Bangalore · 94% match with your profile.",
    timestamp: "2 hours ago",
    isRead: false,
  },
  {
    id: "n5",
    type: "mention",
    actor: {
      id: "u5",
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      headline: "Software Engineer at Google",
    },
    content: "Vikram Singh mentioned you in a comment: \"Check out @Suraj Rawat's LinkedIn Clone — it's pixel-perfect!\"",
    timestamp: "3 hours ago",
    isRead: false,
  },
  {
    id: "n6",
    type: "repost",
    actor: {
      id: "u6",
      name: "Sneha Patel",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
      headline: "UI/UX Designer at CRED",
    },
    content: "Sneha Patel reposted your post about open source contributions.",
    postPreview: "Open source is the best way to grow as a developer...",
    timestamp: "5 hours ago",
    isRead: true,
  },
  {
    id: "n7",
    type: "birthday",
    actor: {
      id: "u7",
      name: "Arjun Mehta",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      headline: "Backend Developer at Razorpay",
    },
    content: "Today is Arjun Mehta's birthday! Send him a message to wish him well.",
    timestamp: "8 hours ago",
    isRead: true,
  },
  {
    id: "n8",
    type: "like",
    actor: {
      id: "u8",
      name: "Neha Joshi",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=80&h=80&fit=crop&crop=face",
      headline: "Product Manager at Ola",
    },
    content: "Neha Joshi and 12 others liked your comment on a post by Rahul Gupta.",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "n9",
    type: "anniversary",
    actor: {
      id: "u9",
      name: "Kavya Reddy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
      headline: "Data Scientist at Paytm",
    },
    content: "Congratulate Kavya Reddy on their 2-year work anniversary at Paytm!",
    timestamp: "1 day ago",
    isRead: true,
  },
  {
    id: "n10",
    type: "connection",
    actor: {
      id: "u10",
      name: "Rohan Kapoor",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face",
      headline: "DevOps Engineer at Infosys",
    },
    content: "Rohan Kapoor wants to connect with you. 12 mutual connections.",
    timestamp: "2 days ago",
    isRead: true,
  },
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const NotificationSkeleton: React.FC = () => (
  <div className="flex items-start gap-4 px-4 py-4 border-b border-gray-50 dark:border-gray-800/50 animate-pulse">
    <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
    <div className="flex-1 space-y-2 py-1">
      <div className="h-3.5 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/5" />
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
    </div>
  </div>
);

// ─── Notification Item ────────────────────────────────────────────────────────
const NotificationItem: React.FC<{ notification: Notification; onRead: (id: string) => void }> = ({ notification, onRead }) => {
  const { icon: Icon, bg, color } = NOTIF_ICONS[notification.type] || NOTIF_ICONS.like;

  return (
    <div
      onClick={() => onRead(notification.id)}
      className={`flex items-start gap-4 px-4 py-4 cursor-pointer transition-all duration-150 hover:bg-gray-50 dark:hover:bg-[#2D3741] border-b border-gray-50 dark:border-gray-800/50 group ${
        !notification.isRead ? "bg-[#EAF4FF]/40 dark:bg-[#0A66C2]/5" : ""
      }`}
    >
      {/* Avatar with icon badge */}
      <div className="relative shrink-0">
        <img
          src={notification.actor.avatar}
          alt={notification.actor.name}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ${bg} flex items-center justify-center border-2 border-white dark:border-[#1D2226]`}>
          <Icon className={`w-3 h-3 ${color}`} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-relaxed ${!notification.isRead ? "font-semibold text-[#000000E6] dark:text-white" : "text-[#000000E6] dark:text-[#E7E9EA]"}`}>
          {notification.content}
        </p>
        {notification.postPreview && (
          <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-1 italic border-l-2 border-gray-200 dark:border-gray-600 pl-2 line-clamp-2">
            "{notification.postPreview}"
          </p>
        )}
        <p className={`text-xs mt-1.5 font-medium ${!notification.isRead ? "text-[#0A66C2] dark:text-[#5B9DD9]" : "text-[#666666] dark:text-[#B0B7BE]"}`}>
          {notification.timestamp}
        </p>
      </div>

      <div className="shrink-0 flex flex-col items-center gap-2">
        {!notification.isRead && (
          <div className="w-2.5 h-2.5 bg-[#0A66C2] rounded-full mt-2" />
        )}
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors opacity-0 group-hover:opacity-100"
        >
          <Settings className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE]" />
        </button>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const NotificationsPage: React.FC<NotificationsPageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "jobs" | "mentions">("all");
  const [loading] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const filtered = notifications.filter(n => {
    if (activeFilter === "unread") return !n.isRead;
    if (activeFilter === "jobs") return n.type === "job";
    if (activeFilter === "mentions") return n.type === "mention";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} notificationCount={unreadCount} />

      <main className="max-w-[700px] mx-auto px-4 pt-16 pb-20 md:pb-4">
        <div className="mt-4">
          <div className="card overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <div>
                <h1 className="text-xl font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </h1>
                <p className="text-sm text-[#666666] dark:text-[#B0B7BE] mt-0.5">
                  Stay up to date with your professional world
                </p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] hover:underline"
                  >
                    <CheckCheck className="w-4 h-4" />
                    Mark all read
                  </button>
                )}
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Settings className="w-5 h-5 text-[#666666] dark:text-[#B0B7BE]" />
                </button>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 px-4 pb-3 overflow-x-auto hide-scrollbar">
              {(["all", "unread", "jobs", "mentions"] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                    activeFilter === filter
                      ? "bg-[#000000E6] dark:bg-white text-white dark:text-[#000000E6]"
                      : "text-[#666666] dark:text-[#B0B7BE] hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {filter}
                  {filter === "unread" && unreadCount > 0 && (
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
        </div>
      </main>
    </div>
  );
};

export default NotificationsPage;
