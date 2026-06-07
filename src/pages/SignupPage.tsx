import React, { useState } from "react";
import { Eye, EyeOff, Linkedin, Check, X } from "lucide-react";
import loginBg from "@/assets/login-bg.jpg";

interface SignupPageProps {
  onSignup: () => void;
  onGoToLogin: () => void;
}

const getPasswordStrength = (pwd: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (pwd.length >= 12) score++;
  if (score <= 1) return { score, label: "Weak", color: "#ef4444" };
  if (score <= 2) return { score, label: "Fair", color: "#f97316" };
  if (score <= 3) return { score, label: "Good", color: "#eab308" };
  if (score <= 4) return { score, label: "Strong", color: "#22c55e" };
  return { score: 5, label: "Very Strong", color: "#16a34a" };
};

const PasswordRequirement: React.FC<{ met: boolean; text: string }> = ({ met, text }) => (
  <div className={`flex items-center gap-1.5 text-xs ${met ? "text-green-600 dark:text-green-400" : "text-[#666666] dark:text-[#B0B7BE]"}`}>
    {met ? <Check className="w-3 h-3" /> : <X className="w-3 h-3 opacity-40" />}
    {text}
  </div>
);

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onGoToLogin }) => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);

  const strength = getPasswordStrength(form.password);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    if (!agreed) e.agree = "You must agree to the terms";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSignup(); }, 1400);
  };

  const update = (field: string, value: string) => {
    setForm(p => ({ ...p, [field]: value }));
    setErrors(p => ({ ...p, [field]: "" }));
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#1B1F23]">
      {/* Left Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={loginBg} alt="bg" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/80 via-[#004182]/60 to-[#001B4B]/90" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <Linkedin className="w-7 h-7 text-[#0A66C2]" />
            </div>
            <span className="text-2xl font-bold">LinkedIn</span>
          </div>
          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">Join your professional community</h1>
            <p className="text-xl text-white/80 leading-relaxed">Connect, grow, and discover opportunities with over 1 billion professionals worldwide.</p>
            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { icon: "🚀", title: "Career Growth", desc: "Unlock new opportunities every day" },
                { icon: "🤝", title: "Networking", desc: "Connect with industry leaders" },
                { icon: "📚", title: "Learning", desc: "Access thousands of courses" },
                { icon: "💼", title: "Job Matching", desc: "AI-powered job recommendations" },
              ].map(f => (
                <div key={f.title} className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="text-xl mb-1">{f.icon}</div>
                  <p className="text-sm font-bold">{f.title}</p>
                  <p className="text-xs text-white/70 mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/50 text-sm">© 2026 LinkedIn Corporation. All rights reserved.</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[#F3F2EF] dark:bg-[#1B1F23]">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-6 lg:hidden justify-center">
            <div className="w-9 h-9 bg-[#0A66C2] rounded-md flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#0A66C2]">LinkedIn</span>
          </div>

          <div className="bg-white dark:bg-[#1D2226] rounded-2xl shadow-card p-8">
            <h2 className="text-2xl font-bold text-[#000000E6] dark:text-white mb-1">Make the most of your professional life</h2>
            <p className="text-sm text-[#666666] dark:text-[#B0B7BE] mb-6">Join over 1 billion professionals on LinkedIn</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-[#000000E6] dark:text-white mb-1.5">First name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={e => update("firstName", e.target.value)}
                    placeholder="First name"
                    className={`input-field ${errors.firstName ? "border-red-500" : ""}`}
                  />
                  {errors.firstName && <p className="mt-1 text-xs text-red-500">⚠ {errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#000000E6] dark:text-white mb-1.5">Last name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={e => update("lastName", e.target.value)}
                    placeholder="Last name"
                    className={`input-field ${errors.lastName ? "border-red-500" : ""}`}
                  />
                  {errors.lastName && <p className="mt-1 text-xs text-red-500">⚠ {errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000E6] dark:text-white mb-1.5">Email</label>
                <input
                  type="text"
                  value={form.email}
                  onChange={e => update("email", e.target.value)}
                  placeholder="Enter your email"
                  className={`input-field ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">⚠ {errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000E6] dark:text-white mb-1.5">Password (6+ characters)</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={e => update("password", e.target.value)}
                    placeholder="Create a password"
                    className={`input-field pr-12 ${errors.password ? "border-red-500" : ""}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#000000E6] dark:text-gray-400 dark:hover:text-white transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">⚠ {errors.password}</p>}

                {/* Password strength */}
                {form.password.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div
                            key={i}
                            className="h-1.5 flex-1 rounded-full transition-all duration-300"
                            style={{ backgroundColor: i <= strength.score ? strength.color : "#e5e7eb" }}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <PasswordRequirement met={form.password.length >= 8} text="At least 8 characters" />
                      <PasswordRequirement met={/[A-Z]/.test(form.password)} text="Uppercase letter" />
                      <PasswordRequirement met={/[0-9]/.test(form.password)} text="Number" />
                      <PasswordRequirement met={/[^A-Za-z0-9]/.test(form.password)} text="Special character" />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={e => { setAgreed(e.target.checked); setErrors(p => ({ ...p, agree: "" })); }}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]/30 shrink-0"
                  />
                  <span className="text-xs text-[#000000E6] dark:text-white leading-relaxed">
                    I agree to the{" "}
                    <button type="button" className="text-[#0A66C2] hover:underline font-semibold">User Agreement</button>,{" "}
                    <button type="button" className="text-[#0A66C2] hover:underline font-semibold">Privacy Policy</button>, and{" "}
                    <button type="button" className="text-[#0A66C2] hover:underline font-semibold">Cookie Policy</button>.
                  </span>
                </label>
                {errors.agree && <p className="mt-1 text-xs text-red-500">⚠ {errors.agree}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A66C2] hover:bg-[#0958A8] disabled:bg-[#0A66C2]/70 text-white font-bold py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : "Agree & Join"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
              <span className="text-sm text-[#666666] dark:text-[#B0B7BE]">or</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
            </div>

            <button className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 bg-white dark:bg-[#2D3741] hover:bg-gray-50 dark:hover:bg-[#38434F] text-[#000000E6] dark:text-white font-semibold py-3 rounded-xl transition-all duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <p className="text-center text-sm text-[#666666] dark:text-[#B0B7BE] mt-5">
              Already on LinkedIn?{" "}
              <button onClick={onGoToLogin} className="font-bold text-[#0A66C2] hover:underline">Sign in</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
