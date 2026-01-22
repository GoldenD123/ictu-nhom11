import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import JobDetail from "./pages/JobDetail";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const App: React.FC = () => {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        aria-label="Notifications"
      />

      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Login />} />{" "}
              {/* Using same login UI for demo simplicity */}
              <Route path="/job/:id" element={<JobDetail />} />
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/companies"
                  element={
                    <div className="p-10 text-center">
                      Trang danh sách công ty đang phát triển...
                    </div>
                  }
                />
              </Route>
              <Route
                path="*"
                element={
                  <div className="p-10 text-center">
                    404 - Trang không tồn tại
                  </div>
                }
              />
            </Routes>
          </main>

          <footer className="bg-white border-t border-gray-200 py-10 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-6 h-6 bg-blue-600 rounded text-white font-bold text-xs flex items-center justify-center">
                  J
                </div>
                <span className="font-bold text-gray-900">JobMatch AI</span>
              </div>
              <p className="text-gray-500 text-sm">
                © 2024 JobMatch AI. Nền tảng tuyển dụng thông minh hàng đầu.
              </p>
              <div className="flex justify-center gap-6 mt-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Điều khoản
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Bảo mật
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                  Hỗ trợ
                </a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
