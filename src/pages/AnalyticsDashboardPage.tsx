import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import {
  TrendingUp, Users, Eye, Heart, BarChart2, Activity,
  ArrowUpRight, ArrowDownRight, Calendar, Bell, Briefcase,
  MessageSquare, Star, Award, Globe, ChevronRight, Download
} from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { currentUser } from "@/constants/mockData";

interface AnalyticsDashboardPageProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
}

const weeklyData = [12, 19, 8, 27, 23, 31, 18];
const monthlyData = [140, 210, 185, 260, 320, 290, 410, 380, 450, 510, 480, 560];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["M", "T", "W", "T", "F", "S", "S"];

const MetricCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  sublabel: string;
  color: string;
}> = ({ icon, label, value, change, positive, sublabel, color }) => (
  <div className="card p-5 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 group">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
        positive ? "text-green-600 bg-green-50 dark:bg-green-900/20" : "text-red-500 bg-red-50 dark:bg-red-900/20"
      }`}>
        {positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <p className="text-2xl font-bold text-[#000000E6] dark:text-white mb-0.5">{value}</p>
    <p className="text-sm font-semibold text-[#000000E6] dark:text-white mb-0.5">{label}</p>
    <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{sublabel}</p>
  </div>
);

const BarChartSimple: React.FC<{ data: number[]; labels: string[]; color?: string }> = ({
  data, labels, color = "#0A66C2"
}) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1.5 h-28">
      {data.map((v, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm transition-all duration-500 hover:opacity-80 cursor-pointer relative group"
            style={{ height: `${(v / max) * 100}%`, backgroundColor: color, minHeight: 4 }}
          >
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {v}
            </div>
          </div>
          <span className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
};

const LineChartSimple: React.FC<{ data: number[]; labels: string[]; color?: string }> = ({
  data, labels, color = "#0A66C2"
}) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100 / (data.length - 1);
  const points = data.map((v, i) => `${i * w},${100 - ((v - min) / range) * 80}`).join(" ");

  return (
    <div className="relative">
      <svg viewBox={`0 0 100 100`} className="w-full h-28" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={`0,100 ${points} 100,100`}
          fill="url(#lineGrad)"
          stroke="none"
        />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((v, i) => (
          <circle key={i} cx={i * w} cy={100 - ((v - min) / range) * 80} r="3" fill={color} className="hover:r-4" />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {labels.map((l, i) => (
          <span key={i} className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">{l}</span>
        ))}
      </div>
    </div>
  );
};

const DonutChart: React.FC<{ segments: { label: string; value: number; color: string }[] }> = ({ segments }) => {
  const total = segments.reduce((a, s) => a + s.value, 0);
  let offset = 0;
  const r = 40, cx = 50, cy = 50, circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-24 h-24 shrink-0 -rotate-90">
        {segments.map((seg, i) => {
          const pct = seg.value / total;
          const dash = pct * circumference;
          const gap = circumference - dash;
          const el = (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset * circumference}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          );
          offset += pct;
          return el;
        })}
      </svg>
      <div className="space-y-1.5">
        {segments.map(seg => (
          <div key={seg.label} className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
            <span className="text-xs text-[#000000E6] dark:text-white font-semibold">{seg.label}</span>
            <span className="text-xs text-[#666666] dark:text-[#B0B7BE] ml-auto">{Math.round((seg.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AnalyticsDashboardPage: React.FC<AnalyticsDashboardPageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month");

  const metrics = [
    { icon: <Eye className="w-5 h-5 text-[#0A66C2]" />, label: "Profile Views", value: "10.2K", change: "+18%", positive: true, sublabel: "vs. last period", color: "bg-[#EAF4FF] dark:bg-[#0A66C2]/20" },
    { icon: <Users className="w-5 h-5 text-purple-500" />, label: "Followers", value: "2,000", change: "+12%", positive: true, sublabel: "Total followers", color: "bg-purple-50 dark:bg-purple-900/20" },
    { icon: <TrendingUp className="w-5 h-5 text-green-500" />, label: "Connections", value: "500+", change: "+8%", positive: true, sublabel: "Network size", color: "bg-green-50 dark:bg-green-900/20" },
    { icon: <BarChart2 className="w-5 h-5 text-orange-500" />, label: "Post Reach", value: "50K", change: "+24%", positive: true, sublabel: "Total impressions", color: "bg-orange-50 dark:bg-orange-900/20" },
    { icon: <Heart className="w-5 h-5 text-red-500" />, label: "Engagements", value: "8.4K", change: "+31%", positive: true, sublabel: "Likes & comments", color: "bg-red-50 dark:bg-red-900/20" },
    { icon: <Star className="w-5 h-5 text-yellow-500" />, label: "Search Appearances", value: "1.2K", change: "-3%", positive: false, sublabel: "You appeared in searches", color: "bg-yellow-50 dark:bg-yellow-900/20" },
    { icon: <MessageSquare className="w-5 h-5 text-teal-500" />, label: "InMails Received", value: "47", change: "+5%", positive: true, sublabel: "Direct messages", color: "bg-teal-50 dark:bg-teal-900/20" },
    { icon: <Briefcase className="w-5 h-5 text-blue-500" />, label: "Job Views", value: "234", change: "+42%", positive: true, sublabel: "Recruiters viewed", color: "bg-blue-50 dark:bg-blue-900/20" },
  ];

  const topPosts = [
    { title: "Gave a talk at Google I/O 2026...", views: 8400, likes: 4521, comments: 312, date: "2 days ago" },
    { title: "Closed Series B at TechVentures!", views: 24100, likes: 12450, comments: 892, date: "1 week ago" },
    { title: "AI landscape in 2026 is wild...", views: 16300, likes: 3241, comments: 456, date: "1 week ago" },
    { title: "Just shipped feature at Meta...", views: 9200, likes: 1847, comments: 234, date: "2 weeks ago" },
  ];

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} />

      <main className="max-w-[1128px] mx-auto px-4 pt-16 pb-20 md:pb-6">
        <div className="mt-4 space-y-4">
          {/* Header */}
          <div className="card p-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full border-3 border-white dark:border-[#1D2226] shadow-md bg-gradient-to-br from-[#0A66C2] to-[#5B9DD9] flex items-center justify-center">
                    <span className="text-xl font-bold text-white">SR</span>
                  </div>
                  <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#000000E6] dark:text-white">{currentUser.name}'s Analytics</h1>
                  <p className="text-sm text-[#666666] dark:text-[#B0B7BE]">Detailed performance insights for your profile</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex bg-[#EEF3F8] dark:bg-[#38434F] rounded-lg p-1">
                  {(["week", "month", "year"] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                        period === p
                          ? "bg-white dark:bg-[#1D2226] text-[#000000E6] dark:text-white shadow-sm"
                          : "text-[#666666] dark:text-[#B0B7BE]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE] hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold px-3 py-1.5 rounded-lg text-sm transition-colors">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {metrics.map(m => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Profile Views Chart */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#000000E6] dark:text-white">Profile Views</h3>
                  <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">Monthly trend</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3" /> +18% vs last month
                </div>
              </div>
              <LineChartSimple data={monthlyData} labels={months} color="#0A66C2" />
            </div>

            {/* Weekly Activity */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#000000E6] dark:text-white">Weekly Engagement</h3>
                  <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">Interactions this week</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                  <ArrowUpRight className="w-3 h-3" /> +31%
                </div>
              </div>
              <BarChartSimple data={weeklyData} labels={days} color="#0A66C2" />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Audience Breakdown */}
            <div className="card p-5">
              <h3 className="text-base font-bold text-[#000000E6] dark:text-white mb-4">Audience Breakdown</h3>
              <DonutChart
                segments={[
                  { label: "Software Engineers", value: 42, color: "#0A66C2" },
                  { label: "Students", value: 28, color: "#5B9DD9" },
                  { label: "Recruiters", value: 18, color: "#22c55e" },
                  { label: "Other", value: 12, color: "#94a3b8" },
                ]}
              />
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 space-y-2">
                {[
                  { label: "Top Location", value: "India" },
                  { label: "Top Industry", value: "Technology" },
                  { label: "Top Job Title", value: "Frontend Developer" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">{item.label}</span>
                    <span className="text-xs font-bold text-[#000000E6] dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Posts */}
            <div className="card p-5 lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-[#000000E6] dark:text-white">Top Performing Posts</h3>
                <button className="text-xs font-semibold text-[#0A66C2] hover:underline flex items-center gap-1">
                  View all <ChevronRight className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-3">
                {topPosts.map((post, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F3F2EF] dark:hover:bg-[#2D3741] transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-[#EAF4FF] dark:bg-[#0A66C2]/20 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-[#0A66C2]">#{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#000000E6] dark:text-white line-clamp-1">{post.title}</p>
                      <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">{post.date}</p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-center">
                        <p className="text-sm font-bold text-[#000000E6] dark:text-white">{formatNumber(post.views)}</p>
                        <p className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">Views</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-[#000000E6] dark:text-white">{formatNumber(post.likes)}</p>
                        <p className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">Likes</p>
                      </div>
                      <div className="text-center hidden sm:block">
                        <p className="text-sm font-bold text-[#000000E6] dark:text-white">{post.comments}</p>
                        <p className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">Comments</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#0A66C2]" />
                Recent Activity Summary
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: <Bell className="w-4 h-4" />, label: "New notifications", value: "47", color: "text-[#0A66C2]" },
                { icon: <Users className="w-4 h-4" />, label: "Connection requests", value: "12", color: "text-purple-500" },
                { icon: <Award className="w-4 h-4" />, label: "Skill endorsements", value: "8", color: "text-yellow-500" },
                { icon: <Globe className="w-4 h-4" />, label: "Post shares", value: "156", color: "text-green-500" },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-[#F3F2EF] dark:bg-[#2D3741]">
                  <div className={`${item.color}`}>{item.icon}</div>
                  <div>
                    <p className="text-lg font-bold text-[#000000E6] dark:text-white">{item.value}</p>
                    <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Insights Banner */}
          <div className="card p-5 bg-gradient-to-r from-[#0A66C2] to-[#5B9DD9] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
            <div className="relative z-10 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wide">Premium Insight</span>
                </div>
                <h3 className="text-lg font-bold mb-1">Who's viewing your profile</h3>
                <p className="text-sm text-white/80">See all {formatNumber(currentUser.profileViews)} viewers, their companies & job titles with LinkedIn Premium.</p>
              </div>
              <button className="shrink-0 bg-white text-[#0A66C2] font-bold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors text-sm">
                Try Premium free
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboardPage;
