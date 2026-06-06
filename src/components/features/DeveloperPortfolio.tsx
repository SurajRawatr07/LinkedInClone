import React, { useState } from "react";
import {
  Github, Code2, Trophy, Flame, Star, GitFork,
  ExternalLink, Terminal, Zap, Target, Award
} from "lucide-react";

const contributionData = Array.from({ length: 52 * 7 }, (_, i) => {
  const rand = Math.random();
  if (rand < 0.35) return 0;
  if (rand < 0.6) return 1;
  if (rand < 0.8) return 2;
  if (rand < 0.92) return 3;
  return 4;
});

const intensityClass = (v: number) => {
  const classes = [
    "bg-gray-100 dark:bg-gray-800",
    "bg-[#9BE9A8] dark:bg-[#0e4429]",
    "bg-[#40C463] dark:bg-[#006d32]",
    "bg-[#30A14E] dark:bg-[#26a641]",
    "bg-[#216E39] dark:bg-[#39d353]",
  ];
  return classes[v] || classes[0];
};

const repos = [
  { name: "one-ide", description: "Browser-based multi-language code editor with real-time output", stars: 148, forks: 34, lang: "TypeScript", langColor: "#3178c6" },
  { name: "readme-design-kit", description: "Drag-and-drop GitHub README builder with live preview", stars: 203, forks: 56, lang: "React", langColor: "#61dafb" },
  { name: "linkedin-clone", description: "Pixel-perfect LinkedIn frontend clone with full responsive design", stars: 312, forks: 78, lang: "TypeScript", langColor: "#3178c6" },
  { name: "dev-community", description: "Community platform for developers to share resources and connect", stars: 89, forks: 22, lang: "JavaScript", langColor: "#f1e05a" },
];

const leetcodeStats = [
  { label: "Solved", value: "247", total: "2680", color: "#0A66C2", pct: 9 },
  { label: "Easy", value: "112", total: "782", color: "#00b8a3", pct: 14 },
  { label: "Medium", value: "108", total: "1644", color: "#ffc01e", pct: 7 },
  { label: "Hard", value: "27", total: "694", color: "#ef4743", pct: 4 },
];

