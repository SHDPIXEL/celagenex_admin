import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MainLayout from "./layout/MainLayout";
import AddUser from "./pages/AddUser";
import { HelmetProvider } from "react-helmet-async";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./helper/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (token && tokenExpiry && Date.now() < parseInt(tokenExpiry, 10)) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("authToken");
      localStorage.removeItem("tokenExpiry");
    }
  }, []);

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <HelmetProvider>
          <Routes>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MainLayout setIsAuthenticated={setIsAuthenticated} />
                </ProtectedRoute>
              }
            >
              <Route
                index
                element={<Navigate to="/dashboard" replace />}
              />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="adduser" element={<AddUser />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HelmetProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
