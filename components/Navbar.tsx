
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="bg-indigo-600 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 transform -rotate-3 hover:rotate-0 transition-transform">
                <i className="fas fa-briefcase text-white text-lg"></i>
              </div>
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
                JobAI
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Bảng điều khiển</Link>
                <div className="flex items-center space-x-4 border-l border-slate-100 pl-6 ml-2">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-900 leading-tight">{user?.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{user?.email}</p>
                  </div>
                  <div className="relative group">
                    <img src={user?.avatar} alt="Avatar" className="w-10 h-10 rounded-2xl border-2 border-slate-100 object-cover shadow-sm group-hover:border-indigo-500 transition-colors" />
                    <div className="absolute inset-0 bg-indigo-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-10 h-10 flex items-center justify-center rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Đăng xuất"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Đăng nhập</Link>
                <Link 
                  to="/login" 
                  className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
                >
                  Bắt đầu ngay
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
