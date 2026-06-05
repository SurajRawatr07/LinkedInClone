import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import ProfilePage from "@/pages/ProfilePage";
import JobsPage from "@/pages/JobsPage";
import MessagingPage from "@/pages/MessagingPage";
import NotificationsPage from "@/pages/NotificationsPage";

const App: React.FC = () => {
  const { isDark, toggle } = useDarkMode();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("linkedin-logged-in") === "true";
  });

  const handleLogin = () => {
    localStorage.setItem("linkedin-logged-in", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("linkedin-logged-in");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />} />
            <Route path="/profile" element={<ProfilePage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />} />
            <Route path="/jobs" element={<JobsPage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />} />
            <Route path="/messaging" element={<MessagingPage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />} />
            <Route path="/notifications" element={<NotificationsPage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
