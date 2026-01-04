
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-8">
              Tìm kiếm <span className="text-indigo-600">việc làm mơ ước</span><br />
              với trí tuệ nhân tạo AI
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-xl text-slate-500 mb-10 leading-relaxed">
              Tải CV của bạn lên và để công cụ Gemini AI của chúng tôi kết nối bạn với những cơ hội nghề nghiệp tốt nhất dựa trên kỹ năng thực tế của bạn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200/50 flex items-center justify-center"
              >
                Tải CV Ngay <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center"
              >
                Tạo Tài Khoản
              </Link>
            </div>
            
            <div className="mt-8 flex items-center space-x-4 text-sm text-slate-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                ))}
              </div>
              <p>Hơn 10,000+ ứng viên đã tìm được việc thành công.</p>
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0 lg:col-span-6 relative">
            <div className="relative mx-auto w-full rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop" 
                alt="Job Search Illustration" 
                className="w-full object-cover h-[400px] lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-8">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                    <p className="text-sm font-bold text-slate-800">AI đang phân tích 1,420 công việc mới hôm nay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "fa-rocket",
              color: "bg-blue-50 text-blue-600",
              title: "Phân tích Siêu tốc",
              desc: "Nhận kết quả phân tích CV của bạn chỉ trong vài giây nhờ sức mạnh của Gemini 3 Flash."
            },
            {
              icon: "fa-bullseye",
              color: "bg-purple-50 text-purple-600",
              title: "Kết nối Thông minh",
              desc: "Thuật toán so khớp sâu sắc dựa trên kỹ năng và kinh nghiệm thực tế của ứng viên."
            },
            {
              icon: "fa-shield-halved",
              color: "bg-emerald-50 text-emerald-600",
              title: "Bảo mật & Riêng tư",
              desc: "Dữ liệu của bạn được mã hóa an toàn và chỉ được sử dụng cho mục đích tìm việc."
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                <i className={`fas ${feature.icon} text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
