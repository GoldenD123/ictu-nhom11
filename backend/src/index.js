/**
 * BACKEND SERVER - JobMatch AI
 * File: index.js
 * Cách chạy: node index.js
 */

import "dotenv/config"; // Nạp biến môi trường ngay lập tức
import routes from "./routes/index.js";
import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import { connectDB } from "./config/db.js";
const app = express();
const PORT = 5000;
connectDB();
app.use(cors());
app.use(express.json());

// Kiểm tra Key khi khởi động
console.log("--- Kiểm tra cấu hình ---");
if (process.env.GEMINI_API_KEY) {
  console.log(
    "✅ API_KEY: Đã tìm thấy (Bắt đầu bằng: " +
      process.env.GEMINI_API_KEY.substring(0, 5) +
      "...)",
  );
} else {
  console.error("❌ LỖI: API_KEY không tồn tại trong process.env!");
  console.error(
    "Giải pháp: Kiểm tra file .env có dòng API_KEY=AIza... và nằm cùng thư mục với file index.js này.",
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
//định tuyến
routes(app);
