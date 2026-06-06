import React, { useState } from "react";
import { Eye, EyeOff, Linkedin } from "lucide-react";
import loginBg from "@/assets/login-bg.jpg";

interfars = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 1200);
  };

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white dark:bg-[#1B1F23]">
      {/* Left - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={loginBg} alt="LinkedIn background" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/80 via-[#004182]/60 to-[#001B4B]/90" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
              <Linkedin className="w-7 h-7 text-[#0A66C2]" />
            </div>
            <span className="text-2xl font-bold tracking-tight">LinkedIn</span>
          </div>
          <div className="max-w-md">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Welcome to your professional community
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Connect with millions of professionals, discover new opportunities, and build the career you deserve.
            </p>
            <div className="flex gap-8 mt-10">
              {[
                { num: "1B+", label: "Members" },
                { num: "200+", label: "Countries" },
                { num: "60M+", label: "Companies" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold">{stat.num}</div>
                  <div className="text-white/70 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-white/50 text-sm">© 2026 LinkedIn Corporation. All rights reserved.</p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-[#F3F2EF] dark:bg-[#1B1F23]">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden justify-center">
            <div className="w-10 h-10 bg-[#0A66C2] rounded-md flex items-center justify-center">
              <Linkedin className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#0A66C2]">LinkedIn</span>
          </div>

          <div className="bg-white dark:bg-[#1D2226] rounded-2xl shadow-card p-8">
            <h2 className="text-3xl font-bold text-[#000000E6] dark:text-white mb-1">Sign in</h2>
            <p className="text-[#666666] dark:text-[#B0B7BE] mb-6">Stay updated on your professional world</p>

            {/* Google Sign In */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-white dark:bg-[#2D3741] hover:bg-gray-50 dark:hover:bg-[#38434F] text-[#000000E6] dark:text-white font-semibold py-3 rounded-xl transition-all duration-200 mb-4 active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
              <span className="text-sm text-[#666666] dark:text-[#B0B7BE] font-medium">or</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#000000E6] dark:text-white mb-1.5">
                  Email or phone
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                  placeholder="Enter your email"
                  className={`input-field ${errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1">⚠ {errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#000000E6] dark:text-white mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                    placeholder="Enter your password"
                    className={`input-field pr-12 ${errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#000000E6] dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500 flex items-center gap-1">⚠ {errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[#0A66C2] focus:ring-[#0A66C2]/30"
                  />
                  <span className="text-sm text-[#000000E6] dark:text-white">Remember me</span>
                </label>
                <button type="button" className="text-sm font-semibold text-[#0A66C2] hover:underline">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0A66C2] hover:bg-[#0958A8] disabled:bg-[#0A66C2]/70 text-white font-bold py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 text-base"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : "Sign in"}
              </button>
            </form>

            <p className="text-center text-sm text-[#666666] dark:text-[#B0B7BE] mt-6">
              New to LinkedIn?{" "}
              <button className="font-bold text-[#0A66C2] hover:underline">
                Join now
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-[#666666] dark:text-[#B0B7BE] mt-6 leading-relaxed">
            By clicking Continue, you agree to LinkedIn's{" "}
            <button className="text-[#0A66C2] hover:underline">User Agreement</button>,{" "}
            <button className="text-[#0A66C2] hover:underline">Privacy Policy</button>, and{" "}
            <button className="text-[#0A66C2] hover:underline">Cookie Policy</button>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
