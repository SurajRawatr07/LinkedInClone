import React, { useState, useRef, useEffect } from "react";
import { Linkedin, ArrowLeft, Shield, RefreshCw } from "lucide-react";

interface OTPVerificationPageProps {
  email: string;
  onVerified: () => void;
  onGoBack: () => void;
}

const OTPVerificationPage: React.FC<OTPVerificationPageProps> = ({ email, onVerified, onGoBack }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(r => r - 1), 1000);
      return () => clearTimeout(t);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    setError("");
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
    if (newOtp.every(d => d) && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = (code?: string) => {
    const finalCode = code || otp.join("");
    if (finalCode.length < 6) { setError("Please enter the complete 6-digit code"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Accept any code for demo
      onVerified();
    }, 1200);
  };

  const handleResend = () => {
    if (!canResend) return;
    setCanResend(false);
    setResendTimer(30);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    inputRefs.current[0]?.focus();
  };

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
          <button onClick={onGoBack} className="flex items-center gap-1.5 text-sm text-[#666666] dark:text-[#B0B7BE] hover:text-[#000000E6] dark:hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#EAF4FF] dark:bg-[#0A66C2]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#0A66C2]" />
            </div>
            <h2 className="text-xl font-bold text-[#000000E6] dark:text-white mb-2">Check your email</h2>
            <p className="text-sm text-[#666666] dark:text-[#B0B7BE]">
              We sent a 6-digit code to
            </p>
            <p className="text-sm font-bold text-[#0A66C2] mt-1">{email}</p>
          </div>

          {/* OTP Input */}
          <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={el => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(idx, e.target.value)}
                onKeyDown={e => handleKeyDown(idx, e)}
                className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl bg-white dark:bg-[#2D3741] text-[#000000E6] dark:text-white outline-none transition-all duration-200
                  ${digit ? "border-[#0A66C2] bg-[#EAF4FF] dark:bg-[#0A66C2]/20" : "border-gray-300 dark:border-gray-600"}
                  focus:border-[#0A66C2] focus:ring-2 focus:ring-[#0A66C2]/20
                  ${error ? "border-red-500" : ""}
                `}
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-sm text-red-500 mb-4">⚠ {error}</p>
          )}

          <button
            onClick={() => handleVerify()}
            disabled={loading || otp.some(d => !d)}
            className="w-full bg-[#0A66C2] hover:bg-[#0958A8] disabled:bg-[#0A66C2]/50 text-white font-bold py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 mb-4"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Verifying...
              </>
            ) : "Verify Code"}
          </button>

          <div className="text-center">
            <p className="text-sm text-[#666666] dark:text-[#B0B7BE]">
              Didn't receive the code?{" "}
              {canResend ? (
                <button onClick={handleResend} className="font-bold text-[#0A66C2] hover:underline flex items-center gap-1 inline-flex">
                  <RefreshCw className="w-3.5 h-3.5" />
                  Resend
                </button>
              ) : (
                <span className="font-semibold text-[#666666] dark:text-[#B0B7BE]">
                  Resend in {resendTimer}s
                </span>
              )}
            </p>
          </div>

          <div className="mt-4 p-3 bg-[#EEF3F8] dark:bg-[#38434F] rounded-xl">
            <p className="text-xs text-[#666666] dark:text-[#B0B7BE] text-center">
              💡 <span className="font-semibold">Demo tip:</span> Enter any 6 digits to proceed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
