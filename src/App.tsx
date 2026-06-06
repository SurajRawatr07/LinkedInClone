import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDarkMode } from "@/hooks/useDarkMode";
import LoginPage from "@/pages/LoginPage";
import HomePafalse);
  };dIn ? (
            <>
            ment={<NotificationsPage isDark={isDark} toggleDark={toggle} onLogout={handleLogout} />}
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
