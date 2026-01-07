
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Cover image placeholder */}
        <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        
        <div className="relative px-8 pb-8">
          <div className="flex flex-col md:flex-row items-end -mt-16 md:space-x-8">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg bg-white object-cover"
            />
            <div className="flex-1 pb-4 mt-6 md:mt-0">
              <h1 className="text-3xl font-bold text-slate-900">{user?.name}</h1>
              <p className="text-slate-500 font-medium">{user?.email}</p>
            </div>
            <button className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-200 transition mb-4">
              Chỉnh sửa hồ sơ
            </button>
          </div>

          <div className="mt-12 grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <i className="fas fa-info-circle mr-2 text-blue-600"></i> Thông tin cá nhân
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Vai trò:</span>
                    <span className="text-slate-900 font-bold">Ứng viên</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Thành viên từ:</span>
                    <span className="text-slate-900 font-bold">Tháng 3, 2024</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Trạng thái:</span>
                    <span className="text-green-600 font-bold">Đang tìm việc</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                  <i className="fas fa-star mr-2 text-yellow-500"></i> Kỹ năng
                </h3>
                <div className="flex flex-wrap gap-2">
                  {user?.skills?.map(skill => (
                    <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4 text-xl">Việc làm đã ứng tuyển</h3>
                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center">
                  <i className="fas fa-folder-open text-4xl text-slate-200 mb-4"></i>
                  <p className="text-slate-500">Bạn chưa ứng tuyển vào bất kỳ công việc nào.</p>
                  <button className="mt-4 text-blue-600 font-bold hover:underline">Khám phá việc làm ngay</button>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4 text-xl">Lịch sử phân tích CV</h3>
                <div className="space-y-4">
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-50 text-blue-600 p-3 rounded-xl">
                        <i className="fas fa-file-pdf"></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">CV_Fullstack_Dev.pdf</h4>
                        <p className="text-slate-500 text-sm">Đã phân tích vào 12/03/2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">85/100</div>
                      <p className="text-slate-400 text-xs">Điểm AI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
