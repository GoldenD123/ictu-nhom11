import React, { useState, useEffect } from "react";
import { useJobs } from "../context/JobContext";
import { Job } from "../types";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

const AdminDashboard: React.FC = () => {
  const { jobs, addJob, deleteJob, updateJob } = useJobs();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  console.log(user);
  // useEffect(() => {
  //   if (user.role != "admin") {
  //     navigate("/");
  //   }
  // }, [user]);

  const [jobForm, setJobForm] = useState<Partial<Job>>({
    title: "",
    CName: "",
    add: "",
    salary: "",
    des: "",
    requirements: [],
    tags: [],
    logo: "https://picsum.photos/seed/job/200",
  });

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleOpenAdd = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      CName: "",
      add: "",
      salary: "",
      des: "",
      requirements: [],
      tags: [],
      logo: `https://picsum.photos/seed/${Date.now()}/200`,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (job: Job) => {
    setEditingJob(job);
    setJobForm({ ...job });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingJob) {
        updateJob({ ...editingJob, ...jobForm } as Job);
        showToast("Cập nhật công việc thành công!");
      } else {
        addJob(jobForm as Omit<Job, "id">);
        showToast("Đã đăng tin tuyển dụng mới!");
      }
      setShowModal(false);
    } catch (error) {
      showToast("Có lỗi xảy ra, vui lòng thử lại.", "error");
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tin tuyển dụng này?")) {
      deleteJob(id);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar giả lập */}
      <aside className="w-72 bg-slate-900 text-white hidden lg:flex flex-col sticky top-0 h-screen shadow-2xl">
        <div className="p-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl shadow-lg shadow-blue-900/50">
              J
            </div>
            <div>
              <span className="font-black text-xl tracking-tight block">
                JobMatch
              </span>
              <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">
                Admin Control
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <button className="w-full flex items-center gap-4 px-5 py-4 bg-blue-600 rounded-2xl font-bold transition-all shadow-lg shadow-blue-900/20">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Quản lý tin đăng
          </button>
          <button className="w-full flex items-center gap-4 px-5 py-4 hover:bg-white/5 rounded-2xl text-slate-400 font-medium transition-all">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 01-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Ứng viên
          </button>
        </nav>

        <div className="p-8 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
            <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">
              Trạng thái hệ thống
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Đang hoạt động
            </div>
          </div>
        </div>
      </aside>
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed top-8 right-8 z-[500] px-6 py-4 rounded-2xl shadow-2xl text-white font-bold animate-in slide-in-from-right-10 flex items-center gap-3 ${toast.type === "success" ? "bg-emerald-500" : "bg-rose-500"}`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {toast.message}
          </div>
        )}

        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">
              Bảng điều khiển
            </h1>
            <p className="text-slate-500 font-medium">
              Quản lý và cập nhật danh sách công việc trên hệ thống.
            </p>
          </div>
          <button
            onClick={handleOpenAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-200 transition-all transform active:scale-95"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Đăng Tin Mới
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            {
              label: "Việc đang tuyển",
              value: jobs.length,
              color: "blue",
              icon: "💼",
            },
            {
              label: "Ứng viên (Mock)",
              value: "1,248",
              color: "indigo",
              icon: "👥",
            },
            {
              label: "Match thành công",
              value: "84%",
              color: "emerald",
              icon: "✨",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-slate-900">
                  {stat.value}
                </p>
              </div>
              <div className="text-3xl p-5 bg-slate-50 rounded-2xl">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-10 py-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
            <h2 className="text-2xl font-black text-slate-800">
              Danh sách công việc
            </h2>
            <div className="relative w-full md:w-80">
              <svg
                className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Tìm nhanh..."
                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-xs font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">
                  <th className="px-10 py-6">Vị trí & Công ty</th>
                  <th className="px-10 py-6">Mức lương</th>
                  <th className="px-10 py-6">Trạng thái</th>
                  <th className="px-10 py-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-10 py-8">
                      <div className="flex items-center gap-5">
                        <img
                          src={job.logo}
                          className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                          alt={job.CName}
                        />
                        <div>
                          <p className="font-black text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                            {job.title}
                          </p>
                          <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">
                            {job.CName}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-black">
                        {job.salary}
                      </span>
                      <p className="text-xs text-slate-400 font-medium mt-2">
                        {job.add}
                      </p>
                    </td>
                    <td className="px-10 py-8">
                      <span className="flex items-center gap-2 text-xs font-black text-blue-500 uppercase tracking-tighter">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Đang tuyển
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenEdit(job)}
                        className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all"
                        title="Chỉnh sửa"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all"
                        title="Xóa tin"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Thêm/Sửa Job */}
        {showModal && (
          <div className="fixed inset-0 z-[600] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="bg-slate-900 p-10 text-white flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-black mb-1">
                    {editingJob
                      ? "Cập nhật tin tuyển dụng"
                      : "Thêm tin tuyển dụng mới"}
                  </h3>
                  <p className="text-slate-400 font-medium">
                    {editingJob
                      ? "Chỉnh sửa các thông tin cần thiết bên dưới"
                      : "Điền đầy đủ thông tin để thu hút ứng viên"}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="p-10 space-y-6 max-h-[70vh] overflow-y-auto"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                      Tên công việc
                    </label>
                    <input
                      required
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold text-slate-900"
                      value={jobForm.title}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                      Công ty
                    </label>
                    <input
                      required
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold text-slate-900"
                      value={jobForm.CName}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, CName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                      Địa điểm
                    </label>
                    <input
                      required
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold text-slate-900"
                      value={jobForm.add}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, add: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                      Mức lương
                    </label>
                    <input
                      required
                      className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold text-slate-900"
                      value={jobForm.salary}
                      onChange={(e) =>
                        setJobForm({ ...jobForm, salary: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    Mô tả công việc
                  </label>
                  <textarea
                    required
                    className="w-full bg-slate-50 border-none rounded-[2rem] px-8 py-6 h-40 outline-none focus:ring-2 focus:ring-blue-600 transition-all font-medium text-slate-700 resize-none"
                    value={jobForm.des}
                    onChange={(e) =>
                      setJobForm({ ...jobForm, des: e.target.value })
                    }
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-10 py-4 text-slate-500 font-black hover:bg-slate-50 rounded-2xl transition-all"
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 transition-all transform active:scale-95"
                  >
                    {editingJob ? "Lưu thay đổi" : "Đăng tin ngay"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
