import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import LoginPage from "@/pages/LoginPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import JobsPage from "@/pages/JobsPage";
import MessagingPa

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className={isDark ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<HomePage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />}
              />
              <Route
                path="/profile"
                element={<ProfilePage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />}
              />
              <Route
                path="/jobs"
                element={<JobsPage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />}
              />
              <Route
                path="/messaging"
                element={<MessagingPage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />}
              />
              <Route
                path="/notifications"
                element={<NotificationsPage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />}
              />
              <Route
                path="/network"
                element={<NetworkPage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
