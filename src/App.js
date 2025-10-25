import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Moderator from "./pages/Moderator";
import ProtectedRoute from "./components/ProtectedRoute";
import Navigation from "./components/Navigation";
import ThemeProvider from "./components/ThemeProvider";
import "./i18n";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Content from "./pages/Content";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Public from "./pages/Public";
import RoleSwitcher from "./components/RoleSwitcher";
import AuthBootstrapper from "./components/AuthBootstrapper";
import { useSelector } from "react-redux";

const queryClient = new QueryClient();

function AppRoutes() {
  const { i18n } = useTranslation();
  const bootstrapped = useSelector((state) => state.auth.bootstrapped);

  React.useEffect(() => {
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <AuthBootstrapper />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router>
            {bootstrapped ? (
              <>
                <Navigation />
                <RoleSwitcher />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute
                        roles={[
                          "user",
                          "admin",
                          "moderator",
                          "superadmin",
                          "editor",
                          "viewer",
                        ]}
                      >
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute roles={["admin", "superadmin"]}>
                        <Admin />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/moderator"
                    element={
                      <ProtectedRoute
                        roles={["admin", "moderator", "superadmin"]}
                      >
                        <Moderator />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/content"
                    element={
                      <ProtectedRoute
                        roles={["editor", "moderator", "admin", "superadmin"]}
                      >
                        <Content />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute roles={["superadmin"]}>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute roles={["viewer", "superadmin"]}>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute roles={["admin", "superadmin"]}>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/public" element={<Public />} />
                </Routes>
              </>
            ) : (
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>Loading...</span>
              </div>
            )}
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
