
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <i className="fas fa-briefcase text-white"></i>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                CareerAI
              </span>
            </Link>
            <div className="hidden md:ml-8 md:flex md:space-x-6">
              <Link to="/jobs" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition">Tìm việc</Link>
              <Link to="/analysis" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition">Phân tích CV</Link>
              <Link to="/companies" className="text-slate-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium transition">Công ty</Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center space-x-2 group">
                  <img src={user?.avatar} alt={user?.name} className="h-8 w-8 rounded-full border border-slate-200" />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600">{user?.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-slate-500 hover:text-red-500 transition"
                  title="Đăng xuất"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium">Đăng nhập</Link>
                <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-sm">
                  Đăng ký
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-500 hover:text-blue-600 p-2"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 py-4 px-4 space-y-2">
          <Link to="/jobs" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Tìm việc</Link>
          <Link to="/analysis" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Phân tích CV</Link>
          <Link to="/profile" className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg">Hồ sơ của tôi</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">Đăng xuất</button>
          ) : (
            <>
              <Link to="/login" className="block px-4 py-2 text-blue-600 font-medium">Đăng nhập</Link>
              <Link to="/register" className="block px-4 py-2 bg-blue-600 text-white rounded-lg text-center font-medium">Đăng ký</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
