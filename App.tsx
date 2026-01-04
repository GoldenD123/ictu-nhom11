
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-slate-100 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <div className="flex justify-center space-x-6 mb-8 text-slate-400">
                <a href="#" className="hover:text-indigo-600 transition-colors"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="hover:text-indigo-600 transition-colors"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-indigo-600 transition-colors"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" className="hover:text-indigo-600 transition-colors"><i className="fab fa-github"></i></a>
              </div>
              <p className="text-slate-500 text-sm font-medium">
                &copy; {new Date().getFullYear()} JobAI - Tìm kiếm việc làm theo CV. Phát triển bởi Google Gemini 3 Flash.
              </p>
              <div className="mt-4 flex justify-center space-x-4 text-xs font-bold uppercase tracking-widest text-slate-300">
                <a href="#" className="hover:text-slate-500">Chính sách bảo mật</a>
                <span>&bull;</span>
                <a href="#" className="hover:text-slate-500">Điều khoản sử dụng</a>
                <span>&bull;</span>
                <a href="#" className="hover:text-slate-500">Liên hệ</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
