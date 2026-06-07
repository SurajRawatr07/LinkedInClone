import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import {
  User, Lock, Bell, Eye, Moon, Globe, Smartphone, Shield,
  ChevronRight, Check, Trash2, LogOut, Download,
  Mail, Key, Link2, Languages, Sun, Monitor
} from "lucide-react";

interface SettingsPageProps {
  isDark: boolean;
  toggleDark: () => void;
  onLogout: () => void;
}

const Toggle2: React.FC<{ enabled: boolean; onChange: (v: boolean) => void }> = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-11 h-6 rounded-full transition-all duration-300 shrink-0 ${enabled ? "bg-[#0A66C2]" : "bg-gray-300 dark:bg-gray-600"}`}
  >
    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300 ${enabled ? "left-6" : "left-1"}`} />
  </button>
);

const SettingsSection: React.FC<{ title: string; desc?: string; children: React.ReactNode }> = ({ title, desc, children }) => (
  <div className="card overflow-hidden">
    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
      <h3 className="text-base font-bold text-[#000000E6] dark:text-white">{title}</h3>
      {desc && <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">{desc}</p>}
    </div>
    <div className="divide-y divide-gray-50 dark:divide-gray-700/50">{children}</div>
  </div>
);

const SettingsRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  desc?: string;
  action?: React.ReactNode;
  onClick?: () => void;
}> = ({ icon, label, desc, action, onClick }) => (
  <div
    className={`flex items-center gap-4 px-5 py-4 ${onClick ? "cursor-pointer hover:bg-gray-50 dark:hover:bg-[#2D3741] transition-colors" : ""}`}
    onClick={onClick}
  >
    <div className="w-9 h-9 rounded-xl bg-[#EEF3F8] dark:bg-[#38434F] flex items-center justify-center shrink-0 text-[#0A66C2]">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-[#000000E6] dark:text-white">{label}</p>
      {desc && <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">{desc}</p>}
    </div>
    {action || (onClick && <ChevronRight className="w-4 h-4 text-[#666666] dark:text-[#B0B7BE] shrink-0" />)}
  </div>
);

const SettingsPage: React.FC<SettingsPageProps> = ({ isDark, toggleDark, onLogout }) => {
  const [activeTab, setActiveTab] = useState("account");
  const [notifs, setNotifs] = useState({
    email_connections: true,
    email_messages: true,
    email_jobs: false,
    email_mentions: true,
    push_all: true,
    push_messages: true,
    push_jobs: false,
    job_alerts: true,
  });
  const [privacy, setPrivacy] = useState({
    profile_public: true,
    show_email: false,
    show_phone: false,
    allow_messages: true,
    search_by_email: true,
    read_receipts: true,
    active_status: true,
  });
  const [theme, setTheme] = useState<"light" | "dark" | "system">(isDark ? "dark" : "light");
  const [language, setLanguage] = useState("English");

  const tabs = [
    { id: "account", label: "Account", icon: <User className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy", icon: <Lock className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Eye className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
  ];

  const handleThemeChange = (t: "light" | "dark" | "system") => {
    setTheme(t);
    if (t === "dark" && !isDark) toggleDark();
    if (t === "light" && isDark) toggleDark();
  };

  return (
    <div className="min-h-screen bg-[#F3F2EF] dark:bg-[#1B1F23]">
      <Navbar isDark={isDark} toggleDark={toggleDark} onLogout={onLogout} />

      <main className="max-w-[900px] mx-auto px-4 pt-16 pb-20 md:pb-6">
        <div className="mt-4">
          <h1 className="text-2xl font-bold text-[#000000E6] dark:text-white mb-4">Settings</h1>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Sidebar Nav */}
            <div className="md:w-56 shrink-0">
              <div className="card p-2 sticky top-20">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-[#EAF4FF] dark:bg-[#0A66C2]/20 text-[#0A66C2]"
                        : "text-[#666666] dark:text-[#B0B7BE] hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 space-y-4">
              {/* ACCOUNT */}
              {activeTab === "account" && (
                <>
                  <SettingsSection title="Account preferences" desc="Manage your basic account information">
                    <SettingsRow icon={<Mail className="w-4 h-4" />} label="Email address" desc="surajrawat@gmail.com" action={<button className="text-xs font-semibold text-[#0A66C2] hover:underline">Change</button>} />
                    <SettingsRow icon={<Smartphone className="w-4 h-4" />} label="Phone number" desc="Add a phone number for security" onClick={() => {}} />
                    <SettingsRow icon={<Globe className="w-4 h-4" />} label="Website" desc="yourportfolio.com" action={<button className="text-xs font-semibold text-[#0A66C2] hover:underline">Edit</button>} />
                    <SettingsRow icon={<Languages className="w-4 h-4" />} label="Language" desc={language} onClick={() => {}} />
                  </SettingsSection>

                  <SettingsSection title="LinkedIn Premium" desc="Manage your subscription">
                    <div className="px-5 py-4">
                      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-xl border border-yellow-200 dark:border-yellow-700/50">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">In</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-[#000000E6] dark:text-white">Upgrade to Premium</p>
                          <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">Unlock InMail, profile insights, and more</p>
                        </div>
                        <button className="shrink-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold px-4 py-1.5 rounded-full text-xs hover:from-yellow-600 hover:to-yellow-700 transition-all">
                          Try Free
                        </button>
                      </div>
                    </div>
                  </SettingsSection>

                  <SettingsSection title="Data and privacy">
                    <SettingsRow icon={<Download className="w-4 h-4" />} label="Get a copy of your data" desc="Download your LinkedIn data archive" onClick={() => {}} />
                    <SettingsRow icon={<Trash2 className="w-4 h-4 text-red-500" />} label="Close account" desc="Permanently close your LinkedIn account" onClick={() => {}} />
                  </SettingsSection>
                </>
              )}

              {/* PRIVACY */}
              {activeTab === "privacy" && (
                <>
                  <SettingsSection title="Profile visibility" desc="Control who can see your information">
                    {[
                      { key: "profile_public", label: "Public profile", desc: "Anyone on or off LinkedIn can see your profile" },
                      { key: "show_email", label: "Show email address", desc: "Let connections see your email" },
                      { key: "show_phone", label: "Show phone number", desc: "Let connections see your phone" },
                      { key: "allow_messages", label: "Allow messages from non-connections", desc: "Receive InMails from anyone" },
                    ].map(item => (
                      <div key={item.key} className="flex items-center gap-4 px-5 py-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#000000E6] dark:text-white">{item.label}</p>
                          <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle2
                          enabled={privacy[item.key as keyof typeof privacy] as boolean}
                          onChange={v => setPrivacy(p => ({ ...p, [item.key]: v }))}
                        />
                      </div>
                    ))}
                  </SettingsSection>

                  <SettingsSection title="Active status & messaging">
                    {[
                      { key: "active_status", label: "Active status", desc: "Show connections when you're online" },
                      { key: "read_receipts", label: "Read receipts", desc: "Let others know when you've read their messages" },
                      { key: "search_by_email", label: "Searchable by email", desc: "Allow people to find you by email address" },
                    ].map(item => (
                      <div key={item.key} className="flex items-center gap-4 px-5 py-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#000000E6] dark:text-white">{item.label}</p>
                          <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle2
                          enabled={privacy[item.key as keyof typeof privacy] as boolean}
                          onChange={v => setPrivacy(p => ({ ...p, [item.key]: v }))}
                        />
                      </div>
                    ))}
                  </SettingsSection>
                </>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <>
                  <SettingsSection title="Email notifications" desc="Choose which emails LinkedIn can send you">
                    {[
                      { key: "email_connections", label: "New connection requests", desc: "When someone wants to connect" },
                      { key: "email_messages", label: "Messages", desc: "When you receive a new message" },
                      { key: "email_jobs", label: "Job recommendations", desc: "Weekly job matches for you" },
                      { key: "email_mentions", label: "Mentions and comments", desc: "When someone mentions or comments on you" },
                    ].map(item => (
                      <div key={item.key} className="flex items-center gap-4 px-5 py-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#000000E6] dark:text-white">{item.label}</p>
                          <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle2
                          enabled={notifs[item.key as keyof typeof notifs]}
                          onChange={v => setNotifs(n => ({ ...n, [item.key]: v }))}
                        />
                      </div>
                    ))}
                  </SettingsSection>

                  <SettingsSection title="Push notifications">
                    {[
                      { key: "push_all", label: "All notifications", desc: "Show all LinkedIn push notifications" },
                      { key: "push_messages", label: "Direct messages", desc: "Notify for new messages" },
                      { key: "push_jobs", label: "Job alerts", desc: "Notify for new job matches" },
                      { key: "job_alerts", label: "Weekly job digest", desc: "Summary of new job openings" },
                    ].map(item => (
                      <div key={item.key} className="flex items-center gap-4 px-5 py-4">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#000000E6] dark:text-white">{item.label}</p>
                          <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mt-0.5">{item.desc}</p>
                        </div>
                        <Toggle2
                          enabled={notifs[item.key as keyof typeof notifs]}
                          onChange={v => setNotifs(n => ({ ...n, [item.key]: v }))}
                        />
                      </div>
                    ))}
                  </SettingsSection>
                </>
              )}

              {/* APPEARANCE */}
              {activeTab === "appearance" && (
                <>
                  <SettingsSection title="Theme" desc="Choose how LinkedIn looks for you">
                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "light", icon: <Sun className="w-5 h-5" />, label: "Light" },
                          { id: "dark", icon: <Moon className="w-5 h-5" />, label: "Dark" },
                          { id: "system", icon: <Monitor className="w-5 h-5" />, label: "System" },
                        ].map(t => (
                          <button
                            key={t.id}
                            onClick={() => handleThemeChange(t.id as "light" | "dark" | "system")}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                              theme === t.id
                                ? "border-[#0A66C2] bg-[#EAF4FF] dark:bg-[#0A66C2]/20"
                                : "border-gray-200 dark:border-gray-600 hover:border-gray-300"
                            }`}
                          >
                            <div className={theme === t.id ? "text-[#0A66C2]" : "text-[#666666] dark:text-[#B0B7BE]"}>{t.icon}</div>
                            <span className={`text-sm font-semibold ${theme === t.id ? "text-[#0A66C2]" : "text-[#000000E6] dark:text-white"}`}>{t.label}</span>
                            {theme === t.id && <Check className="w-4 h-4 text-[#0A66C2]" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </SettingsSection>

                  <SettingsSection title="Language" desc="Choose your preferred language">
                    <div className="p-5">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {["English", "हिंदी", "Español", "Français", "Deutsch", "中文"].map(lang => (
                          <button
                            key={lang}
                            onClick={() => setLanguage(lang)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                              language === lang
                                ? "border-[#0A66C2] bg-[#EAF4FF] dark:bg-[#0A66C2]/20 text-[#0A66C2]"
                                : "border-gray-200 dark:border-gray-600 text-[#666666] dark:text-[#B0B7BE] hover:border-gray-300"
                            }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </div>
                    </div>
                  </SettingsSection>
                </>
              )}

              {/* SECURITY */}
              {activeTab === "security" && (
                <>
                  <SettingsSection title="Sign in & security" desc="Manage your password and sign-in methods">
                    <SettingsRow icon={<Key className="w-4 h-4" />} label="Change password" desc="Last changed 3 months ago" onClick={() => {}} />
                    <SettingsRow icon={<Shield className="w-4 h-4" />} label="Two-step verification" desc="Add an extra layer of security" action={
                      <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2 py-0.5 rounded-full">Off</span>
                    } onClick={() => {}} />
                    <SettingsRow icon={<Link2 className="w-4 h-4" />} label="Connected apps" desc="Manage apps with access to your account" onClick={() => {}} />
                  </SettingsSection>

                  <SettingsSection title="Sign-in history" desc="Recent sign-in activity">
                    <div className="p-5 space-y-3">
                      {[
                        { device: "Chrome on Windows", location: "India", time: "Active now", current: true },
                        { device: "LinkedIn Mobile (Android)", location: "India", time: "2 hours ago", current: false },
                        { device: "Safari on iPhone", location: "India", time: "Yesterday, 8:42 PM", current: false },
                      ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#F3F2EF] dark:bg-[#2D3741]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#EAF4FF] dark:bg-[#0A66C2]/20 flex items-center justify-center">
                              <Smartphone className="w-4 h-4 text-[#0A66C2]" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-[#000000E6] dark:text-white">{session.device}</p>
                                {session.current && <span className="text-[10px] font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full">Current</span>}
                              </div>
                              <p className="text-xs text-[#666666] dark:text-[#B0B7BE]">{session.location} · {session.time}</p>
                            </div>
                          </div>
                          {!session.current && (
                            <button className="text-xs font-semibold text-red-500 hover:underline">Sign out</button>
                          )}
                        </div>
                      ))}
                    </div>
                  </SettingsSection>

                  <div className="card p-5">
                    <button
                      onClick={onLogout}
                      className="w-full flex items-center justify-center gap-2 text-red-500 border-2 border-red-200 dark:border-red-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 font-bold py-3 rounded-xl transition-all"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign out of all devices
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
