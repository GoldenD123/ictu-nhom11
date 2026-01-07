
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_JOBS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-white pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-indigo-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
              Tìm kiếm công việc <span className="text-blue-600">thông minh hơn</span> bằng AI
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
              CareerAI giúp bạn phân tích CV, đề xuất kỹ năng còn thiếu và kết nối trực tiếp với các nhà tuyển dụng hàng đầu.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/jobs" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                Khám phá việc làm
              </Link>
              <Link to="/analysis" className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg hover:border-blue-600 hover:text-blue-600 transition">
                Phân tích CV ngay
              </Link>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600">5000+</div>
              <div className="text-slate-500 font-medium">Việc làm mới</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">1200+</div>
              <div className="text-slate-500 font-medium">Công ty uy tín</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">50k+</div>
              <div className="text-slate-500 font-medium">Ứng viên</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600">95%</div>
              <div className="text-slate-500 font-medium">Tỉ lệ hài lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Việc làm nổi bật</h2>
            <p className="text-slate-500 mt-2">Được chọn lọc dựa trên xu hướng thị trường</p>
          </div>
          <Link to="/jobs" className="text-blue-600 font-semibold hover:underline flex items-center">
            Xem tất cả <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {MOCK_JOBS.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-xl hover:shadow-slate-100 transition-all group">
              <div className="flex items-start space-x-4">
                <img src={job.logo} alt={job.company} className="w-14 h-14 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">{job.title}</h3>
                  <p className="text-slate-600 font-medium">{job.company}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-md">{job.type}</span>
                    <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">
                      <i className="fas fa-map-marker-alt mr-1"></i> {job.location}
                    </span>
                    <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded-md">
                      <i className="fas fa-money-bill-wave mr-1"></i> {job.salary}
                    </span>
                  </div>
                </div>
                <button className="text-slate-300 hover:text-red-500 transition">
                  <i className="far fa-bookmark text-xl"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16">Tại sao nên dùng CareerAI?</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-robot text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold">Phân tích CV bằng AI</h3>
              <p className="text-slate-400">Gemini AI của chúng tôi sẽ phân tích CV của bạn và đưa ra những lời khuyên hữu ích để tăng cơ hội trúng tuyển.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-bullseye text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold">Gợi ý việc làm chính xác</h3>
              <p className="text-slate-400">Không còn phải lướt qua hàng ngàn tin tuyển dụng. Chúng tôi chỉ hiển thị những việc làm thực sự phù hợp với bạn.</p>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-user-check text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold">Phỏng vấn thử</h3>
              <p className="text-slate-400">Chuẩn bị tốt nhất cho buổi phỏng vấn thật với các câu hỏi giả lập từ trí tuệ nhân tạo chuyên sâu.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
