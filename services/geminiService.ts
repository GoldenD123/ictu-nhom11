import { Job, MatchResult } from "../types";
import { API_BASE_URL } from "../config";

export const matchJobsWithCV = async (
  cvText: string,
  jobs: Job[],
): Promise<MatchResult[]> => {
  try {
    const response = await fetch(`http://localhost:5000/api/ai/match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cvText, jobs }),
    });

    if (!response.ok) throw new Error("Backend Error");
    return await response.json();
  } catch (error) {
    console.error("Match Error:", error);
    // Fallback if backend is down
    return jobs.map((j) => ({
      jobId: j.id,
      matchScore: 0,
      reason: "Không thể kết nối với Backend. Vui lòng kiểm tra server.",
    }));
  }
};

export const chatWithAI = async (
  query: string,
  jobs: Job[],
  cvContent?: string,
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, jobs, cvContent }),
    });

    if (!response.ok) throw new Error("Backend Error");
    const data = await response.json();
    return data.reply || "Xin lỗi, tôi không thể xử lý yêu cầu này.";
  } catch (error) {
    return "Lỗi: Không thể kết nối với server Backend của bạn.";
  }
};
