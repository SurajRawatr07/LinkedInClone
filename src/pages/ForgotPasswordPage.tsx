import React, { useState } from "react";
import { Linkedin, ArrowLeft, Mail, CheckCircle } from "lucide-react";

interface ForgotPasswordPageProps {
  onGoToLogin: () => void;
  onGoToOTP: (email: string) => void;
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ onGoToLogin, onGoToOTP }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F2EF] dark:bg-[#1B1F23] p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 bg-[#0A66C2] rounded-md flex items-center justify-center">
            <Linkedin className="w-7 h-7 text-white" />
          </div>
          <span className="text-2xl font-bold text-[#0A66C2]">LinkedIn</span>
        </div>

        <div className="bg-white dark:bg-[#1D2226] rounded-2xl shadow-card p-8">
          {!sent ? (
            <>
              <button onClick={onGoToLogin} className="flex items-center gap-1.5 text-sm text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[#EAF4FF] dark:bg-[#0A66C2]/20 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#0A66C2]" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#000000E6] dark:text-white">Forgot password?</h2>
                  <p className="text-sm text-[#666666] dark:text-[#B0B7BE]">No worries, we'll send you reset instructions.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#000000E6] dark:text-white mb-1.5">Email address</label>
                  <input
                    type="text"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setError(""); }}
                    placeholder="Enter your registered email"
                    className={`input-field ${error ? "border-red-500" : ""}`}
                  />
                  {error && <p className="mt-1 text-xs text-red-500">⚠ {error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0A66C2] hover:bg-[#0958A8] disabled:bg-[#0A66C2]/70 text-white font-bold py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : "Send Reset Link"}
                </button>
              </form>

              <p className="text-center text-sm text-[#666666] dark:text-[#B0B7BE] mt-5">
                Don't have an account?{" "}
                <button className="font-bold text-[#0A66C2] hover:underline">Join now</button>
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-xl font-bold text-[#000000E6] dark:text-white mb-2">Check your email</h2>
              <p className="text-sm text-[#666666] dark:text-[#B0B7BE] leading-relaxed mb-1">
                We sent a password reset link to
              </p>
              <p className="text-sm font-bold text-[#0A66C2] mb-6">{email}</p>
              <p className="text-xs text-[#666666] dark:text-[#B0B7BE] mb-6">
                Didn't receive the email? Check your spam folder or try another email address.
              </p>
              <button
                onClick={() => onGoToOTP(email)}
                className="w-full bg-[#0A66C2] hover:bg-[#0958A8] text-white font-bold py-3 rounded-xl transition-all mb-3"
              >
                Enter OTP Code
              </button>
              <button
                onClick={handleSubmit as unknown as React.MouseEventHandler}
                className="w-full border border-gray-300 dark:border-gray-600 text-[#000000E6] dark:text-white font-semibold py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Resend email
              </button>
              <button onClick={onGoToLogin} className="flex items-center gap-1.5 text-sm text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white mt-4 mx-auto transition-colors justify-center">
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
