/**
 * BACKEND SERVER - JobMatch AI
 * File: index.js
 * Cách chạy: node index.js
 */

import "dotenv/config"; // Nạp biến môi trường ngay lập tức
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Kiểm tra Key khi khởi động
console.log("--- Kiểm tra cấu hình ---");
if (process.env.GEMINI_API_KEY) {
  console.log(
    "✅ API_KEY: Đã tìm thấy (Bắt đầu bằng: " +
      process.env.GEMINI_API_KEY.substring(0, 5) +
      "...)"
  );
} else {
  console.error("❌ LỖI: API_KEY không tồn tại trong process.env!");
  console.error(
    "Giải pháp: Kiểm tra file .env có dòng API_KEY=AIza... và nằm cùng thư mục với file index.js này."
  );
}
console.log("-------------------------");

/**
 * Hàm lấy AI Instance an toàn.
 * KHÔNG khởi tạo ở ngoài cùng của file để tránh lỗi Hoisting trong ESM.
 */
const getAIClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API key must be set in environment variables (API_KEY).");
  }
  return new GoogleGenAI({ apiKey });
};

// --- API AUTH ---
app.post("/api/auth/register", (req, res) => {
  const { email, fullName } = req.body;
  const newUser = { id: Date.now().toString(), email, fullName, cvContent: "" };
  res.status(201).json({ user: newUser, token: "mock-jwt" });
});

app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  const user = {
    id: "u1",
    email,
    fullName: email.split("@")[0],
    cvContent: "",
  };
  res.json({ user, token: "mock-jwt" });
});

// --- API USER ---
app.put("/api/user/cv", (req, res) => {
  const { cvContent } = req.body;
  res.json({ success: true, cvContent });
});

// --- API AI MATCHING ---
app.post("/api/ai/match", async (req, res) => {
  const { cvText, jobs } = req.body;
  try {
    const ai = getAIClient(); // Khởi tạo AI tại đây (khi đã nạp xong env)

    const prompt = `Bạn là chuyên gia tuyển dụng. Hãy phân tích nội dung CV sau:
    CV: "${cvText}"
    
    Và danh sách công việc: ${JSON.stringify(jobs)}
    
    Hãy đánh giá độ phù hợp (0-100) cho từng công việc.
    Trả về kết quả dưới định dạng JSON mảng: [{"jobId": "...", "matchScore": 85, "reason": "..."}]`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    const resultText = response.text;
    res.json(JSON.parse(resultText || "[]"));
  } catch (error) {
    console.error("Lỗi AI Match:", error.message);
    res.status(500).json({ error: "Lỗi xử lý AI: " + error.message });
  }
});

// --- API AI CHATBOT ---
app.post("/api/ai/chat", async (req, res) => {
  const { query, jobs, cvContent } = req.body;
  try {
    const ai = getAIClient();

    const systemInstruction = `Bạn là JobMatch Assistant. 
    Dữ liệu CV người dùng: "${cvContent || "Chưa có"}".
    Dữ liệu các công việc hiện có: ${JSON.stringify(jobs)}.
    Hãy trả lời thân thiện, chuyên nghiệp và bám sát dữ liệu công việc.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: { systemInstruction, temperature: 0.7 },
    });

    res.json({ text: response.text });
  } catch (error) {
    console.error("Lỗi AI Chat:", error.message);
    res.status(500).json({ error: "Lỗi kết nối AI" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server Backend đang chạy tại http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`
    <h1>🚀 Backend is running</h1>
    <ul>
      <li>POST /api/auth/login</li>
      <li>POST /api/auth/register</li>
      <li>PUT /api/user/cv</li>
      <li>POST /api/ai/chat</li>
    </ul>
  `);
});