const DeveloperPortfolio: React.FC = () => {
  const [activeSection, setActiveSection] = useState<"github" | "leetcode" | "achievements">("github");

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#000000E6] dark:text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-[#0A66C2]" />
          Developer Portfolio
        </h2>
        <div className="flex gap-1 bg-[#F3F2EF] dark:bg-[#2D3741] rounded-lg p-1">
          {(["github", "leetcode", "achievements"] as const).map(s => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                activeSection === s
                  ? "bg-white dark:bg-[#1D2226] text-[#000000E6] dark:text-white shadow-sm"
                  : "text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white"
              }`}
            >
              {s === "github" ? "GitHub" : s === "leetcode" ? "LeetCode" : "Awards"}
            </button>
          ))}
        </div>
      </div>

      {/* GitHub Section */}
      {activeSection === "github" && (
        <div className="space-y-4 animate-fade-in">
          {/* Contribution Heatmap */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-[#000000E6] dark:text-white">Contribution Activity</p>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-xs font-bold text-orange-500">42 day streak</span>
              </div>
            </div>
            <div className="overflow-x-auto hide-scrollbar">
              <div className="min-w-[600px]">
                <div className="flex gap-[3px]">
                  {Array.from({ length: 52 }, (_, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }, (_, dayIdx) => {
                        const val = contributionData[weekIdx * 7 + dayIdx] ?? 0;
                        return (
                          <div
                            key={dayIdx}
                            title={`${val} contributions`}
                            className={`w-[10px] h-[10px] rounded-sm ${intensityClass(val)} hover:ring-1 hover:ring-[#0A66C2] transition-all cursor-pointer`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-1.5 mt-2">
                  <span className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">Less</span>
                  {[0,1,2,3,4].map(v => (
                    <div key={v} className={`w-[10px] h-[10px] rounded-sm ${intensityClass(v)}`} />
                  ))}
                  <span className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">More</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">
                <span className="font-bold text-[#000000E6] dark:text-white">847</span> contributions this year
              </span>
              <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">
                <span className="font-bold text-[#000000E6] dark:text-white">12</span> repos
              </span>
              <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">
                <span className="font-bold text-[#000000E6] dark:text-white">752</span> stars earned
              </span>
            </div>
          </div>

          {/* Featured Repos */}
          <div>
            <p className="text-sm font-semibold text-[#000000E6] dark:text-white mb-2 flex items-center gap-2">
              <Star className="w-4 h-4 text-[#915907]" />
              Featured Repositories
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {repos.map(repo => (
                <div
                  key={repo.name}
                  className="border border-gray-200 dark:border-gray-600 rounded-xl p-3 hover:border-[#0A66C2] hover:shadow-sm transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Github className="w-4 h-4 text-[#000000E6] dark:text-white shrink-0" />
                      <span className="text-sm font-bold text-[#0A66C2] dark:text-[#5B9DD9] truncate group-hover:underline">{repo.name}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#666666] dark:text-[#B0B7BE] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-[#666666] dark:text-[#B0B7BE] leading-relaxed line-clamp-2 mb-2">{repo.description}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.langColor }} />
                      <span className="text-[11px] text-[#666666] dark:text-[#B0B7BE]">{repo.lang}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#666666] dark:text-[#B0B7BE]">
                      <Star className="w-3 h-3" />
                      <span className="text-[11px]">{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#666666] dark:text-[#B0B7BE]">
                      <GitFork className="w-3 h-3" />
                      <span className="text-[11px]">{repo.forks}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* LeetCode Section */}
      {activeSection === "leetcode" && (
        <div className="animate-fade-in space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 border-[#0A66C2] relative">
              <span className="text-xl font-bold text-[#000000E6] dark:text-white">247</span>
              <span className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">Solved</span>
            </div>
            <div className="flex-1 space-y-2 min-w-0">
              {leetcodeStats.slice(1).map(stat => (
                <div key={stat.label}>
                  <div className="flex justify-between mb-0.5">
                    <span className="text-xs font-semibold" style={{ color: stat.color }}>{stat.label}</span>
                    <span className="text-xs text-[#666666] dark:text-[#B0B7BE]">{stat.value}/{stat.total}</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${stat.pct}%`, backgroundColor: stat.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: <Target className="w-4 h-4" />, label: "Acceptance", value: "68.4%", color: "text-green-500" },
              { icon: <Flame className="w-4 h-4" />, label: "Current Streak", value: "18 days", color: "text-orange-500" },
              { icon: <Zap className="w-4 h-4" />, label: "Rank", value: "Top 15%", color: "text-[#0A66C2]" },
            ].map(item => (
              <div key={item.label} className="bg-[#F3F2EF] dark:bg-[#2D3741] rounded-xl p-3 text-center">
                <div className={`flex justify-center mb-1 ${item.color}`}>{item.icon}</div>
                <p className="text-sm font-bold text-[#000000E6] dark:text-white">{item.value}</p>
                <p className="text-[10px] text-[#666666] dark:text-[#B0B7BE]">{item.label}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#000000E6] dark:text-white mb-2">Recent Submissions</p>
            <div className="space-y-2">
              {[
                { title: "Two Sum", difficulty: "Easy", status: "Accepted", time: "2h ago" },
                { title: "Binary Tree Level Order Traversal", difficulty: "Medium", status: "Accepted", time: "1d ago" },
                { title: "Trapping Rain Water", difficulty: "Hard", status: "Accepted", time: "2d ago" },
              ].map(s => (
                <div key={s.title} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <Code2 className="w-4 h-4 text-[#0A66C2] shrink-0" />
                    <span className="text-sm text-[#000000E6] dark:text-white truncate">{s.title}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      s.difficulty === "Easy" ? "text-green-600 bg-green-50 dark:bg-green-900/30" :
                      s.difficulty === "Medium" ? "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30" :
                      "text-red-600 bg-red-50 dark:bg-red-900/30"
                    }`}>{s.difficulty}</span>
                    <span className="text-[10px] text-green-500 font-semibold">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Achievements Section */}
      {activeSection === "achievements" && (
        <div className="animate-fade-in space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: "🏆", title: "Hackathon Winner", desc: "1st place — CodeHack 2025", color: "from-yellow-400 to-yellow-600" },
              { icon: "⭐", title: "Open Source", desc: "500+ GitHub stars earned", color: "from-blue-400 to-blue-600" },
              { icon: "🔥", title: "Streak Master", desc: "42 day coding streak", color: "from-orange-400 to-red-500" },
              { icon: "🎯", title: "DSA Champion", desc: "247 LeetCode problems", color: "from-green-400 to-green-600" },
              { icon: "👥", title: "Community Builder", desc: "Tech Circle founder", color: "from-purple-400 to-purple-600" },
              { icon: "📜", title: "Certified", desc: "4 dev certifications", color: "from-teal-400 to-teal-600" },
            ].map(a => (
              <div
                key={a.title}
                className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${a.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                <div className="text-2xl mb-2">{a.icon}</div>
                <p className="text-xs font-bold text-[#000000E6] dark:text-white leading-tight">{a.title}</p>
                <p className="text-[10px] text-[#666666] dark:text-[#B0B7BE] mt-0.5 leading-tight">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-[#F3F2EF] dark:bg-[#2D3741] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#915907]" />
              <p className="text-sm font-bold text-[#000000E6] dark:text-white">Hackathon History</p>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {[
                { event: "CodeHack 2025", result: "🥇 Winner", project: "ONE IDE" },
                { event: "HackIndia 2025", result: "🥈 Runner-up", project: "Dev Community" },
                { event: "BuildFest 2024", result: "🏅 Finalist", project: "README Design Kit" },
              ].map(h => (
                <div key={h.event} className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#2D3741] transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-[#000000E6] dark:text-white">{h.event}</p>
                    <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{h.project}</p>
                  </div>
                  <span className="text-sm font-bold">{h.result}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperPortfolio;
