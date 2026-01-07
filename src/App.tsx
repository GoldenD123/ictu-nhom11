import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy load pages for better performance
const Home = React.lazy(() => import("./pages/Home"));
const Jobs = React.lazy(() => import("./pages/Jobs"));
const CVAnalysis = React.lazy(() => import("./pages/CVAnalysis"));
const Login = React.lazy(() => import("./pages/Login"));
const Profile = React.lazy(() => import("./pages/Profile"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
  </div>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-200 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <i className="fas fa-briefcase text-white text-sm"></i>
            </div>
            <span className="text-xl font-bold text-slate-900">CareerAI</span>
          </div>
          <p className="text-slate-500 max-w-sm">
            Nền tảng kết nối nhân tài và doanh nghiệp thông qua sức mạnh của Trí
            tuệ nhân tạo. Tối ưu hóa sự nghiệp của bạn ngay hôm nay.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Liên kết</h4>
          <ul className="space-y-2 text-slate-500">
            <li>
              <a href="#" className="hover:text-blue-600">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Quy trình tuyển dụng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Điều khoản sử dụng
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-slate-900 mb-4">Theo dõi</h4>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-400 hover:text-white transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-blue-700 hover:text-white transition"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-100 text-center text-slate-400 text-sm">
        &copy; 2024 CareerAI. All rights reserved. Built with React & Gemini.
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <React.Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/analysis" element={<CVAnalysis />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Login />} />{" "}
                {/* Using login page for demo */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </React.Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
