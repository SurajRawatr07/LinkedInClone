import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import LoginPage from "@/pages/LoginPage";
import HomePafalse);
  };dIn ? (
            <>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
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
