
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      login(email, name);
      const from = (location.state as any)?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Left Side: Form */}
        <div className="p-8 lg:p-12">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Chào mừng trở lại</h2>
            <p className="text-slate-500">Đăng nhập để bắt đầu hành trình sự nghiệp mới</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Họ và tên</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <i className="fas fa-user"></i>
                </span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                  placeholder="Ví dụ: Nguyễn Văn A"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Địa chỉ Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
                  <i className="fas fa-envelope"></i>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-slate-50/50"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-100 mt-4"
            >
              Đăng nhập ngay
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Bằng cách đăng nhập, bạn đồng ý với <a href="#" className="text-indigo-600 font-semibold hover:underline">Điều khoản</a> và <a href="#" className="text-indigo-600 font-semibold hover:underline">Bảo mật</a> của chúng tôi.
            </p>
          </div>
        </div>

        {/* Right Side: Image/Illustration */}
        <div className="hidden md:block relative">
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" 
            alt="Office" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-indigo-600/80 backdrop-blur-[2px] flex items-center justify-center p-12">
            <div className="text-white text-center">
              <i className="fas fa-quote-left text-4xl mb-6 opacity-30"></i>
              <p className="text-2xl font-medium italic mb-6 leading-relaxed">
                "Cơ hội không tự nhiên đến, bạn phải là người tạo ra nó."
              </p>
              <p className="text-indigo-200 font-bold uppercase tracking-widest text-sm">Chris Grosser</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
