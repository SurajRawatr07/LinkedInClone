import React, { useState } from "react";
import { Eye, EyeOff, Linkedin, ArrowLeft, Check, X, CheckCircle } from "lucide-react";

interface ResetPasswordPageProps {
  onReset: () => void;
  onGoToLogin: () => void;
}

const getStrength = (pwd: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (pwd.length >= 12) score++;
  if (score <= 1) return { score, label: "Weak", color: "#ef4444" };
  if (score <= 2) return { score, label: "Fair", color: "#f97316" };
  if (score <= 3) return { score, label: "Good", color: "#eab308" };
  return { score: Math.min(score, 5), label: score >= 4 ? "Strong" : "Good", color: score >= 4 ? "#22c55e" : "#eab308" };
};

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = ({ onReset, onGoToLogin }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});

  const strength = getStrength(password);
  const passwordsMatch = password && confirm && password === confirm;

  const validate = () => {
    const e: typeof errors = {};
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Must be at least 8 characters";
    if (!confirm) e.confirm = "Please confirm your password";
    else if (password !== confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 1200);
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F2EF] dark:bg-[#1B1F23] p-4">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 bg-[#0A66C2] rounded-md flex items-center justify-center">
              <Linkedin className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="bg-white dark:bg-[#1D2226] rounded-2xl shadow-card p-8 text-center">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-[#000000E6] dark:text-white mb-2">Password reset!</h2>
            <p className="text-sm text-[#666666] dark:text-[#B0B7BE] mb-6">Your password has been successfully reset. Click below to sign in with your new password.</p>
            <button
              onClick={onReset}
              className="w-full bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold py-3.5 rounded-xl transition-all"
            >
              Continue to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F2EF] dark:bg-[#1B1F23] p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 bg-[#0A66C2] rounded-md flex items-center justify-center">
            <Linkedin className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#0A66C2]">LinkedIn</span>
        </div>

        <div className="bg-white dark:bg-[#1D2226] rounded-2xl shadow-card p-8">
          <button onClick={onGoToLogin} className="flex items-center gap-1.5 text-sm text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </button>

          <h2 className="text-xl font-bold text-[#000000E6] dark:text-white mb-1">Set new password</h2>
          <p className="text-sm text-[#666666] dark:text-[#B0B7BE] mb-6">Must be at least 8 characters.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#000000E6] dark:text-white mb-1.5">New password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: "" })); }}
                  placeholder="Create a strong password"
                  className={`input-field pr-12 ${errors.password ? "border-red-500" : ""}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#000000E6] dark:text-gray-400 dark:hover:text-white transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">⚠ {errors.password}</p>}
              {password.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="h-1.5 flex-1 rounded-full transition-all duration-300"
                          style={{ backgroundColor: i <= strength.score ? strength.color : "#e5e7eb" }} />
                      ))}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#000000E6] dark:text-white mb-1.5">Confirm password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setErrors(p => ({ ...p, confirm: "" })); }}
                  placeholder="Confirm your password"
                  className={`input-field pr-12 ${errors.confirm ? "border-red-500" : confirm && passwordsMatch ? "border-green-500" : ""}`}
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#000000E6] dark:text-gray-400 dark:hover:text-white transition-colors">
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirm && <p className="mt-1 text-xs text-red-500">⚠ {errors.confirm}</p>}
              {confirm && passwordsMatch && (
                <p className="mt-1 text-xs text-green-500 flex items-center gap-1"><Check className="w-3 h-3" /> Passwords match</p>
              )}
              {confirm && !passwordsMatch && !errors.confirm && (
                <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><X className="w-3 h-3" /> Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A66C2] hover:bg-[#0958A8] disabled:bg-[#0A66C2]/70 text-white font-bold py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Resetting...
                </>
              ) : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
