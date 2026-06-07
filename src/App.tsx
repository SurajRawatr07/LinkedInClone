import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import OTPVerificationPage from "@/pages/OTPVerificationPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import JobsPage from "@/pages/JobsPage";
import MessagingPage from "@/pages/MessagingPage";
import NotificationsPage from "@/pages/NotificationsPage";
import NetworkPage from "@/pages/NetworkPage";
import AnalyticsDashboardPage from "@/pages/AnalyticsDashboardPage";
import SettingsPage from "@/pages/SettingsPage";
import CommunityPage from "@/pages/CommunityPage";
import NotFound from "@/pages/NotFound";

type AuthScreen = "login" | "signup" | "forgot" | "otp" | "reset";

const SESSION_KEY = "linkedin_session";

const App: React.FC = () => {
  const { isDark, toggle } = useDarkMode();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      return localStorage.getItem(SESSION_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [otpEmail, setOtpEmail] = useState("");

  const handleLogin = () => {
    try { localStorage.setItem(SESSION_KEY, "true"); } catch {}
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    try { localStorage.removeItem(SESSION_KEY); } catch {}
    setIsLoggedIn(false);
    setAuthScreen("login");
  };

  const handleForgotPassword = (email: string) => {
    setOtpEmail(email);
    setAuthScreen("otp");
  };

  const renderAuthScreen = () => {
    switch (authScreen) {
      case "signup":
        return <SignupPage onSignup={handleLogin} onGoToLogin={() => setAuthScreen("login")} />;
      case "forgot":
        return (
          <ForgotPasswordPage
            onGoToLogin={() => setAuthScreen("login")}
            onGoToOTP={handleForgotPassword}
          />
        );
      case "otp":
        return (
          <OTPVerificationPage
            email={otpEmail}
            onVerified={() => setAuthScreen("reset")}
            onGoBack={() => setAuthScreen("forgot")}
          />
        );
      case "reset":
        return (
          <ResetPasswordPage
            onReset={() => setAuthScreen("login")}
            onGoToLogin={() => setAuthScreen("login")}
          />
        );
      default:
        return (
          <LoginPage
            onLogin={handleLogin}
            onGoToSignup={() => setAuthScreen("signup")}
            onForgotPassword={() => setAuthScreen("forgot")}
          />
        );
    }
  };

  const sharedProps = { isDark, toggleDark: toggle, onLogout: handleLogout };

  return (
    <div className={isDark ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="*" element={renderAuthScreen()} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage {...sharedProps} />} />
              <Route path="/profile" element={<ProfilePage {...sharedProps} />} />
              <Route path="/jobs" element={<JobsPage {...sharedProps} />} />
              <Route path="/messaging" element={<MessagingPage {...sharedProps} />} />
              <Route path="/notifications" element={<NotificationsPage {...sharedProps} />} />
              <Route path="/network" element={<NetworkPage {...sharedProps} />} />
              <Route path="/analytics" element={<AnalyticsDashboardPage {...sharedProps} />} />
              <Route path="/settings" element={<SettingsPage {...sharedProps} />} />
              <Route path="/community" element={<CommunityPage {...sharedProps} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
