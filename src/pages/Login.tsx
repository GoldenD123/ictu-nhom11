
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      login(email, name);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 space-y-8 border border-slate-100">
        <div className="text-center">
          <Link to="/" className="inline-block bg-blue-600 p-3 rounded-2xl mb-6">
            <i className="fas fa-briefcase text-white text-2xl"></i>
          </Link>
          <h2 className="text-3xl font-bold text-slate-900">Chào mừng trở lại</h2>
          <p className="text-slate-500 mt-2">Đăng nhập để tiếp tục hành trình của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Họ và tên</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@vidu.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500" />
              <label className="ml-2 block text-sm text-slate-600">Ghi nhớ đăng nhập</label>
            </div>
            <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-700">Quên mật khẩu?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm">
          Chưa có tài khoản? <Link to="/register" className="text-blue-600 font-bold hover:underline">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
